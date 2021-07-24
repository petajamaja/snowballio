import { mount } from "@vue/test-utils";
import ItemDebt from "../debt-related/ItemDebt.vue";
import {nextTick} from "vue";

describe("shouldChargeInterest() function", () => {
  const placeholderDebt = {
    id: 0,
    description: "New debt",
    amount: 8000,
    annualInterestRate: 0,
    installment: 5000,
    monthlyDueDate: 5,
    fixedMonthlyFees: 30,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  };

  const wrapper = mount(ItemDebt, {
    propsData: {
      index: 0,
      thisIsTheMinimalDebt: true,
      debtIsPaidOff: false,
      itemDebt: placeholderDebt,
      today: new Date()
    },
    data() {
      return {
        descriptionEditInputOpen: false,
        lastInterestChargeDate: null
      };
    }
  });

  async function checkDate(lastPaymentDate, dateBeforeDueDate, dateOnDueDate, dateAfterDueDate){
    wrapper.setData({ lastInterestChargeDate: lastPaymentDate});
    nextTick(() => { 
      expect(wrapper.vm.lastInterestChargeDate).toBe(lastPaymentDate);
      expect(wrapper.vm.shouldChargeInterest(dateBeforeDueDate)).toBe(false);
      expect(wrapper.vm.shouldChargeInterest(dateOnDueDate)).toBe(true);
      expect(wrapper.vm.shouldChargeInterest(dateAfterDueDate)).toBe(true);
    });
  }

  it("charges fee correctly if no previous payments exist", async () => {
    const dateBeforeDueDate = new Date(2021, 7, 4);
    const dateOnDueDate = new Date(2021, 7, 5);
    const dateAfterDueDate = new Date(2021, 7, 10);
    checkDate(null, dateBeforeDueDate, dateOnDueDate, dateAfterDueDate);
  });

  it("charges fee correctly if month is next after last payment", async () => {
    const lastPaymentDate = new Date(2021, 6, 5);
    const dateBeforeDueDate = new Date(2021, 7, 4);
    const dateOnDueDate = new Date(2021, 7, 5);
    const dateAfterDueDate = new Date(2021, 7, 10);
    checkDate(lastPaymentDate, dateBeforeDueDate, dateOnDueDate, dateAfterDueDate);
  });

  it("charges fee correctly if it is next year", async () => {
    const lastPaymentDate = new Date(2021, 12, 5);
    const dateBeforeDueDate = new Date(2022, 1, 4);
    const dateOnDueDate = new Date(2022, 1, 5);
    const dateAfterDueDate = new Date(2022, 1, 10);
    checkDate(lastPaymentDate, dateBeforeDueDate, dateOnDueDate, dateAfterDueDate);
  });
});

describe("timeTillPaidOff() function", () => {
  const placeholderDebt = {
    id: 0,
    description: "New debt",
    amount: 50,
    annualInterestRate: 12.5,
    installment: 11,
    monthlyDueDate: 5,
    fixedMonthlyFees: 1,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  };
  const wrapper = mount(ItemDebt, {
    propsData: {
      index: 0,
      thisIsTheMinimalDebt: true,
      debtIsPaidOff: false,
      itemDebt: placeholderDebt,
      today: new Date()
    }
  });

  it("correctly calculates monthly interest rate", () => {
    expect(wrapper.vm.monthlyInterestRate).toBe(0.01);
  });
  it("returns 0 if the debt has already been paid off", () => {
    wrapper.setData({ debtItem: {
      ...wrapper.vm.debtItem,
      totalPaid: 50
    }});
    expect(wrapper.vm.debtItem.totalPaid).toBe(50);
    expect(wrapper.vm.timeTillPaidOff).toBe(0);
  });
  it("returns 6 if the amount of debt is 50", () => {
    wrapper.setData({ debtItem: {
      ...wrapper.vm.debtItem,
      totalPaid: 0
    }});
    expect(wrapper.vm.debtItem.totalPaid).toBe(0);
    expect(wrapper.vm.timeTillPaidOff).toBe(6);
  });
  it("returns correct value if there is no interest", () =>{
    wrapper.setData( { debtItem: {
      ...wrapper.vm.debtItem,
      annualInterestRate: 0,
      installment: 10,
      fixedMonthlyFees: 0
    }});
    expect(wrapper.vm.debtItem.annualInterestRate).toBe(0);
    expect(wrapper.vm.debtItem.installment).toBe(10);
    expect(wrapper.vm.debtItem.fixedMonthlyFees).toBe(0);
    expect(wrapper.vm.timeTillPaidOff).toBe(5);
  });
  it("returns the same value if no interest as the standard method from main screen", () => {
    let smallestDebt = wrapper.vm.debtItem;
    let expectedValue =  Math.ceil(
        (smallestDebt.amount - smallestDebt.totalPaid) /
         smallestDebt.installment);
    expect(wrapper.vm.timeTillPaidOff).toBe(expectedValue);
  });
});
});

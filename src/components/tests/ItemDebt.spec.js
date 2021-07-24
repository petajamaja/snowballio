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
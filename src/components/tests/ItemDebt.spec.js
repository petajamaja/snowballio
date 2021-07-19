import { mount } from "@vue/test-utils";
import ItemDebt from "../debt-related/ItemDebt.vue";

describe("ItemDebt", () => {
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

  it("charges fee correctly if no previous payments exist", () => {
    const dateBeforeDueDate = new Date(2021, 7, 4);
    const dateOnDueDate = new Date(2021, 7, 5);
    const dateAfterDueDate = new Date(2021, 7, 10);

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
    expect(wrapper.vm.shouldChargeInterest(dateBeforeDueDate)).toBe(false);
    expect(wrapper.vm.shouldChargeInterest(dateOnDueDate)).toBe(true);
    expect(wrapper.vm.shouldChargeInterest(dateAfterDueDate)).toBe(true);
  });

  it("charges fee correctly if month is next after last payment", () => {
    const lastPaymentDate = new Date(2021, 6, 5);
    const dateBeforeDueDate = new Date(2021, 7, 4);
    const dateOnDueDate = new Date(2021, 7, 5);
    const dateAfterDueDate = new Date(2021, 7, 10);

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
          lastInterestChargeDate: lastPaymentDate
        };
      }
    });
    expect(wrapper.vm.shouldChargeInterest(dateBeforeDueDate)).toBe(false);
    expect(wrapper.vm.shouldChargeInterest(dateOnDueDate)).toBe(true);
    expect(wrapper.vm.shouldChargeInterest(dateAfterDueDate)).toBe(true);
  });

  it("charges fee correctly if it is next year", () => {
    const lastPaymentDate = new Date(2021, 12, 5);
    const dateBeforeDueDate = new Date(2022, 1, 4);
    const dateOnDueDate = new Date(2022, 1, 5);
    const dateAfterDueDate = new Date(2022, 1, 10);

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
          lastInterestChargeDate: lastPaymentDate
        };
      }
    });
    expect(wrapper.vm.shouldChargeInterest(dateBeforeDueDate)).toBe(false);
    expect(wrapper.vm.shouldChargeInterest(dateOnDueDate)).toBe(true);
    expect(wrapper.vm.shouldChargeInterest(dateAfterDueDate)).toBe(true);
  });
});

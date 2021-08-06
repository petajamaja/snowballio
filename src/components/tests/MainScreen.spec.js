import { mount } from "@vue/test-utils";
import MainScreen from "../high-level/MainScreen.vue";
import { nextTick } from "vue";

const debts1 = [
  {
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
  }
];

const debts2 = [
  {
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
  },
  {
    id: 1,
    description: "New debt 2",
    amount: 90,
    annualInterestRate: 0,
    installment: 10,
    monthlyDueDate: 5,
    fixedMonthlyFees: 0,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  },
  {
    id: 2,
    description: "New debt 3",
    amount: 400,
    annualInterestRate: 0,
    installment: 50,
    monthlyDueDate: 5,
    fixedMonthlyFees: 0,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  }
];

const debts3 = [
  {
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
  },
  {
    id: 1,
    description: "New debt 2",
    amount: 65,
    annualInterestRate: 0,
    installment: 10,
    monthlyDueDate: 5,
    fixedMonthlyFees: 0,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  },
  {
    id: 2,
    description: "New debt 3",
    amount: 63,
    annualInterestRate: 0,
    installment: 10,
    monthlyDueDate: 5,
    fixedMonthlyFees: 0,
    totalPaid: 0,
    totalFeesPaid: 0,
    totalInterestPaid: 0
  }
];

let wrapper = mount(MainScreen, {
  data() {
    return {
      activeDebts: debts1,
      paidOffDebts: [],
      today: new Date(),
      paymentHistory: [],
      monthlyMinimumPaid: false,
      lastMinimumPaymentDate: null,
      remainingMoneyToCarryOver: 0,
      validationErrors: []
    };
  }
});

describe("monthsTillAllDebtOutIfNoExtraMoney() function", () => {
  it("correctly calculates time for a single debt", async () => {
    expect(wrapper.findComponent({ name: "ItemDebt" }).exists()).toBe(true);
    expect(wrapper.findAllComponents({ name: "ItemDebt" }).length).toBe(1);
    nextTick(() => {
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(6);
    });
  });

  it("correctly calculates time for more than one debt", async () => {
    wrapper.setData({ activeDebts: null });
    wrapper.setData({ activeDebts: debts2 });
    nextTick(() => {
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(8);
    });
  });

  it("correctly calculates time if all debts have cascading carry overs", async () => {
    wrapper.setData({ activeDebts: null });
    wrapper.setData({ activeDebts: debts3 });
    nextTick(() => {
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(6);
    });
  });

  it("re-starts if one of the debts is deleted", async () => {
    wrapper.setData({ activeDebts: null });
    wrapper.setData({ activeDebts: debts2 });
    await nextTick(() => {
      expect(wrapper.vm.activeDebts).toHaveLength(3);
      expect(wrapper.findAllComponents({ name: "ItemDebt" })).toHaveLength(3);
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(8);
    });
    await wrapper.vm.emitter.emit("delete-item-debt", {
      debtIndex: 2,
      debtId: 2
    });
    await nextTick(() => {
      expect(wrapper.vm.activeDebts).toHaveLength(2);
      expect(wrapper.findAllComponents({ name: "ItemDebt" })).toHaveLength(2);
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(7);
    });
  });

  it("re-starts if one of the debts is updated", async () => {
    wrapper.setData({ activeDebts: null });
    wrapper.setData({ activeDebts: debts2 });

    await wrapper.vm.emitter.emit("update-item-debt", {
      index: 1,
      updatedItem: {
        id: 1,
        description: "New debt 2",
        amount: 121,
        annualInterestRate: 0,
        installment: 10,
        monthlyDueDate: 5,
        fixedMonthlyFees: 0,
        totalPaid: 0,
        totalFeesPaid: 0,
        totalInterestPaid: 0
      }
    });
    await nextTick(() => {
      expect(wrapper.vm.activeDebts).toHaveLength(2);
      expect(wrapper.findAllComponents({ name: "ItemDebt" })).toHaveLength(2);
      expect(wrapper.vm.monthsTillAllDebtOutIfNoExtraMoney).toBe(9);
    });
  });
});

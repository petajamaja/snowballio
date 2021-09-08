import { mount } from "@vue/test-utils";
import ItemDebt from "../debt-related/ItemDebt.vue";
import { nextTick } from "vue";
import utils from "../../utils.js";

const placeholderDebt = {
  id: 0,
  description: "New debt",
  amount: utils.to100(50),
  annualInterestRate: 12.5,
  installment: utils.to100(11),
  monthlyDueDate: 5,
  fixedMonthlyFees: utils.to100(1),
  totalPaid: 0,
  totalFeesPaid: 0,
  totalInterestPaid: 0
};

const placeholderNoInterestDebt = {
  id: 0,
  description: "New debt without interest",
  amount: utils.to100(50),
  annualInterestRate: 0,
  installment: utils.to100(11),
  monthlyDueDate: 5,
  fixedMonthlyFees: 0,
  totalPaid: 0,
  totalFeesPaid: 0,
  totalInterestPaid: 0
};

let wrapper = mount(ItemDebt, {
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

let noInterestWrapper = mount(ItemDebt, {
  propsData: {
    index: 0,
    thisIsTheMinimalDebt: true,
    debtIsPaidOff: false,
    itemDebt: placeholderNoInterestDebt,
    today: new Date()
  }
});

describe("shouldChargeInterest() function", () => {
  async function checkDate(
    lastPaymentDate,
    dateBeforeDueDate,
    dateOnDueDate,
    dateAfterDueDate
  ) {
    // https://github.com/vuejs/vue-test-utils/issues/818 - this is why the null setting
    wrapper.setData({ lastInterestChargeDate: null });
    wrapper.setData({ lastInterestChargeDate: lastPaymentDate });
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
    checkDate(
      lastPaymentDate,
      dateBeforeDueDate,
      dateOnDueDate,
      dateAfterDueDate
    );
  });

  it("charges fee correctly if it is next year", async () => {
    const lastPaymentDate = new Date(2021, 12, 5);
    const dateBeforeDueDate = new Date(2022, 1, 4);
    const dateOnDueDate = new Date(2022, 1, 5);
    const dateAfterDueDate = new Date(2022, 1, 10);
    checkDate(
      lastPaymentDate,
      dateBeforeDueDate,
      dateOnDueDate,
      dateAfterDueDate
    );
  });
});

describe("timeTillPaidOff() function", () => {
  it("correctly calculates monthly interest rate", () => {
    expect(wrapper.vm.monthlyInterestRate).toBe(0.01);
  });
  it("returns 0 if the debt has already been paid off", () => {
    wrapper.setData({
      debtItem: {
        ...wrapper.vm.debtItem,
        totalPaid: utils.to100(50)
      }
    });
    expect(wrapper.vm.debtItem.totalPaid).toBe(utils.to100(50));
    expect(wrapper.vm.timeTillPaidOff).toBe(0);
  });
  it("returns 6 if the amount of debt is 50", () => {
    wrapper.setData({
      debtItem: {
        ...wrapper.vm.debtItem,
        totalPaid: 0
      }
    });
    expect(wrapper.vm.debtItem.totalPaid).toBe(0);
    expect(wrapper.vm.timeTillPaidOff).toBe(6);
  });
  it("returns correct value if there is no interest", () => {
    expect(noInterestWrapper.vm.debtItem.annualInterestRate).toBe(0);
    expect(noInterestWrapper.vm.debtItem.installment).toBe(utils.to100(11));
    expect(noInterestWrapper.vm.debtItem.fixedMonthlyFees).toBe(0);
    expect(noInterestWrapper.vm.timeTillPaidOff).toBe(5);
  });
  it("returns the same value if no interest as the standard method from main screen", () => {
    let smallestDebt = wrapper.vm.debtItem;
    let expectedValue = Math.ceil(
      (smallestDebt.amount - smallestDebt.totalPaid) / smallestDebt.installment
    );
    expect(noInterestWrapper.vm.timeTillPaidOff).toBe(expectedValue);
  });
});

describe("paymentCalendar() function", () => {
  const calendar = [
    {
      installment: utils.to100(11),
      fees: utils.to100(1),
      interest: utils.to100(0.5)
    },
    {
      installment: utils.to100(11),
      fees: utils.to100(1),
      interest: utils.to100(0.4)
    },
    {
      installment: utils.to100(11),
      fees: utils.to100(1),
      interest: utils.to100(0.3)
    },
    {
      installment: utils.to100(11),
      fees: utils.to100(1),
      interest: utils.to100(0.21)
    },
    {
      installment: utils.to100(11),
      fees: utils.to100(1),
      interest: utils.to100(0.11)
    },
    {
      installment: utils.to100(1.52),
      carryOver: utils.to100(9.48)
    }
  ];

  it("correctly generates payment calendar from month 1 to month 6", () => {
    let calendarGenerated = wrapper.vm.paymentCalendar.getCalendar();
    expect(wrapper.vm.paymentCalendar.getRemainingTime()).toBe(6);
    expect(calendarGenerated[0].installment).toBe(calendar[0].installment);
    expect(calendarGenerated[0].interest).toBe(calendar[0].interest);
    expect(calendarGenerated[1].interest).toBe(calendar[1].interest);
    expect(calendarGenerated[2].interest).toBe(calendar[2].interest);
    expect(calendarGenerated[3].interest).toBe(calendar[3].interest);
    expect(calendarGenerated[4].interest).toBe(calendar[4].interest);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[5], "interest")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[5], "fees")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[5], "carryOver")
    ).toBe(true);
    expect(calendarGenerated[5].installment).toBe(calendar[5].installment);
    expect(calendarGenerated[5].carryOver).toBe(calendar[5].carryOver);
  });

  it("correctly generates payment calendar for debts with no interest", () => {
    let calendarGenerated = noInterestWrapper.vm.paymentCalendar.getCalendar();
    expect(noInterestWrapper.vm.debtItem.annualInterestRate).toBe(0);
    expect(noInterestWrapper.vm.paymentCalendar.getRemainingTime()).toBe(5);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[0], "interest")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[1], "interest")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[2], "interest")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[3], "interest")
    ).toBe(false);
    expect(
      Object.prototype.hasOwnProperty.call(calendarGenerated[4], "interest")
    ).toBe(false);
    expect(calendarGenerated[4].installment).toBe(utils.to100(6));
  });
});

describe("amountPaidByMonth() function", () => {
  it("correctly calculates all values from month 1 to month 6", () => {
    let one = utils.to100(12.5);
    let two = one + utils.to100(12.4);
    let three = two + utils.to100(12.3);
    let four = three + utils.to100(12.21);
    let five = four + utils.to100(12.11);
    let six = five + utils.to100(1.52);
    expect(wrapper.vm.amountPaidByMonth(1)).toBe(one);
    expect(wrapper.vm.amountPaidByMonth(2)).toBe(two);
    expect(wrapper.vm.amountPaidByMonth(3)).toBe(three);
    expect(wrapper.vm.amountPaidByMonth(4)).toBe(four);
    expect(wrapper.vm.amountPaidByMonth(5)).toBe(five);
    expect(wrapper.vm.amountPaidByMonth(6)).toBe(six);
  });
});

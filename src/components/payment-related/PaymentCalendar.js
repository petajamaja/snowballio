export default class PaymentCalendar {
  constructor(debtItem) {
    this.debtItem = debtItem;
    this.calendar = this.generateCalendar();
  }

  generateCalendar() {
    let balance =
      this.debtItem.amount -
      this.debtItem.totalPaid +
      this.debtItem.totalInterestPaid +
      this.debtItem.totalFeesPaid;
    let toBeRounded = this.debtItem.annualInterestRate / 100 / 12;
    let monthlyInterestRate =
      Math.round((toBeRounded + Number.EPSILON) * 1000) / 1000;
    let calendar = [];
    let month = 0;

    if (this.debtItem.installment === 0) {
      return calendar;
    }

    if (balance <= 0) {
      calendar = [{ installment: 0, carryOver: -balance }];
      return calendar;
    }

    while (balance > 0) {
      calendar[month] = {
        installment: this.debtItem.installment
      };
      if (balance <= this.debtItem.installment) {
        calendar[month].installment = balance;
        calendar[month].carryOver = this.debtItem.installment - balance;
        break;
      }
      if (this.debtItem.annualInterestRate !== 0) {
        let interest = Math.floor(balance * monthlyInterestRate);
        calendar[month].interest = interest;
        calendar[month].fees = this.debtItem.fixedMonthlyFees;
        balance =
          balance -
          this.debtItem.installment +
          interest +
          this.debtItem.fixedMonthlyFees;
      } else {
        balance = balance - this.debtItem.installment;
      }
      month++;
    }
    return calendar;
  }

  getCalendar() {
    return this.calendar;
  }

  getRemainingTime() {
    // if the minimum monthly installment is zero, paying off will be infinite until changed
    if (this.calendar.length === 0) return Infinity;
    if (this.calendar[this.calendar.length - 1].installment !== 0)
      return this.calendar.length;
    else return this.calendar.length - 1;
  }

  getCarryOver() {
    if (this.calendar.length === 0) return 0;
    return this.calendar[this.calendar.length - 1].carryOver;
  }

  getAmountPaidByMonth(month) {
    if (this.calendar.length === 0) return 0;
    return this.calendar.reduce((amount, payment, index) => {
      if (index < month) {
        amount = amount + payment.installment;
        if (payment.fees && payment.interest)
          amount = amount + payment.fees + payment.interest;
      }
      return amount;
    }, 0);
  }

  hasOnlyCarryOver() {
    if (this.calendar.length === 0) return false;
    return (
      this.calendar[this.calendar.length - 1].installment === 0 &&
      this.calendar[this.calendar.length - 1].carryOver !== 0
    );
  }
}

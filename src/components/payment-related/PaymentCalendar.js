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

    while (balance > 0) {
      calendar[month] = {
        installment: this.debtItem.installment
      };
      if (balance <= this.debtItem.installment) {
        calendar[month].installment = balance;
        calendar[month].carryOver = parseFloat(
          (this.debtItem.installment - balance).toPrecision(10)
        );
        break;
      }
      if (this.debtItem.annualInterestRate !== 0) {
        let interest = parseFloat(
          (balance * monthlyInterestRate).toPrecision(10)
        );
        calendar[month].interest = interest;
        calendar[month].fees = this.debtItem.fixedMonthlyFees;
        balance = parseFloat(
          (
            balance -
            this.debtItem.installment +
            interest +
            this.debtItem.fixedMonthlyFees
          ).toPrecision(10)
        );
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
    return this.calendar.length;
  }

  getCarryOver() {
    return this.calendar[this.calendar.length-1].carryOver;
  }
  
  getAmountPaidByMonth(month) {
    return this.calendar.reduce((amount, payment, index) => {
      if (index < month) {
        amount = parseFloat((amount + payment.installment).toPrecision(10));
        if (payment.fees && payment.interest)
          amount = parseFloat(
            (amount + payment.fees + payment.interest).toPrecision(10)
          );
      }
      return amount;
    }, 0);
  }
}

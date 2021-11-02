import utils from "../../utils";

export default class SnowballState {
  constructor() {
    this._activeDebts = utils.getFromLocalStorage("activeDebts") || null;
    this._paidOffDebts = utils.getFromLocalStorage("paidOffDebts") || null;
    this._paymentHistory = utils.getFromLocalStorage("paymentHistory") || null;
    this._lastInterestChargeDates =
      utils.getFromLocalStorage("lastInterestChargeDates") || null;
    this._minimumInstallmentCanNotGetSmallerThanThis =
      utils.getFromLocalStorage("minimumInstallmentCanNotGetSmallerThanThis") ||
      0;
    this._lastMinPaymentDate =
      utils.getFromLocalStorage("lastMinPaymentDate") !== null
        ? new Date(JSON.parse(utils.getFromLocalStorage("lastMinPaymentDate")))
        : null;
    this._globalIdCounter = utils.getFromLocalStorage("globalIdCounter") || 0;
  }

  get activeDebts() {
    return this._activeDebts;
  }

  set activeDebts(newActiveDebts) {
    this._activeDebts = newActiveDebts;
    utils.saveToLocalStorage("activeDebts", newActiveDebts);
  }

  get paidOffDebts() {
    return this._paidOffDebts;
  }

  set paidOffDebts(newPaidOffDebts) {
    this._paidOffDebts = newPaidOffDebts;
    utils.saveToLocalStorage("paidOffDebts", newPaidOffDebts);
  }

  get paymentHistory() {
    return this._paymentHistory;
  }

  set paymentHistory(newPaymentHistory) {
    this._paymentHistory = newPaymentHistory;
    utils.saveToLocalStorage("paymentHistory", newPaymentHistory);
  }

  get lastInterestChargeDates() {
    return this._lastInterestChargeDates;
  }

  set lastInterestChargeDates(newLastInterestChargeDates) {
    this._lastInterestChargeDates = newLastInterestChargeDates;
    utils.saveToLocalStorage(
      "lastInterestChargeDates",
      newLastInterestChargeDates
    );
  }

  get minimumInstallmentCanNotGetSmallerThanThis() {
    return this._minimumInstallmentCanNotGetSmallerThanThis;
  }

  set minimumInstallmentCanNotGetSmallerThanThis(newMinimum) {
    this._minimumInstallmentCanNotGetSmallerThanThis = newMinimum;
    utils.saveToLocalStorage(
      "minimumInstallmentCanNotGetSmallerThanThis",
      newMinimum
    );
  }

  get lastMinPaymentDate() {
    return this._lastMinPaymentDate;
  }

  set lastMinPaymentDate(newDate) {
    this._lastMinimumPaymentDate = newDate;
    utils.saveToLocalStorage("lastMinPaymentDate", newDate);
  }

  get globalIdCounter() {
    return this._globalIdCounter;
  }

  set globalIdCounter(nextId) {
    this._globalIdCounter = nextId;
    utils.saveToLocalStorage("globalIdCounter", nextId);
  }

  /**
   * Download a savefile containing state
   */
  export() {
    const filename =
      "snowballio-save-" + new Date().toJSON().slice(0, 10) + ".json";
    const data = { ...localStorage };
    const blob = new Blob([JSON.stringify(data)], {
      type: "application/json"
    });
    utils.saveToLocalMachine(filename, blob);
  }
  /**
   * Read state from a savefile
   * @param {*} filename
   */
  import(filename, updateDataFromMainScreen, refreshPage) {
    let onload = function(e) {
      const content = JSON.parse(e.target.result);
      if ("activeDebts" in content) {
        this._activeDebts = JSON.parse(content.activeDebts);
      }
      if ("paidOffDebts" in content) {
        this._paidOffDebts = JSON.parse(content.paidOffDebts);
      }
      if ("paymentHistory" in content) {
        this._paymentHistory = JSON.parse(content.paymentHistory);
      }
      if ("lastInterestChargeDates" in content) {
        this._lastInterestChargeDates = JSON.parse(
          content.lastInterestChargeDates
        );
      }
      if ("minimumInstallmentCanNotGetSmallerThanThis" in content) {
        this._minimumInstallmentCanNotGetSmallerThanThis = JSON.parse(
          content.minimumInstallmentCanNotGetSmallerThanThis
        );
      }
      if ("lastMinPaymentDate" in content) {
        this._lastMinimumPaymentDate = new Date(content.lastMinPaymentDate);
      }
      utils.replaceLocalStorageWith(content);
      updateDataFromMainScreen();
      refreshPage();
    }.bind(this);
    utils.getFromLocalMachine(filename, onload);
  }
}

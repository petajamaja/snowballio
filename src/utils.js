export default {
  getFromLocalStorage(name) {
    return localStorage.getItem(name);
  },
  saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
  },
  deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
  },
  to100(number) {
    return Math.floor(number * 100);
  },
  from100(number) {
    return Math.floor(number / 100);
  }
};

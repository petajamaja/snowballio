export default {
  getFromLocalStorage(name) {
    return localStorage.getItem(name);
  },
  saveToLocalStorage(name, value) {
    localStorage.setItem(name, value);
  },
  deepCopy(object) {
    return JSON.parse(JSON.stringify(object));
  }
};

export default {
  getFromLocalStorage(name) {
    return localStorage.getItem(name);
  },
  saveToLocalStorage(name, value) {
    if (Array.isArray(value) || typeof value === "object")
      value = JSON.stringify(value);
    localStorage.setItem(name, value);
  },
  getFromLocalMachine(filename, callback) {
    var reader = new FileReader();
    reader.onload = callback;
    reader.readAsText(filename);
  },
  saveToLocalMachine(filename, blob) {
    let blobUrl = URL.createObjectURL(blob);
    let hiddenLink = document.createElement("a");
    hiddenLink.href = blobUrl;
    hiddenLink.target = "_blank";
    hiddenLink.download = filename;
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
    document.body.removeChild(hiddenLink);
    URL.revokeObjectURL(blobUrl);
  },
  replaceLocalStorageWith(newLocalStorageObject) {
    Object.keys(newLocalStorageObject).forEach(
      function(key) {
        this.saveToLocalStorage(key, newLocalStorageObject[key]);
      }.bind(this)
    );
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

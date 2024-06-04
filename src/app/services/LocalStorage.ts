const LocalStorageService = {
  saveToLocalStorage: function (key: string, value: any) {
    if (global.localStorage) {
      global.localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getFromLocalStorage: function (key: string) {
    if (global.localStorage) {
      const item = global.localStorage.getItem(key);
      return item;
    }
    return null;
  },

  removeFromLocalStorage: function (key: string) {
    if (global.localStorage) {
      global.localStorage.removeItem(key);
      return `${key} removed.`;
    }
    return null;
  },
};

export default LocalStorageService;

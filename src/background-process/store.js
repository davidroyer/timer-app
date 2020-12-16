import Store from "electron-store";

const store = new Store({
  defaults: {
    settings: {
      defaultTime: 25,
      settingB: false
    }
  }
});

export default store;

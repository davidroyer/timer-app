import Store from "electron-store";

const store = new Store({
  defaults: {
    settings: {
      defaultTime: 25,
      useTaskNames: true
    }
  }
});

export default store;

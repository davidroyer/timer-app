import { ipcRenderer } from "electron";
import Vue from "vue";

export const store = Vue.observable({
  settings: {},
  selectedMinutes: null
});

export const mutations = {
  setSelectedMinutes: value => (store.selectedMinutes = value)
};

export const actions = {
  async getSettings() {
    store.settings = await ipcRenderer.invoke("getStoreKey", "settings");
    mutations.setSelectedMinutes(store.settings.defaultTime);
  },

  async updateSettings(newValue) {
    return await ipcRenderer.invoke("updateSettings", newValue);
  }
};

actions.getSettings();

ipcRenderer.on(
  "settingsUpdate",
  (event, newSettings) => (store.settings = newSettings)
);

Vue.prototype.$mutations = mutations;
Vue.prototype.$actions = actions;
Vue.prototype.$store = store;

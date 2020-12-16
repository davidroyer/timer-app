<template>
  <v-app>
    <v-app-bar dense app flat color="appToolbar" dark>
      <div class="font-weight-bold text-h6">TaskTimer</div>

      <v-spacer></v-spacer>

      <v-btn icon @click.stop="showSettingsView = true">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fulid>
        <MainView />
        <Settings
          :show-settings="showSettingsView"
          @close-settings="showSettingsView = false"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainView from "./components/MainView";
import { ipcRenderer } from "electron";

export default {
  name: "App",

  components: {
    MainView,
    Settings: () => import("./components/Settings")
  },

  data: () => ({
    showSettingsView: false,
    settings: {}
  }),

  async created() {
    this.settings = await ipcRenderer.invoke("getStoreKey", "settings");
    console.log(this.$vuetify.icons);
    // ipcRenderer.on(
    //   "settingsUpdate",
    //   (event, newSettings) => (this.settings = newSettings)
    // );
  }
};
</script>

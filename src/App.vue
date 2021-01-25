<template>
  <v-app>
    <!-- <v-system-bar app lights-out color="appToolbar"></v-system-bar> -->

    <v-app-bar dense app flat color="appToolbar" dark>
      <v-spacer></v-spacer>

      <div class="font-weight-bold text-h6">V1.3</div>
      <v-btn style="curser: none;" icon @click.stop="showSettingsView = true">
        <v-icon>mdi-settings</v-icon>
      </v-btn>

      <!-- <v-btn @click="minimizeWindow">Minimize</v-btn> -->
    </v-app-bar>

    <v-main>
      <v-container fluid>
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

  methods: {
    minimizeWindow() {
      ipcRenderer.invoke("update-window", "minimize");
    }
  }
};
</script>

<style>
.v-app-bar {
  -webkit-app-region: drag;
}
</style>

<style lang="scss">
.timer-input input {
  text-align: center !important;
}
</style>

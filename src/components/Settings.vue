<template>
  <v-row justify="center">
    <v-dialog
      v-model="showSettings"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
      @click:outside="$emit('close-settings')"
    >
      <v-card tile>
        <v-toolbar dark flat dense color="appToolbar lighten-1">
          <v-btn icon dark @click="$emit('close-settings')">
            <v-icon>mdi-arrow-left-circle</v-icon>
          </v-btn>
          <v-toolbar-title class="pl-1 font-weight-medium">
            Settings
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="py-2">
            <v-btn text dark @click="saveSettings">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-list three-line class="px-3">
          <v-list-item>
            <v-list-item-action>
              <v-text-field
                v-model="settings.defaultTime"
                type="number"
                class="timer-input"
                @keyup.enter="saveSettings"
              ></v-text-field>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Default Time</v-list-item-title>
              <v-list-item-subtitle>
                Set the default length of time for your timer.
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="settings.settingB"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Setting B</v-list-item-title>
              <v-list-item-subtitle> </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- <pre>{{ settings }}</pre> -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    showSettings: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    widgets: false
  }),

  computed: {
    settings() {
      return this.$store.settings;
    }
  },

  methods: {
    async saveSettings() {
      await this.$actions.updateSettings(this.settings);
      this.$emit("close-settings");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list-item__action {
  min-width: 45px !important;
  max-width: 45px !important;
}
</style>

<style>
.v-dialog--fullscreen {
  top: 24px !important;
}
</style>

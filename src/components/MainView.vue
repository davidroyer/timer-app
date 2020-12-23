<template>
  <v-row class="text-center" justify="center">
    <v-col cols="12">
      <template v-if="!timerRunning">
        <v-text-field v-model="taskName" label="Task Name" />
        <v-row justify="center" align="center">
          <v-col cols="5">
            <v-text-field
              v-model="timerValue"
              single-line
              solo-inverted
              hide-details
              type="number"
              class="timer-input font-weight-bold display-1"
              @keydown.enter="startTimer"
              @input="timerValueDirty = true"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-btn
              class="btn font-weight-bold"
              color="primary lighten-1"
              x-large
              @click="startTimer"
            >
              Start
            </v-btn>
          </v-col>

          <v-col>
            <v-subheader>
              Set your minutes and click go when ready to start the timer.
            </v-subheader>
          </v-col>
        </v-row>
      </template>

      <div v-else class="text-center text-white timer-countdown">
        <div v-if="timerFinished" class="timer-finished">
          <div class="display-4 font-weight-bold grey--text text--darken-3">
            Time Up
          </div>
          <div
            class="flex max-w-xs px-4 mt-4 text-sm justify-evenly timer-finished-options"
          >
            <v-btn outlined @click="resetTimer">Reset</v-btn>
            <v-btn outlined @click="repeatTimer">Repeat</v-btn>
          </div>
        </div>

        <div v-else class="display-4 font-weight-bold ">
          <div class="display-1 grey--text text--darken-2" v-text="taskName" />
          <div class="task-timer grey--text display-4">
            <span>{{ displayMinutes }}:</span>
            <span>{{ displaySeconds }}</span>
          </div>
          <div class="controls">
            <v-btn
              color="error"
              x-large
              dark
              icon
              @click="timerPaused = !timerPaused"
            >
              <v-icon>mdi-pause-circle</v-icon>
            </v-btn>
            <v-btn color="error" x-large dark icon @click="resetTimer">
              <v-icon>mdi-stop-circle</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  data: () => ({
    taskName: "",
    timerRunning: false,
    timerPaused: false,
    timerFinished: false,
    // selectedMinutes: 15,
    oneMinute: 60,
    secondsRemaining: null,
    timerValueDirty: false
  }),

  computed: {
    timerValue: {
      get() {
        if (!this.timerValueDirty) return this.$store.settings.defaultTime;
        else return this.$store.selectedMinutes;
      },
      set(newValue) {
        this.$mutations.setSelectedMinutes(newValue);
      }
    },

    displaySeconds() {
      const value = this.secondsRemaining % this.oneMinute;
      return value < 10 ? `0${value}` : value;
    },
    displayMinutes() {
      return Math.floor(this.secondsRemaining / this.oneMinute);
    }
  },

  methods: {
    startDevTimer() {
      this.timerValue = 0.1;
      this.startTimer();
    },

    startTimer() {
      this.timerRunning = true;
      this.runTimer();
    },

    runTimer() {
      this.secondsRemaining = this.timerValue * 60;

      let countdown = setInterval(() => {
        if (this.timerPaused) return;
        if (this.secondsRemaining > 0) {
          --this.secondsRemaining;
        } else {
          clearInterval(countdown);
          this.timerFinished = true;
          ipcRenderer.send("show-app");
        }
      }, 1000);
    },

    repeatTimer() {
      this.timerFinished = false;
      this.runTimer();
    },

    resetTimer() {
      this.timerRunning = false;
      this.timerFinished = false;
    }
  }
};
</script>

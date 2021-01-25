<template>
  <v-row class="text-center" justify="center">
    <v-col cols="12">
      <template v-if="!timerRunning">
        <v-text-field
          v-model="taskName"
          label="Task Name"
          @keydown.enter="startTimer"
        />
        <v-row justify="center" align="center" dense>
          <v-col cols="6">
            <v-text-field
              v-model.number="timerValue"
              single-line
              solo
              hide-details
              class="timer-input font-weight-bold display-1"
              suffix="mins"
              @keydown.enter="startTimer"
              @input="timerValueDirty = true"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-btn
              class="btn btn-startTimer font-weight-bold"
              color="primary lighten-1"
              x-large
              @click="startTimer"
            >
              Start
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-subheader>
              Set your minutes and click go when ready to start the timer.
            </v-subheader>
          </v-col>
        </v-row>
      </template>

      <div v-else class="text-center text-white timer-countdown">
        <timer-finished
          v-if="timerFinished"
          @reset="resetTimer"
          @repeat="repeatTimer"
        />

        <div v-else>
          <div class="mb-10 task-name text-h4 grey--text" v-text="taskName" />
          <div
            class="task-timer text-h1 font-weight-bold grey--text text--darken-3"
          >
            <span>{{ displayMinutes }}:</span>
            <span>{{ displaySeconds }}</span>
          </div>
          <v-row justify="center" class="controls mt-n3">
            <v-col cols="3">
              <v-btn color="error" depressed fab @click="handlePauseAndResume">
                <v-icon>
                  {{ timerPaused ? "mdi-play" : "mdi-pause" }}
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn color="error" depressed fab @click="stopTimer">
                <v-icon>mdi-stop</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { ipcRenderer } from "electron";
import TimerFinished from "@/views/TimerFinished";
import TimerActive from "@/views/TimerActive";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { TimerFinished, TimerActive },
  data: () => ({
    taskName: "",
    timerRunning: false,
    timerPaused: false,
    timerFinished: false,
    oneMinute: 60,
    secondsRemaining: null,
    timerValueDirty: false,
    countdown: null
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
      this.secondsRemaining = this.timerValue * 60;
      this.runTimer();
    },

    handlePauseAndResume() {
      if (this.timerPaused) {
        this.runTimer();
        this.timerPaused = false;
      } else {
        clearInterval(this.countdown);
        this.timerPaused = true;
      }
    },

    runTimer() {
      this.countdown = setInterval(() => {
        if (this.secondsRemaining > 0) {
          --this.secondsRemaining;
        } else {
          clearInterval(this.countdown);
          this.timerFinished = true;
          ipcRenderer.send("show-app");
        }
      }, 1000);
    },

    repeatTimer() {
      this.timerFinished = false;
      this.startTimer();
    },

    resetTimer() {
      clearInterval(this.countdown);
      this.timerRunning = false;
      this.timerFinished = false;
    },

    stopTimer() {
      clearInterval(this.countdown);
      this.timerRunning = false;
      this.timerPaused = false;
      this.timerFinished = false;
    },

    endTimer() {}
  }
};
</script>

<style lang="scss">
.timer-countdown .task {
  &-name {
    text-transform: capitalize;
    letter-spacing: -2px !important;
  }
}

.btn {
  &-startTimer {
    width: 100%;
  }
}

.timer-input {
  .v-text-field__suffix {
    margin-bottom: -3px;
    margin-right: 5px;
    margin-left: -5px;
    font-size: 1.5rem !important;
    font-weight: 400;
    letter-spacing: normal !important;
  }
}
</style>

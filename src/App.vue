<template>
  <div
    id="app"
    class="flex items-center justify-center min-h-screen bg-indigo-700"
  >
    <div v-if="!timerRunning" class="timer-setup">
      <input
        type="number"
        min="1"
        placeholder="Set Timer"
        class="mr-2"
        v-model="selectedMinutes"
        @keydown.enter="startTimer"
      />
      <button
        @click="startDevTimer"
        class="absolute font-mono text-xs text-gray-400 uppercase btn right-3 top-3"
      >
        Dev Test
      </button>
      <button @click="startTimer" class="btn">Start</button>
    </div>

    <div v-else class="text-center text-white timer-countdown">
      <div class="timer-finished" v-if="timerFinished">
        <div class="font-bold text-7xl">Time Up</div>
        <div
          class="flex max-w-xs px-4 mt-4 text-sm justify-evenly timer-finished-options"
        >
          <button @click="resetTimer" class="text-gray-800 btn">Reset</button>
          <button @click="repeatTimer" class="text-gray-800 btn">Repeat</button>
        </div>
      </div>

      <div v-else class="font-bold text-7xl timer-display">
        <span>{{ displayMinutes }}:</span>
        <span>{{ displaySeconds }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "App",
  data: () => ({
    timerRunning: false,
    timerFinished: false,
    selectedMinutes: 15,
    oneMinute: 60,
    secondsRemaining: null
  }),

  computed: {
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
      this.selectedMinutes = 0.1;
      this.startTimer();
    },

    startTimer() {
      this.timerRunning = true;
      this.runTimer();
    },

    runTimer() {
      this.secondsRemaining = this.selectedMinutes * 60;

      let countdown = setInterval(() => {
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
      this.selectedMinutes = 15;
    }
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

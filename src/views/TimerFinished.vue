<template>
  <div class="timer-finished">
    <div class="text-h2 font-weight-bold grey--text text--darken-3">
      Time Up
    </div>
    <div class="mt-4 timer-finished-options">
      <v-btn depressed color="primary" class="mx-2" @click="$emit('reset')">
        Reset
      </v-btn>
      <v-btn depressed color="primary" class="mx-2" @click="$emit('repeat')">
        Repeat
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

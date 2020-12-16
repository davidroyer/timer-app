<template>
  <v-app>
    <v-app-bar dense app flat color="indigo" dark>
      <div class="font-weight-bold text-h6">TaskTimer</div>
      <!-- <div class="d-flex align-center"></div> -->

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
};
</script>

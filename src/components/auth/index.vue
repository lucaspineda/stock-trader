<template>
  <v-container fill-height>
    <v-card class="mx-auto" elevation="2" width="600">
      <v-tabs fixed-tabs v-model="currentTab">
        <v-tab href="#Login"> Login </v-tab>
        <v-tab href="#Register"> Register </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-tabs-items v-model="currentTab">
        <v-tab-item :value="'Login'">
          <LoginRegister :currentTab="currentTab" />
        </v-tab-item>
        <v-tab-item :value="'Register'">
          <LoginRegister :currentTab="currentTab" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import LoginRegister from "./LoginRegister";
export default {
  components: {
    LoginRegister,
  },
  data() {
    return {
      currentTab: null,
    };
  },
};
</script>

<style>
</style>
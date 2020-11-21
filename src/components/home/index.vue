<template>
  <div>
    <h1 class="display-3 mb-10">Trade and Consult your Stocks</h1>
    <v-sheet :elevation="6" class="pa-2 primary d-flex">
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light">
        Your data is automatically saved after buying and selling stocks
      </span>
    </v-sheet>
    <v-sheet :elevation="6" class="pa-2 success darken-1 mt-3 d-flex">
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light">
        Click "End Day" to start a new day!
      </span>
    </v-sheet>
    <v-divider class="my-6" />
    <span class="display-1"
      ><strong>Your Balance:</strong> {{ balance | formatBalance }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    balance() {
      return this.$store.getters.getBalance;
    },
  },
};
</script>

<style>
</style>
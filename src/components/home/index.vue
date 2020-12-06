<template>
  <div>
    <h1 class="display-3 mb-10">Trade and Consult your Stocks</h1>
    <v-sheet :elevation="6" class="pa-2 d-flex yellow darken-3">
      <v-icon class="mr-3">info</v-icon>
      <span class="black--text headline font-weight-light">
        This website is a stock market simulation, buy and sell stocks within days to see if you can become a millionaire :)
      </span>
    </v-sheet>
    <v-sheet :elevation="6" class="pa-2 primary d-flex mt-3">
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light">
        Go to
        <router-link class="white--text" to="/stocks">STOCKS</router-link>
        tab to start buying stocks, and 
        <router-link class="white--text" to="/portfolio">PORTFOLIO</router-link>
        to sell them
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
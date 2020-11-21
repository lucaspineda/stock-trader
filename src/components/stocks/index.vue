<template>
  <v-layout row wrap>
    <Stock v-for="(stock, key) in stocks" :key="key" :stock="stock" :id="key" />
  </v-layout>
</template>

<script>
import Stock from "./stock";

export default {
  components: {
    Stock,
  },

  data() {
    return {
      quantity: 0,
    };
  },
  computed: {
    stocks() {
      return this.$store.getters["stocks/getStocks"];
    },
  },
};
</script>

<style scoped>
</style>
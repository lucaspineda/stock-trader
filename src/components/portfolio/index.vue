<template>
  <v-layout row wrap>
    <v-sheet
      width="100%"
      v-if="Object.keys(acquiredStock).length === 0"
      :elevation="6"
      class="pa-2 mt-10 primary d-flex"
    >
      <v-icon class="white--text mr-3">info</v-icon>
      <span class="headline white--text font-weight-light">
        Buy stocks to sell them in this page
      </span>
    </v-sheet>
    <AcquiredStock
      v-for="(stock, key) in acquiredStock"
      :key="key"
      :stock="stock"
      :id="key"
      xs12
      md6
      lg4
    />
  </v-layout>
</template>

<script>
import AcquiredStock from "./acquiredStock";

export default {
  components: {
    AcquiredStock,
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
    acquiredStock() {
      let result = {};
      for (const key in this.stocks) {
        if (this.stocks[key].quantity > 0) {
          result[key] = this.stocks[key];
        }
      }
      return result;
    },
  },
};
</script>

<style scoped>
.cards-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.stock {
  margin: 0 16px 16px 0;
  max-width: 33%;
  flex-basis: 33%;
  flex-grow: 0;
}
</style>
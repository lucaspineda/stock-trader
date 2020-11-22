
<template>
  <v-toolbar>
    <v-toolbar-title class="mr-6">
      <span>STOCK</span>
      <span>TRADER</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn text to="/">HOME</v-btn>
      <v-btn text to="/portfolio">PORTFOLIO</v-btn>
      <v-btn text to="/stocks">STOCKS</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="endDay" text>END DAY</v-btn>
      <v-btn @click="resetSimulation" text>RESET SIMULATION</v-btn>
      <span class="balance mx-6"
        >BALANCE: {{ allData.balance | formatBalance }}</span
      >
      <v-btn class="blue-grey lighten-5" @click="logoutUserLocal" text>
        <v-icon class="mr-2">mdi-power</v-icon>
        LOGOUT
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {
    this.handleAuthStateChange().then(() => {
      this.fbAddStock(this.allData.stocks);
      this.fbSetBalance(this.allData.balance);
    });
  },
  computed: {
    allData() {
      return {
        balance: this.getBalance(),
        stocks: this.getStocks(),
        portfolio: [],
      };
    },
  },
  methods: {
    ...mapGetters("stocks", ["getStocks"]),
    ...mapGetters(["getBalance"]),
    ...mapActions("auth", ["logoutUser", "handleAuthStateChange"]),
    ...mapActions("stocks", ["fbAddStock", "updateStock"]),
    ...mapActions(["fbSetBalance", "fbUpdateBalance"]),

    endDay() {
      for (const key in this.allData.stocks) {
        let newPrice = this.allData.stocks[key].price + this.getRandom(-5, 5);
        if (newPrice < 1) {
          newPrice = 1;
        }
        this.updateStock({ id: key, updates: { price: newPrice } });
      }
    },
    getRandom(min, max) {
      const random = Math.random() * (max - min) + min;
      return Math.round(random);
    },
    resetSimulation() {
      for (const key in this.allData.stocks) {
        this.updateStock({ id: key, updates: { quantity: 0 } });
        this.fbUpdateBalance({ balance: 1000 });
      }
    },
    logoutUserLocal() {
      this.logoutUser();
    },
  },
};
</script>

<style scoped>
.balance {
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
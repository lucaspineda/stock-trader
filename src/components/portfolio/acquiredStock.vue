<template>
  <v-card v-if="stock.quantity > 0" color="#fff">
    <v-card tile class="blue darken-3 white--text">
      <v-card-title>
        <span class="title font-weight-light">
          {{ stock.name }} (Price: {{ stock.price | formatBalance }} | Quantity:
          {{ stock.quantity }} )
        </span>
      </v-card-title>
    </v-card>
    <v-card tile class="sub-card">
      <v-text-field
        type="number"
        label="Quantity"
        v-model.number="quantity"
      ></v-text-field>
      <v-btn
        class="blue darken-3 white--text buy-btn"
        :disabled="BtnDisabled"
        @click="sellStock(stock.price, quantity)"
        >Vender</v-btn
      >
    </v-card>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["stock", "id"],
  data() {
    return {
      quantity: 0,
    };
  },
  methods: {
    ...mapActions("stocks", ["updateStock"]),
    ...mapActions(["fbUpdateBalance"]),
    sellStock(soldPrice, quantity) {
      quantity = parseInt(quantity);
      let newBalance = this.$store.state.balance + soldPrice * quantity;
      this.stock.quantity -= this.quantity;
      const quantityTotal = this.stock.quantity;
      this.updateStock({
        id: this.id,
        updates: { quantity: quantityTotal, price: soldPrice },
      });
      this.fbUpdateBalance({ balance: newBalance });
      this.quantity = 0;
    },
  },
  computed: {
    BtnDisabled: function () {
      let value = !(
        this.quantity > 0 &&
        this.quantity <= this.stock.quantity &&
        Number.isInteger(this.quantity)
      );
      return value;
    },
  },
};
</script>

<style scoped>
.sub-card {
  padding: 24px;
  display: flex;
  align-items: center;
}

.buy-btn {
  margin-left: 24px;
}
</style>
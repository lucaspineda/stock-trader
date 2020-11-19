<template>
    <v-flex class="pr-3 pb-3" xs12 md6 lg4>
        <v-card color="#fff">
            <v-card tile class="green darken-3 white--text">
                <v-card-title>
                    <span class="title font-weight-light">{{ stock.name }} (Price: {{ stock.price | formatBalance}})</span>
                </v-card-title>
            </v-card>
            <v-card tile class="sub-card">
                <v-text-field
                    type="number"
                    label="Quantity"
                    v-model.number="quantity"
                ></v-text-field>
                <v-btn class="green darken-3 white--text buy-btn" 
                :disabled="BtnDisabled"
                @click="buyStockLocal(quantity, stock.price)">Buy</v-btn>
            </v-card>
        </v-card>
    </v-flex>
</template>

<script>

import { mapActions } from 'vuex'

export default {
    props: ['stock', 'id'],
    data() {
        return {
            quantity: 0,
            balance: this.$store.state.balance
        }
    },
    created() {
        console.log(this.stock)
    },
    methods: {
        ...mapActions('stocks', ['updateStock']),
        ...mapActions(['fbUpdateBalance']),
        // buyStockLocal(quantity, price) {
        //     quantity = parseInt(quantity)
        //     this.stock.quantity += quantity
        //     this.buyStock({quantity, price})
        //     this.quantity = 0
        // }
        buyStockLocal(quantity, price) {
            quantity = parseInt(quantity)
            const newBalance = this.balance - quantity * price
            this.stock.quantity += quantity
            const quantityTotal = this.stock.quantity
            this.updateStock({ id: this.id, updates: { quantity: quantityTotal, price } })
            this.fbUpdateBalance({ balance: newBalance })
            this.quantity = 0
        }
    },
    computed: {
        BtnDisabled: function() {
            let value = !(this.quantity > 0 &&
            (this.quantity * this.stock.price <= this.balance) &&
            Number.isInteger(this.quantity))
            return value
        }
    },
}
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
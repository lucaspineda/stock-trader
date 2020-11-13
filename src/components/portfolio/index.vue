<template>
    <div class="cards-box">
        <v-sheet width="100%" v-if="acquiredStock.length === 0" :elevation="6" class="pa-2 mt-10 primary d-flex">
            <v-icon class="white--text mr-3">info</v-icon>
            <span class="headline white--text font-weight-light">
                Buy stocks to visualize them in this page
            </span>
        </v-sheet>
        <Stock v-for="stock in acquiredStock" 
            :key="stock.name" 
            class="mr-3 mb-3" xs12 md6 lg4
            :stock="stock"/>
    </div>
</template>

<script>

import Stock from './acquiredStock'

export default {
    components: {
        Stock
    },
    data() {
        return {
            quantity: 0,
        }
    },
    computed: {
        stocks() {
            return this.$store.state.stocks.stocks
        },
        acquiredStock() {
            return this.stocks.filter((stock) => stock.quantity > 0)
        }
    },
    created() {
        console.log(this.stocks)
    }

}
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
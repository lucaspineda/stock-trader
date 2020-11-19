
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
            <span class="balance mx-6">BALANCE: {{ allData.balance | formatBalance }}</span>
            <v-btn class="blue-grey lighten-5" @click="logoutUserLocal" text>
                <v-icon class="mr-2">mdi-power</v-icon>
                LOGOUT
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

// import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },
    mounted() {
        this.handleAuthStateChange()
        setTimeout(() => {
            this.fbAddTasks(this.allData.stocks)
            this.fbSetBalance(this.allData.balance)
        }, 1000);
    },
    computed: {
        allData() {
            return {
                balance: this.$store.state.balance,
                stocks: this.$store.state.stocks.stocks,
                portfolio: []
            }
        },
    },
    methods: {
        ...mapActions('auth', ['logoutUser', 'handleAuthStateChange']),
        ...mapActions('stocks', ['fbAddTasks', 'updateStock']),
        ...mapActions(['fbSetBalance', 'fbUpdateBalance']),
        
        loadDataLocal() {
            this.loadData()
        },
        endDay() {
            for (const key in this.allData.stocks) {
                let newPrice = this.allData.stocks[key].price + this.getRandom(-5, 5)
                if(newPrice < 1) {
                    newPrice = 1
                }
                this.updateStock({ id: key, updates: { price: newPrice } })
            }
        },
        getRandom(min, max){
            const random = Math.random() * (max - min) + min
            return Math.round(random)
        },
        resetSimulation() {
            this.allData.stocks.forEach(stock => {
                stock.quantity = 0
            })
            this.$store.dispatch('saveData', {balance: 1000})
        },
        logoutUserLocal() {
            this.logoutUser()
        }
    },
}
</script>

<style scoped>

    .balance {
        display: flex;
        align-items: center;
        font-size: 14px;
    }
    
</style>
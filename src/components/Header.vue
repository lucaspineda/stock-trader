
<template>
    <v-toolbar>
        <v-toolbar-title class="mr-6">
            <span>STOCK</span>
            <span>TRADER</span>
        </v-toolbar-title>
        <v-toolbar-items>
            <v-btn text to="/">INÍCIO</v-btn>         
            <v-btn text to="/portfolio">PORTFÓLIO</v-btn>
            <v-btn text to="/stocks">AÇÕES</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn @click="endDay" text>FINALIZAR DIA</v-btn>
            <v-btn @click="resetSimulation" text>ZERAR SIMULAÇÃO</v-btn>
            <span class="balance mx-6">SALDO: {{ allData.balance | formatBalance }}</span>
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
    created() {
        this.loadDataLocal()
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
        ...mapActions(['loadData']),
        ...mapActions('auth', ['logoutUser']),
        
        loadDataLocal() {
            this.loadData()
            console.log('chamou load')
        },
        endDay() {
            this.allData.stocks.forEach(stock => {
                stock.price += this.getRandom(-5, 5)
            });

            this.$store.dispatch('saveData', {stocks: this.allData.stocks})
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
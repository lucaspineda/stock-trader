import Vue from 'vue'
import Vuex from 'vuex'
import stocks from './modules/stocks'
import auth from './modules/auth'
import { firebaseDb, firebaseAuth } from '@/plugins/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    balance: 1000,
    balanceDownloaded: false,
  },
  getters: {
    getBalance(state) {
      return state.balance
    },
    balanceDownloaded(state) {
      return state.balanceDownloaded
    }
  },
  mutations: {
    setBalance(state, payload) {
      state.balance = payload
    },
    setBalanceDownloaded(state, payload) {
      state.balance = payload
    },
  },
  actions: {
    fbReadData({ commit }) {
      let userId = firebaseAuth.currentUser.uid
      let userBalance = firebaseDb.ref('balance/' + userId)

      // initial check for data
      userBalance.once('value', () => {
        commit('stocks/setStocksDownloaded', true, { root: true })
      }, error => {
        console.log('error.message: ', error.message)
      })

      // value changed
      userBalance.on('value', snapshot => {
        let balance = snapshot.val().balance
        commit('setBalance', balance)
      })
    },
    fbSetBalance(context, balance) {
      let userId = firebaseAuth.currentUser.uid
      let balanceRef = firebaseDb.ref('balance/' + userId)

      balanceRef.once('value', function (snapshot) {
        var exists = (snapshot.val() !== null);
        if (!exists) {
          balanceRef.set({ balance: balance })
        }
      })
    },
    fbUpdateBalance(context, balance) {
      let userId = firebaseAuth.currentUser.uid
      let stockRef = firebaseDb.ref('balance/' + userId)
      stockRef.update(balance)
    },
  },
  modules: { stocks, auth }
})

import Vue from 'vue'
import { firebaseDb, firebaseAuth } from '@/plugins/firebase'

export default {
  namespaced: true,
  state: {
    stocks: {
      'ID1': {
        name: 'Facebook',
        price: 20,
        quantity: 0
      },
      'ID2': {
        name: 'Apple',
        price: 32,
        quantity: 0
      },
      'ID3': {
        name: 'Microsoft',
        price: 32,
        quantity: 0
      },
      'ID4': {
        name: 'Amazon',
        price: 24,
        quantity: 0
      },
      'ID5': {
        name: 'Google',
        price: 28,
        quantity: 0
      },
      'ID6': {
        name: 'Alibaba',
        price: 14,
        quantity: 0
      },
      'ID7': {
        name: 'Wal-Mart',
        price: 17,
        quantity: 0
      },
      'ID8': {
        name: 'Wells Fargo',
        price: 25,
        quantity: 0
      },
      'ID9': {
        name: 'AT&T',
        price: 21,
        quantity: 0
      },
      'ID10': {
        name: 'UnitedHealth Group',
        price: 16,
        quantity: 0
      },
    },
    stocksDownloaded: false,
  },
  getters: {
    getStocks(state) {
      return state.stocks
    }
  },
  mutations: {
    setStocks(state, payload) {
      state.stocks = payload
    },
    updateStock(state, payload) {
      Object.assign(state.stocks[payload.id], payload.updates)
    },
    addStock(state, payload) {
      Vue.set(state.stocks, payload.id, payload.stock)
    },
    setStocksDownloaded(state, value) {
      state.stocksDownloaded = value
    }
  },
  actions: {
    updateStock({ dispatch }, payload) {
      dispatch('fbUpdateStock', payload)
    },
    fbReadData({ commit }) {
      let userId = firebaseAuth.currentUser.uid
      let userStock = firebaseDb.ref('stocks/' + userId)

      // initial check for data
      userStock.once('value', () => {
        commit('setStocksDownloaded', true)
      }, error => {
        console.log('error.message: ', error.message)
      })

      // child added
      userStock.on('child_added', snapshot => {
        let stock = snapshot.val()
        let payload = {
          id: snapshot.key,
          stock: stock
        }
        commit('addStock', payload)
      })

      // child changed
      userStock.on('child_changed', snapshot => {
        let stock = snapshot.val()
        let payload = {
          id: snapshot.key,
          updates: stock
        }
        commit('updateStock', payload)
      })
    },
    fbAddStock(context, stocks) {
      let userId = firebaseAuth.currentUser.uid
      Object.keys(stocks).forEach((id) => {
        let stock = stocks[id]
        let stockRef = firebaseDb.ref('stocks/' + userId + '/' + id)
        stockRef.once('value', function (snapshot) {
          var exists = (snapshot.val() !== null);
          if (!exists) {
            stockRef.set(stock)
          }
        })
      })
    },
    fbUpdateStock(context, payload) {
      let userId = firebaseAuth.currentUser.uid
      let stockRef = firebaseDb.ref('stocks/' + userId + '/' + payload.id)
      stockRef.update(payload.updates)
    },
  }
}
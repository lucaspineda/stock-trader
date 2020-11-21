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
      }
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
    addTask(state, payload) {
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
        commit('addTask', payload)
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
    fbAddTasks(context, stocks) {
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
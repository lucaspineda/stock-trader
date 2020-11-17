import { firebaseDb, firebaseAuth } from '@/plugins/firebase'


export default {
  namespaced: true,
  state: {
    stocks: {
      'ID1': {
        name: 'Facebook',
        price: 20,
        quantity: 0
      }
    },
    stocksDownloaded: false,
  },
  getters: {
    stocks(state) {
      return state.stocks
    }
  },
  mutations: {
    setStocks(state, payload) {
      state.stocks = payload
      // console.log(state.stocks)
    },
    // updateTask(state, payload) {
    //   Object.assign(state.tasks[payload.id], payload.updates)
    // },
    addTask(state, payload) {
      state.push(payload)
    },
    clearTasks(state) {
      state.tasks = {}
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
        // let payload = {
        //   id: snapshot.key,
        //   task: task
        // }
        let payload = stock
        commit('addTask', payload)
      })
  
      // child changed
      userStock.on('child_changed', snapshot => {
        let task = snapshot.val()
        let payload = {
          id: snapshot.key,
          updates: task
        }
        commit('updateTask', payload)
      })
  
      // child removed
      userStock.on('child_removed', snapshot => {
        let taskId = snapshot.key
        commit('deleteTask', taskId)
      })
    },
    fbAddTasks(context, stocks) {
      let userId = firebaseAuth.currentUser.uid
      console.log(stocks, 'stocks')

      Object.keys(stocks).forEach((id) => {
        let stock = stocks[id]
        console.log(stock, 'stock')
        console.log(stock.name)
        let stockRef = firebaseDb.ref('stocks/' + userId + '/' + id)
        stockRef.once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          if(!exists) {
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
import { firebaseDb, firebaseAuth } from '@/plugins/firebase'


export default {
  namespaced: true,
  state: {
    stocks: [
      {
        id: 1,
        name: 'Facebook',
        price: 20,
        quantity: 0
      },
    ],
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
    clearTasks(state) {
      state.tasks = {}
    },
    setTasksDownloaded(state, value) {
      state.tasksDownloaded = value
    }
  },
  actions: {
    updateStock({ dispatch }, payload) {
      dispatch('fbUpdateStock', payload)
    },
    fbReadData({ commit }) {
      let userId = firebaseAuth.currentUser.uid
      let userTasks = firebaseDb.ref('tasks/' + userId)
  
      // initial check for data
      userTasks.once('value', () => {
        commit('setTasksDownloaded', true)
      }, error => {
        console.log('error.message: ', error.message)
      })
  
      // child added
      userTasks.on('child_added', snapshot => {
        let task = snapshot.val()
        let payload = {
          id: snapshot.key,
          task: task
        }
        commit('addTask', payload)
      })
  
      // child changed
      userTasks.on('child_changed', snapshot => {
        let task = snapshot.val()
        let payload = {
          id: snapshot.key,
          updates: task
        }
        commit('updateTask', payload)
      })
  
      // child removed
      userTasks.on('child_removed', snapshot => {
        let taskId = snapshot.key
        commit('deleteTask', taskId)
      })
    },
    fbAddTasks(context, tasks) {
      let userId = firebaseAuth.currentUser.uid
      tasks.forEach((task) => {
        let stockRef = firebaseDb.ref('stocks/' + userId + '/' + task.id)
        stockRef.once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);
          if(!exists) {
            stockRef.set(task)
          }
        });
      })
    },
    fbUpdateStock(context, payload) {
      let userId = firebaseAuth.currentUser.uid
      let stockRef = firebaseDb.ref('stocks/' + userId + '/' + payload.id)
      stockRef.update(payload.updates)
    },
  }
}
import { firebaseAuth } from '@/plugins/firebase.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    loggedIn: false
  },
  getters: {
    loggedIn: state => state.loggedIn,
  },
  mutations: {
    setLoggedIn(state, payload) {
      state.loggedIn = payload
    }
  },
  actions: {
    register(ctx, payload) {
      firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(response => {
          console.log('response: ', response)
        })
        .catch(error => {
          // showErrorMessage(error.message)
          console.log(error)
        })
    },
    login(ctx, payload) {
      firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				console.log('response: ', response)
			})
			.catch(error => {
        // showErrorMessage(error.message)
        console.log(error)
			})
    },
    logoutUser() {
      firebaseAuth.signOut()
    },
    handleAuthStateChange({ commit }) {
      firebaseAuth.onAuthStateChanged(user => {
        // Loading.hide()
        console.log('chamou handle')
        if (user) {
          commit('setLoggedIn', true)
          // LocalStorage.set('loggedIn', true)
          // localStorage.loggedIn = true
          localStorage.loggedIn = JSON.stringify(true)
          router.push('/')
          // dispatch('tasks/fbReadData', null, { root: true })
        }
        else {
          // commit('tasks/clearTasks', null, { root: true })
          // commit('tasks/setTasksDownloaded', false, { root: true })
          // commit('setLoggedIn', false)
          // LocalStorage.set('loggedIn', false)
          // localStorage.loggedIn = false
          localStorage.loggedIn = JSON.stringify(false)
          router.replace('/auth')
        }
      })
    }
  }
}
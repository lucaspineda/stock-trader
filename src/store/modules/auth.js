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
        .then(() => {
          console.log('registered')
        })
        .catch(error => {
          console.log(error)
        })
    },
    login(ctx, payload) {
      firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(() => {
          console.log('success')
        })
        .catch(error => {
          console.log(error)
        })
    },
    logoutUser() {
      firebaseAuth.signOut()
    },
    handleAuthStateChange({ commit, dispatch }) {
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          commit('setLoggedIn', true)
          localStorage.loggedIn = JSON.stringify(true)
          router.push('/')
          dispatch('stocks/fbReadData', null, { root: true })
          dispatch('fbReadData', null, { root: true })
        }
        else {
          localStorage.loggedIn = JSON.stringify(false)
          commit('setLoggedIn', false)
          commit('stocks/stocksDownloaded', false)
          router.replace('/auth')
        }
      })
    }
  }
}
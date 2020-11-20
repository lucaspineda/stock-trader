export default {
    namespace: true,
    state: {
        acquiredStocks: []
    },
    getters: {
        acquiredStocks(state) {
            return state.acquiredStocks
        }
    },
    mutations: {
        setAcquiredStocks(state, payload) {
            state.acquiredStocks = payload
        }
    }
}
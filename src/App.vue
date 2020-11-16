<template>
  <v-app>
    <div id="app">
      <template v-if="!this.$route.meta.noHeader">
        <Header />
      </template>
      <div class="box-screen">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header';
import { mapActions } from 'vuex'


export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange()
  }
};
</script>
<style>
  @keyframes slide-in {
    from { transform: translateY(-30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slide-out {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-30); opacity: 0; }
  }
  .slide-enter-active {
    animation: slide-in 0.3s ease;
  }
  .slide-leave-active {
    animation: slide-out 0.3s ease;
  }
</style>
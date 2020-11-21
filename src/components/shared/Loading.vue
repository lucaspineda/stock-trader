<template>
  <v-overlay v-if="loading">
    <v-progress-circular
      :size="100"
      color="blue"
      :width="8"
      indeterminate
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      defaul: false,
    },
  },
};
</script>

<style>
</style>
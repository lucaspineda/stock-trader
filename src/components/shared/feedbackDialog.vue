<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card class="pt-4">
        <v-card-text class="text--black">
          {{ feedback }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="close()"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      defaul: false,
    },
    feedback: {
      type: String,
      defaul: "Error",
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style>
</style>
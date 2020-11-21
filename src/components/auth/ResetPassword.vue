
<template>
  <v-dialog v-model="openDialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on"> Reset Password </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Reset Password</span>
      </v-card-title>
      <v-card-text class="px-2 py-0">
        <v-col cols="12">
          <v-text-field
            :error-messages="emailErrors"
            v-model="email"
            label="Email"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            @keyup.enter="sendResetEmail"
          ></v-text-field>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary darken-1" text @click="openDialog = false">
          Close
        </v-btn>
        <v-btn class="mr-4 primary" text @click="sendResetEmail"> Send </v-btn>
      </v-card-actions>
    </v-card>
    <FeedbackDialog
      :dialog="feedbackDialog"
      :feedback="feedbackError"
      @close-dialog="closeFeedbackDialog"
    />
    <Loading :loading="loading" />
  </v-dialog>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { firebaseAuth } from "@/plugins/firebase.js";
import FeedbackDialog from "./../shared/feedbackDialog.vue";
import Loading from "./../shared/Loading.vue";

export default {
  mixins: [validationMixin],
  components: {
    FeedbackDialog,
    Loading,
  },

  data() {
    return {
      openDialog: false,
      email: "",
      feedbackDialog: false,
      feedbackError: "",
      loading: false,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    sendResetEmail() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.loading = true;
        firebaseAuth
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.openDialog = false;
          })
          .catch((error) => {
            this.feedbackDialog = true;
            this.feedbackError = error.message;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    closeFeedbackDialog() {
      this.feedbackDialog = false;
    },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("E-mail is required");
      !this.$v.email.email && errors.push("Must be valid e-mail");
      return errors;
    },
  },
};
</script>

<style>
</style>
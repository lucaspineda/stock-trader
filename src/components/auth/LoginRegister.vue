<template>
  <div class="pa-4">
    <v-sheet :elevation="6" class="pa-2 primary d-flex align-center">
      <v-icon large class="white--text mr-4">mdi-account-circle</v-icon>
      <span class="white--text font-weight-light">
        {{ currentTab }} to access the Stock Trader simulator
      </span>
    </v-sheet>
    <form class="mt-8">
      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="At least 6 characters"
        @click:append="showPassword = !showPassword"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <div class="mt-2">
        <v-btn
          class="mr-4 primary"
          @click="submit"
        >
          {{ currentTab }}
        </v-btn>
        <v-btn v-if="currentTab === 'login'" @click="clear">
          Reset password
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['currentTab'],
  mixins: [validationMixin],

  validations: {
    password: { required, minLength: minLength(6) },
    email: { required, email },
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required')
      !this.$v.email.email && errors.push('Must be valid e-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required')
      !this.$v.password.minLength && errors.push('Min 6 characters')
      return errors
    },
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
  },
}
</script>

<style>

</style>
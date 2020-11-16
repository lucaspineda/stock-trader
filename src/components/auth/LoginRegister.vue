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
        v-model="formData.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.formData.email.$touch()"
        @blur="$v.formData.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="formData.password"
        :error-messages="passwordErrors"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        hint="At least 6 characters"
        @click:append="showPassword = !showPassword"
        @input="$v.formData.password.$touch()"
        @blur="$v.formData.password.$touch()"
      ></v-text-field>
      <div class="mt-2">
        <v-btn
          class="mr-4 primary"
          @click="submit"
        >
          {{ currentTab }}
        </v-btn>
        <v-btn v-if="currentTab === 'login'">
          Reset password
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  props: ['currentTab'],
  mixins: [validationMixin],

  validations: {
    // password: { required, minLength: minLength(6) },
    // email: { required, email },
    formData: {
      password: { required, minLength: minLength(6) },
      email: { required, email },
    }
  },
  data() {
    return {
      email: '',
      formData: {
        email: '',
        password: '',
      },
      showPassword: false,
    }
  },
  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.formData.email.$dirty) return errors
      !this.$v.formData.email.required && errors.push('E-mail is required')
      !this.$v.formData.email.email && errors.push('Must be valid e-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.formData.password.$dirty) return errors
      !this.$v.formData.password.required && errors.push('Password is required')
      !this.$v.formData.password.minLength && errors.push('Min 6 characters')
      return errors
    },
  },

  methods: {
    ...mapActions('auth', ['register', 'login']),

    submit () {
      this.$v.$touch()
      if(!this.$v.$anyError) {
        if(this.currentTab === 'login') {
          this.login(this.formData)
        } else {
          this.register(this.formData)
        }
      }
    },
  },
}
</script>

<style>

</style>
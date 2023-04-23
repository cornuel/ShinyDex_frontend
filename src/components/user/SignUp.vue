<template>
  <!-- <div class="sign-up">
        <h1>Sign up</h1>
        <form @submit.prevent="submitForm">
            <input type="email" name="email" v-model="email">
            <input type="username" name="username" v-model="username">
            <input type="password" name="password" v-model="password">
            <button type="submit">Sign up</button>
        </form>
    </div> -->
  <div class="sign-in">

    <div class="flex justify-center items-center mt-52">
      <div class="w-full max-w-xs text-left">
        <Form class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" @submit="submitForm">
          <img class="mx-auto mb-2" src="@/assets/shinydex.png" alt=""/>
          <div class="identity-input mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Field
              class="shadow appearance-none rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email" 
              name="email"
              v-model="email"
              :rules="validateEmail" />
            <ErrorMessage class="text-xs text-red-700" name="email" />
          </div>
          <!-- <div class="identity-input mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <Field
              class="shadow appearance-none rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="username" 
              name="username"
              v-model="username"
              :rules="validateUsername" />
            <ErrorMessage class="text-xs text-red-700" name="username" />
          </div> -->
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <Field
            class="shadow appearance-none rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" 
            name="password" 
            v-model="password"
            :rules="validatePassword" />
          <ErrorMessage class="text-xs text-red-700" name="password" />
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign in
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#log-in"
            >
              I have an account
            </a>
          </div>
        </Form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'SignUp',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    return {
      email: '',
      // username: '',
      password: ''
    }
  },
  methods: {
    async submitForm() {
      const formData = {
        email: this.email,
        // username: this.username,
        password: this.password
      }

      axios
        .post('https://shinydex.pythonanywhere.com/api/v1/signup', formData)
        .then(() => {
          this.$router.push('/log-in')
        })
        .catch(() => {
          // console.log(error)
        })
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'Email is required';
      }

      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }

      // All is good
      return true;
    },
    validateUsername(value) {
      if (!value) {
        return 'Username is required';
      }
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return 'Password is required';
      }
      return true;
    }
  }
}
</script>
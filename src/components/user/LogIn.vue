<template>
  <div class="log-in">
    <div class="flex justify-center items-center mt-52">
      <div class="w-full max-w-xs text-left">
        <Form class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" @submit="submitForm">
          <img class="mx-auto mb-2" src="@/assets/shinydex.png" alt="" />
          <div class="identity-input mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <Field
              class="shadow appearance-none rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email" name="email" v-model="email" :rules="validateUsername" />
            <ErrorMessage class="text-xs text-red-700" name="email" />
          </div>
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <Field
            class="shadow appearance-none rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password" name="password" v-model="password" :rules="validatePassword" />
          <ErrorMessage class="text-xs text-red-700" name="password" />
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Log In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#sign-up">
              Create an account
            </a>
          </div>
        </Form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/store/user'
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: 'LogIn',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submitForm() {
      const formData = {
        email: this.email,
        password: this.password,
      }

      axios
        .post('http://shinydex.pythonanywhere.com/api/v1/login', formData)
        .then(response => {
          if (response.data.token == "Invalid email or password") {
            this.$notify({
              group: "foo",
              title: "Oups",
              type: "oups",
              text: `Mauvais identifiant ou mot de passe`,
            }, 3000) // 2s
          }
          else {
            // console.log(response)
            // console.log(response.data)
            const token = response.data.token
            this.userStore.setToken(token)
            this.userStore.setUser(this.email)
            localStorage.setItem('token', token);
            this.$notify({
              group: "foo",
              title: "Bravo",
              type: "bravo",
              text: `Bienvenue ${this.email} !`
            }, 3000) // 2s
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            this.$router.push('/dash-board')
            // console.log(response)
          }
        })
        .catch(error => {
          if (error.code == 'ERR_BAD_REQUEST') {
            this.$notify({
              group: "foo",
              title: "Oups",
              type: "oups",
              text: `Error`,
            }, 3000) // 2s
          }
        })
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
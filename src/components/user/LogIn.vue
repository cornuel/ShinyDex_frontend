<template>
    <div class="log-in">
        <h1>Log in</h1>

        <form @submit.prevent="submitForm">
            <input type="username" name="username" v-model="username">
            <input type="password" name="password" v-model="password">
            <button type="submit">Log In</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/store/user'

export default {
    name: 'LogIn',

    setup() {
        const userStore = useUserStore();
        return { userStore };
    },

    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        submitForm() {
            const formData = {
                username: this.username,
                password: this.password,
            }

            axios
                .post('http://127.0.0.1:8000/api/v1/token/login', formData)
                .then(response => {
                    const token = response.data.auth_token
                    this.userStore.setToken(token)
                    this.userStore.setUser(this.username)
                    axios.defaults.headers.common['Authorization'] = "Token " + token
                    this.$router.push('/dash-board')
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>
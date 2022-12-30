<template>
    <div class="sign-up">
        <h1>Sign up</h1>
        <form @submit.prevent="submitForm">
            <input type="email" name="email" v-model="email">
            <input type="username" name="username" v-model="username">
            <input type="password" name="password" v-model="password">
            <button type="submit">Sign up</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignUp',
    data() {
        return {
            email: '',
            username: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            const formData = {
                email: this.email,
                username: this.username,
                password: this.password
            }

            axios
                .post('http://127.0.0.1:8000/api/v1/users/', formData)
                .then(response => {

                    this.$router.push('/log-in')
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>
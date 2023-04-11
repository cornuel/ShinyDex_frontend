<template>
  <!-- <NavBar :filterTypes="filterTypes"/>
      <GetPkmns :pkmns="pkmns"/> -->

  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;1,300&family=Nunito:wght@400;600&display=swap" rel="stylesheet">
  </head>
  <ToastNotification />
  <div id="app" class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-gray-800">
    <div id="nav" v-if="!this.userStore.user">
      <RouterLink to="/sign-up" />
      <RouterLink to="/log-in" />
    </div>
    <div v-if="this.userStore.user">
      <RouterLink to="/dash-board" :user="user"></RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'
import ToastNotification from './components/ToastNotification.vue';

import { useUserStore } from "@/store/user";

export default {
  name: 'App',

  head: {
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '@/assets/shinydex_icon.png'
      }
    ]
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  components: {
    ToastNotification,
  },

  data() {
    return {
      menuOpen: false,
      mySite: null,
      user: {
        isAuthenticated: false,
        token: this.userStore.getToken || "",
        info: this.userStore.getUser || {},
      },
      dataLoaded: false,
      pkmns: [],
      allPkmns: [],
    };
  },

  created() {
    this.$router.push('/log-in');
    document.title = "ShinyDex";
    if (this.user.token) {
      // Peutetre pas utile car isAuthenticated n'est que dans App.vue
      this.user.isAuthenticated = true;
      axios.defaults.headers.common['Authorization'] = "Token " + this.user.token
    } else {
      axios.defaults.headers.common['Authorization'] = ''
    }
  },

  mounted() {
  },

}
</script>

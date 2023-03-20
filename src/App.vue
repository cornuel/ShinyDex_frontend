<template>
    <!-- <NavBar :filterTypes="filterTypes"/>
      <GetPkmns :pkmns="pkmns"/> -->
  <div id="app" class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-gray-800"> 
    <div id="nav" v-if="!this.userStore.user">
      <RouterLink to="/sign-up" >Sign Up</RouterLink>
      <RouterLink to="/log-in" >Log In</RouterLink>
    </div>
    <div v-if="this.userStore.user">
        <RouterLink to="/dash-board" :user="user"></RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'

import { useUserStore } from "@/store/user";

export default {
  name: 'App',

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  components: {

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
      allPkmns : [],
    };
  },

  async created () {
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

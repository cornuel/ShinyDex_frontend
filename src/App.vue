<template>
    <!-- <NavBar :filterTypes="filterTypes"/>
      <GetPkmns :pkmns="pkmns"/> -->
  <div id="app" class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-indigo-300 text-gray-800"> 
    <div id="nav">
      <RouterLink to="/sign-up">Sign Up</RouterLink>
      <RouterLink to="/log-in">Log In</RouterLink>
    </div>
      <div v-if="this.userStore.user">
        <RouterLink to="/dash-board" :user="user">Dashboard</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import axios from 'axios'

// import GetPkmns from './components/TasksPkmn.vue'
// import GetPkmnsSkeleton from './components/TasksPkmnSkeleton.vue'
// import NavBar from './components/NavBar.vue'
// import Home from './components/TasksPkmn.vue'

import { useUserStore } from "@/store/user";

export default {
  name: 'App',

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  components: { 
    // NavBar,
    // GetPkmnsSkeleton,
    // Home,
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
    // const sendGetRequest = async () => {
    //   try {
    //       const response = await axios.get('http://localhost:8000/api/v1/getData');
    //       this.pkmns = response.data
    //       this.allPkmns = response.data
    //   } catch (err) {
    //       // Handle Error Here
    //       console.error(err);
    //   }
    // }

    // sendGetRequest();
  },
  methods: {
    filterTypes (type) {
      this.pkmns = this.allPkmns
      this.pkmns = this.pkmns.filter((pkmn) => {
        return (pkmn.type_1 === type || pkmn.type_2 === type)
      })
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

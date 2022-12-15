<template>
  <div id="app" class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800"> 
    <!-- <NavBar :filterTypes="filterTypes"/>
    <GetPkmns :pkmns="pkmns"/> -->
    <div id="nav">
        <RouterLink to="/sign-up">Sign Up</RouterLink>
        <RouterLink to="/log-in">Log In</RouterLink>
      </div>
    <RouterView />
  </div>
</template>

<script>
// import axios from 'axios'

// import GetPkmns from './components/TasksPkmn.vue'
// import GetPkmnsSkeleton from './components/TasksPkmnSkeleton.vue'
// import NavBar from './components/NavBar.vue'


export default {
  name: 'App',
  components: { 
    // NavBar,
    // GetPkmnsSkeleton,
    // GetPkmns,
  },    
  data() {
    return {
      pkmns: [],
      allPkmns : [],
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
    }
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
  background-color: #d0d0d0;
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

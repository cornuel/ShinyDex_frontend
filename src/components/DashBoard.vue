<template>
    <div v-if="this.userStore.user">
      <!-- <NavBar @userPkmns="getUserPkmns" @allPkmns="getAllPkmns"/> -->
      <NavBar @pkmns="fetchData" :data="data"/>
      <TasksPkmn :data="data"/>
    </div>
</template>


<script>
import axios from 'axios'
import { useUserStore } from "@/store/user";
import NavBar from '@/components/NavBar.vue'
import TasksPkmn from '@/components/TasksPkmn.vue'
import { toRaw } from 'vue';

export default {

  components: {
    NavBar,
    TasksPkmn,
  },

  setup() {
    const userStore = useUserStore();
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1/",
    });
    const urlGetAllPkmns = "/getData";
    const urlGetUserPkmns = "/getUserData";
    const urlPostShinyPkmn = "/postShinyData";
    return { userStore, instance, urlGetAllPkmns, urlGetUserPkmns, urlPostShinyPkmn};
  },
  
  data () {
    return {
      data: {
        userStore: this.userStore,
        instance: this.instance,
        urlGetAllPkmns: this.urlGetAllPkmns,
        urlGetUserPkmns: this.urlGetUserPkmns,
        urlPostShinyPkmn: this.urlPostShinyPkmn,
        username: this.userStore.getUser,
        userPkmns : [],
        allPkmns : [],
      }
    }
  },

  methods: {

    async created(){
      console.log(this.userStore.getUser)
    },

    fetchData(response) {
      this.data.userPkmns = response.userPkmns
      this.data.allPkmns = response.allPkmns
      console.log("Tout les pokémons sont prets")
      console.log(this.data.userPkmns)
    },

    getAllPkmns(response) {
      this.data.allPkmns = toRaw(response)
      console.log("Les pokémons sont prets")
      console.log(this.data.allPkmns)
    },

    getUserPkmns(response) {
      this.data.userPkmns = toRaw(response)
      console.log("Les pokémons du users sont prets")
      console.log(this.data.userPkmns)
    }
  }

}
</script>
<template>
    <div v-if="this.userStore.user">
      <!-- <NavBar @userPkmns="getUserPkmns" @allPkmns="getAllPkmns"/> -->
      <NavBar @pkmns="fetchData"/>
      <TasksPkmn :data="data"/>
    </div>
</template>


<script>
import { useUserStore } from "@/store/user";
import NavBar from '@/components/NavBar.vue'
import TasksPkmn from '@/components/TasksPkmn.vue'
import { toRaw } from 'vue';

export default {

  components: {
    NavBar,
    TasksPkmn,
  },

  data () {
    return {
      data: {
        username: this.userStore.getUser,
        userPkmns : [],
        allPkmns : [],
      }
    }
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
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
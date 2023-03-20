<template><!-- POKEMON -->
  <div
    class="p-10 left-44 absolute grid bg-slate-100 grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-5 max-w-fit">
    
    <div v-for="pkmn in data.allPkmns" :key="pkmn.regional_number"
      class="bg-white rounded-lg overflow-hidden pkmn-card shadow-md hover:shadow-xl ease-in transition">
      <div class="relative">
        <img class="w-full" :src="backend + pkmn.pokedex_img" alt="logo" />
        <div v-if="listContainsPkmn(pkmn)">
          <!-- at right hand corner of img -->

          <!-- render shiny button id dynamically, ex: shiny_1 -->
          <button @click="postShinyPkmn(pkmn.regional_number)" :id="'shiny_' + pkmn.regional_number"
            class="bg-slate-100 bg-opacity-100 absolute top-3 right-2 text-slate-600 font-bold py-1 px-1 rounded-full items-center">
            <svg class="w-5 h-5" fill='yellow' stroke="currentColor" viewBox="0 0 15 17"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.7"
                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z">
              </path>
            </svg>
          </button>
        </div>
        <div v-else>
          <button @click="postShinyPkmn(pkmn.regional_number)"
            class="bg-slate-100 bg-opacity-100 absolute top-3 right-2 text-slate-600 font-bold py-1 px-1 rounded-full items-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 15 17" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.7"
                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z">
              </path>
            </svg>
          </button>
        </div>
      </div>
      <div class="px-6 py-1">
        <div class="font-bold text-l text-center mb-1">{{ pkmn.name_fr }}</div>
        <p class="text-gray-700 text-sm text-center">
          {{ pkmn.name_en }}
        </p>
      </div>
      <div class="px-5 pb-1">
        <span :class="{
          'bg-green-400 text-gray-800': pkmn.type_1 === 'plante',
          'bg-red-500 text-gray-800': pkmn.type_1 === 'feu',
          'bg-blue-500 text-gray-50': pkmn.type_1 === 'eau',
          'bg-orange-400 text-gray-800': pkmn.type_1 === 'combat',
          'bg-indigo-900 text-gray-50': pkmn.type_1 === 'spectre',
          'bg-gray-400 text-gray-800': pkmn.type_1 === 'normal',
          'bg-lime-200 text-gray-800': pkmn.type_1 === 'insecte',
          'bg-slate-400 text-gray-800': pkmn.type_1 === 'acier',
          'bg-blue-300 text-gray-800': pkmn.type_1 === 'vol',
          'bg-indigo-600 text-gray-50': pkmn.type_1 === 'dragon',
          'bg-yellow-300 text-gray-800': pkmn.type_1 === 'electrik',
          'bg-pink-400 text-gray-800': pkmn.type_1 === 'fee',
          'bg-cyan-300 text-gray-800': pkmn.type_1 === 'glace',
          'bg-purple-400 text-gray-800': pkmn.type_1 === 'poison',
          'bg-rose-400 text-gray-800': pkmn.type_1 === 'psy',
          'bg-yellow-600 text-gray-50': pkmn.type_1 === 'roche',
          'bg-yellow-700 text-gray-50': pkmn.type_1 === 'sol',
          'bg-slate-800 text-gray-50': pkmn.type_1 === 'tenebres',
        }" class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">{{ capitalized(pkmn.type_1) }}</span>
        <span v-if="pkmn.type_2 != 'NA'" :class="{
          'bg-green-400 text-gray-800 border-2': pkmn.type_2 === 'plante',
          'bg-red-500 text-gray-800': pkmn.type_2 === 'feu',
          'bg-blue-500 text-gray-50': pkmn.type_2 === 'eau',
          'bg-orange-400 text-gray-800': pkmn.type_2 === 'combat',
          'bg-indigo-900 text-gray-50': pkmn.type_2 === 'spectre',
          'bg-gray-400 text-gray-800': pkmn.type_2 === 'normal',
          'bg-lime-200 text-gray-800': pkmn.type_2 === 'insecte',
          'bg-slate-400 text-gray-800': pkmn.type_2 === 'acier',
          'bg-blue-300 text-gray-800': pkmn.type_2 === 'vol',
          'bg-indigo-600 text-gray-50': pkmn.type_2 === 'dragon',
          'bg-yellow-300 text-gray-800': pkmn.type_2 === 'electrik',
          'bg-pink-400 text-gray-800': pkmn.type_2 === 'fee',
          'bg-cyan-300 text-gray-800': pkmn.type_2 === 'glace',
          'bg-purple-400 text-gray-800': pkmn.type_2 === 'poison',
          'bg-rose-400 text-gray-800': pkmn.type_2 === 'psy',
          'bg-yellow-600 text-gray-50': pkmn.type_2 === 'roche',
          'bg-yellow-700 text-gray-50': pkmn.type_2 === 'sol',
          'bg-slate-800 text-gray-50': pkmn.type_2 === 'tenebres',
        }" class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">{{ capitalized(pkmn.type_2) }}</span>
      </div>
    </div>
  </div>
</template>
  
<script>
import { toRaw } from 'vue';

export default {

  data() {
    return {
      backend: "http://localhost:8000",
      targeted_regional_number: null,
      pkmns: [],
    }
  },
  props: [
    'data',
  ],
  methods: {
    capitalized(name) {
      try {
        const capitalizedFirst = name[0].toUpperCase();
        const rest = name.slice(1);
        return capitalizedFirst + rest;
      }
      catch (error) {
        console.error(error)
      }
    },

    userSignOut() {
      this.userStore.removeToken();
      this.userStore.removeUser();
      this.$router.push('/sign-up')
    },

    listContainsPkmn(pkmn) {
      if (toRaw(this.data.userPkmns).some(element => element.id === pkmn.id)) {
        return true
      } else {
        return false
      }
    },
    async postShinyPkmn(regional_number) {
      // Fetch user Pkmns
      const userPkmns = await this.data.instance.post(this.data.urlPostShinyPkmn, {
        regional_number: regional_number
      })
        .then((x) => {
          //myId = "shiny_" + regional_number
          if (x.data['Success'] == "added") {
            console.log("added to fav")
            //this.$refs.myId.classList.add("bg-yellow-100")
          }
          else {
            console.log("removed from fav")
          }
        });
      return [userPkmns, userPkmns]
    }
  },
  mounted() {
  },
}
</script>
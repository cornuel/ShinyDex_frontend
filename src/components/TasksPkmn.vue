<template>

    <!-- POKEMON -->
    <div class="p-10 left-44 absolute grid bg-white grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-5 max-w-fit">
          <div v-for="pkmn in pkmns" :key="pkmn.id" class="rounded-lg overflow-hidden pkmn-card shadow-md hover:shadow-xl ease-in transition">
            <img class="w-full" :src="backend + pkmn.pokedex_img" alt="logo" />
            <div class="px-6 py-4">
              <div class="font-bold text-l text-center mb-2">{{pkmn.name_fr}}</div>
              <p class="text-gray-700 text-sm text-center">
                {{pkmn.name_en}}
              </p>
            </div>
            <div class="px-5 pb-1">
              <span :class="{'bg-green-400 text-gray-800': pkmn.type_1 === 'plante',
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
                             }"
                    class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">{{capitalized(pkmn.type_1)}}</span>
              <span v-if="pkmn.type_2 != 'NA'" 
                    :class="{'bg-green-400 text-gray-800 border-2': pkmn.type_2 === 'plante',
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
                             }"
                    class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">{{capitalized(pkmn.type_2)}}</span>
            </div>
          </div>
        </div>

</template>
  
<script>
export default {
    data() {
        return {
            backend:"http://localhost:8000",
        }
    },
    props: [
        'pkmns'
    ],
    methods: {
        capitalized(name) {
        const capitalizedFirst = name[0].toUpperCase();
        const rest = name.slice(1);

        return capitalizedFirst + rest;
        },
    }
}
</script>
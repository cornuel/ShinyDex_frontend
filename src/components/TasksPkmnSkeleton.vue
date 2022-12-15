<template>

    <!-- POKEMON -->
    <div class="p-10 left-44 absolute grid bg-white grid-cols-1 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-5 max-w-fit">
          <div v-for="pkmn in 30" :key="pkmn.id" class="rounded-lg overflow-hidden pkmn-card shadow-md hover:shadow-xl ease-in transition">
            <div class="w-44 h-20 bg-slate-400"></div>
            <div class="px-6 py-4">
              <div class="font-bold text-l text-center mb-2 w-30 h-2 bg-slate-400"></div>
              <p class="text-gray-700 text-sm text-center">
                data
              </p>
            </div>
            <div class="px-5 pb-1">
              <span class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">data</span>
              <span class="block rounded-full px-3 py-1 text-xs font-bold mb-2 shadow-md">data</span>
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
    methods: {
        capitalized(name) {
        const capitalizedFirst = name[0].toUpperCase();
        const rest = name.slice(1);

        return capitalizedFirst + rest;
        },
    }
}
</script>
<template>
  <div class="min-w-[10rem] z-[55]">
    <Listbox v-model="selectedType">
      <div class="relative">
        <ListboxButton
          class="relative w-full cursor-pointer rounded-lg py-1.5 pl-3 pr-10 text-left shadow-md 
          sm:text-base font-bold border-2 overflow-y-hidden transition duration-200 ease-in-out"
          :class="{
              'bg-white border-0 text-gray-800 ': selectedType.type === 'Tous les types',
              'bg-plante border-green-400 text-white': selectedType.type === 'Plante',
              'bg-feu border-red-300 text-white': selectedType.type === 'Feu',
              'bg-eau border-blue-300 text-white': selectedType.type === 'Eau',
              'bg-combat border-orange-200 text-white': selectedType.type === 'Combat',
              'bg-spectre border-fuchsia-700 text-white': selectedType.type === 'Spectre',
              'bg-normal border-gray-200 text-white': selectedType.type === 'Normal',
              'bg-insecte border-lime-200 text-white': selectedType.type === 'Insecte',
              'bg-acier border-slate-200 text-white': selectedType.type === 'Acier',
              'bg-vol border-blue-100 text-white': selectedType.type === 'Vol',
              'bg-dragon border-indigo-400 text-white': selectedType.type === 'Dragon',
              'bg-electrik border-yellow-100 text-white': selectedType.type === 'Electrik',
              'bg-fee border-pink-200 text-white': selectedType.type === 'Fee',
              'bg-glace border-cyan-100 text-white': selectedType.type === 'Glace',
              'bg-poison border-purple-200 text-white': selectedType.type === 'Poison',
              'bg-psy border-rose-200 text-white': selectedType.type === 'Psy',
              'bg-roche border-stone-300 text-white': selectedType.type === 'Roche',
              'bg-sol border-stone-400 text-white': selectedType.type === 'Sol',
              'bg-tenebres border-slate-400 text-white': selectedType.type === 'Tenebres',
          }"
        >
          <div class="flex">
          <img v-if="selectedType.type !== 'Tous les types'" :src="type_icon" alt="Pokemon Type 2" class="-ml-1.5 w-6 h-6">
          <span class="block truncate">{{ selectedType.type === 'Tous les types' ? 'Type 1' : selectedType.type.toUpperCase() }}</span>
          </div>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
          <ChevronDownIcon
            :class="['Tous les types' === selectedType.type ? 'text-gray-400' : 'text-white']"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

          <ListboxOptions
            class="max-h-48 md:max-h-fit absolute mt-1 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
            <ListboxOption
              @click="handleClick"
              v-slot="{ active, selected }"
              v-for="person in types"
              :key="person.type"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-purple-600' : 'text-gray-900',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.type }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue'
// import { useUserStore } from "@/store/user";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

// const userStore = useUserStore()


const types = [
  { type: 'Tous les types' },
  { type: 'Acier' },
  { type: 'Combat' },
  { type: 'Dragon' },
  { type: 'Eau' },
  { type: 'Electrik' },
  { type: 'Fee' },
  { type: 'Feu' },
  { type: 'Glace' },
  { type: 'Insecte' },
  { type: 'Normal' },
  { type: 'Plante' },
  { type: 'Poison' },
  { type: 'Psy' },
  { type: 'Roche' },
  { type: 'Sol' },
  { type: 'Spectre' },
  { type: 'Tenebres' },
  { type: 'Vol' }
]

const selectedType = ref(types[0])

const type_icon = computed(() => require(`@/assets/icons/${selectedType.value.type.toLowerCase()}.svg`))

const emit = defineEmits(['filterType_1'])


const handleClick = async () => {
  // this.userStore.setTypeFilter(selectedType.value.type)
  emit('filterType_1', selectedType.value.type)
  // console.log(selectedType.value.type)
}


</script>

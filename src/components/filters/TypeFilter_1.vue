<template>
  <div class="w-40">
    <Listbox v-model="selectedType">
      <div class="relative">
        <ListboxButton
          :class="{
              'bg-white border-0 text-gray-800 ': selectedType.type === 'Tous les types',
              'bg-green-400 border-green-200 text-white': selectedType.type === 'Plante',
              'bg-red-500 border-red-300 text-white': selectedType.type === 'Feu',
              'bg-blue-500 border-blue-300 text-white': selectedType.type === 'Eau',
              'bg-orange-400 border-orange-200 text-white': selectedType.type === 'Combat',
              'bg-indigo-900 border-indigo-500 text-white': selectedType.type === 'Spectre',
              'bg-gray-400 border-gray-200 text-white': selectedType.type === 'Normal',
              'bg-insecte border-lime-200 text-white': selectedType.type === 'Insecte',
              'bg-slate-400 border-slate-200 text-white': selectedType.type === 'Acier',
              'bg-blue-300 border-blue-100 text-white': selectedType.type === 'Vol',
              'bg-indigo-600 border-indigo-400 text-white': selectedType.type === 'Dragon',
              'bg-yellow-300 border-yellow-100 text-white': selectedType.type === 'Electrik',
              'bg-pink-400 border-pink-200 text-white': selectedType.type === 'Fee',
              'bg-cyan-300 border-cyan-100 text-white': selectedType.type === 'Glace',
              'bg-purple-400 border-purple-200 text-white': selectedType.type === 'Poison',
              'bg-rose-400 border-rose-200 text-white': selectedType.type === 'Psy',
              'bg-yellow-600 border-yellow-400 text-white': selectedType.type === 'Roche',
              'bg-yellow-700 border-yellow-500 text-white': selectedType.type === 'Sol',
              'bg-slate-800 border-slate-400 text-white': selectedType.type === 'Tenebres',
          }"
          class="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md 
          focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white 
          focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 
          sm:text-sm border-4 overflow-y-hidden transition duration-200 ease-in-out"
        >
          <span class="block truncate">{{ selectedType.type }}</span>
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
            class="overflow-y-hidden absolute mt-1 w-full  overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
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
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
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

import { ref } from 'vue'
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

const emit = defineEmits(['filterType_1'])


const handleClick = async () => {
  // this.userStore.setTypeFilter(selectedType.value.type)
  emit('filterType_1', selectedType.value.type)
  // console.log(selectedType.value.type)
}


</script>

<template>
  <div class="lg:w-40 w-full z-[60]">
    <Listbox v-model="selectedType">
      <div class="relative">
        <ListboxButton
        :class="['Tous' === selectedType.type ? 'bg-white' : 'border-2 border-purple-400 bg-amber-100 text-purple-600 font-medium']"
          class="relative w-full cursor-pointer rounded-lg  py-1.5 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-base sm:font-bold"
        >
          <span class="block truncate">{{ selectedType.type }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronDownIcon
            :class="['Tous' === selectedType.type ? 'text-gray-400' : 'text-purple-500']"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

          <ListboxOptions
            class="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-on:click="handleClick"
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
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-purple-400"
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
  { type: 'Tous' },
  { type: 'Obtenus' },
  { type: 'Non Obtenus' }
]
const selectedType = ref(types[0])

const emit = defineEmits(['ownFilter'])


const handleClick = () => {
  // this.userStore.setTypeFilter(selectedType.value.type)
  emit('ownFilter', selectedType.value.type)
  // console.log(selectedType.value.type)
}


</script>

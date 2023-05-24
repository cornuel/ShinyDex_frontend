<template>
  <div class="lg:w-32 w-full z-[50]">
    <Listbox v-model="selectedSort">
      <div class="relative">
        <ListboxButton
        :class="['ASC' === selectedSort.sort ? 'bg-white dark:bg-lightIndigo/70 dark:text-themeYellow' : 'border-2 border-purple-400 bg-amber-100 text-purple-600 font-bold']"
          class="relative w-full cursor-pointer rounded-lg py-1.5 pl-3 pr-10 text-left font-bold shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-base sm:font-bold"
        >
          <span class="flex truncate">
            <div v-if="'ASC' === selectedSort.sort" class="mr-2">
              <font-awesome-icon icon="fa-solid fa-arrow-up-long" />
            </div>
            <div v-else class="mr-2">
              <font-awesome-icon icon="fa-solid fa-arrow-down-long" />
            </div>
            {{ selectedSort.sort }}
          </span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
          <ChevronDownIcon
            :class="['ASC' === selectedSort.sort ? 'text-gray-400' : 'text-purple-600']"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

          <ListboxOptions
            class="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white dark:bg-indigo/90 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-on:click="handleClick"
              v-slot="{ active, selected }"
              v-for="person in sorts"
              :key="person.sort"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-purple-600' : 'text-gray-900 dark:text-themeYellow',
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ person.sort }}</span
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

import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

const sorts = [
  { sort: 'ASC' },
  { sort: 'DESC' },
]
const selectedSort = ref(sorts[0])

const emit = defineEmits(['orderSort'])


const handleClick = () => {
  emit('orderSort', selectedSort.value.sort)
  // console.log(selectedType.value.type)
}


</script>

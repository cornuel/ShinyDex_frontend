<template>
  <div class="lg:w-44 w-full z-[40]">
    <Listbox v-model="selectedSort">
      <div class="relative">
        <ListboxButton
        class="relative w-full cursor-pointer rounded-lg py-1.5 pl-3 pr-10 text-left font-bold shadow-md"
        :class="{
              'bg-white dark:bg-lightIndigo/70 dark:text-themeYellow border-0 text-gray-800': selectedSort.sort === '# Regional',
              'bg-hp border-2 border-red-200 text-white': selectedSort.sort === 'HP',
              'bg-atq border-2 border-orange-200 text-white': selectedSort.sort === 'Attaque',
              'bg-def border-teal-200 border-2 text-white': selectedSort.sort === 'Defense',
              'bg-spa border-yellow-100 border-2 text-white': selectedSort.sort === 'Attaque Special',
              'bg-spd border-blue-200 border-2 text-white': selectedSort.sort === 'Defense Special',
              'bg-spe border-purple-200 border-2 text-white': selectedSort.sort === 'Vitesse',
              'bg-amber-100 border-2 border-purple-400 text-purple-600': selectedSort.sort === '# National' || selectedSort.sort === 'Nom FR' || selectedSort.sort === 'Nom EN',
          }"
        >
          <span class="block truncate">{{ selectedSort.sort }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
          <ChevronDownIcon
              :class="['# Regional' === selectedSort.sort ? 'text-gray-400' : '']"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

          <ListboxOptions
            class="max-h-48 md:max-h-fit absolute mt-1 w-full overflow-auto rounded-md bg-white dark:bg-indigo/90 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
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
  { sort: '# Regional' },
  { sort: '# National' },
  { sort: 'Nom EN' },
  { sort: 'Nom FR' },
  { sort: 'HP' },
  { sort: 'Attaque' },
  { sort: 'Defense' },
  { sort: 'Attaque Special' },
  { sort: 'Defense Special' },
  { sort: 'Vitesse' },
]
const selectedSort = ref(sorts[0])

const emit = defineEmits(['filterSort'])


const handleClick = () => {
  emit('filterSort', selectedSort.value.sort)
  // console.log(selectedType.value.type)
}


</script>

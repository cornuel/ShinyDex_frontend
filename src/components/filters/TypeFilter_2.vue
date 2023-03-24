<template>
  <div class="w-40">
    <Listbox v-model="selectedType">
      <div class="relative">
        <ListboxButton
        :class="['Tous les types' === selectedType.type ? 'bg-white' : 'bg-amber-100 text-amber-900 font-medium']"
          class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block truncate">{{ selectedType.type }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
          <ChevronDownIcon
            :class="['Tous les types' === selectedType.type ? 'text-gray-400' : 'text-amber-600']"
              class="h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="overflow-y-hidden absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-on:click="handleClick"
              v-slot="{ active, selected }"
              v-for="person in allTypes"
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
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script>
import { ref, defineComponent , computed, toRaw } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

const defaultTypes = [
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

export default defineComponent({
  props: {
    typeList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronDownIcon
  },
  setup(props, {emit}) {
    const allTypes = computed(() => {
      console.log(toRaw(props.typeList))
      return props.typeList.length ? toRaw(props.typeList).sort().map(type => ({type: type})) : defaultTypes
    })

    const selectedType = ref(allTypes.value[0])

    const handleClick = () => {
      emit('filterType_2', selectedType.value.type)
    }

    return {
      allTypes,
      selectedType,
      handleClick
    }
  }
})
</script>


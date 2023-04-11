<template>
    <div class="p-0.5 rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl" @click="showPokedexImg = !showPokedexImg"
        :class="{ 'cursor-pointer': showPokedexImg }">
        <div class="relative 
                                items-stretch h-full
                                rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl 
                                border-1 border-gray-200 shadow-lg bg-gray-50 bg-gradient-to-r"
                                :class="pokemonGradient"
            >
            <Transition name="fade" mode="out-in">
                <div v-if="showPokedexImg" class="post">
                    <button class=" z-30 absolute top-4 right-4 p-2.5 rounded-full bg-[#f3f4f6] active:bg-slate-600
                                                    shadow-sm  hover:shadow-red-500
                                                    ease-linear transition-all duration-150" :class="{
                                                        'favorited': isFavorited,
                                                    }" @click.stop="toggleFavorite(pkmn)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill-opacity="1" viewBox="0 0 20 20"
                            :fill="isFavorited ? '#f43f5e' : 'white'" :stroke="isFavorited ? '#f43f5e' : 'gray'"
                            class="w-4 h-4">
                            <path fill-rule="evenodd" class="shadow-inner"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <div>
                        <img class="w-full rounded-tl-md rounded-br-md rounded-tr-3xl"
                            :class="!isFavorited ? 'grayscale' : 'grayscale-0'" :src="pkmn.pokedex_img" alt="logo"
                            loading="lazy" />
                    </div>
                    <div class=" py-1">
                        <div class="flex justify-between -mb-5">
                            <div
                                class=" font-rubik tracking-wide italic mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                                {{ pkmn.regional_number }}
                            </div>
                            <div
                                class=" font-rubik tracking-wide italic mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                                {{ pkmn.national_number }}
                            </div>
                        </div>
                        <div
                            class="font-nunito font-semibold text-center mb-1 text-gray-700 drop-shadow-sm shadow-gray-200">
                            {{ pkmn.name_fr }}
                        </div>
                        <p v-if="showPokedexImg" class="font-rubik tracking-wide italic text-gray-700 text-sm text-center">
                            {{ pkmn.name_en }}
                        </p>
                    </div>
                    <div v-if="showPokedexImg"
                        class="flex align-items justify-center px-5 text-gray-50 font-rubik tracking-wide uppercase text-sm">
                        <span :class="{
                            'bg-green-400': pkmn.type_1 === 'plante',
                            'bg-red-500 ': pkmn.type_1 === 'feu',
                            'bg-blue-500 ': pkmn.type_1 === 'eau',
                            'bg-orange-400 ': pkmn.type_1 === 'combat',
                            'bg-indigo-900 ': pkmn.type_1 === 'spectre',
                            'bg-normal ': pkmn.type_1 === 'normal',
                            'bg-insecte ': pkmn.type_1 === 'insecte',
                            'bg-slate-400 ': pkmn.type_1 === 'acier',
                            'bg-blue-300 ': pkmn.type_1 === 'vol',
                            'bg-indigo-600 ': pkmn.type_1 === 'dragon',
                            'bg-yellow-300 ': pkmn.type_1 === 'electrik',
                            'bg-pink-400 ': pkmn.type_1 === 'fee',
                            'bg-cyan-300 ': pkmn.type_1 === 'glace',
                            'bg-purple-400 ': pkmn.type_1 === 'poison',
                            'bg-rose-400 ': pkmn.type_1 === 'psy',
                            'bg-yellow-600 ': pkmn.type_1 === 'roche',
                            'bg-yellow-700 ': pkmn.type_1 === 'sol',
                            'bg-slate-800 ': pkmn.type_1 === 'tenebres',
                        }"
                            class="block mx-1 rounded-full px-3 py-1 align-items justify-center text-xs mb-2 shadow-md border-2 border-white">
                            {{ capitalized(pkmn.type_1) }}
                        </span>
                        <span v-if="pkmn.type_2 != 'NA'" :class="{
                            'bg-green-400': pkmn.type_2 === 'plante',
                            'bg-red-500 ': pkmn.type_2 === 'feu',
                            'bg-blue-500 ': pkmn.type_2 === 'eau',
                            'bg-orange-400 ': pkmn.type_2 === 'combat',
                            'bg-indigo-900 ': pkmn.type_2 === 'spectre',
                            'bg-normal ': pkmn.type_2 === 'normal',
                            'bg-insecte ': pkmn.type_2 === 'insecte',
                            'bg-slate-400 ': pkmn.type_2 === 'acier',
                            'bg-blue-300 ': pkmn.type_2 === 'vol',
                            'bg-indigo-600 ': pkmn.type_2 === 'dragon',
                            'bg-yellow-300 ': pkmn.type_2 === 'electrik',
                            'bg-pink-400 ': pkmn.type_2 === 'fee',
                            'bg-cyan-300 ': pkmn.type_2 === 'glace',
                            'bg-purple-400 ': pkmn.type_2 === 'poison',
                            'bg-rose-400 ': pkmn.type_2 === 'psy',
                            'bg-yellow-600 ': pkmn.type_2 === 'roche',
                            'bg-yellow-700 ': pkmn.type_2 === 'sol',
                            'bg-slate-800 ': pkmn.type_2 === 'tenebres',
                        }"
                            class="block mx-1 rounded-full px-3 py-1 text-xs mb-2 shadow-md border-2 border-white text-gray-50">
                            {{ capitalized(pkmn.type_2) }}
                        </span>
                    </div>
                </div>
                <div v-else class="justify-center items-center content-center">
                    <div class=" py-1">
                        <div class="flex justify-between -mb-6">
                            <div
                                class=" font-rubik tracking-wide italic mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                                {{ pkmn.regional_number }}
                            </div>
                            <div
                                class=" font-rubik tracking-wide italic mb-1 text-gray-700 drop-shadow-sm text-sm shadow-gray-200 mx-5">
                                {{ pkmn.national_number }}
                            </div>
                        </div>
                        <div
                            class="font-nunito font-semibold text-center mb-1 text-gray-700 drop-shadow-sm shadow-gray-200">
                            {{ pkmn.name_fr }}
                        </div>
                        <p v-if="showPokedexImg" class="text-gray-700 text-sm text-center">
                            {{ pkmn.name_en }}
                        </p>
                    </div>
                    <div class="flex justify-center">
                        <button @click.stop="showStats = !showStats"
                            class="text-rubik cursor-pointer bg-slate-200 active:bg-slate-300 text-slate-600 text-sm p-2 h-8 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                            type="button">
                            <font-awesome-icon icon="fa-solid fa-chart-column" />
                            <span v-if="!showStats">
                                Show
                            </span>
                            <span v-else>
                                Hide
                            </span>
                            Stats
                        </button>
                    </div>
                    <div class="p-2 -mt-5">
                        <Bar v-if="showStats" :data="computedData" :options="options" />
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>


<script>
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
import { Bar } from 'vue-chartjs'
import axios from 'axios'
import { useUserStore } from "@/store/user";

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartJSPluginDatalabels)


export default {

    mounted() {
        if (this.userPkmnList.includes(this.pkmn.regional_number)) {
            this.isFavorited = true
        }
        else {
            this.isFavorited = false
        }
    },

    setup() {
        const userStore = useUserStore();

        return { userStore };
    },

    components: {
        Bar,
    },

    props: [
        'pkmn',
        'backend',
        'apiUrl',
        'postShinyData_endpoint',
        'userPkmnList'
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
        async postShinyPkmn(pkmn) {
            try {
                const response = await axios.post(this.apiUrl + this.postShinyData_endpoint, { regional_number: pkmn.regional_number })
                
                if (response.data['Success'] == "added") {
                    console.log(pkmn.regional_number + " added to fav")
                    this.$notify({
                        group: "foo",
                        title: "Bravo",
                        type: "bravo",
                        text: `${pkmn.name_fr} a été ajouté à ta liste de shiny 😄 !`
                    }, 3000) // 2s
                    this.$emit('computeSumOfOwnedPokemon', true)
                }
                else {
                    console.log(pkmn.regional_number + " removed from fav")
                    this.$notify({
                        group: "foo",
                        title: "Oups",
                        type: "oups",
                        text: `${pkmn.name_fr} a été enlevé de ta liste de shiny 🙁`
                    }, 3000) // 2s
                    this.$emit('computeSumOfOwnedPokemon', false)
                }
            } catch (error) {
                // handle error
                console.error(error);
            }
        },
        isImageLoaded() {
            this.isLoaded = true;
            // emit('imageLoaded', selectedType.value.type)
        },
        toggleFavorite(pkmn) {
            this.isFavorited = !this.isFavorited
            this.postShinyPkmn(pkmn)
        },
    },

    data() {
        return {
            isFavorited: false,
            isLoaded: false,
            // ChartJs radar options
            options: {
                plugins: {
                    datalabels: {
                        font: {
                            size: 14,
                        },
                        color: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                        ],
                        align: "end",
                        anchor: "end",
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'x',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                scales: {
                    y: {
                        suggestedMin: 0,
                        max: 300,
                        display: false
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
            },
            showPokedexImg: true,
            showStats: false,
        }
    },

    computed: {
        pokemonGradient() {
            return `from-${this.pkmn.type_1} to-${this.pkmn.type_2}`;
        },
        computedData() {
            return {
                labels: [
                    'HP',
                    'Atk',
                    'Def',
                    'Spa',
                    'Spd',
                    'Spe',
                ],
                datasets: [
                    {
                        data: [
                            this.pkmn.stat_hp,
                            this.pkmn.stat_atq,
                            this.pkmn.stat_def,
                            this.pkmn.stat_spa,
                            this.pkmn.stat_spd,
                            this.pkmn.stat_spe,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                        ],
                        borderWidth: 2,
                        borderRadius: {
                            topLeft: 10,
                            topRight:10,
                        },
                    }
                ],
            }
        }
    }
}
</script>


<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* .favorite-button.favorited {
  color: red;
} */</style>
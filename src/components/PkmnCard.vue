<template>
  <div
    class="p-0.5 pb-2 rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl"
    @click="showPokedexImg = !showPokedexImg"
    :class="{ 'cursor-pointer': showPokedexImg }"
  >
    <div
      class="relative items-stretch h-full rounded-tl-md rounded-br-md rounded-tr-3xl rounded-bl-3xl shadow-md"
      :class="[
        isFavorited && showPokedexImg
          ? 'bg-amber-100 dark:bg-lightIndigo/70'
          : 'bg-white dark:bg-indigo/70',
        { 'dark:border dark:border-lavender': !showPokedexImg },
        { 'dark:border dark:border-themeYellow/40': !isFavorited },
      ]"
    >
      <Transition name="fade" mode="out-in">
        <div v-if="showPokedexImg" class="post">
          <button
            class="z-30 absolute top-4 right-4 p-2.5 rounded-full bg-[#f3f4f6] dark:bg-themeYellow active:bg-slate-600 shadow-sm hover:shadow-red-500 ease-linear transition-all duration-150"
            :class="
                  isFavorited
                    ? 'dark:bg-themeYellow bg-[#f3f4f6]'
                    : 'dark:bg-[#f3f4f6] bg-[#f3f4f6]'
                "
            @click.stop="confirmToggleFavorite(pkmn)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill-opacity="1"
              viewBox="0 0 20 20"
              :fill="isFavorited ? '#f43f5e' : 'white'"
              :stroke="isFavorited ? '#f43f5e' : 'gray'"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                class="shadow-inner"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div>
            <img
              class="w-full rounded-tl-md rounded-tr-3xl border-b-2 border-slate-50 dark:border-themeYellow"
              :class="isFavorited ? 'grayscale-0 saturate-150' : 'grayscale'"
              :src="pkmn.pokedex_img"
              alt="logo"
              loading="lazy"
            />
          </div>
          <div>
            <div class="py-0.5">
              <div class="flex justify-between -mb-5">
                <div
                  class="font-rubik tracking-wide italic mb-1 text-gray-700 dark:text-themeYellow drop-shadow-sm text-xs sm:text-sm shadow-gray-200 mx-3 sm:mx-5"
                  :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
                  >
                  {{ pkmn.regional_number }}
                </div>
                <div
                  class="font-rubik tracking-wide italic mb-1 text-gray-700 dark:text-themeYellow drop-shadow-sm text-xs sm:text-sm shadow-gray-200 mx-3 sm:mx-5"
                  :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
                  >
                  {{ pkmn.national_number }}
                </div>
              </div>
              <div
                class="font-nunito font-semibold text-center mb-1 shadow-slate-50"
                :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
              >
                {{ pkmn.name_fr }}
              </div>
              <p
                v-if="showPokedexImg"
                class="font-rubik tracking-wide italic text-xs sm:text-sm text-center"
                :class="
                  isFavorited
                    ? 'text-gray-600 dark:text-themeYellow'
                    : 'text-gray-500 dark:text-themeYellow/40'
                "
                >
                {{ pkmn.name_en }}
              </p>
            </div>
          </div>
        </div>
        <div v-else class="justify-center items-center content-center">
          <div class="py-1">
            <div class="flex justify-between -mb-6">
              <div
                class="font-rubik tracking-wide italic mb-1 text-gray-700 dark:text-themeYellow drop-shadow-sm text-sm shadow-gray-200 mx-5"
                :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
                >
                {{ pkmn.regional_number }}
              </div>
              <div
                class="font-rubik tracking-wide italic mb-1 text-gray-700 dark:text-themeYellow drop-shadow-sm text-sm shadow-gray-200 mx-5"
                :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
                >
                {{ pkmn.national_number }}
              </div>
            </div>
            <div
              class="font-nunito font-semibold text-center mb-1 dark:text-lavender text-gray-700"
              :class="
                  isFavorited
                    ? 'dark:text-lavender text-gray-700'
                    : 'text-gray-500 dark:text-themeYellow/50'
                "
              >
              {{ pkmn.name_fr }}
            </div>
            <p v-if="showPokedexImg" class="text-gray-700 text-sm text-center">
              {{ pkmn.name_en }}
            </p>
          </div>
          <div class="flex justify-center rounded-full">
            <button
              @click.stop="showStats = !showStats"
              class="z-10 cursor-pointer dark:bg-themeYellow bg-slate-200 active:bg-slate-300 text-slate-600 text-sm p-2 h-8 rounded-full shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
            >
              <div v-if="!showStats">
                <font-awesome-icon icon="fa-solid fa-chart-column" />
              </div>
              <div v-else>
                <img
                  src="@/assets/sparkles.svg"
                  alt="shiny"
                  class="h-4 w-4 mt-0.5"
                />
              </div>
            </button>
          </div>
          <div class="p-2 flex justify-center align-middle items-center">
            <Bar
              class="max-h-28"
              v-if="showStats"
              :data="computedData"
              :options="options"
            />
            <img
              v-if="!showStats"
              class="border-slate-50 dark:border-themeYellow max-h-[6rem] max-w-[10rem] saturate-150"
              :src="pkmn.shiny_img"
              alt="logo"
              loading="lazy"
            />
          </div>
        </div>
      </Transition>
    </div>
    <div
      class="-mt-4 relative flex items-center justify-center px-5 text-gray-50"
      :class="isFavorited ? 'grayscale-0' : 'grayscale'"
    >
      <span
        v-if="pkmn.type_1 != 'NA'"
        :class="`bg-${pkmn.type_1}`"
        class="flex rounded-full px-4 sm:px-4 align-items justify-center text-xs sm:text-sm mb-2 shadow-md border-2 border-white dark:border-themeYellow/40"
      >
        <img :src="type_1_icon" alt="Pokemon Type 1" class="-ml-1.5 w-6 h-6" />
        <div class="h-6 flex items-center text-center font-rubik uppercase">
          {{ capitalized(pkmn.type_1) }}
        </div>
      </span>
      <span
        v-if="pkmn.type_2 != 'NA'"
        :class="`bg-${pkmn.type_2}`"
        class="flex rounded-full px-4 sm:px-4 align-items justify-center text-xs sm:text-sm mb-2 shadow-md border-2 border-white dark:border-themeYellow/40"
      >
        <img :src="type_2_icon" alt="Pokemon Type 2" class="-ml-1.5 w-6 h-6" />
        <div class="h-6 flex items-center text-center font-rubik uppercase">
          {{ capitalized(pkmn.type_2) }}
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
  } from "chart.js";
  import ChartJSPluginDatalabels from "chartjs-plugin-datalabels";
  import { Bar } from "vue-chartjs";
  import axios from "axios";
  import { useUserStore } from "@/store/user";
  import Swal from "sweetalert2";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartJSPluginDatalabels
  );

  export default {
    mounted() {
      if (
        Array.isArray(this.userPkmnList) &&
        this.userPkmnList.includes(this.pkmn.national_number)
      ) {
        this.isFavorited = true;
      } else {
        this.isFavorited = false;
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
      "pkmn",
      "backend",
      "apiUrl",
      "postShinyData_endpoint",
      "userPkmnList",
    ],

    methods: {
      capitalized(name) {
        try {
          const capitalizedFirst = name[0].toUpperCase();
          const rest = name.slice(1);
          return capitalizedFirst + rest;
        } catch (error) {
          console.error(error);
        }
      },
      async postShinyPkmn(pkmn) {
        try {
          const response = await axios.post(
            this.apiUrl + this.postShinyData_endpoint,
            { pkmn: pkmn.national_number }
          );

          if (response.data["Success"] == "added") {
            // console.log(pkmn.regional_number + " added to fav")
            this.$notify(
              {
                group: "foo",
                title: "Bravo",
                type: "bravo",
                text: `${pkmn.name_fr} a été ajouté à ta liste de shiny 😄 !`,
              },
              3000
            ); // 2s
            this.$emit("computeSumOfOwnedPokemon", true);
          } else {
            // console.log(pkmn.regional_number + " removed from fav")
            this.$notify(
              {
                group: "foo",
                title: "Oups",
                type: "oups",
                text: `${pkmn.name_fr} a été enlevé de ta liste de shiny 🙁`,
              },
              3000
            ); // 2s
            this.$emit("computeSumOfOwnedPokemon", false);
          }
        } catch (error) {
          // handle error
          this.$notify(
            {
              group: "foo",
              title: "Oups",
              type: "oups",
              text: `La session est expirée, veuillez vous reconnecter`,
            },
            3000
          ); // 2s
          this.$router.push("/log-in");
          // console.error(error);
        }
      },
      isImageLoaded() {
        this.isLoaded = true;
        // emit('imageLoaded', selectedType.value.type)
      },
      confirmToggleFavorite(pkmn) {
        if (this.isFavorited) {
          Swal.fire({
            title: "Es-tu sur?",
            text: `${pkmn.name_fr} est sur le point d'être supprimer de ta liste de shiny ..`,
            imageUrl: `${pkmn.shiny_img}`,
            showCancelButton: true,
            confirmButtonText: "Oui",
            cancelButtonText: "Non, annule!",
            confirmButtonColor: "#56e21f",
            cancelButtonColor: "#d33",
          }).then((result) => {
            if (result.isConfirmed) {
              this.toggleFavorite(pkmn);
            }
          });
        } else {
          this.toggleFavorite(pkmn);
        }
      },
      toggleFavorite(pkmn) {
        this.isFavorited = !this.isFavorited;
        this.postShinyPkmn(pkmn);
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
                family: "'Nunito', sans-serif",
              },
              color: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
              ],
              align: "end",
              anchor: "end",
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "x",
          elements: {
            bar: {
              borderWidth: 2,
            },
          },
          scales: {
            y: {
              suggestedMin: 0,
              max: 300,
              display: false,
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
        showPokedexImg: true,
        showStats: false,
      };
    },

    computed: {
      type_1_icon() {
        return require(`@/assets/icons/${this.pkmn.type_1}.svg`);
      },
      type_2_icon() {
        return require(`@/assets/icons/${this.pkmn.type_2}.svg`);
      },
      computedData() {
        return {
          labels: ["HP", "Atk", "Def", "Spa", "Spd", "Spe"],
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
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(75, 192, 192)",
                "rgb(255, 205, 86)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
              ],
              borderWidth: 2,
              borderRadius: {
                topLeft: 10,
                topRight: 10,
              },
            },
          ],
          options: {
            responsive: true,
            plugins: {
              font: {
                family: "'Nunito', sans-serif",
              },
            },
          },
        };
      },
    },
  };
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div v-if="this.userStore.user" class="scroll-smooth overflow-visible">
    <!-- Leftside navigation bar -->
    <!-- <NavBar /> -->
    <!-- Rightside content -->
    <div class="z-40 w-full md:w-[70rem] h-20 flex mx-auto inset-x-0 fixed p-5 rounded-lg justify-center items-center md:mt-10 gap-2 shadow-md border
            backdrop-blur-lg border-gray-300 font-nunito whitespace-nowrap">
      <div v-if="!isLoading" class="mr-5">
        {{ sumOfOwnedPokemon }} / {{ sumOfAllPokemon }}
      </div>
      <OwnFilter @ownFilter="ownFilter" />
      <TypeFilter_1 @filterType_1="filterType_1" />
      <TypeFilter_2 :typeList="list_type_2" @filterType_2="filterType_2" />
      <SortList @filterSort="filterSort" />
      <OrderList @orderSort="orderSort" />
      <LogOutButton />
    </div>

    <div v-if="!isLoading">
      <div
        class="z-0 p-5 sm:p-10 md:p-28 left-44 grid bg-gray-100 grid-cols-2 mt-10
                                sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-2 sm:gap-5 scrollbar-gutter-stable">
        <PkmnCard v-for="(pkmn, i) in data" :key="i" :pkmn="pkmn" :backend="backend" :apiUrl="apiUrl"
          :postShinyData_endpoint="postShinyData_endpoint" :userPkmnList="userPkmnList"
          @computeSumOfOwnedPokemon="computeSumOfOwnedPokemon" />
      </div>
    </div>
    <div v-else>
      <div class="z-0 p-10 md:p-28 left-44 grid bg-gray-100 grid-cols-1 mt-10
                              sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
        <PkmnCardSkeleton v-for="i in 36" :key="i" />
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { useUserStore } from "@/store/user";
// import NavBar from '@/components/NavBar.vue'
import PkmnCard from './PkmnCard.vue';
import PkmnCardSkeleton from './PkmnCardSkeleton.vue';
import OwnFilter from './filters/OwnFilter.vue';
import TypeFilter_1 from './filters/TypeFilter_1.vue';
import TypeFilter_2 from './filters/TypeFilter_2.vue';
import SortList from './filters/SortList.vue';
import OrderList from './filters/OrderList.vue';
import LogOutButton from './LogOutButton.vue';

export default {

  components: {
    // NavBar,
    PkmnCard,
    PkmnCardSkeleton,
    OwnFilter,
    TypeFilter_1,
    TypeFilter_2,
    SortList,
    OrderList,
    LogOutButton,
  },

  mounted() {
    this.isLoading = true
    this.fetchMultipleUrls({},
      this.apiUrl + this.getData,
      this.apiUrl + this.getUserPkmnList,
      this.apiUrl + this.getSumOfOwnedPokemon,
      this.apiUrl + this.getSumOfAllPokemon)
    document.title = "ShinyDex [ " + this.userStore.getUser + ' : ✨' + this.sumOfOwnedPokemon + " ]";
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };

  },

  data: () => ({
    backend: 'http://shinydex.pythonanywhere.com/',
    apiUrl: 'http://shinydex.pythonanywhere.com/api/v1/',
    getData: 'getData',
    getUserData: 'getUserData',
    getUnownedPokemon: 'getUnownedPokemon',
    postShinyData_endpoint: 'postShinyData',
    getUserPkmnList: 'getUserPkmnList',
    getComplementaryType: 'getComplementaryType',
    getSumOfOwnedPokemon: 'getSumOfOwnedPokemon',
    getSumOfAllPokemon: 'getSumOfAllPokemon',
    sumOfOwnedPokemon: '',
    sumOfAllPokemon: '',
    data: [],
    userPkmnList: [],
    list_type_1: [],
    list_type_2: [],
    rawType_1: '',
    rawType_2: '',
    rawSort: '',
    apiType_1: '',
    apiType_2: '',
    apiSort: 'regional_number',
    apiOrder: '',
    rawSortOwned: '',
    sortOwned: '',
    isLoading: true,
  }),

  methods: {

    computeSumOfOwnedPokemon(bool) {
      if (bool) {
        this.sumOfOwnedPokemon += 1;
      }
      else {
        this.sumOfOwnedPokemon -= 1;
      }

      document.title = "ShinyDex [ " + this.userStore.getUser + ' : ✨' + this.sumOfOwnedPokemon + " ]";
    },

    async getApiData(parameters, url) {
      if (this.userStore.getToken) {
        const response = await axios.post(url, parameters);
        return response.data;
      }
      else {
        this.$notify({
          group: "foo",
          title: "Oups",
          type: "oups",
          text: `La session est expirée, veuillez vous reconnecter`,
        }, 3000) // 2s
        this.$router.push('/log-in');
      }
    },

    async fetchMultipleUrls(parameters, ...urls) {
      this.isLoading = true;

      try {
        const responses = await Promise.all(
          urls.map(url => this.getApiData(parameters, url))
        );

        // console.log(responses)

        // Set the data properties
        this.data = responses[0];
        this.userPkmnList = responses[1];
        // if length of the response is more than 2, set the sumOfOwnedPokemon and sumOfAllPokemon properties
        if (responses.length > 2) {
          this.sumOfOwnedPokemon = responses[2];
          this.sumOfAllPokemon = responses[3];
        }

        this.isLoading = false;
      } catch (error) {
        // INVALID ID Token
        this.userStore.removeToken();
        this.userStore.removeUser();

        // Redirect to the login page
        document.title = "ShinyDex";
        this.$router.push('/log-in');
        // console.error(error);
      }
    },


    async fetchData(owned, type_1, type_2, order_by, sort_order) {

      let l_endPoint = ''
      let parameters = {}

      if (type_1) {
        parameters.type_1 = type_1
      }

      if (type_2) {
        parameters.type_2 = type_2
      }

      if (sort_order) {
        parameters.sort_order = sort_order
      }

      if (order_by) {
        parameters.order_by = order_by
      }

      if (owned == '') {
        l_endPoint = this.getData
      }
      else if (owned == 'owned') {
        l_endPoint = this.getUserData
      }
      else if (owned == 'not_owned') {
        //TODO
        l_endPoint = this.getUnownedPokemon
      }

      this.isLoading = true
      this.fetchMultipleUrls(parameters, this.apiUrl + l_endPoint, this.apiUrl + this.getUserPkmnList)
    },

    async ownFilter(rawOwned) {
      this.rawOwned = rawOwned;
      // console.log(this.rawOwned)

      if (rawOwned == 'All') {
        this.sortOwned = '';
      }
      else if (rawOwned == 'Owned') {
        this.sortOwned = 'owned';
      }
      else if (rawOwned == 'Not Owned') {
        this.sortOwned = 'not_owned';
      }

      this.fetchData(this.sortOwned, this.apiType_1, this.apiType_2, this.apiSort, this.apiOrder)

    },

    // This is called when a filter is applied -> filterType_1 / filterType_2
    async populateTypeFilter(type) {
      try {
        const response = await axios.post(this.apiUrl + this.getComplementaryType, { type });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async filterType_1(rawType) {
      this.rawType_1 = rawType;
      // console.log(this.rawType_1)

      if (this.rawType_1 == 'Tous les types') {
        this.apiType_1 = '';
      }
      else {
        this.apiType_1 = this.rawType_1.toLowerCase();
      }

      this.populateTypeFilter(this.apiType_1)
        .then((complementaryTypes) => {
          this.list_type_2 = this.capitalizeList(complementaryTypes)
        })
        .catch((error) => {
          console.error(error);
        });

      this.fetchData(this.sortOwned, this.apiType_1, this.apiType_2, this.apiSort, this.apiOrder)

    },

    filterType_2(rawType) {
      this.rawType_2 = rawType;
      // console.log(this.rawType_2)

      if (this.rawType_2 == 'Tous les types') {
        this.apiType_2 = '';
      }
      else {
        this.apiType_2 = this.rawType_2.toLowerCase();
      }

      this.fetchData(this.sortOwned, this.apiType_1, this.apiType_2, this.apiSort, this.apiOrder)

    },

    orderSort(rawType) {
      this.rawType = rawType;

      if (this.rawType == 'DESCENDING ↓') {
        this.apiOrder = 'desc';
      }
      else {
        this.apiOrder = 'asc';
      }

      this.fetchData(this.sortOwned, this.apiType_1, this.apiType_2, this.apiSort, this.apiOrder)

    },

    filterSort(rawSort) {
      this.rawSort = rawSort;
      // console.log(this.rawSort)

      if (this.rawSort == '# Regional Number') {
        this.apiSort = 'regional_number';
      }
      else if (this.rawSort == '# National Number') {
        this.apiSort = 'national_number'
      }
      else if (this.rawSort == 'Hp') {
        this.apiSort = 'stat_hp'
      }
      else if (this.rawSort == 'Name EN') {
        this.apiSort = 'name_en'
      }
      else if (this.rawSort == 'Name FR') {
        this.apiSort = 'name_fr'
      }
      else if (this.rawSort == 'Attack') {
        this.apiSort = 'stat_atq'
      }
      else if (this.rawSort == 'Defense') {
        this.apiSort = 'stat_def'
      }
      else if (this.rawSort == 'Special Attack') {
        this.apiSort = 'stat_spa'
      }
      else if (this.rawSort == 'Special Defense') {
        this.apiSort = 'stat_spd'
      }
      else if (this.rawSort == 'Speed') {
        this.apiSort = 'stat_spe'
      }

      this.fetchData(this.sortOwned, this.apiType_1, this.apiType_2, this.apiSort, this.apiOrder)

    },

    // Create a function that returns an array of capitalized types
    capitalizeList(types) {
      // Create an empty array to store the results
      let result = [];
      // Loop through each type in the input array
      for (let type of types) {
        // Capitalize the first letter of each type and push it to the result array
        result.push(type.charAt(0).toUpperCase() + type.slice(1));
      }
      // Return the result array
      return result;
    }

  }

}
</script>
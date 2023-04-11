<template>
  <div v-if="this.userStore.user" class="scroll-smooth overflow-visible">
    <!-- Leftside navigation bar -->
    <!-- <NavBar /> -->
    <!-- Rightside content -->
    <div class="z-40 w-[70rem] h-20 md:flex mx-auto inset-x-0 fixed p-5 rounded-lg justify-center items-center mt-10 gap-2 shadow-md border 
                  backdrop-blur-lg border-gray-300 font-nunito">
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
      <div class="z-0 p-10 md:p-28 left-44 grid bg-gray-100 grid-cols-1 mt-10
                        sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5 scrollbar-gutter-stable">
        <PkmnCard v-for="(pkmn, i) in data" :key="i" 
          :pkmn="pkmn" :backend="backend" :apiUrl="apiUrl"
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
    this.fetchMultipleUrls(
      this.apiUrl + this.getData,
      this.apiUrl + this.getUserPkmnList, 
      this.apiUrl + this.getSumOfOwnedPokemon,
      this.apiUrl + this.getSumOfAllPokemon )
    document.title = "ShinyDex [ " + this.userStore.getUser + ' : ✨' + this.sumOfOwnedPokemon + " ]";
  },

  setup() {
    const userStore = useUserStore();
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/v1/",
    });
    const urlGetAllPkmns = "/getData";
    const urlGetUserPkmns = "/getUserData";
    const urlPostShinyPkmn = "/postShinyData";
    return { userStore, instance, urlGetAllPkmns, urlGetUserPkmns, urlPostShinyPkmn };

  },

  data: () => ({
    backend: 'http://localhost:3001',
    apiUrl: 'http://localhost:3001/api/v1/',
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
      else{
        this.sumOfOwnedPokemon -= 1;
      }

      document.title = "ShinyDex [ " + this.userStore.getUser + ' : ✨' + this.sumOfOwnedPokemon + " ]";
    },

    async getDataWithTimeout(url) {
      // use axios.post() method with the URL as a parameter
      try {
        const response = await axios.post(url);
        // handle success
        // console.log(response.data);
        // assign the response data to the component data property
        return response.data
      } catch (error) {
        // Handle errors
        console.error(error);
        throw error;
      }
    },

    async fetchMultipleUrls(...urls) {
      this.isLoading = true;

      try {
        const responses = await Promise.all(
          urls.map(url => this.getDataWithTimeout(url))
        );

        console.log(responses)

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
        console.error(error);
      }
    },


    async fetchData(owned, type_1, type_2, sort, orderBy) {

      let l_filter = '';

      if (type_1) {
        l_filter += `?type=${type_1}`;
      }
      if (type_2) {
        l_filter += type_1 ? `&type=${type_2}` : `?type=${type_2}`;
      }
      if (sort) {
        l_filter += type_1 || type_2 ? `&order_by=${orderBy}${sort}` : `?order_by=${orderBy}${sort}`;
      }

      let l_endPoint = ''

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
      this.fetchMultipleUrls(this.apiUrl + l_endPoint + l_filter, this.apiUrl + this.getUserPkmnList)
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
      // console.log(this.rawType)

      if (this.rawType == 'DESCENDING ↓') {
        this.apiOrder = '-';
      }
      else {
        this.apiOrder = '';
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
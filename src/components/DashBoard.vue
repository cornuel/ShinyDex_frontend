<template>
  <div v-if="this.userStore.user">
    <!-- Leftside navigation bar -->
    <!-- <NavBar /> -->
    <!-- Rightside content -->

    <div class="z-50 w-screen flex fixed top-0 bg-gray-100 justify-center">
      <OwnFilter @ownFilter="ownFilter" />
      <TypeFilter_1 @filterType_1="filterType_1" />
      <TypeFilter_2 :typeList="list_type_2" @filterType_2="filterType_2" />
      <SortList @filterSort="filterSort" />
      <OrderList @orderSort="orderSort" />
    </div>
    <!-- <Suspense> -->
      <div class="z-0 p-10 left-44 grid bg-gray-100 grid-cols-1 mt-5
            sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-5">
        <PkmnCard v-for="(pkmn, i) in data" :key="i" :pkmn="pkmn" :backend="backend" :apiUrl="apiUrl"
          :postShinyData_endpoint="postShinyData_endpoint" />
        <!-- <template #fallback> -->
          <!-- <PkmnCardSkeleton v-for="(pkmn, i) in data" :key="i" /> -->
        <!-- </template> -->
      </div>
    <!-- </Suspense> -->
  </div>
</template>


<script>
import axios from 'axios'
import { useUserStore } from "@/store/user";
// import NavBar from '@/components/NavBar.vue'
import PkmnCard from './PkmnCard.vue';
// import PkmnCardSkeleton from './PkmnCardSkeleton.vue';
import OwnFilter from './filters/OwnFilter.vue';
import TypeFilter_1 from './filters/TypeFilter_1.vue';
import TypeFilter_2 from './filters/TypeFilter_2.vue';
import SortList from './filters/SortList.vue';
import OrderList from './filters/OrderList.vue';

export default {

  components: {
    // NavBar,
    PkmnCard,
    // PkmnCardSkeleton,
    OwnFilter,
    TypeFilter_1,
    TypeFilter_2,
    SortList,
    OrderList,
  },

  mounted() {
    // use axios.get() method with the URL as a parameter
    axios.post('http://localhost:3001/api/v1/getData')
      .then(response => {
        // handle success
        console.log(response);
        // assign the response data to the component data property
        this.data = response.data;
      })
      .catch(error => {
        // handle error
        console.error(error);
      })
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
    postShinyData_endpoint: 'postShinyData',
    getComplementaryType: 'getComplementaryType',
    data: [],
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
  }),

  methods: {

    async created() {
      console.log(this.userStore.getUser)
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
        l_endPoint = this.getUserData
      }

      // use axios.get() method with the URL as a parameter
      axios.post(this.apiUrl + l_endPoint + l_filter)
        .then(response => {
          // handle success
          console.log(response);
          // assign the response data to the component data property
          this.data = response.data;
        })
        .catch(error => {
          // handle error
          console.error(error);
        })
    },

    ownFilter(rawOwned) {
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

    filterType_1(rawType) {
      this.rawType_1 = rawType;
      console.log(this.rawType_1)

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
      console.log(this.rawType_2)

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
      console.log(this.rawType)

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
      console.log(this.rawSort)

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
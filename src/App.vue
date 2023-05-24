<template>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;1,300&family=Nunito:wght@400;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <ToastNotification />
  <div
    id="app"
    class="h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-100 text-gray-800"
  >
    <div id="nav" v-if="!this.userStore.user">
      <RouterLink to="/sign-up" />
      <RouterLink to="/log-in" />
    </div>
    <div v-if="this.userStore.user">
      <RouterLink to="/dash-board" :user="user"></RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
  import axios from "axios";
  import ToastNotification from "./components/ToastNotification.vue";
  import { initializeApp } from "firebase/app";

  import { useUserStore } from "@/store/user";

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };

  initializeApp(firebaseConfig);

  export default {
    name: "App",

    setup() {
      const userStore = useUserStore();
      return { userStore };
    },

    components: {
      ToastNotification,
    },

    data() {
      return {
        menuOpen: false,
        mySite: null,
        user: {
          isAuthenticated: false,
          token: this.userStore.getToken || "",
          info: this.userStore.getUser || {},
        },
        dataLoaded: false,
        pkmns: [],
        allPkmns: [],
      };
    },

    created() {
      document.title = "ShinyDex";
      if (this.user.token) {
        this.$router.push("/dash-board");
        // Peutetre pas utile car isAuthenticated n'est que dans App.vue
        this.user.isAuthenticated = true;
        axios.defaults.headers.common["Authorization"] =
        "Bearer " + this.user.token;
      } else {
        axios.defaults.headers.common["Authorization"] = "";
        this.$router.push("/log-in");
      }
    },

    mounted() {},
  };
</script>

<template>
        <button
          type="button"
          @click="logout"
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Logout
        </button>
</template>

<script>

import { useUserStore } from "@/store/user";

export default {

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  methods: {
    logout() {
      this.userStore.removeToken();
      this.userStore.removeUser();
      
      // Redirect to the login page
      document.title = "ShinyDex";
      this.$router.push('/log-in');
    }
  }
}

</script>

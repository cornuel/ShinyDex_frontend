<template>
        <button
          type="button"
          @click="logout"
          className="z-[30] font-rubik rounded-xl bg-black bg-opacity-50 px-4 py-1.5 text-base text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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

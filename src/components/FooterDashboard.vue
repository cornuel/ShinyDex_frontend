<template>
  <footer ref="footer" class="z-[50] h-full w-full bg-themeYellow rounded-lg shadow dark:bg-gray-900 ease-linear transition-all duration-150">
    <Transition name="fade" mode="out-in">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8 ">
      <div class="flex items-center justify-center">
        <a href="https://cornuel.github.io/ShinyDex" class="flex items-center mb-4 sm:mb-0">
          <img
            src="@/assets/pokeball_bg.svg"
            class="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span
            class="font-nunito self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >ShinyDex</span
          >
        </a>
        <!-- <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:underline">Contact</a>
          </li>
        </ul> -->
      </div>
      <div class="font-nunito self-center mt-3 text-md whitespace-nowrap text-center dark:text-white">
          Made with ♡ by Benjamin Cornuel
        </div>
      <hr
        class="my-6 border-gray-700 mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 text-center dark:text-gray-400"
        >© 2023
        <a href="https://flowbite.com/" class="hover:underline">ShinyDex</a>.
        All Rights Reserved.</span
      >
    </div>
  </Transition>
  </footer>
  
</template>
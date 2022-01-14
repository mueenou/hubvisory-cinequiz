<template>
  <nav class="px-2 py-2 flex flex-row relative items-center justify-between">
    <div class="font-bold text-white text-xl tracking-widest">
      CINEQUIZ<span class="text-2xl">.</span>
    </div>
    <div class="relative text-white">
      <button
        v-if="dropdownOpen === true"
        class="relative z-10 block rounded-md ring-2 ring-white py-1 px-2 focus:outline-none"
        @click="dropdownOpen = !dropdownOpen"
      >
        click la frère
      </button>
      <button
        v-else
        class="relative z-10 block rounded-md ring-2 ring-white py-1 px-2 focus:outline-none"
        @click="dropdownOpen = !dropdownOpen"
      >
        click la frère
      </button>
    </div>
    <div
      v-show="dropdownOpen"
      class="absolute right-1 top-11 mt-2 py-2 bg-white rounded-md shadow-xl z-20"
    >
      <a
        href="#"
        class="block px-4 py-2 text-sm tracking-widest capitalize text-gray-700 hover:bg-green-300 hover:text-white"
      >
        your profile
      </a>
      <a
        href="#"
        class="block px-4 py-2 text-sm tracking-widest capitalize text-gray-700 hover:bg-green-300 hover:text-white"
      >
        Your projects
      </a>
      <a
        href="#"
        class="block px-4 py-2 text-sm tracking-widest capitalize text-gray-700 hover:bg-green-300 hover:text-white"
      >
        Help
      </a>
      <a
        href="#"
        class="block px-4 py-2 text-sm tracking-widest capitalize text-gray-700 hover:bg-green-300 hover:text-white"
      >
        Settings
      </a>
      <a
        href="#"
        class="block px-4 py-2 text-sm tracking-widest capitalize text-gray-700 hover:bg-green-300 hover:text-white"
      >
        Sign Out
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
    };
  },
};
</script>

<style scoped>
nav {
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}
</style>

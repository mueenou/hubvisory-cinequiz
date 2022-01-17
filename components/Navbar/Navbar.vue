<template>
  <nav class="px-2 py-2 flex flex-row relative items-center justify-between">
    <div class="font-bold text-white text-xl tracking-widest">
      CINEQUIZ<span class="text-2xl">.</span>
    </div>
    <div class="relative text-white">
      <button
        v-if="dropdownOpen === true"
        class="relative z-10 block text-xl py-1 px-2 focus:outline-none"
        @click="dropdownOpen = !dropdownOpen"
      >
        <i class="bx bx-menu"></i>
      </button>
      <button
        v-else
        class="relative z-10 block text-xl rounded-md py-1 px-2 focus:outline-none"
        @click="dropdownOpen = !dropdownOpen"
      >
        <i class="bx bx-menu"></i>
      </button>
    </div>
    <div
      v-show="dropdownOpen"
      class="dropdown absolute right-1 top-11 mt-4 py-2 text-white rounded-md shadow-xl z-20"
    >
      <a
        href="#"
        class="block duration-300 px-4 py-2 text-sm tracking-widest capitalize hover:bg-blue-400 hover:text-white"
      >
        your profile
      </a>
      <a
        href="#"
        class="block duration-300 px-4 py-2 text-sm tracking-widest capitalize hover:bg-blue-400 hover:text-white"
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
nav,
.dropdown {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>

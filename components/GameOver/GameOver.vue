<template>
  <div
    class="gameover flex flex-col items-center justify-evenly max-w-[420px] min-w-[340px] h-[250px] overflow-hidden shadow-xl rounded-xl px-4 py-10 text-bold"
  >
    <h2 class="font-semibold text-center text-2xl">GAME OVER</h2>
    <div
      class="flex flex-col justify-center items-center p-10 w-28 h-28 ring-4 ring-white border-white rounded-full"
    >
      <span class="text-3xl">{{ lastScore }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastScore: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.gameover {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
}
</style>

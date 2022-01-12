<template>
  <div class="flex flex-col items-center justify-center">
    <h1>Bienvenue dans le quiz dédié aux amateurs de cinéma, bonne chance !</h1>
    <button
      v-if="!isReady"
      class="my-2 py-2 px-4 shadow-md rounded-full"
      @click="isReady = true"
    >
      Jouer
    </button>
    <Questionnaire v-if="isReady" class="mt-40" />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isReady: false,
    };
  },
};
</script>

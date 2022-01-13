<template>
  <div class="flex flex-col items-center justify-center">
    <h1>Bienvenue dans le quiz dédié aux amateurs de cinéma, bonne chance !</h1>
    <button
      v-if="!isReady"
      class="my-2 py-2 px-4 shadow-md rounded-full"
      @click="
        () => {
          isReadyHandler(true);
          gameOverHandler(false);
        }
      "
    >
      Jouer
    </button>
    <Questionnaire
      v-if="isReady"
      class="mt-40"
      :is-game-over="isGameOver"
      @gameover="gameOverHandler"
      @isready="isReadyHandler"
    />
    <GameOver v-if="isGameOver" />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isReady: false,
      isGameOver: false,
      score: "",
    };
  },
  methods: {
    gameOverHandler(payload) {
      this.isGameOver = payload;
    },
    isReadyHandler(payload) {
      this.isReady = payload;
    },
  },
};
</script>

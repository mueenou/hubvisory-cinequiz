<template>
  <div class="flex flex-col items-center justify-center text-white">
    <blockquote class="italic text-xl my-8 py-5">
      {{
        score.length > 0
          ? "Welcome back friend !"
          : "Welcome to the quiz dedicated to cinema lovers, good luck !"
      }}
    </blockquote>
    <div class="w-[70%] text-center">
      <div v-if="score && score.length > 0">
        <h2>Highest score :</h2>
        {{ Math.max(...score) }}
      </div>
      <div v-if="scoreToShow.length > 0">
        <h2>Latest scores :</h2>
        <div
          v-for="(item, index) in scoreToShow.slice(0, 5)"
          :key="index"
          class="flex flex-row min-w-[250px] items-center justify-start max-w-[420px] mx-auto"
        >
          <div
            class="progress-bar-container w-[100%] mx-auto h-3 bg-gray-100 rounded-full shadow-sm my-5 mr-3"
          >
            <div
              :style="{
                width: Math.round(item) + '%',
              }"
              :class="scoreBarColor(item)"
              class="progress-bar h-3 rounded-full ease-in-out"
            ></div>
          </div>
          <span class="w-16">{{ item }}%</span>
        </div>
      </div>
      <div v-else>
        <span>You haven't played yet</span>
      </div>
    </div>
    <Questionnaire
      v-if="isReady"
      class="mt-10"
      :is-game-over="isGameOver"
      @gameover="gameOverHandler"
      @isready="isReadyHandler"
      @score="setScore"
    />
    <GameOver v-if="isGameOver" :last-score="score[0]" />
    <button
      v-if="!isReady"
      class="play-btn my-2 py-2 px-4 shadow-md rounded-full"
      @click="
        () => {
          isReadyHandler(true);
          gameOverHandler(false);
        }
      "
    >
      {{ score.length || null > 0 ? "Play again" : "Play" }}
    </button>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      isReady: false,
      isGameOver: false,
      score: this.$cookies.get("user-score") || [],
      scoreToShow: [],
    };
  },
  mounted() {
    this.scoreToShow = this.score;
  },
  methods: {
    gameOverHandler(payload) {
      this.isGameOver = payload;
    },
    isReadyHandler(payload) {
      this.isReady = payload;
    },
    setScore(payload) {
      this.score.unshift(Math.round(payload));
      this.$cookies.set("user-score", this.score, {
        path: "/",
        maxAge: 10 * 365 * 24 * 60 * 60,
      });
      this.setScoreToShow();
    },
    setScoreToShow() {
      this.scoreToShow = this.score;
    },
    scoreBarColor(score) {
      if (score > 90) return "bg-green-600";
      if (score > 70) return "bg-green-500";
      if (score > 50) return "bg-green-400";
      if (score > 30) return "bg-red-300";
      if (score > 10) return "bg-red-500";
      if (score > 0) return "bg-red-600";
      return "bg-gray-300";
    },
  },
};
</script>

<style scoped>
.play-btn {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>

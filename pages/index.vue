<template>
  <div class="flex flex-col items-center justify-center text-white">
    <div class="flex flex-col items-center text-xl my-8 py-5">
      <div v-if="score.length > 0">
        <blockquote>Welcome back, {{ userName }} !</blockquote>
      </div>
      <div v-else>
        <blockquote class="text-center">
          Welcome to the quiz dedicated to cinema lovers, good luck !
        </blockquote>
        <div
          v-if="!userName && !userName.length > 0"
          class="flex flex-col md:flex-row items-center justify-center"
        >
          <p class="mr-4">Please enter your name</p>
          <div>
            <input
              ref="username"
              class="input px-2 w-[150px] mr-4 play-btn my-2 px-6 shadow-md rounded-full focus:outline-none"
            />
            <button
              class="play-btn my-2 px-4 shadow-md rounded-full"
              @click="setUserName"
            >
              <i class="bx bx-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[70%] text-center">
      <div v-if="score && score.length > 0">
        <h2>Highest score :</h2>
        <span class="text-xl font-bold"> {{ Math.max(...score) }} % </span>
      </div>
      <button
        class="play-btn mx-auto flex flex-row items-center my-2 pl-1 pr-4 shadow-md rounded-full"
        @click="viewLatestScore = !viewLatestScore"
      >
        <i
          :class="`glass h-100 bg-green-200 p-1 rounded-full bx bx-${
            viewLatestScore ? 'up' : 'down'
          }-arrow-alt mr-1 duration-300`"
        ></i
        ><span>View latest scores</span>
      </button>
      <div
        v-if="scoreToShow.length > 0 && viewLatestScore === true"
        class="transition duration-300"
      >
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
    </div>
    <Questionnaire
      v-if="isReady"
      class="mt-10"
      :is-game-over="isGameOver"
      @gameover="gameOverHandler"
      @isready="isReadyHandler"
      @score="setScore"
    />
    <GameOver v-if="isGameOver" :user-name="userName" :last-score="score[0]" />
    <button
      v-if="!isReady"
      class="play-btn my-2 px-4 shadow-md rounded-full"
      @click="
        () => {
          isReadyHandler(true);
          gameOverHandler(false);
        }
      "
    >
      {{ score.length || null > 0 ? "Play again" : "Play" }}
    </button>
    <div v-if="message">
      <span class="text-sm text-red-400">{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      userName: "",
      message: "",
      viewLatestScore: false,
      isReady: false,
      isGameOver: false,
      score: this.$cookies.get("user-score") || [],
      scoreToShow: [],
      swiperOption: {
        effect: "cards",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      questions: [
        {
          id: 1,
          actor: "Tobey Maguire",
          movie: "Spider-man: No way home",
          answers: ["yes", "no"],
          correct_answer: 1,
        },
        {
          id: 2,
          actor: "Zendaya",
          movie: "Avengers",
          answers: ["yes", "no"],
          correct_answer: 2,
        },
        {
          id: 3,
          actor: "Ben Affleck",
          movie: "The Dark knight",
          answers: ["yes", "no"],
          correct_answer: 2,
        },
        {
          id: 4,
          actor: "Leonardo Dicaprio",
          movie: "The wolf of wall street",
          answers: ["yes", "no"],
          correct_answer: 1,
        },
        {
          id: 5,
          actor: "Christian Bale",
          movie: "The dark knight",
          answers: ["yes", "no"],
          correct_answer: 1,
        },
        {
          id: 6,
          actor: "Clint Eastwood",
          movie: "Scary movie",
          answers: ["yes", "no"],
          correct_answer: 2,
        },
        {
          id: 7,
          actor: "Jason Statham",
          movie: "Fast & Furious",
          answers: ["yes", "no"],
          correct_answer: 1,
        },
      ],
    };
  },
  mounted() {
    // Initialize score to show and user name from cookies
    this.scoreToShow = this.score;
    this.userName = this.$cookies.get("user-name") || "";
  },
  methods: {
    // Function to handle the data bound to gameover card display
    gameOverHandler(payload) {
      this.isGameOver = payload;
    },

    // Function to handle the data bound to Quiz cards display
    isReadyHandler(payload) {
      if (!this.$cookies.get("user-name")) {
        this.message = "Please type on your name beforehand.";
      } else {
        this.isReady = payload;
      }
    },
    // Function to set the user name to cookie after he/she entered
    setUserName() {
      const userNameContainer = this.$refs["username"];
      this.userName = userNameContainer.value;
      this.$cookies.set("user-name", this.userName, {
        path: "/",
        maxAge: 10 * 365 * 24 * 60 * 60,
      });
      this.message = "";
    },
    // Push the new score to the array and set it in cookies
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
    // Handle the score bars' background color according to the score
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

<style>
.play-btn {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: 38px;
  font-size: 14px;
  font-weight: 300;
  transition: 0.3s;
}
.play-btn:hover {
  background: rgba(187, 222, 250, 0.652);
}
.glass {
  background: rgba(116, 192, 253, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
.progress-bar-container {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
}
.input {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
</style>

<template>
  <div
    class="questionnaire border border-gray-200 max-w-[420px] min-w-[340px] lg:w-[420px] overflow-hidden shadow-xl rounded-xl px-4 py-10"
  >
    <div>
      <p>Progress</p>
      <div
        class="progress-bar-container w-100 h-2 bg-gray-100 rounded-full shadow-sm mt-2"
      >
        <div
          :style="{
            width:
              Math.floor((currentQuestion.id / questions.length) * 100) + '%',
          }"
          class="progress-bar h-2 bg-green-300 rounded-full"
        ></div>
      </div>
    </div>
    <div class="flex flex-col mt-4 items-center justify-center">
      <h2>Question {{ currentQuestion.id }} out of {{ questions.length }}:</h2>
      <div
        class="flex items-center w-[100%] px-10 mt-4 justify-center border border-1 rounded-xl h-20 text-center"
      >
        Did {{ currentQuestion.actor }} play in {{ currentQuestion.movie }} ?
      </div>
    </div>
    <div class="flex flex-row mt-4">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + actorImgPath"
        alt="actor poster"
        class="min-w-[150px] rounded-xl shadow-md mr-2"
      />
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movieImgPath"
        alt="movie poster"
        class="min-w-[150px] rounded-xl shadow-md"
      />
    </div>
    <div class="mt-4 flex flex-row items-center justify-evenly">
      <button
        v-for="(item, index) in currentQuestion.answers"
        ref="chosenAnswer"
        :key="index"
        class="default-view w-16 my-2 py-2 px-4 shadow-md rounded-full uppercase duration-300"
        :class="[item === 'yes' ? 'bg-yes-btn' : 'bg-no-btn']"
        @click="answerClicked(index, item)"
      >
        {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isGameOver: {
      type: Boolean,
      required: true,
      default: false,
    },
    isReady: {
      type: Boolean,
    },
  },
  data() {
    return {
      questionCounter: 0,
      currentQuestion: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      actorImgPath: "",
      movieImgPath: "",
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
    this.loadQuestion();
  },
  methods: {
    loadQuestion() {
      if (this.questions.length > this.questionCounter) {
        this.currentQuestion = this.questions[this.questionCounter];
        this.loadImages(this.currentQuestion.actor, this.currentQuestion.movie);
        this.questionCounter += 1;
      } else {
        this.$emit("gameover", true);
        this.$emit("isready", false);
        this.$emit("score", (this.rightAnswers / this.questions.length) * 100);
        console.log(
          `Game over, you got ${
            (this.rightAnswers / this.questions.length) * 100
          }% of right answers.`
        );
      }
    },
    clearSelected(buttonSelected) {
      setTimeout(() => {
        buttonSelected.classList.remove("correct-view");
        buttonSelected.classList.remove("incorrect-view");
        buttonSelected.classList.add("default-view");
        this.loadQuestion();
      }, 500);
    },
    async loadImages(actor, movie) {
      // https://api.themoviedb.org/3/search/movie?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=spiderman:no+way+home
      const encodedMovie = encodeURI(movie);
      const encodedActor = encodeURI(actor);
      console.log(encodedMovie);
      // API KEY to be put in a .env file
      const movieResult = await this.$axios.get(
        `movie?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=${encodedMovie}`
      );
      const actorResult = await this.$axios.get(
        `person?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=${encodedActor}`
      );
      this.movieImgPath = movieResult.data.results[0].poster_path;
      console.log(actorResult.data.results[0].profile_path);
      this.actorImgPath = actorResult.data.results[0].profile_path;
    },
    answerClicked(index, choice) {
      const chosenItemNumber = index + 1;
      console.log(this.$refs["chosenAnswer"][index]);
      const buttonContainer = this.$refs["chosenAnswer"][index];
      console?.log(chosenItemNumber, choice);
      if (chosenItemNumber === this.currentQuestion.correct_answer) {
        console.log("you're right");
        this.rightAnswers += 1;
        this.$refs["chosenAnswer"][index].classList.add("correct-view");
        this.$refs["chosenAnswer"][index].classList.remove("default-view");
      } else {
        console.log("you're wrong");
        this.wrongAnswers += 1;
        this.$refs["chosenAnswer"][index].classList.add("incorrect-view");
        this.$refs["chosenAnswer"][index].classList.remove("default-view");
      }
      this.clearSelected(buttonContainer);
    },
  },
};
</script>

<style scoped>
.questionnaire {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  /* background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%); */
  color: white;
}

.bg-yes-btn:hover {
  background: rgba(125, 211, 33, 0.522);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

.bg-no-btn:hover {
  background: rgba(240, 110, 136, 0.555);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
}

.correct-view {
  border: 2px solid rgb(34, 212, 34);
}

.incorrect-view {
  border: 2px solid orange;
}

.default-view {
  border: 2px solid white;
}
</style>

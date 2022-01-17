<template>
  <div v-swiper="swiperOption">
    <div class="swiper-wrapper">
      <v-touch
        class="questionnaire swiper-slide hover:cursor-pointer border border-gray-200 max-w-[420px] min-w-[340px] lg:w-[420px] overflow-hidden shadow-xl rounded-xl px-4 py-10"
        @swipeleft="onSwipe(currentQuestion.answers[0])"
        @swiperight="onSwipe(currentQuestion.answers[1])"
      >
        <div>
          <p>Progress</p>
          <div
            class="progress-bar-container w-100 h-2 bg-gray-100 rounded-full shadow-sm mt-2"
          >
            <div
              :style="{
                width:
                  Math.floor((currentQuestion.id / questions.length) * 100) +
                  '%',
              }"
              class="progress-bar h-2 bg-green-300 rounded-full"
            ></div>
          </div>
        </div>
        <div class="flex flex-col mt-4 items-center justify-center">
          <h2>
            Question {{ currentQuestion.id }} out of {{ questions.length }} :
          </h2>
          <div
            class="flex items-center w-[100%] px-10 mt-4 justify-center border border-1 rounded-xl h-20 text-center"
          >
            Did {{ currentQuestion.actor }} play in
            {{ currentQuestion.movie }} ?
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
            class="play-btn default-view w-16 my-2 py-2 px-4 shadow-md rounded-full uppercase duration-300"
            :class="[item === 'yes' ? 'bg-yes-btn' : 'bg-no-btn']"
            @click="answerClicked(index, item)"
          >
            {{ item }}
          </button>
        </div>
      </v-touch>
    </div>
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import questions from "@/static/data/questions.json";
export default {
  name: "Questionnaire",
  directives: {
    swiper: directive,
  },
  props: {
    isGameOver: {
      type: Boolean,
      default: false,
    },
    isReady: {
      type: Boolean,
    },
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      questionCounter: 0,
      currentQuestion: 0,
      rightAnswers: 0,
      wrongAnswers: 0,
      actorImgPath: "",
      movieImgPath: "",
      questions: questions,
    };
  },
  mounted() {
    // At the mount of the component, load the first time
    this.loadQuestion();
  },
  methods: {
    // Handle the swipe event to right or left
    onSwipe(choice) {
      choice = choice === "yes" ? 1 : 2;

      if (choice === this.currentQuestion.correct_answer) {
        this.rightAnswers += 1;
      } else {
        this.wrongAnswers += 1;
      }
      this.loadQuestion();
    },

    // Question loader, new card content loader
    loadQuestion() {
      if (this.questions.length > this.questionCounter) {
        this.currentQuestion = this.questions[this.questionCounter];
        this.loadImages(this.currentQuestion.actor, this.currentQuestion.movie);
        // Go to next question
        this.questionCounter += 1;
      } else {
        this.$emit("gameover", true);
        this.$emit("isready", false);
        this.$emit("score", (this.rightAnswers / this.questions.length) * 100);
      }
    },

    // Add a nice border color depending on whether it is right or wrong answer
    // and hold it for 300ms to give a hint to the user
    clearSelected(buttonSelected) {
      setTimeout(() => {
        buttonSelected.classList.remove("correct-view");
        buttonSelected.classList.remove("incorrect-view");
        buttonSelected.classList.add("default-view");
        this.loadQuestion();
      }, 500);
    },

    // Load images with request to themoviedb api
    async loadImages(actor, movie) {
      // https://api.themoviedb.org/3/search/movie?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=spiderman:no+way+home
      const encodedMovie = encodeURI(movie);
      const encodedActor = encodeURI(actor);

      // API KEY to be put in a .env file
      const movieResult = await this.$axios.get(
        `movie?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=${encodedMovie}`
      );
      const actorResult = await this.$axios.get(
        `person?api_key=aeae1288904d0de30a4bd9f68d9a6e2f&query=${encodedActor}`
      );
      this.movieImgPath = movieResult.data.results[0].poster_path;

      this.actorImgPath = actorResult.data.results[0].profile_path;
    },
    // Handle the user's choice when he clicked on a answer button "yer" or "no"
    answerClicked(index) {
      const chosenItemNumber = index + 1;
      const buttonContainer = this.$refs["chosenAnswer"][index];
      if (chosenItemNumber === this.currentQuestion.correct_answer) {
        this.rightAnswers += 1;
        this.$refs["chosenAnswer"][index].classList.add("correct-view");
        this.$refs["chosenAnswer"][index].classList.remove("default-view");
      } else {
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

.bg-no-btn,
.bg-yes-btn {
  background: rgba(116, 192, 253, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border: 1px solid rgba(255, 255, 255, 0.18);
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
}

.correct-view {
  border: 1px solid rgb(34, 212, 34);
}

.incorrect-view {
  border: 1px solid orange;
}
</style>

<template>
  <div class="questionnaire w-1/4 shadow-xl rounded-xl px-4 py-16">
    <div class="flex flex-col items-center justify-center">
      <h2>Question 1:</h2>
      <div
        class="flex items-center px-10 mt-4 justify-center border border-1 rounded-xl h-20 text-center"
      >
        {{ currentQuestion.question }}
      </div>
    </div>
    <div class="mt-2 flex flex-col items-center">
      <button
        v-for="(item, index) in currentQuestion.answers"
        ref="chosenAnswer"
        :key="index"
        class="default-view my-2 py-2 px-4 shadow-md rounded-full"
        @click="answerClicked(index, item)"
      >
        <span>{{ index }}</span> {{ item }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionCounter: 0,
      currentQuestion: 0,
      questions: [
        {
          question: "Which of these movies is part of the MCU?",
          answers: ["Batman", "Thor", "Suicide squad"],
          correct_answer: 2,
        },
        {
          question: "Who is the film director of 2000 Spider-man?",
          answers: ["Sam Raimi", "Jon Watts", "Mike Flannagan"],
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
      } else {
        console.log("out of questions");
      }
    },
    answerClicked(index, choice) {
      const chosenItemNumber = index + 1;
      console.log(this.$refs["chosenAnswer"][index]);
      const buttonContainer = this.$refs["chosenAnswer"][index];
      console?.log(chosenItemNumber, choice);
      if (chosenItemNumber === this.currentQuestion.correct_answer) {
        console.log("you're right");
        this.$refs["chosenAnswer"][index].classList.add("correct-view");
        this.$refs["chosenAnswer"][index].classList.remove("default-view");
      } else {
        console.log("you're wrong");
        this.$refs["chosenAnswer"][index].classList.add("incorrect-view");
        this.$refs["chosenAnswer"][index].classList.remove("default-view");
      }
      this.questionCounter += 1;
      this.loadQuestion();
    },
  },
};
</script>

<style scoped>
.questionnaire {
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
  color: white;
}

.correct-view {
  border: 2px solid green;
}

.incorrect-view {
  border: 2px solid orange;
}

.default-view {
  border: 2px solid white;
}
</style>

<template>
  <div class="container">
    <div class="left">
      <h2>Пройдите опрос</h2>
      <p class="text-36">
        Это займет всего 10 минут, и вы получите первоначальную оценку с ключевыми идеями и
        расчетами вашего проекта
      </p>
    </div>
    <div class="right">
      <div class="quiz-container">
        <div class="question">
          <p class="text-24 text-white">{{ currentQuestion.text }}</p>
          <div class="answers">
            <div
              v-for="(answer, index) in currentQuestion.answers"
              :key="index"
              class="answer"
              :class="{ selected: selectedAnswerIndex === index }"
              @click="selectAnswer(index)"
            >
              <p class="text-18 text-white" v-html="answer"></p>
            </div>
          </div>
          <div class="controls">
            <p class="text-18 text-white">{{ currentQuestionIndex + 1 }}</p>
            <div class="circle">
              <MainQuizCircle />
            </div>
            <p class="text-18 text-white">{{ questions.length }}</p>
            <button v-if="selectedAnswerIndex !== null" class="next-button" @click="nextQuestion">
              <MainQuizArrow class="arrow" />
            </button>
            <MainQuizArrow v-else class="arrow disabled" />
          </div>
        </div>
        <NuxtImg
          class="image"
          src="/images/MainQuiz/image.png"
          alt="Декорация вопроса"
          format="webp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const modal = useModal()

const questions = [
  {
    text: 'Из какого материала планируете строить?',
    answers: ['Дерево', 'Кирпич', 'Комбинированный', 'Ещё не решил'],
  },
  {
    text: 'Какой размер объекта вам нужен?',
    answers: ['До 20 м²', '20-40 м²', '40-60 м²', 'Более 60 м²'],
  },
  {
    text: 'Какой у вас бюджет на проект?',
    answers: [
      'До 500 000 ₽',
      '500 000 - <br>  1 000 000 ₽',
      '1 000 000 - <br>  2 000 000 ₽',
      'Более <br> 2 000 000 ₽',
    ],
  },
  {
    text: 'Когда планируете начать строительство?',
    answers: [
      'В течение месяца',
      'В течение 3 месяцев',
      'В течение полугода',
      'Пока только изучаю',
    ],
  },
]

const currentQuestionIndex = ref(0)
const selectedAnswerIndex = ref(null)
const answers = ref([])

const currentQuestion = computed(() => {
  return questions[currentQuestionIndex.value]
})

function selectAnswer(index) {
  selectedAnswerIndex.value = index
}

function nextQuestion() {
  if (selectedAnswerIndex.value === null) return

  // Сохраняем ответ
  answers.value.push({
    question: currentQuestion.value.text,
    answer: currentQuestion.value.answers[selectedAnswerIndex.value],
  })

  // Если это последний вопрос
  if (currentQuestionIndex.value === questions.length - 1) {
    // Открываем модальное окно
    modal.open('default')
    // Сбрасываем квиз в первоначальное состояние
    resetQuiz()
  } else {
    // Переходим к следующему вопросу
    currentQuestionIndex.value++
    selectedAnswerIndex.value = null
  }
}

function resetQuiz() {
  currentQuestionIndex.value = 0
  selectedAnswerIndex.value = null
  answers.value = []
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 0 60px;

  .left {
    h2,
    p {
      max-width: 568px;
    }
  }

  .right {
    .quiz-container {
      padding: 40px;
      display: flex;
      gap: 26px;
      border-radius: 25px;
      background: #41a3db;
    }

    .answers {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
      margin-bottom: 40px;

      .answer {
        padding: 16px 12px;
        width: 100%;
        border-radius: 15px;
        border: 1px solid $white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition:
          background-color 0.3s ease,
          border-color 0.3s ease;
        min-height: 60px;

        p {
          text-align: center;
          line-height: 1.4;
          word-break: break-word;
          hyphens: auto;
          margin: 0;
          padding: 0;
        }

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        &.selected {
          background-color: $white;
          border-color: $white;

          p {
            color: #41a3db;
          }
        }
      }
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 10px;

      .next-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        margin-left: 20px;
        transition: opacity 0.3s ease;

        &:hover {
          opacity: 0.7;
        }
      }

      .arrow {
        margin-left: 20px;

        &.disabled {
          opacity: 0.5;
        }
      }
    }

    .image {
      min-width: 170px;
      flex-shrink: 0;
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      aspect-ratio: 170 / 273;
    }
  }
}
</style>

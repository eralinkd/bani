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
          <p class="text-24 text-white">Из какого материала планируете строить?</p>
          <div class="answers">
            <div class="answer">
              <p class="text-18 text-white">Дерево</p>
            </div>
            <div class="answer">
              <p class="text-18 text-white">Кирпич</p>
            </div>
            <div class="answer">
              <p class="text-18 text-white">Комбинированный</p>
            </div>
            <div class="answer">
              <p class="text-18 text-white">Ещё не решил</p>
            </div>
          </div>
          <div class="controls">
            <p class="text-18 text-white">2</p>
            <div class="circle">
              <MainQuizCircle />
            </div>
            <p class="text-18 text-white">4</p>
            <MainQuizArrow class="arrow" />
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

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding-left: 60px;

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
        padding: 10px;
        width: 100%;
        border-radius: 15px;
        border: 1px solid $white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 10px;

      .arrow {
        margin-left: 20px;
      }
    }

    .image {
      height: 100%;
      object-fit: cover;
      border-radius: 20px;
      aspect-ratio: 170 / 273;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="left">
      <h2>
        Отвечаем <br />
        на частые <br />
        вопросы
      </h2>
    </div>

    <div class="right">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="faq-item"
        :class="{ open: openIndex === idx }"
      >
        <button
          type="button"
          class="question"
          :aria-expanded="openIndex === idx"
          :aria-controls="`faq-answer-${item.id}`"
          @click="toggle(idx)"
        >
          <span class="text-16">{{ item.question }}</span>
          <span class="icon" aria-hidden="true">
            <svg
              v-if="openIndex !== idx"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.06 11.17L12.53 14.7C12.38 14.85 12.19 14.92 12 14.92C11.81 14.92 11.62 14.85 11.47 14.7L7.94 11.17C7.65 10.88 7.65 10.4 7.94 10.11C8.23 9.82 8.71 9.82 9 10.11L12 13.11L15 10.11C15.29 9.82 15.77 9.82 16.06 10.11C16.35 10.4 16.35 10.87 16.06 11.17Z"
                fill="#41424C"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.06 14C15.91 14.15 15.72 14.22 15.53 14.22C15.34 14.22 15.15 14.14 15 14L12 11L9 14C8.71 14.29 8.23 14.29 7.94 14C7.65 13.71 7.65 13.23 7.94 12.94L11.47 9.41C11.76 9.12 12.24 9.12 12.53 9.41L16.06 12.94C16.35 13.23 16.35 13.7 16.06 14Z"
                fill="#41424C"
              />
            </svg>
          </span>
        </button>

        <div v-if="item.answer" :id="`faq-answer-${item.id}`" class="answer">
          <div class="answer-inner">
            <p class="text-16">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type FaqItem = {
  id: string
  question: string
  answer?: string
}

const items = ref<FaqItem[]>([
  {
    id: 'q1',
    question: 'Сколько стоит баня или беседка под ключ?',
    answer:
      'Цена зависит от размера, материала и комплектации. Небольшая баня начинается примерно от 350–400 тысяч рублей, беседка — от 150 тысяч. Мы делаем предварительный расчёт бесплатно — просто оставьте заявку, и мы подскажем точнее под ваш проект.',
  },
  {
    id: 'q2',
    question: 'Вы работаете только по готовым проектам или можно свой вариант?',
    answer:
      'Работаем и по готовым решениям, и по индивидуальным проектам. Можем адаптировать типовой вариант под ваш участок и пожелания или разработать проект с нуля.',
  },
  {
    id: 'q3',
    question: 'Сколько длится строительство?',
    answer:
      'Срок зависит от размера и комплектации. В среднем: беседка — от 5 до 10 дней, баня — от 2 до 4 недель с учётом доставки материалов и отделки.',
  },
  {
    id: 'q4',
    question: 'Вы помогаете с фундаментом?',
    answer:
      'Да, подскажем оптимальный вариант под ваш грунт и нагрузку, выполним расчёт и можем взять устройство фундамента на себя.',
  },
  {
    id: 'q5',
    question: 'Какие материалы используете?',
    answer:
      'Используем проверенный пиломатериал камерной сушки, экологичные утеплители и качественную фурнитуру. По просьбе клиента применяем выбранные бренды отделки и кровли.',
  },
])

const openIndex = ref<number>(0)
function toggle(idx: number) {
  openIndex.value = openIndex.value === idx ? -1 : idx
}
</script>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  .right {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 688px;
  }

  .faq-item {
    border-radius: 10px;

    .question {
      background: #ffffff;
      width: 100%;
      min-height: 49px;
      padding: 12px 15px 12px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #41424c;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-align: left;
      border: none;
      cursor: pointer;

      .text-16 {
        color: #41424c;
        line-height: 1.25;
      }

      .icon {
        width: 24px;
        height: 24px;
        flex: 0 0 24px;
      }
    }

    .answer {
      overflow: hidden;
      max-height: 0;
      opacity: 0;
      margin-top: 0;
      transition:
        max-height 300ms ease,
        opacity 300ms ease,
        margin 300ms ease;

      .answer-inner {
        padding: 0 15px 16px 15px;
        color: #41424c;
      }
    }

    &.open {
      .answer {
        max-height: 500px; // достаточно для длинного ответа
        opacity: 1;
        margin-top: 10px;
      }
    }
  }
}
</style>

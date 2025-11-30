<template>
  <div class="container">
    <div class="left">
      <h2>как мы работаем</h2>
      <p class="text-16 intro">
        Для расчета стоимости проекта оставьте заявку на сайте или позвоните нам. Мы соберем и
        доставим материалы для объекта за один день.
      </p>
      <div class="steps">
        <div class="item">
          <div class="number">
            <HowWeWorkIconsOne class="icon" />
          </div>
          <p class="text-16">Оставьте заявку на нашем сайте, чтобы начать процесс.</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsTwo class="icon" />
          </div>
          <p class="text-16">Согласуйте детали с менеджером, включая сроки и стоимость.</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsThree class="icon" />
          </div>
          <p class="text-16">Накануне работ мы созвонимся с вами. Оплатите и отдыхайте!</p>
        </div>
        <div class="item">
          <div class="number">
            <HowWeWorkIconsFour class="icon" />
          </div>
          <p class="text-16">Оформите заказ и подтвердите все условия работы и монтажа.</p>
        </div>
      </div>
      <UIButton v-if="!noButton" @click="modal.open('default')">Оставить заявку</UIButton>
    </div>
    <div class="right">
      <h2 class="text-64 text-white">Воспользуйтесь беспроцентной рассрочкой</h2>
      <p class="text-36 text-white">от Т-Банка и банков партнеров</p>
      <UIButton secondary class="button" @click="modal.open('default')">Оставить заявку</UIButton>
      <NuxtImg class="image" src="/images/HowWeWork/bg.png" alt="Как мы работаем" format="webp" />
      <NuxtImg
        class="decor"
        src="/images/HowWeWork/cards.png"
        alt="Карточки банков"
        format="webp"
      />
    </div>
  </div>
</template>

<script setup>
const modal = useModal()

defineProps({
  noButton: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 0 60px;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }

  .left {
    .text-16.intro {
      margin-top: 10px;
      margin-bottom: 40px;

      @media (max-width: $mobileBreakpoint) {
        margin-bottom: 20px;
      }
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-bottom: 40px;

      @media (max-width: $mobileBreakpoint) {
        margin-bottom: 20px;
        gap: 9px;
      }

      .item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px;
        border-radius: 15px;
        background: $white;
        cursor: pointer;
        transition:
          box-shadow 0.3s ease,
          transform 0.3s ease;

        &:hover {
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          transform: translateY(-4px);
        }

        @media (max-width: $mobileBreakpoint) {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 20px 10px;

          p {
            text-align: center;
            font-family: Inter;
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            max-width: 121px;
          }
        }

        .number {
          width: 55px;
          height: 55px;
          background: $text;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;

          @media (max-width: $mobileBreakpoint) {
            width: 29.64px;
            height: 29.64px;
            border-radius: 6.587px;

            .icon {
              width: 8.412px;
              height: 15.451px;
            }
          }
        }

        &:hover .number {
          transform: scale(1.05);
        }
      }
    }
  }

  .right {
    position: relative;
    padding: 40px;

    @media (max-width: $mobileBreakpoint) {
      padding: 20px;
      padding-bottom: 30px;
      h2 {
        color: #fff;
        font-family: Gilroy;
        font-size: 35px;
        font-style: normal;
        font-weight: 900;
        line-height: 110%; /* 38.5px */
        text-transform: uppercase;
      }
    }

    * {
      position: relative;
      z-index: 2;
    }

    .image {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 30px;

      @media (max-width: $mobileBreakpoint) {
        border-radius: 17.622px;
      }
    }

    .text-36 {
      margin: 20px 0;

      @media (max-width: $mobileBreakpoint) {
        margin: 8px 0;
        font-size: 24px;
        font-family: Inter;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }

    .decor {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 68%;

      @media (max-width: $mobileBreakpoint) {
        right: auto;
        left: 50%;
        top: 180px;
        transform: translateX(-50%);
        width: 90%;
      }
    }

    .button {
      z-index: 3;

      @media (max-width: $mobileBreakpoint) {
        margin: 213px auto 0 auto;
        width: fit-content;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>

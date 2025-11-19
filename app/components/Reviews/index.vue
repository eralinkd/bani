<template>
  <div class="container">
    <div class="left">
      <h2>Отзывы</h2>
      <p class="text-36">
        Почему клиенты <br />
        возвращаются именно к нам
      </p>
      <div class="icons">
        <a href="#" target="_blank">
          <ReviewsIcons2gis />
        </a>
        <a href="#" target="_blank">
          <ReviewsIconsGoogle />
        </a>
        <a href="#" target="_blank">
          <ReviewsIconsYandex />
        </a>
      </div>
      <UIButton>Прочитать все отзывы</UIButton>
    </div>
    <div class="right">
      <div class="review-card">
        <div class="header">
          <div class="avatar" aria-hidden="true"></div>
          <div class="meta">
            <div class="name">Анна Кондрашова</div>
            <div class="date">30 июля 2025</div>
          </div>
        </div>
        <p class="content">
          Очень понравился подход: помогли с проектом, подобрали материал, всё согласовали заранее.
          Работали аккуратно, без мусора и лишней суеты. Уже полгода пользуемся — баня тёплая, нигде
          не течёт, пар держит отлично. Спасибо за качественную работу!
        </p>
        <div class="footer">
          <ReviewsIcons2gisGrey />
          <div class="stars" aria-label="Оценка 5 из 5">
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
          </div>
        </div>
      </div>
      <div class="review-card">
        <div class="header">
          <div class="avatar" aria-hidden="true"></div>
          <div class="meta">
            <div class="name">Татьяна Голованова</div>
            <div class="date">18 июля 2025</div>
          </div>
        </div>
        <p class="content">
          Давно мечтали о красивой беседке во дворе. Ребята предложили несколько вариантов дизайна,
          подобрали под наш участок. Построили быстро, аккуратно и по адекватной цене. Получилось
          даже лучше, чем на визуализации!
        </p>
        <div class="footer">
          <ReviewsIcons2gisGrey />
          <div class="stars" aria-label="Оценка 5 из 5">
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
            <ReviewsIconsStar />
          </div>
        </div>
      </div>

      <div class="slider-controls">
        <IconsArrowLeft />
        <p class="text-18">2 / 18</p>
        <IconsArrowRight />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding-left: 60px;

  .left {
    .text-36 {
      margin-top: 10px;
      margin-bottom: 40px;
    }

    .icons {
      display: flex;
      gap: 10px;
      margin-bottom: 40px;
    }
  }

  .right {
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    position: relative;

    .slider-controls {
      position: absolute;
      right: 0;
      bottom: -50px;
      display: flex;
      align-items: center;
      gap: 20px;

      .text-18 {
        color: $text-secondary;
      }
    }

    .review-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 20px;

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(180deg, #d9d9d9 0%, #c7c7c7 100%);
          flex: 0 0 auto;
        }

        .meta {
          display: flex;
          flex-direction: column;
          .name {
            font-weight: 600;
            font-size: 18px;
            line-height: 1.5;
            color: #000000;
          }
          .date {
            font-size: 14px;
            line-height: 1.5;
            color: #8e8e8e;
          }
        }
      }

      .content {
        font-size: 16px;
        line-height: 1.5;
        color: #000000;
        margin-bottom: 16px;
      }

      .footer {
        display: flex;
        align-items: center;
        gap: 12px;

        .stars {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 18px;
        }
      }
    }
  }
}
</style>

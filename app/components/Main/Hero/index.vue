<template>
  <div class="container main-hero">
    <div class="container white">
      <!-- seo header -->
      <h1 style="display: none">Бани и беседки под ключ</h1>
      <!-- actual description -->
      <div class="first-row">
        <p class="text-36">
          Строим <br />
          уникальные
        </p>
        <h2>Бани</h2>
      </div>
      <div class="second-row">
        <h2>и беседки</h2>
      </div>
      <div class="third-row">
        <h2>под ключ</h2>
      </div>
      <div class="btn-row">
        <UIButton>В каталог</UIButton>
        <p class="text-36">с гарантией</p>
      </div>

      <div class="pros">
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/1.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">+300</p>
          <p class="text-14">Нами объектов построено</p>
        </div>
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/2.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">>15</p>
          <p class="text-14">Специалистов в одном проекте</p>
        </div>
        <div class="item">
          <NuxtImg
            class="img"
            src="/images/MainHero/pros/3.png"
            alt="Объектов построено"
            format="webp"
          />
          <p class="text-48">20</p>
          <p class="text-14">Лет минимальный стаж специалистов</p>
        </div>
      </div>
    </div>
    <div class="container">
      <NuxtImg class="image" src="/images/MainHero/image.png" alt="Бани 21 века" format="webp" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.main-hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;

  .container.white {
    display: flex;
    justify-content: center;
    padding: 60px 120px 0 60px;
    flex-direction: column;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.first-row {
  display: flex;
  gap: 18px;
  justify-content: flex-end;

  p {
    text-align: right;
  }
}

.second-row {
  margin-top: 15px;
  margin-bottom: 5px;
}

.third-row {
  margin-bottom: 15px;
}

.btn-row {
  max-width: 530px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pros {
  max-width: 530px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 70px;

  .item {
    position: relative;
    height: 157px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    border-radius: 20px;
    background: $background;
    gap: 3px;
  }

  .img {
    position: absolute;
    left: 50%;
    top: -25px;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    flex-shrink: 0;
    aspect-ratio: 1/1;
    border-radius: 50%;
  }
}
</style>

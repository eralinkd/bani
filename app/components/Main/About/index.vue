<template>
  <div class="container white">
    <div class="left">
      <h2>о нас</h2>
      <p class="text-16">
        Бани 21 века — компания с многолетним опытом. За 12 лет работы мы зарекомендовали себя как
        надежного поставщика садовых построек и мебели. География наших работ — это вся ральная
        часть России. <br />
        <br />

        Наши клиенты — это не только владельцы дачных участков, но и базы отдыха, оздоровительные
        центры, рестораны, летние кафе, детские лагеря и санатории. <br />
        <br />

        Сотрудники нашей компании за долгие годы сплотились в одну единую профессиональную команду.
        Поэтому мы гордимся качеством производимой нами продукции и точно в срок поставляем ее
        заказчику.
      </p>
      <UIButton class="button">Подробнее</UIButton>
    </div>
    <div class="video">
      <iframe
        src="https://www.youtube.com/embed/D_fs9pbS7d4?si=MFldfYVuiRmuwRQy"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.container {
  display: grid;
  grid-template-columns: 448fr 800fr;
  gap: 32px;
  overflow: hidden;

  @media (max-width: $mobileBreakpoint) {
    grid-template-columns: 1fr;
    gap: 45px;
    padding: 40px 10px 10px 10px;

    h2 {
      font-size: 50px;
    }
  }

  .left {
    padding: 50px 0 0 60px;

    @media (max-width: $mobileBreakpoint) {
      padding: 0 10px;
    }

    .text-16 {
      margin-top: 10px;
      margin-bottom: 40px;

      @media (max-width: $mobileBreakpoint) {
        margin-bottom: 20px;
      }
    }
  }

  .video {
    aspect-ratio: 928 / 638;
    width: 100%;
    height: 100%;
    overflow: hidden;

    @media (max-width: $mobileBreakpoint) {
      border-radius: 20px;
    }

    iframe {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

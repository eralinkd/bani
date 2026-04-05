<template>
  <div class="error-page">
    <header class="error-header">
      <NuxtLink to="/" class="logo-link">
        <AppHeaderLogo />
      </NuxtLink>
    </header>

    <main class="error-main">
      <div class="error-content">
        <div class="error-number">
          <span class="four">4</span>
          <span class="zero">0</span>
          <span class="four">4</span>
        </div>
        <div class="error-icon">🪵</div>
        <h1 class="error-title">Страница не найдена</h1>
        <p class="error-subtitle">
          Похоже, эта страница уже уехала на&nbsp;дачу.<br />
          Давайте вернёмся и найдём то, что вам нужно.
        </p>
        <div class="error-actions">
          <UIButton icon-position="none" @click="goHome">На главную</UIButton>
          <UIButton secondary icon-position="none" @click="goCatalog">Смотреть каталог</UIButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: '404 — Страница не найдена | Бани 21 века',
  htmlAttrs: { class: 'site-content', lang: 'ru' },
})

function goHome() {
  clearError({ redirect: '/' })
}

function goCatalog() {
  clearError({ redirect: '/catalog' })
}
</script>

<style lang="scss">
@use '@scss/variables' as *;
@use '@scss/main';
</style>

<style scoped lang="scss">
@use '@scss/variables' as *;

.error-page {
  min-height: 100vh;
  background-color: #f5f6fb;
  display: flex;
  flex-direction: column;
}

.error-header {
  padding: 24px 60px;
  background: #fff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);

  @media (max-width: $mobileBreakpoint) {
    padding: 20px 20px;
  }
}

.logo-link {
  display: inline-block;
}

.error-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.error-content {
  text-align: center;
  max-width: 600px;
}

.error-number {
  display: flex;
  justify-content: center;
  gap: 0;
  line-height: 1;
  margin-bottom: 16px;

  span {
    font-family: Gilroy, sans-serif;
    font-size: 200px;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    color: #41424c;
    display: block;

    @media (max-width: $mobileBreakpoint) {
      font-size: 110px;
    }
  }

  .zero {
    color: #41a3db;
  }
}

.error-icon {
  font-size: 56px;
  margin-bottom: 24px;

  @media (max-width: $mobileBreakpoint) {
    font-size: 40px;
  }
}

.error-title {
  all: unset;
  display: block;
  font-family: Gilroy, sans-serif;
  font-size: 36px;
  font-weight: 900;
  text-transform: uppercase;
  color: #41424c;
  margin-bottom: 16px;

  @media (max-width: $mobileBreakpoint) {
    font-size: 24px;
  }
}

.error-subtitle {
  font-family: Inter, sans-serif;
  font-size: 16px;
  color: #41424c;
  opacity: 0.7;
  line-height: 1.6;
  margin-bottom: 40px;
}

.error-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>

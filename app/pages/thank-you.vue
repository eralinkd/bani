<template>
  <div class="site-content">
    <AppHeader />
    <main class="ty-page">
      <div class="ty-hero">
        <NuxtImg
          src="/images/MainHero/image.png"
          alt="Баня"
          class="ty-bg"
          format="webp"
        />
        <div class="ty-overlay" />
        <div class="ty-content">
          <div class="ty-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13l4 4L19 7" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Заявка принята</span>
          </div>
          <p class="ty-title">Спасибо!<br />Мы скоро свяжемся с вами</p>
          <p class="ty-subtitle">Обычно перезваниваем в течение 30 минут в рабочее время</p>
          <div class="ty-actions">
            <NuxtLink to="/" class="ty-btn-wrap">
              <UIButton :show-icon="false" secondary>На главную</UIButton>
            </NuxtLink>
            <p class="ty-redirect">Автопереход через <strong>{{ countdown }}</strong>&thinsp;сек.</p>
          </div>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
useHead({ title: 'Спасибо за заявку' })

const countdown = ref(30)
let timer = null

onMounted(() => {
  timer = setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      clearInterval(timer)
      navigateTo('/')
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@use '@scss/variables' as *;

.ty-page {
  background: $background;
}

.ty-hero {
  position: relative;
  height: 520px;
  overflow: hidden;

  @media (max-width: $mobileBreakpoint) {
    height: auto;
    min-height: 420px;
  }
}

.ty-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.ty-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(30, 30, 30, 0.82) 0%,
    rgba(30, 30, 30, 0.60) 45%,
    rgba(30, 30, 30, 0.15) 100%
  );
}

.ty-content {
  position: relative;
  z-index: 1;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: $mobileBreakpoint) {
    padding: 48px 20px;
    gap: 20px;
  }
}

.ty-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 100px;
  padding: 6px 16px 6px 10px;
  color: #fff;
  font-size: 14px;
  font-family: Inter, sans-serif;
  backdrop-filter: blur(6px);
}

.ty-title {
  font-size: 52px;
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  margin: 0;
  font-family: Inter, sans-serif;
  text-transform: none !important;
  letter-spacing: normal !important;

  @media (max-width: $mobileBreakpoint) {
    font-size: 32px;
  }
}

.ty-subtitle {
  font-size: 18px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  max-width: 420px;
  font-family: Inter, sans-serif;

  @media (max-width: $mobileBreakpoint) {
    font-size: 15px;
  }
}

.ty-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 8px;

  @media (max-width: $mobileBreakpoint) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.ty-btn-wrap {
  text-decoration: none;
}

.ty-redirect {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-family: Inter, sans-serif;

  strong {
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
  }
}
</style>

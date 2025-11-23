<template>
  <div>
    <AppHeader is-main />
    <main class="main-page">
      <MainHero />
      <MainChoose />
      <ProjectsSlider />
      <WhyUs />
      <!-- <FeedbackForm />
      <Popular />
      <MainAbout />
      <HowWeWork />
      <MainQuiz />
      <Reviews />
      <FAQ />
      <MainContacts /> -->
    </main>
    <!-- <AppFooter /> -->
  </div>
</template>

<style scoped lang="scss">
@use '@scss/variables' as *;
.main-page {
  margin-top: -75px;

  @media (max-width: $mobileBreakpoint) {
    margin-top: 0;
  }
}
</style>

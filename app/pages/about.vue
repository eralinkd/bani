<template>
  <div>
    <AppHeader />
    <main>
      <Breadcrumbs />
      <AboutBanner />
      <AboutHero />
      <AboutWhyUs />
      <FeedbackForm />
      <Reviews />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
useSeoPage('about', { title: 'О нас' })
useLocalBusinessJsonLd()
</script>


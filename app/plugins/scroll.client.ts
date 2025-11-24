// @ts-expect-error - Nuxt auto-imports
export default defineNuxtPlugin((nuxtApp) => {
  // @ts-expect-error - Nuxt auto-imports
  const router = useRouter()

  // Настройка scrollBehavior для роутера
  router.options.scrollBehavior = (to, from, savedPosition) => {
    // Если есть сохраненная позиция (например, при использовании кнопки "Назад")
    if (savedPosition) {
      return savedPosition
    }

    // Если переход на другую страницу (разные пути без hash)
    if (to.path !== from.path && !to.hash) {
      // Мгновенный скролл вверх без плавности
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      return { top: 0, left: 0 }
    }

    // Если переход по якорной ссылке
    if (to.hash) {
      // Возвращаем Promise для плавной прокрутки к якорю
      return new Promise((resolve) => {
        nuxtApp.$nextTick(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            resolve({ el: to.hash, top: 0 })
          } else {
            resolve({ top: 0, left: 0 })
          }
        })
      })
    }

    // По умолчанию - вверх без плавности
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    return { top: 0, left: 0 }
  }

  // Обработка якорных ссылок на той же странице
  router.afterEach((to, from) => {
    // Если переход на ту же страницу с якорем
    if (to.path === from.path && to.hash && from.hash !== to.hash) {
      nuxtApp.$nextTick(() => {
        const element = document.querySelector(to.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    }
  })
})

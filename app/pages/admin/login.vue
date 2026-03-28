<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-6">
    <div class="w-full max-w-sm overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      <div class="border-b border-slate-200 px-6 py-5">
        <h1 class="text-xl font-semibold text-slate-800">Бани 21 века</h1>
        <p class="mt-1 text-sm text-slate-500">Войдите для управления контентом</p>
      </div>
      <form class="flex flex-col gap-4 px-6 py-5" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-700">Логин</label>
          <UInput v-model="form.username" type="text" placeholder="admin" autocomplete="username" class="w-full" />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-slate-700">Пароль</label>
          <UInput
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            class="w-full"
          />
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <UButton type="submit" block color="primary" :loading="loading">Войти</UButton>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false, middleware: 'admin-auth-redirect' })

const form = ref({ username: '', password: '' })
const loading = ref(false)
const error = ref('')

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/admin/auth/login', { method: 'POST', body: form.value })
    await navigateTo('/admin')
  } catch (e) {
    error.value = e.data?.message || 'Неверный логин или пароль'
  } finally {
    loading.value = false
  }
}
</script>

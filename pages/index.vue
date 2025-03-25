<script setup lang="ts">
import {useUserStore} from "~/store/user-store";
definePageMeta({
  middleware: 'auth' // this should match the name of the file inside the middleware directory
})
const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.isAuthenticated)
</script>

<template>
  <div class="flex min-h-screen">
    <div class="w-1/2 bg-stone-200">

    </div>
    <div class="w-1/2 flex justify-center items-center">
      <ul>
        <li  class="border rounded flex items-center justify-center p-4 w-24">
          <router-link v-if="isAuthenticated" to="/profile">Мой Профиль</router-link>
          <router-link v-else to="/login">Войти</router-link>
        </li>
      </ul>

    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/main.scss';
</style>
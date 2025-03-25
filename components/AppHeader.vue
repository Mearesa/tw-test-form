<script setup lang="ts">
import {useUserStore} from "~/store/user-store";
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(useUserStore()); // make authenticated state reactive with storeToRefs
console.log(isAuthenticated)
// Здесь должна быть ваша логика для проверки аутентификации
// Например, можно использовать Vuex или Pinia для "глобального" состояния.
const router = useRouter();

const logout = () => {
  userStore.logoutUser()
  router.push('/login');
};
</script>

<template>
  <header class="border-solid border-b border-b-neutral-500">
    <div class="flex w-2/3 ml-auto mr-auto justify-between pt-4 pb-4">
      <div class="flex items-center">
        <h1>Мой Личный Кабинет</h1>
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li v-if="isAuthenticated"><router-link to="/profile">Мой Профиль</router-link></li>
          <li v-if="isAuthenticated"><button @click="logout">Выйти</button></li>
          <li v-else><router-link to="/login">Войти</router-link></li>
        </ul>
      </nav>
    </div>

  </header>
</template>

<style scoped>

</style>
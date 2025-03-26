<script setup lang="ts">
import * as v from 'valibot'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useUserStore} from "~/store/user-store";
definePageMeta({
  middleware: 'auth'
})
const schema = v.object({
  email: v.pipe(v.string(), v.email('Неверная почта')),
  password: v.pipe(v.string(), v.minLength(8, 'Пароль минимум 8 элементов'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
})
const userStore = useUserStore()
const {isAuthenticated, isLoading} = storeToRefs(useUserStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await userStore.loginUser(state.email, state.password)
      .then(() => {
        router.push('/profile')
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
}
</script>

<template>
  <div class="flex min-h-screen w-2/3 ml-auto mr-auto justify-center pt-10 pb-4">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="onSubmit">
      <UFormField label="Email" name="email">
        <UInput v-model="state.email"/>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password"/>
      </UFormField>

      <UButton :loading="isLoading" loading-icon="i-lucide-repeat-2" type="submit">
        Войти
      </UButton>
    </UForm>
  </div>
</template>
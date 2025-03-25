<script setup lang="ts">

import * as v from 'valibot'
import type {FormSubmitEvent} from '@nuxt/ui'
import {useUserStore} from "~/store/user-store";


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
const { isAuthenticated } = storeToRefs(useUserStore()); // make authenticated state reactive with storeToRefs
const router = useRouter();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await userStore.loginUser(state.email, state.password)
  if (isAuthenticated) {
    router.push('/profile');
  }
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

      <UButton type="submit">
        Войти
      </UButton>
    </UForm>
  </div>
</template>
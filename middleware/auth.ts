import {useUserStore} from "~/store/user-store";

export default defineNuxtRouteMiddleware(async (to) => {
    const {isAuthenticated} = storeToRefs(useUserStore());
    const user = useCookie('user');
    if (user.value) {
        isAuthenticated.value = true
    }
    if (user.value && to?.name === 'login') {
        return navigateTo('/');
    }
    if (!user.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
    // userStore.$subscribe((cb)=>console.log(cb))
    // const userObject = computed(()=>userStore.user)
})
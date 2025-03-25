import {useUserStore} from "~/store/user-store";

export default defineNuxtRouteMiddleware(async (to) => {
    const { isAuthenticated } = storeToRefs(useUserStore());
    const user = useCookie('user');
    console.log('user');
    console.log(user);
    console.log("isAuthenticated");
    console.log(isAuthenticated);
    isAuthenticated.value = !!user;
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
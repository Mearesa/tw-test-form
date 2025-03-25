import {defineStore} from 'pinia'
import {AuthService} from '~/utils/AuthService'
// import type {User} from "~/types/user";

export const useUserStore = defineStore('user', {
    state: () => ({
        isAuthenticated: false,
        user: {},
    }),
    getters: {
        getIsAuthenticated: (state) => state.isAuthenticated,
    },
    actions: {
        async loginUser(login: string, password: string) {
            const authServise = new AuthService()
            await authServise.authenticate(login, password)
                .then(user => {
                    const cookie_user = useCookie('user')
                    cookie_user.value = JSON.stringify(user)
                    this.isAuthenticated = true;
                    this.user = user;
                })
                .catch(err => {
                    return err;
                })
        },
        logoutUser() {
            const cookie_user = useCookie('user');
            this.isAuthenticated = false;
            this.user = {}
            cookie_user.value = null;
        },


    },
})
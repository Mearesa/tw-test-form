import userData from '~/shared/users.json';
import type {User} from "~/types/user";

export class AuthService {
    private users: User[] = userData;

    async authenticate(username: string, password: string): Promise<User | Error> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.users.find(
                    (u) =>
                        u.credentials.username === username &&
                        u.credentials.passphrase === password &&
                        u.active
                );
                if (user){
                    resolve(user);

                }else{
                    const err = new Error('Неверный логин или пароль')
                    reject(err)
                }
            }, 1000);
        });
    }
}
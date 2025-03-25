export interface Credentials {
    username: string;
    passphrase: string;
}

export interface User {
    name: string;
    active: boolean;
    credentials: Credentials;
}
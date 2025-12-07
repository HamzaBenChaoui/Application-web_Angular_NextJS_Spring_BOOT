export enum UserRoleEnum {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

export interface User {
    id?: number;
    nom: string;
    email: string;
    password?: string;
    role: UserRoleEnum;
}

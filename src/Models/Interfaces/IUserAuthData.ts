import { IToken } from "./IToken";

export interface IUserAuthData<T> {
    user: T,
    tokens: IToken,
}

export interface IUserInfo {
    id: number | null,
    age: number | null,
    city: string | null,
    gender: string | null,
    name: string | null,
    email: string | null,
    isDeleted: boolean | null,
}
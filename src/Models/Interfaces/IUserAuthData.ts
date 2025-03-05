import { IToken } from "./IToken";

export interface IUserInfo{
    id: number
}

export interface IUserAuthData {
    userData: IUserInfo,
    tokens: IToken,
}
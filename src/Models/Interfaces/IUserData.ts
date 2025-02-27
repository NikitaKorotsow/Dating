import { User } from "../Entities/Users";
import { IToken } from "./IToken";


export interface IUserInfo {
    
}
export interface IUserData {
    user: IUserInfo
    tokens: IToken
}
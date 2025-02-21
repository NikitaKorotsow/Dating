import { User } from "../Entities/Users";
import { IToken } from "./IToken";

export interface IUserData {
    user: User
    tokens: IToken
}
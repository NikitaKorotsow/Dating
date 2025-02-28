import { IResponse } from "../../Models/Interfaces/Responses/IResponse"


export class GeneraterResponse {
    static getResponse<T>(message: string, code: number, result: T): IResponse<T> {
        return {
            message: message,
            code: code,
            result: result,
        }
    }
}
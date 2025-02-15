import { IResponse } from "../../Models/Interfaces/Responses/IResponse"

export const getResponse = <T>(message: string, code: number, result: T | null): IResponse<T> => {
    const response: IResponse<T> = {
        message: message,
        code: code,
        result: result
    }
    return response;
}


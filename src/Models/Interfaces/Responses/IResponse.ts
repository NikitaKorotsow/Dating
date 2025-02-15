export interface IResponse<T> {
    message: string,
    code: number,
    result: null | T,
}
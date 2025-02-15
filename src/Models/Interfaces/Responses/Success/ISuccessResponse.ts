export interface ISuccessResponse<T> {
    message: string,
    code: number,
    result: null | T,
}
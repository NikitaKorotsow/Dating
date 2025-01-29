export interface IErrorResponse<T> {
    message: string;
    code: number;
    result: null | T;
}
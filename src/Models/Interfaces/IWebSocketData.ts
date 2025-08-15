export interface IWebSocketData<T> {
    userId: number,
    event: "notification" | "message",
    data: T
}
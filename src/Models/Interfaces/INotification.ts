export interface INotification {
    type: 'like' | 'message',
    userIdTo: number,
    userIdFrom: number,
    read: boolean,
    createDate: string
}
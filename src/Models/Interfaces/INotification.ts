export interface INotification {
    type: 'like' | 'message' | 'friend_request';
    userId: number;
    data: string;
}
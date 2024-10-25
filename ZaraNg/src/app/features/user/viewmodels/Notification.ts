export interface Notification {
    id: number;
    userId: string;
    message: string;
    isRead: boolean;
    created: Date;
}

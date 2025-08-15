import { User } from "../Entities/Users";

export class NotificationsFilter {
    public to: User | null = null;
    public from: User | null = null;
    public type: string | null = null;
    public createdDate: string | null = null;
    public isDeleted: boolean | null = null;
    public read: boolean | null = null;

    public withTo(id: number): NotificationsFilter {
        this.to = new User();
        this.to.id = id;
        return this;
    }

    public withFrom(id: number): NotificationsFilter {
        this.from = new User();
        this.from.id = id;
        return this;
    }

    public withType(type: string): NotificationsFilter {
        this.type = type;
        return this;
    }

    public withCreatedDate(createdDate: string): NotificationsFilter {
        this.createdDate = createdDate;
        return this;
    }

    public withIsDeleted(isDeleted: boolean): NotificationsFilter {
        this.isDeleted = isDeleted;
        return this;
    }

    public withRead(read: boolean): NotificationsFilter {
        this.read = read;
        return this;
    }
}
import { User } from "../Entities/Users";

export class NotificationsFilter {
    public to: User | null = null;
    public type: string | null = null;
    public message: string | null = null;
    public createdDate: string | null = null;
    public isDeleted: boolean | null = null;

    public withTo(id: number): NotificationsFilter {
        this.to = new User();
        this.to.id = id;
        return this;
    }

    public withType(type: string): NotificationsFilter {
        this.type = type;
        return this;
    }

    public withMessage(message: string): NotificationsFilter {
        this.message = message;
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
}
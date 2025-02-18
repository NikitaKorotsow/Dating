import { User } from "../Entities/Users";

export class MessageFilter {
    public toId: User;
    public fromId: User;
    public content: string;
    public isDeleted: boolean;
    public updatedDate: string;
    public deletedDate: string;

    public withTo(toId: number): MessageFilter {
        this.toId = new User();
        this.toId.id = toId;
        return this;
    }

    public withFrom(fromId: number): MessageFilter {
        this.fromId = new User();
        this.fromId.id = fromId;
        return this;
    }

    public withContent(str: string): MessageFilter {
        this.content = str;
        return this;
    }

    public withIsDeleted(flag: boolean): MessageFilter {
        this.isDeleted = flag;
        return this;
    }

    public withUpdatedDate(date: string): MessageFilter {
        this.deletedDate = date;
        return this;
    }

    public withDeletedDate(date: string): MessageFilter {
        this.deletedDate = date;
        return this;
    }
}
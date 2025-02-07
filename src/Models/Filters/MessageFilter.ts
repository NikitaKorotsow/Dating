import { User } from "../Entities/Users";

export class MessageFilter {
    public toId: User | null = null;
    public fromId: User | null = null;
    public content: string | null = null;
    public isDeleted: boolean | null = null;
    public updatedDate: string | null = null;
    public deletedDate: string | null = null;

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
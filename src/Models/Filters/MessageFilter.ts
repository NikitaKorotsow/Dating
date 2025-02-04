import { User } from "../Entities/Users";

export class MessageFilter {
    public to: User | null = null;
    public from: User | null = null;
    public content: string | null = null;
    public isDeleted: boolean | null = null;
    public updatedDate: string | null = null;
    public deletedDate: string | null = null;

    public withTo(toId: number): MessageFilter {
        this.to = new User();
        this.to.id = toId;
        return this;
    }

    public withFrom(fromId: number): MessageFilter {
        this.from = new User();
        this.from.id = fromId;
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
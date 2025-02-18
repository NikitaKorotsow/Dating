import { User } from "../Entities/Users";

export class LikeFilter {
    public to: User;
    public from: User;
    public deletedDate: string;

    public withTo(toId: number): LikeFilter {
        this.to = new User();
        this.to.id = toId;
        return this;
    }

    public withFrom(fromId: number): LikeFilter {
        this.from = new User();
        this.from.id = fromId;
        return this;
    }

    public withDeletedDate(date: string): LikeFilter {
        this.deletedDate = date;
        return this;
    }
}
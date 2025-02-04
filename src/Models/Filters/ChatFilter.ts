import { User } from "../Entities/Users";

export class ChatFilter {
    public to: User | null = null;
    public from: User | null = null;
    public title: string | null = null;

    public withTo(toId: number): ChatFilter {
        this.to = new User();
        this.to.id = toId;
        return this;
    }

    public withFrom(fromId: number): ChatFilter {
        this.from = new User();
        this.from.id = fromId;
        return this;
    }

    public withTitle(str: string): ChatFilter {
        this.title = str;
        return this;
    }
}
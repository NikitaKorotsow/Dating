import { User } from "../Entities/Users";

export class ChatFilter {
    public toId: User | null = null;
    public fromId: User | null = null;
    public title: string | null = null;

    public withTo(toId: number): ChatFilter {
        this.toId = new User();
        this.toId.id = toId;
        return this;
    }

    public withFrom(fromId: number): ChatFilter {
        this.fromId = new User();
        this.fromId.id = fromId;
        return this;
    }

    public withTitle(str: string): ChatFilter {
        this.title = str;
        return this;
    }
}
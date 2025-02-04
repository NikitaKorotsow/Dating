import { User } from "../Entities/Users";

export class AttachmentFilter {
    public user: User | null = null;
    public path: string | null = null;
    public mimetype: string | null = null;
    public isAvatar: boolean | null = null;

    public withUser(id: number): AttachmentFilter {
        this.user = new User();
        this.user.id = id;
        return this;
    }

    public withPath(str: string): AttachmentFilter {
        this.path = str;
        return this;
    }

    public withMimetype(mime: string): AttachmentFilter {
        this.mimetype = mime;
        return this;
    }

    public withIsAvatar(flag: boolean): AttachmentFilter {
        this.isAvatar = flag;
        return this;
    }
}
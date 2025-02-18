import { User } from "../Entities/Users";

export class AttachmentFilter {
    public user: User;
    public path: string;
    public mimetype: string;
    public isAvatar: boolean;

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
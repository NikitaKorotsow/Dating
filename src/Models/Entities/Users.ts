import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import { Attachment } from './Attachments';
import { Like } from "./Likes";
import { Chat } from "./Chats";
import { Message } from './Messages';

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: true,
        name: 'age'
    })
    age: number | null;

    @Column({
        type: 'text',
        nullable: true,
        name: 'city'
    })
    city: string | null;

    @Column({
        type: 'text',
        nullable: true,
        name: 'gender'
    })
    gender: string | null;

    @Column({
        type: 'boolean',
        nullable: true,
        name: 'is_deleted'
    })
    isDeleted: boolean | null;

    @Column({
        type: 'text',
        nullable: false,
        name: 'login'
    })
    login: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'password'
    })
    password: string;

    @Column({
        type: 'text',
        nullable: true,
        name: 'email'
    })
    email: string | null;

    @Column({
        type: 'text',
        nullable: true,
        name: 'name'
    })
    name: string | null;

    @OneToMany(() => Attachment, attachment => attachment.user)
    attachments: Attachment[];

    @OneToMany(() => Like, (like) => like.to)
    likesTo: Like[];

    @OneToMany(() => Like, like => like.from)
    likesFrom: Like[];

    @OneToMany(() => Chat, chat => chat.toId)
    chatTo: Chat[];

    @OneToMany(() => Chat, chat => chat.fromId)
    chatFrom: Chat[];

    @OneToMany(() => Message, message => message.toId)
    messageTo: Message[];

    @OneToMany(() => Message, message => message.fromId)
    messageFrom: Message[];

}

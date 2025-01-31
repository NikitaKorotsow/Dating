import { ConfigurationService } from "./Services/Configurations/ConfigurationService";
import { DataSource } from "typeorm";
import { User } from "./Models/Entities/Users";
import { Attachment } from "./Models/Entities/Attachments";
import { Like } from "./Models/Entities/Likes";
import { Chat } from "./Models/Entities/Chats";
import { Message } from "./Models/Entities/Messages";
import { AttachmentMessage } from "./Models/Entities/AttachmentsMessage";
import { ChatMessage } from "./Models/Entities/ChatMessage";
import { LikeRepository } from "./Repositories/LikeRepository";
import { AttachmentsRepository } from "./Repositories/AttachmentRepository";
import { AttachmentsMessageRepository } from "./Repositories/AttachmentsMessageRepository";
import { ChatMessageRepository } from "./Repositories/ChatMessageRepository";
import { ChatRepository } from "./Repositories/ChatRepository";
import { MessageRepository } from "./Repositories/MessageRepository";
import { UserRepository } from "./Repositories/UserRepository";

export const configurationService = new ConfigurationService();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'Dating',
    synchronize: true,
    logging: false,
    entities: [
        User,
        Attachment,
        Like,
        Chat,
        Message,
        AttachmentMessage,
        ChatMessage,
    ],
    migrations: [],
    subscribers: [],
});



export const createRepositories = () => {
    return {
        likeRepository: new LikeRepository(AppDataSource.getRepository(Like)),
        attachmentRepository: new AttachmentsRepository(AppDataSource.getRepository(Attachment)),
        attachmentsMessageRepository: new AttachmentsMessageRepository(AppDataSource.getRepository(AttachmentMessage)),
        chatMessageRepository: new  ChatMessageRepository(AppDataSource.getRepository(ChatMessage)),
        messageRepository: new  MessageRepository(AppDataSource.getRepository(Message)),
        userRepository: new UserRepository(AppDataSource.getRepository(User)),
        chatRepository: new ChatRepository(AppDataSource.getRepository(Chat))
    }
}

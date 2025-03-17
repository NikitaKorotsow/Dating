import { DataSource } from "typeorm";
import { ConfigurationService } from "./Services/Configurations/ConfigurationService";
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
    host: configurationService.DATABASE_HOST,
    port: configurationService.DATABASE_PORT,
    username: configurationService.DATABASE_USER,
    password: configurationService.DATABASE_PASSWORD,
    database: configurationService.DATABASE_NAME,
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

AppDataSource.initialize()
    .then(async (data: DataSource) => {
        console.log('Data Source has been initialized!', data);
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });

export const likeRepository = new LikeRepository(AppDataSource.getRepository(Like));
export const attachmentRepository = new AttachmentsRepository(AppDataSource.getRepository(Attachment));
export const attachmentsMessageRepository = new AttachmentsMessageRepository(AppDataSource.getRepository(AttachmentMessage));
export const chatMessageRepository = new ChatMessageRepository(AppDataSource.getRepository(ChatMessage));
export const messageRepository = new MessageRepository(AppDataSource.getRepository(Message));
export const userRepository = new UserRepository(AppDataSource.getRepository(User));
export const chatRepository = new ChatRepository(AppDataSource.getRepository(Chat));
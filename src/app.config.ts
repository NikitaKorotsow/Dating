import { DataSource } from "typeorm";
import { ConfigurationService } from "./Services/Configurations/ConfigurationService";
import { User } from "./Models/Entities/Users";
import { Attachment } from "./Models/Entities/Attachments";
import { Like } from "./Models/Entities/Likes";
import { Chat } from "./Models/Entities/Chats";
import { Message } from "./Models/Entities/Messages";
import { AttachmentMessage } from "./Models/Entities/AttachmentsMessage";
import { ChatMessage } from "./Models/Entities/ChatMessage";
import { Notifications } from "./Models/Entities/Notifications";
import { NotificationRepository } from "./Repositories/NotificationRepository";
import { LikeRepository } from "./Repositories/LikeRepository";
import { AttachmentsRepository } from "./Repositories/AttachmentRepository";
import { AttachmentsMessageRepository } from "./Repositories/AttachmentsMessageRepository";
import { ChatMessageRepository } from "./Repositories/ChatMessageRepository";
import { ChatRepository } from "./Repositories/ChatRepository";
import { MessageRepository } from "./Repositories/MessageRepository";
import { UserRepository } from "./Repositories/UserRepository";
import { AuthController } from "./Controllers/AuthController";
import { AuthService } from "./Services/Auth/AuthService";
import { TokenService } from "./Services/Auth/TokenService";
import { RedisService } from "./Services/Auth/RedisService";
import { UserController } from "./Controllers/UserController";
import { UserService } from "./Services/User/UserService";
import { FileService } from "./Services/File/FileService";
import { FileStorage } from "./Services/File/FileStorage";
import { LikeController } from "./Controllers/LikeController";
import { LikeService } from "./Services/Like/LikeService";
import { NotificationService } from "./Services/Notifications/NotificationService";
import { wsServer } from "./httpService";
import { WebSocketService } from "./Services/Websocket/WebsocketService";
import { ChatService } from "./Services/Chat/ChatService";
import { ChatController } from "./Controllers/ChatController";

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
        Notifications,
    ],
    migrations: [],
    subscribers: [],
});

//         ======Repositoties======
export const likeRepository = new LikeRepository(AppDataSource.getRepository(Like));
export const attachmentRepository = new AttachmentsRepository(AppDataSource.getRepository(Attachment));
export const attachmentsMessageRepository = new AttachmentsMessageRepository(AppDataSource.getRepository(AttachmentMessage));
export const chatMessageRepository = new ChatMessageRepository(AppDataSource.getRepository(ChatMessage));
export const messageRepository = new MessageRepository(AppDataSource.getRepository(Message));
export const userRepository = new UserRepository(AppDataSource.getRepository(User));
export const chatRepository = new ChatRepository(AppDataSource.getRepository(Chat));
export const notificationRepository = new NotificationRepository(AppDataSource.getRepository(Notifications));

//         ======FileSystem======
export const fileService = new FileService(configurationService);
export const fileStorage = new FileStorage(fileService, attachmentRepository);

//         ======Services======
export const webSocketService = new WebSocketService();
export const notificationService = new NotificationService(notificationRepository, webSocketService);
export const chatService = new ChatService(chatRepository, messageRepository, chatMessageRepository, attachmentsMessageRepository, notificationService, webSocketService);
export const redisService = new RedisService(configurationService);
export const tokenService = new TokenService(configurationService, redisService);
export const authService = new AuthService(configurationService, userRepository, tokenService, fileStorage);
export const userService = new UserService(configurationService, userRepository, fileStorage);
export const likeService = new LikeService(configurationService, likeRepository, fileStorage, notificationService);

//         ======Controllers======
export const authController = new AuthController(authService);
export const userController = new UserController(userService);
export const likeController = new LikeController(likeService);
export const chatController = new ChatController(chatService);

AppDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!');
        webSocketService.setupConnection(wsServer, notificationService);
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });

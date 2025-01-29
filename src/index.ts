import { DataSource } from "typeorm";
import { User } from "./Models/Entities/Users";
import { Attachments } from "./Models/Entities/Attachments";
import { Like } from "./Models/Entities/Likes";
import { Chat } from "./Models/Entities/Chats";
import { Message } from "./Models/Entities/Messages";
import { AttachmentsMessage } from "./Models/Entities/AttachmentsMessage";
import { ChatMessage } from "./Models/Entities/ChatMessage";
import { LikeRepository } from "./Repositories/LikeRepository";


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
        Attachments,
        Like,
        Chat,
        Message,
        AttachmentsMessage,
        ChatMessage,
    ],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(async (data: DataSource) => {
        console.log('Data Source has been initialized!');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    });

const likeRepository = new LikeRepository(AppDataSource.getRepository(Like));
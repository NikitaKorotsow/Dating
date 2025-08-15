import { Request, Response } from "express";
import { ChatService } from "../Services/Chat/ChatService";
import Controller from "./Controller";

export class ChatController extends Controller {
    private readonly _chatService: ChatService;

    constructor(chatService: ChatService) {
        super();
        this._chatService = chatService;
    }

    public getUserChats = async (req: Request, res: Response) => {
        const userId = req.body.userId as number;
        const answer = await this._chatService.getUserChats(userId);
        await ChatController.send(res, answer, answer.code);
    };

    public sendMessage = async (req: Request, res: Response) => {
        const from = req.body.from as number;
        const to = req.body.to as number;
        const text = req.body.text as string;
        const attachmentIds = req.body.attachmentIds;

        const answer = await this._chatService.sendMessage(from, to, text, attachmentIds);
        await ChatController.send(res, answer, answer.code);
    };

    public deleteMessage = async (req: Request, res: Response) => {
        const messageId = req.body.messageId as number;
        const answer = await this._chatService.deleteMessage(messageId);
        await ChatController.send(res, answer, answer.code);
    };

}
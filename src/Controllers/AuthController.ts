import { Request, Response } from "express";
import { authService } from "../app.config";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { IUserAuthData, IUserInfo } from "../Models/Interfaces/IUserAuthData";
import Controller from "./Controller";

export class AuthController extends Controller {
    public async register(req: Request, res: Response) {
        const login: string = req.body.login as string;
        const password: string = req.body.password as string;
        const answer: IResponse<IUserAuthData<number> | null> = await authService.register(login, password);
        await AuthController.send<IResponse<IUserAuthData<number> | null>>(res, answer, answer.code);
        return;
    }

    public async login(req: Request, res: Response) {
        const login: string = req.body.login as string;
        const password: string = req.body.password as string;
        const answer: IResponse<IUserAuthData<IUserInfo> | null> = await authService.login(login, password);
        await AuthController.send<IResponse<IUserAuthData<IUserInfo> | null>>(res, answer, answer.code);
        return;
    }

    public async logout(req: Request, res: Response) {
        const id: number = req.body.id as number;
        const answer = await authService.logout(id);
        await AuthController.send<IResponse<string | null>>(res, answer, answer.code);
        return;
    }
}
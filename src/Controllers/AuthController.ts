import { Request, Response } from "express";
import { authService } from "../app.config";
import Controller from "./Controller";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { IUserAuthData } from "../Models/Interfaces/IUserAuthData";

export class AuthController {
    public async register(req: Request, res: Response) {
        const login: string = req.body.login as string;
        const password: string = req.body.password as string;
        const answer: IResponse<IUserAuthData<number> | null> = await authService.register(login, password);
        await Controller.send<IResponse<IUserAuthData<number> | null>>(res, answer, answer.code);
        return;
    }

    private loginUser(req: Request) {
        return authService.login(req.params.login, req.params.password);

    }

    private logoutUser(req: Request) {
        return authService.logout(Number(req.params.id));
    }
}
import { Request, Response } from "express";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { IUserAuthData, IUserInfo } from "../Models/Interfaces/IUserAuthData";
import { AuthService } from "../Services/Auth/AuthService";
import Controller from "./Controller";

export class AuthController extends Controller {

    private readonly _authService: AuthService;

    constructor(authService: AuthService) {
        super();
        this._authService = authService;
    }

    public register = async (req: Request, res: Response) => {
        const login: string = req.body.login as string;
        const password: string = req.body.password as string;
        const answer: IResponse<IUserAuthData<number> | null> = await this._authService.register(login, password);
        await AuthController.send<IResponse<IUserAuthData<number> | null>>(res, answer, answer.code);
    };

    public login = async (req: Request, res: Response) => {
        const login: string = req.body.login as string;
        const password: string = req.body.password as string;

        const answer: IResponse<IUserAuthData<IUserInfo> | null> = await this._authService.login(login, password);
        await AuthController.send<IResponse<IUserAuthData<IUserInfo> | null>>(res, answer, answer.code);
    };

    public logout = async (req: Request, res: Response) => {
        const id: number = req.body.id as number;
        const answer = await this._authService.logout(id);
        await AuthController.send<IResponse<string | null>>(res, answer, answer.code);
    };
}

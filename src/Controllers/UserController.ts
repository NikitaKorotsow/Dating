import { Request, Response } from "express";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { IUserInfo } from "../Models/Interfaces/IUserAuthData";
import { UserFilter } from "../Models/Filters/UserFilter";
import { UserService } from "../Services/User/UserService";
import Controller from "./Controller";

export class UserController extends Controller {

    private readonly _userService: UserService;

    constructor(userService: UserService) {
        super();
        this._userService = userService;
    }

    public getProfile = async (req: Request, res: Response) => {
        const id: number = JSON.parse(req.params.id as string);
        const answer: IResponse<IUserInfo | null> = await this._userService.getById(id);
        await UserController.send<IResponse<IUserInfo | null>>(res, answer, answer.code);
        return;
    };

    public updateProfile = async (req: Request, res: Response) => {
        const id: number = req.body.id as number;
        const userData = new UserFilter()
            .withAge(Number(req.body.age))
            .withCity(req.body.city)
            .withGender(req.body.gender)
            .withEmail(req.body.email)
            .withName(req.body.name);
        const answer: IResponse<boolean | null> = await this._userService.update(
            id,
            userData,
            req.file ? req.file : null,
        );
        console.log(answer);
        await UserController.send<IResponse<boolean | null>>(res, answer, answer.code);
        return;

    };

    public deleteProfile = async (req: Request, res: Response) => {
        const id: number = req.body.id as number;
        const isDeleted: boolean = JSON.parse(req.body.isDeleted as string);
        const answer: IResponse<boolean | null> = await this._userService.delete(id, isDeleted);
        await UserController.send<IResponse<boolean | null>>(res, answer, answer.code);
        return;
    };

    public deleteAvatar = async (req: Request, res: Response) => {
        const avatarId: number = req.body.avatarId as number;
        const answer: IResponse<boolean | null> = await this._userService.deleteAvatar(avatarId);
        await UserController.send<IResponse<boolean | null>>(res, answer, answer.code);
        return;
    };
}
import { Request, Response } from "express";
import { userService } from "../app.config";
import { IResponse } from "../Models/Interfaces/Responses/IResponse";
import { IUserInfo } from "../Models/Interfaces/IUserAuthData";
import { UserFilter } from "../Models/Filters/UserFilter";
import Controller from "./Controller";

export class UserController extends Controller {

    public async getProfile(req: Request, res: Response) {
        const id: number = req.body.id as number;
        const answer: IResponse<IUserInfo | null> = await userService.getById(id);
        await UserController.send<IResponse<IUserInfo | null>>(res, answer, answer.code);
        return;
    }

    public async updateProfile(req: Request, res: Response) {
        const id: number = req.body.id as number;
        const userData = new UserFilter();
        userData.age = req.body.age as number;
        userData.city = req.body.city as string;
        userData.email = req.body.email as string;
        userData.gender = req.body.gender as string;
        userData.name = req.body.name as string;
        const answer: IResponse<IUserInfo | null> = await userService.update(id, userData);
        await UserController.send<IResponse<IUserInfo | null>>(res, answer, answer.code);
        return;
    }

    public async deleteProfile(req: Request, res: Response) {
        const id: number = req.body.id as number;
        const isDeleted: number = req.body.isDeleted as number;
        const answer: IResponse<IUserInfo | null> = await userService.delete(id, isDeleted);
        await UserController.send<IResponse<IUserInfo | null>>(res, answer, answer.code);
        return;
    }
}
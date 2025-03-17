import { Request } from "express";
import { IRoute } from "../Models/Interfaces/IRoute";
import { UserService } from "../Services/UserService";
import Controller from "./Controller";

export class UserController extends Controller {
    private readonly _userService: UserService;

    constructor(userService: UserService) {
        super();
        this._userService = userService;
    }

    public routes: IRoute[] = [
        {
            path: '/profile',
            method: "get",
            handler: this.getProfile,
        },
        {
            path: '/profile',
            method: 'post',
            handler: this.updateProfile,
        },
        {
            path: '/profile',
            method: 'delete',
            handler: this.deleteProfile,
        },
    ];

    public getProfile(req: Request) {
        return this._userService.getById(Number(req.params.id));
    }

    public updateProfile(req: Request) {
        return this._userService.update(Number(req.params.id), Number(req.params.age), req.params.city, req.params.gender, Number(req.params.isDeleted), req.params.email, req.params.name);
    }

    public deleteProfile(req: Request) {
        return this._userService.delete(Number(req.params.id), Number(req.params.isDeleted));
    }
}
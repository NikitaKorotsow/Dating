import { Request } from "express";
import { IRoute } from "../Models/Interfaces/IRoute";
import { AuthService } from "../Services/AuthService";
import Controller from "./Controller";

export class AuthController extends Controller {

    private readonly _authSrvice: AuthService;

    constructor(authService: AuthService) {
        super();
        this._authSrvice = authService;
    }

    public routes: IRoute[] = [
        {
            path: '/register',
            method: 'post',
            handler: this.registerUser,
        },

        {
            path: '/login',
            method: 'post',
            handler: this.loginUser,
        },
        {
            path: '/logout',
            method: 'post',
            handler: this.logoutUser,
        }
    ];

    private registerUser(req: Request) {
        return this._authSrvice.register(req.params.login, req.params.password);
    }

    private loginUser(req: Request) {
        return this._authSrvice.login(req.params.login, req.params.password);

    }

    private logoutUser(req: Request) {
        return this._authSrvice.logout(Number(req.params.id));
    }
}
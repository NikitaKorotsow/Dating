import { Application } from "express";
import { IRoute } from "../Models/Interfaces/IRoute";

abstract class Controller {
    public abstract routes: IRoute[]

    public register(app: Application): void {
        for (const route of this.routes) {
            app[route.method](route.path, route.handler);
        }
    }
}

export default Controller;
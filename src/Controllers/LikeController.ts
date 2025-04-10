import { Request, Response } from "express";
import { LikeFilter } from "../Models/Filters/LikeFilter";
import { likeService } from "../app.config";
import Controller from "./Controller";

export class LikeController extends Controller {

    public async createLike(req: Request, res: Response) {
        const to: number = JSON.parse(req.body.to as string);
        const from: number = JSON.parse(req.body.from as string);
        const like = new LikeFilter()
            .withTo(to)
            .withFrom(from);
        const answer = await likeService.create(like);
        await LikeController.send(res, answer, answer.code);
    }

    public async deleteLike(req: Request, res: Response) {
        const from = JSON.parse(req.body.from);
        const to = JSON.parse(req.body.to);
        const answer = await likeService.delete(from, to);
        await LikeController.send(res, answer, answer.code);
    }

    public async getLikesList(req: Request, res: Response) {
        const to = JSON.parse(req.body.to);
        const answer = await likeService.checkLikes(to);
        await LikeController.send(res, answer, answer.code);
    }

}
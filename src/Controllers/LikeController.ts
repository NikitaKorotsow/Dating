import { Request, Response } from "express";
import { LikeFilter } from "../Models/Filters/LikeFilter";
import { likeService } from "../app.config";
import Controller from "./Controller";

export class LikeController extends Controller {

    public async createLike(req: Request, res: Response) {
        const to: number = Number(req.body.to);
        const from: number = Number(req.body.from);
        const like = new LikeFilter()
            .withTo(to)
            .withFrom(from);
        const answer = await likeService.create(like);
        await LikeController.send(res, answer, answer.code);
    }

    public async deleteLike(req: Request, res: Response) {
        const from: number = Number(req.body.from);
        const to: number = Number(req.body.to);
        const answer = await likeService.delete(from, to);
        await LikeController.send(res, answer, answer.code);
    }

    public async getLikesListTo(req: Request, res: Response) {
        const to: number = Number(req.body.to);
        const answer = await likeService.getLikesTo(to);
        await LikeController.send(res, answer, answer.code);
    }

    public async getLikesListFrom(req: Request, res: Response) {
        const from: number = Number(req.body.from);
        const answer = await likeService.getLikesFrom(from);
        await LikeController.send(res, answer, answer.code);
    }

}
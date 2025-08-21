import { Request, Response } from "express";
import { LikeFilter } from "../Models/Filters/LikeFilter";
import { LikeService } from "../Services/Like/LikeService";
import Controller from "./Controller";

export class LikeController extends Controller {

    private readonly _likeService: LikeService;

    constructor(likeService: LikeService) {
        super();
        this._likeService = likeService;
    }

    public createLike = async (req: Request, res: Response) => {
        const to: number = Number(req.body.to);
        const from: number = Number(req.body.from);
        const like = new LikeFilter()
            .withTo(to)
            .withFrom(from);
        const answer = await this._likeService.create(like);
        await LikeController.send(res, answer, answer.code);
    };

    public deleteLike = async (req: Request, res: Response) => {
        const from: number = Number(req.body.from);
        const to: number = Number(req.body.to);
        const answer = await this._likeService.delete(from, to);
        await LikeController.send(res, answer, answer.code);
    };

    public getLikesListTo = async (req: Request, res: Response) => {
        const to: number = Number(req.body.to);
        const answer = await this._likeService.getLikesTo(to);
        await LikeController.send(res, answer, answer.code);
    };

    public getLikesListFrom = async (req: Request, res: Response) => {
        const from: number = Number(req.body.from);
        const answer = await this._likeService.getLikesFrom(from);
        await LikeController.send(res, answer, answer.code);
    };

}
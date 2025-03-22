import { Response } from 'express';


abstract class Controller {
    static async send<T>(res: Response, data: T, code: number) {
        res.status(code).json(data);
    }
}

export default Controller;
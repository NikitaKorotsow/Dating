import { Request, Response, NextFunction, RequestHandler } from "express";
import { TokenService } from "../Services/Auth/TokenService";

export const createJWTMiddleware = (tokenService: TokenService): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Authorization header missing" });
            return;
        }

        const accessToken = authHeader.split(" ")[1];

        const userDataFromAccessToken = tokenService.checkAccessToken(accessToken);
        console.log(userDataFromAccessToken);

        if (userDataFromAccessToken) {
            return next();
        }

        const decodedToken = tokenService.decodeToken(accessToken);
        console.log(decodedToken);
        if (!decodedToken || typeof decodedToken !== "object" || !("id" in decodedToken)) {
            res.status(401).json({ message: "Invalid token structure" });
            return;
        }

        const userId = decodedToken.id;
        console.log(userId);
        const refreshToken = await tokenService.getRefreshToken(userId);
        if (!refreshToken) {
            res.status(401).json({ message: "Refresh token not found" });
            return;
        }

        const userDataFromRefreshToken = tokenService.checkRefreshToken(refreshToken);
        if (!userDataFromRefreshToken) {
            res.status(401).json({ message: "Invalid refresh token" });
            return;
        }

        const newTokens = tokenService.generateTokens(userId.toString());
        await tokenService.saveRefreshToken(userId, newTokens.refreshToken);

        next();
    };
};
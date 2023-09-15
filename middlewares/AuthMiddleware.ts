import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorize = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		return res.status(400).json({
			status: "failed",
			message: "Not Authorize",
		});
	}

	const secretKey = process.env.SECRET_KEY || "rahasia";
	const token = req.headers.authorization.split(" ")[1];

	try {
		const credential = jwt.verify(token, secretKey);
		if (credential) {
			req.app.locals.credential = credential;

			return next();
		}
	} catch (error) {
		return res.status(400).json({
			status: "failed",
			message: "Token Error",
		});
	}
};

const AuthMiddleware = {
	authorize,
};

export default AuthMiddleware;

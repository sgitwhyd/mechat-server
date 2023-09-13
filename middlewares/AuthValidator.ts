import { NextFunction, Response, Request } from "express";
import { check, validationResult } from "express-validator";

const register = [
	check("name").notEmpty(),
	check("email").notEmpty(),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be 6 character"),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).send({
				errors: errors.array(),
			});
		}

		return next();
	},
];

const login = [
	check("email").notEmpty(),
	check("password").notEmpty(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(422).send({
				errors: errors.array(),
			});
		}

		return next();
	},
];

const AuthValidate = {
	register,
	login,
};

export default AuthValidate;

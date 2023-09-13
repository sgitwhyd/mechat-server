import { NextFunction, Response, Request } from "express";
import { check, validationResult } from "express-validator";

const create = [
	check("text").notEmpty().isString(),
	check("room_id").notEmpty(),
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

const index = [
	check("room_id").notEmpty(),
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

const ChatValidate = {
	create,
	index,
};

export default ChatValidate;

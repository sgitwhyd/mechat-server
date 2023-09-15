import { Request, Response } from "express";
import User from "../models/user.model";
import Authentication from "../utils/Authentication";

class AuthController {
	register = async (req: Request, res: Response) => {
		const { name, email, password } = req.body;
		const hashPassword = await Authentication.passwordHash(password);

		const user = await User.findOne({
			email,
		});

		if (!user) {
			const newUser = new User({
				name,
				email,
				password: hashPassword,
			});

			await newUser.save();

			return res.status(200).send({
				status: "success",
				message: "user has been successfully registered",
			});
		} else {
			return res.status(400).json({
				message: "User email already exist!",
			});
		}
	};
	login = async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const user = await User.findOne({
			email,
		});

		if (user) {
			const isMatchPassword = await Authentication.comparePassword(
				password,
				user.password
			);

			if (isMatchPassword) {
				const token = Authentication.generateToken({
					id: user.id,
				});

				return res.status(200).send({
					status: "succss",
					message: "User has been successfully login",
					token,
				});
			}
		} else {
			return res.status(404).send({
				status: "failed",
				message: "User Email not found! or Wrong password",
			});
		}
	};
	profile = async (req: Request, res: Response) => {
		const credential = req.app.locals.credential;

		const user = await User.findOne({
			_id: credential.id,
		});

		return res.status(200).json({
			status: "success",
			data: user,
		});
	};
}

export default new AuthController();

import { Request, Response } from "express";
import Room from "../models/RoomModel";

class RoomController {
	index = async (req: Request, res: Response) => {
		const rooms = await Room.find();
		return res.status(200).json({
			status: "success",
			message: "Room showed",
			data: rooms,
		});
	};
	create = async (req: Request, res: Response) => {
		const { name } = req.body;

		const generateCode = Math.floor(Math.random() * 9999);
		const room = await Room.findOne({
			code: generateCode,
		});

		if (!room) {
			const credential = req.app.locals.credential;

			const newRoom = new Room({
				name,
				code: generateCode,
				user_id: credential.id,
			});

			const room = await newRoom.save();

			return res.status(200).json({
				status: "success",
				message: "Room Created",
				data: room,
			});
		} else {
			return res.status(200).json({
				status: "success",
				message: "Room Alredy Exist",
			});
		}
	};
}

export default new RoomController();

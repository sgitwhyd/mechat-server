import { Request, Response } from "express";
import Room from "../models/RoomModel";
import pusher from "../lib/pusher";

class RoomController {
	index = async (req: Request, res: Response) => {
		const rooms = await Room.find().populate({
			path: "user_id",
			select: "-password",
		});
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
			await pusher.trigger("rooms", "new_room", room);
			return res.status(200).json({
				status: "success",
				message: "Room Created",
				result: room,
			});
		} else {
			return res.status(200).json({
				status: "success",
				message: "Room Alredy Exist",
			});
		}
	};
	detail = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const room = await Room.findById(id).populate("user_id");

			return res.status(200).json({
				status: true,
				message: "Room Found",
				data: room,
			});
		} catch (error) {
			return res.status(404).json({
				status: false,
				message: "Room not found!!",
			});
		}
	};
}

export default new RoomController();

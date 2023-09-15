import { Request, Response } from "express";
import Chat from "../models/ChatModel";

class ChatController {
	index = async (req: Request, res: Response) => {
		const { room_id } = req.params;

		try {
			const chats = await Chat.find({
				roomId: room_id,
			}).populate("user_id");

			if (chats) {
				return res.status(200).json({
					status: "success",
					message: "Chat showed",
					data: chats,
				});
			} else {
				return res.status(404).json({
					status: "failed",
					message: "Chat Not Found",
				});
			}
		} catch (error) {
			return res.status(404).json({
				status: "failed",
				message: "Room Not Found",
			});
		}
	};
	create = async (req: Request, res: Response) => {
		const { room_id, text } = req.body;
		const credential = req.app.locals.credential;

		const newChat = new Chat({
			text,
			roomId: room_id,
			user_id: credential.id,
		});

		const response = await newChat.save();

		return res.status(200).json({
			status: "success",
			message: "Chat Created",
			data: response,
		});
	};
}

export default new ChatController();

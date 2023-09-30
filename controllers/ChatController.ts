import { Request, Response } from "express";
import Chat from "../models/ChatModel";
import pusher from "../lib/pusher";

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
					results: chats,
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

		await newChat.save().then(async (result) => {
			await Chat.findOne({ _id: result._id })
				.populate({
					path: "user_id",
					select: "-password",
				})
				.then(async (chat) => {
					await pusher.trigger(room_id, "new_message", chat);
					return res.status(200).json({
						status: "success",
						message: "Chat Created",
						data: result,
					});
				});
		});
	};
}

export default new ChatController();

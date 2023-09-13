import { Schema, model } from "mongoose";

const chatSchema = new Schema(
	{
		text: {
			type: String,
			required: true,
		},
		roomId: {
			type: Schema.Types.ObjectId,
			ref: "Room",
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Chat = model("Chat", chatSchema);
export default Chat;

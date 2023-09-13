import { Schema, model } from "mongoose";

const RoomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Room = model("Room", RoomSchema);
export default Room;

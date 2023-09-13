import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model("User", userSchema);
export default UserModel;

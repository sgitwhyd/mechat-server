import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config as dotenv } from "dotenv";

// middleware
import AuthMiddleware from "./middlewares/AuthMiddleware";

// routes
import AuthRoute from "./routes/AuthRoute";
import RoomRoute from "./routes/RoomRoute";
import ChatRoute from "./routes/ChatRoute";

// model
import Chat from "./models/ChatModel";
import Room from "./models/RoomModel";

// utils
import {
	addUser,
	getUser,
	removeUser,
	checkOnlineUserInRoom,
	users,
} from "./utils/Socket";
class App {
	public app: Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		dotenv();
	}

	private config(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	protected routes(): void {
		this.app.route("/").get((req: Request, res: Response) => {
			res.send("Build Chat Server with typescript");
		});
		this.app.use("/api/v1/auth", AuthRoute);
		this.app.use("/api/v1/room", AuthMiddleware.authorize, RoomRoute);
		this.app.use("/api/v1/chat", AuthMiddleware.authorize, ChatRoute);
	}
}

const app = new App().app;
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", (socket: any) => {
	console.log("connected " + socket.id);

	socket.on("join", ({ user_id, room_id }: any) => {
		const { error, users } = addUser({
			socket_id: socket.id,
			room_id,
			user_id,
		});

		if (error) {
			console.log(error);
		}

		// check jumlah user berdasarkan rooom id
		const userInRoom = checkOnlineUserInRoom(room_id);
		// emit result
		socket.join(room_id);
		io.in(room_id).emit("joined", userInRoom.length);
	});

	socket.on("leave-room", (user_id: any, room_id: string) => {
		removeUser(user_id);
		const userInRoom = checkOnlineUserInRoom(room_id);
		io.in(room_id).emit("joined", userInRoom.length);
	});

	socket.on("disconnect", (user_id: string) => {
		removeUser(user_id);
		io.emit("joined", users.length);
		console.log(socket.id + "disconnected");
	});

	socket.on("get-room-data", () => {
		Room.find().then((room: any) => {
			io.emit("room-data", room);
		});
	});

	socket.on(
		"store-room",
		({ name, user_id }: { name: string; user_id: string }) => {
			const generateCode = Math.floor(Math.random() * 9999);

			const newRoom = new Room({
				name,
				code: generateCode,
				user_id,
			});

			newRoom
				.save()
				.then((result) => {
					io.emit("room", result);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	);

	socket.on("get-chats-history", ({ room_id }: { room_id: string }) => {
		Chat.find({
			roomId: room_id,
		})
			.populate("user_id")
			.then((result) => {
				io.in(room_id).emit("get-chats", result);
			});
	});

	socket.on(
		"store-chat",
		({
			room_id,
			text,
			callback,
		}: {
			room_id: string;
			text: string;
			callback?: () => void;
		}) => {
			const user = getUser(socket.id);

			if (user) {
				console.log(user);
				const newChat = new Chat({
					roomId: room_id,
					user_id: user.user_id,
					text,
				});

				newChat
					.save()
					.then((response) => {
						Chat.findById(response._id)
							.populate("user_id")
							.then((result) => {
								console.log(result);

								io.in(room_id).emit("chat", result);
								if (callback) {
									callback();
								}
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	);
});

mongoose
	.connect(`${process.env.MONGODB_URL}`)
	.then(() => {
		console.log("Connection to db success");
		// server start
		http.listen(process.env.PORT, () => {
			console.log(`server running on http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

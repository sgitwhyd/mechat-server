import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config as dotenv } from "dotenv";

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
	}
}

const app = new App().app;

mongoose
	.connect(`${process.env.MONGODB_URL}`)
	.then(() => {
		console.log("Connection to db success");
		// server start
		app.listen(process.env.PORT, () => {
			console.log(`server running on http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});

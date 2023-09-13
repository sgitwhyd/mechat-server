import { Router } from "express";

abstract class BaseRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	abstract routes(): void;
}

export default BaseRouter;

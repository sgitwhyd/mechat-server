import BaseRouter from "./BaseRoute";

// middleware
import AuthValidate from "../middlewares/AuthValidator";

// controllers
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

class AuthRoute extends BaseRouter {
	routes(): void {
		this.router.post(
			"/register",
			AuthValidate.register,
			AuthController.register
		);
		this.router.post("/login", AuthValidate.login, AuthController.login);
		this.router.get(
			"/profile",
			AuthMiddleware.authorize,
			AuthController.profile
		);
	}
}

export default new AuthRoute().router;

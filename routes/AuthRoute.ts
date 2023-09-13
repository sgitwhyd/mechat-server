import BaseRouter from "./BaseRoute";

// middleware
import AuthValidate from "../middlewares/AuthValidator";

// controllers
import AuthController from "../controllers/AuthController";

class AuthRoute extends BaseRouter {
	routes(): void {
		this.router.post(
			"/register",
			AuthValidate.register,
			AuthController.register
		);
		this.router.post("/login", AuthValidate.login, AuthController.login);
	}
}

export default new AuthRoute().router;

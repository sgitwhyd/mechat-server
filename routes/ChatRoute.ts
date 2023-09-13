import BaseRouter from "./BaseRoute";
import ChatController from "../controllers/ChatController";
import ChatValidate from "../middlewares/ChatValidator";

class ChatRoute extends BaseRouter {
	routes(): void {
		this.router.get("/", ChatValidate.index, ChatController.index);
		this.router.post("/", ChatValidate.create, ChatController.create);
	}
}

export default new ChatRoute().router;

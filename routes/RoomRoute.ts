import BaseRouter from "./BaseRoute";
import RoomController from "../controllers/RoomController";
import RoomValidate from "../middlewares/RoomValidator";

class RoomRoute extends BaseRouter {
	routes(): void {
		this.router.get("/", RoomController.index);
		this.router.post("/", RoomValidate.create, RoomController.create);
		this.router.get("/:id", RoomController.detail);
	}
}

export default new RoomRoute().router;

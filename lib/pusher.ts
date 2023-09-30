import Pusher from "pusher";
import { config as dotenv } from "dotenv";

dotenv();

const pusher = new Pusher({
	appId: `${process.env.PUSHER_APPID}`,
	key: `${process.env.PUSHER_KEY}`,
	secret: `${process.env.PUSHER_SECRET}`,
	cluster: `${process.env.PUSHER_CLUSTER}`,
});

export default pusher;

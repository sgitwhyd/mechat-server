export let users: any[] = [];

const addUser = ({ socket_id, room_id, user_id }: any) => {
	const isExist = users.find(
		(user) => user.user_id === user_id && user.socket_id === socket_id
	);
	if (isExist) {
		return {
			error: "User already in room",
		};
	}

	const user = {
		socket_id,
		room_id,
		user_id,
	};

	users.push(user);
	return {
		users,
	};
};

const removeUser = (user_id: any) => {
	users = users.filter((user) => user.user_id !== user_id);
	return users;
};

const getUser = (socket_id: string) => {
	const user = users.find((user) => user.socket_id === socket_id);
	return user;
};

const checkOnlineUserInRoom = (room_id: string) => {
	const userInRoom = users.filter((user) => user.room_id === room_id);

	return userInRoom;
};

export { addUser, removeUser, getUser, checkOnlineUserInRoom };

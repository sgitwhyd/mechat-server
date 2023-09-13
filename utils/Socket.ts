let users: any[] = [];

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

const removeUser = (socket_id: any) => {
	users = users.filter((user) => user.socket_id !== socket_id);
	return users;
};

const getUser = (socket_id: string) => {
	const user = users.find((user) => user.socket_id === socket_id);
	return user;
};

export { addUser, removeUser, getUser };

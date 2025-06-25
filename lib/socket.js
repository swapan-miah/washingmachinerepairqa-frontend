import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
			transports: ["websocket"],
			reconnection: true,
			autoConnect: false,
		});
	}
	return socket;
};

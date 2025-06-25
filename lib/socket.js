// lib/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
	if (!socket) {
		socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
			transports: ["websocket"],
			autoConnect: false,
			reconnection: true,
		});

		socket.on("connect", () => {
			console.log("✅ Socket connected:", socket.id);
		});

		socket.on("disconnect", () => {
			console.log("🔴 Socket disconnected");
		});
	}

	return socket;
};

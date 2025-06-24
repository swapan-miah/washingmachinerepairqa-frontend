"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

let socket = null;

export default function LiveDataListener({ eventName }) {
	const router = useRouter();

	useEffect(() => {
		if (!socket) {
			socket = io(process.env.BASE_URL);
		}

		function handleUpdate() {
			// console.log(`Received event: ${eventName}`);
			router.refresh();
		}

		socket.on(eventName, handleUpdate);

		return () => {
			socket.off(eventName, handleUpdate);
		};
	}, [eventName, router]);

	return null;
}

"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSocket } from "../../lib/socket";

const Map = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const socket = getSocket();

	const fetchPosts = async () => {
		try {
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/google-maps`,
			);
			setData(res.data);
		} catch (err) {
			setError(err.message || "Failed to fetch posts");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPosts();
		if (!socket.connected) socket.connect();

		socket.on("accordion-updated", fetchPosts);

		return () => {
			socket.off("accordion-updated", fetchPosts);
		};
	}, []);

	if (loading) {
		return (
			<div className="mx-4 my-4 space-y-6">
				<div className="w-full h-[150px] md:h-[400px] rounded bg-gray-300 animate-pulse relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer" />
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white">
			<div className="mx-4 my-4">
				<div className="map-container rounded overflow-hidden h-[150px] md:h-[400px] w-full">
					<iframe
						src={data.mapUrl}
						width="100%"
						height="100%"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"></iframe>
				</div>
			</div>
		</div>
	);
};

export default Map;

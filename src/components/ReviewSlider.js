const reviews = [
	{ text: "Amazing product! Totally worth it.", author: "Sarah K." },
	{ text: "Excellent service and fast delivery!", author: "David L." },
	{ text: "Great experience. Will shop again.", author: "Maria H." },
	{ text: "Very helpful support team!", author: "John D." },
	{ text: "Best quality at this price!", author: "Nina B." },
];

export default function ReviewSlider() {
	return (
		<div className="overflow-hidden w-full bg-gray-100 py-6">
			<div className="flex animate-scroll whitespace-nowrap">
				<div className="flex space-x-6 px-4">
					{reviews.map((review, index) => (
						<div
							key={index}
							className="min-w-max bg-white shadow-md rounded-lg p-4">
							<p className="text-gray-800 font-medium">{review.text}</p>
							<p className="text-sm text-gray-500 mt-2">- {review.author}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

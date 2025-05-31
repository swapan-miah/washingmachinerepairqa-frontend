import { useEffect, useState } from "react";

const InlineSVG = ({ url }) => {
	const [svgContent, setSvgContent] = useState("");

	useEffect(() => {
		const fetchSVG = async () => {
			try {
				const response = await fetch(url);
				let text = await response.text();

				text = text.replace(/fill=".*?"/g, 'fill="#0d9488"');

				setSvgContent(text);
			} catch (error) {
				console.error("Error fetching SVG:", error);
			}
		};

		fetchSVG();
	}, [url]);

	return (
		<div
			className="w-14 h-14 dashboard-icon grid place-items-center"
			dangerouslySetInnerHTML={{ __html: svgContent }}
		/>
	);
};

export default InlineSVG;

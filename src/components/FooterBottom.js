export default function FooterBottom({data}) {
	if (!data?.copyright_text) return null;
	return (
		<>
			<div
				className="flex flex-col lg:flex-row justify-center border-t border-gray-700 mt-10 pt-6 text-center">
				<p className="text-gray-400">{data.copyright_text}</p>
				{/* <p className="hidden lg:block text-gray-400">{sData.powered}</p> */}
			</div>
		</>
	);
}

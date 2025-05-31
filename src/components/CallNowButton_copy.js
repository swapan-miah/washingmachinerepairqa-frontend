import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";

const CallNowButton_copy = ({ number }) => {
	return (
		<a
			href={`tel:${number}`}
			className=" overflow-hidden flex items-center gap-2 text-black text-lg font-semibold py-3 px-6 rounded-lg group bg-white/70 transition-all duration-300 ease-in-out backdrop-blur-md hover:bg-white">
			<BiSolidPhoneCall className="text-2xl group-hover:scale-110 transition-transform duration-300" />
			<span className="text-lg group-hover:opacity-80 transition-opacity duration-300">
				Let&apos;s Talk : <span className="text-[#0d9488]">{number}</span>
			</span>
		</a>
	);
};

export default CallNowButton_copy;

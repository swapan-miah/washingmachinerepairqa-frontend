"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Aos = () => {
	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisited");

		if (!hasVisited) {
			AOS.init({
				duration: 800,
				once: true,
				mirror: false,
				easing: "ease-in-out",
				offset: 0,
			});
			localStorage.setItem("hasVisited", "true");
		} else {
			AOS.init({
				disable: true,
			});
		}
	}, []);

	return null;
};

export default Aos;


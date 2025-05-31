"use client";

import { useEffect } from "react";

const ClearLocalStorageOnReload = () => {
	useEffect(() => {
		let firebaseAuthKey = null;

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key.startsWith("firebase:authUser:")) {
				firebaseAuthKey = key;
				break;
			}
		}

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);
			if (key && key !== firebaseAuthKey) {
				localStorage.removeItem(key);
			}
		}
	}, []);

	return null;
};

export default ClearLocalStorageOnReload;

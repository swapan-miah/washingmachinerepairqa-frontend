"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccordion } from "@/app/context/ContextProvider";

export default function ProtectedRoute({ children }) {
	const { currentUser } = useAccordion();
	const router = useRouter();

	useEffect(() => {
		if (!currentUser) {
			router.push("/login");
		}
	}, [currentUser, router]);

	if (!currentUser) {
		return null;
	}

	return children;
}

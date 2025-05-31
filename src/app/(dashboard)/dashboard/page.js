"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";

export default function Dashboard() {
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				router.replace("/dashboard/users");
			} else {
				router.replace("/login");
				toast.error("Try again after logging in");
			}
		});
		return () => unsubscribe();
	}, []);

	return <Loading />;
}

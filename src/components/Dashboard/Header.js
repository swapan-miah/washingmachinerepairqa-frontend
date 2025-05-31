"use client";
import Link from "next/link";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccordion } from "@/app/context/ContextProvider";

export default function Header({ data }) {
	const [menu, setMenu] = useState(false);
	const { sideBar, setSideBar, currentUser, logout } = useAccordion();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logout();
			router.push("/login");
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<div className="sticky top-0 z-50 w-full bg-white border-b h-[66px] px-5 grid grid-cols-3 items-center">
			<div className="flex items-center gap-3">
				<div className="bg-slate-100 border border-slate-100 hover:border-gray-200 w-[35px] h-[35px] grid place-items-center cursor-pointer rounded">
					<MdMenuOpen
						onClick={() => setSideBar(!sideBar)}
						className={`text-[22px] ${sideBar && "rotate-[180deg]"}`}
					/>
				</div>
			</div>
			<div className="flex justify-center">
				<a href="/dashboard">
					{data?.logo && (
						<Image
							className="cursor-pointer"
							src={data?.logo}
							alt="Logo"
							width={70}
							height={35}
						/>
					)}
				</a>
			</div>
			<div className="flex items-center justify-end gap-2">
				<h2 className="font-medium hidden md:block">{currentUser?.name}</h2>
				<div
					onClick={() => setMenu(!menu)}
					className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] bg-black border rounded-full grid place-items-center cursor-pointer overflow-hidden">
					<FaUserCircle className="text-[30px] md:text-[35px] text-white" />
				</div>
			</div>

			{menu && (
				<div className="z-50 logout-menu absolute top-[56px] right-5 bg-white border border-gray-200 rounded shadow">
					<ul className="p-5 w-[300px] space-y-2">
						<Link href="/">
							<li className="p-2 bg-gray-50 border border-gray-50 hover:border-gray-200 cursor-pointer rounded">
								Go Home
							</li>
						</Link>
						<li
							onClick={handleLogout}
							className="p-2 text-white bg-[#0d9488] active:bg-[#0d9470] border border-[#0d9488] hover:border-[#0d9488] cursor-pointer rounded flex items-center justify-center gap-1">
							<HiOutlineLogout /> LogOut
						</li>
					</ul>
				</div>
			)}
		</div>
	);
}

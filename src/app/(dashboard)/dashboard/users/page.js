"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "../../../../../lib/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Users() {
	const [data, setData] = useState([]);
	const [deletingUid, setDeletingUid] = useState(null);
	const [currentUserUid, setCurrentUserUid] = useState(null);

	const fetchUsers = async () => {
		try {
			const res = await axios.get(`${process.env.BASE_URL}/users`);
			setData(res.data);
		} catch (error) {
			toast.error("Failed to load users");
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUserUid(user.uid);
			} else {
				setCurrentUserUid(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const handleDelete = async (uid) => {
		if (!confirm("Are you sure you want to delete this user?")) return;
		try {
			setDeletingUid(uid);
			await axios.delete(`${process.env.BASE_URL}/users/${uid}`);
			toast.success("Deleted successfully");
			fetchUsers();
		} catch (error) {
			toast.error("Failed to delete user");
		} finally {
			setDeletingUid(null);
		}
	};

	return (
		<div className="p-5">
			<div className="flex items-center justify-between mb-3">
				<h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
					Admins
				</h2>
				<Link href="/dashboard/users/create">
					<button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
						<BiSolidEdit /> Create
					</button>
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="hidden min-w-full md:table border border-gray-200">
					<thead className="bg-[#0d9488] text-white">
						<tr>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase">
								Date
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase">
								Name
							</th>
							<th className="px-4 py-2 text-left text-sm font-semibold uppercase">
								Email
							</th>
							<th className="px-4 py-2 text-right text-sm font-semibold uppercase">
								Action
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{data.map((item) => (
							<tr key={item._id} className="hover:bg-gray-50">
								<td className="px-4 py-3 text-sm">
									{new Date(item.date)
										.toLocaleDateString("en-GB")
										.replaceAll("/", "-")}
								</td>
								<td className="px-4 py-3 text-sm">{item.name}</td>
								<td className="px-4 py-3 text-sm">{item.email}</td>
								<td className="px-4 py-3 text-sm">
									<div className="w-full flex items-center justify-end gap-2">
										{(item.uid !== currentUserUid && (
											<button
												disabled={deletingUid === item.uid}
												onClick={() => handleDelete(item.uid)}
												className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
												title="Delete User">
												<MdDelete className="size-6" />
											</button>
										)) || (
											<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white disabled:opacity-50 disabled:cursor-not-allowed">
												Admin
											</button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="md:hidden space-y-4 mt-4">
					{data.map((item) => (
						<div
							key={item._id}
							className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-2">
							<div className="flex justify-between">
								<span className="text-sm font-semibold text-gray-700">
									Date:
								</span>
								<span className="text-sm text-gray-900">
									{new Date(item.date)
										.toLocaleDateString("en-GB")
										.replaceAll("/", "-")}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold text-gray-700">
									Name:
								</span>
								<span className="text-sm text-gray-900">{item.name}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm font-semibold text-gray-700">
									Email:
								</span>
								<span className="text-sm text-gray-900">{item.email}</span>
							</div>
							<div className="pt-2 text-right">
								{(item.uid !== currentUserUid && (
									<button
										disabled={deletingUid === item.uid}
										onClick={() => handleDelete(item.uid)}
										className="bg-[#e7405c] h-[32px] w-[32px] rounded grid place-items-center text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
										title="Delete User">
										<MdDelete className="size-6" />
									</button>
								)) || (
									<button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white disabled:opacity-50 disabled:cursor-not-allowed">
										Admin
									</button>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

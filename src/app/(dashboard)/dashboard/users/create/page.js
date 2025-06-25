"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	getAuth,
} from "firebase/auth";
import { initializeApp, deleteApp } from "firebase/app"; // ✅ FIXED HERE
import { auth } from "../../../../../../lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const Register = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { name, email, password } = formData;

		let secondaryApp;

		try {
			// ✅ Create a temporary Firebase app
			secondaryApp = initializeApp(auth.app.options, "Secondary");
			const secondaryAuth = getAuth(secondaryApp);

			const userCredential = await createUserWithEmailAndPassword(
				secondaryAuth,
				email,
				password,
			);

			await updateProfile(userCredential.user, { displayName: name });

			const { uid } = userCredential.user;
			const createdAt = new Date().toISOString();

			await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/create-user`, {
				name,
				email,
				uid,
				date: createdAt,
			});

			toast.success("Registered successfully!");

			// ✅ Correctly delete the temporary app
			await deleteApp(secondaryApp);
			router.push("/dashboard/users");
		} catch (error) {
			// Handle if deleteApp fails
			if (secondaryApp) {
				try {
					await deleteApp(secondaryApp);
				} catch (_) {}
			}

			if (error.code === "auth/email-already-in-use") {
				toast.error("Use Another Email");
			} else {
				toast.error(error.message);
			}
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="h-[calc(100vh-66px)] flex items-center justify-center bg-gray-50 px-4 py-10">
			<div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
				<h2 className="text-2xl font-bold text-center text-gray-800">
					Welcome! Let’s Get You Started
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
							placeholder="Your full name"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								required
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="Enter password"
							/>
							<button
								type="button"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						</div>
					</div>

					<button
						type="submit"
						className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-200">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;

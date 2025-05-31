"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/logo4.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [show, setShow] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push("/dashboard");
		} catch (err) {
			setError("Invalid email or password");
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	return (
		<div className="min-h-[100vh] bg-slate-50 flex items-center justify-center">
			<div className="bg-white w-[100%] sm:w-[80%] md:w-[60%] lg:w-[35%] max-w-[500px] border p-10 px-8 m-3 md:mx-0 md:my-5 rounded">
				<div className="flex items-center justify-center">
					<Image src={logo} width={100} height={100} alt="Logo" />
				</div>
				<div className="mx-2">
					<p className="text-center py-3 page-title">
						<span className="relative font-semibold">
							Sign in to your account
						</span>
					</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4 mt-2">
					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-900">
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="w-full border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
								placeholder="example@gmail.com"
							/>
						</div>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-900">
							Password
						</label>
						<div className="mt-2 relative">
							<input
								id="password"
								name="password"
								type={show ? "text" : "password"}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-gray-200 outline-none focus:border-gray-400 rounded p-3"
								placeholder="•••••••••••••••"
							/>
							{show ? (
								<FaEye
									onClick={() => setShow(false)}
									className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
								/>
							) : (
								<FaEyeSlash
									onClick={() => setShow(true)}
									className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
								/>
							)}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<input
									id="checkbox"
									name="checkbox"
									type="checkbox"
									className="accent-[#0d9488]"
								/>
								<label htmlFor="checkbox" className="text-sm text-gray-900">
									Remember me
								</label>
							</div>
							<a href="#" className="text-sm font-semibold text-[#0d9488]">
								Forgot password?
							</a>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={loading}
							className="flex w-full items-center justify-center gap-2 rounded bg-[#0d9488] px-3 py-3 text-sm font-semibold text-white shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d9488]">
							{loading ? (
								<>
									<svg
										className="animate-spin h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24">
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
										/>
									</svg>
									Signing In...
								</>
							) : (
								"Sign In"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

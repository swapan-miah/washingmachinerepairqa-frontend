"use client";
import ProtectedRoute from "./ProtectedRoute";

export default function ProtectedWrapper({ children }) {
	return <ProtectedRoute>{children}</ProtectedRoute>;
}

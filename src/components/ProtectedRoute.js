"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccordion } from "@/app/context/ContextProvider";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAccordion();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) return null;

  return children;
}

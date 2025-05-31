"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "@/components/Loading";
import { BiSolidEdit } from "react-icons/bi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${process.env.BASE_URL}/seo/about`);
            setData(res.data || null);
        } catch (err) {
            setError(err.message || "Failed to Fetch");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    if (loading) return <Loading />;
	if (error || !data) {
		return (
			<div className="p-5 h-full f-full">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
                        About SEO
                    </h2>
                    <Link href={`/dashboard/seo/about/edit/${data._id}`} onClick={() => setLoading(true)}>
                        <button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
                            <BiSolidEdit />
                            Edit
                        </button>
                    </Link>
                </div>
				<div className="bg-white text-xl border border-gray-200 rounded text-red-600 p-5 h-[87%] w-full grid place-items-center">
					{error || "No data found"}
				</div>
			</div>
		);
	}
    return (
        <div className="p-5">
            <div className="flex items-center justify-between mb-3">
                <h2 className="relative text-lg font-semibold text-gray-800 mb-2 pb-2 after:absolute after:bottom-0 after:left-0 after:w-20 after:h-[2px] after:bg-black before:absolute before:bottom-1 before:left-0 before:w-28 before:h-[2px] before:bg-[#0d9488]">
                    About SEO
                </h2>
                <Link href={`/dashboard/seo/about/edit/${data._id}`} onClick={() => setLoading(true)}>
                    <button className="bg-[#0d9488] py-2 px-5 text-white font-medium rounded flex items-center justify-center gap-1">
                        <BiSolidEdit />
                        Edit
                    </button>
                </Link>
            </div>

            <div className="flex flex-col gap-5">
                {data && (
                    <div className="space-y-4 bg-white border border-gray-200 rounded p-5">
                        <div className="flex items-center justify-between">
                            <h2 className="font-medium flex items-center gap-3 text-md">
                                <button className="bg-[#0d9488] h-[32px] w-[60px] rounded grid place-items-center text-white">
                                    01
                                </button>
                                {data.title}
                            </h2>
                        </div>

                        {Object.entries(data).map(
                            ([key, value], index) =>
                                key !== "_id" &&
                                key !== "images" &&
                                key !== "name" &&
                                key !== "title" &&
                                value && (
                                    <div
                                        key={index}
                                        className={`p-4 bg-white rounded-lg border cursor-pointer transition-all duration-300 ${
                                            openIndex === `${index}` ? "border-gray-400" : "border-gray-200"
                                        }`}
                                    >
                                        <h3
                                            onClick={() => toggleFAQ(`${index}`)}
                                            className="font-semibold flex justify-between items-center capitalize"
                                        >
                                            {key}
                                            <span className="text-xl">
                                                {openIndex === `${index}` ? "−" : "+"}
                                            </span>
                                        </h3>

                                        <div
                                            className={`grid transition-all duration-500 ease-in-out px-2 ${
                                                openIndex === `${index}` ? "grid-rows-[1fr] py-3" : "grid-rows-[0fr] py-0"
                                            }`}
                                        >
                                            <div className="overflow-hidden text-gray-600 text-sm">
                                                {Array.isArray(value) ? (
                                                    <ul>
                                                        {value
                                                            .filter((feature) => feature?.trim() !== "")
                                                            .map((feature, featureIdx) => (
                                                                <li key={featureIdx} className="mt-1">
                                                                    ✅ {feature}
                                                                </li>
                                                            ))}
                                                    </ul>
                                                ) : (
                                                    <p>{value}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

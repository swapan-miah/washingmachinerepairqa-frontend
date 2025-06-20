"use client";
import NavLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LuSettings, LuFileQuestion, LuMap } from "react-icons/lu";
import { AiOutlineSolution } from "react-icons/ai";
import { VscPreview } from "react-icons/vsc";
import { TbBrandBlogger } from "react-icons/tb";
import { BsSliders } from "react-icons/bs";
import { SiCountingworkspro } from "react-icons/si";
import { RiServiceLine, RiLayoutBottomLine } from "react-icons/ri";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { RiSeoLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { DataProvider, useAccordion } from "@/app/context/ContextProvider";

export default function Sidebar() {
	const pathname = usePathname();
	const [openSettings, setOpenSettings] = useState(false);
	const [openSEO, setOpenSEO] = useState(false);
	const { sideBar } = useAccordion(DataProvider);

	const isActive = (...paths) =>
		paths.some((path) => pathname.startsWith(path))
			? "bg-[#0d9488] text-white border-[#0d9488] hover:bg-[#0d9488] hover:border-[#0d9488]"
			: "bg-white border-white hover:border-gray-200 hover:bg-gray-100";

	return (
		<div
			className={`bg-white transition-all duration-300 ease-in-out fixed md:sticky top-[66px] z-40 pt-3 pb-3 pe-3 h-[calc(100vh-66px)] max-h-[calc(100vh-66px)] overflow-y-auto ${
				(sideBar && "w-[260px]") ||
				"ml-[-260px] md:ml-0 md:w-0 md:hidden transition-all duration-300 ease"
			} border-r border-gray-200`}>
			<ul className="space-y-2">
				<li>
					<NavLink
						href="/dashboard/users"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/users",
						)}`}>
						<LuUsers />Users
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/hero"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/hero",
						)}`}>
						<BsSliders />
						Slider
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/about"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/about",
						)}`}>
						<FiUser />
						About
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/skills"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/skills",
						)}`}>
						<SiCountingworkspro />
						Skills
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/solutions"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/solutions",
						)}`}>
						<AiOutlineSolution />
						Solutions
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/choose-us"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/choose-us",
						)}`}>
						<LuFileQuestion />
						Choose
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/services"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/services",
						)}`}>
						<RiServiceLine />
						Services
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/feedback"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/feedback",
						)}`}>
						<VscPreview />
						Feedback
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/blogs"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/blogs",
						)}`}>
						<TbBrandBlogger />
						Blogs
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/accordion"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/accordion",
						)}`}>
						<TfiLayoutAccordionList />
						Accordion
					</NavLink>
				</li>

				<li>
					<div
						onClick={() => setOpenSettings(!openSettings)}
						className={`flex items-center justify-between rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/settings",
						)}`}>
						<span className="flex items-center gap-1">
							<LuSettings />
							Settings
						</span>
						{openSettings ? <IoIosArrowDown /> : <IoIosArrowForward />}
					</div>
					<ul
						className={`ml-5 space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
							openSettings ? "max-h-40 mt-1" : "max-h-0"
						}`}>
						<li>
							<NavLink
								href="/dashboard/settings/heading-description"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/settings/heading-description",
								)}`}>
								Heading
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/dashboard/settings/general-settings"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/settings/general-settings",
								)}`}>
								General Settings
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/dashboard/settings/seo-files"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/settings/seo-files",
								)}`}>
								SEO Files
							</NavLink>
						</li>
					</ul>
				</li>

				<li>
					<div
						onClick={() => setOpenSEO(!openSEO)}
						className={`flex items-center justify-between rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/seo",
						)}`}>
						<span className="flex items-center gap-1">
							<RiSeoLine />
							SEO
						</span>
						{openSEO ? <IoIosArrowDown /> : <IoIosArrowForward />}
					</div>
					<ul
						className={`ml-5 space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
							openSEO ? "max-h-82 mt-1" : "max-h-0"
						}`}>
						<li>
							<NavLink
								href="/dashboard/seo/home"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/seo/home",
								)}`}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/dashboard/seo/services"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/seo/services",
								)}`}>
								Services
							</NavLink>
						</li>
						
						<li>
							<NavLink
								href="/dashboard/seo/about"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/seo/about",
								)}`}>
								About
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/dashboard/seo/blogs"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/seo/blogs",
								)}`}>
								Blogs
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/dashboard/seo/contact"
								className={`block rounded py-1.5 px-3 text-sm border cursor-pointer ${isActive(
									"/dashboard/seo/contact",
								)}`}>
								Contact
							</NavLink>
						</li>
						
					</ul>
				</li>
				<li>
					<NavLink
						href="/dashboard/map"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/map",
						)}`}>
						<LuMap />
						Maps
					</NavLink>
				</li>
				<li>
					<NavLink
						href="/dashboard/footer"
						className={`flex items-center gap-1 rounded py-2 px-3 border cursor-pointer ${isActive(
							"/dashboard/footer",
						)}`}>
						<RiLayoutBottomLine />
						Footer
					</NavLink>
				</li>
			</ul>
		</div>
	);
}

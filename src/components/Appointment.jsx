import React from "react";
import { FaCalendarAlt, FaClock, FaPhoneAlt, FaCheck } from "react-icons/fa";
import Aos from "./Aos";

const Appointment = () => {
	return (
		<div className="relative z-20 bg-gray-50 py-14 overflow-x-hidden border-t border-gray-200">
			<Aos></Aos>
			<div className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div
						data-aos="fade-left"
						className="bg-white border border-gray-200 rounded-lg p-6">
						<div className="text-center">
							<FaCalendarAlt className="text-blue-500 text-5xl mx-auto mb-4" />
							<h2 className="text-xl md:text-2xl  font-bold mb-2 text-gray-800">
								Make An Appointment
							</h2>
							<p className="text-gray-600 mb-4">
								If you need to repair your washing machine, you can book us by
								clicking the button below.
							</p>
							<a
								href="tel:+97455665296"
								className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 inline-block">
								Book Appointment
							</a>
						</div>
					</div>

					<div
						data-aos="fade-right"
						className="bg-white border border-gray-200 rounded-lg p-3 md:p-6">
						<div className="text-center">
							<FaClock className="text-green-500 text-5xl mx-auto mb-4" />
							<h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
								Working Hours
							</h2>
							<ul className="text-gray-600 space-y-2">
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Monday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Tuesday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Wednesday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Thursday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Friday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Saturday: 06:00AM - 22:00PM
								</li>
								<li className="flex items-center">
									<FaCheck className="text-green-500 mr-2" />
									Sunday: 06:00AM - 22:00PM
								</li>
							</ul>
						</div>
					</div>

					<div
						data-aos="fade-left"
						className="bg-white border border-gray-200 rounded-lg p-6">
						<div className="text-center">
							<a href="tel:+97455665296" className="inline-block">
								<FaPhoneAlt className="text-red-500 text-5xl mx-auto mb-4 hover:scale-110 transition-transform" />
							</a>
							<h2 className=" text-xl md:text-2xl font-bold mb-2 text-gray-800">
								Emergency Calls 24/7
							</h2>
							<a
								href="tel:+97455665296"
								className="text-xl md:text-3xl text-blue-600 font-semibold mb-2 block hover:underline">
								+97455665296
							</a>
							<a
								href="tel:+97455665296"
								className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 inline-block">
								Call Now
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Appointment;

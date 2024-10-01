"use client";
import Usernavbar from "../components/Usernavbar";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Userprofile() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [users, setUser] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async() => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/volunteers/");
            const data = await response.json();
            setUser(data);
            console.log(data);
        } 
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
            <Usernavbar />

            <div className="flex flex-col">
                {/* Notifications Picture, Name, Bio */}
                <div className="flex flex-grow  pt-8 pr-8 pl-8  ">
                    {/* Picture, Name, Bio */}
                    <div className="flex-grow w-3/4 pr-8">
                        {/* Picture and Name */}
                        <div className="flex items-center mb-8">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="User Avatar"
                                className="w-24 h-24 rounded-md mr-6 border-2 border-gray-300"
                            />
                            <input
                                type="text"
                                className="text-4xl text-white font-bold border-none bg-transparent"
                                placeholder="John Doe"
                                maxLength={50}
                                required
                            />
                        </div>
                        {/* Bio */}
                        <div className="mb-4">
                            <h2 className="text-2xl text-white font-semibold mb-4">Bio</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                                        <select className="w-full p-2 border border-gray-300 rounded bg-gray-100" required>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Non-Binary/Other</option>
                                        </select>
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                                        <select className="w-full p-2 border border-gray-300 rounded bg-gray-100" required>
                                            {Array.from({ length: 100 }, (_, i) => (
                                                <option key={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-100" placeholder="123 Main St" maxLength={100} required/>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 overflow-x-hidden">Apt/Unit/Suite</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-100" placeholder="N/A" maxLength={100} />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-100" placeholder="City" maxLength={100} required/>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2"> State </label>
                                        <select className="w-full p-2 border border-gray-300 rounded bg-gray-100" required >
                                            {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
                                                <option key={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-2 overflow-x-hidden">Zip</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded bg-gray-100" placeholder="12345" maxLength={100} inputMode={"numeric"} pattern={"[0-9]*"} required/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="w-1/4 bg-white p-8 rounded-lg shadow-md flex flex-col max-h-96">
                        <h2 className="text-2xl font-semibold overflow-y-hidden pb-6">Notifications</h2>
                        <div className="flex-grow flex-col space-y-4 overflow-y-auto">
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg ">
                                <p className="text-gray-700 overflow-x-hidden">New message from Jane Doe.</p>
                                <span className="text-xs text-gray-500">5 mins ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills, Preferences, Events */}
            <div className="flex flex-col">
                <div className="flex flex-col h-full">
                    <div className="flex-grow pt-2 pl-8 pr-8 pb-8">
                        {/* Skills*/}
                        <div className="mb-4 flex-col">
                            {/* on= bg-slate-300 text-slate-700
                            off= bg-slate-600 text-slate-700  */}
                            <h2 className="text-2xl text-white font-semibold mb-4">Skills</h2>
                            <div className="w-full bg-white p-6 rounded-lg shadow-md flex inline-flex flex-wrap gap-2">
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Heavy lifting/Manual Labor</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Food Safety Certification</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Public Speaking</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">First Aid/CPR Certified</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Good With Children</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Problem Solving</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Creative Arts</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Advanced Medical Training</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Typing</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Good With Seniors</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Literacy</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Willing to Drive</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Good with Technology</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Carpentry</button>  
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Programming</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Cooking</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Multilingual</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Good With Animals</button>
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Leadership/Management</button>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="mb-4 flex-col">
                            <h2 className="text-2xl text-white font-semibold mb-4">Preferences</h2>
                            <div className="w-full bg-white p-6 rounded-lg shadow-md flex inline-flex flex-wrap gap-2">
                            <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Over 18</button>
                            <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Religious</button>
                                <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Multilingual</button>
                                <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Outreach</button>
                                <button className="bg-slate-300 text-slate-700 py-2 px-4 rounded-full">Environment</button>
                                <button className="bg-slate-600 text-slate-700 py-2 px-4 rounded-full">Minimal Standing</button>
                            </div>
                        </div>

                        {/* Event History*/}
                        <div className="mb-4 flex-col">
                            <h2 className="text-2xl text-white font-semibold mb-4">Event History</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md flex overflow-x-auto space-x-4">
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                                <div className="min-w-[250px] bg-gray-100 p-4 rounded-lg">
                                    <h3 className="text-xl font-bold">Event Name</h3>
                                    <p className="text-sm text-gray-600">Date: 2023-08-15</p>
                                    <p className="text-sm text-gray-600">Location: San Francisco, CA</p>
                                    <p className="text-sm text-gray-500">Description: A discussion on...</p>
                                </div>
                            </div>
                        </div>
                        {/* Availability Section */}
                        <div className="mb-4 flex-col">
                            <h2 className="text-2xl text-white font-semibold mb-4">Availability</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex space-x-4 mb-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                                            dateFormat="yyyy/MM/dd"
                                            placeholderText="Select start date"
                                        />







                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                                            dateFormat="yyyy/MM/dd"
                                            placeholderText="Select end date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // hi hey







}

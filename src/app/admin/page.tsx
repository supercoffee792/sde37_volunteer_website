import Link from "next/link";
import Usernavbar from "../components/Usernavbar";

export default function Adminpage() {
    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
            <Usernavbar/>
            <div className="flex flex-col h-[90vh] border border-white rounded-md m-10">
                <div className="w-2/3 border-r border-gray-500 text-white p-10">
                    <h2 className="text-white text-2xl mb-5">Events</h2>
                    <form className="text-white">
                        <div className="mb-4">
                            <label htmlFor="event-name" className="">Event Name</label>
                            <input type="text" id="event-name" max-length="100" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-date" className="">Date</label>
                            <input type="date" id="event-date" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" placeholder="mm/dd/yy" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-location" className="">Location</label>
                            <input type="text" id="event-location" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-urgency" className="mr-4">Urgency</label>
                            <select className="text-black rounded-md p-1">
                                <option value="Not urgent">Not urgent</option>
                                <option value="Urgent">Urgent</option>
                                <option value="Very urgent">Very urgent</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-skills" className="block mb-4 mr-4">Required skills (Hold ctrl on Windows and hold cmd on Mac to multi-select) </label>
                            <select multiple className="text-black rounded-md p-1">
                                <option value="Problem solving">Problem solving</option>
                                <option value="Good with pets">Good with pets</option>
                                <option value="Good with kids">Good with kids</option>
                                <option value="Programming">Programming</option>
                                <option value="Leadership">Leadership</option>
                                <option value="Writing">Writing</option>
                                <option value="CPR certified">CPR certified</option>
                                <option value="Carpentry">Carpentry</option>
                                <option value="Cooking">Cooking</option>
                                <option value="Multilingual">Multilingual</option>
                                <option value="Creative arts">Creative arts</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="event-description" className="">Description</label>
                            <textarea id="event-description" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Create Event</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
import Link from "next/link";
import Usernavbar from "../components/Usernavbar";

export default function Adminpage() {
    return (

      <div className="bg-slate-800 min-h-screen overflow-x-hidden">
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

        <div className="flex flex-col h-full min-h-screen border border-gray-700 rounded-lg m-10 p-6 bg-slate-800 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-8">Volunteer-Event Matching</h1>

          {/* Filters Section */}
          <div className="grid grid-cols-4 gap-6 mb-8 items-end">

            {/* Skills */}
            <div className="flex flex-col">
              <label htmlFor="Skills" className="text-gray-300 mb-2">Skills</label>
              <select name="Skills" id="Skills" className="bg-slate-700 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" multiple size={4}>
                <option value="Good with pets">Good with pets</option>
                <option value="Good with kids">Good with kids</option>
                <option value="Programming">Programming</option>
                <option value="Leadership">Leadership</option>
                <option value="CPR certified">CPR certified</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cooking">Cooking</option>
                <option value="Multilingual">Multilingual</option>
                <option value="Creative arts">Creative arts</option>
              </select>
            </div>

            {/* Location */}  
            <div className="flex flex-col">
              <label htmlFor="Location" className="text-gray-300 mb-2">Location</label>
              <select name="Location" id="Location" className="bg-slate-700 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="houston">Houston, Texas</option>
                <option value="chicago">Chicago, Illinois</option>
                <option value="newyork">New York, New York</option>
                <option value="seattle">Seattle, Washington</option>
                <option value="la">Los Angeles, California</option>
              </select>
            </div>
    
            {/* Urgency */}
            <div className="flex flex-col">
              <label htmlFor="Urgency" className="text-gray-300 mb-2">Urgency</label>
              <select name="Urgency" id="Urgency" className="bg-slate-700 text-white p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
    
            {/* Apply Filters Button */}
            <div className="flex items-end">
              <button className="w-auto bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                Apply filters
              </button>
            </div>
          </div>

          {/* Volunteers and Events Section */}
          <div className="grid grid-cols-2 gap-6">

            {/* Volunteers List */}
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Volunteers</h2>
              <ul className="space-y-6">
                <li className="flex items-center bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <img src="https://picsum.photos/200" alt="placeholder" className="w-14 h-14 rounded-full mr-4"/>
                  <div>
                    <h3 className="text-lg font-medium text-white">Aaron Medina</h3>
                    <p className="text-slate-300">Age: 34</p>
                    <p className="text-slate-300">Skills: CPR certified</p>
                  </div>
                </li>
                <li className="flex items-center bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <img src="https://picsum.photos/200" alt="placeholder" className="w-14 h-14 rounded-full mr-4"/>
                  <div>
                    <h3 className="text-lg font-medium text-white">Alek Mazey</h3>
                    <p className="text-slate-300">Age: 67</p>
                    <p className="text-slate-300">Skills: Strong lifter</p>
                  </div>
                </li>
                <li className="flex items-center bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <img src="https://picsum.photos/200" alt="placeholder" className="w-14 h-14 rounded-full mr-4"/>
                  <div>
                    <h3 className="text-lg font-medium text-white">Precious Ndubueze</h3>
                    <p className="text-slate-300">Age: 43</p>
                    <p className="text-slate-300">Skills: Good with kids</p>
                  </div>
                </li>
                <li className="flex items-center bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <img src="https://picsum.photos/200" alt="placeholder" className="w-14 h-14 rounded-full mr-4"/>
                  <div>
                    <h3 className="text-lg font-medium text-white">Vicky Bayang</h3>
                    <p className="text-slate-300">Age: 40</p>
                    <p className="text-slate-300">Skills: Good with pets</p>
                  </div>
                </li>
              </ul>
            </div>
          
            {/* Events List */}
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-6">Events</h2>
              <ul className="space-y-6">
                <li className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <h3 className="text-lg font-medium text-white">Houston Food Bank</h3>
                  <p className="text-slate-300">Date: 10-15-2024</p>
                  <p className="text-slate-300">Location: Houston, Texas</p>
                  <p className="text-slate-300">Description: Food distribution to Greater Houston area</p>
                  <p className="text-slate-300">Skills Needed: Strong lifter</p>
                  <p className="text-slate-300">Urgency: Medium</p>
                </li>
                <li className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <h3 className="text-lg font-medium text-white">Houston Marathon Committee</h3>
                  <p className="text-slate-300">Date: 01-19-2024</p>
                  <p className="text-slate-300">Location: Houston, Texas</p>
                  <p className="text-slate-300">Description: Set-up and distribute electrolytes and water at aid-stations</p>
                  <p className="text-slate-300">Urgency: High</p>
                </li>
                <li className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <h3 className="text-lg font-medium text-white">Park Clean-Up</h3>
                  <p className="text-slate-300">Date: 09-30-2024</p>
                  <p className="text-slate-300">Location: Chicago, Illinois</p>
                  <p className="text-slate-300">Description: Help clean Grant Park</p>
                  <p className="text-slate-300">Urgency: Medium</p>
                </li>
                <li className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                  <h3 className="text-lg font-medium text-white">Animal Shelter Volunteer</h3>
                  <p className="text-slate-300">Date: 12-05-2024</p>
                  <p className="text-slate-300">Location: New York, New York</p>
                  <p className="text-slate-300">Description: Play with animals in the shelter to help them socialize</p>
                  <p className="text-slate-300">Urgency: Low</p>
                </li>
              </ul>
            </div>
          </div>

        
      </div>
    </div>
    );
}
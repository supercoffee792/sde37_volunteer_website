"use client";
import Link from "next/link";
import Usernavbar from "../components/Usernavbar";
import { useActionState, useEffect, useState, useRef } from "react";
import { it } from "node:test";

interface EventData { // data types expected when creating event object
  id: number;
  name: string;
  date: string;
  location: string;
  urgency: string;
  skills: string;
  description: string;
};

export default function Adminpage() {
    const [events, setEvent] = useState<EventData[]>([]);

    // Event attribute states
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [urgency, setUrgency] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");

    // Event update attribute states
    const [newName, setNewName] = useState<string>("");
    const [newDate, setNewDate] = useState<string>("");
    const [newLocation, setNewLocation] = useState<string>("");
    const [newUrgency, setNewUrgency] = useState<string>("");
    const [newSkills, setNewSkills] = useState<string[]>([]);
    const [newDescription, setNewDescription] = useState<string>("");

    // pop up form status
    const [popupOpen, setPopupOpen] = useState(false);
    const [togglePopup, setTogglePopup] = useState(false);
    const [currID, setCurrID] = useState<number | null>(null);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const locationInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    const handleOpen = (pk: number) => {
      const itemToEdit = events.find(item => item.id == pk);
      
      if (itemToEdit) {
        setNewName(itemToEdit.name);
        setNewDate(itemToEdit.date);
        setNewLocation(itemToEdit.location);
        setNewDescription(itemToEdit.description);
        setCurrID(pk);
        setPopupOpen(true);
        setTogglePopup(prev => !prev);
      }
      else {
        console.log("Cant find item");
      }
    };

    const handleClose = () => {
      setPopupOpen(false);
      // setCurrID(null);
    };

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { target } = event;
      
      if (nameInputRef.current) {
        setNewName(nameInputRef.current!.value);
      }
      if (dateInputRef.current) {
        setNewDate(dateInputRef.current!.value);
      }
      if (locationInputRef.current) {
        setNewLocation(locationInputRef.current!.value);
      }
      if (descriptionInputRef.current) {
        setNewDescription(descriptionInputRef.current!.value);
      }
    };

    useEffect(() => {
      const itemToEdit = events.find(item => item.id === currID);
      if (!itemToEdit) {
        console.log("Event not found");
        return;
      }
      if (nameInputRef.current) {
        nameInputRef.current.value = itemToEdit.name;
      }
      if (dateInputRef.current) {
        dateInputRef.current.value = itemToEdit.date;
      }
      if (locationInputRef.current) {
        locationInputRef.current.value = itemToEdit.location;
      }
      if (descriptionInputRef.current) {
        descriptionInputRef.current.value = itemToEdit.description;
      }
    }, [currID, events, togglePopup]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async() => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/events/");
            const data = await response.json();
            setEvent(data);
            // console.log(data);
        } 
        catch (err) {
            console.log(err);
        }
    };

    const handleSkillsSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const selectedValues: string[] = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }

        setSkills(selectedValues);
    };

    /*const handleNewSkillsSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const selectedValues: string[] = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }

        setNewSkills(selectedValues);
    };*/

    const handleAddEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const t_skills = skills.join(',');
        const eventData = {
          name,
          date,
          location,
          urgency,
          skills: t_skills,
          description,
        };
        
        try {
          const response = await fetch("http://127.0.0.1:8000/api/events/create", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData),
          });
          const t_data: EventData = await response.json();
          setEvent(prev => [...prev, t_data]);
        }
        catch (err) {
          // console.log(eventData);
          console.log(err);
        }
    };

    const handleUpdateEventSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("this worked");

        const original = events.find(item => item.id === currID);
        if (!original) {
          console.log("Event not found");
          return;
        }

        const t_skills = original.skills;
        const eventNewData = {
          name: newName,
          date: newDate,
          location: newLocation,
          urgency: original.urgency,
          skills: t_skills,
          description: newDescription,
        };

        try {
          const response = await fetch(`http://127.0.0.1:8000/api/events/${currID}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventNewData),
          });
    
          const t_data: EventData = await response.json();
          setEvent((prev) => prev.map((item) => item.id == currID ? t_data : item)); // update event list after update change
          setPopupOpen(false);
        }
        catch (err) {
          console.log(err);
          setPopupOpen(false);
        }
    };

    const deleteEvent = async(pk: number) => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/events/${pk}`, {
            method: "DELETE",
          });
    
          setEvent((prev) => prev.filter((item) => item.id !== pk)); // update event list after delete change
        } 
        catch (err) {
          console.log(err);
        }
    };

    return (

      <div className="bg-slate-800 min-h-screen overflow-x-hidden">
        <Usernavbar/>
        <div className="flex h-[90vh] border border-gray-700 rounded-md m-10">
            <div className="w-2/3 border-r border-gray-700 text-white p-10">
                <h2 className="text-3xl font-bold text-white mb-5">Create Event</h2>
                <form onSubmit={handleAddEventSubmit} className="text-white">
                    <div className="mb-4">
                        <label htmlFor="event-name" className="">Event Name</label>
                        <input type="text" id="event-name" max-length="100" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" 
                        onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event-date" className="">Date</label>
                        <input type="date" id="event-date" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" placeholder="mm/dd/yy" 
                        onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event-location" className="">Location</label>
                        <input type="text" id="event-location" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" 
                        onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event-urgency" className="mr-4">Urgency</label>
                        <select className="text-black rounded-md p-1" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                            <option value="Not urgent">Not urgent</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Very urgent">Very urgent</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="event-skills" className="block mb-4 mr-4">Required skills (Hold ctrl on Windows and hold cmd on Mac to multi-select) </label>
                        <select multiple className="text-black rounded-md p-1" value={skills} onChange={handleSkillsSelectChange}>
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
                        <textarea id="event-description" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2"
                        onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Create Event</button>
                </form>
            </div>
            <div className="w-1/3 text-3xl text-white p-10 overflow-auto">
                <p className="font-bold mb-5">Manage events</p>
                <button className="w-auto mb-4 bg-gray-600 text-white text-sm p-3 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  Filters...
                </button>
                <div className="bg-slate-700 p-6 text-sm rounded-lg shadow-lg">
                  <h2 className="text-1xl font-semibold text-white mb-6">Events</h2>

                  {/* json data mapping */}
                  <ul className="space-y-6">

                    {events.map((item) => (
                      <li key={item.id} className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                        <div className="flex justify-between">
                         <h3 className="text-lg font-medium text-white">{item.name}</h3>
                         <div className="space-x-2">
                          <button onClick = {() => handleOpen(item.id)} className="w-auto ml-auto bg-gray-800 text-white text-sm p-2 rounded-md hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                              Update Event
                            </button>
                              
                          <button onClick={() => deleteEvent(item.id)} className="w-auto ml-auto bg-gray-800 text-white text-sm p-2 rounded-md hover:bg-red-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none">
                              Delete Event
                            </button>
                        </div>
                        </div>
                        <p className="text-slate-300">Date: {item.date}</p>
                        <p className="text-slate-300">Location: {item.location}</p>
                        <p className="text-slate-300">Description: {item.description}</p>
                        <p className="text-slate-300">Skills Needed: {item.skills}</p>
                        <p className="text-slate-300">Urgency: {item.urgency}</p>
                      </li>
                    ))}

                    {
                        popupOpen && 
                        <div className="fixed inset-0 m-0 flex items-center justify-center bg-black bg-opacity-20 max-w-screen ">
                          <div className="flex flex-col bg-slate-600 rounded-lg p-8 w-1/2">
                            <div className="flex justify-between">
                              <h2 className="text-3xl font-bold text-white mb-5">Update Event</h2>
                              <button onClick={() => handleClose()} className="text-1xl bg-red-600 px-2 rounded-md">Close</button>
                            </div>

                            <form onSubmit={handleUpdateEventSubmit} className="text-white">
                              <div className="mb-4">
                                  <label htmlFor="event-name" className="">Event Name</label>
                                  <input type="text" id="event-name" max-length="100" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" 
                                    onChange={handleFormChange} ref={nameInputRef} required />
                              </div>
                              <div className="mb-4">
                                  <label htmlFor="event-date" className="">Date</label>
                                  <input type="date" id="event-date" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" placeholder="mm/dd/yy" 
                                  onChange={handleFormChange} ref={dateInputRef} required />
                              </div>
                              <div className="mb-4">
                                  <label htmlFor="event-location" className="">Location</label>
                                  <input type="text" id="event-location" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2" 
                                  onChange={handleFormChange} ref={locationInputRef} required />
                              </div>      
                              <div className="mb-4">
                                  <label htmlFor="event-description" className="">Description</label>
                                  <textarea id="event-description" className="text-black mt-1 block w-full border-gray-300 rounded-md p-2"
                                  onChange={handleFormChange} ref={descriptionInputRef} required></textarea>
                              </div>
                              <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Update Event</button>
                            </form>
                          </div>
                        </div>
                      }
                    
                  </ul>
              </div>
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
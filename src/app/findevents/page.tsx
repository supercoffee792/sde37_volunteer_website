"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Usernavbar from "../components/Usernavbar";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  urgency: string;
  skills: string;
  description: string;
}

export default function Findevents() {
    const [events, setEvents] = useState<EventData[]>([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/events/");
            const data = await response.json();
            setEvents(data);
        } 
        catch (err) {
            console.log(err);
        }
    };

    return (
      <div className="bg-slate-800 min-h-screen overflow-x-hidden">
        <Usernavbar/>
          <div className="flex flex-col h-full min-h-screen border border-gray-700 rounded-lg m-10 p-6 bg-slate-800 shadow-lg">

            {/* List of the signed-in Volunteer's Events */}
            <h1 className="text-3xl font-bold text-white mb-8">My Events</h1>
            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
              {/* The volunteer that is signed in has a list of skills. It should match the event's skills with their skills and put them here. */}
            </div>
            

            {/* List of All Events */}
            <h1 className="text-3xl font-bold text-white mb-8">Available Events</h1>

            <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
              <ul className="space-y-6">
                {events.map((item) => (
                  <li key={item.id} className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{item.name}</h3>
                        <p className="text-slate-300">Date: {item.date}</p>
                        <p className="text-slate-300">Location: {item.location}</p>
                        <p className="text-slate-300">Description: {item.description}</p>
                        <p className="text-slate-300">Skills Needed: {item.skills}</p>
                        <p className="text-slate-300">Urgency: {item.urgency}</p>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 transition-colors">Register</button>
                    </div>                    
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
  );
}
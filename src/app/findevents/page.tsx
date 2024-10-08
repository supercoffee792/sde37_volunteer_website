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
              <h1 className="text-3xl font-bold text-white mb-8">Available Events</h1>

              {/* Events List */}
              <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-6">Events</h2>
                <ul className="space-y-6">
                  {events.map((item) => (
                    <li key={item.id} className="bg-slate-600 p-4 rounded-lg shadow hover:bg-slate-500 transition-colors">
                      <h3 className="text-lg font-medium text-white">{item.name}</h3>
                      <p className="text-slate-300">Date: {item.date}</p>
                      <p className="text-slate-300">Location: {item.location}</p>
                      <p className="text-slate-300">Description: {item.description}</p>
                      <p className="text-slate-300">Skills Needed: {item.skills}</p>
                      <p className="text-slate-300">Urgency: {item.urgency}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    );
}
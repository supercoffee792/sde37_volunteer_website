"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Usernavbar from "../components/Usernavbar";
import { useRouter } from "next/navigation";

interface EventData {
  id: number;
  name: string;
  date: string;
  location: string;
  urgency: string;
  skills: string;
  description: string;
}

interface VolunteerData {
  id: number;
  address1: string;
  address2: string;
  age: string;
  city: string;
  date_joined: string;
  email: string;
  first_name: string;
  gender: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  last_name: string;
  notififications: string;
  pfp: string;
  preferences: string;
  profilename: string;
  skills: string;
  state: string;
  username: string;
  zipcode: string;
}

export default function Findevents() {
  // State for user data and log-in status
  const [loginUser, setLoginUser] = useState<VolunteerData | null>(null);
  const [isLogin, setLogin] = useState<boolean>(false);
  const router = useRouter();

  // State for events
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch('http://127.0.0.1:8000/api/volunteer_info', {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Logged-in User Data:", data); // Log the user data
        setLoginUser(data);
        setLogin(true);
      }
      catch(err) {
        setLogin(false);
        console.log(err);
      }
    };
    checkLoginStatus();
  }, []);

  const volunteerLogout = async () => {
    try {
        const a_token = localStorage.getItem("access_token");
        const r_token = localStorage.getItem("refresh_token");

        if (r_token && a_token) {
            const response = await fetch('http://127.0.0.1:8000/api/logout/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${a_token}`,
                },
                body: JSON.stringify({ refresh: r_token }),
            });

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setLogin(false);
            setLoginUser(null);
            console.log("logged out");
            router.push('/signin');
        }
    }
    catch(err) {
        console.log("Can't logout");
        console.log(err);
    }
};


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


  const handleSignUp = async (eventId: number) => {
    if (!isLogin) {
      router.push('/signin');
    } else {
      console.log("Event ID:", eventId); // Log the eventId

      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/signup/`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Fetch Response Object:", response);

        const data = await response.json();
        console.log("Parsed Response Data:", data);

        if (response.ok) {
          console.log("Successfully signed up for the event");
        } else {
          console.log("Error signing up for the event");
        }
      } catch (err) {
        console.log(err);
      }
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
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-white">{item.name}</h3>
                          <p className="text-slate-300">Date: {item.date}</p>
                          <p className="text-slate-300">Location: {item.location}</p>
                          <p className="text-slate-300">Description: {item.description}</p>
                          <p className="text-slate-300">Skills Needed: {item.skills}</p>
                          <p className="text-slate-300">Urgency: {item.urgency}</p>
                        </div>                   
                        <button onClick={() => handleSignUp(item.id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">Sign Up</button>
                      </div>                      
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    );
}

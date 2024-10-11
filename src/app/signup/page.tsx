"use client";
import Link from "next/link"
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

export default function Signup() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [failed, setFailed] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFailed(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              });
        
              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Signup failed');
              }
            
              router.push('/signin');
              setUsername('');
              setPassword('');
        }
        catch(err: any) {
            setFailed(err.message);
        }
    };

    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
            <Navbar/>

            <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-8 bg-700 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="username" className="block text-sm font-medium text-white">Username</label>
                            <input type="text" id="username" name="username" className="mt-1 text-white block w-full px-3 py-2 border bg-gray-900 border-blue-300 rounded-md shadow-sm focus:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                            onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 text-white block w-full px-3 py-2 border bg-gray-900 border-blue-300 rounded-md shadow-sm focus:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                            placeholder="Enter your email"/>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                            <input type="password" id="password" name="password" className="mt-1 text-white block w-full px-3 py-2 border bg-gray-900 border-blue-300 rounded-md shadow-sm focus:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                            onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
                        </div>
                        <button type="submit" className="w-full py-2 px-4 mt-2 bg-blue-800 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
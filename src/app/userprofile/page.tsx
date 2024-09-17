import Link from "next/link"
import Usernavbar from "../components/Usernavbar";

export default function Userprofile() {
    return (
        <div className="bg-slate-800 h-screen overflow-x-hidden">
            <Usernavbar/>
            <div className="flex h-full text-white">
                <div className="flex justify-center text-center text-2xl w-1/3 bg-slate-800 p-6 border-r border-gray-500">
                    <strong>Username</strong>
                </div>
                <div className="w-2/3 bg-slate-800 p-6">
                    <h2 className="text-xl font-semibold">Personal Information</h2>
                    <p className="mt-2"><strong>Email:</strong> user@example.com</p>
                    <p><strong>Age:</strong> 30</p>
                    <p><strong>Address:</strong> 30</p>
                    <p><strong>City:</strong></p>
                    <p><strong>State:</strong></p>
                    <p><strong>Zip code:</strong></p>
                    <p><strong>Skills:</strong></p>
                    <p><strong>Availability:</strong></p>
                    <p><strong>Preferences:</strong></p>
                </div>
            </div>
        </div>
    );
}
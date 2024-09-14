import Image from "next/image";
import Link from "next/link"
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="bg-slate-800 h-screen overflow-x-hidden">
      <Navbar/>
    </div>
  );
}

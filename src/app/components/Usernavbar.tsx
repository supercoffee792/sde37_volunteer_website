import Link from "next/link"

const Usernavbar = () => {
    return (
        <nav className="bg-slate-800 text-white w-full top-0 left-0 border-b border-gray-500">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-semibold"><Link href="/" className="hover:underline">Volunteer Page</Link></h1>
                </div>
            </div>
        </nav>
    );
};

export default Usernavbar;
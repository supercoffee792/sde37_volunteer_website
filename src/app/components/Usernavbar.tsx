import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="bg-slate-800 text-white w-full top-0 left-0 border-b border-gray-500">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-semibold"><Link href="/" className="hover:underline">Volunteer Page</Link></h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="/userprofile" className="hover:underline">Profile</Link></li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="/" className="hover:underline">Find Events</Link></li>
                        </ul>
                    </nav>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/signin" className="hover:underline border p-2 rounded-md bg-white text-black">Log Out</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
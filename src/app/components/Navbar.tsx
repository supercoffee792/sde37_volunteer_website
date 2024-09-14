import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="bg-slate-800 text-white w-full top-0 left-0 border-b border-gray-500">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-semibold"><Link href="/" className="hover:underline">Volunteer Page</Link></h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link href="/about" className="hover:underline">About</Link></li>
                        </ul>
                    </nav>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/signin" className="hover:underline border p-2 rounded-md bg-white text-black">Sign in</Link></li>
                        <li><Link href="/signup" className="hover:underline border border-slate-800 p-2 rounded-md bg-blue-700">Sign up</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    );
};

export default Navbar;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    <h1 className="text-2xl font-bold text-blue-600">
                        TrackHire
                    </h1>
                </div>


                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {token ? (
                        <>
                            <span className="text-gray-600 font-medium">
                                Dashboard
                            </span>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
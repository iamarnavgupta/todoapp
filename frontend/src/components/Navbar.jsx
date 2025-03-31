import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the auth token
        localStorage.removeItem("user"); // Remove user data
        navigate("/login"); // Redirect to login page
    };

    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">NoteApp</h1>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-sm">{user.name}</span>
                        <button 
                            onClick={handleLogout} 
                            className="bg-red-500 px-3 py-1 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")} className="bg-blue-500 px-3 py-1 rounded">Login</button>
                        <button onClick={() => navigate("/signup")} className="bg-green-500 px-3 py-1 rounded">Signup</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

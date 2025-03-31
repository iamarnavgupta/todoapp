import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); //  Corrected useNavigate usage

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );
            if (response.data.success) {
                navigate("/login"); // ✅ Redirect to login page after signup
            }
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border shadow p-6 w-80 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter Username"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter Email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                        >
                            Signup
                        </button>
                    </div>

                    {/* Login Link (Fixed) */}
                    <p className="text-center">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;

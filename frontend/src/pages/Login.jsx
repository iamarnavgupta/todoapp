import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";  // ✅ Import Link
import { useAuth } from "../context/ContextProvider";  // ✅ Import useAuth

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  
    const { login } = useAuth();  // ✅ Fix: Ensure useAuth is imported

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            console.log(response.data);

            if (response.status === 200) { 
                
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                navigate("/");  
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed! Check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="border shadow p-6 w-80 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>

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

                    {/* Login Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                        >
                            Login
                        </button>
                    </div>

                    {/* Register Link (Fixed) */}
                    <p className="text-center">
                        Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;

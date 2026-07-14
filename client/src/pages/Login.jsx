import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import { toast } from "react-toastify";
function Login() {
    const[email, setEmail] = useState("");
const[password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
    toast.warning("Please fill in all fields");
    return;
}
    try {
        setLoading(true);
        const response = await api.post('/auth/login', { email, password });
        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate('/dashboard');
    } catch (error) {
        console.error("Login failed:", error);
        toast.success("Login successful!");
    }
    finally{
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
           
            <h1 className="text-3xl font-bold text-center text-blue-600">
    TrackHire
</h1>

<p className="text-center text-gray-500 mt-2 mb-6">
    Track your job applications with ease
</p>
            <form onSubmit={handleSubmit
            }>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input className="border rounded-lg px-4 py-2 w-full"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input className="border rounded-lg px-4 py-2 w-full"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            </div>
        </div>
    );
}


export default Login;
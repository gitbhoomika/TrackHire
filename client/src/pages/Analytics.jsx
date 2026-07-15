import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

function Analytics() {
    const [applications, setApplications] = useState([]);
    const fetchApplications = async () => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await api.get('/applications', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setApplications(response.data);
                } catch (error) {
                    console.error("Error fetching applications:", error);
                }
            };
    useEffect(() => {
        fetchApplications();
    }, []);
    const totalApplications = applications.length;
    const pending = applications.filter(
    app => app.status === "Pending"
).length;

const interview = applications.filter(
    app => app.status === "Interview"
).length;

const offered = applications.filter(
    app => app.status === "Offered"
).length;

const rejected = applications.filter(
    app => app.status === "Rejected"
).length;
const pieData = [
    { name: "Pending", value: pending },
    { name: "Interview", value: interview },
    { name: "Offered", value: offered },
    { name: "Rejected", value: rejected },
];
const COLORS = [
    "#FACC15",
    "#3B82F6",
    "#22C55E",
    "#EF4444",
];
   const successRate =
    totalApplications === 0
        ? 0
        : ((offered / totalApplications) * 100).toFixed(1);
        const interviewRate =
    totalApplications === 0
        ? 0
        : ((interview / totalApplications) * 100).toFixed(1);
        const monthlyData = Array(12).fill(0);

applications.forEach((app) => {
    const month = new Date(app.createdAt).getMonth();
    monthlyData[month]++;
});


    return (
         
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-slate-800">
                    Analytics Dashboard 📊
                </h1>
                

                <p className="text-slate-500 mt-2 mb-8">
                    Track your application performance with visual insights.
                </p>
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">

    <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">Applications</p>
        <h2 className="text-4xl font-bold mt-2">{totalApplications}</h2>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">Interviews</p>
        <h2 className="text-4xl font-bold mt-2 text-blue-600">{interview}</h2>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">Offers</p>
        <h2 className="text-4xl font-bold mt-2 text-green-600">{offered}</h2>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-gray-500">Rejected</p>
        <h2 className="text-4xl font-bold mt-2 text-red-500">{rejected}</h2>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6">
    <p className="text-gray-500">Success Rate</p>

    <h2 className="text-4xl font-bold text-green-600 mt-2">
        {successRate}%
    </h2>
</div>
<div className="bg-white rounded-2xl shadow-lg p-6">
    <p className="text-gray-500">Interview Rate</p>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
        {interviewRate}%
    </h2>
</div>

</div>

    <h2 className="text-2xl font-bold mb-6">
        Application Status Distribution
    </h2>

    <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

            <PieChart>

                <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={130}
                    label
                >
                    {pieData.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

    <h2 className="text-2xl font-bold mb-6">
        Applications by Status
    </h2>

    <div className="h-96">

        <ResponsiveContainer width="100%" height="100%">

            <BarChart data={pieData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" radius={[8,8,0,0]} />

            </BarChart>

        </ResponsiveContainer>

    </div>

</div>


</div>

            </div>

        </div>
    );
}

export default Analytics;
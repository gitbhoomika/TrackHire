
import{useState,useEffect} from 'react';
import api from '../services/api.js';
import { DndContext } from "@dnd-kit/core";
import KanbanCard from "../components/KanbanCard";
import KanbanColumn from "../components/KanbanColumn";
import StatsCards from "../components/StatsCards";
import {
    Search,
    BriefcaseBusiness,
    Clock3,
    BadgeCheck,
    Trophy,
} from "lucide-react";

function Dashboard() {
    const token = localStorage.getItem("token");
    const [applications, setApplications] = useState([]);
     const [showForm, setShowForm] = useState(false);
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("Pending");
    const [editingId, setEditingId] = useState(null);
    const [editCompany, setEditCompany] = useState("");
const [editPosition, setEditPosition] = useState("");
const [editStatus, setEditStatus] = useState("");
const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState("all");
const [view, setView] = useState("list");
    useEffect(() => {
        

        const fetchApplications = async () => {
            try {
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

        fetchApplications();
    }, []);
const handleSubmit = async (e) => {
            e.preventDefault();
            if (!company || !position ) {
                toast.warning("Please fill in all fields");
                return;
            }
            try {
                console.log(status);
                const response = await api.post('/applications', { company, position, status }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
                
                
                setApplications([...applications, response.data]);
                setCompany("");
                setPosition("");
                setStatus("Pending");
                setShowForm(false);
            } catch (error) {
                console.error("Error adding application:", error);
            }
        };
        const handleEditSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await api.put(`/applications/${editingId}`, { company: editCompany, position: editPosition, status: editStatus }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApplications(applications.map((app) => (app._id === editingId ? response.data : app)));
                setEditingId(null);
            } catch (error) {
                console.error("Error updating application:", error);
            }
        };
        const handleDelete = async (id) => {
            const confirmDelete = window.confirm(
    "Are you sure you want to delete this application?"
);

if (!confirmDelete) {
    return;
}
            try {
                await api.delete(`/applications/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApplications(applications.filter((app) => app._id !== id));
            } catch (error) {
                console.error("Error deleting application:", error);
            }
        };
        const filteredApplications = applications.filter((app) => {
    const matchesSearch = app.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
        filterStatus === "all" || app.status === filterStatus;

    return matchesSearch && matchesStatus;
}
);
const getStatusColor = (status) => {
    switch (status) {
        case "Pending":
            return "bg-amber-500";
        case "Interview":
            return "bg-sky-500";
        case "Rejected":
            return "bg-rose-500";
        case "Offered":
            return "bg-emerald-500";
        default:
            return "bg-gray-500";
    }
};
const pendingApplications = filteredApplications.filter(
    (app) => app.status === "Pending"
);

const interviewApplications = filteredApplications.filter(
    (app) => app.status === "Interview"
);

const offeredApplications = filteredApplications.filter(
    (app) => app.status === "Offered"
);

const rejectedApplications = filteredApplications.filter(
    (app) => app.status === "Rejected"
);
const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const applicationId = active.id;
    const newStatus = over.id;

    try {
        const response = await api.put(
            `/applications/${applicationId}`,
            {
                status: newStatus,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setApplications(
            applications.map((app) =>
                app._id === applicationId ? response.data : app
            )
        );
    } catch (error) {
        console.error("Error updating status:", error);
    }
};
const totalApplications = applications.length;

const pendingCount = applications.filter(
    app => app.status === "Pending"
).length;

const interviewCount = applications.filter(
    app => app.status === "Interview"
).length;

const offeredCount = applications.filter(
    app => app.status === "Offered"
).length;

    return (

         <div  className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <div>
    <h1 className="text-4xl font-bold text-slate-800">
      Good Afternoon 👋
    </h1>

    <p className="text-slate-500 mt-2">
      Track your applications, stay organized, and land your dream internship.
    </p>
  <StatsCards
    totalApplications={totalApplications}
    pendingCount={pendingCount}
    interviewCount={interviewCount}
    offeredCount={offeredCount}
/>
  

</div>

<div className="flex gap-4 my-4">
    <button
        onClick={() => setView("list")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
        List View
    </button>

    <button
        onClick={() => setView("kanban")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
        Kanban View
    </button>
</div>
{view === "list" && (
    <>
<div className="bg-white rounded-2xl shadow-md p-4 mb-6">
    <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
    <Search
        className="absolute left-3 top-3 text-gray-400"
        size={18}
    />

    <input
        type="text"
        placeholder="Search company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</div>

<select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="border border-gray-200 rounded-xl px-4 py-3"
>
    <option value="all">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Offered">Offered</option>
</select>
         <button onClick={() => setShowForm(!showForm)}
           className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
>
            {showForm ? 'Hide Form' : '+ Add Application'}
        </button></div></div>
        { showForm && (
            <form onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="company"
                    className="border rounded-lg px-4 py-2 w-full">Company:</label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="position"
                    className="border rounded-lg px-4 py-2 w-full">Position:</label>
                    <input
                        type="text"
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="status"
                    className="border rounded-lg px-4 py-2 w-full">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Interview">Interview</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Offered">Offered</option>
                    </select>
                </div>
                <div className="col-span-2">
    <button
        type="submit"
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
    >
        Add Application
    </button>
</div>

            </form>
            )}
              <div className="space-y-4">
                
                {filteredApplications.map((app) => (
                   <div key={app._id}
                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
    {app._id === editingId ? (
       <form onSubmit={handleEditSubmit}>
    <div>
        <label>Company:</label>
        <input
            type="text"
            value={editCompany}
            onChange={(e) => setEditCompany(e.target.value)}
        />
    </div>

    <div>
        <label>Position:</label>
        <input
            type="text"
            value={editPosition}
            onChange={(e) => setEditPosition(e.target.value)}
        />
    </div>

    <div>
        <label>Status:</label>
        <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
        >
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offered">Offered</option>
        </select>
    </div>

    <button type="submit">Save</button>

    <button
        type="button"
        onClick={() => setEditingId(null)}
    >
        Cancel
    </button>
</form>
    ) : (
        <>
            <div className="flex justify-between items-start">

    <div>
        <h2 className="text-2xl font-bold text-slate-800">
            {app.company}
        </h2>

        <p className="text-slate-500 mt-2">
            {app.position}
        </p>
    </div>

    <span
        className={`${getStatusColor(app.status)} text-white px-4 py-2 rounded-full text-sm font-semibold`}
    >
        {app.status}
    </span>

</div>
<div className="flex gap-3 mt-6">
            <button onClick={() =>{ setEditingId(app._id);
                setEditCompany(app.company);
        setEditPosition(app.position);
        setEditStatus(app.status);
             } }
               className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
                Edit
            </button>
            <button onClick={() => handleDelete(app._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition">
    Delete
</button>
</div>
        </>
    )}
    
</div>
                ))}
            </div>
        </>

        
    )}

               
           
            
        
           {view === "kanban" && (
            <DndContext onDragEnd={handleDragEnd}>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

       
    <KanbanColumn
    title="Pending"
    applications={pendingApplications}
/>


        <KanbanColumn
    title="Interview"
    applications={interviewApplications}
/>

        <KanbanColumn
    title="Offered"
    applications={offeredApplications}
/>


       <KanbanColumn
    title="Rejected"
    applications={rejectedApplications}
/>
</div>
</DndContext>
        )}


           
       
      </div>
       </div>
    );
    

    
}

export default Dashboard;
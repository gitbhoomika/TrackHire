
import{useState,useEffect} from 'react';
import api from '../services/api.js';
import { DndContext } from "@dnd-kit/core";
import KanbanCard from "../components/KanbanCard";
import KanbanColumn from "../components/KanbanColumn";

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

    return (

         <div  className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
    Dashboard
</h1>
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
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <select className="border rounded-lg px-4 py-2"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
>
    <option value="all">All</option>
    <option value="Pending">Pending</option>
    <option value="Interview">Interview</option>
    <option value="Rejected">Rejected</option>
    <option value="Offered">Offered</option>
</select>
            <input className="border rounded-lg px-4 py-2 w-full md:w-80"
    type="text"
    placeholder="Search by company"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>
         <button onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
>
            {showForm ? 'Hide Form' : 'Add Application'}
        </button></div>
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
            <h2 className="text-xl font-semibold">
    {app.company}
</h2>
<p className="text-gray-600 mt-1">
    {app.position}
</p>
<div className="mt-3">
    <span
        className={`${getStatusColor(app.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
    >
        {app.status}
    </span>
</div>
            <button onClick={() =>{ setEditingId(app._id);
                setEditCompany(app.company);
        setEditPosition(app.position);
        setEditStatus(app.status);
             } }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mr-3">
                Edit
            </button>
            <button onClick={() => handleDelete(app._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
    Delete
</button>
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
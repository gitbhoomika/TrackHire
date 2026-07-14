import KanbanCard from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";

function KanbanColumn({ title, applications }) {
    const { setNodeRef } = useDroppable({
    id: title,
});
    return (
       <div
    ref={setNodeRef}
    className="bg-gray-100 rounded-lg p-4 min-h-[500px]"
>
            <h2 className="text-lg font-bold mb-4">
                {title} ({applications.length})
            </h2>

            <div className="space-y-3">
                {applications.map((app) => (
                    <KanbanCard
                        key={app._id}
                        app={app}
                    />
                ))}
            </div>
        </div>
    );
}

export default KanbanColumn;
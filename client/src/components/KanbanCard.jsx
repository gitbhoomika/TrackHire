import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
 function KanbanCard({ app }) {
   const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
} = useDraggable({
    id: app._id,
});

const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
};
    return (
        <div
    ref={setNodeRef}
    style={style}
    {...listeners}
    {...attributes}
   className="bg-white rounded-lg shadow p-3 hover:shadow-lg transition cursor-grab touch-none"
>
            <h3 className="font-semibold">
                {app.company}
            </h3>

            <p className="text-sm text-gray-600">
                {app.position}
            </p>
        </div>
    );
}

export default KanbanCard;
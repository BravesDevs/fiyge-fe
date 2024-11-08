import { Draggable } from "react-beautiful-dnd";

const DraggableElementList = () => {
  const elements = [
    { id: "text-input", label: "Text Input" },
    { id: "text-area", label: "Text Area" },
    // Add more form elements here as needed
  ];

  return (
    <div className="space-y-4">
      {elements.map((element, index) => (
        <Draggable key={element.id} draggableId={element.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="p-2 bg-gray-100 rounded shadow-sm"
            >
              {element.label}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableElementList;

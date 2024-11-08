import { Droppable, Draggable } from "react-beautiful-dnd";

const FormBuilderCanvas = ({ elements }) => (
  <Droppable droppableId="canvas">
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="p-4 border border-dashed border-gray-400 rounded-md min-h-[300px] bg-gray-50"
      >
        {elements.length === 0 && (
          <p className="text-center text-gray-400">Drag components here</p>
        )}
        {elements.map((element, index) => (
          <Draggable key={element.id} draggableId={element.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-3 mb-3 bg-white border border-gray-300 rounded shadow-sm"
              >
                <div className="font-semibold">{element.label}</div>
                <p className="text-sm text-gray-500">{element.placeholder}</p>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default FormBuilderCanvas;

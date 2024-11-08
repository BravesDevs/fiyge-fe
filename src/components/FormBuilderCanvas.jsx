import { Droppable, Draggable } from "react-beautiful-dnd";
import EditableFormElement from "./EditableFormElement";

const FormBuilderCanvas = ({ elements, updateElement }) => (
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
                className="p-2"
              >
                <EditableFormElement
                  element={element}
                  updateElement={updateElement}
                />
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

// App.jsx
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElementList from "./components/DraggableElementList";
import FormBuilderCanvas from "./components/FormBuilderCanvas";

const App = () => {
  const [elements, setElements] = useState([]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === "element-list" &&
      destination.droppableId === "canvas"
    ) {
      const newElement = {
        id: `element-${elements.length + 1}`,
        type: draggableId,
        label: `${draggableId} Label`,
        placeholder: `${draggableId} Placeholder`,
        required: false,
      };

      setElements((prev) => [...prev, newElement]);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-8 p-8">
        <div className="w-1/4">
          <h2 className="mb-4 text-lg font-bold">Draggable Elements</h2>
          <DraggableElementList />
        </div>
        <div className="w-3/4">
          <h2 className="mb-4 text-lg font-bold">Form Builder Canvas</h2>
          <FormBuilderCanvas elements={elements} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;

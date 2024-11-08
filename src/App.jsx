import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropertiesPanel from "./components/PropertiesPanel";

const App = () => {
  const [elements, setElements] = useState([]);
  const [currentEditingElement, setCurrentEditingElement] = useState(null);

  const availableElements = [
    {
      id: "text-input",
      type: "text",
      label: "Text Input",
      placeholder: "Enter text",
      required: false,
    },
    {
      id: "textarea",
      type: "textarea",
      label: "Text Area",
      placeholder: "Enter long text",
      required: false,
    },
  ];

  const updateElement = (updatedElement) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === updatedElement.id ? { ...el, ...updatedElement } : el
      )
    );
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const droppedElement = availableElements.find(
      (el) => el.id === result.draggableId
    );
    if (droppedElement) {
      setElements((prevElements) => [
        ...prevElements,
        { ...droppedElement, id: `element-${Date.now()}` },
      ]);
    }
  };

  const handleEditClick = (element) => {
    setCurrentEditingElement(element);
  };

  const handleClosePanel = () => {
    setCurrentEditingElement(null); // Close the properties panel by setting it to null
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex">
        <div className="w-1/4 p-4">
          <Droppable droppableId="available-elements">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded shadow-md"
              >
                {availableElements.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 mb-2 bg-white border border-gray-300 rounded shadow-sm"
                      >
                        {element.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="w-3/4 p-4">
          <Droppable droppableId="canvas" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded shadow-md min-h-screen"
              >
                {elements.length === 0 ? (
                  <div className="text-center text-gray-500">
                    Drag components here
                  </div>
                ) : (
                  elements.map((element, index) => (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 mb-3 bg-white border border-gray-300 rounded shadow-sm"
                          onClick={() => handleEditClick(element)} // Handle click to edit
                        >
                          {element.type === "text" && (
                            <div>
                              <label className="block font-semibold">
                                {element.label}
                              </label>
                              <input
                                type="text"
                                placeholder={element.placeholder}
                                className="p-2 border border-gray-300 rounded w-full"
                              />
                            </div>
                          )}
                          {element.type === "textarea" && (
                            <div>
                              <label className="block font-semibold">
                                {element.label}
                              </label>
                              <textarea
                                placeholder={element.placeholder}
                                className="p-2 border border-gray-300 rounded w-full"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>

      {/* Editable Properties Section */}
      {currentEditingElement && (
        <PropertiesPanel
          element={currentEditingElement}
          onUpdate={updateElement}
          onClose={handleClosePanel} // Make sure onClose is passed here correctly
        />
      )}
    </DragDropContext>
  );
};

export default App;

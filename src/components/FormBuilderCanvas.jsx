import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import EditableFormElement from "./EditableFormElement";
import axios from "axios";

const FormBuilderCanvas = ({ elements, updateElement }) => {
  const [isSaving, setIsSaving] = useState(false);

  const generateFormName = () =>
    `Form_${Math.random().toString(36).substring(2, 8)}`;

  const handleSaveForm = async () => {
    setIsSaving(true);
    const formName = generateFormName();

    const payload = {
      form_name: formName,
      form_data: { elements },
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/forms/save",
        payload
      );
      alert(`Form saved successfully! Form ID: ${response.data.form._id}`);
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save form. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-2 border-gray-300 p-6 ro unded-lg shadow-lg bg-white">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={handleSaveForm}
          className={`px-6 py-2 font-semibold rounded-lg text-white ${
            isSaving ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>
        <button
          className="px-6 py-2 font-semibold rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200"
          onClick={() => alert("Edit Form clicked!")}
        >
          Edit Form
        </button>
      </div>

      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4 border-2 border-dashed border-gray-400 rounded-md min-h-[300px] bg-gray-50 flex flex-col items-center justify-center space-y-4"
          >
            {elements.length === 0 && (
              <p className="text-center text-gray-400">Drag components here</p>
            )}
            {elements.map((element, index) => (
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
                    className="p-4 w-full bg-white rounded-lg shadow-sm border border-gray-200"
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
    </div>
  );
};

export default FormBuilderCanvas;

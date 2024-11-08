import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import EditableFormElement from "./EditableFormElement";
import axios from "axios";

const FormBuilderCanvas = ({ elements, updateElement }) => {
  const [isSaving, setIsSaving] = useState(false);

  // Function to generate a random form name
  const generateFormName = () =>
    `Form_${Math.random().toString(36).substring(2, 8)}`;

  // Function to handle form save
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
    <div style={{ border: "2px solid #e2e8f0", padding: "10px" }}>
      <div
        className="mb-4"
        style={{ marginBottom: "16px", textAlign: "center" }}
      >
        <button
          onClick={handleSaveForm}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isSaving}
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "8px",
            cursor: isSaving ? "not-allowed" : "pointer",
          }}
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>
      </div>

      <Droppable droppableId="canvas">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-4 border border-dashed border-gray-400 rounded-md min-h-[300px] bg-gray-50"
            style={{
              padding: "16px",
              border: "2px dashed gray",
              borderRadius: "8px",
              minHeight: "300px",
              backgroundColor: "#f9fafb",
            }}
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
                    className="p-2"
                    style={{ padding: "10px" }}
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

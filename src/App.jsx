import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import PropertiesPanel from "./components/PropertiesPanel";

const App = () => {
  const [elements, setElements] = useState([]);
  const [currentEditingElement, setCurrentEditingElement] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
    {
      id: "select",
      type: "select",
      label: "Select Dropdown",
      placeholder: "Choose an option",
      required: false,
      options: ["Option 1", "Option 2"],
    },
    {
      id: "file-upload",
      type: "file",
      label: "File Upload",
      placeholder: "Upload a file",
      required: false,
    },
    {
      id: "date-picker",
      type: "date",
      label: "Date Picker",
      placeholder: "Select Date",
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
    setCurrentEditingElement(null);
  };

  const handleFileDrop = (acceptedFiles, elementId) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === elementId
          ? { ...el, files: [...(el.files || []), ...acceptedFiles] }
          : el
      )
    );
  };

  const generateFormName = () =>
    `Form_${Math.random().toString(36).substring(2, 8)}`;

  const handleSaveForm = async () => {
    setIsSaving(true);
    const formName = generateFormName();
    const payload = { form_name: formName, form_data: { elements } };

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
    <div className="p-6">
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={handleSaveForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>
        <button
          onClick={() => alert("Edit Form")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Edit Form
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
            <Droppable droppableId="available-elements">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
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
                          className="p-3 mb-3 bg-white border rounded-lg shadow-sm"
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

          <div className="w-3/4 p-4 bg-gray-50 rounded-lg shadow-md">
            <Droppable droppableId="canvas">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[500px] bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg"
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
                            className="p-4 mb-4 bg-white border border-gray-300 rounded-lg shadow-sm"
                          >
                            <div
                              onClick={() => handleEditClick(element)}
                              className="cursor-pointer"
                            >
                              <label className="block font-semibold">
                                {element.label}
                              </label>
                              {element.type === "text" && (
                                <input
                                  type="text"
                                  placeholder={element.placeholder}
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              )}
                              {element.type === "textarea" && (
                                <textarea
                                  placeholder={element.placeholder}
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              )}
                              {element.type === "select" && (
                                <select className="w-full p-2 border border-gray-300 rounded">
                                  <option value="" disabled>
                                    {element.placeholder}
                                  </option>
                                  {element.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              )}
                              {element.type === "date" && (
                                <input
                                  type="date"
                                  className="w-full p-2 border border-gray-300 rounded"
                                />
                              )}
                              {element.type === "file" && (
                                <FileUploadDroppable
                                  elementId={element.id}
                                  onDrop={handleFileDrop}
                                />
                              )}
                            </div>
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
      </DragDropContext>

      {currentEditingElement && (
        <PropertiesPanel
          element={currentEditingElement}
          onUpdate={updateElement}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
};

const FileUploadDroppable = ({ elementId, onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, elementId),
    accept: ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx",
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed p-4 text-center cursor-pointer rounded-md bg-gray-50"
    >
      <input {...getInputProps()} />
      <p>Drag & Drop files here, or click to select files</p>
    </div>
  );
};

export default App;

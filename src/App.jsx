import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
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
    <div>
      <div className="mb-4">
        <button
          onClick={handleSaveForm}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Form"}
        </button>
      </div>

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
                            onClick={() => handleEditClick(element)}
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
                            {element.type === "select" && (
                              <div>
                                <label className="block font-semibold">
                                  {element.label}
                                </label>
                                <select
                                  className="p-2 border border-gray-300 rounded w-full"
                                  defaultValue=""
                                >
                                  <option value="" disabled>
                                    {element.placeholder}
                                  </option>
                                  {element.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            {element.type === "date" && (
                              <div>
                                <label className="block font-semibold">
                                  {element.label}
                                </label>
                                <input
                                  type="date"
                                  placeholder={element.placeholder}
                                  className="p-2 border border-gray-300 rounded w-full"
                                />
                              </div>
                            )}
                            {element.type === "file" && (
                              <div className="p-4 border border-gray-300 rounded bg-gray-50">
                                <label className="block font-semibold">
                                  {element.label}
                                </label>
                                <div className="mt-2">
                                  <FileUploadDroppable
                                    elementId={element.id}
                                    onDrop={handleFileDrop}
                                  />
                                </div>
                                {element.files && element.files.length > 0 && (
                                  <div className="mt-2">
                                    <h4 className="font-semibold">
                                      Uploaded Files
                                    </h4>
                                    <ul>
                                      {element.files.map((file, idx) => (
                                        <li key={idx}>{file.name}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
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
      className="border-2 border-dashed p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag & Drop files here, or click to select files</p>
    </div>
  );
};

export default App;

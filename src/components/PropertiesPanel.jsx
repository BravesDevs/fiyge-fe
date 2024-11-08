import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const PropertiesPanel = ({ element, onUpdate, onClose }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder);
  const [required, setRequired] = useState(element.required);
  const [options, setOptions] = useState(element.options || []);
  const [files, setFiles] = useState(element.files || []);

  useEffect(() => {
    setLabel(element.label);
    setPlaceholder(element.placeholder);
    setRequired(element.required);
    setOptions(element.options || []);
    setFiles(element.files || []);
  }, [element]);

  const handleUpdate = () => {
    onUpdate({ ...element, label, placeholder, required, options, files });
    onClose();
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx",
    multiple: true,
  });

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-1/4">
        <h2 className="text-xl font-semibold mb-4">Edit Properties</h2>
        <div>
          <label className="block mb-2">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Placeholder</label>
          <input
            type="text"
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
            placeholder="Placeholder"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Required</label>
          <input
            type="checkbox"
            checked={required}
            onChange={() => setRequired(!required)}
            className="mb-4"
          />
        </div>
        {element.type === "select" && (
          <div>
            <h3 className="font-semibold mb-2">Options</h3>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder={`Option ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addOption} className="text-blue-500">
              Add Option
            </button>
          </div>
        )}

        {element.type === "file" && (
          <>
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-4 mt-4"
            >
              <input {...getInputProps()} />
              <p className="text-center">
                Drag & Drop files here, or click to select files
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Uploaded Files</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <span className="mr-2">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-2 text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;

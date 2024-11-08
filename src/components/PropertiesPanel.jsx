import { useState } from "react";

const PropertiesPanel = ({ element, onUpdate, onClose }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder);
  const [required, setRequired] = useState(element.required);

  const handleUpdate = () => {
    onUpdate({ ...element, label, placeholder, required });
    onClose();
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
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;

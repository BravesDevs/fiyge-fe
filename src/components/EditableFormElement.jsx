import { useState } from "react";

const EditableFormElement = ({ element, updateElement }) => {
  const [isEditing, setIsEditing] = useState(true); // Track if it's in edit mode
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder);
  const [rows, setRows] = useState(element.rows || 3); // Default to 3 rows for TextArea
  const [cols, setCols] = useState(element.cols || 20); // Default to 20 columns for TextArea

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "label") {
      setLabel(value);
    } else if (name === "placeholder") {
      setPlaceholder(value);
    } else if (name === "rows") {
      setRows(value);
    } else if (name === "cols") {
      setCols(value);
    }
  };

  const handleSave = () => {
    updateElement(element.id, { label, placeholder, rows, cols });
    setIsEditing(false); // Switch to view mode after saving
  };

  return (
    <div className="p-3 mb-3 bg-white border border-gray-300 rounded shadow-sm">
      {isEditing ? (
        <>
          {/* Editable state */}
          <label className="block font-semibold mb-2">Label</label>
          <input
            type="text"
            name="label"
            value={label}
            onChange={handleChange}
            placeholder="Enter label"
            className="mb-2 p-1 border border-gray-300 rounded w-full"
          />
          <label className="block font-semibold mb-2">Placeholder</label>
          <input
            type="text"
            name="placeholder"
            value={placeholder}
            onChange={handleChange}
            placeholder="Enter placeholder"
            className="mb-2 p-1 border border-gray-300 rounded w-full"
          />
          {element.type === "text-area" && (
            <>
              <label className="block font-semibold mb-2">Rows</label>
              <input
                type="number"
                name="rows"
                value={rows}
                onChange={handleChange}
                min="1"
                className="mb-2 p-1 border border-gray-300 rounded w-full"
              />
              <label className="block font-semibold mb-2">Columns</label>
              <input
                type="number"
                name="cols"
                value={cols}
                onChange={handleChange}
                min="1"
                className="mb-2 p-1 border border-gray-300 rounded w-full"
              />
            </>
          )}
          <button
            className="mt-2 p-1 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
          {/* View state */}
          <label className="block font-semibold mb-2">{label}</label>
          {element.type === "text-area" ? (
            <textarea
              placeholder={placeholder}
              rows={rows}
              cols={cols}
              className="p-1 border border-gray-300 rounded w-full"
            />
          ) : (
            <input
              type="text"
              placeholder={placeholder}
              className="p-1 border border-gray-300 rounded w-full"
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditableFormElement;

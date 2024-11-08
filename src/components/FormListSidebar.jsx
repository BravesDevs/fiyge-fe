import React, { useState } from "react";

const FormListSidebar = ({ forms, onSelectForm }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to toggle sidebar visibility

  if (!Array.isArray(forms)) {
    return <p>Loading forms...</p>;
  }

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "w-1/4" : "w-16" // If sidebar is open, use 1/4 width, else 16px width
      } p-4 bg-gray-200 transition-all duration-300 ease-in-out absolute top-0 right-0 h-full`}
    >
      {/* Close Button */}
      {isSidebarOpen && (
        <button
          className="absolute top-2 left-2 text-xl text-gray-700"
          onClick={toggleSidebar}
        >
          &times; {/* This is the "X" close button */}
        </button>
      )}

      {/* Sidebar Content */}
      {isSidebarOpen ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">Form List</h2>
          {forms.length > 0 ? (
            <ul>
              {forms.map((form) => (
                <li
                  key={form._id}
                  className="mb-2 p-2 bg-white border border-gray-300 rounded cursor-pointer"
                  onClick={() => onSelectForm(form)}
                >
                  {form.form_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No forms available</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <button className="text-gray-500 p-2" onClick={toggleSidebar}>
            &#43; {/* This is the expand button */}
          </button>
        </div>
      )}

      {/* Expand Button (at the bottom) */}
      {!isSidebarOpen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            className="p-2 bg-blue-500 text-white rounded-full"
            onClick={toggleSidebar}
          >
            Expand
          </button>
        </div>
      )}
    </div>
  );
};

export default FormListSidebar;

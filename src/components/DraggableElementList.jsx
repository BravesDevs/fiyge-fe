import { Draggable, Droppable } from "react-beautiful-dnd";

const ELEMENTS = [
  { id: "text-input", content: "Text Input" },
  { id: "text-area", content: "Text Area" },
  { id: "select-dropdown", content: "Select Dropdown" },
  { id: "checkbox", content: "Checkbox" },
  { id: "radio-button", content: "Radio Button" },
  { id: "date-picker", content: "Date Picker" },
  { id: "file-upload", content: "File Upload" },
];

const DraggableElementList = () => (
  <Droppable droppableId="element-list" isDropDisabled>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="p-4 border border-gray-300 rounded-md bg-white shadow-md"
      >
        {ELEMENTS.map((el, index) => (
          <Draggable key={el.id} draggableId={el.id} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-2 mb-2 bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
              >
                {el.content}
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default DraggableElementList;

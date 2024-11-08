// components/PropertiesPanel.js
import { useState } from 'react';

const PropertiesPanel = ({ element, onUpdate }) => {
    const [label, setLabel] = useState(element.label);
    const [placeholder, setPlaceholder] = useState(element.placeholder);
    const [required, setRequired] = useState(element.required);

    const handleUpdate = () => {
        onUpdate({ ...element, label, placeholder, required });
    };

    return (
        <div>
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
            <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} placeholder="Placeholder" />
            <label>
                Required
                <input type="checkbox" checked={required} onChange={() => setRequired(!required)} />
            </label>
            <button onClick={handleUpdate}>Save</button>
        </div>
    );
};

export default PropertiesPanel;

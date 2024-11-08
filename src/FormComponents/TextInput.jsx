const TextInput = ({ label, placeholder, required, onChange }) => (
    <div>
        <label>{label}</label>
        <input type="text" placeholder={placeholder} required={required} onChange={onChange} />
    </div>
);

export default TextInput;



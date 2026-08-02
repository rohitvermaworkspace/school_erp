const InputField = ({ type, name, value, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="
      w-full
      border
      p-3
      rounded-lg
      outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    />
  );
};

export default InputField;

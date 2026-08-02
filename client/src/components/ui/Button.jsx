function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`
      bg-primary
      dark:bg-blue-600
      text-white
      px-5
      py-3
      rounded-xl
      shadow-md
      hover:scale-[1.02]
      hover:opacity-90
      transition
      font-medium
      ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

const SubmitButton = ({ children, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full px-4 py-2 text-white bg-purple-500 rounded-lg 
        hover:bg-purple-600 disabled:bg-gray-400`}
    >
      {children}
    </button>
  );
};

export default SubmitButton;

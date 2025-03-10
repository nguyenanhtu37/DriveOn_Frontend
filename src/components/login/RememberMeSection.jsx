
const RememberMeSection = () => (
    <div className="flex items-center justify-between mb-4">
      <label className="flex items-center">
        <input type="checkbox" className="text-purple-500 focus:ring-purple-500" />
        <span className="ml-2 text-sm text-gray-700">Remember me</span>
      </label>
      <a href="/forgot-password" className="text-sm text-purple-600 hover:underline">
        Forgot Password?
      </a>
    </div>
  );
  
  export default RememberMeSection;
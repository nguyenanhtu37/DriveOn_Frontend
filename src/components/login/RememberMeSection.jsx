const RememberMeSection = () => (
  <div className="flex items-center justify-between">
    <label className="flex items-center group cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray text-primary focus:ring-primary focus:ring-offset-0"
      />
      <span className="ml-2 text-sm text-body group-hover:text-heading transition-colors">Remember me</span>
    </label>
    <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors">
      Forgot Password?
    </a>
  </div>
)

export default RememberMeSection


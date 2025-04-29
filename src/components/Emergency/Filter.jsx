const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Filter Garages</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <div className="mb-2 sm:mb-0">
          <label className="mr-2">Sort by:</label>
          <select
            name="sortBy"
            onChange={handleFilterChange}
            className="border rounded p-1"
          >
            <option value="default">Default</option>
            <option value="distance">Distance</option>
            <option value="rating">Rating</option>
            <option value="pro">Pro Status</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="text-lg font-semibold mb-4">Are you sure you want to delete this vehicle?</div>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};
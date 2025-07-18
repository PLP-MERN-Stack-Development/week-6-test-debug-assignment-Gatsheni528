const BugItem = ({ bug, onStatusChange, onDelete }) => {
  return (
    <div className="p-4 border rounded bg-white flex justify-between items-center">
      <div>
        <h3 className="font-bold">{bug.title}</h3>
        <p>{bug.description}</p>
        <p className="text-sm text-gray-500">Status: {bug.status}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onStatusChange(bug._id)}
          className="px-3 py-1 bg-yellow-400 rounded"
        >
          Next Status
        </button>
        <button
          onClick={() => onDelete(bug._id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BugItem;

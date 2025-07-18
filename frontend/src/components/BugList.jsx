import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BugItem from './BugItem';

const API_BASE_URL = 'https://week-6-test-debug-assignment-gatsheni528.onrender.com'; // your backend URL

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bugs on component mount
  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/bugs`);
        setBugs(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load bugs');
        setLoading(false);
      }
    };

    fetchBugs();
  }, []);

  // Handle status change: call backend to update status
  const handleStatusChange = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/api/bugs/${id}/status`);
      // Optimistically update UI
      setBugs((prevBugs) =>
        prevBugs.map((bug) =>
          bug._id === id ? { ...bug, status: getNextStatus(bug.status) } : bug
        )
      );
    } catch {
      alert('Failed to update status');
    }
  };

  // Function to get the next status (example)
  const getNextStatus = (currentStatus) => {
    const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    const currentIndex = statuses.indexOf(currentStatus);
    return statuses[(currentIndex + 1) % statuses.length];
  };

  // Handle bug deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/bugs/${id}`);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== id));
    } catch {
      alert('Failed to delete bug');
    }
  };

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bug Tracker</h2>
      {bugs.length === 0 ? (
        <p>No bugs found.</p>
      ) : (
        bugs.map((bug) => (
          <BugItem
            key={bug._id}
            bug={bug}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default BugList;

'use client';

import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTribute, setEditingTribute] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTribute, setNewTribute] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    tribute: '',
    category: 'general',
    approved: true
  });

  // Fetch tributes
  const fetchTributes = async () => {
    try {
      const response = await fetch('/api/tributes');
      const data = await response.json();
      setTributes(data.tributes || []);
    } catch (error) {
      console.error('Error fetching tributes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  // Delete tribute
  const deleteTribute = async (id) => {
    if (confirm('Are you sure you want to delete this tribute?')) {
      try {
        const response = await fetch(`/api/tributes/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchTributes(); // Refresh list
          alert('Tribute deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting tribute:', error);
        alert('Failed to delete tribute');
      }
    }
  };

  // Update tribute
  const updateTribute = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/tributes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchTributes(); // Refresh list
        setEditingTribute(null);
        alert('Tribute updated successfully!');
      }
    } catch (error) {
      console.error('Error updating tribute:', error);
      alert('Failed to update tribute');
    }
  };

  // Add new tribute
  const addTribute = async () => {
    try {
      const response = await fetch('/api/tributes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTribute),
      });
      if (response.ok) {
        fetchTributes(); // Refresh list
        setShowAddForm(false);
        setNewTribute({
          name: '',
          email: '',
          country: '',
          message: '',
          tribute: '',
          category: 'general',
          approved: true
        });
        alert('Tribute added successfully!');
      }
    } catch (error) {
      console.error('Error adding tribute:', error);
      alert('Failed to add tribute');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tributes...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel - Manage Tributes</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            {showAddForm ? 'Cancel' : 'Add New Tribute'}
          </button>
        </div>

        {/* Add New Tribute Form */}
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Tribute</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newTribute.name}
                onChange={(e) => setNewTribute({...newTribute, name: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={newTribute.email}
                onChange={(e) => setNewTribute({...newTribute, email: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Country"
                value={newTribute.country}
                onChange={(e) => setNewTribute({...newTribute, country: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              />
              <select
                value={newTribute.category}
                onChange={(e) => setNewTribute({...newTribute, category: e.target.value})}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="general">General Message</option>
                <option value="tribute">Personal Tribute</option>
                <option value="memory">Memory/Story</option>
                <option value="feedback">Website Feedback</option>
                <option value="music">Music Discussion</option>
              </select>
              <textarea
                placeholder="Message"
                value={newTribute.message}
                onChange={(e) => setNewTribute({...newTribute, message: e.target.value})}
                className="px-3 py-2 border rounded-lg md:col-span-2"
                rows={3}
              />
              <textarea
                placeholder="Tribute (optional)"
                value={newTribute.tribute}
                onChange={(e) => setNewTribute({...newTribute, tribute: e.target.value})}
                className="px-3 py-2 border rounded-lg md:col-span-2"
                rows={3}
              />
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newTribute.approved}
                    onChange={(e) => setNewTribute({...newTribute, approved: e.target.checked})}
                    className="mr-2"
                  />
                  Approved
                </label>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={addTribute}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mr-2"
              >
                Add Tribute
              </button>
            </div>
          </div>
        )}

        {/* Tributes List */}
        <div className="space-y-4">
          {tributes.map((tribute) => (
            <div key={tribute.id} className="border rounded-lg p-4">
              {editingTribute?.id === tribute.id ? (
                // Edit Form
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editingTribute.name}
                      onChange={(e) => setEditingTribute({...editingTribute, name: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="email"
                      value={editingTribute.email}
                      onChange={(e) => setEditingTribute({...editingTribute, email: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingTribute.country}
                      onChange={(e) => setEditingTribute({...editingTribute, country: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    />
                    <select
                      value={editingTribute.category}
                      onChange={(e) => setEditingTribute({...editingTribute, category: e.target.value})}
                      className="px-3 py-2 border rounded-lg"
                    >
                      <option value="general">General Message</option>
                      <option value="tribute">Personal Tribute</option>
                      <option value="memory">Memory/Story</option>
                      <option value="feedback">Website Feedback</option>
                      <option value="music">Music Discussion</option>
                    </select>
                  </div>
                  <textarea
                    value={editingTribute.message}
                    onChange={(e) => setEditingTribute({...editingTribute, message: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                  <textarea
                    value={editingTribute.tribute}
                    onChange={(e) => setEditingTribute({...editingTribute, tribute: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                  />
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingTribute.approved}
                        onChange={(e) => setEditingTribute({...editingTribute, approved: e.target.checked})}
                        className="mr-2"
                      />
                      Approved
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateTribute(tribute.id, editingTribute)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingTribute(null)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{tribute.name}</h3>
                      <p className="text-gray-600 text-sm">{tribute.email} • {tribute.country}</p>
                      <p className="text-gray-500 text-xs">{new Date(tribute.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTribute({...tribute})}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTribute(tribute.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {tribute.category}
                    </span>
                    {tribute.approved ? (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
                        Approved
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded ml-2">
                        Pending
                      </span>
                    )}
                  </div>
                  {tribute.tribute && (
                    <div className="mb-2">
                      <strong>Tribute:</strong> {tribute.tribute}
                    </div>
                  )}
                  <div>
                    <strong>Message:</strong> {tribute.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {tributes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tributes found. Start by adding one!
          </div>
        )}
      </div>
    </div>
  );
}

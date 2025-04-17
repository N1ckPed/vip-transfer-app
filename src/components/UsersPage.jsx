import React, { useState } from "react";
import { getUsers, saveUsers } from "../services/userService";


export default function UsersPage() {
  const [users, setUsers] = useState(getUsers());


  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    role: "Hotel",
    name: "",
    email: "",
    password: "",
  });

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({ role: "Hotel", name: "", email: "", password: "" });
    setShowModal(true);
  };

  const handleEdit = (userId) => {
    const user = users.find((u) => u.id === userId);
    setEditingUser(user);
    setFormData({
      role: user.role,
      name: user.name,
      email: user.email || "",
      password: "",
    });
    setShowModal(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== userId));
    }
	const updatedUsers = users.filter((u) => u.id !== userId);
setUsers(updatedUsers);
saveUsers(updatedUsers);

  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (formData.role !== "Driver" && (!formData.email || !formData.password)) {
      alert("Email and Password are required for this role");
      return;
    }

    if (editingUser) {
  const updatedUsers = users.map((u) =>
    u.id === editingUser.id
      ? { ...u, role: formData.role, name: formData.name, email: formData.email }
      : u
  );
  setUsers(updatedUsers);
  saveUsers(updatedUsers);
} else {
  const newUser = {
    id: Date.now(),
    role: formData.role,
    name: formData.name,
    email: formData.role !== "Driver" ? formData.email : "",
    password: formData.password
  };
  const updatedUsers = [...users, newUser];
  setUsers(updatedUsers);
  saveUsers(updatedUsers);
}


    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Create New User
      </button>

      <table className="w-full text-left border-collapse">
       <thead>
  <tr className="bg-gray-100">
    <th className="p-2 border">Name</th>
    <th className="p-2 border">Email</th>
    <th className="p-2 border">Role</th>
    <th className="p-2 border text-center">Actions</th>
  </tr>
</thead>
<tbody>
  {users.map((user) => (
    <tr key={user.id} className="border-t">
      <td className="p-2 border">{user.name}</td>
      <td className="p-2 border">{user.email || "-"}</td>
      <td className="p-2 border">{user.role}</td>
      <td className="p-2 border text-center space-x-2">
  <button
    onClick={() => handleEdit(user.id)}
    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(user.id)}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
  >
    Delete
  </button>
</td>

    </tr>
  ))}
</tbody>

      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Create New User"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role */}
              <div>
                <label className="block font-medium">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option>Hotel</option>
                  <option>Travel Agency</option>
                  <option>Driver</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="e.g. Creta Maris"
                />
              </div>

              {/* Email and Password (hide if Driver) */}
              {formData.role !== "Driver" && (
                <>
                  <div>
                    <label className="block font-medium">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="e.g. contact@hotel.com"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="********"
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

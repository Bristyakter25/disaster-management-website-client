import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
        setLoading(false);
      });
  }, []);

  const fetchUsers = () => {
  fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    });
};
  // Handle user role update
 const handleUpdateRole = (userId, newRole) => {
  fetch(`http://localhost:5000/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role: newRole }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.modifiedCount > 0) {
        fetchUsers();
        Swal.fire({
          icon: 'success',
          title: 'Role Updated',
          text: 'The user role has been updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    })
    .catch(err => {
      console.error('Role update failed', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the user role.',
      });
    });
};


  // Handle user deletion
  const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won’t be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            fetchUsers();
            Swal.fire(
              'Deleted!',
              'User has been deleted.',
              'success'
            );
          }
        })
        .catch(err => {
          console.error('Delete failed', err);
          Swal.fire('Error', 'Failed to delete user.', 'error');
        });
    }
  });
};

  if (loading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <h2 className="text-3xl font-bold mb-5 text-center">Manage Users</h2>
      <table className="table w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Role</th>
            <th>Update Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="dark:text-white">
          {users.map((user, index) => (
            <tr key={user._id} className="border-b dark:border-gray-600">
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={user.photo}
                  alt="user"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td>{user.role}</td>
             <td>
  <select
    value={user.role}
    onChange={(e) => handleUpdateRole(user._id, e.target.value)}
    className="select select-sm select-bordered"
  >
    <option value="Admin">Admin</option>
    <option value="Rescue Member">Rescue Member</option>
    <option value="Citizen">Citizen</option>
  </select>
</td>

              <td>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-5 text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;

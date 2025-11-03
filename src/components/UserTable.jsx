// import React, { useEffect, useState } from 'react';
// import { FaEdit, FaEnvelope, FaKey, FaShieldAlt, FaTimes, FaUserCircle, FaUserPlus } from 'react-icons/fa';

// // A simple toast notification function
// const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     toast.textContent = message;
//     const bgColor = type === 'success' ? '#4ade80' : '#ef4444';
//     toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 10000;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//   `;
//     document.body.appendChild(toast);
//     setTimeout(() => document.body.removeChild(toast), 3000);
// };

// // --- Create User Modal Component ---
// const CreateUserModal = ({ onClose, onUserCreated }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         fullName: '',
//         email: '',
//         password: '',
//         role: 'user',
//     });
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== confirmPassword) {
//             setError('Passwords do not match.');
//             return;
//         }
//         if (formData.password.length < 5) {
//             setError('Password must be at least 5 characters long.');
//             return;
//         }

//         setIsLoading(true);
//         setError('');

//         try {
//             const response = await fetch('https://timesheet-subk.onrender.com/api/User', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => null);
//                 throw new Error(errorData?.message || 'Failed to create user.');
//             }

//             showToast('User created successfully!', 'success');
//             onUserCreated();
//             onClose();

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes size={20} /></button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Username</label>
//                             <input type="text" name="username" onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                             <input type="text" name="fullName" onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input type="email" name="email" onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Password</label>
//                             <input type="password" name="password" onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//                             <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                         </div>
//                     </div>
//                      <div>
//                         <label className="block text-sm font-medium text-gray-700">Role</label>
//                         <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg bg-white">
//                             <option value="user">User</option>
//                             <option value="pm">PM</option>
//                             <option value="admin">Admin</option>
//                         </select>
//                     </div>
//                     {error && <p className="text-sm text-red-600 text-center">{error}</p>}
//                     <div className="flex justify-end pt-4">
//                         <button type="submit" disabled={isLoading} className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg w-full disabled:opacity-50">
//                             {isLoading ? 'Creating...' : 'Create User'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // --- Edit User Modal Component ---
// const EditUserModal = ({ user, onClose, onUserUpdated }) => {
//     const [formData, setFormData] = useState({
//         userId: user.userId,
//         fullName: user.fullName || '',
//         email: user.email || '',
//         role: user.role || 'user',
//         isActive: user.isActive,
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value, type } = e.target;
//         const newValue = type === 'select-one' && (name === 'isActive') ? value === 'true' : value;
//         setFormData({ ...formData, [name]: newValue });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError('');

//         try {
//             const response = await fetch(`https://timesheet-subk.onrender.com/api/User/${user.userId}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => null);
//                 throw new Error(errorData?.message || 'Failed to update user.');
//             }

//             showToast('User updated successfully!', 'success');
//             onUserUpdated();
//             onClose();

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">Edit User: {user.username}</h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes size={20} /></button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                         <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Role</label>
//                             <select name="role" value={formData.role} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg bg-white">
//                                 <option value="user">User</option>
//                                 <option value="pm">PM</option>
//                                 <option value="admin">Admin</option>
//                             </select>
//                         </div>
//                         <div>
//                            <label className="block text-sm font-medium text-gray-700">Status</label>
//                             <select name="isActive" value={formData.isActive} onChange={handleChange} className="w-full mt-1 px-3 py-2 border rounded-lg bg-white">
//                                 <option value={true}>Active</option>
//                                 <option value={false}>Inactive</option>
//                             </select>
//                         </div>
//                     </div>
//                     {error && <p className="text-sm text-red-600 text-center">{error}</p>}
//                     <div className="flex justify-end pt-4">
//                         <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg w-full disabled:opacity-50">
//                             {isLoading ? 'Saving...' : 'Save Changes'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // --- Password Modal Component ---
// const PasswordModal = ({ user, type, onClose }) => {
//     const [oldPassword, setOldPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             setError('New passwords do not match.');
//             return;
//         }
//         if (newPassword.length < 5) {
//             setError('Password must be at least 5 characters long.');
//             return;
//         }

//         setIsLoading(true);
//         setError('');

//         const isReset = type === 'reset';
//         const url = `https://timesheet-subk.onrender.com/api/User/${user.userId}/${isReset ? 'reset-password' : 'update-password'}`;
//         const body = isReset ? { newPassword } : { currentPassword: oldPassword, newPassword };

//         try {
//             const response = await fetch(url, {
//                 method: isReset ?  'PUT':'POST' ,
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(body),
//             });

//             if (response.ok) {
//                 showToast('Password updated successfully!', 'success');
//                 onClose();
//                 return;
//             }

//             const errorData = await response.json().catch(() => null);
//             throw new Error(errorData?.message || `Request failed with status ${response.status}`);

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-gray-800">
//                         {type === 'reset' ? `Reset Password for ${user.username}` : 'Update Your Password'}
//                     </h2>
//                     <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes size={20} /></button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {type === 'update' && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Current Password</label>
//                             <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                         </div>
//                     )}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">New Password</label>
//                         <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
//                         <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
//                     </div>
//                     {error && <p className="text-sm text-red-600">{error}</p>}
//                     <div className="flex justify-end pt-4">
//                         <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50">
//                             {isLoading ? 'Updating...' : 'Update Password'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// // --- Skeleton Loader for Profile Card ---
// const ProfileCardSkeleton = () => (
//     <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 pl-52">
//         <div className="max-w-4xl mx-auto">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
//                 <div className="p-8">
//                     <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//                         <div className="w-24 h-24 bg-gray-200 rounded-full ring-4 ring-gray-200"></div>
//                         <div className="w-full sm:w-auto">
//                             <div className="h-9 bg-gray-200 rounded w-3/4 sm:w-64 mx-auto sm:mx-0"></div>
//                         </div>
//                     </div>
//                 </div>
//                 <hr />
//                 <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {[...Array(4)].map((_, i) => (
//                         <div key={i} className="flex items-center space-x-3">
//                             <div className="w-6 h-6 bg-gray-200 rounded"></div>
//                             <div className="w-full space-y-2">
//                                 <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                                 <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="p-8 bg-gray-50 border-t">
//                     <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                     <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// // --- Main UserTable Component ---
// export default function UserTable() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [isAdmin, setIsAdmin] = useState(false);

//     const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [modalType, setModalType] = useState('');
//     const [refreshTrigger, setRefreshTrigger] = useState(0);

//     useEffect(() => {
//         const userInfo = localStorage.getItem('currentUser');
//         if (userInfo) {
//             try {
//                 const parsedUser = JSON.parse(userInfo);
//                 setCurrentUser(parsedUser);
//                 if (parsedUser.role && parsedUser.role.toLowerCase() === 'admin') {
//                     setIsAdmin(true);
//                 }
//             } catch (e) { console.error("Failed to parse user info", e); }
//         } else {
//           setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             if (!currentUser) return;

//             const baseApiUrl = 'https://timesheet-subk.onrender.com/api/User';
//             let apiUrl;

//             if (isAdmin) {
//                 apiUrl = baseApiUrl;
//             } else {
//                 const userIdToFetch = currentUser.userId || currentUser.approvalUserId;

//                 if (userIdToFetch) {
//                     apiUrl = `${baseApiUrl}/${userIdToFetch}`;
//                 } else {
//                     setError("Your user ID could not be found.");
//                     setLoading(false);
//                     return;
//                 }
//             }

//             try {
//                 setLoading(true);
//                 const response = await fetch(apiUrl);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();
//                 setUsers(Array.isArray(data) ? data : [data]);
//             } catch (e) {
//                 setError(e.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, [currentUser, isAdmin, refreshTrigger]);

//     const openPasswordModal = (user, type) => {
//         setSelectedUser(user);
//         setModalType(type);
//         setIsPasswordModalOpen(true);
//     };

//     const openEditModal = (user) => {
//         setSelectedUser(user);
//         setIsEditModalOpen(true);
//     };

//     const getInitials = (name = '') => {
//         const names = name.split(' ');
//         if (names.length > 1 && names[0] && names[names.length - 1]) {
//             return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
//         }
//         return name.substring(0, 2).toUpperCase();
//     };

//     // --- Admin View ---
//     if (isAdmin) {
//         return (
//             <>
//                 {isPasswordModalOpen && <PasswordModal user={selectedUser} type={modalType} onClose={() => setIsPasswordModalOpen(false)} />}
//                 {isCreateModalOpen && <CreateUserModal onClose={() => setIsCreateModalOpen(false)} onUserCreated={() => setRefreshTrigger(t => t + 1)} />}
//                 {isEditModalOpen && <EditUserModal user={selectedUser} onClose={() => setIsEditModalOpen(false)} onUserUpdated={() => setRefreshTrigger(t => t + 1)} />}

//                 <div className="min-h-screen bg-slate-50 flex flex-col pl-52 pr-8 py-8">
//                     <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-center mb-6">
//                             <h1 className="text-4xl font-bold text-gray-800">User Management</h1>
//                             <button onClick={() => setIsCreateModalOpen(true)} className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-green-500/50">
//                                 <FaUserPlus /> Create User
//                             </button>
//                         </div>

//                         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//                             <div className="overflow-y-auto max-h-[calc(100vh-220px)]">
//                                 <table className="min-w-full">
//                                     <thead className="bg-slate-100 border-b-2 border-slate-200 sticky top-0">
//                                         <tr>
//                                             <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">User</th>
//                                             <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Username</th>
//                                             <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Role</th>
//                                             <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Status</th>
//                                             <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-200">
//                                         {loading ? (
//                                             <tr><td colSpan="5" className="text-center py-10">Loading users...</td></tr>
//                                         ) : error ? (
//                                             <tr><td colSpan="5" className="text-center py-10 text-red-500">Error: {error}</td></tr>
//                                         ) : (
//                                             users.map((user) => (
//                                                 <tr key={user.userId} className="hover:bg-sky-50 transition-colors">
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <div className="flex items-center space-x-4">
//                                                             <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
//                                                                 {getInitials(user.fullName)}
//                                                             </div>
//                                                             <div>
//                                                                 <div className="text-sm font-semibold text-gray-900">{user.fullName}</div>
//                                                                 <div className="text-xs text-gray-500">{user.email}</div>
//                                                             </div>
//                                                         </div>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{user.username}</td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                          <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${
//                                                             user.role.toLowerCase() === 'admin' ? 'bg-indigo-100 text-indigo-800' :
//                                                             user.role.toLowerCase() === 'pm' ? 'bg-sky-100 text-sky-800' :
//                                                             'bg-slate-100 text-slate-800'
//                                                         }`}>
//                                                             {user.role}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <span className={`px-3 py-1 text-xs leading-5 font-bold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                                             {user.isActive ? 'Active' : 'Inactive'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
//                                                         <div className='flex items-center gap-4'>
//                                                             <button onClick={() => openEditModal(user)} className="text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors">
//                                                                 <FaEdit size={12} /> Edit
//                                                             </button>
//                                                             <button onClick={() => openPasswordModal(user, 'reset')} className="text-red-600 hover:text-red-800 flex items-center gap-1.5 transition-colors">
//                                                                 <FaKey size={12} /> Reset Password
//                                                             </button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))
//                                         )}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     }

//     // --- Non-Admin (User & PM) View ---
//     if (loading) return <ProfileCardSkeleton />;
//     if (error) return <div className="min-h-screen bg-slate-50 pl-52 flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
//     if (users.length === 0) return <div className="min-h-screen bg-slate-50 pl-52 flex items-center justify-center"><p>Could not find user profile.</p></div>;

//     const user = users[0];
//     return (
//         <>
//             {isPasswordModalOpen && <PasswordModal user={selectedUser} type={modalType} onClose={() => setIsPasswordModalOpen(false)} />}
//             <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 pl-52">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                         <div className="p-8">
//                             <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
//                                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-200">
//                                     <span className="text-4xl font-bold text-blue-600">{getInitials(user.fullName)}</span>
//                                 </div>
//                                 <div>
//                                     <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">{user.fullName}</h1>
//                                 </div>
//                             </div>
//                         </div>

//                         <hr />

//                         <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//                             <div className="flex items-center space-x-3">
//                                 <FaUserCircle className="h-6 w-6 text-gray-400" />
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-500">Username</label>
//                                     <p className="text-lg text-gray-800">{user.username}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <FaEnvelope className="h-6 w-6 text-gray-400" />
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-500">Email Address</label>
//                                     <p className="text-lg text-gray-800">{user.email}</p>
//                                 </div>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                                 <FaShieldAlt className="h-6 w-6 text-gray-400" />
//                                 <div>
//                                     <label className="text-sm font-semibold text-gray-500">Role</label>
//                                     <p className="text-lg text-gray-800 capitalize">{user.role}</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="text-sm font-semibold text-gray-500 mb-2 block">Status</label>
//                                 <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                                     {user.isActive ? 'Active' : 'Inactive'}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="p-8 bg-gray-50 border-t">
//                             <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Actions</h3>
//                             <button onClick={() => openPasswordModal(user, 'update')} className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
//                                 <FaKey size={14} />
//                                 <span>Update Password</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaKey,
  FaShieldAlt,
  FaTimes,
  FaUserCircle,
  FaUserPlus,
  FaSearch,
  FaPlay, // ← ADD THIS
  FaPause, // ← ADD THIS
  FaSpinner,
} from "react-icons/fa";
import { backendUrl } from "./config";

// A simple toast notification function
const showToast = (message, type = "info") => {
  const toast = document.createElement("div");
  toast.textContent = message;
  const bgColor = type === "success" ? "#4ade80" : "#ef4444";
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), 3000);
};

// --- Create User Modal Component (with Enhanced Error Handling) ---
const CreateUserModal = ({ onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To hold validation errors for each field
  const [serverError, setServerError] = useState(""); // For errors from the API
  const [activationLoading, setActivationLoading] = useState({});

  // --- Validation Logic ---
  const validate = (fieldValues = formData, confirmPass = confirmPassword) => {
    let tempErrors = { ...errors };

    if ("username" in fieldValues) {
      tempErrors.username = fieldValues.username ? "" : "Username is required.";
      if (fieldValues.username && fieldValues.username.length < 3) {
        tempErrors.username = "Username must be at least 3 characters long.";
      }
    }
    if ("fullName" in fieldValues) {
      tempErrors.fullName = fieldValues.fullName
        ? ""
        : "Full Name is required.";
    }
    if ("email" in fieldValues) {
      tempErrors.email = fieldValues.email ? "" : "Email is required.";
      if (fieldValues.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValues.email)) {
          tempErrors.email = "Email is not valid.";
        }
      }
    }
    if ("password" in fieldValues) {
      tempErrors.password = fieldValues.password ? "" : "Password is required.";
      if (fieldValues.password && fieldValues.password.length < 5) {
        tempErrors.password = "Password must be at least 5 characters long.";
      }
    }
    if ("confirmPassword" in fieldValues || "password" in fieldValues) {
      tempErrors.confirmPassword = confirmPass
        ? ""
        : "Please confirm your password.";
      if (confirmPass && fieldValues.password !== confirmPass) {
        tempErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validate({ password: formData.password, confirmPassword: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate(formData, confirmPassword)) {
      setIsLoading(true);
      setServerError("");
      try {
        const response = await fetch(
          "https://timesheet-subk.onrender.com/api/User",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || "Failed to create user.");
        }

        showToast("User created successfully!", "success");
        onUserCreated();
        onClose();
      } catch (err) {
        if (err.message.includes("Failed to fetch")) {
          setServerError(
            "Username or email may already be in use. Please try different ones."
          );
        } else {
          setServerError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Create New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full mt-1 px-3 py-2 border rounded-lg ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white border-gray-300"
            >
              <option value="user">User</option>
              <option value="pm">PM</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {serverError && (
            <p className="text-sm text-red-600 text-center">{serverError}</p>
          )}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg w-full disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Edit User Modal Component ---
const EditUserModal = ({ user, onClose, onUserUpdated }) => {
  const [formData, setFormData] = useState({
    userId: user.userId,
    fullName: user.fullName || "",
    email: user.email || "",
    role: user.role || "user",
    isActive: user.isActive,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "select-one" && name === "isActive" ? value === "true" : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://timesheet-subk.onrender.com/api/User/${user.userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update user.");
      }

      showToast("User updated successfully!", "success");
      onUserUpdated();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit User: {user.username}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
              >
                <option value="user">User</option>
                <option value="pm">PM</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-white"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg w-full disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Password Modal Component ---
const PasswordModal = ({ user, type, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 5) {
      setError("Password must be at least 5 characters long.");
      return;
    }

    setIsLoading(true);
    setError("");

    const isReset = type === "reset";
    const url = `https://timesheet-subk.onrender.com/api/User/${user.userId}/${
      isReset ? "reset-password" : "update-password"
    }`;
    const body = isReset
      ? { newPassword }
      : { currentPassword: oldPassword, newPassword };

    try {
      const response = await fetch(url, {
        method: isReset ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        showToast("Password updated successfully!", "success");
        onClose();
        return;
      }

      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || `Request failed with status ${response.status}`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {type === "reset"
              ? `Reset Password for ${user.username}`
              : "Update Your Password"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "update" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Skeleton Loader for Profile Card ---
const ProfileCardSkeleton = () => (
  <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 ml-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full ring-4 ring-gray-200"></div>
            <div className="w-full sm:w-auto">
              <div className="h-9 bg-gray-200 rounded w-3/4 sm:w-64 mx-auto sm:mx-0"></div>
            </div>
          </div>
        </div>
        <hr />
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="w-full space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-8 bg-gray-50 border-t">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded-lg w-48"></div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main UserTable Component ---
export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activationLoading, setActivationLoading] = useState({});
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        if (parsedUser.role && parsedUser.role.toLowerCase() === "admin") {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Failed to parse user info", e);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!currentUser) return;

      const baseApiUrl = "https://timesheet-subk.onrender.com/api/User";
      let apiUrl;

      if (isAdmin) {
        apiUrl = baseApiUrl;
      } else {
        const userIdToFetch = currentUser.userId || currentUser.approvalUserId;

        if (userIdToFetch) {
          apiUrl = `${baseApiUrl}/${userIdToFetch}`;
        } else {
          setError("Your user ID could not be found.");
          setLoading(false);
          return;
        }
      }

      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : [data]);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser, isAdmin, refreshTrigger]);

  const openPasswordModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setIsPasswordModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const getInitials = (name = "") => {
    const names = name.split(" ");
    if (names.length > 1 && names[0] && names[names.length - 1]) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleActivateUser = async (user) => {
    try {
      setActivationLoading((prev) => ({ ...prev, [user.userId]: true }));

      const requestBody = {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: true, // Set to true for activation
      };

      const response = await fetch(`${backendUrl}/api/User/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to activate user");
      }

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userId === user.userId ? { ...u, isActive: true } : u
        )
      );

      showToast(`User ${user.fullName} activated successfully!`, "success");
    } catch (error) {
      showToast(`Failed to activate user: ${error.message}`, "error");
    } finally {
      setActivationLoading((prev) => ({ ...prev, [user.userId]: false }));
    }
  };

  const handleDeactivateUser = async (user) => {
    try {
      setActivationLoading((prev) => ({ ...prev, [user.userId]: true }));

      const requestBody = {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        isActive: false, // Set to false for deactivation
      };

      const response = await fetch(`${backendUrl}/api/User/${user.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to deactivate user");
      }

      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.userId === user.userId ? { ...u, isActive: false } : u
        )
      );

      showToast(`User ${user.fullName} deactivated successfully!`, "success");
    } catch (error) {
      showToast(`Failed to deactivate user: ${error.message}`, "error");
    } finally {
      setActivationLoading((prev) => ({ ...prev, [user.userId]: false }));
    }
  };

  // --- Admin View ---
  if (isAdmin) {
    // More robust filtering logic
    const filteredUsers = users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        (user.fullName && user.fullName.toLowerCase().includes(query)) ||
        (user.username && user.username.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query)) ||
        (user.role && user.role.toLowerCase().includes(query))
      );
    });

    return (
      <>
        {isPasswordModalOpen && (
          <PasswordModal
            user={selectedUser}
            type={modalType}
            onClose={() => setIsPasswordModalOpen(false)}
          />
        )}
        {isCreateModalOpen && (
          <CreateUserModal
            onClose={() => setIsCreateModalOpen(false)}
            onUserCreated={() => setRefreshTrigger((t) => t + 1)}
          />
        )}
        {isEditModalOpen && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setIsEditModalOpen(false)}
            onUserUpdated={() => setRefreshTrigger((t) => t + 1)}
          />
        )}

        <div className="min-h-screen bg-slate-50 flex flex-col ml-4 pr-8 py-8">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6 gap-4">
              <h1 className="text-4xl font-bold text-gray-800">
                User Management
              </h1>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, username, email, or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 shadow-lg hover:shadow-green-500/50"
                >
                  <FaUserPlus /> Create User
                </button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-2xl bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
              <div className="relative">
                <div className="overflow-x-auto max-h-[75vh] mt-1">
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-slate-100 border-b-2 border-slate-200 sticky top-0 ">
                      <tr>
                        <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-bold text-slate-700 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-10">
                            Loading users...
                          </td>
                        </tr>
                      ) : error ? (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-10 text-red-500"
                          >
                            Error: {error}
                          </td>
                        </tr>
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr
                            key={user.userId}
                            className="hover:bg-sky-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
                                  {getInitials(user.fullName)}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {user.fullName}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {user.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                              {user.username}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${
                                  user.role?.toLowerCase() === "admin"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : user.role?.toLowerCase() === "pm"
                                    ? "bg-sky-100 text-sky-800"
                                    : "bg-slate-100 text-slate-800"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-3 py-1 text-xs leading-5 font-bold rounded-full ${
                                  user.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {user.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => openEditModal(user)}
                                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors"
                                >
                                  <FaEdit size={12} /> Edit
                                </button>
                                <button
                                  onClick={() =>
                                    openPasswordModal(user, "reset")
                                  }
                                  className="text-yellow-500 hover:text-yellow-700 flex items-center gap-1.5 transition-colors"
                                >
                                  <FaKey size={12} /> Reset Password
                                </button>
                                {currentUser?.role?.toLowerCase() ===
                                  "admin" && (
                                  <>
                                    {!user.isActive ? (
                                      <button
                                        onClick={() => handleActivateUser(user)}
                                        disabled={
                                          activationLoading[user.userId]
                                        }
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed rounded-md transition-colors"
                                        title="Activate User"
                                      >
                                        {activationLoading[user.userId] ? (
                                          <>
                                            <FaSpinner
                                              className="animate-spin mr-1"
                                              size={10}
                                            />
                                            <span>Activating...</span>
                                          </>
                                        ) : (
                                          <>
                                            <FaPlay
                                              className="mr-1 "
                                              size={10}
                                            />
                                            <span>Activate</span>
                                          </>
                                        )}
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          handleDeactivateUser(user)
                                        }
                                        disabled={
                                          activationLoading[user.userId]
                                        }
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed rounded-md transition-colors"
                                        title="Deactivate User"
                                      >
                                        {activationLoading[user.userId] ? (
                                          <>
                                            <FaSpinner
                                              className="animate-spin mr-1"
                                              size={10}
                                            />
                                            <span>Deactivating...</span>
                                          </>
                                        ) : (
                                          <>
                                            <FaPause
                                              className="mr-1"
                                              size={10}
                                            />
                                            <span>Deactivate</span>
                                          </>
                                        )}
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="5"
                            className="text-center py-10 text-gray-500"
                          >
                            No users found matching your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // --- Non-Admin (User & PM) View ---
  if (loading) return <ProfileCardSkeleton />;
  if (error)
    return (
      <div className="min-h-screen bg-slate-50 ml-4 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  if (users.length === 0)
    return (
      <div className="min-h-screen bg-slate-50 ml-4 flex items-center justify-center">
        <p>Could not find user profile.</p>
      </div>
    );

  const user = users[0];
  return (
    <>
      {isPasswordModalOpen && (
        <PasswordModal
          user={selectedUser}
          type={modalType}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 ml-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-200">
                  <span className="text-4xl font-bold text-blue-600">
                    {getInitials(user.fullName)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">
                    {user.fullName}
                  </h1>
                </div>
              </div>
            </div>

            <hr />

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center space-x-3">
                <FaUserCircle className="h-6 w-6 text-gray-400" />
                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Username
                  </label>
                  <p className="text-lg text-gray-800">{user.username}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-6 w-6 text-gray-400" />
                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Email Address
                  </label>
                  <p className="text-lg text-gray-800">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="h-6 w-6 text-gray-400" />
                <div>
                  <label className="text-sm font-semibold text-gray-500">
                    Role
                  </label>
                  <p className="text-lg text-gray-800 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-500 mb-2 block">
                  Status
                </label>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    user.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="p-8 bg-gray-50 border-t">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Account Actions
              </h3>
              <button
                onClick={() => openPasswordModal(user, "update")}
                className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FaKey size={14} />
                <span>Update Password</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

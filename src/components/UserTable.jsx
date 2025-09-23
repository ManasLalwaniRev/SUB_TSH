import React, { useEffect, useState } from 'react';
import { FaEdit, FaEnvelope, FaKey, FaShieldAlt, FaTimes, FaUserCircle, FaUserPlus } from 'react-icons/fa';

// A simple toast notification function
const showToast = (message, type = 'info') => {
  const toast = document.createElement('div');
  toast.textContent = message;
  const bgColor = type === 'success' ? '#4ade80' : '#ef4444';
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(toast);
  setTimeout(() => document.body.removeChild(toast), 3000);
};


// --- Password Modal Component ---
const PasswordModal = ({ user, type, onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 5) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);
        setError('');

        const isReset = type === 'reset';
        const url = `https://timesheet-subk.onrender.com/api/User/${user.userId}/${isReset ? 'reset-password' : 'update-password'}`;
        const body = isReset ? { newPassword } : { currentPassword: oldPassword, newPassword };

        try {
            const response = await fetch(url, {
                method: isReset ? 'POST' : 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                showToast('Password updated successfully!', 'success');
                onClose();
                return; 
            }
            
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Request failed with status ${response.status}`);

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
                        {type === 'reset' ? `Reset Password for ${user.username}` : 'Update Your Password'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FaTimes size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {type === 'update' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Current Password</label>
                            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg" required />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={isLoading} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full disabled:opacity-50">
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Skeleton Loader for Profile Card ---
const ProfileCardSkeleton = () => (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 pl-52">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                {/* Skeleton Header */}
                <div className="p-8">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full ring-4 ring-gray-200"></div>
                        <div className="w-full sm:w-auto">
                            <div className="h-9 bg-gray-200 rounded w-3/4 sm:w-64 mx-auto sm:mx-0"></div>
                        </div>
                    </div>
                </div>
                <hr />
                {/* Skeleton Details */}
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
                {/* Skeleton Actions */}
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
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            try {
                const parsedUser = JSON.parse(userInfo);
                setCurrentUser(parsedUser);
                if (parsedUser.role && parsedUser.role.toLowerCase() === 'admin') {
                    setIsAdmin(true);
                }
            } catch (e) { console.error("Failed to parse user info", e); }
        } else {
          setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!currentUser) return;
        
        const fetchUsers = async () => {
            const baseApiUrl = 'https://timesheet-subk.onrender.com/api/User';
            const apiUrl = isAdmin ? baseApiUrl : `${baseApiUrl}/${currentUser.userId}`;

            if (!isAdmin && !currentUser.userId) {
                setError("Your user ID could not be found.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setUsers(Array.isArray(data) ? data : [data]);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentUser, isAdmin]);

    const openPasswordModal = (user, type) => {
        setSelectedUser(user);
        setModalType(type);
        setIsModalOpen(true);
    };

    const getInitials = (name = '') => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };
    
    // --- Admin View ---
    if (isAdmin) {
        return (
            <>
                {isModalOpen && <PasswordModal user={selectedUser} type={modalType} onClose={() => setIsModalOpen(false)} />}
                
                <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-52 pr-4">
                    <div className="flex-1 flex flex-col items-center justify-start pt-8">
                        <div className="w-full max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                                <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 flex items-center gap-2">
                                    <FaUserPlus /> Create User
                                </button>
                            </div>

                            <div className="bg-white shadow-lg rounded-2xl overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {loading ? (
                                            <tr><td colSpan="6" className="text-center py-4">Loading users...</td></tr>
                                        ) : error ? (
                                            <tr><td colSpan="6" className="text-center py-4 text-red-500">Error: {error}</td></tr>
                                        ) : (
                                            users.map(user => (
                                                <tr key={user.userId}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.username}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.fullName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{user.role}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {user.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button onClick={() => openPasswordModal(user, 'reset')} className="text-red-600 hover:text-red-900 flex items-center gap-1.5">
                                                            <FaKey size={12} /> Reset Password
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // --- Non-Admin (User & PM) View: Profile Card ---
    if (loading) return <ProfileCardSkeleton />;
    if (error) return <div className="min-h-screen bg-slate-50 pl-52 flex items-center justify-center"><p className="text-red-500">Error: {error}</p></div>;
    if (users.length === 0) return <div className="min-h-screen bg-slate-50 pl-52 flex items-center justify-center"><p>Could not find user profile.</p></div>;

    const user = users[0];
    return (
        <>
            {isModalOpen && <PasswordModal user={selectedUser} type={modalType} onClose={() => setIsModalOpen(false)} />}
            <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 pl-52">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Profile Header */}
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center ring-4 ring-blue-200">
                                    <span className="text-4xl font-bold text-blue-600">{getInitials(user.fullName)}</span>
                                </div>
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">{user.fullName}</h1>
                                </div>
                            </div>
                        </div>

                        <hr />

                        {/* Profile Details */}
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center space-x-3">
                                <FaUserCircle className="h-6 w-6 text-gray-400" />
                                <div>
                                    <label className="text-sm font-semibold text-gray-500">Username</label>
                                    <p className="text-lg text-gray-800">{user.username}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaEnvelope className="h-6 w-6 text-gray-400" />
                                <div>
                                    <label className="text-sm font-semibold text-gray-500">Email Address</label>
                                    <p className="text-lg text-gray-800">{user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaShieldAlt className="h-6 w-6 text-gray-400" />
                                <div>
                                    <label className="text-sm font-semibold text-gray-500">Role</label>
                                    <p className="text-lg text-gray-800 capitalize">{user.role}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-500 mb-2 block">Status</label>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        {/* Profile Actions */}
                        <div className="p-8 bg-gray-50 border-t">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Actions</h3>
                            <button onClick={() => openPasswordModal(user, 'update')} className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
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
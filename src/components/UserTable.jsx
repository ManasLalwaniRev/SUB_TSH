// // components/UserTable.jsx
// import React from "react";

// const userRows = [
//   { userId: "U001", userName: "Rahul Kumar", vendorName: "Infosys" },
//   { userId: "U002", userName: "Sneha Patel", vendorName: "TCS" },
//   { userId: "U003", userName: "Ryan Jose", vendorName: "Wipro" },
// ];

// export default function UserTable() {
//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="border border-gray-300 rounded bg-white shadow"
//                style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)", minWidth: 300, padding: "0.5rem", minHeight: "220px", maxHeight: "70vh", overflow: "hidden", marginBottom: "0px" }}>
//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "50vh",
//                 minHeight: "70px",
//                 width: "100%",
//               }}
//             >
//               <table style={{ borderCollapse: "collapse", fontSize: "12px", minWidth: "650px", width: "max-content" }}>
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 10 }}>
//                   <tr>
//                     <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 160, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>User ID</th>
//                     <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 180, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>User Name</th>
//                     <th style={{ border: "1px solid #d1d5db", padding: "8px", fontSize: "13px", minWidth: 180, fontWeight: "bold", color: "#1e40af", textAlign: "left", whiteSpace: "nowrap" }}>Vendor Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userRows.map((row, idx) => (
//                     <tr key={row.userId}
//                       style={{
//                         backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white",
//                       }}>
//                       <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 160 }}>{row.userId}</td>
//                       <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 180 }}>{row.userName}</td>
//                       <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 180 }}>{row.vendorName}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             {/* <div className="flex gap-8 justify-start items-center mt-3 pt-2 border-t border-gray-200 w-full pl-2">
//               <span className="text-xs font-medium text-blue-700">Users</span>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaTimes, FaEdit } from 'react-icons/fa';

// --- Reusable User Modal Component (for Create and Edit) ---
const UserModal = ({ onSave, onCancel, user = null }) => {
    const [username, setUsername] = useState(user ? user.userName : '');
    const [vendor, setVendor] = useState(user ? user.vendorName : '');
    const [error, setError] = useState('');

    const isEditing = !!user;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !vendor) {
            setError('Username and Vendor are required.');
            return;
        }
        setError('');
        onSave({ 
            userId: user ? user.userId : null, 
            userName: username, 
            vendorName: vendor 
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{isEditing ? 'Edit User' : 'Create New User'}</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-800"><FaTimes size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Vendor</label>
                        <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} className="w-full mt-1 px-4 py-2 border rounded-lg" required />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">{isEditing ? 'Update' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // --- Using static data as requested ---
    useEffect(() => {
        const staticUsers = [
            { userId: "U001", userName: "Rahul Kumar", vendorName: "Infosys" },
            { userId: "U002", userName: "Sneha Patel", vendorName: "TCS" },
            { userId: "U003", userName: "Ryan Jose", vendorName: "Wipro" },
        ].map(user => ({
            ...user,
            avatarUrl: `https://api.dicebear.com/8.x/micah/svg?seed=${user.userName.split(' ')[0]}`
        }));
        setUsers(staticUsers);
    }, []);
    
    const handleSaveUser = (userData) => {
        console.log("Saving user:", userData);
        if (userData.userId) {
            setUsers(users.map(u => u.userId === userData.userId ? { ...u, ...userData } : u));
        } else {
            const newUser = { ...userData, userId: `U${users.length + 1}`, avatarUrl: `https://api.dicebear.com/8.x/micah/svg?seed=${userData.userName}` };
            setUsers([...users, newUser]);
        }
        setIsModalOpen(false);
        setEditingUser(null);
    };

    const openModal = (user = null) => {
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const filteredUsers = users.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {isModalOpen && <UserModal onSave={handleSaveUser} onCancel={() => setIsModalOpen(false)} user={editingUser} />}
            <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
                <div className="flex-1 flex flex-col items-center justify-start pt-8">
                    <div className="w-full max-w-6xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                            <button onClick={() => openModal()} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 flex items-center gap-2">
                                <FaUserPlus /> Create User
                            </button>
                        </div>
                        <div className="relative mb-4">
                            <FaSearch className="absolute top-3 left-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or vendor..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                        <th className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {loading ? (
                                        <tr><td colSpan="3" className="text-center py-4">Loading...</td></tr>
                                    ) : (
                                        filteredUsers.map(user => (
                                            <tr key={user.userId}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-4">
                                                    <img src={user.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
                                                    {user.userName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.vendorName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button onClick={() => openModal(user)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1">
                                                        <FaEdit /> Edit
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
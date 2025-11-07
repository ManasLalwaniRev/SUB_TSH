import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from './config.jsx';


const showToast = (message, type = 'info') => {
  const bgColor = type === 'success' ? '#4ade80'
    : type === 'error' ? '#ef4444'
      : type === 'warning' ? '#f59e0b' : '#3b82f6';
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1000);
};

const UpdatePasswordModal = ({ isOpen, userId, onClose }) => {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setForm({ currentPassword: '', newPassword: '' });
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!form.currentPassword || !form.newPassword) {
      showToast('Both fields are required', 'warning');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/update-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      });
      if (res.ok) {
        showToast('Password updated successfully', 'success');
        setForm({ currentPassword: '', newPassword: '' });
        onClose();
      } else {
        const errorText = await res.text();
        showToast(errorText || 'Update failed', 'error');
      }
    } catch (error) {
      showToast('Update failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">Update Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="currentPassword"
            type="password"
            className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <input
            name="newPassword"
            type="password"
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
          <div className="flex justify-end gap-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ResetPasswordModal = ({ isOpen, userId, onClose }) => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      const res = await fetch(`https://timesheet-latest.onrender.com/api/User/${userId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        showToast('Password reset successfully', 'success');
        onClose();
      } else {
        const errorText = await res.text();
        showToast(errorText || 'Reset failed', 'error');
      }
    } catch (error) {
      showToast('Reset failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-80" onClick={e => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
        <p className="text-sm mb-6 text-gray-600">Are you sure you want to reset your password? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PasswordManagement() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('currentUser');
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (!parsedUser.username) {
          parsedUser.username = parsedUser.id === "john" ? "john.doe" :
            parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
        }
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        showToast("Session expired. Please login again.", "error");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Fetch user ID for password operations
  useEffect(() => {
    const fetchUserId = async () => {
      if (!currentUser?.username) return;
      
      try {
        const response = await fetch('https://timesheet-latest.onrender.com/api/User');
        if (response.ok) {
          const users = await response.json();
          if (Array.isArray(users)) {
            const foundUser = users.find(user => user.username === currentUser.username);
            if (foundUser && foundUser.userId) {
              setUserId(foundUser.userId);
            }
          }
        }
      } catch (error) {
        console.warn('Failed to fetch user ID:', error);
      }
    };

    if (userLoaded && currentUser) {
      fetchUserId();
    }
  }, [userLoaded, currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUserLoaded(false);
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading user session...</span>
          </div>
        </div>
      </div>
    );
  }

  // Only show for User role
  const isUser = currentUser?.role === "User";
  
  if (!isUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
              <p className="text-gray-600">Password management is only available for User accounts.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
      {/* Password Modals */}
      <UpdatePasswordModal 
        isOpen={showUpdateModal} 
        userId={userId} 
        onClose={() => setShowUpdateModal(false)} 
      />
      <ResetPasswordModal 
        isOpen={showResetModal} 
        userId={userId} 
        onClose={() => setShowResetModal(false)} 
      />

      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
        <div className="w-full flex flex-col items-center">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-8" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
            <h1 className="text-2xl font-bold text-gray-800">
              Password Management
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Password Management Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-6">
            {/* Update Password Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Update Password</h3>
                  <p className="text-sm text-gray-600">Change your current password</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                Update your password by providing your current password and entering a new one. Make sure your new password is secure and unique.
              </p>
              <button
                onClick={() => setShowUpdateModal(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Update Password
              </button>
            </div>

            {/* Reset Password Card */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Reset Password</h3>
                  <p className="text-sm text-gray-600">Reset your password to default</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 text-sm">
                Reset your password to the system default. This action cannot be undone and you'll need to contact an administrator for the new password.
              </p>
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Reset Password
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-8 bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-md">
            <h4 className="font-semibold text-gray-800 mb-2">Current User</h4>
            <div className="text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {currentUser.name}</p>
              <p><span className="font-medium">Username:</span> {currentUser.username}</p>
              <p><span className="font-medium">Role:</span> {currentUser.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

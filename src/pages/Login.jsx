import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Lock, ClipboardCheck } from "lucide-react";

// Simple toast function (unchanged)
const showToast = (message, type = 'info') => {
  const bgColor = type === 'success' ? '#4ade80' : 
                 type === 'error' ? '#ef4444' : 
                 type === 'warning' ? '#f59e0b' : '#3b82f6';
  
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 8px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Custom hook to get URL parameters (unchanged)
const useURLParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
};

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const urlParams = useURLParams();

  // Effect to set username from URL parameter (unchanged)
  useEffect(() => {
    const useridFromUrl = urlParams.get('userid');
    if (useridFromUrl) {
      setUser(useridFromUrl);
    }
  }, [urlParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !pass) {
      showToast("Please enter username and password", "error");
      return;
    }

    setIsLoading(true);

    try {
      const loginResponse = await fetch('https://timesheet-subk.onrender.com/api/User/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        
        const userInfo = {
          userId: loginData.approvalUserId,
          fullName: loginData.fullName,
          role: loginData.role,
          username: loginData.username
        };

        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        showToast("Login successful! Redirecting...", "success");
        
        setTimeout(() => {
          // **CHANGE**: Navigate directly to the timesheet page
          navigate("/dashboard/timesheet");
        }, 1000);

      } else {
        const errorData = await loginResponse.json().catch(() => null);
        const errorMessage = errorData?.message || 'Invalid credentials.';
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please try again.', "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden">
        {/* Animated background shapes */}
        <div className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-4000"></div>

        {/* The z-10 class ensures the form is on top of the background shapes */}
        <div className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl p-10 w-full max-w-md border border-gray-200">
            
            <div className="text-center mb-8">
                <ClipboardCheck className="mx-auto h-12 w-12 text-blue-600" />
                <h1 className="text-3xl font-bold mt-4 text-gray-800">Welcome Back</h1>
                <p className="text-sm text-gray-500 mt-1">Sign in to your Subcontractor Timesheet</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  autoComplete="username"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 flex items-center justify-center shadow-lg hover:shadow-blue-500/50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
        </div>
    </div>
  );
}
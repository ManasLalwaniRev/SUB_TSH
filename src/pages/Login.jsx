import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Simple toast function without container
const showToast = (message, type = 'info') => {
  const bgColor = type === 'success' ? '#4ade80' : 
                 type === 'error' ? '#ef4444' : 
                 type === 'warning' ? '#f59e0b' : '#3b82f6';
  
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
  }, 3000);
};

// Custom hook to get URL parameters
const useURLParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return searchParams;
};

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = useURLParams();

  const userSuggestions = ["john.doe", "jane.smith"];

  // Effect to set username from URL parameter
  useEffect(() => {
    const useridFromUrl = urlParams.get('userid');
    if (useridFromUrl) {
      setUser(useridFromUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !pass) {
      showToast("Please enter username and password", "error");
      return;
    }

    setIsLoading(true);

    try {
      // Call the login API
      const loginResponse = await fetch('https://timesheet-subk.onrender.com/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: user,
          password: pass
        })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        
        // Create user info based on API response
        const userInfo = {
          id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''),
          name: loginData.fullName || loginData.name || user, // ← Change this line
          role: loginData.role, // Use Role from API response (User/Admin)
          username: loginData.username || user.toLowerCase(),
          approvalUserId: loginData.approvalUserId, // ← Add this line
          ...loginData // Include any additional data from API
        };

        console.log('Storing user info:', userInfo);
        
        // Store user info in localStorage
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        
        // // Show success message and navigate to dashboard (same route for both roles)
        // if (loginData.Role === "User") {
        //   showToast("Welcome User! Redirecting to timesheet portal...", "success");
        // } else if (loginData.Role === "Admin") {
        //   showToast("Welcome Admin! Redirecting to admin portal...", "success");
        // } else {
        //   showToast("Welcome! Logging you in...", "success");
        // }
        
        // Navigate to dashboard for both roles - MainTable will handle the role-based UI and API calls
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      } else {
        // Handle login failure
        const errorData = await loginResponse.json().catch(() => null);
        const errorMessage = errorData?.message || 'Invalid credentials. Please check your username and password.';
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('Login failed. Please check your connection and try again.', "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUser(value);

    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = userSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleUsernameFocus = () => {
    // Show all suggestions when focused
    setFilteredSuggestions(userSuggestions);
    setShowSuggestions(true);
  };

  const handleUsernameBlur = () => {
    // Delay hiding to allow click on suggestion
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const selectSuggestion = (suggestion) => {
    setUser(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    // Focus on password field after selection
    setTimeout(() => {
      const passwordField = document.querySelector('input[type="password"]');
      if (passwordField) passwordField.focus();
    }, 100);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // You can add keyboard navigation here if needed
    } else if (e.key === 'ArrowUp') {
      e.preventDefault-name();
      // You can add keyboard navigation here if needed
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-blue-950">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xs relative">
        <h2 className="text-xl font-bold text-center mb-6 text-blue-900">
           Subcontractor Timesheet
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
              placeholder="Username"
              value={user}
              onChange={handleUsernameChange}
              onFocus={handleUsernameFocus}
              onBlur={handleUsernameBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              required
              disabled={isLoading}
            />
            {/* {showSuggestions && filteredSuggestions.length > 0 && !isLoading && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-20 max-h-32 overflow-auto">
                <div className="p-2 text-xs text-gray-500 font-medium border-b">Suggestions:</div>
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectSuggestion(suggestion);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e0e7ff';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '';
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )} */}
          </div>
          <input
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
            disabled={isLoading}
          />
          <button
            className="bg-indigo-700 text-white font-semibold py-2 rounded text-sm hover:bg-indigo-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


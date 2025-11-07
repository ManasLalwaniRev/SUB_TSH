import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { backendUrl } from '../components/config.jsx';


// Simple toast function without container (No changes made here)
const showToast = (message, type = "info") => {
  const bgColor =
    type === "success"
      ? "#4ade80"
      : type === "error"
      ? "#ef4444"
      : type === "warning"
      ? "#f59e0b"
      : "#3b82f6";

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 3000);
};

// Custom hook to get URL parameters (No changes made here)
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

  // All your existing functions and logic remain unchanged.
  // ... (useEffect, handleSubmit, handleUsernameChange, etc.)

  // Effect to set username from URL parameter
  useEffect(() => {
    const useridFromUrl = urlParams.get("userid");
    if (useridFromUrl) {
      setUser(useridFromUrl);
    }
  }, [location.search, urlParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !pass) {
      showToast("Please enter username and password", "error");
      return;
    }

    setIsLoading(true);

    try {
      const loginResponse = await fetch(
`${backendUrl}/api/User/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: user, password: pass }),
        }
      );

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();

        const userInfo = {
          id: loginData.id || user.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""),
          name: loginData.fullName || loginData.name || user,
          role: loginData.role,
          username: loginData.username || user.toLowerCase(),
          approvalUserId: loginData.approvalUserId,
          ...loginData,
        };

        console.log("Storing user info:", userInfo);
        localStorage.setItem("currentUser", JSON.stringify(userInfo));

        showToast(
          `Welcome ${userInfo.name || "User"}! Redirecting...`,
          "success"
        );

        // setTimeout(() => {
        //   if (userInfo.role === "pm") {
        //     navigate("/dashboard/approval");
        //   } else if (userInfo.role === "user") {
        //     navigate("/dashboard/timesheet");
        //   } else if (userInfo.role === "admin") {
        //     navigate("/dashboard");
        //   }
        // }, 1000);
        setTimeout(() => {
          switch (userInfo.role) {
            case "pm":
              navigate("/dashboard/approval");
              break;
            case "user":
              navigate("/dashboard/timesheet");
              break;
            case "admin":
              navigate("/dashboard");
              break;
            default:
              // Optionally handle unknown roles or redirect to a default page
              navigate("/dashboard");
              break;
          }
        }, 1000);
      } else {
        const errorData = await loginResponse.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          "Invalid credentials. Please check your username and password.";
        showToast(errorMessage, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast(
        "Login failed. Please check your connection and try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUser(value);

    if (value.length > 0) {
      const filtered = userSuggestions.filter((suggestion) =>
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
    setFilteredSuggestions(userSuggestions);
    setShowSuggestions(true);
  };

  const handleUsernameBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const selectSuggestion = (suggestion) => {
    setUser(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setTimeout(() => {
      document.querySelector('input[type="password"]')?.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // ====================================================================
  // ===== ✨ IMPROVISED LIGHT DESIGN STARTS HERE ✨ ====================
  // ====================================================================
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-sans p-4">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:scale-105">
        <div className="text-center">
          <div className="flex justify-center mb-5">
            {/* Modern & Colorful Logo/Icon */}
            <svg
              className="w-14 h-14 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome!
          </h2>
          <p className="text-md text-gray-600">
            
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          {/* Username Input */}
          <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 text-base text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-200"
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
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            {/* Suggestions Dropdown */}
            {/* {showSuggestions && filteredSuggestions.length > 0 && !isLoading && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-40 overflow-auto">
                {filteredSuggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectSuggestion(suggestion);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )} */}
          </div>
          {/* Password Input */}
          <div className="relative">
            <input
              className="w-full px-4 py-3 pl-12 text-base text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 transition-all duration-200"
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
          </div>
          <button
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg text-lg tracking-wide hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span>Signing In...</span>
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

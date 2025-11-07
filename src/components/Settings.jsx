import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageSquare,
  Download,
  Receipt,
  Package,
  Users,
  Settings as SettingsIcon,
  Save,
} from "lucide-react";
import { backendUrl } from "./config";

// Toast notification utility
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
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: ${bgColor};
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1000);
};

const Settings = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  // Config Values states
  const [woPrefix, setWoPrefix] = useState("");
  const [woSuffixLength, setWoSuffixLength] = useState("");
  const [loading, setLoading] = useState(false);
  const [configValues, setConfigValues] = useState([]);

  // Workflow configuration states
  const [workflowPM, setWorkflowPM] = useState(false);
  const [workflowSupervisor, setWorkflowSupervisor] = useState(false);

  // Original values for change detection
  const [originalValues, setOriginalValues] = useState({
    woPrefix: "",
    woSuffixLength: "",
    workflowPM: false,
    workflowSupervisor: false,
  });

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        console.error("Error parsing user info:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // Load config values when component mounts
  useEffect(() => {
    if (userLoaded && currentUser) {
      loadConfigValues();
    }
  }, [userLoaded, currentUser]);

  // Load config values from API
  const loadConfigValues = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${backendUrl}/api/ConfigValues`);

      if (!response.ok) {
        throw new Error("Failed to fetch config values");
      }

      const data = await response.json();
      setConfigValues(data);

      // Set work order values
      const prefixConfig = data.find((config) => config.name === "WO_Prefix");
      const suffixConfig = data.find(
        (config) => config.name === "WO_SuffixLength"
      );

      let loadedWoPrefix = "";
      let loadedWoSuffixLength = "";

      if (prefixConfig) {
        loadedWoPrefix = prefixConfig.value;
        setWoPrefix(prefixConfig.value);
      }

      if (suffixConfig) {
        loadedWoSuffixLength = suffixConfig.value;
        setWoSuffixLength(suffixConfig.value);
      }

      // Set workflow values
      let loadedWorkflowPM = false;
      let loadedWorkflowSupervisor = false;

      const workflowConfig = data.find((config) => config.name === "Workflow");
      if (workflowConfig && workflowConfig.value) {
        const workflowValues = workflowConfig.value
          .split(",")
          .map((v) => v.trim());
        loadedWorkflowPM = workflowValues.includes("PM");
        loadedWorkflowSupervisor = workflowValues.includes("Supervisor");
        setWorkflowPM(loadedWorkflowPM);
        setWorkflowSupervisor(loadedWorkflowSupervisor);
      }

      // Store original values for change detection
      setOriginalValues({
        woPrefix: loadedWoPrefix,
        woSuffixLength: loadedWoSuffixLength,
        workflowPM: loadedWorkflowPM,
        workflowSupervisor: loadedWorkflowSupervisor,
      });
    } catch (error) {
      console.error("Error loading config values:", error);
      showToast("Failed to load configuration values", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle saving only changed config values
  const handleSaveConfig = async () => {
    // Validate work order fields
    if (!woPrefix.trim()) {
      showToast("Please enter a work order prefix", "warning");
      return;
    }

    if (
      !woSuffixLength.trim() ||
      isNaN(woSuffixLength) ||
      parseInt(woSuffixLength) <= 0
    ) {
      showToast(
        "Please enter a valid suffix length (positive number)",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      // Prepare workflow value
      const selectedWorkflows = [];
      if (workflowPM) selectedWorkflows.push("PM");
      if (workflowSupervisor) selectedWorkflows.push("Supervisor");
      const workflowValue = selectedWorkflows.join(",");

      const originalWorkflowValue = [];
      if (originalValues.workflowPM) originalWorkflowValue.push("PM");
      if (originalValues.workflowSupervisor)
        originalWorkflowValue.push("Supervisor");
      const originalWorkflow = originalWorkflowValue.join(",");

      // Only include changed values in the payload
      let updatedConfigs = [];

      // Check if WO_Prefix changed
      if (woPrefix.trim() !== originalValues.woPrefix) {
        const prefixConfig = configValues.find((c) => c.name === "WO_Prefix");
        if (prefixConfig) {
          updatedConfigs.push({
            ...prefixConfig,
            value: woPrefix.trim(),
            createdAt: new Date().toISOString(),
          });
        } else {
          updatedConfigs.push({
            name: "WO_Prefix",
            value: woPrefix.trim(),
            createdAt: new Date().toISOString(),
            id: 0,
          });
        }
      }

      // Check if WO_SuffixLength changed
      if (woSuffixLength.trim() !== originalValues.woSuffixLength) {
        const suffixConfig = configValues.find(
          (c) => c.name === "WO_SuffixLength"
        );
        if (suffixConfig) {
          updatedConfigs.push({
            ...suffixConfig,
            value: woSuffixLength.trim(),
            createdAt: new Date().toISOString(),
          });
        } else {
          updatedConfigs.push({
            name: "WO_SuffixLength",
            value: woSuffixLength.trim(),
            createdAt: new Date().toISOString(),
            id: 0,
          });
        }
      }

      // Check if Workflow changed
      if (workflowValue !== originalWorkflow) {
        const workflowConfig = configValues.find((c) => c.name === "Workflow");
        if (workflowConfig) {
          updatedConfigs.push({
            ...workflowConfig,
            value: workflowValue,
            createdAt: new Date().toISOString(),
          });
        } else {
          updatedConfigs.push({
            name: "Workflow",
            value: workflowValue,
            createdAt: new Date().toISOString(),
            id: 0,
          });
        }
      }

      // Only make API call if there are changes
      if (updatedConfigs.length === 0) {
        showToast("No changes detected", "info");
        return;
      }

      console.log("Sending only changed configs:", updatedConfigs);

      const response = await fetch(`${backendUrl}/api/ConfigValues`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedConfigs),
      });

      if (!response.ok) {
        throw new Error("Failed to save configuration values");
      }

      showToast(
        `${updatedConfigs.length} configuration(s) saved successfully`,
        "success"
      );

      // Reload config values to get updated data
      await loadConfigValues();
    } catch (error) {
      console.error("Error saving config values:", error);
      showToast("Failed to save configuration", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading user session...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f9fafd] flex flex-col pr-4 overflow-hidden">
      <div className="flex-1 flex flex-col pt-6 pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex items-center">
            <SettingsIcon className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
          >
            Logout
          </button>
        </div>

        {/* Main Content Area */}
        <div className="px-4 pb-4" style={{ height: "calc(100vh - 150px)" }}>
          <div className="h-full border border-gray-300 rounded-2xl bg-white shadow flex flex-col overflow-y-auto">
            <div className="p-5 space-y-8">
              {/* Configure Work Order Section */}
              <div>
                <div className="flex items-center mb-6">
                  <SettingsIcon className="h-4 w-4 text-blue-600 mr-3" />
                  <h2 className="text-l font-semibold text-gray-900">
                    Configure Work Order
                  </h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="space-y-6">
                    {/* Work Order Prefix */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Order Prefix
                        {/* {woPrefix.trim() !== originalValues.woPrefix && (
                          <span className="ml-2 text-xs text-orange-600 font-semibold">
                            (Modified)
                          </span>
                        )} */}
                      </label>
                      <input
                        type="text"
                        value={woPrefix}
                        onChange={(e) => setWoPrefix(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          woPrefix.trim() !== originalValues.woPrefix
                            ? "border-gray-300 focus:ring-blue-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter work order prefix (e.g., WO-)"
                        disabled={loading}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        This prefix will be used at the beginning of all work
                        order numbers
                      </p>
                    </div>

                    {/* Work Order Suffix Length */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Work Order Suffix Length
                        {/* {woSuffixLength.trim() !==
                          originalValues.woSuffixLength && (
                          <span className="ml-2 text-xs text-orange-600 font-semibold">
                            (Modified)
                          </span>
                        )} */}
                      </label>
                      <input
                        type="number"
                        value={woSuffixLength}
                        onChange={(e) => setWoSuffixLength(e.target.value)}
                        min="1"
                        max="10"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${
                          woSuffixLength.trim() !==
                          originalValues.woSuffixLength
                            ? "border-gray-300 focus:ring-blue-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                        placeholder="Enter suffix length (e.g., 5)"
                        disabled={loading}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Number of digits for the work order suffix (e.g., 5 =
                        00001, 00002, etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configure Workflow Section */}
              <div>
                <div className="flex items-center mb-6">
                  <Users className="h-4 w-4 text-purple-600 mr-3" />
                  <h2 className="text-l font-semibold text-gray-900">
                    Configure Workflow
                    {/* {(workflowPM !== originalValues.workflowPM ||
                      workflowSupervisor !==
                        originalValues.workflowSupervisor) && (
                      <span className="ml-2 text-sm text-orange-600 font-semibold">
                        (Modified)
                      </span>
                    )} */}
                  </h2>
                </div>

                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Select Workflow Roles
                      </label>

                      <div className="space-y-3">
                        {/* PM Checkbox */}
                        <div className="flex items-center">
                          <input
                            id="workflow-pm"
                            type="checkbox"
                            checked={workflowPM}
                            onChange={(e) => setWorkflowPM(e.target.checked)}
                            disabled={loading}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="workflow-pm"
                            className="ml-3 text-sm font-medium text-gray-700"
                          >
                            Project Manager (PM)
                            {/* {workflowPM !== originalValues.workflowPM && (
                              <span className="ml-2 text-xs text-orange-600 font-semibold">
                                (Changed)
                              </span>
                            )} */}
                          </label>
                        </div>

                        {/* Supervisor Checkbox */}
                        <div className="flex items-center">
                          <input
                            id="workflow-supervisor"
                            type="checkbox"
                            checked={workflowSupervisor}
                            onChange={(e) =>
                              setWorkflowSupervisor(e.target.checked)
                            }
                            disabled={loading}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor="workflow-supervisor"
                            className="ml-3 text-sm font-medium text-gray-700"
                          >
                            Supervisor
                            {/* {workflowSupervisor !==
                              originalValues.workflowSupervisor && (
                              <span className="ml-2 text-xs text-orange-600 font-semibold">
                                (Changed)
                              </span>
                            )} */}
                          </label>
                        </div>
                      </div>

                      <p className="mt-3 text-xs text-gray-500">
                        Select the roles that should be included in the workflow
                        process
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button - Common for both sections */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveConfig}
                  disabled={
                    loading || !woPrefix.trim() || !woSuffixLength.trim()
                  }
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageSquare,
  Download,
  Receipt,
  Package,
  Users,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import TimesheetApprovalModal from "./TimesheetApprovalModal";
import { backendUrl } from "./config";
// import TimesheetHistoryTable from "./TimesheetHistoryTable";
// import TimesheetRevisionTable from "./TimesheetRevisionTable";

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
  const displayTime =
    message.includes("import") || message.includes("Import") ? 4000 : 1000;
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, displayTime);
};

const getUserIPAddress = async () => {
  try {
    const endpoints = [
      "https://api.ipify.org?format=json",
      "https://ipapi.co/json/",
      "https://httpbin.org/ip",
    ];
    for (const url of endpoints) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          return data.ip || data.origin || "";
        }
      } catch {}
    }
    return "";
  } catch {
    return "";
  }
};

// Updated columns with Work Order after Name
const columnsAdmin = [
  "All",
  "Status",
  "Timesheet Date",
  "Employee ID",
  "Name",
  // "Work Order",
  "Hours",
  "Approver ID",
  "Approver Name",
];

const ReasonModal = ({
  isOpen,
  action,
  selectedCount,
  onConfirm,
  onCancel,
}) => {
  const [reason, setReason] = useState("");
  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);
  if (!isOpen) return null;
  const handleConfirm = () =>
    reason.trim()
      ? onConfirm(reason.trim())
      : showToast("Please provide a reason.", "warning");
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) handleConfirm();
    else if (e.key === "Escape") onCancel();
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {/* {action === "approve" ? "Approve" : "Reject"}  */}
            {action.charAt(0).toUpperCase() + action.slice(1)} Timesheets
          </h3>
          <p className="text-sm text-gray-600">
            You are about to {action} {selectedCount} timesheet
            {selectedCount > 1 ? "s" : ""}. Please provide a reason:
          </p>
        </div>
        <div className="mb-4">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Enter reason for ${
              action.charAt(0).toUpperCase() + action.slice(1)
            } these timesheets...`}
            className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength={500}
            autoFocus
          />
          <div className="text-xs text-gray-500 mt-1">
            {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc
            to cancel
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              action === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)} 
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Approval() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [notifySelectAll, setNotifySelectAll] = useState(false);
  const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const timesheetDetailsRef = useRef(null);
  const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userIpAddress, setUserIpAddress] = useState("");
  const [selectedTimesheetDate, setSelectedTimesheetDate] = useState(null);
  // const [searchStatus, setSearchStatus] = useState("");
  const [searchStatus, setSearchStatus] = useState([]);
  const [correctionLoading, setCorrectionLoading] = useState(false);
  const [processedLoading, setProcessedLoading] = useState(false);
  const now = new Date();
  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
  const currentYear = String(now.getFullYear());
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filterYear, setFilterYear] = useState(currentYear);
  const [statusHoverRow, setStatusHoverRow] = useState(null);
  const [approvalPanelRow, setApprovalPanelRow] = useState(null);
 
const [showHistory, setShowHistory] = useState(false);
const [showRevision, setShowRevision] = useState(false);

  useEffect(() => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth();
    const day = today.getUTCDate();
    const dayOfWeek = today.getUTCDay();
    const todayUTC = new Date(Date.UTC(year, month, day));
    const daysToAdd = (7 - dayOfWeek) % 7;
    todayUTC.setUTCDate(todayUTC.getUTCDate() + daysToAdd);
    const finalYear = todayUTC.getUTCFullYear();
    const finalMonth = String(todayUTC.getUTCMonth() + 1).padStart(2, "0");
    const finalDay = String(todayUTC.getUTCDate()).padStart(2, "0");
    const formattedDateForState = `${finalYear}-${finalMonth}-${finalDay}`;
  }, []);

  function convertDate(dateStr) {
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
  }

  const isAdmin = currentUser?.role === "admin" 
  const isUser = currentUser?.role === "user" || currentUser?.role === "User";
  const isPM = currentUser?.role === "pm";
  const columns = columnsAdmin;
  const colWidth = 150;
  const minTableWidth = columns.length * colWidth;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch {
      return dateString;
    }
  };

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return "";
    const numHours = parseFloat(hours);
    if (isNaN(numHours)) return hours;
    return numHours.toFixed(2);
  };

  const formatDateForDateInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const formatDateFromInput = (inputDate) => {
    if (!inputDate) return "";
    try {
      const date = new Date(inputDate + "T00:00:00");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    } catch {
      return "";
    }
  };

  const getSortedRows = (rowsToSort) => {
    let sorted = [...rowsToSort];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal, bVal;

        if (sortConfig.key === "Timesheet Date") {
          aVal = new Date(a.originalDate || a["Timesheet Date"]);
          bVal = new Date(b.originalDate || b["Timesheet Date"]);
          if (isNaN(aVal.getTime())) aVal = new Date(0);
          if (isNaN(bVal.getTime())) bVal = new Date(0);
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (sortConfig.key === "Hours") {
          aVal = parseFloat(a["Hours"]) || 0;
          bVal = parseFloat(b["Hours"]) || 0;
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (
          [
            "Employee ID",
            "Project ID",
            "PO Number",
            "PO Line Number",
            "RLSE Number",
          ].includes(sortConfig.key)
        ) {
          aVal = parseInt(a[sortConfig.key]) || 0;
          bVal = parseInt(b[sortConfig.key]) || 0;
          if (aVal === bVal) {
            aVal = String(a[sortConfig.key] || "").toLowerCase();
            bVal = String(b[sortConfig.key] || "").toLowerCase();
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
          }
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (sortConfig.key === "Status") {
          const getStatusPriority = (status) => {
            const statusUpper = String(status || "PENDING").toUpperCase();
            switch (statusUpper) {
              case "OPEN":
                return 1;
              case "PENDING":
                return 2;
              case "APPROVED":
                return 3;
              case "REJECTED":
                return 4;
              default:
                return 5;
            }
          };

          aVal = getStatusPriority(a["Status"]);
          bVal = getStatusPriority(b["Status"]);

          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else {
          aVal = String(a[sortConfig.key] || "").toLowerCase();
          bVal = String(b[sortConfig.key] || "").toLowerCase();
          if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
    } else {
      sorted.sort((a, b) => {
        const aLineNo = parseInt(a.lineNo) || 0;
        const bLineNo = parseInt(b.lineNo) || 0;
        if (aLineNo !== bLineNo) {
          return aLineNo - bLineNo;
        }

        let aDate = new Date(a.originalDate || a[" Timesheet Date"]);
        let bDate = new Date(b.originalDate || b[" Timesheet Date"]);
        if (isNaN(aDate.getTime())) aDate = new Date(0);
        if (isNaN(bDate.getTime())) bDate = new Date(0);
        if (aDate.getTime() !== bDate.getTime()) {
          return bDate.getTime() - aDate.getTime();
        }

        const aEmpId = String(a["Employee ID"] || "").toLowerCase();
        const bEmpId = String(b["Employee ID"] || "").toLowerCase();
        return aEmpId.localeCompare(bEmpId);
      });
    }

    return sorted;
  };

  const handleSort = (key) => {
    if (key === "All") return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (columnKey === "All") return null;

    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return " ⇅";
  };

  const getStatusStyle = (status) => {
    const statusProper =
      status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() ||
      "Pending";

    switch (status?.toUpperCase()) {
      case "OPEN":
        return {
          backgroundColor: "#dbeafe",
          color: "#2563eb",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "APPROVED":
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "REJECTED":
        return {
          backgroundColor: "#fce7f3",
          color: "#ec4899",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "PENDING":
        return {
          backgroundColor: "#fef9c3",
          color: "#ca8a04",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "SUBMITTED":
        return {
          backgroundColor: "#e0e7ff",
          color: "#4338ca",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "PROCESSED":
        return {
          backgroundColor: "#dacbf8ff",
          color: "rgba(153, 110, 192, 1)",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "NOTIFIED":
        return {
          backgroundColor: "#dbeafe",
          color: "#2563eb",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "UN-NOTIFIED":
      case "UNNOTIFIED":
        return {
          backgroundColor: "#dcfce7",
          color: "#16a34a",
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      case "CORRECTION":
        return {
          backgroundColor: "#FFE0B2", // soft light orange
          color: "#784421", // dark orange/brown
          fontWeight: "600",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#6b7280",
          fontWeight: "500",
          padding: "4px 8px",
          fontSize: "11px",
          display: "inline-block",
          borderRadius: "9999px",
        };
    }
  };

  const isRowActionable = (row) => {
    const status = row.status?.toLowerCase();
    return (
      (status === "pending" ||
        status === "open" ||
        status === "un-notified" ||
        status === "submitted" ||
        status === "approved" ||
      status === "processed") &&
      !row.isRejected &&
      status !== "rejected"
    );
  };

  // Create a separate function for approved rows that can only be rejected
  const isApprovedRowRejectableOnly = (row) => {
    const status = row.status?.toLowerCase();
    return status === "approved" && !row.isRejected;
  };

  const scrollToTimesheetDetail = () => {
    setTimeout(() => {
      const timesheetDetailElement = document.querySelector(
        "[data-timesheet-detail]"
      );
      if (timesheetDetailElement) {
        timesheetDetailElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleRowClick = (rowData, event) => {
    if (event?.target?.type === "checkbox") return;

    setSelectedResourceId(rowData["Employee ID"]);
    setSelectedTimesheetDate(rowData.originalDate); // Pass the specific date
    setCurrentSelectedRowId(rowData.id);

    setTimeout(() => {
      if (timesheetDetailsRef.current) {
        timesheetDetailsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100);
  };

  const handleCloseDetails = () => {
    setSelectedResourceId(null);
  };

  useEffect(() => {
    getUserIPAddress().then((ip) => setUserIpAddress(ip || ""));
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        if (!parsedUser.username) {
          parsedUser.username =
            parsedUser.id === "john"
              ? "john.doe"
              : parsedUser.id === "jane"
              ? "jane.smith"
              : parsedUser.id;
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

  useEffect(() => {
    setSelectedRows([]);
    setSelectedNotifyRows([]);
    setSelectAll(false);
    setNotifySelectAll(false);
    setUnifiedSelectAll(false);
    setSearchStatus(""); // Reset status filter
  }, []);

  // useEffect(() => {
  //   if (userLoaded && currentUser && currentUser.username) fetchData();
  // }, [userLoaded, currentUser]);

  useEffect(() => {
    if (userLoaded && currentUser && currentUser.username) {
      fetchData();
    }
  }, [userLoaded, currentUser, filterMonth, filterYear]);

  useEffect(() => {
    if (!searchDate) return;
    const [y, m] = searchDate.split("-");
    setFilterYear(y);
    setFilterMonth(m);
  }, [searchDate]);

  const groupDuplicateTimesheets = (timesheets) => {
    console.log("Input timesheets for grouping:", timesheets);

    if (!Array.isArray(timesheets) || timesheets.length === 0) {
      return [];
    }

    // Create a map to group by Employee ID + Timesheet Date
    const groupMap = new Map();

    timesheets.forEach((timesheet, index) => {
      const employeeId = String(timesheet["Employee ID"] || "").trim();
      const timesheetDate =
        timesheet.originalDate || timesheet["Timesheet Date"];
      const key = `${employeeId}|${timesheetDate}`;

      console.log(`Processing row ${index}:`, {
        employeeId,
        timesheetDate,
        key,
        hours: timesheet.Hours,
      });

      if (groupMap.has(key)) {
        // Group exists - sum the hours
        const existingEntry = groupMap.get(key);
        const currentHours = parseFloat(timesheet.Hours) || 0;
        const existingHours = parseFloat(existingEntry.Hours) || 0;
        const summedHours = existingHours + currentHours;

        console.log(
          `Combining hours: ${existingHours} + ${currentHours} = ${summedHours}`
        );

        existingEntry.Hours = formatHours
          ? formatHours(summedHours)
          : summedHours.toFixed(2);

        // Combine metadata for bulk operations
        existingEntry.combinedIds = existingEntry.combinedIds || [
          existingEntry.id,
        ];
        existingEntry.combinedIds.push(timesheet.id);

        existingEntry.combinedRequestIds = existingEntry.combinedRequestIds || [
          existingEntry.requestId,
        ];
        if (
          timesheet.requestId &&
          !existingEntry.combinedRequestIds.includes(timesheet.requestId)
        ) {
          existingEntry.combinedRequestIds.push(timesheet.requestId);
        }

        existingEntry.combinedLineNos = existingEntry.combinedLineNos || [
          existingEntry.lineNo,
        ];
        if (
          timesheet.lineNo &&
          !existingEntry.combinedLineNos.includes(timesheet.lineNo)
        ) {
          existingEntry.combinedLineNos.push(timesheet.lineNo);
        }
      } else {
        // First entry for this key
        const groupedEntry = { ...timesheet };
        groupedEntry.combinedIds = [timesheet.id];
        groupedEntry.combinedRequestIds = [timesheet.requestId];
        groupedEntry.combinedLineNos = [timesheet.lineNo];
        groupMap.set(key, groupedEntry);

        console.log(`Created new group for key: ${key}`, groupedEntry);
      }
    });

    const result = Array.from(groupMap.values());
    console.log("Final grouped result:", result);
    return result;
  };

  const fetchData = async () => {
    if (!userLoaded || !currentUser || !currentUser.username) return;

    try {
      setLoading(true);

      const resourceId = currentUser.username;
      const role = currentUser.role.toUpperCase();
      // &month=${filterMonth}&year=${filterYear}
      const apiUrl = `${backendUrl}/api/SubkTimesheet/pending-approvalsByUser?Username=${resourceId}&status=ALL&month=${filterMonth}&year=${filterYear}`;
      console.log("Fetching from:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log("Raw API Response:", apiData);

      // Transform the nested structure into flat rows
      const flattenedData = [];

      if (Array.isArray(apiData)) {
        apiData.forEach((timesheetEntry, entryIndex) => {
          console.log(
            `Processing timesheet entry ${entryIndex}:`,
            timesheetEntry
          );

          // Calculate total hours from all daily hours for this timesheet entry
          let totalHours = 0;
          if (
            timesheetEntry.timesheetHours &&
            Array.isArray(timesheetEntry.timesheetHours)
          ) {
            totalHours = timesheetEntry.timesheetHours.reduce(
              (sum, dailyHour) => sum + (parseFloat(dailyHour.hours) || 0),
              0
            );
          }

          // Create a single row per timesheet entry (not per daily hour)
          const row = {
            id: timesheetEntry.lineNo, // Use lineNo as the unique identifier
            requestId: timesheetEntry.requestId,
            levelNo: timesheetEntry.levelNo || 1,
            lineNo: timesheetEntry.lineNo,
            selected: false,
            notifySelected: false,
            isApproved: timesheetEntry.approvalStatus?.toLowerCase() === "approved",
            isRejected: timesheetEntry.approvalStatus?.toLowerCase() === "rejected",
            isNotified: timesheetEntry.approvalStatus?.toLowerCase() === "notified",
            approvalActions: timesheetEntry.approvalActions || [],
            // Display fields
            status: timesheetEntry.approvalStatus?.toLowerCase(),
            Status: timesheetEntry.approvalStatus,
            "Timesheet Date": convertDate(timesheetEntry.timesheet_Date),
            "Employee ID": timesheetEntry.resource_Id,
            Name: timesheetEntry.resource_Name || timesheetEntry.displayedName,
            "Work Order":
              timesheetEntry.workOrder || timesheetEntry.work_Order || "",
            Hours: formatHours(totalHours), // Use calculated total hours
            "Approver ID": timesheetEntry.pm_User_Id || "",
            "Approver Name":
              timesheetEntry.pm_Name || timesheetEntry.pmName || "",

            // Additional fields for operations
            originalDate: timesheetEntry.timesheet_Date,
            approverUserId: timesheetEntry.approverUserId,
            Comment: timesheetEntry.comment || "",

            // Store the raw hours array for grouping operations
            rawHoursData: timesheetEntry.timesheetHours || [],
          };

          flattenedData.push(row);
          console.log(
            `Added flattened row with total hours ${totalHours}:`,
            row
          );
        });
      }

      console.log("All flattened data before grouping:", flattenedData);

      // Apply grouping to combine duplicate Employee ID + Date entries
      const groupedData = groupDuplicateTimesheets(flattenedData);
      console.log("Final grouped data:", groupedData);

      setRows(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      showToast(`Error fetching data: ${error.message}`, "error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sync searchDate as first day of filter month/year
    if (filterMonth && filterYear) {
      setSearchDate(`${filterYear}-${filterMonth}-01`);
    }
  }, [filterMonth, filterYear]);

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];

    // if (searchDate) {
    //   const searchDateFormatted = formatDateFromInput(searchDate);
    //   filtered = filtered.filter((row) => {
    //     const rowDate = row["Timesheet Date"];
    //     return rowDate === searchDateFormatted;
    //   });
    // }

    if (searchDate) {
      // Here you might want to filter by month/year only, not exact date
      const filterYear = searchDate.split("-")[0];
      const filterMonth = searchDate.split("-")[1];
      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.originalDate || row["Timesheet Date"]);
        return (
          rowDate.getFullYear() === Number(filterYear) &&
          rowDate.getMonth() + 1 === Number(filterMonth)
        );
      });
    }

    if (searchEmployeeId.trim()) {
      filtered = filtered.filter((row) =>
        (row["Employee ID"] || "")
          .toLowerCase()
          .includes(searchEmployeeId.trim().toLowerCase())
      );
    }

    if (searchEmployeeName.trim()) {
      filtered = filtered.filter((row) =>
        (row["Name"] || "")
          .toLowerCase()
          .includes(searchEmployeeName.trim().toLowerCase())
      );
    }

    // Add case-insensitive status filtering
    // if (searchStatus.trim()) {
    //   filtered = filtered.filter((row) => {
    //     const rowStatus = (row["Status"] || row.status || "").toLowerCase();
    //     return rowStatus.includes(searchStatus.trim().toLowerCase());
    //   });
    // }
    if (searchStatus && searchStatus.length > 0) {
      filtered = filtered.filter((row) =>
        searchStatus.includes(row.status?.toLowerCase())
      );
    }

    return getSortedRows(filtered);
  };

  const filteredRows = getFilteredRows();

  useEffect(() => {
    const actionableRows = filteredRows.filter((row) => isRowActionable(row));
    const notifiableRows = filteredRows.filter(
      (row) =>
        !row.isNotified &&
        row.status !== "notified" &&
        row["Status"] !== "NOTIFIED"
    );

    const allActionableSelected =
      actionableRows.length > 0 && actionableRows.every((row) => row.selected);
    const allNotifiableSelected =
      notifiableRows.length > 0 &&
      notifiableRows.every((row) => row.notifySelected);

    setUnifiedSelectAll(
      allActionableSelected &&
        allNotifiableSelected &&
        (actionableRows.length > 0 || notifiableRows.length > 0)
    );
  }, [selectedRows, selectedNotifyRows, filteredRows]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  useEffect(() => {
    const actionableRows = filteredRows.filter(
      (row) =>
        (isRowActionable(row) || isApprovedRowRejectableOnly(row)) &&
        row.status?.toLowerCase() !== "rejected"
    );
    // true if at least one eligible row and all eligible are selected
    const allActionableSelected =
      actionableRows.length > 0 && actionableRows.every((row) => row.selected);

    setUnifiedSelectAll(allActionableSelected);
  }, [selectedRows, filteredRows]);

  // Updated handleUnifiedSelectAll function
  const handleUnifiedSelectAll = (isSelected) => {
    setUnifiedSelectAll(isSelected);
    const updatedRows = [...rows];

    const actionableRows = filteredRows.filter(
      (row) =>
        (isRowActionable(row) || isApprovedRowRejectableOnly(row)) &&
        row.status?.toLowerCase() !== "rejected"
    );

    const notifiableRows = filteredRows.filter(
      (row) =>
        !row.isNotified &&
        row.status !== "notified" &&
        row["Status"]?.toLowerCase() !== "notified" &&
        row.status?.toLowerCase() !== "rejected"
    );

    actionableRows.forEach((filteredRow) => {
      const actualRowIndex = rows.findIndex((row) => row.id === filteredRow.id);
      if (actualRowIndex !== -1) {
        updatedRows[actualRowIndex].selected = isSelected;
      }
    });

    notifiableRows.forEach((filteredRow) => {
      const actualRowIndex = rows.findIndex((row) => row.id === filteredRow.id);
      if (actualRowIndex !== -1) {
        updatedRows[actualRowIndex].notifySelected = isSelected;
      }
    });

    setRows(updatedRows);
    setSelectedRows(isSelected ? [...actionableRows] : []);
    setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
    setSelectAll(isSelected);
    setNotifySelectAll(isSelected);
  };

  const handleUnifiedRowSelect = (rowIndex, isSelected) => {
    const rowData = filteredRows[rowIndex];
    const updatedRows = [...rows];
    const actualRowIndex = rows.findIndex(
      (row) => row.id === filteredRows[rowIndex].id
    );

    if (isRowActionable(rowData) || isApprovedRowRejectableOnly(rowData)) {
      updatedRows[actualRowIndex].selected = isSelected;
      handleRowSelectUpdate(rowData, isSelected);
    }

    if (
      !rowData.isNotified &&
      rowData.status !== "notified" &&
      rowData["Status"] !== "NOTIFIED"
    ) {
      updatedRows[actualRowIndex].notifySelected = isSelected;
      handleNotifyRowSelectUpdate(rowData, isSelected);
    }

    setRows(updatedRows);
  };

  const handleRowSelectUpdate = (rowData, isSelected) => {
    if (isSelected) {
      setSelectedRows((prev) => [...prev, rowData]);
    } else {
      setSelectedRows((prev) => prev.filter((item) => item.id !== rowData.id));
      setSelectAll(false);
    }
  };

  const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
    if (isSelected) {
      setSelectedNotifyRows((prev) => [...prev, rowData]);
    } else {
      setSelectedNotifyRows((prev) =>
        prev.filter((item) => item.id !== rowData.id)
      );
      setNotifySelectAll(false);
    }
  };

  const handleNotifyClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (actionLoading) return;

    if (selectedNotifyRows.length === 0) {
      showToast("Please select at least one timesheet to notify.", "warning");
      return;
    }
    try {
      const requestBody = selectedNotifyRows.map((row) => ({
        requestType: "TIMESHEET",
        requesterId: 1,
        timesheetId: row.id,
        ProjectId: row["Project ID"],
        requestData: `Notification for timesheet ${row.id}`,
      }));
      const response = await fetch(`${backendUrl}/api/Approval/BulkNotify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        showToast(
          `Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`,
          "success"
        );
        const notifiedIds = selectedNotifyRows.map((row) => row.id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            notifiedIds.includes(row.id)
              ? {
                  ...row,
                  status: "notified",
                  Status: "NOTIFIED",
                  isNotified: true,
                  notifySelected: false,
                }
              : row
          )
        );
        setSelectedNotifyRows([]);
        setNotifySelectAll(false);

        setTimeout(() => {
          fetchData();
        }, 2000);
      } else {
        showToast("Failed to send notifications. Please try again.", "error");
      }
    } catch (error) {
      showToast("Failed to send notifications. Please try again.", "error");
    } finally {
    }
  };

  const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
    const allRequestsData = [];

    selectedRows.forEach((row) => {
      // If this row has combined data from grouping, process all of them
      if (row.combinedRequestIds && row.combinedRequestIds.length > 0) {
        // Process each individual request that was grouped
        row.combinedRequestIds.forEach((requestId, index) => {
          allRequestsData.push({
            requestId: requestId,
            // action: `${action === "approve" ? "Approved" : "Rejected"}`,
             action: `${action.charAt(0).toUpperCase() + action.slice(1)}`,
            levelNo: row.levelNo || 1,
            approverUserId: currentUser.userId || row.approverUserId,
            comment: `${action.charAt(0).toUpperCase() + action.slice(1)} by ${
              currentUser.name
            }: ${reason}`,
            ipAddress: ipAddress,
            // Include original line numbers if available
            lineNo: row.combinedLineNos
              ? row.combinedLineNos[index]
              : row.lineNo,
            // Include original timesheet IDs if available
            timesheetId: row.combinedIds ? row.combinedIds[index] : row.id,
          });
        });
      } else {
        // Handle single (non-grouped) entries
        allRequestsData.push({
          requestId: row.requestId || row.id,
          levelNo: row.levelNo || 1,
          approverUserId: currentUser.approvalUserId || row.approverUserId,
          comment: `${action === "approve" ? "Approved" : "Rejected"} by ${
            currentUser.name
          }: ${reason}`,
          ipAddress: ipAddress,
          lineNo: row.lineNo,
          timesheetId: row.id,
        });
      }
    });

    console.log(
      `Sending ${action} request for ${allRequestsData.length} individual timesheet entries:`,
      allRequestsData
    );
    return allRequestsData;
  };

  // Correction Handler
  const handleBulkCorrectionClick = () => {
  if (selectedRows.length === 0) {
    showToast("Please select at least one timesheet for correction.", "warning");
    return;
  }
  
  const correctionEligibleCount = selectedRows.filter(
    (row) => row.status?.toLowerCase() === "processed"
  ).length;
  
  if (correctionEligibleCount === 0) {
    showToast("No eligible timesheets selected for correction.", "warning");
    return;
  }
  
  // Show reason modal (like Reject does)
  setPendingAction("correction");
  setShowReasonModal(true);
};

  // Proccessed Handler
   const handleBulkProcessedClick = async () => {
    setProcessedLoading(true);

    const approvedRows = selectedRows.filter(
      (row) => row.status?.toLowerCase() === "approved"
    );
    const requestBody = buildBulkRequestBody(
      selectedRows,
      "processed",
      "Processed Requested",
      userIpAddress
    );

    try {
      const response = await fetch(
        `${backendUrl}/api/Approval/BulkApproveRequestsAsync`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        showToast("Correction requested for selected timesheets.", "success");
        setRows((prevRows) =>
          prevRows.map((row) =>
            approvedRows.some((ar) => ar.requestId === row.requestId)
              ? {
                  ...row,
                  status: "processed",
                  Status: "PROCESSED",
                  selected: false,
                }
              : row
          )
        );
        setSelectedRows([]);
        setSelectAll(false);
      } else {
        showToast("Correction request failed.", "error");
      }
    } catch (error) {
      showToast("An error occurred during correction.", "error");
    } finally {
      setProcessedLoading(false);
    }
  };

  // Updated handleBulkApproveClick to check for approved rows
  const handleBulkApproveClick = () => {
    if (selectedRows.length === 0) {
      showToast("Please select at least one timesheet to approve.", "warning");
      return;
    }

    // Check if any selected rows are already approved
    const hasApprovedRows = selectedRows.some(
      (row) => (row["Status"] || "").toLowerCase() === "approved"
    );

    if (hasApprovedRows) {
      showToast("Cannot approve already approved timesheets.", "warning");
      return;
    }

    performBulkApprove("Bulk approved");
  };

  const correctionEligibleCount = selectedRows.filter(
    (row) => row.status?.toLowerCase() === "processed"
  ).length;

   const processedEligibleCount = selectedRows.filter(
    (row) => row.status?.toLowerCase() === "approved"
  ).length;

  const handleBulkRejectClick = () => {
    if (selectedRows.length === 0) {
      showToast("Please select at least one timesheet to reject.", "warning");
      return;
    }

    // Allow rejection of approved status
    const hasNonRejectableRows = selectedRows.some(
      (row) => row["Status"]?.toLowerCase() === "rejected"
    );

    if (hasNonRejectableRows) {
      showToast("Cannot reject already rejected timesheets.", "warning");
      return;
    }

    setPendingAction("rejected");
    setShowReasonModal(true);
  };

  const handleReasonConfirm = (reason) => {
    setShowReasonModal(false);
    if (pendingAction === "approved") {
      performBulkApprove(reason);
    } else if (pendingAction === "rejected") {
      performBulkReject(reason);
    }  else if (pendingAction === "correction") {
    performBulkCorrection(reason);  // New function needed
  }
    setPendingAction(null);
  };

  const handleReasonCancel = () => {
    setShowReasonModal(false);
    setPendingAction(null);
  };

  const performBulkCorrection = async (reason) => {
  setCorrectionLoading(true);
  const approvedRows = selectedRows.filter(
    (row) => row.status?.toLowerCase() === "processed"
  );
  
  try {
    const requestBody = buildBulkRequestBody(
      selectedRows,
      "correction",
      reason,  // Now properly passed from modal
      userIpAddress
    );
    
    const response = await fetch(
      `${backendUrl}/api/Approval/BulkApproveRequestsAsync`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );
    
    if (response.ok) {
      showToast("Correction requested for selected timesheets.", "success");
      setRows((prevRows) =>
        prevRows.map((row) =>
          approvedRows.some((ar) => ar.requestId === row.requestId)
            ? {
                ...row,
                status: "correction",
                Status: "CORRECTION",
                selected: false,
              }
            : row
        )
      );
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      showToast("Correction request failed.", "error");
    }
  } catch (error) {
    console.error("Correction error:", error);
    showToast("An error occurred during correction.", "error");
  } finally {
    setCorrectionLoading(false);
  }
};


  const performBulkApprove = async (reason) => {
    setApproveLoading(true); // Use specific loading state
    try {
      const requestBody = buildBulkRequestBody(
        selectedRows,
        "approved",
        reason,
        userIpAddress
      );

      console.log("Bulk Approve Payload:", requestBody);

      const response = await fetch(`${backendUrl}/api/Approval/BulkApproveRequestsAsync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const totalProcessed = requestBody.length;
        showToast(
          `Successfully approved ${totalProcessed} timesheet entries with reason: "${reason}"`,
          "success"
        );

        // Update all grouped entries in the state
        const approvedIds = selectedRows.flatMap((row) =>
          row.combinedIds && row.combinedIds.length > 0
            ? row.combinedIds
            : [row.id]
        );

        setRows((prevRows) =>
          prevRows.map((row) =>
            approvedIds.includes(row.id) ||
            (row.combinedIds &&
              row.combinedIds.some((id) => approvedIds.includes(id)))
              ? {
                  ...row,
                  isApproved: true,
                  status: "approved",
                  selected: false,
                  Status: "APPROVED",
                }
              : row
          )
        );

        setSelectedRows([]);
        setSelectAll(false);
      } else {
        const errorData = await response.text();
        console.error("Approval failed:", errorData);
        showToast(
          "Failed to approve some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Approval error:", error);
      showToast(
        "Failed to approve timesheets. Please check your connection.",
        "error"
      );
    } finally {
      setApproveLoading(false);
    }
  };

  const performBulkReject = async (reason) => {
    setRejectLoading(true); // Use specific loading state
    try {
      const requestBody = buildBulkRequestBody(
        selectedRows,
        "rejected",
        reason,
        userIpAddress
      );

      console.log("Bulk Reject Payload:", requestBody);

      const response = await fetch(`${backendUrl}/api/Approval/BulkApproveRequestsAsync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const totalProcessed = requestBody.length;
        showToast(
          `Successfully rejected ${totalProcessed} timesheet entries with reason: "${reason}"`,
          "success"
        );

        // Update all grouped entries in the state
        const rejectedIds = selectedRows.flatMap((row) =>
          row.combinedIds && row.combinedIds.length > 0
            ? row.combinedIds
            : [row.id]
        );

        setRows((prevRows) =>
          prevRows.map((row) =>
            rejectedIds.includes(row.id) ||
            (row.combinedIds &&
              row.combinedIds.some((id) => rejectedIds.includes(id)))
              ? {
                  ...row,
                  isRejected: true,
                  status: "rejected",
                  selected: false,
                  Status: "REJECTED",
                }
              : row
          )
        );

        setSelectedRows([]);
        setSelectAll(false);
      } else {
        const errorData = await response.text();
        console.error("Rejection failed:", errorData);
        showToast(
          "Failed to reject some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Rejection error:", error);
      showToast(
        "Failed to reject timesheets. Please check your connection.",
        "error"
      );
    } finally {
      setRejectLoading(false);
    }
  };

  const hasPendingRows = Array.isArray(filteredRows)
    ? filteredRows.some((row) => isRowActionable(row))
    : false;

    // if (!loading && userLoaded && currentUser && !isAdmin) {
    //   navigate("/dashboard");
    //   return null;
    // }

  //status checkbox
  const handleStatusCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedStatus = [...searchStatus];
    if (checked) {
      updatedStatus.push(value);
    } else {
      updatedStatus = updatedStatus.filter((status) => status !== value);
    }
    setSearchStatus(updatedStatus);
  };

  // clear all fiters
  const handleClearAllFilters = () => {
    setSearchDate("");
    setSearchEmployeeId("");
    setSearchEmployeeName("");
    setSearchStatus("");
    setFilterMonth("");
                      setFilterYear("");
    // Optional: reset other filter states if used
  };

  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col ">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading user session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      // <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
      //   <div className="flex-1 flex items-center justify-center">
      //     <div className="flex items-center">
      //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      //       <span className="ml-2">Loading approval data...</span>
      //     </div>
      //   </div>
      // </div>
      <div className="min-h-screen bg-f9fafd flex items-center justify-center ">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-lg text-gray-600">Loading data.....</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
      <ReasonModal
        isOpen={showReasonModal}
        action={pendingAction}
        selectedCount={selectedRows.length}
        onConfirm={handleReasonConfirm}
        onCancel={handleReasonCancel}
      />

      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
        <div className="w-full flex flex-col items-center">
          <div
            className="w-full flex justify-between items-center mb-4 px-6"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            {/* Left Side: Icon and Title */}
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Enquiry / Approvals
                </h1>
              </div>
            </div>

            {/* Right Side: Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded text-sm font-normal shadow transition"
            >
              Logout
            </button>
          </div>

          <fieldset
            className="border border-gray-300 rounded-md p-4 mb-2"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            <legend className="text-sm font-semibold text-gray-600 px-2">
              Filters
            </legend>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center">
                <label
                  htmlFor="filterMonthYear"
                  className="mr-2 text-xs font-semibold text-gray-600"
                >
                  Month/Year
                </label>
                <DatePicker
                  id="filterMonthYear"
                  selected={
                    filterMonth && filterYear
                      ? new Date(`${filterYear}-${filterMonth}-01T00:00:00`)
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                      const newMonth = String(date.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const newYear = String(date.getFullYear());
                      setFilterMonth(newMonth);
                      setFilterYear(newYear);
                    } else {
                      setFilterMonth("");
                      setFilterYear("");
                    }
                  }}
                  showMonthYearPicker
                  dateFormat="MM/yyyy"
                  placeholderText="MM/YYYY"
                  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  showPopperArrow={false}
                  autoComplete="off"
                />
              </div>

              {/* <div className="flex items-center">
                <label
                  htmlFor="filterDate"
                  className="mr-2 text-xs font-semibold text-gray-600"
                >
                  Date
                </label>
                <DatePicker
                  id="filterDate"
                  selected={
                    searchDate ? new Date(searchDate + "T00:00:00") : null
                  }
                  onChange={(date) => {
                    if (date) {
                      const localDate = new Date(
                        date.getTime() - date.getTimezoneOffset() * 60000
                      );
                      const isoString = localDate.toISOString().split("T")[0];
                      setSearchDate(isoString);
                    } else {
                      setSearchDate("");
                    }
                  }}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  showPopperArrow={false}
                  autoComplete="off"
                />
              </div> */}
              {/* <button
  onClick={fetchData}
  className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors"
>
  Apply Filters
</button> */}

              <div className="flex items-center">
                <label
                  htmlFor="filterEmpId"
                  className="mr-2 text-xs font-semibold text-gray-600"
                >
                  Employee ID
                </label>
                <input
                  id="filterEmpId"
                  type="text"
                  value={searchEmployeeId}
                  onChange={(e) => setSearchEmployeeId(e.target.value)}
                  placeholder="Employee ID"
                  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="filterEmpName"
                  className="mr-2 text-xs font-semibold text-gray-600"
                >
                  Employee Name
                </label>
                <input
                  id="filterEmpName"
                  type="text"
                  value={searchEmployeeName}
                  onChange={(e) => setSearchEmployeeName(e.target.value)}
                  placeholder="Employee Name"
                  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="filterStatus"
                  className="mr-2 text-xs font-semibold text-gray-600"
                >
                  Status :
                </label>
                {/* <select
                  id="filterStatus"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="submitted">Submitted</option>
                </select> */}
                <div className="flex flex-wrap gap-4 items-center">
                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      checked={searchStatus.includes("approved")}
                      value="approved"
                      onChange={handleStatusCheckboxChange}
                      className="cursor-pointer"
                    />
                    Approved
                  </label>

                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      checked={searchStatus.includes("rejected")}
                      value="rejected"
                      onChange={handleStatusCheckboxChange}
                      className="cursor-pointer"
                    />
                    Rejected
                  </label>

                  <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      checked={searchStatus.includes("submitted")}
                      value="submitted"
                      onChange={handleStatusCheckboxChange}
                      className="cursor-pointer"
                    />
                    Submitted
                  </label>

                  {/* <label className="flex items-center gap-1 text-xs font-semibold text-gray-600">
                    <input
                      type="checkbox"
                      checked={searchStatus.includes("correction")}
                      value="correction"
                      onChange={handleStatusCheckboxChange}
                      className="cursor-pointer"
                    />
                    Correction
                  </label> */}
                </div>
              </div>
              <button
                onClick={handleClearAllFilters}
                className="bg-gray-500 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </fieldset>

          <div
            className="border border-gray-300 rounded bg-white shadow w-full"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              // minWidth: "800px",
              padding: "0.5rem",
              overflow: "hidden",
              marginBottom: "5px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="flex justify-between items-center mb-2 w-full"
              style={{ flexShrink: 0 }}
            >
              <div className="flex gap-2">
                {!isUser && (
                  <>
                    {(() => {
                      const approveEligibleCount = selectedRows.filter(
                        (row) =>
                          row["Status"]?.toLowerCase() !== "approved" &&
                          row["Status"]?.toLowerCase() !== "rejected" && row["Status"]?.toLowerCase() !== "processed"
                      ).length;

                      const rejectEligibleCount = selectedRows.filter(
                        (row) => row["Status"]?.toLowerCase() !== "rejected" && row["Status"]?.toLowerCase() !== "processed"
                      ).length;

                            const hasProcessedSelected = selectedRows.some(
          (row) => row["Status"]?.toLowerCase() === "processed"
        );

        // NEW: Check if ALL selected rows are "processed" (only Correct enabled)
        const allProcessedSelected = selectedRows.length > 0 && 
          selectedRows.every(row => row["Status"]?.toLowerCase() === "processed");


                      const hasApprovedSelected = selectedRows.some(
                        (row) => row["Status"]?.toLowerCase() === "approved"
                      );

                      return (
                        <>
                          {/* Approve button */}
                          <button
                            onClick={handleBulkApproveClick}
                            disabled={
                              approveLoading ||
                              approveEligibleCount === 0 ||
                              hasApprovedSelected || hasProcessedSelected || allProcessedSelected
                            }
                            className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {approveLoading
                              ? "Processing..."
                              : `Approve (${approveEligibleCount})`}
                          </button>

                          {/* Reject button */}
                          <button
                            onClick={handleBulkRejectClick}
                            disabled={
                              rejectLoading || rejectEligibleCount === 0 || hasProcessedSelected || allProcessedSelected
                            }
                            className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {rejectLoading
                              ? "Processing..."
                              : `Reject (${rejectEligibleCount})`}
                          </button>
  {isAdmin && (
    <>
                          {/* Processed button */}
                          <button
                            onClick={handleBulkProcessedClick}
                            disabled={
                              processedLoading || processedEligibleCount === 0
                            }
                            className="bg-blue-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-blue-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {processedLoading ? "Processing..." : "Processed"} (
                            {processedEligibleCount})
                          </button>

                          {/* Correction button */}
                            
                                
                          <button
                            onClick={handleBulkCorrectionClick}
                            disabled={
                              correctionLoading || correctionEligibleCount === 0
                            }
                            className="bg-amber-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-amber-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {correctionLoading ? "Processing..." : "Correct"} (
                            {correctionEligibleCount})
                          </button>
                          </>
                          )}
                        </>
                            
                      );
                    })()}
                  </>
                )}
              </div>
            </div>

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "calc(100vh - 200px)",
                // minHeight: "300px",
                width: "100%",
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                scrollBehavior: "smooth",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f8fafc",
                    zIndex: 20,
                    borderBottom: "2px solid #e2e8f0",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col}
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "8px",
                          fontSize: "12px",
                          minWidth:
                            col === "All"
                              ? "80px"
                              : col === "Status"
                              ? "150px"
                              : `${colWidth}px`,
                          fontWeight: "bold",
                          color: "#1e40af",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9",
                          cursor: col !== "All" ? "pointer" : "default",
                          userSelect: "none",
                        }}
                        onClick={() => col !== "All" && handleSort(col)}
                      >
                        {col === "All" ? (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              justifyContent: "center",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={unifiedSelectAll}
                              onChange={(e) =>
                                handleUnifiedSelectAll(e.target.checked)
                              }
                              className="cursor-pointer"
                              disabled={!hasPendingRows}
                            />
                            <span
                              style={{ fontSize: "11px", fontWeight: "normal" }}
                            >
                              All
                            </span>
                          </div>
                        ) : (
                          <span>
                            {col}
                            {getSortIcon(col)}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* <tbody>
                  {filteredRows.length > 0 ? (
                    filteredRows.map((row, rdx) => (
                      <tr
                        key={`${row.requestId || row.id || rdx}-${
                          row["Employee ID"] || ""
                        }-${rdx}`}
                        style={{
                          backgroundColor:
                            currentSelectedRowId === row.id
                              ? "#e0f2fe"
                              : row.selected || row.notifySelected
                              ? "#dbeafe"
                              : rdx % 2 === 0
                              ? "#f9fafb"
                              : "white",
                          cursor: "pointer",
                          opacity:
                            (row["Status"] || "").toLowerCase() ===
                              "approved" ||
                            (row["Status"] || "").toLowerCase() === "rejected"
                              ? 0.7
                              : 1,
                        }}
                        onClick={() => handleRowClick(row)}
                        onMouseEnter={(e) =>
                          !row.selected &&
                          !row.notifySelected &&
                          currentSelectedRowId !== row.id &&
                          (e.target.closest("tr").style.backgroundColor =
                            "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          !row.selected &&
                          !row.notifySelected &&
                          currentSelectedRowId !== row.id &&
                          (e.target.closest("tr").style.backgroundColor =
                            rdx % 2 === 0 ? "#f9fafb" : "white")
                        }
                      >
                        {columns.map((col) => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth:
                                col === "All"
                                  ? "80px"
                                  : col === "Status"
                                  ? "150px"
                                  : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            {col === "Status" ? (
                              <span
                                style={getStatusStyle(row[col] || "PENDING")}
                              >
                                {(row[col] || "Pending")
                                  .charAt(0)
                                  .toUpperCase() +
                                  (row[col] || "Pending")
                                    .slice(1)
                                    .toLowerCase()}
                              </span>
                            ) : col === "All" ? (
                              <input
                                type="checkbox"
                                checked={
                                  row.selected ||
                                  false ||
                                  row.notifySelected ||
                                  false
                                }
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleUnifiedRowSelect(rdx, e.target.checked);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer"
                                disabled={
                                  !(
                                    isRowActionable(row) ||
                                    isApprovedRowRejectableOnly(row)
                                  ) ||
                                  row.isNotified ||
                                  row.status?.toLowerCase() === "notified" ||
                                  row.status?.toLowerCase() === "rejected"
                                }
                              />
                            ) : (
                              row[col] || ""
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          fontStyle: "italic",
                          color: "#666",
                        }}
                      >
                        No approval data available
                      </td>
                    </tr>
                  )}
                </tbody> */}
                <tbody>
  {filteredRows.length > 0 ? (
    filteredRows.map((row, rdx) => (
      <tr
        key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ""}-${rdx}`}
        style={{
          backgroundColor:
            currentSelectedRowId === row.id
              ? "#e0f2fe"
              : row.selected || row.notifySelected
              ? "#dbeafe"
              : rdx % 2 === 0
              ? "#f9fafb"
              : "white",
          cursor: "pointer",
          opacity:
            (row["Status"] || "").toLowerCase() === "approved" ||
            (row["Status"] || "").toLowerCase() === "rejected"
              ? 0.7
              : 1,
        }}
        onClick={() => handleRowClick(row)}
        onMouseEnter={(e) =>
          !row.selected &&
          !row.notifySelected &&
          currentSelectedRowId !== row.id &&
          (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
        }
        onMouseLeave={(e) =>
          !row.selected &&
          !row.notifySelected &&
          currentSelectedRowId !== row.id &&
          (e.target.closest("tr").style.backgroundColor =
            rdx % 2 === 0 ? "#f9fafb" : "white")
        }
      >
        {columns.map((col) => (
          <td
            key={col}
            style={{
              border: "1px solid #e5e7eb",
              padding: "8px",
              fontSize: "11px",
              minWidth:
                col === "All"
                  ? "80px"
                  : col === "Status"
                  ? "150px"
                  : `${colWidth}px`,
              whiteSpace: "nowrap",
              textAlign: "center",
              position: "relative",
            }}
          >
 {col === "Status" ? (
  <button
    type="button"
    className="relative inline-flex items-center justify-center"
    onClick={(e) => {
      e.stopPropagation();
      setApprovalPanelRow(row);   // open panel for this row
    }}
  >
    <span style={getStatusStyle(row[col] || "PENDING")}>
      {(row[col] || "Pending")
        .charAt(0).toUpperCase() +
        (row[col] || "Pending").slice(1).toLowerCase()}
    </span>
  </button>
)  : col === "All" ? (
              <input
                type="checkbox"
                checked={row.selected || false || row.notifySelected || false}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUnifiedRowSelect(rdx, e.target.checked);
                }}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer"
                disabled={
                  !(
                    isRowActionable(row) || isApprovedRowRejectableOnly(row)
                  ) ||
                  row.isNotified ||
                  row.status?.toLowerCase() === "notified" ||
                  row.status?.toLowerCase() === "rejected"
                }
              />
            ) : (
              row[col] || ""
            )}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={columns.length}
        style={{
          textAlign: "center",
          padding: "20px",
          fontStyle: "italic",
          color: "#666",
        }}
      >
        No approval data available
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>

            <div
  className="flex justify-between items-center mt-2 w-full"
  style={{ flexShrink: 0 }}
>
  {/* left content (if any) */}
  <div className="flex-1" />

  {/* right-side buttons */}
  <div className="flex gap-2 ml-auto">
    {isAdmin && (
      <>
        {/* Approval History Panel */}
 {/* <button
  onClick={() => setShowHistory(true)}
  disabled={!selectedTimesheetDate}
  className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
>
  Status
</button> */}

{/* Revision Audit */}
{/* <button
  onClick={() => setShowRevision(true)}
  disabled={!selectedTimesheetDate}
  className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
>
  Revision
</button> */}

      </>
    )}
  </div>
</div>

          </div>


{approvalPanelRow && approvalPanelRow.approvalActions?.length > 0 && (
  <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/20">
    {/* backdrop click to close */}
    <div
      className="absolute inset-0"
      onClick={() => setApprovalPanelRow(null)}
    />

    <div
      className="
        relative mt-20 ml-60 w-full max-w-xl 
        rounded-lg border border-gray-200
        bg-white shadow-xl
      "
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
          <span role="img" aria-label="history">📋</span>
          <span>Approval History</span>
          <span className="text-xs text-gray-500">
            ({approvalPanelRow['Employee ID']} · {approvalPanelRow['Timesheet Date']})
          </span>
        </div>
        <button
          type="button"
          onClick={() => setApprovalPanelRow(null)}
          className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
        >
          Close
        </button>
      </div>

      {/* body */}
      <div className="max-h-[60vh] overflow-y-auto px-5 py-4 space-y-3 text-xs text-gray-800 bg-white">
        {approvalPanelRow.approvalActions.map((action, idx) => (
          <div
            key={idx}
            className="pb-2 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-amber-600 font-medium">
                Level {action.levelNo}
              </span>
              <span className="text-blue-600 font-semibold">
                {action.actionStatus}
              </span>
              {action.actionDate && (
                <span className="text-gray-500">
                  {new Date(action.actionDate).toLocaleString()}
                </span>
              )}
            </div>

            {action.actionComment && (
              <div className="mt-1 px-3 py-2 bg-gray-50 rounded border-l-4 border-blue-500 whitespace-pre-wrap text-[11px] text-gray-700">
                {action.actionComment}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
)}

{/* {showHistory && (
  <TimesheetHistoryTable
    timesheetDate={selectedTimesheetDate}
    onClose={() => setShowHistory(false)}
  />
)}

{showRevision && (
  <TimesheetRevisionTable
    timesheetDate={selectedTimesheetDate}
    onClose={() => setShowRevision(false)}
  />
)}   */}


          {selectedResourceId && (
            <div
              ref={timesheetDetailsRef}
              style={{
                marginLeft: 24,
                marginRight: 24,
                width: "calc(100vw - 220px)",
                minWidth: "800px",
              }}
            >
              <TimesheetApprovalModal
                resourceId={selectedResourceId}
                timesheetDate={selectedTimesheetDate}
                onClose={() => {
                  setSelectedResourceId(null);
                  setCurrentSelectedRowId(null);
                  setSelectedTimesheetDate(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

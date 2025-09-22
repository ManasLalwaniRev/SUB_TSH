// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";

// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// const columnsAdmin = [
//   "Select", "Notify", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsAdmin;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       return date.toISOString().split('T')[0];
//     } catch {
//       return '';
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return '';
//     try {
//       const date = new Date(inputDate + 'T00:00:00');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return '';
//     }
//   };

//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         if (sortConfig.key === 'Date') {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === 'Employee ID') {
//           aVal = String(a["Employee ID"] || '').toLowerCase();
//           bVal = String(b["Employee ID"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Name') {
//           aVal = String(a["Name"] || '').toLowerCase();
//           bVal = String(b["Name"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Status') {
//           const getStatusPriority = (status) => {
//             const statusUpper = String(status || 'PENDING').toUpperCase();
//             switch (statusUpper) {
//               case 'OPEN': return 1;
//               case 'PENDING': return 2;
//               case 'APPROVED': return 3;
//               case 'REJECTED': return 4;
//               default: return 5;
//             }
//           };

//           aVal = getStatusPriority(a["Status"]);
//           bVal = getStatusPriority(b["Status"]);

//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         }

//         if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//           if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//           return 0;
//         }

//         return 0;
//       });
//     } else {
//       // Default sorting when no sort is applied
//       sorted.sort((a, b) => {
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return aDate.getTime() - bDate.getTime();
//         }
//         const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//         const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }

//     return sorted;
//   };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";

//     switch (statusUpper) {
//       case 'OPEN':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'APPROVED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'REJECTED':
//         return {
//           backgroundColor: '#fce7f3',
//           color: '#ec4899',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'PENDING':
//         return {
//           backgroundColor: '#fef9c3',
//           color: '#ca8a04',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'NOTIFIED':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'UN-NOTIFIED':
//       case 'UNNOTIFIED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#6b7280',
//           fontWeight: '500',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//     }
//   };

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//     try {
//       setLoading(true);
//       const apiUrl = "https://timesheet-subk.onrender.com/api/Timesheet/pending-approvals";

//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.status?.toLowerCase() || 'un-notified',
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "RLSE Number": item.rlseNumber || "",
//         "Hours": formatHours(item.hours),
//         "PO Number": item.poNumber || "",
//         "PO Line Number": item.poLineNumber || "",
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.status || "Un-Notified",
//         "Comment": item.comment || "",
//         isNotified: ((item.status || "").toLowerCase() === "notified"),
//       })) : [];

//       setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter(row => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row =>
//           notifiedIds.includes(row.id)
//             ? {
//                 ...row,
//                 status: "notified",
//                 "Status": "NOTIFIED",
//                 isNotified: true,
//                 notifySelected: false
//               }
//             : row
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleNotifyRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];

//     // Prevent selection of NOTIFIED rows
//     if (rowData.isNotified || rowData.status === 'notified' || rowData["Status"] === 'NOTIFIED') {
//       return;
//     }
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].notifySelected = isSelected;
//     setRows(updatedRows);

//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifySelectAll = (isSelected) => {
//     setNotifySelectAll(isSelected);
//     const updatedRows = [...rows];

//     // Filter out NOTIFIED rows from bulk selection
//     const selectableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     selectableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedNotifyRows(isSelected ? [...selectableRows] : []);
//   };

//   const handleRowSelect = (rowIndex, isSelected) => {
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);
//     updatedRows[actualRowIndex].selected = isSelected;
//     setRows(updatedRows);
//     const rowData = filteredRows[rowIndex];
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleSelectAll = (isSelected) => {
//     setSelectAll(isSelected);
//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });
//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const isRowActionable = row => (row.status === 'pending' || row.status === 'open' || row.status === 'un-notified') && !row.isApproved && !row.isRejected;
//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//                Welcome, {currentUser?.name}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleNotifyClick}
//                   disabled={actionLoading || selectedNotifyRows.length === 0}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: (col === "Select" || col === "Notify") ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                       >
//                         {col === "Select" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={e => handleSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : col === "Notify" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={notifySelectAll}
//                               onChange={e => handleNotifySelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: row.selected || row.notifySelected
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: col === "Select" || col === "Notify" ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
//                             }}>
//                             {col === "Status" ? (
//                               <span style={getStatusStyle(row[col] || "PENDING")}>
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "Select" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.selected || false}
//                                 onChange={e => handleRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={!isRowActionable(row)}
//                               />
//                             ) : col === "Notify" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={row.notifySelected || false}
//                                 onChange={e => handleNotifyRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={row.isNotified || (row[col] || row["Status"] || "").toLowerCase() === "notified"}
//                               />
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";

// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// const columnsAdmin = [
//   "All", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsAdmin;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       return date.toISOString().split('T')[0];
//     } catch {
//       return '';
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return '';
//     try {
//       const date = new Date(inputDate + 'T00:00:00');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return '';
//     }
//   };

//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         if (sortConfig.key === 'Date') {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === 'Employee ID') {
//           aVal = String(a["Employee ID"] || '').toLowerCase();
//           bVal = String(b["Employee ID"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Name') {
//           aVal = String(a["Name"] || '').toLowerCase();
//           bVal = String(b["Name"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Status') {
//           const getStatusPriority = (status) => {
//             const statusUpper = String(status || 'PENDING').toUpperCase();
//             switch (statusUpper) {
//               case 'OPEN': return 1;
//               case 'PENDING': return 2;
//               case 'APPROVED': return 3;
//               case 'REJECTED': return 4;
//               default: return 5;
//             }
//           };

//           aVal = getStatusPriority(a["Status"]);
//           bVal = getStatusPriority(b["Status"]);

//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         }

//         if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//           if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//           return 0;
//         }

//         return 0;
//       });
//     } else {
//       // Default sorting when no sort is applied
//       sorted.sort((a, b) => {
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return aDate.getTime() - bDate.getTime();
//         }
//         const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//         const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }

//     return sorted;
//   };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";

//     switch (statusUpper) {
//       case 'OPEN':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'APPROVED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'REJECTED':
//         return {
//           backgroundColor: '#fce7f3',
//           color: '#ec4899',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'PENDING':
//         return {
//           backgroundColor: '#fef9c3',
//           color: '#ca8a04',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'NOTIFIED':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'UN-NOTIFIED':
//       case 'UNNOTIFIED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#6b7280',
//           fontWeight: '500',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//     }
//   };

//   const isRowActionable = row => (row.status === 'pending' || row.status === 'open' || row.status === 'un-notified') && !row.isApproved && !row.isRejected;

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//     setUnifiedSelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//     try {
//       setLoading(true);
//       const apiUrl = "https://timesheet-subk.onrender.com/api/Timesheet/pending-approvals";

//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.status?.toLowerCase() || 'un-notified',
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "RLSE Number": item.rlseNumber || "",
//         "Hours": formatHours(item.hours),
//         "PO Number": item.poNumber || "",
//         "PO Line Number": item.poLineNumber || "",
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.status || "Un-Notified",
//         "Comment": item.comment || "",
//         isNotified: ((item.status || "").toLowerCase() === "notified"),
//       })) : [];

//       setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter(row => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // MOVED THIS useEffect AFTER filteredRows definition to fix the error
//   useEffect(() => {
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     const allActionableSelected = actionableRows.length > 0 && actionableRows.every(row => row.selected);
//     const allNotifiableSelected = notifiableRows.length > 0 && notifiableRows.every(row => row.notifySelected);

//     setUnifiedSelectAll(allActionableSelected && allNotifiableSelected && (actionableRows.length > 0 || notifiableRows.length > 0));
//   }, [selectedRows, selectedNotifyRows, filteredRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Unified select all handler
//   const handleUnifiedSelectAll = (isSelected) => {
//     setUnifiedSelectAll(isSelected);

//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     // Update select states
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });

//     // Update notify states
//     notifiableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });

//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//     setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//     setSelectAll(isSelected);
//     setNotifySelectAll(isSelected);
//   };

//   // Unified row select handler
//   const handleUnifiedRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);

//     // Update both selected and notifySelected if applicable
//     if (isRowActionable(rowData)) {
//       updatedRows[actualRowIndex].selected = isSelected;
//       handleRowSelectUpdate(rowData, isSelected);
//     }

//     if (!rowData.isNotified && rowData.status !== 'notified' && rowData["Status"] !== 'NOTIFIED') {
//       updatedRows[actualRowIndex].notifySelected = isSelected;
//       handleNotifyRowSelectUpdate(rowData, isSelected);
//     }

//     setRows(updatedRows);
//   };

//   const handleRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row =>
//           notifiedIds.includes(row.id)
//             ? {
//                 ...row,
//                 status: "notified",
//                 "Status": "NOTIFIED",
//                 isNotified: true,
//                 notifySelected: false
//               }
//             : row
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//                Welcome, {currentUser?.name}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleNotifyClick}
//                   disabled={actionLoading || selectedNotifyRows.length === 0}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: col === "All" ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                       >
//                         {col === "All" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={unifiedSelectAll}
//                               onChange={e => handleUnifiedSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: row.selected || row.notifySelected
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: col === "All" ? "80px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               ...(col === "Status" ? getStatusStyle(row[col]) : {})
//                             }}>
//                             {col === "Status" ? (
//                               <span style={getStatusStyle(row[col] || "PENDING")}>
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "All" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={(row.selected || false) || (row.notifySelected || false)}
//                                 onChange={e => handleUnifiedRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={
//                                   !isRowActionable(row) &&
//                                   (row.isNotified || (row["Status"] || "").toLowerCase() === "notified")
//                                 }
//                               />
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
// import TimesheetDetailModal from "./TimesheetDetailModal";

// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// // FIXED: Info column moved AFTER Status column
// const columnsAdmin = [
//   "All", "Status", "Info", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   // New state for detail modal
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsAdmin;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       return date.toISOString().split('T')[0];
//     } catch {
//       return '';
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return '';
//     try {
//       const date = new Date(inputDate + 'T00:00:00');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return '';
//     }
//   };

//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         if (sortConfig.key === 'Date') {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === 'Employee ID') {
//           aVal = String(a["Employee ID"] || '').toLowerCase();
//           bVal = String(b["Employee ID"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Name') {
//           aVal = String(a["Name"] || '').toLowerCase();
//           bVal = String(b["Name"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Status') {
//           const getStatusPriority = (status) => {
//             const statusUpper = String(status || 'PENDING').toUpperCase();
//             switch (statusUpper) {
//               case 'OPEN': return 1;
//               case 'PENDING': return 2;
//               case 'APPROVED': return 3;
//               case 'REJECTED': return 4;
//               default: return 5;
//             }
//           };

//           aVal = getStatusPriority(a["Status"]);
//           bVal = getStatusPriority(b["Status"]);

//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         }

//         if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//           if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//           return 0;
//         }

//         return 0;
//       });
//     } else {
//       // Default sorting when no sort is applied
//       sorted.sort((a, b) => {
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return aDate.getTime() - bDate.getTime();
//         }
//         const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//         const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }

//     return sorted;
//   };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";

//     switch (statusUpper) {
//       case 'OPEN':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'APPROVED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'REJECTED':
//         return {
//           backgroundColor: '#fce7f3',
//           color: '#ec4899',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'PENDING':
//         return {
//           backgroundColor: '#fef9c3',
//           color: '#ca8a04',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'NOTIFIED':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'UN-NOTIFIED':
//       case 'UNNOTIFIED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#6b7280',
//           fontWeight: '500',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//     }
//   };

//   const isRowActionable = row => (row.status === 'pending' || row.status === 'open' || row.status === 'un-notified') && !row.isApproved && !row.isRejected;

//   // New function to handle info button click
//   const handleInfoClick = (rowData) => {
//     setSelectedTimesheetData(rowData);
//     setShowDetailModal(true);
//   };

//   const handleCloseDetailModal = () => {
//     setShowDetailModal(false);
//     setSelectedTimesheetData(null);
//   };

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//     setUnifiedSelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//     try {
//       setLoading(true);
//       const apiUrl = "https://timesheet-subk.onrender.com/api/Timesheet/pending-approvals";

//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.status?.toLowerCase() || 'un-notified',
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "RLSE Number": item.rlseNumber || "",
//         "Hours": formatHours(item.hours),
//         "PO Number": item.poNumber || "",
//         "PO Line Number": item.poLineNumber || "",
//         "Seq No": item.sequenceNumber || "",
//         "Status": item.status || "Un-Notified",
//         "Comment": item.comment || "",
//         "Info": "View Details", // Added for the info column
//         isNotified: ((item.status || "").toLowerCase() === "notified"),
//       })) : [];

//       setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter(row => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // MOVED THIS useEffect AFTER filteredRows definition to fix the error
//   useEffect(() => {
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     const allActionableSelected = actionableRows.length > 0 && actionableRows.every(row => row.selected);
//     const allNotifiableSelected = notifiableRows.length > 0 && notifiableRows.every(row => row.notifySelected);

//     setUnifiedSelectAll(allActionableSelected && allNotifiableSelected && (actionableRows.length > 0 || notifiableRows.length > 0));
//   }, [selectedRows, selectedNotifyRows, filteredRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Unified select all handler
//   const handleUnifiedSelectAll = (isSelected) => {
//     setUnifiedSelectAll(isSelected);

//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     // Update select states
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });

//     // Update notify states
//     notifiableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });

//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//     setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//     setSelectAll(isSelected);
//     setNotifySelectAll(isSelected);
//   };

//   // Unified row select handler
//   const handleUnifiedRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);

//     // Update both selected and notifySelected if applicable
//     if (isRowActionable(rowData)) {
//       updatedRows[actualRowIndex].selected = isSelected;
//       handleRowSelectUpdate(rowData, isSelected);
//     }

//     if (!rowData.isNotified && rowData.status !== 'notified' && rowData["Status"] !== 'NOTIFIED') {
//       updatedRows[actualRowIndex].notifySelected = isSelected;
//       handleNotifyRowSelectUpdate(rowData, isSelected);
//     }

//     setRows(updatedRows);
//   };

//   const handleRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row =>
//           notifiedIds.includes(row.id)
//             ? {
//                 ...row,
//                 status: "notified",
//                 "Status": "NOTIFIED",
//                 isNotified: true,
//                 notifySelected: false
//               }
//             : row
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <TimesheetDetailModal
//         isOpen={showDetailModal}
//         timesheetData={selectedTimesheetData}
//         onClose={handleCloseDetailModal}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//                Welcome, {currentUser?.name}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleNotifyClick}
//                   disabled={actionLoading || selectedNotifyRows.length === 0}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           // FIXED: Status column width increased to fit content properly
//                           minWidth: col === "All" ? "80px" : col === "Info" ? "100px" : col === "Status" ? "150px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                       >
//                         {col === "All" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={unifiedSelectAll}
//                               onChange={e => handleUnifiedSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: row.selected || row.notifySelected
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               // FIXED: Status column width increased, Info button has proper width
//                               minWidth: col === "All" ? "80px" : col === "Info" ? "100px" : col === "Status" ? "150px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               // Keep original Status styling intact
//                               ...(col === "Status" ? {} : {})
//                             }}>
//                             {col === "Status" ? (
//                               // PRESERVED: Original Status styling unchanged
//                               <span style={getStatusStyle(row[col] || "PENDING")}>
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "All" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={(row.selected || false) || (row.notifySelected || false)}
//                                 onChange={e => handleUnifiedRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={
//                                   !isRowActionable(row) &&
//                                   (row.isNotified || (row["Status"] || "").toLowerCase() === "notified")
//                                 }
//                               />
//                             ) : col === "Info" ? (
//                               // FIXED: Info column positioned after Status
//                               <button
//                                 onClick={() => handleInfoClick(row)}
//                                 className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
//                                 title="View Details"
//                               >
//                                 Info
//                               </button>
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
// import TimesheetDetailModal from "./TimesheetDetailModal";

// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// // Updated columns without removed fields
// const columnsAdmin = [
//   "All", "Status", "Info", "Date", "Employee ID", "Name",
//   "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   // New state for detail modal
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsAdmin;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       return date.toISOString().split('T')[0];
//     } catch {
//       return '';
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return '';
//     try {
//       const date = new Date(inputDate + 'T00:00:00');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return '';
//     }
//   };

//   // const getSortedRows = (rowsToSort) => {
//   //   let sorted = [...rowsToSort];

//   //   if (sortConfig.key) {
//   //     sorted.sort((a, b) => {
//   //       let aVal, bVal;

//   //       if (sortConfig.key === 'Date') {
//   //         aVal = new Date(a.originalDate || a["Date"]);
//   //         bVal = new Date(b.originalDate || b["Date"]);
//   //         if (isNaN(aVal.getTime())) aVal = new Date(0);
//   //         if (isNaN(bVal.getTime())) bVal = new Date(0);
//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       } else if (sortConfig.key === 'Employee ID') {
//   //         aVal = String(a["Employee ID"] || '').toLowerCase();
//   //         bVal = String(b["Employee ID"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Name') {
//   //         aVal = String(a["Name"] || '').toLowerCase();
//   //         bVal = String(b["Name"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Status') {
//   //         const getStatusPriority = (status) => {
//   //           const statusUpper = String(status || 'PENDING').toUpperCase();
//   //           switch (statusUpper) {
//   //             case 'OPEN': return 1;
//   //             case 'PENDING': return 2;
//   //             case 'APPROVED': return 3;
//   //             case 'REJECTED': return 4;
//   //             default: return 5;
//   //           }
//   //         };

//   //         aVal = getStatusPriority(a["Status"]);
//   //         bVal = getStatusPriority(b["Status"]);

//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       }

//   //       if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//   //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//   //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//   //         return 0;
//   //       }

//   //       return 0;
//   //     });
//   //   } else {
//   //     // Default sorting when no sort is applied
//   //     sorted.sort((a, b) => {
//   //       let aDate = new Date(a.originalDate || a["Date"]);
//   //       let bDate = new Date(b.originalDate || b["Date"]);
//   //       if (isNaN(aDate.getTime())) aDate = new Date(0);
//   //       if (isNaN(bDate.getTime())) bDate = new Date(0);
//   //       if (aDate.getTime() !== bDate.getTime()) {
//   //         return aDate.getTime() - bDate.getTime();
//   //       }
//   //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//   //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//   //       return aEmpId.localeCompare(bEmpId);
//   //     });
//   //   }

//   //   return sorted;
//   // };

//   const getSortedRows = (rowsToSort) => {
//   let sorted = [...rowsToSort];

//   if (sortConfig.key) {
//     sorted.sort((a, b) => {
//       let aVal, bVal;

//       if (sortConfig.key === 'Date') {
//         aVal = new Date(a.originalDate || a["Date"]);
//         bVal = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aVal.getTime())) aVal = new Date(0);
//         if (isNaN(bVal.getTime())) bVal = new Date(0);
//         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//       } else if (sortConfig.key === 'Employee ID') {
//         aVal = String(a["Employee ID"] || '').toLowerCase();
//         bVal = String(b["Employee ID"] || '').toLowerCase();
//       } else if (sortConfig.key === 'Name') {
//         aVal = String(a["Name"] || '').toLowerCase();
//         bVal = String(b["Name"] || '').toLowerCase();
//       } else if (sortConfig.key === 'Status') {
//         const getStatusPriority = (status) => {
//           const statusUpper = String(status || 'PENDING').toUpperCase();
//           switch (statusUpper) {
//             case 'OPEN': return 1;
//             case 'PENDING': return 2;
//             case 'APPROVED': return 3;
//             case 'REJECTED': return 4;
//             default: return 5;
//           }
//         };

//         aVal = getStatusPriority(a["Status"]);
//         bVal = getStatusPriority(b["Status"]);

//         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//       }

//       if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       }

//       return 0;
//     });
//   } else {
//     // Default sorting when no sort is applied - FIXED: Show newest first
//     sorted.sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return bDate.getTime() - aDate.getTime(); // ← FIXED: newest first
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   }

//   return sorted;
// };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";

//     switch (statusUpper) {
//       case 'OPEN':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'APPROVED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'REJECTED':
//         return {
//           backgroundColor: '#fce7f3',
//           color: '#ec4899',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'PENDING':
//         return {
//           backgroundColor: '#fef9c3',
//           color: '#ca8a04',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'NOTIFIED':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'UN-NOTIFIED':
//       case 'UNNOTIFIED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#6b7280',
//           fontWeight: '500',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//     }
//   };

//   const isRowActionable = row => (row.status === 'pending' || row.status === 'open' || row.status === 'un-notified') && !row.isApproved && !row.isRejected;

//   // New function to handle info button click
//   const handleInfoClick = (rowData) => {
//     setSelectedTimesheetData(rowData);
//     setShowDetailModal(true);
//   };

//   const handleCloseDetailModal = () => {
//     setShowDetailModal(false);
//     setSelectedTimesheetData(null);
//   };

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//     setUnifiedSelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   // const fetchData = async () => {
//   //   if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//   //   try {
//   //     setLoading(true);
//   //     // Updated API endpoint
//   //     const apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//   //     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//   //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//   //     const apiData = await response.json();

//   //     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//   //       id: item.timesheetId || item.id || `fallback-${index}`,
//   //       requestId: item.requestId || item.id,
//   //       levelNo: item.levelNo || 1,
//   //       selected: false,
//   //       notifySelected: false,
//   //       isApproved: item.approvalStatus === 'APPROVED' || false,
//   //       isRejected: item.approvalStatus === 'REJECTED' || false,
//   //       isNotified: item.approvalStatus === 'NOTIFIED' || false,
//   //       status: item.status?.toLowerCase() || 'un-notified',
//   //       originalDate: item.timesheetDate,
//   //       "Date": formatDate(item.timesheetDate),
//   //       // Updated field mappings per requirements
//   //       "Employee ID": item.resource_Id || "",
//   //       "Name": item.displayedName || item.employeeName || `Employee ${item.resource_Id}` || "",
//   //       "Project ID": item.projectId || "",
//   //       "Account": item.accountId || "",
//   //       "Org": item.organizationId || "",
//   //       "PLC": item.projectLaborCategory || "",
//   //       "Pay Type": item.payType || "",
//   //       "RLSE Number": item.rlseNumber || "",
//   //       "Hours": formatHours(item.hours),
//   //       "PO Number": item.poNumber || "",
//   //       "PO Line Number": item.poLineNumber || "",
//   //       "Status": item.status || "Un-Notified",
//   //       "Comment": item.comment || "",
//   //       "Info": "View Details",
//   //       isNotified: ((item.status || "").toLowerCase() === "notified"),
//   //     })) : [];

//   //     setRows(mappedData);
//   //   } catch (error) {
//   //     setRows([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchData = async () => {
//   if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//   try {
//     setLoading(true);
//     // Updated API endpoint
//     const apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     const apiData = await response.json();

//     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//       id: item.timesheetId || item.id || `fallback-${index}`,
//       requestId: item.requestId || item.id,
//       levelNo: item.levelNo || 1,
//       selected: false,
//       notifySelected: false,
//       isApproved: item.approvalStatus === 'APPROVED' || false,
//       isRejected: item.approvalStatus === 'REJECTED' || false,
//       isNotified: item.approvalStatus === 'NOTIFIED' || false,
//       status: item.status?.toLowerCase() || 'un-notified',
//       originalDate: item.createdAt,                           // ← UPDATED
//       "Date": formatDate(item.createdAt),                     // ← UPDATED
//       // Updated field mappings per requirements
//       "Employee ID": item.resource_Id || "",
//       "Name": item.displayedName || item.employeeName || `Employee ${item.resource_Id}` || "",
//       "Project ID": item.projId || "",                        // ← UPDATED
//       "Account": item.accountId || "",
//       "Org": item.organizationId || "",
//       "PLC": item.plc || "",                                  // ← UPDATED
//       "Pay Type": item.payType || "",
//       "RLSE Number": item.rlseNumber || "",
//       "Hours": formatHours(item.hours),
//       "PO Number": item.poNumber || "",
//       "PO Line Number": item.poLineNumber || "",
//       "Status": item.status || "Un-Notified",
//       "Comment": item.comment || "",
//       "Info": "View Details",
//       isNotified: ((item.status || "").toLowerCase() === "notified"),
//     })) : [];

//     setRows(mappedData);
//   } catch (error) {
//     setRows([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter(row => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // MOVED THIS useEffect AFTER filteredRows definition to fix the error
//   useEffect(() => {
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     const allActionableSelected = actionableRows.length > 0 && actionableRows.every(row => row.selected);
//     const allNotifiableSelected = notifiableRows.length > 0 && notifiableRows.every(row => row.notifySelected);

//     setUnifiedSelectAll(allActionableSelected && allNotifiableSelected && (actionableRows.length > 0 || notifiableRows.length > 0));
//   }, [selectedRows, selectedNotifyRows, filteredRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Unified select all handler
//   const handleUnifiedSelectAll = (isSelected) => {
//     setUnifiedSelectAll(isSelected);

//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     // Update select states
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });

//     // Update notify states
//     notifiableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });

//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//     setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//     setSelectAll(isSelected);
//     setNotifySelectAll(isSelected);
//   };

//   // Unified row select handler
//   const handleUnifiedRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);

//     // Update both selected and notifySelected if applicable
//     if (isRowActionable(rowData)) {
//       updatedRows[actualRowIndex].selected = isSelected;
//       handleRowSelectUpdate(rowData, isSelected);
//     }

//     if (!rowData.isNotified && rowData.status !== 'notified' && rowData["Status"] !== 'NOTIFIED') {
//       updatedRows[actualRowIndex].notifySelected = isSelected;
//       handleNotifyRowSelectUpdate(rowData, isSelected);
//     }

//     setRows(updatedRows);
//   };

//   const handleRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row =>
//           notifiedIds.includes(row.id)
//             ? {
//                 ...row,
//                 status: "notified",
//                 "Status": "NOTIFIED",
//                 isNotified: true,
//                 notifySelected: false
//               }
//             : row
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <TimesheetDetailModal
//         isOpen={showDetailModal}
//         timesheetData={selectedTimesheetData}
//         onClose={handleCloseDetailModal}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//                Welcome, {currentUser?.name}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleNotifyClick}
//                   disabled={actionLoading || selectedNotifyRows.length === 0}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: col === "All" ? "80px" : col === "Info" ? "100px" : col === "Status" ? "150px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                       >
//                         {col === "All" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={unifiedSelectAll}
//                               onChange={e => handleUnifiedSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: row.selected || row.notifySelected
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: col === "All" ? "80px" : col === "Info" ? "100px" : col === "Status" ? "150px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               ...(col === "Status" ? {} : {})
//                             }}>
//                             {col === "Status" ? (
//                               <span style={getStatusStyle(row[col] || "PENDING")}>
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "All" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={(row.selected || false) || (row.notifySelected || false)}
//                                 onChange={e => handleUnifiedRowSelect(rdx, e.target.checked)}
//                                 className="cursor-pointer"
//                                 disabled={
//                                   !isRowActionable(row) &&
//                                   (row.isNotified || (row["Status"] || "").toLowerCase() === "notified")
//                                 }
//                               />
//                             ) : col === "Info" ? (
//                               <button
//                                 onClick={() => handleInfoClick(row)}
//                                 className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
//                                 title="View Details"
//                               >
//                                 Info
//                               </button>
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
// import TimesheetDetailModal from "./TimesheetDetailModal";

// const showToast = (message, type = 'info') => {
//   const bgColor = type === 'success' ? '#4ade80'
//     : type === 'error' ? '#ef4444'
//       : type === 'warning' ? '#f59e0b' : '#3b82f6';
//   const toast = document.createElement('div');
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime = message.includes('import') || message.includes('Import') ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       'https://api.ipify.org?format=json',
//       'https://ipapi.co/json/',
//       'https://httpbin.org/ip'
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || '';
//         }
//       } catch { }
//     }
//     return '';
//   } catch {
//     return '';
//   }
// };

// // Updated columns without Info field
// const columnsAdmin = [
//   "All", "Status", "Date", "Employee ID", "Name",
//   "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours"
// ];

// const ReasonModal = ({ isOpen, action, selectedCount, onConfirm, onCancel }) => {
//   const [reason, setReason] = useState('');
//   useEffect(() => { if (isOpen) setReason(''); }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () => reason.trim() ? onConfirm(reason.trim()) : showToast('Please provide a reason.', 'warning');
//   const handleKeyPress = e => {
//     if (e.key === 'Enter' && e.ctrlKey) handleConfirm();
//     else if (e.key === 'Escape') onCancel();
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onCancel}>
//       <div className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl" onClick={e => e.stopPropagation()}>
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === 'approve' ? 'Approve' : 'Reject'} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet{selectedCount > 1 ? 's' : ''}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={e => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${action === 'approve' ? 'approving' : 'rejecting'} these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">Cancel</button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {action === 'approve' ? 'Approve' : 'Reject'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const fileInputRef = useRef(null);

//   // State for TimesheetDetailModal component (not popup)
//   const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsAdmin;
//   const colWidth = 120;
//   const minTableWidth = columns.length * colWidth;

//   const tableRowRefs = useRef({});

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return '';
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '';
//       return date.toISOString().split('T');
//     } catch {
//       return '';
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return '';
//     try {
//       const date = new Date(inputDate + 'T00:00:00');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const day = String(date.getDate()).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return '';
//     }
//   };

//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         if (sortConfig.key === 'Date') {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === 'Employee ID') {
//           aVal = String(a["Employee ID"] || '').toLowerCase();
//           bVal = String(b["Employee ID"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Name') {
//           aVal = String(a["Name"] || '').toLowerCase();
//           bVal = String(b["Name"] || '').toLowerCase();
//         } else if (sortConfig.key === 'Status') {
//           const getStatusPriority = (status) => {
//             const statusUpper = String(status || 'PENDING').toUpperCase();
//             switch (statusUpper) {
//               case 'OPEN': return 1;
//               case 'PENDING': return 2;
//               case 'APPROVED': return 3;
//               case 'REJECTED': return 4;
//               default: return 5;
//             }
//           };

//           aVal = getStatusPriority(a["Status"]);
//           bVal = getStatusPriority(b["Status"]);

//           return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//         }

//         if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//           if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//           return 0;
//         }

//         return 0;
//       });
//     } else {
//       // Default sorting when no sort is applied - FIXED: Show newest first
//       sorted.sort((a, b) => {
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return bDate.getTime() - aDate.getTime(); // ← FIXED: newest first
//         }
//         const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//         const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }

//     return sorted;
//   };

//   const handleSort = (key) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   const getStatusStyle = (status) => {
//     const statusUpper = status?.toUpperCase() || "PENDING";

//     switch (statusUpper) {
//       case 'OPEN':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'APPROVED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'REJECTED':
//         return {
//           backgroundColor: '#fce7f3',
//           color: '#ec4899',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'PENDING':
//         return {
//           backgroundColor: '#fef9c3',
//           color: '#ca8a04',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'NOTIFIED':
//         return {
//           backgroundColor: '#dbeafe',
//           color: '#2563eb',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       case 'UN-NOTIFIED':
//       case 'UNNOTIFIED':
//         return {
//           backgroundColor: '#dcfce7',
//           color: '#16a34a',
//           fontWeight: '600',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//       default:
//         return {
//           backgroundColor: '#f3f4f6',
//           color: '#6b7280',
//           fontWeight: '500',
//           padding: '4px 8px',
//           fontSize: '11px',
//           display: 'inline-block'
//         };
//     }
//   };

//   const isRowActionable = row => (row.status === 'pending' || row.status === 'open' || row.status === 'un-notified') && !row.isApproved && !row.isRejected;

//   // Handle row click to show details
//   const handleRowClick = (rowData) => {
//     setSelectedTimesheetData(rowData);
//   };

//   // Close detail view
//   const handleCloseDetail = () => {
//     setSelectedTimesheetData(null);
//   };

//   useEffect(() => {
//     getUserIPAddress().then(ip => setUserIpAddress(ip || ''));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username = parsedUser.id === "john" ? "john.doe" :
//             parsedUser.id === "jane" ? "jane.smith" : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//     setUnifiedSelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin) fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   const fetchData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username || !isAdmin) return;
//     try {
//       setLoading(true);
//       // Updated API endpoint
//       const apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `fallback-${index}`,
//         requestId: item.requestId || item.id,
//         levelNo: item.levelNo || 1,
//         selected: false,
//         notifySelected: false,
//         isApproved: item.approvalStatus === 'APPROVED' || false,
//         isRejected: item.approvalStatus === 'REJECTED' || false,
//         isNotified: item.approvalStatus === 'NOTIFIED' || false,
//         status: item.status?.toLowerCase() || 'un-notified',
//         originalDate: item.createdAt,                           // ← UPDATED
//         "Date": formatDate(item.createdAt),                     // ← UPDATED
//         // Updated field mappings per requirements
//         "Employee ID": item.resource_Id || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.resource_Id}` || "",
//         "Project ID": item.projId || "",                        // ← UPDATED
//         "Account": item.accountId || "",
//         "Org": item.organizationId || "",
//         "PLC": item.plc || "",                                  // ← UPDATED
//         "Pay Type": item.payType || "",
//         "RLSE Number": item.rlseNumber || "",
//         "Hours": formatHours(item.hours),
//         "PO Number": item.poNumber || "",
//         "PO Line Number": item.poLineNumber || "",
//         "Status": item.status || "Un-Notified",
//         "Comment": item.comment || "",
//         isNotified: ((item.status || "").toLowerCase() === "notified"),
//       })) : [];

//       setRows(mappedData);
//     } catch (error) {
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter(row => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // MOVED THIS useEffect AFTER filteredRows definition to fix the error
//   useEffect(() => {
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     const allActionableSelected = actionableRows.length > 0 && actionableRows.every(row => row.selected);
//     const allNotifiableSelected = notifiableRows.length > 0 && notifiableRows.every(row => row.notifySelected);

//     setUnifiedSelectAll(allActionableSelected && allNotifiableSelected && (actionableRows.length > 0 || notifiableRows.length > 0));
//   }, [selectedRows, selectedNotifyRows, filteredRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Unified select all handler
//   const handleUnifiedSelectAll = (isSelected) => {
//     setUnifiedSelectAll(isSelected);

//     const updatedRows = [...rows];
//     const actionableRows = filteredRows.filter(row => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(row =>
//       !row.isNotified && row.status !== 'notified' && row["Status"] !== 'NOTIFIED'
//     );

//     // Update select states
//     actionableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].selected = isSelected;
//     });

//     // Update notify states
//     notifiableRows.forEach(filteredRow => {
//       const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//       if (actualRowIndex !== -1) updatedRows[actualRowIndex].notifySelected = isSelected;
//     });

//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//     setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//     setSelectAll(isSelected);
//     setNotifySelectAll(isSelected);
//   };

//   // Unified row select handler
//   const handleUnifiedRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(row => row.id === filteredRows[rowIndex].id);

//     // Update both selected and notifySelected if applicable
//     if (isRowActionable(rowData)) {
//       updatedRows[actualRowIndex].selected = isSelected;
//       handleRowSelectUpdate(rowData, isSelected);
//     }

//     if (!rowData.isNotified && rowData.status !== 'notified' && rowData["Status"] !== 'NOTIFIED') {
//       updatedRows[actualRowIndex].notifySelected = isSelected;
//       handleNotifyRowSelectUpdate(rowData, isSelected);
//     }

//     setRows(updatedRows);
//   };

//   const handleRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedRows(prev => prev.filter(item => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedNotifyRows(prev => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows(prev => prev.filter(item => item.id !== rowData.id));
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast('Please select at least one timesheet to notify.', "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map(row => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`
//       }));
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkNotify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`, "success");
//         const notifiedIds = selectedNotifyRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row =>
//           notifiedIds.includes(row.id)
//             ? {
//                 ...row,
//                 status: "notified",
//                 "Status": "NOTIFIED",
//                 isNotified: true,
//                 notifySelected: false
//               }
//             : row
//         ));
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast('Failed to send notifications. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to send notifications. Please try again.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map(row => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       approverUserId: 1,
//       comment: `${action === 'approve' ? 'Approved' : 'Rejected'} by ${currentUser.name}: ${reason}`,
//       ipAddress: ipAddress
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }
//     setPendingAction('approve');
//     setShowReasonModal(true);
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction('reject');
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === 'approve') {
//       performBulkApprove(reason);
//     } else if (pendingAction === 'reject') {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'approve', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkApprove', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const approvedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => approvedIds.includes(row.id) ?
//           { ...row, isApproved: true, status: 'approved', selected: false, "Status": "APPROVED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to approve some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to approve timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(selectedRows, 'reject', reason, userIpAddress);
//       const response = await fetch('https://timesheet-subk.onrender.com/api/Approval/BulkReject', {
//         method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody)
//       });
//       if (response.ok) {
//         showToast(`Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`, "success");
//         const rejectedIds = selectedRows.map(row => row.id);
//         setRows(prevRows => prevRows.map(row => rejectedIds.includes(row.id) ?
//           { ...row, isRejected: true, status: 'rejected', selected: false, "Status": "REJECTED" } : row));
//         setSelectedRows([]);
//         setSelectAll(false);
//       } else {
//         showToast('Failed to reject some timesheets. Please try again.', "error");
//       }
//     } catch (error) {
//       showToast('Failed to reject timesheets. Please check your connection.', "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const hasPendingRows = Array.isArray(filteredRows) ? filteredRows.some(row => isRowActionable(row)) : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//                Welcome, {currentUser?.name}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3 mb-3 items-center flex-wrap" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T');
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               minHeight: "350px",
//               maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-between items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 {hasPendingRows && (
//                   <>
//                     <button
//                       onClick={handleBulkApproveClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//                     </button>
//                     <button
//                       onClick={handleBulkRejectClick}
//                       disabled={actionLoading || selectedRows.length === 0}
//                       className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//                     </button>
//                   </>
//                 )}
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleNotifyClick}
//                   disabled={actionLoading || selectedNotifyRows.length === 0}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-orange-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Sending..." : `Notify (${selectedNotifyRows.length})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 180px)",
//                 minHeight: "200px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px"
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "max-content"
//                 }}
//               >
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map(col => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: col === "All" ? "80px" : col === "Status" ? "150px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                       >
//                         {col === "All" ? (
//                           <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
//                             <input
//                               type="checkbox"
//                               checked={unifiedSelectAll}
//                               onChange={e => handleUnifiedSelectAll(e.target.checked)}
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span style={{ fontSize: "11px", fontWeight: "normal" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>{col}{getSortIcon(col)}</span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: row.selected || row.notifySelected
//                             ? "#dbeafe"
//                             : rdx % 2 === 0 ? "#f9fafb" : "white",
//                           cursor: "pointer"
//                         }}
//                         onClick={() => handleRowClick(row)}
//                         onMouseEnter={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor = "#f3f4f6")
//                         }
//                         onMouseLeave={e =>
//                           !row.selected && !row.notifySelected && (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: col === "All" ? "80px" : col === "Status" ? "150px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               ...(col === "Status" ? {} : {})
//                             }}>
//                             {col === "Status" ? (
//                               <span style={getStatusStyle(row[col] || "PENDING")}>
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "All" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={(row.selected || false) || (row.notifySelected || false)}
//                                 onChange={e => {
//                                   e.stopPropagation();
//                                   handleUnifiedRowSelect(rdx, e.target.checked);
//                                 }}
//                                 onClick={e => e.stopPropagation()}
//                                 className="cursor-pointer"
//                                 disabled={
//                                   !isRowActionable(row) &&
//                                   (row.isNotified || (row["Status"] || "").toLowerCase() === "notified")
//                                 }
//                               />
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))}
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666"
//                         }}>
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* TimesheetDetailModal as component below table */}
//           {selectedTimesheetData && (
//             <div className="w-full" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//               <TimesheetDetailModal
//                 timesheetData={selectedTimesheetData}
//                 onClose={handleCloseDetail}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
// import TimesheetApprovalModal from "./TimesheetApprovalModal";

// const showToast = (message, type = "info") => {
//   const bgColor =
//     type === "success"
//       ? "#4ade80"
//       : type === "error"
//       ? "#ef4444"
//       : type === "warning"
//       ? "#f59e0b"
//       : "#3b82f6";
//   const toast = document.createElement("div");
//   toast.textContent = message;
//   toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//   document.body.appendChild(toast);
//   const displayTime =
//     message.includes("import") || message.includes("Import") ? 4000 : 1000;
//   setTimeout(() => {
//     toast.style.opacity = "0";
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, displayTime);
// };

// const getUserIPAddress = async () => {
//   try {
//     const endpoints = [
//       "https://api.ipify.org?format=json",
//       "https://ipapi.co/json/",
//       "https://httpbin.org/ip",
//     ];
//     for (const url of endpoints) {
//       try {
//         const res = await fetch(url);
//         if (res.ok) {
//           const data = await res.json();
//           return data.ip || data.origin || "";
//         }
//       } catch {}
//     }
//     return "";
//   } catch {
//     return "";
//   }
// };

// // Updated columns without Info field
// const columnsAdmin = [
//   "All",
//   "Status",
//   "Timesheet Date",
//   "Employee ID",
//   "Name",
//   // "Project ID",
//   // "PLC",
//   // "Pay Type",
//   // "RLSE Number",
//   // "PO Number",
//   // "PO Line Number",
//   "Hours",
// ];

// const ReasonModal = ({
//   isOpen,
//   action,
//   selectedCount,
//   onConfirm,
//   onCancel,
// }) => {
//   const [reason, setReason] = useState("");
//   useEffect(() => {
//     if (isOpen) setReason("");
//   }, [isOpen]);
//   if (!isOpen) return null;
//   const handleConfirm = () =>
//     reason.trim()
//       ? onConfirm(reason.trim())
//       : showToast("Please provide a reason.", "warning");
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && e.ctrlKey) handleConfirm();
//     else if (e.key === "Escape") onCancel();
//   };
//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={onCancel}
//     >
//       <div
//         className="bg-white rounded-lg p-6 w-96 max-w-90vw shadow-xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             {action === "approve" ? "Approve" : "Reject"} Timesheets
//           </h3>
//           <p className="text-sm text-gray-600">
//             You are about to {action} {selectedCount} timesheet
//             {selectedCount > 1 ? "s" : ""}. Please provide a reason:
//           </p>
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder={`Enter reason for ${
//               action === "approve" ? "approving" : "rejecting"
//             } these timesheets...`}
//             className="w-full h-24 p-3 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             maxLength={500}
//             autoFocus
//           />
//           <div className="text-xs text-gray-500 mt-1">
//             {reason.length}/500 characters • Press Ctrl+Enter to confirm • Esc
//             to cancel
//           </div>
//         </div>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleConfirm}
//             disabled={!reason.trim()}
//             className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
//               action === "approve"
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//           >
//             {action === "approve" ? "Approve" : "Reject"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Approval() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectedNotifyRows, setSelectedNotifyRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [notifySelectAll, setNotifySelectAll] = useState(false);
//   const [unifiedSelectAll, setUnifiedSelectAll] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState("");
//   const [searchEmployeeId, setSearchEmployeeId] = useState("");
//   const [searchEmployeeName, setSearchEmployeeName] = useState("");
//   const [selectedResourceId, setSelectedResourceId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   // const fileInputRef = useRef(null);

//   const timesheetDetailsRef = useRef(null);


//   // Add ref for current selected row to track background color
//   const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);

//   // State for TimesheetDetailModal component (not popup)
//   const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);

//   const [showReasonModal, setShowReasonModal] = useState(false);
//   const [pendingAction, setPendingAction] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState("");

//   // Add this useEffect to set the default search date

// useEffect(() => {

//     const today = new Date();

//     // Get today's date components based on UTC

//     const year = today.getUTCFullYear();

//     const month = today.getUTCMonth();

//     const day = today.getUTCDate();

//     const dayOfWeek = today.getUTCDay(); // 0 for Sunday (UTC)
 
//     // Create a new Date object for today, firmly in UTC

//     const todayUTC = new Date(Date.UTC(year, month, day));
 
//     // Calculate the upcoming Sunday by adding days to the UTC date

//     // The (% 7) handles the case where today is already Sunday

//     const daysToAdd = (7 - dayOfWeek) % 7;

//     todayUTC.setUTCDate(todayUTC.getUTCDate() + daysToAdd);
 
//     // Format the final UTC date into a "YYYY-MM-DD" string for the state

//     const finalYear = todayUTC.getUTCFullYear();

//     const finalMonth = String(todayUTC.getUTCMonth() + 1).padStart(2, '0');

//     const finalDay = String(todayUTC.getUTCDate()).padStart(2, '0');

//     const formattedDateForState = `${finalYear}-${finalMonth}-${finalDay}`;
 
//     setSearchDate(formattedDateForState);
 
// }, []); // Empty dependency array ensures this runs only once
 

//   // const isAdmin = currentUser?.role === "admin";
//   const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pm";

//   const columns = columnsAdmin;
//   const colWidth = 150;
//   const minTableWidth = columns.length * colWidth;

//   // Format date to MM/DD/YYYY with leading zeros
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return dateString;
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   const formatHours = (hours) => {
//     if (!hours && hours !== 0) return "";
//     const numHours = parseFloat(hours);
//     if (isNaN(numHours)) return hours;
//     return numHours.toFixed(2);
//   };

//   // Convert date to YYYY-MM-DD for HTML date input
//   const formatDateForDateInput = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return "";
//       return date.toISOString().split("T")[0];
//     } catch {
//       return "";
//     }
//   };

//   // Convert YYYY-MM-DD from date input to MM/DD/YYYY for display and comparison
//   const formatDateFromInput = (inputDate) => {
//     if (!inputDate) return "";
//     try {
//       const date = new Date(inputDate + "T00:00:00");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${month}/${day}/${year}`;
//     } catch {
//       return "";
//     }
//   };

//   // const getSortedRows = (rowsToSort) => {
//   //   let sorted = [...rowsToSort];

//   //   if (sortConfig.key) {
//   //     sorted.sort((a, b) => {
//   //       let aVal, bVal;

//   //       if (sortConfig.key === 'Date') {
//   //         aVal = new Date(a.originalDate || a["Date"]);
//   //         bVal = new Date(b.originalDate || b["Date"]);
//   //         if (isNaN(aVal.getTime())) aVal = new Date(0);
//   //         if (isNaN(bVal.getTime())) bVal = new Date(0);
//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       } else if (sortConfig.key === 'Employee ID') {
//   //         aVal = String(a["Employee ID"] || '').toLowerCase();
//   //         bVal = String(b["Employee ID"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Name') {
//   //         aVal = String(a["Name"] || '').toLowerCase();
//   //         bVal = String(b["Name"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Status') {
//   //         const getStatusPriority = (status) => {
//   //           const statusUpper = String(status || 'PENDING').toUpperCase();
//   //           switch (statusUpper) {
//   //             case 'OPEN': return 1;
//   //             case 'PENDING': return 2;
//   //             case 'APPROVED': return 3;
//   //             case 'REJECTED': return 4;
//   //             default: return 5;
//   //           }
//   //         };

//   //         aVal = getStatusPriority(a["Status"]);
//   //         bVal = getStatusPriority(b["Status"]);

//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       }

//   //       if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//   //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//   //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//   //         return 0;
//   //       }

//   //       return 0;
//   //     });
//   //   } else {
//   //     // Default sorting when no sort is applied - FIXED: Show newest first
//   //     sorted.sort((a, b) => {
//   //       let aDate = new Date(a.originalDate || a["Date"]);
//   //       let bDate = new Date(b.originalDate || b["Date"]);
//   //       if (isNaN(aDate.getTime())) aDate = new Date(0);
//   //       if (isNaN(bDate.getTime())) bDate = new Date(0);
//   //       if (aDate.getTime() !== bDate.getTime()) {
//   //         return bDate.getTime() - aDate.getTime(); // ← FIXED: newest first
//   //       }
//   //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//   //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//   //       return aEmpId.localeCompare(bEmpId);
//   //     });
//   //   }

//   //   return sorted;
//   // };

//   //   const getSortedRows = (rowsToSort) => {
//   //   let sorted = [...rowsToSort];

//   //   if (sortConfig.key) {
//   //     sorted.sort((a, b) => {
//   //       let aVal, bVal;

//   //       if (sortConfig.key === 'Date') {
//   //         aVal = new Date(a.originalDate || a["Date"]);
//   //         bVal = new Date(b.originalDate || b["Date"]);
//   //         if (isNaN(aVal.getTime())) aVal = new Date(0);
//   //         if (isNaN(bVal.getTime())) bVal = new Date(0);
//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       } else if (sortConfig.key === 'Line No') {
//   //         aVal = parseInt(a.lineNo) || 0;
//   //         bVal = parseInt(b.lineNo) || 0;
//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       } else if (sortConfig.key === 'Employee ID') {
//   //         aVal = String(a["Employee ID"] || '').toLowerCase();
//   //         bVal = String(b["Employee ID"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Name') {
//   //         aVal = String(a["Name"] || '').toLowerCase();
//   //         bVal = String(b["Name"] || '').toLowerCase();
//   //       } else if (sortConfig.key === 'Status') {
//   //         const getStatusPriority = (status) => {
//   //           const statusUpper = String(status || 'PENDING').toUpperCase();
//   //           switch (statusUpper) {
//   //             case 'OPEN': return 1;
//   //             case 'PENDING': return 2;
//   //             case 'APPROVED': return 3;
//   //             case 'REJECTED': return 4;
//   //             default: return 5;
//   //           }
//   //         };

//   //         aVal = getStatusPriority(a["Status"]);
//   //         bVal = getStatusPriority(b["Status"]);

//   //         return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
//   //       }

//   //       if (sortConfig.key === 'Employee ID' || sortConfig.key === 'Name') {
//   //         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//   //         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//   //         return 0;
//   //       }

//   //       return 0;
//   //     });
//   //   } else {
//   //     // Default sorting - FIXED: Sort by lineNo first for proper sequence
//   //     sorted.sort((a, b) => {
//   //       // Primary sort: by lineNo (ascending for proper sequence 1,2,3...)
//   //       const aLineNo = parseInt(a.lineNo) || 0;
//   //       const bLineNo = parseInt(b.lineNo) || 0;
//   //       if (aLineNo !== bLineNo) {
//   //         return aLineNo - bLineNo; // ← FIXED: lineNo ascending
//   //       }

//   //       // Secondary sort: by date (newest first for same lineNo)
//   //       let aDate = new Date(a.originalDate || a["Date"]);
//   //       let bDate = new Date(b.originalDate || b["Date"]);
//   //       if (isNaN(aDate.getTime())) aDate = new Date(0);
//   //       if (isNaN(bDate.getTime())) bDate = new Date(0);
//   //       if (aDate.getTime() !== bDate.getTime()) {
//   //         return bDate.getTime() - aDate.getTime();
//   //       }

//   //       // Tertiary sort: by Employee ID
//   //       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//   //       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//   //       return aEmpId.localeCompare(bEmpId);
//   //     });
//   //   }

//   //   return sorted;
//   // };

//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         // Handle different column types
//         if (sortConfig.key === "Timesheet Date") {
//           aVal = new Date(a.originalDate || a["Timesheet Date"]);
//           bVal = new Date(b.originalDate || b["Timesheet Date"]);
//           if (isNaN(aVal.getTime())) aVal = new Date(0);
//           if (isNaN(bVal.getTime())) bVal = new Date(0);
//           return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === "Hours") {
//           aVal = parseFloat(a["Hours"]) || 0;
//           bVal = parseFloat(b["Hours"]) || 0;
//           return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
//         } else if (
//           [
//             "Employee ID",
//             "Project ID",
//             "PO Number",
//             "PO Line Number",
//             "RLSE Number",
//           ].includes(sortConfig.key)
//         ) {
//           // Numeric sorting for ID fields
//           aVal = parseInt(a[sortConfig.key]) || 0;
//           bVal = parseInt(b[sortConfig.key]) || 0;
//           if (aVal === bVal) {
//             // If numeric values are equal, fall back to string comparison
//             aVal = String(a[sortConfig.key] || "").toLowerCase();
//             bVal = String(b[sortConfig.key] || "").toLowerCase();
//             if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//             if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//             return 0;
//           }
//           return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
//         } else if (sortConfig.key === "Status") {
//           const getStatusPriority = (status) => {
//             const statusUpper = String(status || "PENDING").toUpperCase();
//             switch (statusUpper) {
//               case "OPEN":
//                 return 1;
//               case "PENDING":
//                 return 2;
//               case "APPROVED":
//                 return 3;
//               case "REJECTED":
//                 return 4;
//               default:
//                 return 5;
//             }
//           };

//           aVal = getStatusPriority(a["Status"]);
//           bVal = getStatusPriority(b["Status"]);

//           return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
//         } else {
//           // String sorting for all other columns
//           aVal = String(a[sortConfig.key] || "").toLowerCase();
//           bVal = String(b[sortConfig.key] || "").toLowerCase();
//           if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//           if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//           return 0;
//         }
//       });
//     } else {
//       // Default sorting - Sort by lineNo first for proper sequence
//       sorted.sort((a, b) => {
//         // Primary sort: by lineNo (ascending for proper sequence 1,2,3...)
//         const aLineNo = parseInt(a.lineNo) || 0;
//         const bLineNo = parseInt(b.lineNo) || 0;
//         if (aLineNo !== bLineNo) {
//           return aLineNo - bLineNo; // lineNo ascending
//         }

//         // Secondary sort: by date (newest first for same lineNo)
//         let aDate = new Date(a.originalDate || a[" Timesheet Date"]);
//         let bDate = new Date(b.originalDate || b[" Timesheet Date"]);
//         if (isNaN(aDate.getTime())) aDate = new Date(0);
//         if (isNaN(bDate.getTime())) bDate = new Date(0);
//         if (aDate.getTime() !== bDate.getTime()) {
//           return bDate.getTime() - aDate.getTime();
//         }

//         // Tertiary sort: by Employee ID
//         const aEmpId = String(a["Employee ID"] || "").toLowerCase();
//         const bEmpId = String(b["Employee ID"] || "").toLowerCase();
//         return aEmpId.localeCompare(bEmpId);
//       });
//     }

//     return sorted;
//   };

//   // const handleSort = (key) => {
//   //   if (!['Date', 'Employee ID', 'Name', 'Status'].includes(key)) return;

//   //   let direction = 'asc';
//   //   if (sortConfig.key === key && sortConfig.direction === 'asc') {
//   //     direction = 'desc';
//   //   }
//   //   setSortConfig({ key, direction });
//   // };

//   const handleSort = (key) => {
//     if (key === "All") return; // Skip checkbox column

//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   // const getSortIcon = (columnKey) => {
//   //   if (!['Date', 'Employee ID', 'Name', 'Status'].includes(columnKey)) return null;

//   //   if (sortConfig.key === columnKey) {
//   //     return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//   //   }
//   //   return ' ⇅';
//   // };

//   const getSortIcon = (columnKey) => {
//     if (columnKey === "All") return null; // Skip checkbox column

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === "asc" ? " ↑" : " ↓";
//     }
//     return " ⇅";
//   };

//   // const getStatusStyle = (status) => {
//   //   const statusUpper = status?.toUpperCase() || "PENDING";

//   //   switch (statusUpper) {
//   //     case "OPEN":
//   //       return {
//   //         backgroundColor: "#dbeafe",
//   //         color: "#2563eb",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     case "APPROVED":
//   //       return {
//   //         backgroundColor: "#dcfce7",
//   //         color: "#16a34a",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     case "REJECTED":
//   //       return {
//   //         backgroundColor: "#fce7f3",
//   //         color: "#ec4899",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     case "PENDING":
//   //       return {
//   //         backgroundColor: "#fef9c3",
//   //         color: "#ca8a04",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     case "NOTIFIED":
//   //       return {
//   //         backgroundColor: "#dbeafe",
//   //         color: "#2563eb",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     case "UN-NOTIFIED":
//   //     case "UNNOTIFIED":
//   //       return {
//   //         backgroundColor: "#dcfce7",
//   //         color: "#16a34a",
//   //         fontWeight: "600",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //     default:
//   //       return {
//   //         backgroundColor: "#f3f4f6",
//   //         color: "#6b7280",
//   //         fontWeight: "500",
//   //         padding: "4px 8px",
//   //         fontSize: "11px",
//   //         display: "inline-block",
//   //         borderRadius: "9999px",
//   //       };
//   //   }
//   // };
//   const getStatusStyle = (status) => {
//     // Convert to proper case instead of uppercase
//     const statusProper = status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Pending";
    
//     switch (status?.toUpperCase()) {
//         case "OPEN":
//             return {
//                 backgroundColor: "#dbeafe",
//                 color: "#2563eb",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         case "APPROVED":
//             return {
//                 backgroundColor: "#dcfce7",
//                 color: "#16a34a",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         case "REJECTED":
//             return {
//                 backgroundColor: "#fce7f3",
//                 color: "#ec4899",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         case "PENDING":
//             return {
//                 backgroundColor: "#fef9c3",
//                 color: "#ca8a04",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         case "NOTIFIED":
//             return {
//                 backgroundColor: "#dbeafe",
//                 color: "#2563eb",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         case "UN-NOTIFIED":
//         case "UNNOTIFIED":
//             return {
//                 backgroundColor: "#dcfce7",
//                 color: "#16a34a",
//                 fontWeight: "600",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//         default:
//             return {
//                 backgroundColor: "#f3f4f6",
//                 color: "#6b7280",
//                 fontWeight: "500",
//                 padding: "4px 8px",
//                 fontSize: "11px",
//                 display: "inline-block",
//                 borderRadius: "9999px",
//             };
//     }
// };

//   // const isRowActionable = (row) =>
//   //   (row.status === "pending" ||
//   //     row.status === "open" ||
//   //     row.status === "un-notified" ||
//   // row.status === "submitted") &&

//   //   !row.isApproved &&
//   //   !row.isRejected;

//   // Function to scroll to bottom where TimesheetDetailModal appears
//   const isRowActionable = (row) => {
//     const status = row.status?.toLowerCase();
//     // Disable rows that are already approved or rejected
//     return (
//         status === "pending" || 
//         status === "open" || 
//         status === "un-notified" || 
//         status === "submitted" || 
//         status === "approved"
//     ) && !row.isApproved && !row.isRejected && status !== "approved" && status !== "rejected";
// };

//   const scrollToTimesheetDetail = () => {
//     setTimeout(() => {
//       const timesheetDetailElement = document.querySelector(
//         "[data-timesheet-detail]"
//       );
//       if (timesheetDetailElement) {
//         timesheetDetailElement.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       } else {
//         // Fallback: scroll to bottom of page
//         window.scrollTo({
//           top: document.body.scrollHeight,
//           behavior: "smooth",
//         });
//       }
//     }, 100);
//   };

//   // Handle row click to show details
//   // const handleRowClick = (rowData) => {
//   //   setSelectedTimesheetData(rowData);
//   //   setCurrentSelectedRowId(rowData.id); // Set current selected row for background color
//   //   scrollToTimesheetDetail(); // Scroll to show timesheet detail
//   // };
// //   const handleRowClick = (rowData, event) => {
// //   // Don't trigger row click if clicking on checkbox
// //   if (event?.target?.type === 'checkbox') {
// //     return;
// //   }
  
// //   // Map the data correctly for the modal
// //   const mappedData = {
// //     "Employee ID": rowData["Employee ID"],
// //     "Date": rowData["Timesheet Date"] || rowData.originalDate,
// //     "Status": rowData["Status"],
// //     "Name": rowData["Name"],
// //     // Include all original data
// //     ...rowData
// //   };
  
// //   console.log("Row clicked, mapped data:", mappedData); // Debug log
  
// //   setSelectedTimesheetData(mappedData);
// //   setCurrentSelectedRowId(rowData.id);
// //   scrollToTimesheetDetail();
// // };

// // const handleRowClick = (rowData) => {
// //   setSelectedResourceId(rowData["Employee ID"] || rowData.resource_Id);
// //   setShowModal(true);
// // };

// const handleRowClick = (rowData, event) => {
//   // Don't trigger row click if clicking on checkbox
//   if (event?.target?.type === 'checkbox') {
//     return;
//   }
  
//   // Set the selected resource ID and current row ID for highlighting
//   setSelectedResourceId(rowData["Employee ID"]);
//   setCurrentSelectedRowId(rowData.id);
  
//   // Auto scroll to timesheet details after a short delay to ensure component renders
//   setTimeout(() => {
//     if (timesheetDetailsRef.current) {
//       timesheetDetailsRef.current.scrollIntoView({ 
//         behavior: 'smooth', 
//         block: 'start',
//         inline: 'nearest'
//       });
//     }
//   }, 100);
// };



//   // Close detail view
//   // const handleCloseDetail = () => {
//   //   setSelectedTimesheetData(null);
//   //   setCurrentSelectedRowId(null); // Clear selected row background
//   // };
//   const handleCloseDetails = () => {
//   setSelectedResourceId(null);
// };

//   useEffect(() => {
//     getUserIPAddress().then((ip) => setUserIpAddress(ip || ""));
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         if (!parsedUser.username) {
//           parsedUser.username =
//             parsedUser.id === "john"
//               ? "john.doe"
//               : parsedUser.id === "jane"
//               ? "jane.smith"
//               : parsedUser.id;
//         }
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         showToast("Session expired. Please login again.", "error");
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     setSelectedRows([]);
//     setSelectedNotifyRows([]);
//     setSelectAll(false);
//     setNotifySelectAll(false);
//     setUnifiedSelectAll(false);
//   }, []);

//   useEffect(() => {
//     if (userLoaded && currentUser && currentUser.username && isAdmin)
//       fetchData();
//   }, [userLoaded, currentUser, isAdmin]);

//   // const fetchData = async () => {
//   //   if (!userLoaded || !currentUser || !currentUser.username || !isAdmin)
//   //     return;
//   //   try {
//   //     setLoading(true);
//   //     // Updated API endpoint
//   //     const apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//   //     const response = await fetch(apiUrl, {
//   //       method: "GET",
//   //       headers: { "Content-Type": "application/json" },
//   //     });
//   //     if (!response.ok)
//   //       throw new Error(`HTTP error! status: ${response.status}`);
//   //     const apiData = await response.json();

//   //     // const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//   //     //   id: item.timesheetId || item.id || `fallback-${index}`,
//   //     //   requestId: item.requestId || item.id,
//   //     //   levelNo: item.levelNo || 1,
//   //     //   selected: false,
//   //     //   notifySelected: false,
//   //     //   isApproved: item.approvalStatus === 'APPROVED' || false,
//   //     //   isRejected: item.approvalStatus === 'REJECTED' || false,
//   //     //   isNotified: item.approvalStatus === 'NOTIFIED' || false,
//   //     //   status: item.status?.toLowerCase() || 'un-notified',
//   //     //   originalDate: item.createdAt,                           // ← UPDATED
//   //     //   "Date": formatDate(item.createdAt),                     // ← UPDATED
//   //     //   // Updated field mappings per requirements
//   //     //   "Employee ID": item.resource_Id || "",
//   //     //   "Name": item.displayedName || item.employeeName || `Employee ${item.resource_Id}` || "",
//   //     //   "Project ID": item.projId || "",                        // ← UPDATED
//   //     //   "Account": item.accountId || "",
//   //     //   "Org": item.organizationId || "",
//   //     //   "PLC": item.plc || "",                                  // ← UPDATED
//   //     //   "Pay Type": item.payType || "",
//   //     //   "RLSE Number": item.rlseNumber || "",
//   //     //   "Hours": formatHours(item.hours),
//   //     //   "PO Number": item.poNumber || "",
//   //     //   "PO Line Number": item.poLineNumber || "",
//   //     //   "Status": item.status || "Un-Notified",
//   //     //   "Comment": item.comment || "",
//   //     //   isNotified: ((item.status || "").toLowerCase() === "notified"),
//   //     // })) : [];

//   //     const mappedData = Array.isArray(apiData)
//   //       ? apiData.map((item, index) => ({
//   //           id: item.timesheetId || item.id || `fallback-${index}`,

//   //           requestId: item.requestId || item.id,
//   //           levelNo: item.levelNo || 1,
//   //           lineNo: item.lineNo || item.timesheetId || item.id, // ← ADD THIS LINE
//   //           selected: false,
//   //           notifySelected: false,
//   //           isApproved: item.approvalStatus === "APPROVED" || false,
//   //           isRejected: item.approvalStatus === "REJECTED" || false,
//   //           isNotified: item.approvalStatus === "NOTIFIED" || false,
//   //           status: item.status?.toLowerCase() || "un-notified",
//   //           originalDate: item.createdAt,
//   //           Date: formatDate(item.createdAt),
//   //           "Employee ID": item.resource_Id || "",
//   //           Name:
//   //             item.displayedName ||
//   //             item.employeeName ||
//   //             `Employee ${item.resource_Id}` ||
//   //             "",
//   //           "Project ID": item.projId || "",
//   //           Account: item.accountId || "",
//   //           Org: item.organizationId || "",
//   //           PLC: item.plc || "",
//   //           "Pay Type": item.payType || "",
//   //           "RLSE Number": item.rlseNumber || "",
//   //           Hours: formatHours(item.hours),
//   //           "PO Number": item.poNumber || "",
//   //           "PO Line Number": item.poLineNumber || "",
//   //           Status: item.status || "Un-Notified",
//   //           Comment: item.comment || "",
//   //           isNotified: (item.status || "").toLowerCase() === "notified",
//   //         }))
//   //       : [];

//   //     setRows(mappedData);
//   //   } catch (error) {
//   //     setRows([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
  
//   const fetchData = async () => {
//   if (!userLoaded || !currentUser || !currentUser.username )
//     return;
//   try {
//     setLoading(true);
    
//     // Use the username from login response as resourceId (e.g., "9030668")
//     const resourceId = currentUser.username;
    
//     // Updated API endpoint to use pending approvals by resource
//     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/pending-approvals/ByResource/${resourceId}`;

//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });
    
//     if (!response.ok)
//       throw new Error(`HTTP error! status: ${response.status}`);
//     const apiData = await response.json();

//     // Rest of your existing mapping code remains exactly the same
//     const mappedData = Array.isArray(apiData)
//       ? apiData.map((item, index) => ({
//           id: item.timesheetId || item.id || `fallback-${index}`,
//           requestId: item.requestId || item.id,
//           levelNo: item.levelNo || 1,
//           lineNo: item.lineNo || item.timesheetId || item.id,
//           selected: false,
//           notifySelected: false,
//           isApproved: item.approvalStatus === "APPROVED" || false,
//           isRejected: item.approvalStatus === "REJECTED" || false,
//           isNotified: item.approvalStatus === "NOTIFIED" || false,
//           status: item.status?.toLowerCase() || "un-notified",
//           // originalDate: item.createdAt,
//            originalDate: item.timesheet_Date || item.timesheetDate, // Map to timesheet_Date first
//           Date: formatDate(item.timesheet_Date),
//            "Timesheet Date": formatDate(item.timesheet_Date), // Map to timesheet_Date from API
//           "Employee ID": item.resource_Id || "",
//           // Name: item.displayedName || item.employeeName || `Employee ${item.resource_Id}` || "",
//           // "Project ID": item.projId || "",
//           Name: item.displayedName || item.employeeName || "Employee",
//           Account: item.accountId || "",
//           Org: item.organizationId || "",
//           PLC: item.plc || "",
//           "Pay Type": item.payType || "",
//           "RLSE Number": item.rlseNumber || "",
//           Hours: formatHours(item.hours),
//           "PO Number": item.poNumber || "",
//           "PO Line Number": item.poLineNumber || "",
//           approverUserId: item.approverUserId,
//           Status: item.status || "Un-Notified",
//           Comment: item.comment || "",
//           isNotified: (item.status || "").toLowerCase() === "notified",
//         }))
//       : [];

//     setRows(mappedData);
//   } catch (error) {
//     console.error('Error fetching approval data:', error);
//     setRows([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     if (searchDate) {
//       const searchDateFormatted = formatDateFromInput(searchDate);
//       filtered = filtered.filter((row) => {
//         const rowDate = row["Date"];
//         return rowDate === searchDateFormatted;
//       });
//     }

//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter((row) =>
//         (row["Employee ID"] || "")
//           .toLowerCase()
//           .includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter((row) =>
//         (row["Name"] || "")
//           .toLowerCase()
//           .includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // MOVED THIS useEffect AFTER filteredRows definition to fix the error
//   useEffect(() => {
//     const actionableRows = filteredRows.filter((row) => isRowActionable(row));
//     const notifiableRows = filteredRows.filter(
//       (row) =>
//         !row.isNotified &&
//         row.status !== "notified" &&
//         row["Status"] !== "NOTIFIED"
//     );

//     const allActionableSelected =
//       actionableRows.length > 0 && actionableRows.every((row) => row.selected);
//     const allNotifiableSelected =
//       notifiableRows.length > 0 &&
//       notifiableRows.every((row) => row.notifySelected);

//     setUnifiedSelectAll(
//       allActionableSelected &&
//         allNotifiableSelected &&
//         (actionableRows.length > 0 || notifiableRows.length > 0)
//     );
//   }, [selectedRows, selectedNotifyRows, filteredRows]);

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Unified select all handler
//   // const handleUnifiedSelectAll = (isSelected) => {
//   //   setUnifiedSelectAll(isSelected);

//   //   const updatedRows = [...rows];
//   //   const actionableRows = filteredRows.filter((row) => isRowActionable(row));
//   //   const notifiableRows = filteredRows.filter(
//   //     (row) =>
//   //       !row.isNotified &&
//   //       row.status !== "notified" &&
//   //       row["Status"] !== "NOTIFIED"
//   //   );

//   //   // Update select states
//   //   actionableRows.forEach((filteredRow) => {
//   //     const actualRowIndex = rows.findIndex((row) => row.id === filteredRow.id);
//   //     if (actualRowIndex !== -1)
//   //       updatedRows[actualRowIndex].selected = isSelected;
//   //   });

//   //   // Update notify states
//   //   notifiableRows.forEach((filteredRow) => {
//   //     const actualRowIndex = rows.findIndex((row) => row.id === filteredRow.id);
//   //     if (actualRowIndex !== -1)
//   //       updatedRows[actualRowIndex].notifySelected = isSelected;
//   //   });

//   //   setRows(updatedRows);
//   //   setSelectedRows(isSelected ? [...actionableRows] : []);
//   //   setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//   //   setSelectAll(isSelected);
//   //   setNotifySelectAll(isSelected);
//   // };
//   const handleUnifiedSelectAll = (isSelected) => {
//     setUnifiedSelectAll(isSelected);
//     const updatedRows = [...rows];
    
//     // Only select actionable rows (not approved/rejected)
//     const actionableRows = filteredRows.filter(row => 
//         isRowActionable(row) && 
//         row.status?.toLowerCase() !== "approved" && 
//         row.status?.toLowerCase() !== "rejected"
//     );
    
//     const notifiableRows = filteredRows.filter(
//         row => 
//             !row.isNotified && 
//             row.status !== "notified" && 
//             row["Status"]?.toLowerCase() !== "notified" &&
//             row.status?.toLowerCase() !== "approved" &&
//             row.status?.toLowerCase() !== "rejected"
//     );

//     // Update select states for actionable rows only
//     actionableRows.forEach((filteredRow) => {
//         const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//         if (actualRowIndex !== -1) {
//             updatedRows[actualRowIndex].selected = isSelected;
//         }
//     });

//     // Update notify states for notifiable rows only
//     notifiableRows.forEach((filteredRow) => {
//         const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
//         if (actualRowIndex !== -1) {
//             updatedRows[actualRowIndex].notifySelected = isSelected;
//         }
//     });

//     setRows(updatedRows);
//     setSelectedRows(isSelected ? [...actionableRows] : []);
//     setSelectedNotifyRows(isSelected ? [...notifiableRows] : []);
//     setSelectAll(isSelected);
//     setNotifySelectAll(isSelected);
// };


//   // Unified row select handler
//   const handleUnifiedRowSelect = (rowIndex, isSelected) => {
//     const rowData = filteredRows[rowIndex];
//     const updatedRows = [...rows];
//     const actualRowIndex = rows.findIndex(
//       (row) => row.id === filteredRows[rowIndex].id
//     );

//     // Update both selected and notifySelected if applicable
//     if (isRowActionable(rowData)) {
//       updatedRows[actualRowIndex].selected = isSelected;
//       handleRowSelectUpdate(rowData, isSelected);
//     }

//     if (
//       !rowData.isNotified &&
//       rowData.status !== "notified" &&
//       rowData["Status"] !== "NOTIFIED"
//     ) {
//       updatedRows[actualRowIndex].notifySelected = isSelected;
//       handleNotifyRowSelectUpdate(rowData, isSelected);
//     }

//     setRows(updatedRows);
//   };

//   const handleRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedRows((prev) => [...prev, rowData]);
//     } else {
//       setSelectedRows((prev) => prev.filter((item) => item.id !== rowData.id));
//       setSelectAll(false);
//     }
//   };

//   const handleNotifyRowSelectUpdate = (rowData, isSelected) => {
//     if (isSelected) {
//       setSelectedNotifyRows((prev) => [...prev, rowData]);
//     } else {
//       setSelectedNotifyRows((prev) =>
//         prev.filter((item) => item.id !== rowData.id)
//       );
//       setNotifySelectAll(false);
//     }
//   };

//   const handleNotifyClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedNotifyRows.length === 0) {
//       showToast("Please select at least one timesheet to notify.", "warning");
//       return;
//     }
//     try {
//       setActionLoading(true);
//       const requestBody = selectedNotifyRows.map((row) => ({
//         requestType: "TIMESHEET",
//         requesterId: 1,
//         timesheetId: row.id,
//         ProjectId: row["Project ID"],
//         requestData: `Notification for timesheet ${row.id}`,
//       }));
//       const response = await fetch(
//         "https://timesheet-subk.onrender.com/api/Approval/BulkNotify",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         }
//       );
//       if (response.ok) {
//         showToast(
//           `Notifications sent for ${selectedNotifyRows.length} timesheets successfully!`,
//           "success"
//         );
//         const notifiedIds = selectedNotifyRows.map((row) => row.id);
//         setRows((prevRows) =>
//           prevRows.map((row) =>
//             notifiedIds.includes(row.id)
//               ? {
//                   ...row,
//                   status: "notified",
//                   Status: "NOTIFIED",
//                   isNotified: true,
//                   notifySelected: false,
//                 }
//               : row
//           )
//         );
//         setSelectedNotifyRows([]);
//         setNotifySelectAll(false);

//         // Refresh data after 2 seconds
//         setTimeout(() => {
//           fetchData();
//         }, 2000);
//       } else {
//         showToast("Failed to send notifications. Please try again.", "error");
//       }
//     } catch (error) {
//       showToast("Failed to send notifications. Please try again.", "error");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
//     return selectedRows.map((row) => ({
//       requestId: row.requestId || row.id,
//       levelNo: row.levelNo || 1,
//       // approverUserId: 1,
//       // approverUserId: row.approverUserId,
//        approverUserId: currentUser.approvalUserId || row.approverUserId,
//       comment: `${action === "approve" ? "Approved" : "Rejected"} by ${
//         currentUser.name
//       }: ${reason}`,
//       ipAddress: ipAddress,
//     }));
//   };

//   const handleBulkApproveClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to approve.", "warning");
//       return;
//     }

//     // Check if any selected rows are already approved
//     const hasApprovedRows = selectedRows.some(row => 
//         (row["Status"] || "").toLowerCase() === "approved"
//     );
    
//     if (hasApprovedRows) {
//         showToast("Cannot approve already approved timesheets.", "warning");
//         return;
//     }
//     // setPendingAction("approve");
//     // setShowReasonModal(true);
//     performBulkApprove("Bulk approved"); // Add default reason here
//   };

//   const handleBulkRejectClick = () => {
//     if (selectedRows.length === 0) {
//       showToast("Please select at least one timesheet to reject.", "warning");
//       return;
//     }
//     setPendingAction("reject");
//     setShowReasonModal(true);
//   };

//   const handleReasonConfirm = (reason) => {
//     setShowReasonModal(false);
//     if (pendingAction === "approve") {
//       performBulkApprove(reason);
//     } else if (pendingAction === "reject") {
//       performBulkReject(reason);
//     }
//     setPendingAction(null);
//   };

//   const handleReasonCancel = () => {
//     setShowReasonModal(false);
//     setPendingAction(null);
//   };

//   const performBulkApprove = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(
//         selectedRows,
//         "approve",
//         reason,
//         userIpAddress
//       );
//       const response = await fetch(
//         "https://timesheet-subk.onrender.com/api/Approval/BulkApprove",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         }
//       );
//       if (response.ok) {
//         showToast(
//           `Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`,
//           "success"
//         );
//         const approvedIds = selectedRows.map((row) => row.id);
//         setRows((prevRows) =>
//           prevRows.map((row) =>
//             approvedIds.includes(row.id)     
//               ? {
//                   ...row,
//                   isApproved: true,
//                   status: "approved",
//                   selected: false,
//                   Status: "APPROVED",
//                 }
//               : row
//           )
//         );

       
       
//       } else {
//         showToast(
//           "Failed to approve some timesheets. Please try again.",
//           "error"
//         );
//       }
//     } catch (error) {
//       showToast(
//         "Failed to approve timesheets. Please check your connection.",
//         "error" 
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const performBulkReject = async (reason) => {
//     setActionLoading(true);
//     try {
//       const requestBody = buildBulkRequestBody(
//         selectedRows,
//         "reject",
//         reason,
//         userIpAddress
//       );
//       const response = await fetch(
//         "https://timesheet-subk.onrender.com/api/Approval/BulkReject",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestBody),
//         }
//       );
//       if (response.ok) {
//         showToast(
//           `Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`,
//           "success"
//         );
//         const rejectedIds = selectedRows.map((row) => row.id);
//         setRows((prevRows) =>
//           prevRows.map((row) =>
//             rejectedIds.includes(row.id)
//               ? {
//                   ...row,
//                   isRejected: true,
//                   status: "rejected",
//                   selected: false,
//                   Status: "REJECTED",
//                 }
//               : row
//           )
//         );
//         setSelectedRows([]);
//         setSelectAll(false);
       
//       } else {
//         showToast(
//           "Failed to reject some timesheets. Please try again.",
//           "error"
//         );
//       }
//     } catch (error) {
//       showToast(
//         "Failed to reject timesheets. Please check your connection.",
//         "error"
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const hasPendingRows = Array.isArray(filteredRows)
//     ? filteredRows.some((row) => isRowActionable(row))
//     : false;

//   // Redirect non-admin users
//   if (!loading && userLoaded && currentUser && !isAdmin) {
//     navigate("/dashboard");
//     return null;
//   }

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading user session...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading approval data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <ReasonModal
//         isOpen={showReasonModal}
//         action={pendingAction}
//         selectedCount={selectedRows.length}
//         onConfirm={handleReasonConfirm}
//         onCancel={handleReasonCancel}
//       />

//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div
//             className="w-full flex justify-between items-center mb-4"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//             }}
//           >
//             <h1 className="text-lg font-semibold text-gray-700">
//               Welcome: {currentUser?.fullName} - {currentUser?.username}
//             </h1>
//             <div className="flex gap-2">
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>

//           {/* <div
//             className="flex gap-3 mb-3 items-center flex-wrap"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//             }}
//           >
//             <div className="flex gap-2 flex-wrap">
//               <DatePicker
//                 selected={
//                   searchDate ? new Date(searchDate + "T00:00:00") : null
//                 }
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(
//                       date.getTime() - date.getTimezoneOffset() * 60000
//                     );
//                     const isoString = localDate.toISOString().split("T")[0];
//                     setSearchDate(isoString);
//                   } else {
//                     setSearchDate("");
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={(e) => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={(e) => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div> */}

//           {/* START: New Filter Section */}
// <fieldset

//             className="border border-gray-300 rounded-md p-4 mb-4"

//             style={{

//               marginLeft: 24,

//               marginRight: 24,

//               width: "calc(100vw - 220px)",

//             }}
// >
// <legend className="text-sm font-semibold text-gray-600 px-2">Filters</legend>
// <div className="flex items-center gap-6 flex-wrap">

//               {/* Date Filter */}
// <div className="flex items-center">
// <label htmlFor="filterDate" className="mr-2 text-xs font-semibold text-gray-600">

//                   Date
// </label>
// <DatePicker

//                   id="filterDate"

//                   selected={

//                     searchDate ? new Date(searchDate + "T00:00:00") : null

//                   }

//                   onChange={(date) => {

//                     if (date) {

//                       const localDate = new Date(

//                         date.getTime() - date.getTimezoneOffset() * 60000

//                       );

//                       const isoString = localDate.toISOString().split("T")[0];

//                       setSearchDate(isoString);

//                     } else {

//                       setSearchDate("");

//                     }

//                   }}

//                   dateFormat="MM/dd/yyyy"

//                   placeholderText="MM/DD/YYYY"

//                   className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"

//                   showPopperArrow={false}

//                   autoComplete="off"

//                 />
// </div>
 
//               {/* Employee ID Filter */}
// <div className="flex items-center">
// <label htmlFor="filterEmpId" className="mr-2 text-xs font-semibold text-gray-600">

//                   Employee ID
// </label>
// <input

//                   id="filterEmpId"

//                   type="text"

//                   value={searchEmployeeId}

//                   onChange={(e) => setSearchEmployeeId(e.target.value)}

//                   placeholder="Employee ID"

//                   className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"

//                 />
// </div>
 
//               {/* Employee Name Filter */}
// <div className="flex items-center">
// <label htmlFor="filterEmpName" className="mr-2 text-xs font-semibold text-gray-600">

//                   Employee Name
// </label>
// <input

//                   id="filterEmpName"

//                   type="text"

//                   value={searchEmployeeName}

//                   onChange={(e) => setSearchEmployeeName(e.target.value)}

//                   placeholder="Employee Name"

//                   className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"

//                 />
// </div>
// </div>
// </fieldset>

//           {/* END: New Filter Section */}


//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               // 
//               //  maxWidth: "1200px", // Add maximum width
//     minWidth: "800px", // Set minimum width for the 6 columns
//               padding: "0.5rem",
//               // minHeight: "350px",
//               // maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <div
//   className="flex justify-between items-center mb-2 w-full"
//   style={{ flexShrink: 0 }}
// >
//   <div className="flex gap-2">
//     {isAdmin && (
//       <>
//         {/* Always show Approve button but disable when approved rows are selected */}
//         <button
//           onClick={handleBulkApproveClick}
//           disabled={
//             actionLoading || 
//             selectedRows.length === 0 || 
//             selectedRows.some(row => (row["Status"] || "").toLowerCase() === "approved")
//           }
//           className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {actionLoading ? "Processing..." : `Approve (${selectedRows.length})`}
//         </button>
        
//         {/* Always show Reject button when rows are selected */}
//         <button
//           onClick={handleBulkRejectClick}
//           disabled={actionLoading || selectedRows.length === 0}
//           className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
//         </button>
//       </>
//     )}
//   </div>
// </div>


//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 maxHeight: "calc(100vh - 400px)",
//                 minHeight: "300px",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px",
//                  scrollBehavior: "smooth", 
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   // minWidth: `${minTableWidth}px`,
//                   // width: "max-content",
//                   width: "100%", // Use full width of container instead of minWidth
//     tableLayout: "fixed" // Add fixed layout for better control
//                 }}
//               >
//                 <thead
//                   style={{
//                     position: "sticky",
//                     top: 0,
//                     backgroundColor: "#f8fafc",
//                     zIndex: 20,
//                     borderBottom: "2px solid #e2e8f0",
//                      // Add shadow under header
//         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
//                   }}
//                 >
//                   <tr>
//                     {columns.map((col) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth:
//                             col === "All"
//                               ? "80px"
//                               : col === "Status"
//                               ? "150px"
//                               : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           // cursor: ['Date', 'Employee ID', 'Name', 'Status'].includes(col) ? "pointer" : "default",
//                           cursor: col !== "All" ? "pointer" : "default",
//                           userSelect: "none",
//                         }}
//                         // onClick={() => ['Date', 'Employee ID', 'Name', 'Status'].includes(col) && handleSort(col)}
//                         onClick={() => col !== "All" && handleSort(col)} // Changed this line
//                       >
//                         {col === "All" ? (
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "4px",
//                               justifyContent: "center",
//                             }}
//                           >
//                             <input
//                               type="checkbox"
//                               checked={unifiedSelectAll}
//                               onChange={(e) =>
//                                 handleUnifiedSelectAll(e.target.checked)
//                               }
//                               className="cursor-pointer"
//                               disabled={!hasPendingRows}
//                             />
//                             <span
//                               style={{ fontSize: "11px", fontWeight: "normal" }}
//                             >
//                               All
//                             </span>
//                           </div>
//                         ) : (
//                           <span>
//                             {col}
//                             {getSortIcon(col)}
//                           </span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.requestId || row.id || rdx}-${
//                           row["Employee ID"] || ""
//                         }-${rdx}`}
//                         style={{
//                           backgroundColor:
//                             currentSelectedRowId === row.id
//                               ? "#e0f2fe" // Light cyan for currently selected row
//                               : row.selected || row.notifySelected
//                               ? "#dbeafe" // Light blue for checked rows
//                               : rdx % 2 === 0
//                               ? "#f9fafb"
//                               : "white",
//                           cursor: "pointer",
//                           // Add subtle border for current selected row
//                           // border: currentSelectedRowId === row.id ? "2px solid #0891b2" : "1px solid transparent"
//                            // Add opacity for disabled rows
//         opacity: (row["Status"] || "").toLowerCase() === "approved" || 
//                  (row["Status"] || "").toLowerCase() === "rejected" ? 0.7 : 1
    
//                         }}
//                         onClick={() => handleRowClick(row)}
//                         onMouseEnter={(e) =>
//                           !row.selected &&
//                           !row.notifySelected &&
//                           currentSelectedRowId !== row.id &&
//                           (e.target.closest("tr").style.backgroundColor =
//                             "#f3f4f6")
//                         }
//                         onMouseLeave={(e) =>
//                           !row.selected &&
//                           !row.notifySelected &&
//                           currentSelectedRowId !== row.id &&
//                           (e.target.closest("tr").style.backgroundColor =
//                             rdx % 2 === 0 ? "#f9fafb" : "white")
//                         }
//                       >
//                         {/* {columns.map((col) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth:
//                                 col === "All"
//                                   ? "80px"
//                                   : col === "Status"
//                                   ? "150px"
//                                   : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center",
//                               ...(col === "Status" ? {} : {}),
//                             }}
//                           >
//                             {col === "Status" ? (
//                               <span
//                                 style={getStatusStyle(row[col] || "PENDING")}
//                               >
//                                 {row[col] || "PENDING"}
//                               </span>
//                             ) : col === "All" ? (
//                               <input
//                                 type="checkbox"
//                                 checked={
//                                   row.selected ||
//                                   false ||
//                                   row.notifySelected ||
//                                   false
//                                 }
//                                 onChange={(e) => {
//                                   e.stopPropagation();
//                                   handleUnifiedRowSelect(rdx, e.target.checked);
//                                 }}
//                                 onClick={(e) => e.stopPropagation()}
//                                 className="cursor-pointer"
//                                 disabled={
//                                   !isRowActionable(row) &&
//                                   (row.isNotified ||
//                                     (row["Status"] || "").toLowerCase() ===
//                                       "notified")
//                                 }
//                               />
//                             ) : (
//                               row[col] || ""
//                             )}
//                           </td>
//                         ))} */}
//                         {columns.map((col) => (
//     <td
//         key={col}
//         style={{
//             border: "1px solid #e5e7eb",
//             padding: "8px",
//             fontSize: "11px",
//             minWidth:
//                 col === "All"
//                     ? "80px"
//                     : col === "Status"
//                     ? "150px"
//                     : `${colWidth}px`,
//             whiteSpace: "nowrap",
//             textAlign: "center",
//         }}
//     >
//         {col === "Status" ? (
//             <span style={getStatusStyle(row[col] || "PENDING")}>
//                 {/* Display status in proper case */}
//                 {(row[col] || "Pending").charAt(0).toUpperCase() + (row[col] || "Pending").slice(1).toLowerCase()}
//             </span>
//         ) : col === "All" ? (
//             <input
//                 type="checkbox"
//                 checked={row.selected || false || row.notifySelected || false}
//                 onChange={(e) => {
//                     e.stopPropagation();
//                     handleUnifiedRowSelect(rdx, e.target.checked);
//                 }}
//                 onClick={(e) => e.stopPropagation()}
//                 className="cursor-pointer"
//                 // Updated disabled condition to include approved status
//                 disabled={
//                     !isRowActionable(row) || 
//                     row.isNotified || 
//                     (row["Status"] || "").toLowerCase() === "notified" ||
//                     // (row["Status"] || "").toLowerCase() === "approved" ||
//                     (row["Status"] || "").toLowerCase() === "rejected"
//                 }
//             />
//         ) : (
//             row[col] || ""
//         )}
//     </td>
// ))}

//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         style={{
//                           textAlign: "center",
//                           padding: "20px",
//                           fontStyle: "italic",
//                           color: "#666",
//                         }}
//                       >
//                         No approval data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//            {/* ADD TIMESHEET APPROVAL VIEW HERE - INLINE BELOW TABLE */}
//           {selectedResourceId && (
//             <div
//               ref={timesheetDetailsRef}
//               style={{
//                 marginLeft: 24,
//                 marginRight: 24,
//                 width: "calc(100vw - 220px)",
//                 minWidth: "800px",
//               }}
//             >
//               <TimesheetApprovalModal
//                 resourceId={selectedResourceId}
//                 onClose={() => {
//                   setSelectedResourceId(null);
//                   setCurrentSelectedRowId(null);
//                 }}
//               />
//             </div>
//           )}
 
//         </div>
//       </div>
    
    
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import TimesheetApprovalModal from "./TimesheetApprovalModal";

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

// Updated columns without Info field
const columnsAdmin = [
  "All",
  "Status",
  "Timesheet Date",
  "Employee ID",
  "Name",
  "Hours",
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
            {action === "approve" ? "Approve" : "Reject"} Timesheets
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
              action === "approve" ? "approving" : "rejecting"
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
            {action === "approve" ? "Approve" : "Reject"}
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
  const [actionLoading, setActionLoading] = useState(false);
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

  const timesheetDetailsRef = useRef(null);
  const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);
  const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userIpAddress, setUserIpAddress] = useState("");

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
    const finalMonth = String(todayUTC.getUTCMonth() + 1).padStart(2, '0');
    const finalDay = String(todayUTC.getUTCDate()).padStart(2, '0');
    const formattedDateForState = `${finalYear}-${finalMonth}-${finalDay}`;
    setSearchDate(formattedDateForState);
  }, []);

  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pm";
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
    const statusProper = status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || "Pending";
    
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

  // Updated isRowActionable function to include approved status for checkbox enabling
  // const isRowActionable = (row) => {
  //   const status = row.status?.toLowerCase();
  //   return (
  //       status === "pending" || 
  //       status === "open" || 
  //       status === "un-notified" || 
  //       status === "submitted" ||
  //       status === "approved"  // Allow approved rows to be actionable for reject only
  //   ) && !row.isRejected && status !== "rejected";
  // };
//   const isRowActionable = (row) => {
//   const status = row.status?.toLowerCase();
//   return (status === "pending" || status === "open" || status === "un-notified" || status === "submitted" || status === "approved") && !row.isRejected && status !== "rejected";
// };

const isRowActionable = (row) => {
  const status = row.status?.toLowerCase();
  return (status === "pending" || status === "open" || status === "un-notified" || status === "submitted") && !row.isRejected && status !== "rejected";
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
    if (event?.target?.type === 'checkbox') {
      return;
    }
    
    setSelectedResourceId(rowData["Employee ID"]);
    setCurrentSelectedRowId(rowData.id);
    
    setTimeout(() => {
      if (timesheetDetailsRef.current) {
        timesheetDetailsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
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
  }, []);

  useEffect(() => {
    if (userLoaded && currentUser && currentUser.username)
      fetchData();
  }, [userLoaded, currentUser]);

  // CORRECTED: More robust grouping function with debugging
const groupDuplicateTimesheets = (timesheets) => {
  console.log("Input timesheets for grouping:", timesheets);
  
  if (!Array.isArray(timesheets) || timesheets.length === 0) {
    return [];
  }
  
  // Create a map to group by Employee ID + Timesheet Date
  const groupMap = new Map();
  
  timesheets.forEach((timesheet, index) => {
    const employeeId = String(timesheet["Employee ID"] || "").trim();
    const timesheetDate = timesheet.originalDate || timesheet["Timesheet Date"];
    const key = `${employeeId}|${timesheetDate}`;
    
    console.log(`Processing row ${index}:`, {
      employeeId,
      timesheetDate, 
      key,
      hours: timesheet.Hours
    });
    
    if (groupMap.has(key)) {
      // Group exists - sum the hours
      const existingEntry = groupMap.get(key);
      const currentHours = parseFloat(timesheet.Hours) || 0;
      const existingHours = parseFloat(existingEntry.Hours) || 0;
      const summedHours = existingHours + currentHours;
      
      console.log(`Combining hours: ${existingHours} + ${currentHours} = ${summedHours}`);
      
      existingEntry.Hours = formatHours ? formatHours(summedHours) : summedHours.toFixed(2);
      
      // Combine metadata for bulk operations
      existingEntry.combinedIds = existingEntry.combinedIds || [existingEntry.id];
      existingEntry.combinedIds.push(timesheet.id);
      
      existingEntry.combinedRequestIds = existingEntry.combinedRequestIds || [existingEntry.requestId];
      if (timesheet.requestId && !existingEntry.combinedRequestIds.includes(timesheet.requestId)) {
        existingEntry.combinedRequestIds.push(timesheet.requestId);
      }
      
      existingEntry.combinedLineNos = existingEntry.combinedLineNos || [existingEntry.lineNo];
      if (timesheet.lineNo && !existingEntry.combinedLineNos.includes(timesheet.lineNo)) {
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
    
    // Use existing resourceId from currentUser.username 
    const resourceId = currentUser.username;
    const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/pending-approvals/ByResource/${resourceId}`;
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
        console.log(`Processing timesheet entry ${entryIndex}:`, timesheetEntry);
        
        if (timesheetEntry.timesheetHours && Array.isArray(timesheetEntry.timesheetHours)) {
          timesheetEntry.timesheetHours.forEach((dailyHour, hourIndex) => {
            console.log(`Processing daily hour ${hourIndex}:`, dailyHour);
            
            // Create row for each daily entry
            const row = {
              id: dailyHour.id,
              requestId: timesheetEntry.requestId,
              levelNo: timesheetEntry.levelNo || 1,
              lineNo: timesheetEntry.lineNo,
              selected: false,
              notifySelected: false,
              isApproved: timesheetEntry.status?.toLowerCase() === "approved",
              isRejected: timesheetEntry.status?.toLowerCase() === "rejected", 
              isNotified: timesheetEntry.status?.toLowerCase() === "notified",
              
              // Display fields matching your existing structure
              status: timesheetEntry.status?.toLowerCase(), 
              "Status": timesheetEntry.status,
              "Timesheet Date": formatDate(timesheetEntry.timesheet_Date),
              "Employee ID": timesheetEntry.resource_Id,
              "Name": timesheetEntry.resource_Name || timesheetEntry.displayedName,
              "Hours": formatHours(dailyHour.hours),
              
              // Additional fields for operations
              originalDate: timesheetEntry.timesheet_Date,
              approverUserId: timesheetEntry.approverUserId,
              "Comment": timesheetEntry.comment || "",
            };
            
            flattenedData.push(row);
            console.log(`Added flattened row:`, row);
          });
        }
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



  
  // const fetchData = async () => {
  //   if (!userLoaded || !currentUser || !currentUser.username)
  //     return;
  //   try {
  //     setLoading(true);
      
  //     const resourceId = currentUser.username;
  //     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/pending-approvals/ByResource/${resourceId}`;

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });
      
  //     if (!response.ok)
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     const apiData = await response.json();

  //     const mappedData = Array.isArray(apiData)
  //       ? apiData.map((item, index) => ({
  //           id: item.timesheetId || item.id || `fallback-${index}`,
  //           requestId: item.requestId || item.id,
  //           levelNo: item.levelNo || 1,
  //           lineNo: item.lineNo || item.timesheetId || item.id,
  //           selected: false,
  //           notifySelected: false,
  //           isApproved: item.approvalStatus === "APPROVED" || false,
  //           isRejected: item.approvalStatus === "REJECTED" || false,
  //           isNotified: item.approvalStatus === "NOTIFIED" || false,
  //           status: item.status?.toLowerCase() || "un-notified",
  //           originalDate: item.timesheet_Date || item.timesheetDate,
  //           Date: formatDate(item.timesheet_Date),
  //           "Timesheet Date": formatDate(item.timesheet_Date),
  //           "Employee ID": item.resource_Id || "",
  //           Name: item.displayedName || item.employeeName || "Employee",
  //           Account: item.accountId || "",
  //           Org: item.organizationId || "",
  //           PLC: item.plc || "",
  //           "Pay Type": item.payType || "",
  //           "RLSE Number": item.rlseNumber || "",
  //           Hours: formatHours(item.hours),
  //           "PO Number": item.poNumber || "",
  //           "PO Line Number": item.poLineNumber || "",
  //           approverUserId: item.approverUserId,
  //           Status: item.status || "Un-Notified",
  //           Comment: item.comment || "",
  //           isNotified: (item.status || "").toLowerCase() === "notified",
  //         }))
  //       : [];

  //     setRows(mappedData);
  //   } catch (error) {
  //     console.error('Error fetching approval data:', error);
  //     setRows([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];

    // if (searchDate) {
    //   const searchDateFormatted = formatDateFromInput(searchDate);
    //   filtered = filtered.filter((row) => {
    //     const rowDate = row["Date"];
    //     return rowDate === searchDateFormatted;
    //   });
    // }

    if (searchDate) {
  const searchDateFormatted = formatDateFromInput(searchDate);
  filtered = filtered.filter(row => {
    const rowDate = row["Timesheet Date"];  // Use correct field name
    return rowDate === searchDateFormatted;
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

  // Updated handleUnifiedSelectAll function
  const handleUnifiedSelectAll = (isSelected) => {
    setUnifiedSelectAll(isSelected);
    const updatedRows = [...rows];
    
    // Only select actionable rows (including approved for reject-only functionality)
    // const actionableRows = filteredRows.filter(row => 
    //     isRowActionable(row) && 
    //     row.status?.toLowerCase() !== "rejected"
    // );
    const actionableRows = filteredRows.filter(row => 
    (isRowActionable(row) || isApprovedRowRejectableOnly(row)) && 
    row.status?.toLowerCase() !== "rejected"
);

    const notifiableRows = filteredRows.filter(
        row => 
            !row.isNotified && 
            row.status !== "notified" && 
            row["Status"]?.toLowerCase() !== "notified" &&
            row.status?.toLowerCase() !== "rejected"
    );

    actionableRows.forEach((filteredRow) => {
        const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
        if (actualRowIndex !== -1) {
            updatedRows[actualRowIndex].selected = isSelected;
        }
    });

    notifiableRows.forEach((filteredRow) => {
        const actualRowIndex = rows.findIndex(row => row.id === filteredRow.id);
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

    // if (isRowActionable(rowData)) {
    //   updatedRows[actualRowIndex].selected = isSelected;
    //   handleRowSelectUpdate(rowData, isSelected);
    // }

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
      setActionLoading(true);
      const requestBody = selectedNotifyRows.map((row) => ({
        requestType: "TIMESHEET",
        requesterId: 1,
        timesheetId: row.id,
        ProjectId: row["Project ID"],
        requestData: `Notification for timesheet ${row.id}`,
      }));
      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/Approval/BulkNotify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
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
      setActionLoading(false);
    }
  };

  const buildBulkRequestBody = (selectedRows, action, reason, ipAddress) => {
    return selectedRows.map((row) => ({
      requestId: row.requestId || row.id,
      levelNo: row.levelNo || 1,
      approverUserId: currentUser.approvalUserId || row.approverUserId,
      comment: `${action === "approve" ? "Approved" : "Rejected"} by ${
        currentUser.name
      }: ${reason}`,
      ipAddress: ipAddress,
    }));
  };

  // Updated handleBulkApproveClick to check for approved rows
  const handleBulkApproveClick = () => {
    if (selectedRows.length === 0) {
      showToast("Please select at least one timesheet to approve.", "warning");
      return;
    }
    
    // Check if any selected rows are already approved
    const hasApprovedRows = selectedRows.some(row => 
        (row["Status"] || "").toLowerCase() === "approved"
    );
    
    if (hasApprovedRows) {
        showToast("Cannot approve already approved timesheets.", "warning");
        return;
    }
    
    performBulkApprove("Bulk approved");
  };

  // const handleBulkRejectClick = () => {
  //   if (selectedRows.length === 0) {
  //     showToast("Please select at least one timesheet to reject.", "warning");
  //     return;
  //   }
  //   setPendingAction("reject");
  //   setShowReasonModal(true);
  // };
  
  const handleBulkRejectClick = () => {
  if (selectedRows.length === 0) {
    showToast("Please select at least one timesheet to reject.", "warning");
    return;
  }

  // Allow rejection of approved status
  const hasNonRejectableRows = selectedRows.some(row => 
    row["Status"]?.toLowerCase() === "rejected"
  );
  
  if (hasNonRejectableRows) {
    showToast("Cannot reject already rejected timesheets.", "warning");
    return;
  }

  setPendingAction("reject");
  setShowReasonModal(true);
};

  const handleReasonConfirm = (reason) => {
    setShowReasonModal(false);
    if (pendingAction === "approve") {
      performBulkApprove(reason);
    } else if (pendingAction === "reject") {
      performBulkReject(reason);
    }
    setPendingAction(null);
  };

  const handleReasonCancel = () => {
    setShowReasonModal(false);
    setPendingAction(null);
  };

  const performBulkApprove = async (reason) => {
    setActionLoading(true);
    try {
      const requestBody = buildBulkRequestBody(
        selectedRows,
        "approve",
        reason,
        userIpAddress
      );
      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/Approval/BulkApprove",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        showToast(
          `Successfully approved ${selectedRows.length} timesheets with reason: "${reason}"`,
          "success"
        );
        const approvedIds = selectedRows.map((row) => row.id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            approvedIds.includes(row.id)     
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
        showToast(
          "Failed to approve some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Failed to approve timesheets. Please check your connection.",
        "error" 
      );
    } finally {
      setActionLoading(false);
    }
  };

  const performBulkReject = async (reason) => {
    setActionLoading(true);
    try {
      const requestBody = buildBulkRequestBody(
        selectedRows,
        "reject",
        reason,
        userIpAddress
      );
      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/Approval/BulkReject",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );
      if (response.ok) {
        showToast(
          `Successfully rejected ${selectedRows.length} timesheets with reason: "${reason}"`,
          "success"
        );
        const rejectedIds = selectedRows.map((row) => row.id);
        setRows((prevRows) =>
          prevRows.map((row) =>
            rejectedIds.includes(row.id)
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
        showToast(
          "Failed to reject some timesheets. Please try again.",
          "error"
        );
      }
    } catch (error) {
      showToast(
        "Failed to reject timesheets. Please check your connection.",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const hasPendingRows = Array.isArray(filteredRows)
    ? filteredRows.some((row) => isRowActionable(row))
    : false;

  if (!loading && userLoaded && currentUser && !isAdmin) {
    navigate("/dashboard");
    return null;
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading approval data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
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
            className="w-full flex justify-between items-center mb-4"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            <h1 className="text-lg font-semibold text-gray-700">
              Welcome: {currentUser?.fullName} - {currentUser?.username}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          <fieldset
            className="border border-gray-300 rounded-md p-4 mb-4"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            <legend className="text-sm font-semibold text-gray-600 px-2">Filters</legend>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center">
                <label htmlFor="filterDate" className="mr-2 text-xs font-semibold text-gray-600">
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
              </div>
 
              <div className="flex items-center">
                <label htmlFor="filterEmpId" className="mr-2 text-xs font-semibold text-gray-600">
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
                <label htmlFor="filterEmpName" className="mr-2 text-xs font-semibold text-gray-600">
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
            </div>
          </fieldset>

          <div
            className="border border-gray-300 rounded bg-white shadow"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              minWidth: "800px",
              padding: "0.5rem",
              overflow: "hidden",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
          <div
  className="flex justify-between items-center mb-2 w-full"
  style={{ flexShrink: 0 }}
>
  <div className="flex gap-2">
    {isAdmin && (
      <>
        {(() => {
          // const approveEligibleCount = selectedRows.filter(row => 
          //   (row["Status"] || "").toLowerCase() !== "approved"
          // ).length;
          
          // const hasApprovedSelected = selectedRows.some(row => 
          //   (row["Status"] || "").toLowerCase() === "approved"
          // );

//           const approveEligibleCount = selectedRows.filter(row => row["Status"]?.toLowerCase() !== "approved" && row["Status"]?.toLowerCase() !== "rejected").length;
// const hasApprovedSelected = selectedRows.some(row => row["Status"]?.toLowerCase() === "approved");

const approveEligibleCount = selectedRows.filter(row => 
  row["Status"]?.toLowerCase() !== "approved" && 
  row["Status"]?.toLowerCase() !== "rejected"
).length;

const rejectEligibleCount = selectedRows.filter(row => 
  row["Status"]?.toLowerCase() !== "rejected"
).length;

const hasApprovedSelected = selectedRows.some(row => row["Status"]?.toLowerCase() === "approved");
const hasOnlyApprovedSelected = selectedRows.every(row => row["Status"]?.toLowerCase() === "approved");



          return (
            <>
              {/* Always show Approve button but disable when approved rows are selected */}
              <button
                onClick={handleBulkApproveClick}
                disabled={
                  actionLoading || 
                  approveEligibleCount === 0 || 
                  hasApprovedSelected
                }
                className="bg-green-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Processing..." : `Approve (${approveEligibleCount})`}
              </button>
              
              {/* Always show Reject button when rows are selected */}
              {/* <button
                onClick={handleBulkRejectClick}
                disabled={actionLoading || selectedRows.length === 0}
                className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? "Processing..." : `Reject (${selectedRows.length})`}
              </button> */}
              <button
  onClick={handleBulkRejectClick}
  disabled={actionLoading || rejectEligibleCount === 0}
  className="bg-red-600 text-white px-4 py-1.5 rounded shadow-sm hover:bg-red-700 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
>
  {actionLoading ? "Processing..." : `Reject (${rejectEligibleCount})`}
</button>
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
                maxHeight: "calc(100vh - 400px)",
                minHeight: "300px",
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
                  tableLayout: "fixed"
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
                <tbody>
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
                          opacity: (row["Status"] || "").toLowerCase() === "approved" || 
                                   (row["Status"] || "").toLowerCase() === "rejected" ? 0.7 : 1
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
                              <span style={getStatusStyle(row[col] || "PENDING")}>
                                {(row[col] || "Pending").charAt(0).toUpperCase() + (row[col] || "Pending").slice(1).toLowerCase()}
                              </span>
                            ) : col === "All" ? (
                              <input
                                type="checkbox"
                                checked={row.selected || false || row.notifySelected || false}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleUnifiedRowSelect(rdx, e.target.checked);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="cursor-pointer"
                                // Updated disabled condition: Enable checkbox for approved status
                                // disabled={!isRowActionable(row) || row.isNotified || (row["Status"]?.toLowerCase() === "notified") || (row["Status"]?.toLowerCase() === "rejected")}
                                 disabled={
  !(isRowActionable(row) || isApprovedRowRejectableOnly(row)) || 
  row.isNotified || 
  (row.status?.toLowerCase() === "notified") || 
  (row.status?.toLowerCase() === "rejected")
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
          </div>

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
                onClose={() => {
                  setSelectedResourceId(null);
                  setCurrentSelectedRowId(null);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

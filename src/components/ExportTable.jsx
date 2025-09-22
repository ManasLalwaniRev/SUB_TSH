// import { u
// eState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// const columnsExport = [
//   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = columnsExport;
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

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
//     if (userLoaded && currentUser && currentUser.username) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser || !currentUser.username) return;
//     try {
//       setLoading(true);
//       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=Approved`;
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
//     } catch (error) {
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(row.originalDate || rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
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

//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     try {
//       setActionLoading(true);
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
//         method: 'GET',
//       });
//       if (response.ok) {
//         const blob = await response.blob();
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `exported_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//         window.URL.revokeObjectURL(url);
//         showToast('Export completed successfully', 'success');
//       } else {
//         showToast('Export failed', 'error');
//       }
//     } catch (error) {
//       showToast('Export failed', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Only show for Admin
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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters - Same as Timesheet */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
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
//                 <span className="text-sm text-gray-600 self-center">
//                   Showing {filteredRows.length} approved timesheet{filteredRows.length !== 1 ? 's' : ''}
//                 </span>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || filteredRows.length === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : "Export CSV"}
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
//                           minWidth: `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map(col => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {row[col] || ""}
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
//                         No approved data available for export
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// const columnsExport = [
//   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = ['Select', ...columnsExport];
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

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
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser) return;
//     try {
//       setLoading(true);
//       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
//     } catch (error) {
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(row.originalDate || rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update selectAll state when filteredRows change
//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get selected row data
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

//       // Convert to CSV
//       const csvHeaders = columnsExport.join(',');
//       const csvRows = selectedData.map(row =>
//         columnsExport.map(col => {
//           const value = row[col] || '';
//           // Escape commas and quotes in CSV
//           return `"${String(value).replace(/"/g, '""')}"`;
//         }).join(',')
//       );

//       const csvContent = [csvHeaders, ...csvRows].join('\n');
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//       showToast(`Exported ${selectedRows.size} selected timesheets successfully`, 'success');
//     } catch (error) {
//       showToast('Export failed', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Only show for Admin
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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
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
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
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
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col === 'Select' ? (
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="cursor-pointer"
//                             title="Select All"
//                           />
//                         ) : (
//                           col
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
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
//                         No approved data available for export
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// const columnsExport = [
//   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = ['Select', ...columnsExport];
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

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
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser) return;
//     try {
//       setLoading(true);
//       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         originalDate: item.timesheetDate,
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//       showToast(`Loaded ${mappedData.length} approved timesheets for export`, "success");
//     } catch (error) {
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(row.originalDate || rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update selectAll state when filteredRows change
//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get the full CSV from the export API
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`Export API failed with status: ${response.status}`);
//       }

//       const fullCsvData = await response.text();

//       // Get selected employee IDs for filtering
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));
//       const selectedEmployeeIds = new Set(selectedData.map(row => row["Employee ID"]));

//       // Parse and filter the CSV data
//       const csvLines = fullCsvData.split('\n').filter(line => line.trim());
//       const filteredCsvLines = [];

//       csvLines.forEach(line => {
//         const columns = line.split(',');
//         if (columns.length > 1) {
//           const employeeId = columns[1].trim(); // Employee ID is in the second column
//           if (selectedEmployeeIds.has(employeeId)) {
//             filteredCsvLines.push(line);
//           }
//         }
//       });

//       if (filteredCsvLines.length === 0) {
//         showToast('No matching data found in export for selected items', 'warning');
//         return;
//       }

//       // Create the filtered CSV content
//       const filteredCsvContent = filteredCsvLines.join('\n');

//       // Download the filtered CSV
//       const blob = new Blob([filteredCsvContent], { type: 'text/csv;charset=utf-8;' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);

//       showToast(`Exported ${filteredCsvLines.length} selected timesheet records successfully`, 'success');
//     } catch (error) {
//       console.error('Export error:', error);
//       showToast('Export failed. Please check your connection and try again.', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Only show for Admin
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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
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
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
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
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col === 'Select' ? (
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="cursor-pointer"
//                             title="Select All"
//                           />
//                         ) : (
//                           col
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
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
//                         No approved data available for export
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// const columnsExport = [
//   "Date", "Employee ID", "Name", "Fiscal Year", "Period",
//   "Project ID", "PLC", "Pay Type", "Hours", "Seq No", "Comment", "IP Address"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);

//   const isAdmin = currentUser?.role === "Admin";
//   const columns = ['Select', ...columnsExport];
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

//   const getSortedRows = (rowsToSort) => {
//     return [...rowsToSort].sort((a, b) => {
//       let aDate = new Date(a.originalDate || a["Date"]);
//       let bDate = new Date(b.originalDate || b["Date"]);
//       if (isNaN(aDate.getTime())) aDate = new Date(0);
//       if (isNaN(bDate.getTime())) bDate = new Date(0);
//       if (aDate.getTime() !== bDate.getTime()) {
//         return aDate.getTime() - bDate.getTime();
//       }
//       const aEmpId = String(a["Employee ID"] || '').toLowerCase();
//       const bEmpId = String(b["Employee ID"] || '').toLowerCase();
//       return aEmpId.localeCompare(bEmpId);
//     });
//   };

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
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser) return;
//     try {
//       setLoading(true);
//       // fetch all approved timesheets
//       const apiUrl = `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByStatus?status=Approved`;
//       const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();
//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         originalDate: item.timesheetDate,
//         originalItem: item, // Store original item for POST payload
//         "Date": formatDate(item.timesheetDate),
//         "Employee ID": item.employee?.employeeId || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projectId || "",
//         "PLC": item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         "IP Address": item.ipAddress || ""
//       })) : [];
//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDateString = row["Date"];
//         if (!rowDateString) return false;
//         try {
//           const rowDate = new Date(row.originalDate || rowDateString);
//           const formattedRowDate = `${String(rowDate.getMonth() + 1).padStart(2, '0')}-${String(rowDate.getDate()).padStart(2, '0')}-${rowDate.getFullYear()}`;
//           const selectedDate = new Date(searchDate);
//           const formattedSelectedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}-${selectedDate.getFullYear()}`;
//           return formattedRowDate === formattedSelectedDate;
//         } catch {
//           return false;
//         }
//       });
//     }
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row => (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase()));
//     }
//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Export selected rows with POST request containing selected data
//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get selected row data
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

//       if (selectedData.length === 0) {
//         showToast('No selected data to export', 'warning');
//         return;
//       }

//       // Prepare payload with selected row data
//       const payload = {
//         selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
//         exportRequest: {
//           requestedBy: currentUser?.username || currentUser?.id || 'admin',
//           requestDate: new Date().toISOString(),
//           totalRecords: selectedData.length,
//           filters: {
//             date: searchDate || null,
//             employeeId: searchEmployeeId || null
//           }
//         }
//       };

//       console.log(JSON.stringify(payload));

//       // Send POST request with selected data
//       const response = await fetch('https://timesheet-latest.onrender.com/api/Timesheet/export-csv', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload.selectedTimesheets)
//       });

//       if (response.ok) {
//         // Check if response is CSV (text) or blob
//         const contentType = response.headers.get('content-type');

//         if (contentType && contentType.includes('text/csv')) {
//           // Server returns CSV directly
//           const csvData = await response.text();

//           const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);

//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         } else {
//           // Server doesn't return CSV, generate client-side
//           const csvHeaders = columnsExport.join(',');
//           const csvRows = selectedData.map(row =>
//             columnsExport.map(col => {
//               const value = row[col] || '';
//               return `"${String(value).replace(/"/g, '""')}"`;
//             }).join(',')
//           );
//           const csvContent = [csvHeaders, ...csvRows].join('\n');

//           const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);

//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         }
//       } else {
//         throw new Error(`Export API failed with status: ${response.status}`);
//       }

//     } catch (error) {
//       console.error('Export error:', error);
//       showToast('Export failed. Please try again.', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Only show for Admin
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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters */}
//           <div className="flex gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex gap-2">
//               <input
//                 type="date"
//                 value={searchDate}
//                 onChange={e => setSearchDate(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 title="Filter by Date (MM-DD-YYYY Format)"
//               />
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
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
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
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
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: "default",
//                           userSelect: "none"
//                         }}>
//                         {col === 'Select' ? (
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="cursor-pointer"
//                             title="Select All"
//                           />
//                         ) : (
//                           col
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
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
//                         No approved data available for export
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";

// // Toast notification utility (keep your implementation)
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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// // const columnsExport = [
// //   "Date", "Employee ID","Timesheet Type Code", "Name", "Fiscal Year", "Period",
// //   "Project ID", "PLC", "Pay Type","RLSE Number",
// // "PO Number",
// // "PO Line Number",
// //   "Hours", "Seq No", "Comment",
// // ];

// const columnsExport = [
//   "Status",
//   "Date",
//   "Employee ID",
//   "Name",
//   "Project ID",
//   "PLC",
//   "Pay Type",
//   "RLSE Number",
//   "PO Number",
//   "PO Line Number",
//   "Hours"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [searchPOID, setSearchPOID] = useState('');
// const [searchVendID, setSearchVendID] = useState('');
// const [searchPOReleaseNo, setSearchPOReleaseNo] = useState('');
// const [startDate, setStartDate] = useState('');
// const [endDate, setEndDate] = useState('');
// // const [selectedRows, setSelectedRows] = useState(new Set());

//   // const isAdmin = currentUser?.role === "Admin";
//   const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pm";

//   const columns = ['Select', ...columnsExport];
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

//   // Get sorted rows with arrow
//   const getSortedRows = (rowsToSort) => {
//     let sorted = [...rowsToSort];

//     if (sortConfig.key) {
//       sorted.sort((a, b) => {
//         let aVal, bVal;

//         // Handle different column types
//         if (sortConfig.key === "Date") {
//           aVal = new Date(a.originalDate || a["Date"]);
//           bVal = new Date(b.originalDate || b["Date"]);
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
//         let aDate = new Date(a.originalDate || a["Date"]);
//         let bDate = new Date(b.originalDate || b["Date"]);
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

//   // const handleSort = (key) => {
//   //   if (!['Date', 'Employee ID', 'Name'].includes(key)) return;
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
//   //   if (!['Date', 'Employee ID', 'Name'].includes(columnKey)) return null;
//   //   if (sortConfig.key === columnKey) {
//   //     return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//   //   }
//   //   return ' ⇅';
//   // };

//    const getSortIcon = (columnKey) => {
//     if (columnKey === "All") return null; // Skip checkbox column

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === "asc" ? " ↑" : " ↓";
//     }
//     return " ⇅";
//   };

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
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   // const fetchExportData = async () => {
//   //   if (!userLoaded || !currentUser) return;
//   //   try {
//   //     setLoading(true);
//   //     // fetch all approved timesheets
//   //     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/pending-approvalsByStatus?status=Approved`;
//   //     const response = await fetch(apiUrl, { method: 'GET', headers: { 'Content-Type': 'application/json' } });
//   //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//   //     const apiData = await response.json();
//   //     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//   //       id: item.timesheetId || item.id || `export-${index}`,
//   //       originalDate: item.timesheetDate,
//   //       originalItem: item, // Store original item for POST payload
//   //       "Date": formatDate(item.timesheetDate),
//   //       "Employee ID": item.employee?.employeeId || item.employeeId || "",
//   //       "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//   //       "Timesheet Type Code": item.timesheetTypeCode || "",

//   //       "Fiscal Year": item.fiscalYear || "",
//   //       "Period": item.period || "",
//   //       "Project ID": item.projectId || "",
//   //       "PLC": item.projectLaborCategory || "",
//   //       "Pay Type": item.payType || "",
//   //       "Hours": formatHours(item.hours),
//   //       "Seq No": item.sequenceNumber || "",
//   //       "Comment": item.comment || "",
//   //       // "IP Address": item.ipAddress || ""
//   //     })) : [];
//   //     setRows(mappedData);
//   //     setSelectedRows(new Set());
//   //     setSelectAll(false);
//   //   } catch (error) {
//   //     showToast('Failed to load export data. Please check your connection.', "error");
//   //     setRows([]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchExportData = async () => {
//   if (!userLoaded || !currentUser) return;
//   try {
//     setLoading(true);

//     // Use approvalUserId or username from login response as resourceId
//     const resourceId =  currentUser.username;

//     if (!resourceId) {
//       showToast('User resource ID not found. Please login again.', "error");
//       navigate("/");
//       return;
//     }

//     // Updated API URL with resourceId parameter
//     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/pending-approvalsByStatus?status=Approved&resourceId=${resourceId}`;

//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' }
//     });

//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     const apiData = await response.json();

//     const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//       id: item.timesheetId || item.id || `export-${index}`,
//       originalDate: item.timesheetDate,
//       originalItem: item,
//       Status: item.status || "Un-Notified",
//       // "Date": formatDate(item.timesheetDate),
//       // "Employee ID": item.employee?.employeeId || item.employeeId || "",
//        Date: formatDate(item.createdAt),
//           "Employee ID": item.resource_Id || "",
//       "Name": item.displayedName || item.employeeName || `Employee ${item.employee?.employeeId || item.employeeId}` || "",
//       "Timesheet Type Code": item.timesheetTypeCode || "",
//       "Fiscal Year": item.fiscalYear || "",
//       "Period": item.period || "",
//       "Project ID": item.projId || "",
//       "PLC": item.plc || "",
//       "Pay Type": item.payType || "",
//       "RLSE Number": item.rlseNumber || "", // Add missing fields
//       "PO Number": item.poNumber || "",
//       "PO Line Number": item.poLineNumber || "",
//       "Hours": formatHours(item.hours),
//       "Seq No": item.sequenceNumber || "",
//       "Comment": item.comment || "",
//     })) : [];

//     setRows(mappedData);
//     setSelectedRows(new Set());
//     setSelectAll(false);
//   } catch (error) {
//     console.error('Fetch error:', error);
//     showToast('Failed to load export data. Please check your connection.', "error");
//     setRows([]);
//   } finally {
//     setLoading(false);
//   }
// };

//   // const getFilteredRows = () => {
//   //   let filtered = rows;
//   //   if (!Array.isArray(filtered)) return [];
//   //   // Filter by date string (local, robust to timezone)
//   //   if (searchDate) {
//   //     filtered = filtered.filter(row => {
//   //       const rowDate = new Date(row.originalDate);
//   //       const selectedDate = new Date(searchDate + 'T00:00:00');
//   //       return (
//   //         rowDate.getFullYear() === selectedDate.getFullYear() &&
//   //         rowDate.getMonth() === selectedDate.getMonth() &&
//   //         rowDate.getDate() === selectedDate.getDate()
//   //       );
//   //     });
//   //   }
//   //   // Employee ID filter
//   //   if (searchEmployeeId.trim()) {
//   //     filtered = filtered.filter(row =>
//   //       (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//   //     );
//   //   }
//   //   // Employee Name filter
//   //   if (searchEmployeeName.trim()) {
//   //     filtered = filtered.filter(row =>
//   //       (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//   //     );
//   //   }
//   //   return getSortedRows(filtered);
//   // };

//   const getFilteredRows = () => {
//   let filtered = rows;
//   if (!Array.isArray(filtered)) return [];

//   // Filter by single date (existing functionality)
//   if (searchDate) {
//     filtered = filtered.filter(row => {
//       const rowDate = new Date(row.originalDate);
//       const selectedDate = new Date(searchDate + 'T00:00:00');
//       return (
//         rowDate.getFullYear() === selectedDate.getFullYear() &&
//         rowDate.getMonth() === selectedDate.getMonth() &&
//         rowDate.getDate() === selectedDate.getDate()
//       );
//     });
//   }

//   // Filter by date range (Start date and End date)
//   if (startDate || endDate) {
//     filtered = filtered.filter(row => {
//       const rowDate = new Date(row.originalDate);
//       let inRange = true;

//       if (startDate) {
//         const start = new Date(startDate + 'T00:00:00');
//         inRange = inRange && rowDate >= start;
//       }

//       if (endDate) {
//         const end = new Date(endDate + 'T23:59:59');
//         inRange = inRange && rowDate <= end;
//       }

//       return inRange;
//     });
//   }

//   // Employee ID filter
//   if (searchEmployeeId.trim()) {
//     filtered = filtered.filter(row =>
//       (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//     );
//   }

//   // Employee Name filter
//   if (searchEmployeeName.trim()) {
//     filtered = filtered.filter(row =>
//       (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//     );
//   }

//   // PO ID filter
//   if (searchPOID.trim()) {
//     filtered = filtered.filter(row =>
//       (row["PO Number"] || "").toLowerCase().includes(searchPOID.trim().toLowerCase())
//     );
//   }

//   // VEND ID filter
//   if (searchVendID.trim()) {
//     filtered = filtered.filter(row =>
//       (row["Vendor ID"] || "").toLowerCase().includes(searchVendID.trim().toLowerCase())
//     );
//   }

//   // PO RELEASE NO filter
//   if (searchPOReleaseNo.trim()) {
//     filtered = filtered.filter(row =>
//       (row["RLSE Number"] || "").toLowerCase().includes(searchPOReleaseNo.trim().toLowerCase())
//     );
//   }

//   return getSortedRows(filtered);
// };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Export selected rows with POST request containing selected data
//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get selected row data
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

//       if (selectedData.length === 0) {
//         showToast('No selected data to export', 'warning');
//         return;
//       }

//       // Prepare payload with selected row data
//       const payload = {
//         selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
//         exportRequest: {
//           requestedBy: currentUser?.username || currentUser?.id || 'admin',
//           requestDate: new Date().toISOString(),
//           totalRecords: selectedData.length,
//           filters: {
//             date: searchDate || null,
//             employeeId: searchEmployeeId || null,
//             employeeName: searchEmployeeName || null,
//           }
//         }
//       };

//       // Send POST request with selected data
//       const response = await fetch('https://timesheet-subk.onrender.com/api/SubkTimesheet/export-csv', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload.selectedTimesheets)
//       });

//       if (response.ok) {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('text/csv')) {
//           const csvData = await response.text();
//           const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         } else {
//           const csvHeaders = columnsExport.join(',');
//           const csvRows = selectedData.map(row =>
//             columnsExport.map(col => {
//               const value = row[col] || '';
//               return `"${String(value).replace(/"/g, '""')}"`;
//             }).join(',')
//           );
//           const csvContent = [csvHeaders, ...csvRows].join('\n');
//           const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         }
//       } else {
//         throw new Error(`Export API failed with status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Export error:', error);
//       showToast('Export failed. Please try again.', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters */}
//          {/* Filters */}
// <div className="flex flex-wrap gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//   <div className="flex flex-wrap gap-2">
//     {/* Single Date Filter */}
//     {/* <DatePicker
//       selected={searchDate ? new Date(searchDate + 'T00:00:00') : null}
//       onChange={(date) => {
//         if (date) {
//           const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//           const isoString = localDate.toISOString().split('T')[0];
//           setSearchDate(isoString);
//         } else {
//           setSearchDate('');
//         }
//       }}
//       dateFormat="MM/dd/yyyy"
//       placeholderText="Single Date"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//       showPopperArrow={false}
//       autoComplete="off"
//     /> */}

//     {/* Start Date Filter */}
//     <DatePicker
//       selected={startDate ? new Date(startDate + 'T00:00:00') : null}
//       onChange={(date) => {
//         if (date) {
//           const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//           const isoString = localDate.toISOString().split('T')[0];
//           setStartDate(isoString);
//         } else {
//           setStartDate('');
//         }
//       }}
//       dateFormat="MM/dd/yyyy"
//       placeholderText="Start Date"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//       showPopperArrow={false}
//       autoComplete="off"
//     />

//     {/* End Date Filter */}
//     <DatePicker
//       selected={endDate ? new Date(endDate + 'T00:00:00') : null}
//       onChange={(date) => {
//         if (date) {
//           const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//           const isoString = localDate.toISOString().split('T')[0];
//           setEndDate(isoString);
//         } else {
//           setEndDate('');
//         }
//       }}
//       dateFormat="MM/dd/yyyy"
//       placeholderText="End Date"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//       showPopperArrow={false}
//       autoComplete="off"
//     />

//     {/* Employee ID Filter */}
//     <input
//       type="text"
//       value={searchEmployeeId}
//       onChange={e => setSearchEmployeeId(e.target.value)}
//       placeholder="Employee ID"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />

//     {/* Employee Name Filter */}
//     <input
//       type="text"
//       value={searchEmployeeName}
//       onChange={e => setSearchEmployeeName(e.target.value)}
//       placeholder="Employee Name"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />

//     {/* PO ID Filter */}
//     <input
//       type="text"
//       value={searchPOID}
//       onChange={e => setSearchPOID(e.target.value)}
//       placeholder="PO ID"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />

//     {/* VEND ID Filter */}
//     <input
//       type="text"
//       value={searchVendID}
//       onChange={e => setSearchVendID(e.target.value)}
//       placeholder="VEND ID"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />

//     {/* PO RELEASE NO Filter */}
//     <input
//       type="text"
//       value={searchPOReleaseNo}
//       onChange={e => setSearchPOReleaseNo(e.target.value)}
//       placeholder="PO RELEASE NO"
//       className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//     />

//     {/* Clear Filters Button */}
//     <button
//       onClick={() => {
//         setSearchDate('');
//         setStartDate('');
//         setEndDate('');
//         setSearchEmployeeId('');
//         setSearchEmployeeName('');
//         setSearchPOID('');
//         setSearchVendID('');
//         setSearchPOReleaseNo('');
//       }}
//       className="bg-gray-500 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-600 transition-colors"
//     >
//       Clear All
//     </button>
//   </div>
// </div>

//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "none",
//               minWidth: 300,
//               padding: "0.5rem",
//               // minHeight: "350px",
//               // maxHeight: "calc(100vh - 180px)",
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 // maxHeight: "calc(100vh - 180px)",
//                 // minHeight: "200px",
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
//                 {/* <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//                   <tr>
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "60px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: ['Date', 'Employee ID', 'Name'].includes(col) ? "pointer" : "default",
//                           userSelect: "none"
//                         }}
//                         onClick={() => ['Date', 'Employee ID', 'Name'].includes(col) && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <input
//                             type="checkbox"
//                             checked={selectAll}
//                             onChange={handleSelectAll}
//                             className="cursor-pointer"
//                             title="Select All"
//                           />
//                         ) : (
//                           <span>
//                             {col}{getSortIcon(col)}
//                           </span>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead> */}
//                 <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8fafc", zIndex: 10, borderBottom: "2px solid #e2e8f0" }}>
//   <tr>
//     {columns.map((col, index) => (
//       <th
//         key={col}
//         style={{
//           border: "1px solid #d1d5db",
//           padding: "8px",
//           fontSize: "12px",
//           minWidth: index === 0 ? "80px" : `${colWidth}px`,
//           fontWeight: "bold",
//           color: "#1e40af",
//           textAlign: "center",
//           whiteSpace: "nowrap",
//           backgroundColor: "#f1f5f9",
//           cursor: col === 'Select' ? "default" : "pointer", // All columns except Select are clickable
//           userSelect: "none"
//         }}
//         onClick={() => col !== 'Select' && handleSort(col)} // All columns except Select are sortable
//       >
//         {col === 'Select' ? (
//           <div className="flex items-center justify-center gap-1">
//             <input
//               type="checkbox"
//               checked={selectAll}
//               onChange={handleSelectAll}
//               className="cursor-pointer"
//               title="Select All"
//             />
//             <span style={{ fontSize: "11px" }}>All</span>
//           </div>
//         ) : (
//           <span>
//             {col}{getSortIcon(col)}
//           </span>
//         )}
//       </th>
//     ))}
//   </tr>
// </thead>

//                 <tbody>
//                   {filteredRows.length > 0 ? (
//                     filteredRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
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
//                         No approved data available for export
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

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";

// // Toast notification utility (keep your implementation)
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
//   setTimeout(() => {
//     toast.style.opacity = '0';
//     setTimeout(() => document.body.removeChild(toast), 300);
//   }, 1000);
// };

// // Keep original column structure without Batch ID in headers
// const columnsExport = [
//   "Status",
//   "Timesheet Date",
//   "Employee ID",
//   "Name",
//   "Project ID",
//   "PLC",
//   "Pay Type",
//   "RLSE Number",
//   "PO Number",
//   "PO Line Number",
//   "Hours"
// ];

// export default function ExportTable() {
//   const navigate = useNavigate();
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [searchDate, setSearchDate] = useState('');
//   const [searchEmployeeId, setSearchEmployeeId] = useState('');
//   const [searchEmployeeName, setSearchEmployeeName] = useState('');
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [searchPOID, setSearchPOID] = useState('');
//   const [searchVendID, setSearchVendID] = useState('');
//   const [searchPOReleaseNo, setSearchPOReleaseNo] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [batchId, setBatchId] = useState(''); // Batch ID input state (not for filtering)

//   const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pm";

//   const columns = ['Select', ...columnsExport];
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

//   // Get sorted rows with arrow
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
//         let aDate = new Date(a.originalDate || a["Timesheet Date"]);
//         let bDate = new Date(b.originalDate || b["Timesheet Date"]);
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

//   const handleSort = (key) => {
//     if (key === "All") return; // Skip checkbox column

//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (columnKey) => {
//     if (columnKey === "All") return null; // Skip checkbox column

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === "asc" ? " ↑" : " ↓";
//     }
//     return " ⇅";
//   };

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
//     if (userLoaded && currentUser) {
//       fetchExportData();
//     }
//   }, [userLoaded, currentUser]);

//   // Updated fetch function to use new API endpoint
//   const fetchExportData = async () => {
//     if (!userLoaded || !currentUser) return;
//     try {
//       setLoading(true);

//       // Use approvalUserId or username from login response as resourceId
//       const resourceId = currentUser.username;

//       if (!resourceId) {
//         showToast('User resource ID not found. Please login again.', "error");
//         navigate("/");
//         return;
//       }

//       // Updated API URL to use GetDetailedTimesheetsByStatus
//       const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/GetDetailedTimesheetsByStatus?status=Approved&resourceId=${resourceId}`;

//       const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.timesheetId || item.id || `export-${index}`,
//         // originalDate: item.timesheetDate,
//          originalDate: item.timesheet_Date || item.timesheetDate, // Update originalDate source
//         originalItem: item,
//         Status: item.status || "Un-Notified",
//         // Date: formatDate(item.timesheetDate || item.createdAt),
//          "Timesheet Date": formatDate(item.timesheet_Date),
//         "Employee ID": item.resource_Id || item.employeeId || "",
//         "Name": item.displayedName || item.employeeName || item.resourceName || `Employee ${item.resource_Id || item.employeeId}` || "",
//         "Timesheet Type Code": item.timesheetTypeCode || "",
//         "Fiscal Year": item.fiscalYear || "",
//         "Period": item.period || "",
//         "Project ID": item.projId || item.projectId || "",
//         "PLC": item.plc || item.projectLaborCategory || "",
//         "Pay Type": item.payType || "",
//         "RLSE Number": item.rlseNumber || "",
//         "PO Number": item.poNumber || "",
//         "PO Line Number": item.poLineNumber || "",
//         "Hours": formatHours(item.hours),
//         "Seq No": item.sequenceNumber || "",
//         "Comment": item.comment || "",
//         // Store batch ID in data but don't display in table
//         batchId: item.batchId || "",
//       })) : [];

//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast('Failed to load export data. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFilteredRows = () => {
//     let filtered = rows;
//     if (!Array.isArray(filtered)) return [];

//     // Filter by single date (existing functionality)
//     if (searchDate) {
//       filtered = filtered.filter(row => {
//         const rowDate = new Date(row.originalDate);
//         const selectedDate = new Date(searchDate + 'T00:00:00');
//         return (
//           rowDate.getFullYear() === selectedDate.getFullYear() &&
//           rowDate.getMonth() === selectedDate.getMonth() &&
//           rowDate.getDate() === selectedDate.getDate()
//         );
//       });
//     }

//     // Filter by date range (Start date and End date)
//     if (startDate || endDate) {
//       filtered = filtered.filter(row => {
//         const rowDate = new Date(row.originalDate);
//         let inRange = true;

//         if (startDate) {
//           const start = new Date(startDate + 'T00:00:00');
//           inRange = inRange && rowDate >= start;
//         }

//         if (endDate) {
//           const end = new Date(endDate + 'T23:59:59');
//           inRange = inRange && rowDate <= end;
//         }

//         return inRange;
//       });
//     }

//     // Employee ID filter
//     if (searchEmployeeId.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Employee ID"] || "").toLowerCase().includes(searchEmployeeId.trim().toLowerCase())
//       );
//     }

//     // Employee Name filter
//     if (searchEmployeeName.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Name"] || "").toLowerCase().includes(searchEmployeeName.trim().toLowerCase())
//       );
//     }

//     // PO ID filter
//     if (searchPOID.trim()) {
//       filtered = filtered.filter(row =>
//         (row["PO Number"] || "").toLowerCase().includes(searchPOID.trim().toLowerCase())
//       );
//     }

//     // VEND ID filter
//     if (searchVendID.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Vendor ID"] || "").toLowerCase().includes(searchVendID.trim().toLowerCase())
//       );
//     }

//     // PO RELEASE NO filter
//     if (searchPOReleaseNo.trim()) {
//       filtered = filtered.filter(row =>
//         (row["RLSE Number"] || "").toLowerCase().includes(searchPOReleaseNo.trim().toLowerCase())
//       );
//     }

//     return getSortedRows(filtered);
//   };

//   const filteredRows = getFilteredRows();

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === filteredRows.length && filteredRows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(filteredRows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   useEffect(() => {
//     if (filteredRows.length > 0) {
//       const allSelected = filteredRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [filteredRows, selectedRows]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     showToast("Logged out successfully", "info");
//     navigate("/");
//   };

//   // Export selected rows with POST request containing selected data (unchanged)
//   const handleExportClick = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (actionLoading) return;

//     if (selectedRows.size === 0) {
//       showToast('Please select at least one timesheet to export', 'warning');
//       return;
//     }

//     try {
//       setActionLoading(true);

//       // Get selected row data
//       const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

//       if (selectedData.length === 0) {
//         showToast('No selected data to export', 'warning');
//         return;
//       }

//       // Prepare payload with selected row data
//       const payload = {
//         selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
//         exportRequest: {
//           requestedBy: currentUser?.username || currentUser?.id || 'admin',
//           requestDate: new Date().toISOString(),
//           totalRecords: selectedData.length,
//           batchId: batchId || null, // Include batch ID if provided
//           filters: {
//             date: searchDate || null,
//             startDate: startDate || null,
//             endDate: endDate || null,
//             employeeId: searchEmployeeId || null,
//             employeeName: searchEmployeeName || null,
//           }
//         }
//       };

//       // Send POST request with selected data (keep original export API)
//       const response = await fetch('https://timesheet-subk.onrender.com/api/SubkTimesheet/export-csv', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload.selectedTimesheets)
//       });

//       if (response.ok) {
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('text/csv')) {
//           const csvData = await response.text();
//           const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         } else {
//           const csvHeaders = columnsExport.join(',');
//           const csvRows = selectedData.map(row =>
//             columnsExport.map(col => {
//               const value = row[col] || '';
//               return `"${String(value).replace(/"/g, '""')}"`;
//             }).join(',')
//           );
//           const csvContent = [csvHeaders, ...csvRows].join('\n');
//           const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
//           document.body.appendChild(a);
//           a.click();
//           a.remove();
//           window.URL.revokeObjectURL(url);
//           showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
//         }
//       } else {
//         throw new Error(`Export API failed with status: ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Export error:', error);
//       showToast('Export failed. Please try again.', 'error');
//     } finally {
//       setActionLoading(false);
//     }
//   };

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

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
//               <p className="text-gray-600">Export functionality is only available for Admin accounts.</p>
//             </div>
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
//             <span className="ml-2">Loading export data...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Export Approved Timesheets
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

//           {/* Filters */}
//           <div className="flex flex-wrap gap-3 mb-3 items-center" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex flex-wrap gap-2">
//               {/* Start Date Filter */}
//               <DatePicker
//                 selected={startDate ? new Date(startDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setStartDate(isoString);
//                   } else {
//                     setStartDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="Start Date"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />

//               {/* End Date Filter */}
//               <DatePicker
//                 selected={endDate ? new Date(endDate + 'T00:00:00') : null}
//                 onChange={(date) => {
//                   if (date) {
//                     const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
//                     const isoString = localDate.toISOString().split('T')[0];
//                     setEndDate(isoString);
//                   } else {
//                     setEndDate('');
//                   }
//                 }}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="End Date"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 showPopperArrow={false}
//                 autoComplete="off"
//               />

//               {/* Employee ID Filter */}
//               <input
//                 type="text"
//                 value={searchEmployeeId}
//                 onChange={e => setSearchEmployeeId(e.target.value)}
//                 placeholder="Employee ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />

//               {/* Employee Name Filter */}
//               <input
//                 type="text"
//                 value={searchEmployeeName}
//                 onChange={e => setSearchEmployeeName(e.target.value)}
//                 placeholder="Employee Name"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />

//               {/* PO ID Filter */}
//               <input
//                 type="text"
//                 value={searchPOID}
//                 onChange={e => setSearchPOID(e.target.value)}
//                 placeholder="PO ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />

//               {/* VEND ID Filter */}
//               <input
//                 type="text"
//                 value={searchVendID}
//                 onChange={e => setSearchVendID(e.target.value)}
//                 placeholder="VEND ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />

//               {/* PO RELEASE NO Filter */}
//               <input
//                 type="text"
//                 value={searchPOReleaseNo}
//                 onChange={e => setSearchPOReleaseNo(e.target.value)}
//                 placeholder="PO RELEASE NO"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />

//               {/* Clear Filters Button */}
//               <button
//                 onClick={() => {
//                   setSearchDate('');
//                   setStartDate('');
//                   setEndDate('');
//                   setSearchEmployeeId('');
//                   setSearchEmployeeName('');
//                   setSearchPOID('');
//                   setSearchVendID('');
//                   setSearchPOReleaseNo('');
//                 }}
//                 className="bg-gray-500 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-600 transition-colors"
//               >
//                 Clear All
//               </button>
//             </div>
//           </div>

//           {/* Batch ID Input - Added after filters, separate row */}
//           <div className="flex items-center gap-3 mb-3" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <div className="flex items-center gap-2">
//               <label className="text-sm font-medium text-gray-700">Batch ID:</label>
//               <input
//                 type="text"
//                 value={batchId}
//                 onChange={e => setBatchId(e.target.value)}
//                 placeholder="Enter Batch ID"
//                 className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
//               />
//               {/* <span className="text-xs text-gray-500">(For export metadata only)</span> */}
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
//               overflow: "hidden",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >
//             <div className="flex justify-end items-center mb-2 w-full" style={{ flexShrink: 0 }}>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleExportClick}
//                   type="button"
//                   disabled={actionLoading || selectedRows.size === 0}
//                   className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {actionLoading ? "Processing..." : `Export Selected (${selectedRows.size})`}
//                 </button>
//               </div>
//             </div>

//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
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
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "8px",
//                           fontSize: "12px",
//                           minWidth: index === 0 ? "80px" : `${colWidth}px`,
//                           fontWeight: "bold",
//                           color: "#1e40af",
//                           textAlign: "center",
//                           whiteSpace: "nowrap",
//                           backgroundColor: "#f1f5f9",
//                           cursor: col === 'Select' ? "default" : "pointer",
//                           userSelect: "none"
//                         }}
//                         onClick={() => col !== 'Select' && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <div className="flex items-center justify-center gap-1">
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={handleSelectAll}
//                               className="cursor-pointer"
//                               title="Select All"
//                             />
//                             <span style={{ fontSize: "11px" }}>All</span>
//                           </div>
//                         ) : (
//                           <span>
//                             {col}{getSortIcon(col)}
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
//                         key={`${row.id || rdx}-${row["Employee ID"] || ''}-${rdx}`}
//                         style={{
//                           backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white"
//                         }}
//                         onMouseEnter={e => e.target.closest("tr").style.backgroundColor = "#f3f4f6"}
//                         onMouseLeave={e => e.target.closest("tr").style.backgroundColor = rdx % 2 === 0 ? "#f9fafb" : "white"}
//                       >
//                         {columns.map((col, colIndex) => (
//                           <td
//                             key={col}
//                             style={{
//                               border: "1px solid #e5e7eb",
//                               padding: "8px",
//                               fontSize: "11px",
//                               minWidth: colIndex === 0 ? "60px" : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}>
//                             {col === 'Select' ? (
//                               <input
//                                 type="checkbox"
//                                 checked={selectedRows.has(row.id)}
//                                 onChange={() => handleRowSelect(row.id)}
//                                 className="cursor-pointer"
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
//                         No approved data available for export
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import InvoiceViewer from "./Invoice";

// Toast notification utility (keep your implementation)
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
  }, 1000);
};

export default function ExportTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [searchDate, setSearchDate] = useState("");
  const [searchEmployeeId, setSearchEmployeeId] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchPOID, setSearchPOID] = useState("");
  const [searchVendID, setSearchVendID] = useState("");
  const [searchPOReleaseNo, setSearchPOReleaseNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchId, setBatchId] = useState("");
  const [dynamicColumns, setDynamicColumns] = useState([]); // Dynamic columns from API
  const [columnFilters, setColumnFilters] = useState({}); // Filters for dynamic columns
  const [invoiceModalVisible, setInvoiceModalVisible] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState(null);

  const [showInvoice, setShowInvoice] = React.useState(false);
  const [statusFilter, setStatusFilter] = useState({
    approved: false,
    invoiceGenerated: false,
    exported: false,
  });

  const isAdmin = currentUser?.role === "admin" || currentUser?.role === "pm";

  // Generate columns dynamically: Select + dynamic columns from API
  const columns = ["Select", ...dynamicColumns];

  const colWidth = 120;
  const minTableWidth = columns.length * colWidth;

  // Format date to MM/DD/YYYY with leading zeros
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

  const toTitleCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // status badge base style and helper
  const baseStyle =
    "px-2.5 py-1 text-xs font-semibold rounded-full text-center inline-block";
  const statusClass = (s) => {
    const su = String(s || "").toUpperCase();
    if (su === "APPROVED") return `${baseStyle} bg-green-100 text-green-800`;
    if (
      su === "INV_GEN" ||
      su === "INVOICE GENERATED" ||
      su === "INVOICE_GENERATED" ||
      su === "INVOICEGENERATED"
    )
      return `${baseStyle} bg-yellow-100 text-yellow-800`;
    if (su === "EXPORTED") return `${baseStyle} bg-blue-100 text-blue-800`;
    return `${baseStyle} bg-gray-100 text-gray-700`;
  };

  const formatHours = (hours) => {
    if (!hours && hours !== 0) return "";
    const numHours = parseFloat(hours);
    if (isNaN(numHours)) return hours;
    return numHours.toFixed(2);
  };

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate date for Monday (subtract days from today)
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    // Calculate date for Sunday (add days to today)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    // Format YYYY-MM-DD strings
    const formatDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setStartDate(formatDate(monday));
    setEndDate(formatDate(sunday));
  }, []); // Run once on mount

  // Convert API field names to display names
  const formatColumnName = (fieldName) => {
    // Handle specific field mappings
    const fieldMappings = {
      timesheet_Date: "Timesheet Date",
      resource_Id: "Employee ID",
      displayedName: "Name",
      employeeName: "Employee Name",
      resource_Name: "Employee Name",
      projId: "Project ID",
      projectId: "Project ID",
      plc: "PLC",
      projectLaborCategory: "Project Labor Category",
      payType: "Pay Type",
      rlseNumber: "RLSE Number",
      poNumber: "PO Number",
      poLineNumber: "PO Line Number",
      fiscalYear: "Fiscal Year",
      timesheetTypeCode: "Timesheet Type Code",
      sequenceNumber: "Seq No",
      createdAt: "Created At",
      updatedAt: "Updated At",
      batchId: "Batch ID",
      vend_Id: "Vendor ID",
      vend_Name: "Vendor Name",
      resource_Desc: "Employee Description",
      glc: "GLC",
    };

    if (fieldMappings[fieldName]) {
      return fieldMappings[fieldName];
    }

    // Convert camelCase or snake_case to Title Case
    return fieldName
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .trim();
  };

  //format date
  // Add this useEffect to set the default search date

  // Get sorted rows with arrow
  const getSortedRows = (rowsToSort) => {
    let sorted = [...rowsToSort];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        let aVal, bVal;

        // Handle different column types
        if (
          sortConfig.key === "Timesheet Date" ||
          sortConfig.key.toLowerCase().includes("date")
        ) {
          aVal = new Date(a.originalDate || a[sortConfig.key]);
          bVal = new Date(b.originalDate || b[sortConfig.key]);
          if (isNaN(aVal.getTime())) aVal = new Date(0);
          if (isNaN(bVal.getTime())) bVal = new Date(0);
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (
          sortConfig.key === "Hours" ||
          sortConfig.key.toLowerCase().includes("hour")
        ) {
          aVal = parseFloat(a[sortConfig.key]) || 0;
          bVal = parseFloat(b[sortConfig.key]) || 0;
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        } else if (
          sortConfig.key.toLowerCase().includes("id") ||
          sortConfig.key.toLowerCase().includes("number") ||
          sortConfig.key.toLowerCase().includes("seq")
        ) {
          // Numeric sorting for ID fields
          aVal = parseInt(a[sortConfig.key]) || 0;
          bVal = parseInt(b[sortConfig.key]) || 0;
          if (aVal === bVal) {
            // If numeric values are equal, fall back to string comparison
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
          // String sorting for all other columns
          aVal = String(a[sortConfig.key] || "").toLowerCase();
          bVal = String(b[sortConfig.key] || "").toLowerCase();
          if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
    } else {
      // Default sorting - Sort by date if available
      sorted.sort((a, b) => {
        let aDate = new Date(a.originalDate || a["Timesheet Date"]);
        let bDate = new Date(b.originalDate || b["Timesheet Date"]);
        if (isNaN(aDate.getTime())) aDate = new Date(0);
        if (isNaN(bDate.getTime())) bDate = new Date(0);
        if (aDate.getTime() !== bDate.getTime()) {
          return bDate.getTime() - aDate.getTime();
        }

        // Secondary sort by Employee ID if available
        const aEmpId = String(
          a["Employee ID"] || a["Resource ID"] || ""
        ).toLowerCase();
        const bEmpId = String(
          b["Employee ID"] || b["Resource ID"] || ""
        ).toLowerCase();
        return aEmpId.localeCompare(bEmpId);
      });
    }

    return sorted;
  };

  const handleSort = (key) => {
    if (key === "All") return; // Skip checkbox column

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (columnKey === "All") return null; // Skip checkbox column

    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return " ⇅";
  };

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
    if (userLoaded && currentUser) {
      fetchExportData();
    }
  }, [userLoaded, currentUser]);

  // Updated fetch function to dynamically build columns
  // const fetchExportData = async () => {
  //   if (!userLoaded || !currentUser) return;
  //   try {
  //     setLoading(true);

  //     const resourceId = currentUser.username;

  //     if (!resourceId) {
  //       showToast('User resource ID not found. Please login again.', "error");
  //       navigate("/");
  //       return;
  //     }

  //     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/GetDetailedTimesheetsByStatus?status=Approved&resourceId=${resourceId}`;

  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //     const apiData = await response.json();

  //     if (Array.isArray(apiData) && apiData.length > 0) {
  //       // Extract all unique keys from the first item to build dynamic columns
  //       const firstItem = apiData[0];
  //       const allKeys = Object.keys(firstItem);

  //       // Filter out internal fields and format column names
  //       const displayColumns = allKeys
  //         .filter(key =>
  //           !['id', 'timesheetId', '_id', '__v', 'originalItem'].includes(key)
  //         )
  //         .map(key => formatColumnName(key));

  //       setDynamicColumns(displayColumns);

  //       const mappedData = apiData.map((item, index) => {
  //         const mappedRow = {
  //           id: item.timesheetId || item.id || `export-${index}`,
  //           originalDate: item.timesheet_Date || item.timesheetDate || item.createdAt,
  //           originalItem: item,
  //         };

  //         // Map all fields from API response to display columns
  //         allKeys.forEach(key => {
  //           const displayKey = formatColumnName(key);
  //           let value = item[key];

  //           // Special formatting for different data types
  //           if (key === 'timesheet_Date' || key.toLowerCase().includes('date')) {
  //             value = formatDate(value);
  //           } else if (key === 'hours' || key.toLowerCase().includes('hour')) {
  //             value = formatHours(value);
  //           } else if (value === null || value === undefined) {
  //             value = '';
  //           } else {
  //             value = String(value);
  //           }

  //           mappedRow[displayKey] = value;
  //         });

  //         return mappedRow;
  //       });

  //       setRows(mappedData);
  //     } else {
  //       setDynamicColumns([]);
  //       setRows([]);
  //     }

  //     setSelectedRows(new Set());
  //     setSelectAll(false);
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     showToast('Failed to load export data. Please check your connection.', "error");
  //     setRows([]);
  //     setDynamicColumns([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Updated fetch function to dynamically build columns with Status first
  // const fetchExportData = async () => {
  //   if (!userLoaded || !currentUser) return;
  //   try {
  //     setLoading(true);

  //     const resourceId = currentUser.username;

  //     if (!resourceId) {
  //       showToast("User resource ID not found. Please login again.", "error");
  //       navigate("/");
  //       return;
  //     }

  //     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/GetDetailedTimesheetsByStatus?status=Approved&resourceId=${resourceId}`;

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!response.ok)
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     const apiData = await response.json();

  //     if (Array.isArray(apiData) && apiData.length > 0) {
  //       // Extract all unique keys from the first item to build dynamic columns
  //       const firstItem = apiData[0];
  //       const allKeys = Object.keys(firstItem);

  //       // Filter out internal fields
  //       const filteredKeys = allKeys.filter(
  //         (key) =>
  //           !["id", "timesheetId", "_id", "__v", "originalItem"].includes(key)
  //       );

  //       // Separate Status and other columns
  //       const statusKey = filteredKeys.find(
  //         (key) => formatColumnName(key).toLowerCase() === "status"
  //       );
  //       const otherKeys = filteredKeys.filter(
  //         (key) => formatColumnName(key).toLowerCase() !== "status"
  //       );

  //       // Build display columns with Status first, then others
  //       const displayColumns = [];
  //       if (statusKey) {
  //         displayColumns.push(formatColumnName(statusKey));
  //       }
  //       displayColumns.push(...otherKeys.map((key) => formatColumnName(key)));

  //       setDynamicColumns(displayColumns);

  //       const mappedData = apiData.map((item, index) => {
  //         const mappedRow = {
  //           id: item.timesheetId || item.id || `export-${index}`,
  //           originalDate:
  //             item.timesheet_Date || item.timesheetDate || item.createdAt,
  //           originalItem: item,
  //         };

  //         // Map all fields from API response to display columns
  //         allKeys.forEach((key) => {
  //           const displayKey = formatColumnName(key);
  //           let value = item[key];

  //           // Special formatting for different data types
  //           if (
  //             key === "timesheet_Date" ||
  //             key.toLowerCase().includes("date")
  //           ) {
  //             value = formatDate(value);
  //           } else if (key === "hours" || key.toLowerCase().includes("hour")) {
  //             value = formatHours(value);
  //           } else if (value === null || value === undefined) {
  //             value = "";
  //           } else {
  //             value = String(value);
  //           }

  //           mappedRow[displayKey] = value;
  //         });

  //         return mappedRow;
  //       });

  //       setRows(mappedData);
  //     } else {
  //       setDynamicColumns([]);
  //       setRows([]);
  //     }

  //     setSelectedRows(new Set());
  //     setSelectAll(false);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     showToast(
  //       "Failed to load export data. Please check your connection.",
  //       "error"
  //     );
  //     setRows([]);
  //     setDynamicColumns([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchExportData = async () => {
    if (!userLoaded || !currentUser) return;
    try {
      setLoading(true);

      const resourceId = currentUser.username;

      if (!resourceId) {
        showToast("User resource ID not found. Please login again.", "error");
        navigate("/");
        return;
      }

      const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/GetDetailedTimesheetsByStatus?status=ALL&resourceId=${resourceId}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();

      if (Array.isArray(apiData) && apiData.length > 0) {
        // Extract all unique keys from the first item
        const firstItem = apiData[0];
        const allKeys = Object.keys(firstItem);

        // Filter out internal fields
        const filteredKeys = allKeys.filter(
          (key) =>
            !["id", "timesheetId", "_id", "__v", "originalItem"].includes(key)
        );

        // Define desired column order keys (lowercase)
        const desiredOrder = [
          "status",
          "resource_id",
          "resource_name",
          "resource_desc",
          "plc",
          "paytype",
          "hours",
          "perhrrate",
          "amt",
          "vend_id",
          "vend_name",
          "hours_date",
          "hours",
          // "amt",
        ];

        // Lowercase filtered keys for matching
        const lowerFilteredKeys = filteredKeys.map((k) => k.toLowerCase());

        // Find keys in desired order that exist in filtered keys
        const orderedKeys = desiredOrder.filter((k) =>
          lowerFilteredKeys.includes(k)
        );

        // Other keys not in desired order
        const remainingKeys = filteredKeys.filter(
          (key) => !orderedKeys.includes(key.toLowerCase())
        );

        // Compose final columns with correct casing from filteredKeys
        const finalColumns = [];

        // Add Status column with proper casing from filteredKeys
        const statusKey = filteredKeys.find(
          (k) => k.toLowerCase() === "status"
        );
        if (statusKey) finalColumns.push(statusKey);

        // Add rest of desired ordered keys except status
        orderedKeys.forEach((orderedKey) => {
          if (orderedKey !== "status") {
            const key = filteredKeys.find(
              (k) => k.toLowerCase() === orderedKey
            );
            if (key) finalColumns.push(key);
          }
        });

        // Add remaining columns after ordered columns
        finalColumns.push(...remainingKeys);

        // Format column names for display
        const displayColumns = finalColumns.map((key) => formatColumnName(key));

        // Set dynamic columns in the custom order
        setDynamicColumns(displayColumns);

        // Map API data to rows with formatted keys and values
        const mappedData = apiData.map((item, index) => {
          const mappedRow = {
            id: item.timesheetId || item.id || `export-${index}`,
            originalDate:
              item.timesheet_Date || item.timesheetDate || item.createdAt,
            originalItem: item,
          };

          allKeys.forEach((key) => {
            const displayKey = formatColumnName(key);
            let value = item[key];

            if (key === statusKey) {
              // Apply camel case only for status values
              value = toTitleCase(value);
            } else if (
              key === "timesheet_Date" ||
              key.toLowerCase().includes("date")
            ) {
              value = formatDate(value);
            } else if (key === "hours" || key.toLowerCase().includes("hour")) {
              value = formatHours(value);
            } else if (value === null || value === undefined) {
              value = "";
            } else {
              value = String(value);
            }

            mappedRow[displayKey] = value;
          });

          return mappedRow;
        });

        setRows(mappedData);
      } else {
        setDynamicColumns([]);
        setRows([]);
      }

      setSelectedRows(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast(
        "Failed to load export data. Please check your connection.",
        "error"
      );
      setRows([]);
      setDynamicColumns([]);
    } finally {
      setLoading(false);
    }
  };

  // Updated fetch function to show default columns when no data
  // const fetchExportData = async () => {
  //   if (!userLoaded || !currentUser) return;
  //   try {
  //     setLoading(true);

  //     const resourceId = currentUser.username;

  //     if (!resourceId) {
  //       showToast('User resource ID not found. Please login again.', "error");
  //       navigate("/");
  //       return;
  //     }

  //     const apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/GetDetailedTimesheetsByStatus?status=Approved&resourceId=${resourceId}`;

  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' }
  //     });

  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //     const apiData = await response.json();

  //     // Define default columns to show when no data is available
  //     const defaultColumns = [
  //       'Status',
  //       'Timesheet Date',
  //       'Employee ID',
  //       'Name',
  //       'Hours',
  //       'Project ID',
  //       'PLC',
  //       'Pay Type',
  //       'PO Number',
  //       'RLSE Number',
  //       'Fiscal Year',
  //       'Batch ID'
  //     ];

  //     if (Array.isArray(apiData) && apiData.length > 0) {
  //       // Extract all unique keys from the first item to build dynamic columns
  //       const firstItem = apiData[0];
  //       const allKeys = Object.keys(firstItem);

  //       // Filter out internal fields
  //       const filteredKeys = allKeys
  //         .filter(key =>
  //           !['id', 'timesheetId', '_id', '__v', 'originalItem'].includes(key)
  //         );

  //       // Separate Status and other columns
  //       const statusKey = filteredKeys.find(key =>
  //         formatColumnName(key).toLowerCase() === 'status'
  //       );
  //       const otherKeys = filteredKeys.filter(key =>
  //         formatColumnName(key).toLowerCase() !== 'status'
  //       );

  //       // Build display columns with Status first, then others
  //       const displayColumns = [];
  //       if (statusKey) {
  //         displayColumns.push(formatColumnName(statusKey));
  //       }
  //       displayColumns.push(...otherKeys.map(key => formatColumnName(key)));

  //       setDynamicColumns(displayColumns);

  //       const mappedData = apiData.map((item, index) => {
  //         const mappedRow = {
  //           id: item.timesheetId || item.id || `export-${index}`,
  //           originalDate: item.timesheet_Date || item.timesheetDate || item.createdAt,
  //           originalItem: item,
  //         };

  //         // Map all fields from API response to display columns
  //         allKeys.forEach(key => {
  //           const displayKey = formatColumnName(key);
  //           let value = item[key];

  //           // Special formatting for different data types
  //           if (key === 'timesheet_Date' || key.toLowerCase().includes('date')) {
  //             value = formatDate(value);
  //           } else if (key === 'hours' || key.toLowerCase().includes('hour')) {
  //             value = formatHours(value);
  //           } else if (value === null || value === undefined) {
  //             value = '';
  //           } else {
  //             value = String(value);
  //           }

  //           mappedRow[displayKey] = value;
  //         });

  //         return mappedRow;
  //       });

  //       setRows(mappedData);
  //     } else {
  //       // When no data is available, show default columns instead of empty array
  //       setDynamicColumns(defaultColumns);
  //       setRows([]);
  //     }

  //     setSelectedRows(new Set());
  //     setSelectAll(false);
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     showToast('Failed to load export data. Please check your connection.', "error");
  //     setRows([]);
  //     // Show default columns even on error
  //     setDynamicColumns([
  //       'Status',
  //       'Timesheet Date',
  //       'Employee ID',
  //       'Name',
  //       'Hours',
  //       'Project ID',
  //       'PLC',
  //       'Pay Type',
  //       'PO Number',
  //       'RLSE Number',
  //       'Fiscal Year',
  //       'Batch ID'
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getFilteredRows = () => {
    let filtered = rows;
    if (!Array.isArray(filtered)) return [];

    // Filter by single date (existing functionality)
    if (searchDate) {
      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.originalDate);
        const selectedDate = new Date(searchDate + "T00:00:00");
        return (
          rowDate.getFullYear() === selectedDate.getFullYear() &&
          rowDate.getMonth() === selectedDate.getMonth() &&
          rowDate.getDate() === selectedDate.getDate()
        );
      });
    }

    const statusCodes = [];
    if (statusFilter.approved) statusCodes.push("APPROVED");
    if (statusFilter.invoiceGenerated) statusCodes.push("INOVICEGENERATED");
    if (statusFilter.exported) statusCodes.push("EXPORTED");

    if (statusCodes.length > 0) {
      filtered = filtered.filter((row) =>
        statusCodes.includes((row.Status || row.status || "").toUpperCase())
      );
    }

    // Filter by date range (Start date and End date)
    if (startDate || endDate) {
      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.originalDate);
        let inRange = true;

        if (startDate) {
          const start = new Date(startDate + "T00:00:00");
          inRange = inRange && rowDate >= start;
        }

        if (endDate) {
          const end = new Date(endDate + "T23:59:59");
          inRange = inRange && rowDate <= end;
        }

        return inRange;
      });
    }

    // Employee ID filter
    if (searchEmployeeId.trim()) {
      filtered = filtered.filter((row) =>
        (row["Employee ID"] || row["Resource ID"] || "")
          .toLowerCase()
          .includes(searchEmployeeId.trim().toLowerCase())
      );
    }

    // Employee Name filter
    if (searchEmployeeName.trim()) {
      filtered = filtered.filter((row) =>
        (row["Name"] || row["Employee Name"] || row["Resource Name"] || "")
          .toLowerCase()
          .includes(searchEmployeeName.trim().toLowerCase())
      );
    }

    // PO ID filter
    if (searchPOID.trim()) {
      filtered = filtered.filter((row) =>
        (row["PO Number"] || "")
          .toLowerCase()
          .includes(searchPOID.trim().toLowerCase())
      );
    }

    // VEND ID filter
    if (searchVendID.trim()) {
      filtered = filtered.filter((row) =>
        (row["Vendor ID"] || "")
          .toLowerCase()
          .includes(searchVendID.trim().toLowerCase())
      );
    }

    // PO RELEASE NO filter
    if (searchPOReleaseNo.trim()) {
      filtered = filtered.filter((row) =>
        (row["RLSE Number"] || "")
          .toLowerCase()
          .includes(searchPOReleaseNo.trim().toLowerCase())
      );
    }

    // Apply dynamic column filters
    Object.keys(columnFilters).forEach((columnName) => {
      const filterValue = columnFilters[columnName];
      if (filterValue && filterValue.trim()) {
        filtered = filtered.filter((row) =>
          (row[columnName] || "")
            .toLowerCase()
            .includes(filterValue.trim().toLowerCase())
        );
      }
    });

    return getSortedRows(filtered);
  };

  const filteredRows = getFilteredRows();

  // Handle individual row selection
  const handleRowSelect = (rowId) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(
      newSelectedRows.size === filteredRows.length && filteredRows.length > 0
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allRowIds = new Set(filteredRows.map((row) => row.id));
      setSelectedRows(allRowIds);
      setSelectAll(true);
    }
  };

  useEffect(() => {
    if (filteredRows.length > 0) {
      const allSelected = filteredRows.every((row) => selectedRows.has(row.id));
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [filteredRows, selectedRows]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    showToast("Logged out successfully", "info");
    navigate("/");
  };

  // Export selected rows with POST request containing selected data (unchanged)
  // const handleExportClick = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (actionLoading) return;

  //   if (selectedRows.size === 0) {
  //     showToast('Please select at least one timesheet to export', 'warning');
  //     return;
  //   }

  //   try {
  //     setActionLoading(true);

  //     // Get selected row data
  //     const selectedData = filteredRows.filter(row => selectedRows.has(row.id));

  //     if (selectedData.length === 0) {
  //       showToast('No selected data to export', 'warning');
  //       return;
  //     }

  //     // Prepare payload with selected row data
  //     const payload = {
  //       selectedTimesheets: selectedData.map(row => row.originalItem), // Send original API data
  //       exportRequest: {
  //         requestedBy: currentUser?.username || currentUser?.id || 'admin',
  //         requestDate: new Date().toISOString(),
  //         totalRecords: selectedData.length,
  //         batchId: batchId || null,
  //         filters: {
  //           date: searchDate || null,
  //           startDate: startDate || null,
  //           endDate: endDate || null,
  //           employeeId: searchEmployeeId || null,
  //           employeeName: searchEmployeeName || null,
  //         }
  //       }
  //     };

  //     // Send POST request with selected data (keep original export API)
  //     const response = await fetch('https://timesheet-subk.onrender.com/api/SubkTimesheet/export-csv', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload.selectedTimesheets)
  //     });

  //     if (response.ok) {
  //       const contentType = response.headers.get('content-type');
  //       if (contentType && contentType.includes('text/csv')) {
  //         const csvData = await response.text();
  //         const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
  //       } else {
  //         const csvHeaders = dynamicColumns.join(',');
  //         const csvRows = selectedData.map(row =>
  //           dynamicColumns.map(col => {
  //             const value = row[col] || '';
  //             return `"${String(value).replace(/"/g, '""')}"`;
  //           }).join(',')
  //         );
  //         const csvContent = [csvHeaders, ...csvRows].join('\n');
  //         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${new Date().toISOString().split('T')[0]}.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(`Exported ${selectedData.length} selected timesheets successfully`, 'success');
  //       }
  //     } else {
  //       throw new Error(`Export API failed with status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error('Export error:', error);
  //     showToast('Export failed. Please try again.', 'error');
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  // Export selected rows with POST request containing selected data
  const handleExportClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (actionLoading) return;

    if (selectedRows.size === 0) {
      showToast("Please select at least one timesheet to export", "warning");
      return;
    }

    try {
      setActionLoading(true);

      // Get selected row data
      const selectedData = filteredRows.filter((row) =>
        selectedRows.has(row.id)
      );

      if (selectedData.length === 0) {
        showToast("No selected data to export", "warning");
        return;
      }

      // Prepare payload with selected row data - ADD CREATEDBY FIELD
      const payload = selectedData.map((row) => {
        const originalItem = row.originalItem;

        // Ensure CreatedBy field is included
        return {
          ...originalItem,
          CreatedBy:
            originalItem.CreatedBy ||
            currentUser?.username ||
            currentUser?.id ||
            "admin",
          // Add other potentially missing required fields
          UpdatedBy:
            originalItem.UpdatedBy ||
            currentUser?.username ||
            currentUser?.id ||
            "admin",
          CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
          UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
        };
      });

      console.log("Export payload:", payload); // Debug log to verify CreatedBy field

      // Send POST request with selected data
      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/SubkTimesheet/export-csv",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send the enhanced payload with CreatedBy
        }
      );

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("text/csv")) {
          const csvData = await response.text();
          const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `exported_selected_timesheets_${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          showToast(
            `Exported ${selectedData.length} selected timesheets successfully`,
            "success"
          );
        } else {
          // Fallback CSV generation
          const csvHeaders = dynamicColumns.join(",");
          const csvRows = selectedData.map((row) =>
            dynamicColumns
              .map((col) => {
                const value = row[col] || "";
                return `"${String(value).replace(/"/g, '""')}"`;
              })
              .join(",")
          );
          const csvContent = [csvHeaders, ...csvRows].join("\n");
          const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `exported_selected_timesheets_${
            new Date().toISOString().split("T")[0]
          }.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
          showToast(
            `Exported ${selectedData.length} selected timesheets successfully`,
            "success"
          );
        }
      } else {
        // Enhanced error handling
        let errorMessage = "Export failed. Please try again.";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errorData = await response.json();
            if (errorData.errors) {
              // Handle validation errors
              const validationErrors = Object.entries(errorData.errors)
                .map(
                  ([field, messages]) =>
                    `${field}: ${
                      Array.isArray(messages) ? messages.join(", ") : messages
                    }`
                )
                .join("; ");
              errorMessage = `Validation Error: ${validationErrors}`;
            } else if (errorData.title) {
              errorMessage = errorData.title;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            }
          } else {
            errorMessage = (await response.text()) || errorMessage;
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Export error:", error);
      showToast(error.message || "Export failed. Please try again.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // const handleGenerateInvoice = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (actionLoading) return;

  //   if (selectedRows.size === 0) {
  //     showToast("Please select at least one timesheet to generate", "warning");
  //     return;
  //   }

  //   try {
  //     setActionLoading(true);
  //     const selectedData = filteredRows.filter((row) =>
  //       selectedRows.has(row.id)
  //     );
  //     const payload = selectedData.map((row) => {
  //       const originalItem = row.originalItem;
  //       return {
  //         ...originalItem,
  //         CreatedBy:
  //           originalItem.CreatedBy ||
  //           currentUser?.username ||
  //           currentUser?.id ||
  //           "admin",
  //         UpdatedBy:
  //           originalItem.UpdatedBy ||
  //           currentUser?.username ||
  //           currentUser?.id ||
  //           "admin",
  //         CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
  //         UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
  //       };
  //     });

  //     const response = await fetch(
  //       "https://timesheet-subk.onrender.com/api/SubkTimesheet/GenerateInvoice",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to generate invoice");
  //     }
  //     const invoiceResponse = await response.json();

  //     setInvoiceData(invoiceData);
  //     setInvoiceModalVisible(true);
  //   } catch (err) {
  //     showToast("Invoice generation failed: " + (err.message || ""), "error");
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (actionLoading) return;

    if (selectedRows.size === 0) {
      showToast("Please select at least one timesheet to export", "warning");
      return;
    }

    try {
      setActionLoading(true);

      const selectedData = filteredRows.filter((row) =>
        selectedRows.has(row.id)
      );

      if (selectedData.length === 0) {
        showToast("No selected data to export", "warning");
        setActionLoading(false);
        return;
      }

      const payload = selectedData.map((row) => {
        const originalItem = row.originalItem;
        return {
          ...originalItem,
          CreatedBy:
            originalItem.CreatedBy ||
            currentUser?.username ||
            currentUser?.id ||
            "admin",
          UpdatedBy:
            originalItem.UpdatedBy ||
            currentUser?.username ||
            currentUser?.id ||
            "admin",
          CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
          UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
        };
      });

      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/SubkTimesheet/GenerateInvoice",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const invoiceData = await response.json();

      // Debug log the invoice data received from API
      console.log("Invoice data received:", invoiceData);

      // Set to state for InvoiceViewer
      setShowInvoice(invoiceData);

      showToast(
        `Invoice generated successfully for ${selectedData.length} timesheets`,
        "success"
      );
      setInvoiceModalVisible(true);
    } catch (error) {
      console.error("Generate Invoice error:", error);
      showToast(error.message || "Invoice generation failed", "error");
    } finally {
      setActionLoading(false);
    }
  };

  // const handleGenrateInvoice = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (actionLoading) return;

  //   if (selectedRows.size === 0) {
  //     showToast("Please select at least one timesheet to export", "warning");
  //     return;
  //   }

  //   try {
  //     setActionLoading(true);

  //     // Get selected row data
  //     const selectedData = filteredRows.filter((row) =>
  //       selectedRows.has(row.id)
  //     );

  //     if (selectedData.length === 0) {
  //       showToast("No selected data to export", "warning");
  //       return;
  //     }

  //     // Prepare payload with selected row data - ADD CREATEDBY FIELD
  //     const payload = selectedData.map((row) => {
  //       const originalItem = row.originalItem;

  //       // Ensure CreatedBy field is included
  //       return {
  //         ...originalItem,
  //         CreatedBy:
  //           originalItem.CreatedBy ||
  //           currentUser?.username ||
  //           currentUser?.id ||
  //           "admin",
  //         // Add other potentially missing required fields
  //         UpdatedBy:
  //           originalItem.UpdatedBy ||
  //           currentUser?.username ||
  //           currentUser?.id ||
  //           "admin",
  //         CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
  //         UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
  //       };
  //     });

  //     console.log("Export payload:", payload); // Debug log to verify CreatedBy field

  //     // Send POST request with selected data
  //     const response = await fetch(
  //       "https://timesheet-subk.onrender.com/api/SubkTimesheet/GenerateInvoice",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(payload), // Send the enhanced payload with CreatedBy
  //       }
  //     );

  //     if (response.ok) {
  //       const contentType = response.headers.get("content-type");
  //       if (contentType && contentType.includes("text/csv")) {
  //         const csvData = await response.text();
  //         const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${
  //           new Date().toISOString().split("T")[0]
  //         }.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(
  //           `Exported ${selectedData.length} selected timesheets successfully`,
  //           "success"
  //         );
  //       } else {
  //         // Fallback CSV generation
  //         const csvHeaders = dynamicColumns.join(",");
  //         const csvRows = selectedData.map((row) =>
  //           dynamicColumns
  //             .map((col) => {
  //               const value = row[col] || "";
  //               return `"${String(value).replace(/"/g, '""')}"`;
  //             })
  //             .join(",")
  //         );
  //         const csvContent = [csvHeaders, ...csvRows].join("\n");
  //         const blob = new Blob([csvContent], {
  //           type: "text/csv;charset=utf-8;",
  //         });
  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement("a");
  //         a.href = url;
  //         a.download = `exported_selected_timesheets_${
  //           new Date().toISOString().split("T")[0]
  //         }.csv`;
  //         document.body.appendChild(a);
  //         a.click();
  //         a.remove();
  //         window.URL.revokeObjectURL(url);
  //         showToast(
  //           `Exported ${selectedData.length} selected timesheets successfully`,
  //           "success"
  //         );
  //       }
  //     } else {
  //       // Enhanced error handling
  //       let errorMessage = "Export failed. Please try again.";
  //       try {
  //         const contentType = response.headers.get("content-type");
  //         if (contentType && contentType.includes("application/json")) {
  //           const errorData = await response.json();
  //           if (errorData.errors) {
  //             // Handle validation errors
  //             const validationErrors = Object.entries(errorData.errors)
  //               .map(
  //                 ([field, messages]) =>
  //                   `${field}: ${
  //                     Array.isArray(messages) ? messages.join(", ") : messages
  //                   }`
  //               )
  //               .join("; ");
  //             errorMessage = `Validation Error: ${validationErrors}`;
  //           } else if (errorData.title) {
  //             errorMessage = errorData.title;
  //           } else if (errorData.message) {
  //             errorMessage = errorData.message;
  //           }
  //         } else {
  //           errorMessage = (await response.text()) || errorMessage;
  //         }
  //       } catch (parseError) {
  //         console.error("Error parsing response:", parseError);
  //         errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  //       }
  //       throw new Error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Export error:", error);
  //     showToast(error.message || "Export failed. Please try again.", "error");
  //   } finally {
  //     setActionLoading(false);
  //   }
  // };

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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Access Denied
              </h1>
              <p className="text-gray-600">
                Export functionality is only available for Admin accounts.
              </p>
            </div>
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
            <span className="ml-2">Loading export data...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
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
              Export Approved Timesheets
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

          {/* Basic Filters */}
          <div
            className="flex flex-wrap gap-3 mb-3 items-center"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {/* Start Date Filter */}
              <DatePicker
                selected={startDate ? new Date(startDate + "T00:00:00") : null}
                onChange={(date) => {
                  if (date) {
                    const localDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    );
                    const isoString = localDate.toISOString().split("T")[0];
                    setStartDate(isoString);
                  } else {
                    setStartDate("");
                  }
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="Start Date"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                showPopperArrow={false}
                autoComplete="off"
              />

              {/* End Date Filter */}
              <DatePicker
                selected={endDate ? new Date(endDate + "T00:00:00") : null}
                onChange={(date) => {
                  if (date) {
                    const localDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    );
                    const isoString = localDate.toISOString().split("T")[0];
                    setEndDate(isoString);
                  } else {
                    setEndDate("");
                  }
                }}
                dateFormat="MM/dd/yyyy"
                placeholderText="End Date"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                showPopperArrow={false}
                autoComplete="off"
              />

              {/* Employee ID Filter */}
              <input
                type="text"
                value={searchEmployeeId}
                onChange={(e) => setSearchEmployeeId(e.target.value)}
                placeholder="Employee ID"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {/* Employee Name Filter */}
              <input
                type="text"
                value={searchEmployeeName}
                onChange={(e) => setSearchEmployeeName(e.target.value)}
                placeholder="Employee Name"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {/* PO ID Filter */}
              <input
                type="text"
                value={searchPOID}
                onChange={(e) => setSearchPOID(e.target.value)}
                placeholder="PO Number"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {/* VEND ID Filter */}
              <input
                type="text"
                value={searchVendID}
                onChange={(e) => setSearchVendID(e.target.value)}
                placeholder="Vendor Id"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {/* PO RELEASE NO Filter */}
              <input
                type="text"
                value={searchPOReleaseNo}
                onChange={(e) => setSearchPOReleaseNo(e.target.value)}
                placeholder="PO Release Number"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {/* Status Filter */}
              <div className="flex items-center gap-3 mb-2">
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={statusFilter.approved}
                    onChange={() =>
                      setStatusFilter((f) => ({ ...f, approved: !f.approved }))
                    }
                  />
                  Approved
                </label>
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={statusFilter.invoiceGenerated}
                    onChange={() =>
                      setStatusFilter((f) => ({
                        ...f,
                        invoiceGenerated: !f.invoiceGenerated,
                      }))
                    }
                  />
                  Invoice Generated
                </label>
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    checked={statusFilter.exported}
                    onChange={() =>
                      setStatusFilter((f) => ({ ...f, exported: !f.exported }))
                    }
                  />
                  Exported
                </label>
              </div>
              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setSearchDate("");
                  setStartDate("");
                  setEndDate("");
                  setSearchEmployeeId("");
                  setSearchEmployeeName("");
                  setSearchPOID("");
                  setSearchVendID("");
                  setSearchPOReleaseNo("");
                  setColumnFilters({});
                  setStatusFilter({
                    approved: false,
                    invoiceGenerated: false,
                    exported: false,
                  });
                }}
                className="bg-gray-500 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Batch ID Input - Added after filters, separate row */}
          {/* <div
            className="flex items-center gap-3 mb-3"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
            }}
          >
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">
                Batch ID:
              </label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID"
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 w-48"
              />
               
            </div>
          </div> */}

          <div
            className="border border-gray-300 rounded bg-white shadow"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              maxWidth: "none",
              minWidth: 300,
              padding: "0.5rem",
              overflow: "hidden",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="flex justify-end items-center mb-2 w-full"
              style={{ flexShrink: 0 }}
            >
              <div className="flex gap-2">
                {/* <button
                  onClick={handleExportClick}
                  type="button"
                  disabled={actionLoading || selectedRows.size === 0}
                  className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading
                    ? "Processing..."
                    : `Export Selected (${selectedRows.size})`}
                </button> */}
                {/* <button
                  onClick={handleGenerateInvoice}
                  type="button"
                  disabled={actionLoading || selectedRows.size === 0}
                  className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading
                    ? "Processing..."
                    : `Generate Invoice (${selectedRows.size})`}
                </button>
                {showInvoice && <InvoiceViewer data={showInvoice} />} */}
                <button
                  onClick={handleGenerateInvoice}
                  type="button"
                  disabled={actionLoading || selectedRows.size === 0}
                  className="bg-green-700 text-white px-4 py-1.5 rounded shadow-sm hover:bg-green-800 transition-colors text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading
                    ? "Processing..."
                    : `Preview Invoice (${selectedRows.size})`}
                </button>

                {invoiceModalVisible && (
                  <div
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(0,0,0,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 9999,
                    }}
                    onClick={() => setInvoiceModalVisible(false)} // close modal on background click
                  >
                    <div
                      onClick={(e) => e.stopPropagation()} // prevent close on clicking inside modal
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        width: "90vw",
                        maxWidth: "900px",
                        padding: "20px",
                        position: "relative",
                      }}
                    >
                      <button
                        onClick={() => setInvoiceModalVisible(false)}
                        style={{
                          position: "absolute",
                          right: 12,
                          top: 12,
                          fontSize: 24,
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                      <InvoiceViewer
                        data={showInvoice}
                        setInvoiceModalVisible={setInvoiceModalVisible}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                width: "100%",
                maxHeight: "500px",
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: `${minTableWidth}px`,
                  width: "max-content",
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f8fafc",
                    zIndex: 10,
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={col}
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "8px",
                          fontSize: "12px",
                          minWidth: index === 0 ? "80px" : `${colWidth}px`,
                          fontWeight: "bold",
                          color: "#1e40af",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9",
                          cursor: col === "Select" ? "default" : "pointer",
                          userSelect: "none",
                        }}
                        onClick={() => col !== "Select" && handleSort(col)}
                      >
                        {col === "Select" ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              className="cursor-pointer"
                              title="Select All"
                            />
                            <span style={{ fontSize: "11px" }}>All</span>
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
                        key={`${row.id || rdx}-${
                          row["Employee ID"] || ""
                        }-${rdx}`}
                        style={{
                          backgroundColor: rdx % 2 === 0 ? "#f9fafb" : "white",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.closest("tr").style.backgroundColor =
                            "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.target.closest("tr").style.backgroundColor =
                            rdx % 2 === 0 ? "#f9fafb" : "white")
                        }
                      >
                        {columns.map((col, colIndex) => (
                          <td
                            key={col}
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth:
                                colIndex === 0 ? "60px" : `${colWidth}px`,
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            {col === "Select" ? (
                              <input
                                type="checkbox"
                                checked={selectedRows.has(row.id)}
                                onChange={() => handleRowSelect(row.id)}
                                className="cursor-pointer"
                              />
                            ) : col === "Status" ? (
                              // render status as colored badge
                              <span
                                className={statusClass(
                                  row[col] || row.Status || row.status
                                )}
                              >
                                {row[col] || row.Status || row.status || ""}
                              </span>
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
                        No approved data available for export
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
  );
}

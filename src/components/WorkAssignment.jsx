// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Toast notification utility
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

// const WorkAssignment = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   // Column configuration
//   const columns = ['Select', 'Purchase Order', 'Purchase Order Release', 'PO Line Key'];
//   const colWidth = 140;
//   const selectColWidth = 80;
//   const minTableWidth = selectColWidth + (columns.length - 1) * colWidth;
// //   const minTableWidth = columns.length * colWidth;

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userLoaded && currentUser) {
//       fetchWorkAssignments();
//     }
//   }, [userLoaded, currentUser]);

//   // Fetch data from API
//   const fetchWorkAssignments = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.id || `work-${index}`,
//         "Purchase Order": item.purchaseOrder || "",
//         "Purchase Order Release": item.purchaseOrderRelease || "",
//         "PO Line Key": item.poLnKey || "",
//         originalItem: item
//       })) : [];

//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast('Failed to load work assignments. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle individual row selection
//   const handleRowSelect = (rowId) => {
//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);
//     setSelectAll(newSelectedRows.size === rows.length && rows.length > 0);
//   };

//   // Handle select all
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const allRowIds = new Set(rows.map(row => row.id));
//       setSelectedRows(allRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update select all when rows change
//   useEffect(() => {
//     if (rows.length > 0) {
//       const allSelected = rows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [rows, selectedRows]);

//   // Handle sorting
//   const handleSort = (key) => {
//     if (key === 'Select') return;

//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sort icon
//   const getSortIcon = (columnKey) => {
//     if (columnKey === 'Select') return null;

//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   // Get sorted rows
//   const getSortedRows = () => {
//     let sorted = [...rows];
//     if (sortConfig.key && sortConfig.key !== 'Select') {
//       sorted.sort((a, b) => {
//         const aVal = String(a[sortConfig.key] || '').toLowerCase();
//         const bVal = String(b[sortConfig.key] || '').toLowerCase();

//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sorted;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     navigate("/");
//   };

//   // Handle approve action (placeholder)
//   const handleApprove = () => {
//     if (selectedRows.size === 0) {
//       showToast('Please select at least one work assignment to approve', 'warning');
//       return;
//     }

//     // Placeholder for approve functionality
//     showToast(`Approved ${selectedRows.size} work assignments`, 'success');
//   };

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
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
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading work assignments...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sortedRows = getSortedRows();

//   return (
//     <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4 overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//         <div className="w-full flex flex-col items-center">
//           {/* Header */}
//           <div className="w-full flex justify-between items-center mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <h1 className="text-lg font-semibold text-gray-700">
//               Work Assignment
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

//           {/* Action Button */}
//           <div className="w-full flex justify-start mb-4" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }}>
//             <button
//               onClick={handleApprove}
//               disabled={selectedRows.size === 0}
//               className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Approve ({selectedRows.size})
//             </button>
//           </div>

//           {/* Data Table */}
//           <div
//             className="border border-gray-300 rounded bg-white shadow"
//             style={{
//               marginLeft: 24,
//               marginRight: 24,
//               width: "calc(100vw - 220px)",
//               maxWidth: "800px",
//               minWidth: 300,
//               padding: "0.5rem",
//               marginBottom: "20px",
//               display: "flex",
//               flexDirection: "column",
//               maxHeight: "500px" // Add max height constraint

//             }}
//           >
//             <div
//               style={{
//                 overflowX: "auto",
//                 overflowY: "auto",
//                 width: "100%",
//                 flex: 1,
//                 border: "1px solid #e5e7eb",
//                 borderRadius: "4px",
//                 maxHeight: "450px" // Add max height constraint
//               }}
//             >
//               <table
//                 style={{
//                   borderCollapse: "collapse",
//                   fontSize: "11px",
//                   minWidth: `${minTableWidth}px`,
//                   width: "100%"
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
//                         //minWidth: index === 0 ? "80px" : `${colWidth}px`,
//                         width: index === 0 ? `${selectColWidth}px` : `${colWidth}px`, // Use width instead of minWidth
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
//                             <span style={{ fontSize: "11px", color: "#4b5563" }}>All</span>
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
//                   {sortedRows.length > 0 ? (
//                     sortedRows.map((row, rdx) => (
//                       <tr
//                         key={`${row.id}-${rdx}`}
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
//                             //   minWidth: colIndex === 0 ? "80px" : `${colWidth}px`,
//                             width: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                               whiteSpace: "nowrap",
//                               textAlign: "center"
//                             }}
//                           >
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
//                         }}
//                       >
//                         No work assignments available
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
// };

// export default WorkAssignment;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Toast notification utility (keep same)
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

// const WorkAssignment = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approveLoading, setApproveLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [approvedRows, setApprovedRows] = useState(new Set()); // Track approved rows

//   // Column configuration
//   const columns = ['Select', 'Purchase Order', 'Purchase Order Release', 'PO Line Key'];
//   const colWidth = 140;
//   const selectColWidth = 80;
//   const minTableWidth = selectColWidth + (columns.length - 1) * colWidth;

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userLoaded && currentUser) {
//       fetchWorkAssignments();
//     }
//   }, [userLoaded, currentUser]);

//   // Fetch data from API (keep same logic)
//   const fetchWorkAssignments = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.id || `work-${index}`,
//         waId: item.waId || 0,
//         "Purchase Order": item.purchaseOrder || "",
//         "Purchase Order Release": item.purchaseOrderRelease || "",
//         "PO Line Key": item.poLnKey || "",
//         originalItem: item
//       })) : [];

//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast('Failed to load work assignments. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle individual row selection - exclude approved rows
//   const handleRowSelect = (rowId) => {
//     if (approvedRows.has(rowId)) return; // Don't allow selection of approved rows

//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);

//     // Only count non-approved rows for select all
//     const availableRows = rows.filter(row => !approvedRows.has(row.id));
//     setSelectAll(newSelectedRows.size === availableRows.length && availableRows.length > 0);
//   };

//   // Handle select all - exclude approved rows
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       // Only select non-approved rows
//       const availableRowIds = new Set(rows.filter(row => !approvedRows.has(row.id)).map(row => row.id));
//       setSelectedRows(availableRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update select all when rows change
//   useEffect(() => {
//     const availableRows = rows.filter(row => !approvedRows.has(row.id));
//     if (availableRows.length > 0) {
//       const allSelected = availableRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [rows, selectedRows, approvedRows]);

//   // Handle sorting (keep same)
//   const handleSort = (key) => {
//     if (key === 'Select') return;
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sort icon (keep same)
//   const getSortIcon = (columnKey) => {
//     if (columnKey === 'Select') return null;
//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   // Get sorted rows (keep same)
//   const getSortedRows = () => {
//     let sorted = [...rows];
//     if (sortConfig.key && sortConfig.key !== 'Select') {
//       sorted.sort((a, b) => {
//         const aVal = String(a[sortConfig.key] || '').toLowerCase();
//         const bVal = String(b[sortConfig.key] || '').toLowerCase();

//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sorted;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     navigate("/");
//   };

//   // Handle approve action - mark rows as approved instead of removing
//   const handleApprove = async () => {
//     if (selectedRows.size === 0) {
//       showToast('Please select at least one work assignment to approve', 'warning');
//       return;
//     }

//     try {
//       setApproveLoading(true);

//       const selectedData = rows.filter(row => selectedRows.has(row.id));

//       const approvePromises = selectedData.map(async (row) => {
//         const requestBody = {
//           waId: row.waId,
//           purchaseOrder: row["Purchase Order"],
//           purchaseOrderRelease: row["Purchase Order Release"],
//           poLnKey: row["PO Line Key"]
//         };

//         const response = await fetch('${backendUrl}/api/WorkAssignments', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to approve work assignment ${row.id}: ${response.status}`);
//         }
//         return response.json();
//       });

//       await Promise.all(approvePromises);

//       showToast(`Successfully approved ${selectedRows.size} work assignments`, 'success');

//       // Mark rows as approved instead of removing them
//       setApprovedRows(prev => new Set([...prev, ...selectedRows]));
//       setSelectedRows(new Set());
//       setSelectAll(false);

//     } catch (error) {
//       console.error('Approve error:', error);
//       showToast('Failed to approve some work assignments. Please try again.', 'error');
//     } finally {
//       setApproveLoading(false);
//     }
//   };

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
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
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading work assignments...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sortedRows = getSortedRows();
//   const availableRowsCount = rows.filter(row => !approvedRows.has(row.id)).length;

//   return (
//     <div className="h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4 overflow-hidden">
//       <div className="flex-1 flex flex-col pt-6 pb-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h1 className="text-lg font-semibold text-gray-700">
//             Work Assignment
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors font-medium shadow-sm"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Data Table Container */}
//         <div className="flex-1 px-4 pb-4">
//           <div className="h-full border border-gray-300 rounded bg-white shadow flex flex-col">
//             {/* Action Button */}
//             <div className="flex justify-start p-4 border-b border-gray-200">
//               <button
//                 onClick={handleApprove}
//                 disabled={selectedRows.size === 0 || approveLoading}
//                 className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
//               >
//                 {approveLoading ? "Processing..." : `Approve (${selectedRows.size})`}
//               </button>
//             </div>

//             {/* Table */}
//             <div className="flex-1 overflow-auto">
//               <table className="w-full border-collapse text-sm">
//                 <thead className="sticky top-0 bg-gray-50 z-10">
//                   <tr>
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         className={`border border-gray-300 p-3 text-center font-bold text-blue-800 bg-blue-50 ${
//                           col !== 'Select' ? 'cursor-pointer hover:bg-blue-100' : ''
//                         }`}
//                         style={{
//                           width: index === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                         }}
//                         onClick={() => col !== 'Select' && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <div className="flex items-center justify-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={handleSelectAll}
//                               className="cursor-pointer scale-110"
//                               title="Select All"
//                               disabled={availableRowsCount === 0}
//                             />
//                             <span className="text-xs text-gray-600 font-medium">All</span>
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
//                   {sortedRows.length > 0 ? (
//                     sortedRows.map((row, rdx) => {
//                       const isApproved = approvedRows.has(row.id);
//                       return (
//                         <tr
//                           key={`${row.id}-${rdx}`}
//                           className={`${rdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 ${
//                             isApproved ? 'opacity-60 bg-green-50' : ''
//                           }`}
//                         >
//                           {columns.map((col, colIndex) => (
//                             <td
//                               key={col}
//                               className="border border-gray-300 p-3 text-center"
//                               style={{
//                                 width: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                               }}
//                             >
//                               {col === 'Select' ? (
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRows.has(row.id)}
//                                   onChange={() => handleRowSelect(row.id)}
//                                   className="cursor-pointer scale-110"
//                                   disabled={isApproved}
//                                   title={isApproved ? "Already approved" : ""}
//                                 />
//                               ) : (
//                                 <span
//                                   title={row[col] || ""}
//                                   className={isApproved ? 'text-green-700 font-medium' : ''}
//                                 >
//                                   {row[col] || ""}
//                                   {isApproved && col === 'Purchase Order' && (
//                                     <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
//                                       ✓ Approved
//                                     </span>
//                                   )}
//                                 </span>
//                               )}
//                             </td>
//                           ))}
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         className="text-center p-8 text-gray-500 italic"
//                       >
//                         No work assignments available
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
// };

// export default WorkAssignment;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Toast notification utility (keep same)
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

// const WorkAssignment = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approveLoading, setApproveLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [approvedRows, setApprovedRows] = useState(new Set());

//   // Column configuration
//   const columns = ['Select', 'Purchase Order', 'Purchase Order Release', 'PO Line Key'];
//   const colWidth = 140;
//   const selectColWidth = 80;

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userLoaded && currentUser) {
//       fetchWorkAssignments();
//     }
//   }, [userLoaded, currentUser]);

//   // Fetch data from API
//   const fetchWorkAssignments = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.id || `work-${index}`,
//         waId: item.waId || 0,
//         "Purchase Order": item.purchaseOrder || "",
//         "Purchase Order Release": item.purchaseOrderRelease || "",
//         "PO Line Key": item.poLnKey || "",
//         originalItem: item
//       })) : [];

//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast('Failed to load work assignments. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle individual row selection - exclude approved rows
//   const handleRowSelect = (rowId) => {
//     if (approvedRows.has(rowId)) return;

//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);

//     const availableRows = rows.filter(row => !approvedRows.has(row.id));
//     setSelectAll(newSelectedRows.size === availableRows.length && availableRows.length > 0);
//   };

//   // Handle select all - exclude approved rows
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const availableRowIds = new Set(rows.filter(row => !approvedRows.has(row.id)).map(row => row.id));
//       setSelectedRows(availableRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update select all when rows change
//   useEffect(() => {
//     const availableRows = rows.filter(row => !approvedRows.has(row.id));
//     if (availableRows.length > 0) {
//       const allSelected = availableRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [rows, selectedRows, approvedRows]);

//   // Handle sorting
//   const handleSort = (key) => {
//     if (key === 'Select') return;
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sort icon
//   const getSortIcon = (columnKey) => {
//     if (columnKey === 'Select') return null;
//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   // Get sorted rows
//   const getSortedRows = () => {
//     let sorted = [...rows];
//     if (sortConfig.key && sortConfig.key !== 'Select') {
//       sorted.sort((a, b) => {
//         const aVal = String(a[sortConfig.key] || '').toLowerCase();
//         const bVal = String(b[sortConfig.key] || '').toLowerCase();

//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sorted;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     navigate("/");
//   };

//   // Handle approve action - only disable checkboxes, don't change display
//   const handleApprove = async () => {
//     if (selectedRows.size === 0) {
//       showToast('Please select at least one work assignment to approve', 'warning');
//       return;
//     }

//     try {
//       setApproveLoading(true);

//       const selectedData = rows.filter(row => selectedRows.has(row.id));

//       const approvePromises = selectedData.map(async (row) => {
//         const requestBody = {
//           waId: row.waId,
//           purchaseOrder: row["Purchase Order"],
//           purchaseOrderRelease: row["Purchase Order Release"],
//           poLnKey: row["PO Line Key"]
//         };

//         const response = await fetch('${backendUrl}/api/WorkAssignments', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to approve work assignment ${row.id}: ${response.status}`);
//         }
//         return response.json();
//       });

//       await Promise.all(approvePromises);

//       showToast(`Successfully approved ${selectedRows.size} work assignments`, 'success');

//       // Only mark rows as approved (disable checkboxes), don't change display
//       setApprovedRows(prev => new Set([...prev, ...selectedRows]));
//       setSelectedRows(new Set());
//       setSelectAll(false);

//     } catch (error) {
//       console.error('Approve error:', error);
//       showToast('Failed to approve some work assignments. Please try again.', 'error');
//     } finally {
//       setApproveLoading(false);
//     }
//   };

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
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
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading work assignments...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sortedRows = getSortedRows();
//   const availableRowsCount = rows.filter(row => !approvedRows.has(row.id)).length;

//   return (
//     <div className="h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4 overflow-hidden">
//       <div className="flex-1 flex flex-col pt-6 pb-6">
//         {/* Header - Fixed */}
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h1 className="text-lg font-semibold text-gray-700">
//             Work Assignment
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Data Table Container with Fixed Height */}
//         <div className="px-4 pb-4" style={{ height: 'calc(100vh - 180px)' }}>
//           <div className="h-full border border-gray-300 rounded bg-white shadow flex flex-col">

//             {/* Sticky Action Button */}
//             <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
//               <button
//                 onClick={handleApprove}
//                 disabled={selectedRows.size === 0 || approveLoading}
//                 className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
//               >
//                 {approveLoading ? "Processing..." : `Approve (${selectedRows.size})`}
//               </button>
//             </div>

//             {/* Scrollable Table Container with Max Height */}
//             <div
//               className="flex-1 overflow-y-auto overflow-x-hidden"
//               style={{ maxHeight: 'calc(100vh - 260px)' }}
//             >
//               <table className="w-full border-collapse text-sm">
//                 {/* Sticky Header */}
//                 <thead className="sticky top-0 z-10 bg-blue-50">
//                   <tr>
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         className={`border border-gray-300 p-3 text-center font-bold text-blue-800 bg-blue-50 ${
//                           col !== 'Select' ? 'cursor-pointer hover:bg-blue-100' : ''
//                         }`}
//                         style={{
//                           width: index === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                           minWidth: index === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                         }}
//                         onClick={() => col !== 'Select' && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <div className="flex items-center justify-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={handleSelectAll}
//                               className="cursor-pointer scale-110"
//                               title="Select All"
//                               disabled={availableRowsCount === 0}
//                             />
//                             <span className="text-xs text-gray-600 font-medium">All</span>
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

//                 {/* Table Body */}
//                 <tbody>
//                   {sortedRows.length > 0 ? (
//                     sortedRows.map((row, rdx) => {
//                       const isApproved = approvedRows.has(row.id);
//                       return (
//                         <tr
//                           key={`${row.id}-${rdx}`}
//                           className={`${rdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
//                         >
//                           {columns.map((col, colIndex) => (
//                             <td
//                               key={col}
//                               className="border border-gray-300 p-3 text-center"
//                               style={{
//                                 width: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                                 minWidth: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                               }}
//                             >
//                               {col === 'Select' ? (
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRows.has(row.id)}
//                                   onChange={() => handleRowSelect(row.id)}
//                                   className="cursor-pointer scale-110"
//                                   disabled={isApproved}
//                                   title={isApproved ? "Already approved" : ""}
//                                 />
//                               ) : (
//                                 <span title={row[col] || ""}>
//                                   {row[col] || ""}
//                                 </span>
//                               )}
//                             </td>
//                           ))}
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         className="text-center p-8 text-gray-500 italic"
//                       >
//                         No work assignments available
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
// };

// export default WorkAssignment;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// // Toast notification utility
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

// const WorkAssignment = () => {
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userLoaded, setUserLoaded] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [approveLoading, setApproveLoading] = useState(false);
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [approvedRows, setApprovedRows] = useState(new Set());

//   // Filter states
//   const [filterPurchaseOrder, setFilterPurchaseOrder] = useState('');
//   const [filterPurchaseOrderRelease, setFilterPurchaseOrderRelease] = useState('');
//   const [filterWACode, setFilterWACode] = useState('');

//   // Updated column configuration with WO Code
//   const columns = ['Select', 'WO Code', 'Purchase Order', 'Purchase Order Release', 'PO Line Key'];
//   const colWidth = 120;
//   const selectColWidth = 80;

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//         setUserLoaded(true);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//         navigate("/");
//       }
//     } else {
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (userLoaded && currentUser) {
//       fetchWorkAssignments();
//     }
//   }, [userLoaded, currentUser]);

//   // Fetch data from API
//   const fetchWorkAssignments = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const apiData = await response.json();

//       const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//         id: item.id || `work-${index}`,
//         waId: item.waId || 0,
//         "WO Code": item.wa_Code || "",
//         "Purchase Order": item.purchaseOrder || "",
//         "Purchase Order Release": item.purchaseOrderRelease || "",
//         "PO Line Key": item.poLnKey || "",
//         originalItem: item,
//         hasWACode: Boolean(item.wa_Code) // Check if wa_Code exists
//       })) : [];

//       setRows(mappedData);
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } catch (error) {
//       console.error('Fetch error:', error);
//       showToast('Failed to load work assignments. Please check your connection.', "error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get filtered rows based on filter criteria
//   const getFilteredRows = () => {
//     let filtered = rows;

//     if (filterPurchaseOrder.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Purchase Order"] || "").toLowerCase().includes(filterPurchaseOrder.toLowerCase())
//       );
//     }

//     if (filterPurchaseOrderRelease.trim()) {
//       filtered = filtered.filter(row =>
//         (row["Purchase Order Release"] || "").toLowerCase().includes(filterPurchaseOrderRelease.toLowerCase())
//       );
//     }

//     if (filterWACode.trim()) {
//       filtered = filtered.filter(row =>
//         (row["WO Code"] || "").toLowerCase().includes(filterWACode.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   // Handle individual row selection - exclude approved rows and rows with wa_Code
//   const handleRowSelect = (rowId) => {
//     const row = rows.find(r => r.id === rowId);
//     if (approvedRows.has(rowId) || row?.hasWACode) return;

//     const newSelectedRows = new Set(selectedRows);
//     if (newSelectedRows.has(rowId)) {
//       newSelectedRows.delete(rowId);
//     } else {
//       newSelectedRows.add(rowId);
//     }
//     setSelectedRows(newSelectedRows);

//     const availableRows = getFilteredRows().filter(row => !approvedRows.has(row.id) && !row.hasWACode);
//     setSelectAll(newSelectedRows.size === availableRows.length && availableRows.length > 0);
//   };

//   // Handle select all - exclude approved rows and rows with wa_Code
//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedRows(new Set());
//       setSelectAll(false);
//     } else {
//       const availableRowIds = new Set(
//         getFilteredRows()
//           .filter(row => !approvedRows.has(row.id) && !row.hasWACode)
//           .map(row => row.id)
//       );
//       setSelectedRows(availableRowIds);
//       setSelectAll(true);
//     }
//   };

//   // Update select all when rows change
//   useEffect(() => {
//     const availableRows = getFilteredRows().filter(row => !approvedRows.has(row.id) && !row.hasWACode);
//     if (availableRows.length > 0) {
//       const allSelected = availableRows.every(row => selectedRows.has(row.id));
//       setSelectAll(allSelected);
//     } else {
//       setSelectAll(false);
//     }
//   }, [rows, selectedRows, approvedRows, filterPurchaseOrder, filterPurchaseOrderRelease, filterWACode]);

//   // Handle sorting
//   const handleSort = (key) => {
//     if (key === 'Select') return;
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Get sort icon
//   const getSortIcon = (columnKey) => {
//     if (columnKey === 'Select') return null;
//     if (sortConfig.key === columnKey) {
//       return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
//     }
//     return ' ⇅';
//   };

//   // Get sorted and filtered rows
//   const getSortedRows = () => {
//     let filtered = getFilteredRows();

//     if (sortConfig.key && sortConfig.key !== 'Select') {
//       filtered.sort((a, b) => {
//         const aVal = String(a[sortConfig.key] || '').toLowerCase();
//         const bVal = String(b[sortConfig.key] || '').toLowerCase();

//         if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return filtered;
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     setUserLoaded(false);
//     navigate("/");
//   };

//   // Handle approve action
//   const handleApprove = async () => {
//     if (selectedRows.size === 0) {
//       showToast('Please select at least one work assignment to approve', 'warning');
//       return;
//     }

//     try {
//       setApproveLoading(true);

//       const selectedData = rows.filter(row => selectedRows.has(row.id));

//       const approvePromises = selectedData.map(async (row) => {
//         const requestBody = {
//           waId: row.waId,
//           purchaseOrder: row["Purchase Order"],
//           purchaseOrderRelease: row["Purchase Order Release"],
//           poLnKey: row["PO Line Key"]
//         };

//         const response = await fetch('${backendUrl}/api/WorkAssignments', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(requestBody)
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to approve work assignment ${row.id}: ${response.status}`);
//         }
//         return response.json();
//       });

//       await Promise.all(approvePromises);

//       showToast(`Successfully approved ${selectedRows.size} work assignments`, 'success');

//       setApprovedRows(prev => new Set([...prev, ...selectedRows]));
//       setSelectedRows(new Set());
//       setSelectAll(false);

//     } catch (error) {
//       console.error('Approve error:', error);
//       showToast('Failed to approve some work assignments. Please try again.', 'error');
//     } finally {
//       setApproveLoading(false);
//     }
//   };

//   if (!userLoaded || !currentUser) {
//     return (
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
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
//       <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="flex items-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//             <span className="ml-2">Loading work assignments...</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const sortedRows = getSortedRows();
//   const availableRowsCount = sortedRows.filter(row => !approvedRows.has(row.id) && !row.hasWACode).length;

//   return (
//     <div className="h-screen bg-[#f9fafd] flex flex-col pl-48 pr-4 overflow-hidden">
//       <div className="flex-1 flex flex-col pt-6 pb-6">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6 px-4">
//           <h1 className="text-lg font-semibold text-gray-700">
//             Work Assignment
//           </h1>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="flex gap-3 mb-4 px-4">
//           <input
//             type="text"
//             value={filterWACode}
//             onChange={e => setFilterWACode(e.target.value)}
//             placeholder="Filter WO Code"
//             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             value={filterPurchaseOrder}
//             onChange={e => setFilterPurchaseOrder(e.target.value)}
//             placeholder="Filter Purchase Order"
//             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//           <input
//             type="text"
//             value={filterPurchaseOrderRelease}
//             onChange={e => setFilterPurchaseOrderRelease(e.target.value)}
//             placeholder="Filter Purchase Order Release"
//             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />

//         </div>

//         {/* Data Table Container */}
//         <div className="px-4 pb-4" style={{ height: 'calc(100vh - 220px)' }}>
//           <div className="h-full border border-gray-300 rounded bg-white shadow flex flex-col">

//             {/* Sticky Action Button */}
//             <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
//               <button
//                 onClick={handleApprove}
//                 disabled={selectedRows.size === 0 || approveLoading}
//                 className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
//               >
//                 {approveLoading ? "Processing..." : `Approve (${selectedRows.size})`}
//               </button>
//             </div>

//             {/* Scrollable Table Container */}
//             <div
//               className="flex-1 overflow-y-auto overflow-x-hidden"
//               style={{ maxHeight: 'calc(100vh - 300px)' }}
//             >
//               <table className="w-full border-collapse text-sm">
//                 {/* Sticky Header */}
//                 <thead className="sticky top-0 z-10 bg-blue-50">
//                   <tr>
//                     {columns.map((col, index) => (
//                       <th
//                         key={col}
//                         className={`border border-gray-300 p-3 text-center font-bold text-blue-800 bg-blue-50 ${
//                           col !== 'Select' ? 'cursor-pointer hover:bg-blue-100' : ''
//                         }`}
//                         style={{
//                           width: index === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                           minWidth: index === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                         }}
//                         onClick={() => col !== 'Select' && handleSort(col)}
//                       >
//                         {col === 'Select' ? (
//                           <div className="flex items-center justify-center gap-2">
//                             <input
//                               type="checkbox"
//                               checked={selectAll}
//                               onChange={handleSelectAll}
//                               className="cursor-pointer scale-110"
//                               title="Select All"
//                               disabled={availableRowsCount === 0}
//                             />
//                             <span className="text-xs text-gray-600 font-medium">All</span>
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

//                 {/* Table Body */}
//                 <tbody>
//                   {sortedRows.length > 0 ? (
//                     sortedRows.map((row, rdx) => {
//                       const isApproved = approvedRows.has(row.id);
//                       const hasWACode = row.hasWACode;
//                       const isDisabled = isApproved || hasWACode;

//                       return (
//                         <tr
//                           key={`${row.id}-${rdx}`}
//                           className={`${rdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
//                         >
//                           {columns.map((col, colIndex) => (
//                             <td
//                               key={col}
//                               className="border border-gray-300 p-3 text-center"
//                               style={{
//                                 width: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                                 minWidth: colIndex === 0 ? `${selectColWidth}px` : `${colWidth}px`,
//                               }}
//                             >
//                               {col === 'Select' ? (
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedRows.has(row.id)}
//                                   onChange={() => handleRowSelect(row.id)}
//                                   className="cursor-pointer scale-110"
//                                   disabled={isDisabled}
//                                   title={
//                                     isApproved ? "Already approved" :
//                                     hasWACode ? "Has WO Code - cannot approve" : ""
//                                   }
//                                 />
//                               ) : (
//                                 <span title={row[col] || ""}>
//                                   {row[col] || ""}
//                                 </span>
//                               )}
//                             </td>
//                           ))}
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan={columns.length}
//                         className="text-center p-8 text-gray-500 italic"
//                       >
//                         No work assignments available
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
// };

// export default WorkAssignment;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageSquare,
  Download,
  Receipt,
  Package,
  Users,
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

const WorkAssignment = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [approvedRows, setApprovedRows] = useState(new Set());

  // Filter states - Added PO Line Key filter
  const [filterPurchaseOrder, setFilterPurchaseOrder] = useState("");
  const [filterPurchaseOrderRelease, setFilterPurchaseOrderRelease] =
    useState("");
  const [filterWACode, setFilterWACode] = useState("");
  const [filterPOLineKey, setFilterPOLineKey] = useState("");

  // Updated column configuration with W0 Code
  const columns = [
    "Select",
    "WA Code",
    "Purchase Order",
    "Purchase Order Release",
    // "PO Line Key",
  ];
  const colWidth = 120;
  const selectColWidth = 80;

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

  useEffect(() => {
    if (userLoaded && currentUser) {
      fetchWorkAssignments();
    }
  }, [userLoaded, currentUser]);

  // Fetch data from API
  const fetchWorkAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData)
        ? apiData.map((item, index) => ({
            id: item.id || `work-${index}`,
            waId: item.waId || 0,
            "WA Code": item.wa_Code || "",
            "Purchase Order": item.purchaseOrder || "",
            "Purchase Order Release": item.purchaseOrderRelease || "",
            "PO Line Key": item.poLnKey || "",
            originalItem: item,
            hasWACode: Boolean(item.wa_Code), // Check if wa_Code exists
          }))
        : [];

      setRows(mappedData);
      setSelectedRows(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast(
        "Failed to load work order. Please check your connection.",
        "error"
      );
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Get filtered rows based on filter criteria - Added PO Line Key filter
  const getFilteredRows = () => {
    let filtered = rows;

    if (filterPurchaseOrder.trim()) {
      filtered = filtered.filter((row) =>
        (row["Purchase Order"] || "")
          .toLowerCase()
          .includes(filterPurchaseOrder.toLowerCase())
      );
    }

    if (filterPurchaseOrderRelease.trim()) {
      filtered = filtered.filter((row) =>
        (row["Purchase Order Release"] || "")
          .toLowerCase()
          .includes(filterPurchaseOrderRelease.toLowerCase())
      );
    }

    if (filterWACode.trim()) {
      filtered = filtered.filter((row) =>
        (row["WA Code"] || "")
          .toLowerCase()
          .includes(filterWACode.toLowerCase())
      );
    }

    if (filterPOLineKey.trim()) {
      filtered = filtered.filter((row) =>
        (row["PO Line Key"] || "")
          .toLowerCase()
          .includes(filterPOLineKey.toLowerCase())
      );
    }

    return filtered;
  };

  // Handle individual row selection - exclude approved rows and rows with wa_Code
  const handleRowSelect = (rowId) => {
    const row = rows.find((r) => r.id === rowId);
    if (approvedRows.has(rowId) || row?.hasWACode) return;

    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    const availableRows = getFilteredRows().filter(
      (row) => !approvedRows.has(row.id) && !row.hasWACode
    );
    setSelectAll(
      newSelectedRows.size === availableRows.length && availableRows.length > 0
    );
  };

  // Handle select all - exclude approved rows and rows with wa_Code
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const availableRowIds = new Set(
        getFilteredRows()
          .filter((row) => !approvedRows.has(row.id) && !row.hasWACode)
          .map((row) => row.id)
      );
      setSelectedRows(availableRowIds);
      setSelectAll(true);
    }
  };

  // Update select all when rows change - Added PO Line Key dependency
  useEffect(() => {
    const availableRows = getFilteredRows().filter(
      (row) => !approvedRows.has(row.id) && !row.hasWACode
    );
    if (availableRows.length > 0) {
      const allSelected = availableRows.every((row) =>
        selectedRows.has(row.id)
      );
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [
    rows,
    selectedRows,
    approvedRows,
    filterPurchaseOrder,
    filterPurchaseOrderRelease,
    filterWACode,
    filterPOLineKey,
  ]);

  // Handle sorting
  const handleSort = (key) => {
    if (key === "Select") return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (columnKey === "Select") return null;
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return " ⇅";
  };

  // Get sorted and filtered rows
  const getSortedRows = () => {
    let filtered = getFilteredRows();

    if (sortConfig.key && sortConfig.key !== "Select") {
      filtered.sort((a, b) => {
        const aVal = String(a[sortConfig.key] || "").toLowerCase();
        const bVal = String(b[sortConfig.key] || "").toLowerCase();

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  // Handle approve action - Added API refresh after successful approval
  const handleApprove = async () => {
    if (selectedRows.size === 0) {
      showToast(
        "Please select at least one work assignment to approve",
        "warning"
      );
      return;
    }

    try {
      setApproveLoading(true);

      const selectedData = rows.filter((row) => selectedRows.has(row.id));

      const approvePromises = selectedData.map(async (row) => {
        const requestBody = {
          waId: row.waId,
          purchaseOrder: row["Purchase Order"],
          purchaseOrderRelease: row["Purchase Order Release"],
          poLnKey: row["PO Line Key"],
        };

        const response = await fetch(`${backendUrl}/api/WorkAssignments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to approve work assignment ${row.id}: ${response.status}`
          );
        }
        return response.json();
      });

      await Promise.all(approvePromises);

      showToast(
        `Successfully approved ${selectedRows.size} work order`,
        "success"
      );

      // Clear selections first
      setSelectedRows(new Set());
      setSelectAll(false);
      setApprovedRows(new Set()); // Reset approved rows since we're refreshing data

      // Refresh data from API after successful approval
      await fetchWorkAssignments();
    } catch (error) {
      console.error("Approve error:", error);
      showToast(
        "Failed to approve some work order. Please try again.",
        "error"
      );
    } finally {
      setApproveLoading(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-f9fafd flex items-center justify-center pr-4">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-lg text-gray-600">Loading work orders...</p>
        </div>
      </div>
    );
  }

  const sortedRows = getSortedRows();
  const availableRowsCount = sortedRows.filter(
    (row) => !approvedRows.has(row.id) && !row.hasWACode
  ).length;

  return (
    <div className="h-screen bg-[#f9fafd] flex flex-col pr-4 overflow-hidden">
      <div className="flex-1 flex flex-col pt-6 pb-6">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Work Order
              </h1>
              <button
                onClick={handleLogout}
                className="absolute top-6 right-8 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
              >
                Logout
              </button>
              {/* <p className="text-gray-600">Manage and export invoice data</p> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        <div className="flex justify-between items-center mb-6 px-4">
          {/* Left side: icon + heading */}
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Work Order</h1>
          </div>

          {/* Right side: Logout button */}
          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
          >
            Logout
          </button>
        </div>

        {/* Filters - Added PO Line Key filter */}
        <div className="flex gap-3 mb-4 px-4">
          <input
            type="text"
            value={filterWACode}
            onChange={(e) => setFilterWACode(e.target.value)}
            placeholder="Filter WA Code"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPurchaseOrder}
            onChange={(e) => setFilterPurchaseOrder(e.target.value)}
            placeholder="Filter Purchase Order"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPurchaseOrderRelease}
            onChange={(e) => setFilterPurchaseOrderRelease(e.target.value)}
            placeholder="Filter Purchase Order Release"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* <input
            type="text"
            value={filterPOLineKey}
            onChange={e => setFilterPOLineKey(e.target.value)}
            placeholder="Filter PO Line Key"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          /> */}
        </div>

        {/* Data Table Container */}
        <div className="px-4 pb-4" style={{ height: "calc(100vh - 150px)" }}>
          <div className="h-full border border-gray-300 rounded-2xl bg-white shadow flex flex-col">
            {/* Sticky Action Button */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
              <button
                onClick={handleApprove}
                disabled={selectedRows.size === 0 || approveLoading}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
              >
                {approveLoading
                  ? "Processing..."
                  : `Create Work Order (${selectedRows.size})`}
              </button>
            </div>

            {/* Scrollable Table Container */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              <table className="w-full border-collapse text-sm">
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10 bg-blue-50">
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={col}
                        className={`border border-gray-300 p-3 text-center font-bold text-blue-800 bg-blue-50 ${
                          col !== "Select"
                            ? "cursor-pointer hover:bg-blue-100"
                            : ""
                        }`}
                        style={{
                          width:
                            col === "Select" ? `${selectColWidth}px` : "auto",
                          minWidth:
                            col === "Select" ? `${selectColWidth}px` : "80px",
                        }}
                        onClick={() => col !== "Select" && handleSort(col)}
                      >
                        {col === "Select" ? (
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              className="cursor-pointer scale-110"
                              title="Select All"
                              disabled={availableRowsCount === 0}
                            />
                            <span className="text-xs text-gray-600 font-medium">
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

                {/* Table Body */}
                <tbody>
                  {sortedRows.length > 0 ? (
                    sortedRows.map((row, rdx) => {
                      const isApproved = approvedRows.has(row.id);
                      const hasWACode = row.hasWACode;
                      const isDisabled = isApproved || hasWACode;

                      return (
                        <tr
                          key={`${row.id}-${rdx}`}
                          className={`${
                            rdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-100`}
                        >
                          {columns.map((col, colIndex) => (
                            <td
                              key={col}
                              className="border border-gray-300 p-3 text-center"
                              style={{
                                width:
                                  col === "Select"
                                    ? `${selectColWidth}px`
                                    : "auto",
                                minWidth:
                                  col === "Select"
                                    ? `${selectColWidth}px`
                                    : "80px",
                              }}
                            >
                              {col === "Select" ? (
                                <input
                                  type="checkbox"
                                  checked={selectedRows.has(row.id)}
                                  onChange={() => handleRowSelect(row.id)}
                                  className="cursor-pointer scale-110"
                                  disabled={isDisabled}
                                  title={
                                    isApproved
                                      ? "Already approved"
                                      : hasWACode
                                      ? "Has WA Code - cannot approve"
                                      : ""
                                  }
                                />
                              ) : (
                                <span title={row[col] || ""}>
                                  {row[col] || ""}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center p-8 text-gray-500 italic"
                      >
                        No work order available
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
};

export default WorkAssignment;

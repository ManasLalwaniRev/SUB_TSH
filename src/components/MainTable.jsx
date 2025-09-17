// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./datepicker.css";
// import TimesheetLine from "./TimesheetLine.jsx";

// const showToast = (message, type = 'info') => {
//     const bgColor = type === 'success' ? '#4ade80'
//         : type === 'error' ? '#ef4444'
//             : type === 'warning' ? '#f59e0b' : '#3b82f6';
//     const toast = document.createElement('div');
//     toast.textContent = message;
//     toast.style.cssText = `
//     position: fixed; top: 20px; right: 20px; z-index: 9999;
//     background: ${bgColor}; color: white; padding: 12px 16px;
//     border-radius: 6px; font-size: 14px; max-width: 300px;
//     box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
//   `;
//     document.body.appendChild(toast);
//     const displayTime = message.includes('import') ? 4000 : 2000;
//     setTimeout(() => {
//         toast.style.opacity = '0';
//         setTimeout(() => document.body.removeChild(toast), 300);
//     }, displayTime);
// };

// const columnsAdmin = [
//     "Notify", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//     "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No"
// ];

// const columnsViewer = [
//     "Select", "Status", "Date", "Employee ID", "Timesheet Type Code", "Name", "Fiscal Year", "Period",
//     "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours", "Seq No", "Comment"
// ];

// export default function MainTable() {
//     const navigate = useNavigate();
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [userLoaded, setUserLoaded] = useState(false);
//     const [searchDate, setSearchDate] = useState(null);
//     const [searchEmployeeId, setSearchEmployeeId] = useState('');
//     const [searchEmployeeName, setSearchEmployeeName] = useState('');
//     const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//     const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//     const [selectedNotifyRows, setSelectedNotifyRows] = useState(new Set());

//     const isAdmin = currentUser?.role === "Admin";
//     const columns = isAdmin ? columnsAdmin : columnsViewer;

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         const date = new Date(dateString);
//         return isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-US').format(date);
//     };

//     const formatHours = (hours) => {
//         const num = parseFloat(hours);
//         return isNaN(num) ? '0.00' : num.toFixed(2);
//     };

//     const getStatusStyle = (status) => {
//         const baseStyle = "px-2.5 py-1 text-xs font-semibold rounded-full text-center inline-block";
//         const s = status?.toUpperCase();
//         if (s === 'OPEN') return `${baseStyle} bg-blue-100 text-blue-800`;
//         if (s === 'APPROVED') return `${baseStyle} bg-green-100 text-green-800`;
//         if (s === 'REJECTED') return `${baseStyle} bg-red-100 text-red-800`;
//         if (s === 'PENDING') return `${baseStyle} bg-yellow-100 text-yellow-800`;
//         return `${baseStyle} bg-gray-100 text-gray-800`;
//     };

//     useEffect(() => {
//         const userInfo = localStorage.getItem('currentUser');
//         if (userInfo) {
//             try {
//                 setCurrentUser(JSON.parse(userInfo));
//             } catch {
//                 navigate("/");
//             }
//         } else {
//             navigate("/");
//         }
//         setUserLoaded(true);
//     }, [navigate]);

//     useEffect(() => {
//         if (userLoaded && currentUser) {
//             fetchData();
//         }
//     }, [userLoaded, currentUser]);

//     const fetchData = async () => {
//         if (!currentUser) return;
//         setLoading(true);
//         const apiUrl = isAdmin 
//             ? "https://timesheet-latest.onrender.com/api/Timesheet/pending-approvals"
//             : `https://timesheet-latest.onrender.com/api/Timesheet/pending-approvalsByUser?userName=${encodeURIComponent(currentUser.username)}&status=ALL`;
        
//         try {
//             const response = await fetch(apiUrl);
//             if (!response.ok) throw new Error('Network response failed');
//             const apiData = await response.json();

//             const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
//                 id: item.timesheetId || `item-${index}`,
//                 "Date": formatDate(item.timesheetDate),
//                 "Employee ID": item.employee?.employeeId || item.employeeId,
//                 "Timesheet Type Code": item.timesheetTypeCode,
//                 "Name": item.displayedName || item.employeeName,
//                 "Fiscal Year": item.fiscalYear,
//                 "Period": item.period,
//                 "Project ID": item.projectId,
//                 "PLC": item.projectLaborCategory,
//                 "Pay Type": item.payType,
//                 "RLSE Number": item.rlseNumber,
//                 "PO Number": item.poNumber,
//                 "PO Line Number": item.poLineNumber,
//                 "Hours": formatHours(item.hours),
//                 "Seq No": item.sequenceNumber,
//                 "Status": isAdmin ? (item.status || "OPEN") : (item.approvalStatus || "PENDING"),
//                 "Comment": item.comment,
//                 isActionable: (item.approvalStatus || "PENDING") === "PENDING",
//             })) : [];

//             setRows(mappedData);
//         } catch (error) {
//             console.error("Failed to fetch data:", error);
//             showToast('Failed to load timesheet data.', "error");
//             setRows([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSort = (key) => {
//         if (key === 'Notify') return;
//         let direction = 'asc';
//         if (sortConfig.key === key && sortConfig.direction === 'asc') {
//             direction = 'desc';
//         }
//         setSortConfig({ key, direction });
//     };

//     const handleNotifyRowSelect = (rowId) => {
//         const newSelection = new Set(selectedNotifyRows);
//         if (newSelection.has(rowId)) {
//             newSelection.delete(rowId);
//         } else {
//             newSelection.add(rowId);
//         }
//         setSelectedNotifyRows(newSelection);
//     };

//     const handleNotifySelectAll = (e) => {
//         const isChecked = e.target.checked;
//         if (isChecked) {
//             const openRowIds = rows.filter(row => row.Status === 'OPEN').map(row => row.id);
//             setSelectedNotifyRows(new Set(openRowIds));
//         } else {
//             setSelectedNotifyRows(new Set());
//         }
//     };

//     const openRows = rows.filter(row => row.Status === 'OPEN');
//     const isAllOpenSelected = openRows.length > 0 && selectedNotifyRows.size === openRows.length;
    
//     const sortedAndFilteredRows = [...rows]
//         .filter(row => {
//             const dateMatch = !searchDate || row.Date === formatDate(searchDate);
//             const idMatch = !searchEmployeeId || (row['Employee ID']?.toLowerCase().includes(searchEmployeeId.toLowerCase()));
//             const nameMatch = !searchEmployeeName || (row.Name?.toLowerCase().includes(searchEmployeeName.toLowerCase()));
//             return dateMatch && idMatch && nameMatch;
//         })
//         .sort((a, b) => {
//             if (!sortConfig.key) return 0;
//             const aVal = a[sortConfig.key];
//             const bVal = b[sortConfig.key];
//             if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
//             if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
//             return 0;
//         });

//     const handleLogout = () => {
//         localStorage.removeItem('currentUser');
//         navigate("/");
//     };

//     return (
//         <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
//             {isCreateModalOpen && <TimesheetLine onClose={() => setIsCreateModalOpen(false)} />}
//             <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
//                 <div className="w-full flex flex-col items-center">
//                     <div className="w-full flex justify-between items-center mb-4 px-6">
//                         <h1 className="text-lg font-semibold text-gray-700">Welcome, {currentUser?.name}</h1>
//                         <button onClick={handleLogout} className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700">Logout</button>
//                     </div>
//                     <div className="flex gap-3 mb-3 items-center flex-wrap px-6 w-full">
//                         <DatePicker
//                             selected={searchDate}
//                             onChange={(date) => setSearchDate(date)}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             isClearable
//                         />
//                         <input type="text" value={searchEmployeeId} onChange={e => setSearchEmployeeId(e.target.value)} placeholder="Employee ID" className="border border-gray-300 rounded px-3 py-1.5 text-xs"/>
//                         <input type="text" value={searchEmployeeName} onChange={e => setSearchEmployeeName(e.target.value)} placeholder="Employee Name" className="border border-gray-300 rounded px-3 py-1.5 text-xs"/>
//                     </div>
//                     <div className="border border-gray-300 rounded bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
//                         <div className="flex justify-end items-center mb-2">
//                             {isAdmin && (
//                                 <div className="flex gap-2">
//                                     <button className="bg-orange-600 text-white px-4 py-1.5 rounded text-xs">Notify ({selectedNotifyRows.size})</button>
//                                     <button onClick={() => setIsCreateModalOpen(true)} className="bg-green-600 text-white px-4 py-1.5 rounded text-xs">Create</button>
//                                     <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs">Import</button>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="overflow-auto max-h-[75vh]">
//                             <table className="w-full text-xs border-collapse">
//                                 <thead className="bg-slate-200 sticky top-0 z-10">
//                                     <tr>
//                                         {columns.map(col => (
//                                             <th key={col} className="p-3 border-b-2 border-slate-300 text-center font-bold text-slate-700 uppercase tracking-wider cursor-pointer" onClick={() => handleSort(col)}>
//                                                 <div className="flex items-center justify-center">
//                                                     {col === 'Notify' && isAdmin ? (
//                                                         <input type="checkbox" checked={isAllOpenSelected} onChange={handleNotifySelectAll} />
//                                                     ) : (
//                                                         <span>{col}</span>
//                                                     )}
//                                                     {col !== 'Notify' && (
//                                                         <span className="ml-2 text-gray-500">
//                                                             {sortConfig.key === col ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '↕'}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {loading ? (
//                                         <tr><td colSpan={columns.length} className="text-center p-4">Loading...</td></tr>
//                                     ) : sortedAndFilteredRows.length > 0 ? (
//                                         sortedAndFilteredRows.map((row) => (
//                                             <tr key={row.id} className="hover:bg-gray-50">
//                                                 {columns.map(col => (
//                                                     <td key={col} className="p-2 border border-slate-200 whitespace-nowrap text-center">
//                                                         {col === 'Notify' && isAdmin ? (
//                                                             <input type="checkbox" checked={selectedNotifyRows.has(row.id)} onChange={() => handleNotifyRowSelect(row.id)} disabled={row.Status !== 'OPEN'}/>
//                                                         ) : col === "Status" ? (
//                                                             <span className={getStatusStyle(row[col])}>{row[col]}</span>
//                                                         ) : (
//                                                             row[col]
//                                                         )}
//                                                     </td>
//                                                 ))}
//                                             </tr>
//                                         ))
//                                     ) : (
//                                         <tr><td colSpan={columns.length} className="text-center p-4">No data available</td></tr>
//                                     )}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import TimesheetLine from "./TimesheetLine.jsx";
import TimesheetDetailModal from "./TimesheetDetailModal.jsx";

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
    const displayTime = message.includes('import') ? 4000 : 2000;
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, displayTime);
};

const formatDate = (dateInput) => {
    if (!dateInput) return '';
    let date;
    if (dateInput instanceof Date) {
        date = dateInput;
    } else {
        const dateOnlyString = String(dateInput).split('T')[0];
        const parts = dateOnlyString.split('-');
        if (parts.length !== 3) return dateInput;
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        date = new Date(Date.UTC(year, month, day));
    }
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
};

export default function MainTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    const [searchDate, setSearchDate] = useState(null);
    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timesheetToEdit, setTimesheetToEdit] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);
    const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [isNotifying, setIsNotifying] = useState(false);

    const userRole = currentUser?.role?.toLowerCase();
    const isUser = userRole === 'user';
    const canNotify = userRole && !["admin", "pm"].includes(userRole);

    const baseColumns = [
        "Status", "Date", "Employee ID", "Name",
        "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours"
    ];

    const columns = isUser ? ["All", ...baseColumns] : baseColumns;
    
    const formatHours = (hours) => {
        const num = parseFloat(hours);
        return isNaN(num) ? '0.00' : num.toFixed(2);
    };

    const getStatusStyle = (status) => {
        const baseStyle = "px-2.5 py-1 text-xs font-semibold rounded-full text-center inline-block";
        const s = status?.toUpperCase();
        if (s === 'OPEN') return `${baseStyle} bg-blue-100 text-blue-800`;
        if (s === 'APPROVED') return `${baseStyle} bg-green-100 text-green-800`;
        if (s === 'REJECTED') return `${baseStyle} bg-red-100 text-red-800`;
        if (s === 'PENDING') return `${baseStyle} bg-yellow-100 text-yellow-800`;
        if (s === 'SUBMITTED') return `${baseStyle} bg-purple-100 text-purple-800`;
        return `${baseStyle} bg-gray-100 text-gray-800`;
    };

    useEffect(() => {
    if (rows.length > 0) {
        const ids = rows.map(row => row.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            console.warn("DUPLICATE ID PROBLEM DETECTED!");
            const idCounts = ids.reduce((acc, id) => {
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});
            const duplicates = Object.keys(idCounts).filter(id => idCounts[id] > 1);
            console.error("The following IDs are duplicated in your data:", duplicates);
        }
    }
}, [rows]);

    useEffect(() => {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            try { setCurrentUser(JSON.parse(userInfo)); } catch { navigate("/"); }
        } else { navigate("/"); }
        setUserLoaded(true);
    }, [navigate]);

    useEffect(() => {
        if (userLoaded && currentUser) {
            fetchData();
        }
    }, [userLoaded, currentUser]);
    
    const fetchData = async () => {
        if (!currentUser) return;
        setLoading(true);

        try {
            // Step 1: Fetch the main timesheet data
            let apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";
            if (currentUser.role && currentUser.role.toLowerCase() !== 'admin') {
                apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/ByResource/${currentUser.username}`;
            }
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response failed while fetching timesheets.');
            
            const apiData = await response.json();
            if (!Array.isArray(apiData) || apiData.length === 0) {
                setRows([]);
                return;
            }

            // Step 2: Fetch all employee names based on the results
            const uniqueResourceIds = [...new Set(apiData.map(item => item.resource_Id).filter(id => id))];
            const nameMap = new Map();

            if (uniqueResourceIds.length > 0) {
                const namePromises = uniqueResourceIds.map(id =>
                    fetch(`https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${id}`)
                        .then(res => res.ok ? res.json() : Promise.resolve(null))
                        .catch(() => null)
                );
                const results = await Promise.all(namePromises);
                results.forEach((poData, index) => {
                    if (poData && poData.length > 0 && poData[0].resourceName) {
                        const resourceId = uniqueResourceIds[index];
                        nameMap.set(resourceId, poData[0].resourceName);
                    }
                });
            }

            // Step 3: Map the final data with names included
            const mappedData = apiData.map((item, index) => ({
                ...item,
                // This robust ID ensures we never have 'undefined'
                id: String(item.timesheetId || item.lineNo || `temp-id-${index}`),
                "Date": formatDate(item.timesheet_Date),
                "Employee ID": item.resource_Id || "",
                "Name": nameMap.get(item.resource_Id) || item.displayedName || `Employee ${item.resource_Id}`,
                "Project ID": item.projId || "",
                "PLC": item.plc || "",
                "Pay Type": item.payType || "",
                "RLSE Number": item.rlseNumber || "",
                "Hours": formatHours(item.hours),
                "PO Number": item.poNumber || "",
                "PO Line Number": item.poLineNumber || "",
                "Status": item.status || "OPEN",
            }));
            setRows(mappedData);

        } catch (error) {
            console.error("Failed to fetch data:", error);
            showToast('Failed to load timesheet data.', "error");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleNotify = async () => {
        if (selectedRows.size === 0) {
            showToast('Please select at least one timesheet to notify.', 'warning');
            return;
        }
        if (!window.confirm(`Are you sure you want to notify ${selectedRows.size} timesheet(s)? This will submit them for approval.`)) {
            return;
        }
        setIsNotifying(true);
        try {
            const timesheetIdsToUpdate = [...selectedRows];
            const selectedRowObjects = rows.filter(row => timesheetIdsToUpdate.includes(row.id));
            const requesterId = currentUser.approvalUserId;
            if (!requesterId) {
                throw new Error('Your user profile is missing an Approval User ID.');
            }
            const payload = selectedRowObjects.map(row => ({
                requestType: "TIMESHEET",
                requesterId: requesterId,
                timesheetId: parseInt(row.id, 10),
                requestData: `Approval requested for week ending ${row.Date}.`,
                projectId: row["Project ID"]
            }));
            const notifyUrl = 'https://timesheet-subk.onrender.com/api/Approval/BulkNotify';
            const notifyResponse = await fetch(notifyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!notifyResponse.ok) {
                const errorData = await notifyResponse.text();
                throw new Error(errorData || 'Failed to submit timesheets for notification.');
            }
            setRows(currentRows =>
                currentRows.map(row =>
                    timesheetIdsToUpdate.includes(row.id) ? { ...row, Status: 'SUBMITTED' } : row
                )
            );
            setSelectedRows(new Set());
            showToast(`Successfully notified ${payload.length} timesheet(s).`, 'success');
        } catch (error) {
            console.error("Failed to notify timesheets:", error);
            showToast(error.message, 'error');
        } finally {
            setIsNotifying(false);
        }
    };

    const handleSort = (key) => {
        if (['All'].includes(key)) return;
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (['All'].includes(key) || sortConfig.key !== key) return ' ⇅';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };
    
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const openRowIds = rows.filter(row => row.Status === 'OPEN').map(row => row.id);
            setSelectedRows(new Set(openRowIds));
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleRowClick = (rowData) => {
        setSelectedRows(new Set([rowData.id]));
        setSelectedTimesheetData(rowData);
        setCurrentSelectedRowId(rowData.id);
    };

    const handleRowSelect = (rowId) => {
        const newSelection = new Set(selectedRows);
        newSelection.has(rowId) ? newSelection.delete(rowId) : newSelection.add(rowId);
        setSelectedRows(newSelection);
    };

    const sortedAndFilteredRows = [...rows]
        .filter(row => {
            const dateMatch = !searchDate || row.Date === formatDate(searchDate);
            const idMatch = !searchEmployeeId || row['Employee ID']?.toLowerCase().includes(searchEmployeeId.toLowerCase());
            const nameMatch = !searchEmployeeName || row.Name?.toLowerCase().includes(searchEmployeeName.toLowerCase());
            return dateMatch && idMatch && nameMatch;
        })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

    const handleCloseDetail = () => {
        setSelectedTimesheetData(null);
        setCurrentSelectedRowId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate("/");
    };

    const handleCreateClick = () => {
        setTimesheetToEdit(null);
        setIsModalOpen(true);
    };

    const handleHeaderEditClick = () => {
        const selectedRowId = [...selectedRows][0];
        const selectedRowObject = rows.find(row => row.id === selectedRowId);
        if (selectedRowObject) {
            setTimesheetToEdit(selectedRowObject);
            setIsModalOpen(true);
        }
    };

    const renderTableCell = (row, col) => {
    if (col === 'All') {
        // Just return the input element, not the whole <td>
        return (
            isUser && <input
                type="checkbox"
                checked={selectedRows.has(row.id)}
                onChange={() => handleRowSelect(row.id)}
                className="cursor-pointer"
                disabled={row.Status?.toUpperCase() !== 'OPEN'}
            />
        );
    }
    if (col === 'Status') {
        return <span className={getStatusStyle(row[col])}>{row[col]}</span>;
    }
    return row[col];
};

    let isEditButtonDisabled = true;
    if (selectedRows.size === 1) {
        const selectedRowId = [...selectedRows][0];
        const selectedRow = rows.find(row => row.id === selectedRowId);
        if (selectedRow?.Status?.toUpperCase() === 'OPEN') {
            isEditButtonDisabled = false;
        }
    }

    const openRows = rows.filter(row => row.Status === 'OPEN');
    const isAllOpenSelected = openRows.length > 0 && openRows.every(row => selectedRows.has(row.id));
    const existingDatesForUser = new Set(rows.map(row => row.Date));

    return (
        <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto ml-5">
            {isModalOpen &&
                <TimesheetLine
                    onClose={() => {
                        setIsModalOpen(false);
                        setTimesheetToEdit(null);
                        fetchData();
                    }}
                    resourceId={currentUser?.username}
                    existingTimesheetDates={[...existingDatesForUser]}
                    timesheetToEdit={timesheetToEdit}
                />
            }
            <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4 px-6">
                        <h1 className="text-lg font-semibold text-gray-700">Welcome, {currentUser?.name}</h1>
                        <button onClick={handleLogout} className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700">Logout</button>
                    </div>
                    <div className="flex gap-3 mb-3 items-center flex-wrap px-6 w-full">
                        <DatePicker selected={searchDate} onChange={setSearchDate} dateFormat="MM/dd/yyyy" placeholderText="MM/DD/YYYY" className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500" isClearable />
                        <input type="text" value={searchEmployeeId} onChange={e => setSearchEmployeeId(e.target.value)} placeholder="Employee ID" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                        <input type="text" value={searchEmployeeName} onChange={e => setSearchEmployeeName(e.target.value)} placeholder="Employee Name" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                    </div>
                    <div className="border border-gray-300 rounded bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
                        <div className="flex justify-end items-center mb-2">
                            {canNotify && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleNotify}
                                        className="bg-orange-600 text-white px-4 py-1.5 rounded text-xs disabled:bg-gray-400"
                                        disabled={selectedRows.size === 0 || isNotifying}
                                    >
                                        {isNotifying ? 'Notifying...' : `Submit (${selectedRows.size})`}
                                    </button>
                                    <button
                                        onClick={handleHeaderEditClick}
                                        className={`bg-yellow-500 text-white px-4 py-1.5 rounded text-xs ${isEditButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-600'}`}
                                        disabled={isEditButtonDisabled}
                                    >
                                        Edit
                                    </button>
                                    <button onClick={handleCreateClick} className="bg-green-600 text-white px-4 py-1.5 rounded text-xs">Create</button>
                                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs">Import</button>
                                </div>
                            )}
                        </div>
                        <div className="overflow-auto max-h-[75vh]">
                            <table className="w-full text-xs border-collapse">
                                <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        {columns.map(col => (
                                            <th key={col} className="border p-2 font-bold text-blue-800 text-center whitespace-nowrap bg-gray-200 cursor-pointer select-none" onClick={() => handleSort(col)}>
                                                {col === 'All' && isUser ? (
                                                    <div className="flex items-center justify-center gap-1">
                                                        <input type="checkbox" checked={isAllOpenSelected} onChange={handleSelectAll} />
                                                        <span className="text-xs font-normal">All</span>
                                                    </div>
                                                ) : (
                                                    <span>{col}{getSortIcon(col)}</span>
                                                )}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={columns.length} className="text-center p-5 italic text-gray-500">Loading...</td></tr>
                                    ) : sortedAndFilteredRows.length > 0 ? (
                                        sortedAndFilteredRows.map(row => {
                                            const isSelected = selectedRows.has(row.id);
                                            const isCurrent = currentSelectedRowId === row.id;
                                            const isHovered = hoveredRowId === row.id;
                                            let bgColorClass = 'bg-white';
                                            if (isCurrent) bgColorClass = 'bg-sky-100';
                                            else if (isSelected) bgColorClass = 'bg-blue-100';
                                            else if (isHovered) bgColorClass = 'bg-gray-50';
                                            return (
                                                <tr key={row.id} className={`${bgColorClass} cursor-pointer`}
                                                    onClick={() => handleRowClick(row)}
                                                    onMouseEnter={() => setHoveredRowId(row.id)}
                                                    onMouseLeave={() => setHoveredRowId(null)}
                                                >
                                                    {columns.map(col => (
    <td 
        key={`${row.id}-${col}`} // <-- Creates a truly unique key for every cell
        className="border p-2 text-center whitespace-nowrap"
        // Stop row click from firing when interacting with the checkbox
        onClick={col === 'All' ? (e) => e.stopPropagation() : undefined}
    >
        {renderTableCell(row, col)}
    </td>
))}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr><td colSpan={columns.length} className="text-center p-5 italic text-gray-500">No data available</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {selectedTimesheetData && (
                    <div className="w-full mt-6" data-timesheet-detail>
                        <TimesheetDetailModal timesheetData={selectedTimesheetData} onClose={handleCloseDetail} />
                    </div>
                )}
            </div>
        </div>
    );
}



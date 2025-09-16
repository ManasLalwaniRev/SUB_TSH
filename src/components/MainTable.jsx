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

const columnsAdmin = [
    "All", "Status", "Date", "Employee ID", "Name",
    "Project ID", "PLC", "Pay Type", "RLSE Number", "PO Number", "PO Line Number", "Hours"
];

export default function MainTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    const [searchDate, setSearchDate] = useState(null);
    const [searchEmployeeId, setSearchEmployeeId] = useState('');
    const [searchEmployeeName, setSearchEmployeeName] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectedTimesheetData, setSelectedTimesheetData] = useState(null);
    const [currentSelectedRowId, setCurrentSelectedRowId] = useState(null);

    const isAdmin = currentUser?.role === "admin";
    const canNotify = currentUser?.role && !["admin", "pm"].includes(currentUser.role.toLowerCase());
    const columns = columnsAdmin;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('en-US').format(date);
    };

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
        if (s === 'NOTIFIED') return `${baseStyle} bg-purple-100 text-purple-800`;
        return `${baseStyle} bg-gray-100 text-gray-800`;
    };

    useEffect(() => {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            try {
                setCurrentUser(JSON.parse(userInfo));
            } catch {
                navigate("/");
            }
        } else {
            navigate("/");
        }
        setUserLoaded(true);
    }, [navigate]);

    useEffect(() => {
        if (userLoaded && currentUser) {
            fetchData();
        }
    }, [userLoaded, currentUser]);

    const fetchAndMapResourceNames = async (initialRows) => {
        const uniqueResourceIds = [...new Set(
            initialRows.map(row => row["Employee ID"]).filter(id => id)
        )];

        if (uniqueResourceIds.length === 0) return;

        const namePromises = uniqueResourceIds.map(id =>
            fetch(`https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${id}`)
                .then(res => res.ok ? res.json() : null)
                .catch(err => {
                    console.error(`Failed to fetch details for resource ${id}`, err);
                    return null;
                })
        );
        
        const results = await Promise.all(namePromises);
        
        const nameMap = {};
        results.forEach((poData, index) => {
            const resourceId = uniqueResourceIds[index];
            if (poData && poData.length > 0 && poData[0].resourceName) {
                nameMap[resourceId] = poData[0].resourceName;
            }
        });
        
        setRows(currentRows =>
            currentRows.map(row => ({
                ...row,
                "Name": nameMap[row["Employee ID"]] || `Employee ${row["Employee ID"]}`,
            }))
        );
    };

    const fetchData = async () => {
        if (!currentUser) return;
        setLoading(true);
        let apiUrl = "https://timesheet-subk.onrender.com/api/SubkTimesheet";
        if (currentUser.role && currentUser.role.toLowerCase() !== 'admin') {
            apiUrl = `https://timesheet-subk.onrender.com/api/SubkTimesheet/ByResource/${currentUser.username}`;
        }
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response failed');
            const apiData = await response.json();

            const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
                timesheetId: item.lineNo,
                id: item.timesheetId || item.lineNo || `item-${index}`,
                "Date": formatDate(item.createdAt),
                "Employee ID": item.resource_Id || "",
                "Name": item.displayedName || `Loading...`,
                "Project ID": item.projId || "",
                "PLC": item.plc || "",
                "Pay Type": item.payType || "",
                "RLSE Number": item.rlseNumber || "",
                "Hours": formatHours(item.hours),
                "PO Number": item.poNumber || "",
                "PO Line Number": item.poLineNumber || "",
                "Status": item.status || "OPEN",
                "Info": "View Details",
                ...item
            })) : [];

            setRows(mappedData);

            if (mappedData.length > 0) {
                fetchAndMapResourceNames(mappedData);
            }

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
            showToast("No timesheets selected for notification.", "warning");
            return;
        }
        const selectedTimesheets = rows.filter(row => selectedRows.has(row.id));
        const validTimesheets = selectedTimesheets.filter(
            row => row.timesheetId != null && row.projId != null
        );
        if (validTimesheets.length !== selectedTimesheets.length) {
            showToast("Some selected items had missing data and were not notified.", "warning");
        }
        if (validTimesheets.length === 0) {
            showToast("No valid timesheets to notify.", "error");
            return;
        }
        const requestBody = validTimesheets.map(row => ({
            requestType: "TIMESHEET",
            requesterId: 3,
            timesheetId: row.timesheetId,
            requestData: `Notification for ${row.Hours} hours on ${row.Date}.`,
            projectId: row.projId
        }));
        try {
            const response = await fetch("https://timesheet-subk.onrender.com/api/Approval/BulkNotify", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server responded with ${response.status}: ${errorText || "Internal Server Error"}`);
            }
            showToast(`${validTimesheets.length} timesheet(s) notified successfully!`, "success");
            setRows(currentRows =>
                currentRows.map(row =>
                    selectedRows.has(row.id) ? { ...row, Status: 'NOTIFIED' } : row
                )
            );
            setSelectedRows(new Set());
        } catch (error) {
            console.error("Failed to notify timesheets:", error);
            showToast(`Error: ${error.message}`, "error");
        }
    };

    const handleSort = (key) => {
        if (key === 'All') return;
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (columnKey === 'All') return null;
        if (sortConfig.key === columnKey) {
            return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
        }
        return ' ⇅';
    };

    const scrollToTimesheetDetail = () => {
        setTimeout(() => {
            const timesheetDetailElement = document.querySelector('[data-timesheet-detail]');
            if (timesheetDetailElement) {
                timesheetDetailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    };

    const handleRowSelect = (rowId, event) => {
        event.stopPropagation();
        const newSelection = new Set(selectedRows);
        if (newSelection.has(rowId)) {
            newSelection.delete(rowId);
        } else {
            newSelection.add(rowId);
        }
        setSelectedRows(newSelection);
    };

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const openRowIds = rows.filter(row => row.Status === 'OPEN').map(row => row.id);
            setSelectedRows(new Set(openRowIds));
        } else {
            setSelectedRows(new Set());
        }
    };

    const openRows = rows.filter(row => row.Status === 'OPEN');
    const isAllOpenSelected = openRows.length > 0 && selectedRows.size === openRows.length;

    const sortedAndFilteredRows = [...rows]
        .filter(row => {
            const dateMatch = !searchDate || row.Date === formatDate(searchDate);
            const idMatch = !searchEmployeeId || (row['Employee ID']?.toLowerCase().includes(searchEmployeeId.toLowerCase()));
            const nameMatch = !searchEmployeeName || (row.Name?.toLowerCase().includes(searchEmployeeName.toLowerCase()));
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

    const handleRowClick = (rowData) => {
        setSelectedTimesheetData(rowData);
        setCurrentSelectedRowId(rowData.id);
        scrollToTimesheetDetail();
    };

    const handleCloseDetail = () => {
        setSelectedTimesheetData(null);
        setCurrentSelectedRowId(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate("/");
    };

    const renderTableCell = (row, col) => {
        if (col === 'All') {
            if (isAdmin || canNotify) {
                return (
                    <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={(e) => handleRowSelect(row.id, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-pointer"
                        disabled={row.Status !== 'OPEN'}
                    />
                );
            }
            return null;
        }
        if (col === 'Status') {
            return <span className={getStatusStyle(row[col])}>{row[col]}</span>;
        }
        return row[col];
    };

    return (
        <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
            {isCreateModalOpen &&
                <TimesheetLine
                    onClose={() => {
                        setIsCreateModalOpen(false);
                        fetchData(); // Refresh data after closing the create modal
                    }}
                    resourceId={currentUser?.username}
                />
            }

            <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4 px-6">
                        <h1 className="text-lg font-semibold text-gray-700">Welcome, {currentUser?.name}</h1>
                        <button onClick={handleLogout} className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700">Logout</button>
                    </div>
                    <div className="flex gap-3 mb-3 items-center flex-wrap px-6 w-full">
                        <DatePicker
                            selected={searchDate}
                            onChange={(date) => setSearchDate(date)}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY"
                            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            isClearable
                        />
                        <input type="text" value={searchEmployeeId} onChange={e => setSearchEmployeeId(e.target.value)} placeholder="Employee ID" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                        <input type="text" value={searchEmployeeName} onChange={e => setSearchEmployeeName(e.target.value)} placeholder="Employee Name" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                    </div>
                    <div className="border border-gray-300 rounded bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
                        <div className="flex justify-end items-center mb-2">
                            {canNotify && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleNotify}
                                        className="bg-orange-600 text-white px-4 py-1.5 rounded text-xs disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        disabled={selectedRows.size === 0}
                                    >
                                        Notify ({selectedRows.size})
                                    </button>
                                    <button onClick={() => setIsCreateModalOpen(true)} className="bg-green-600 text-white px-4 py-1.5 rounded text-xs">Create</button>
                                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs">Import</button>
                                </div>
                            )}
                        </div>
                        <div className="overflow-auto max-h-[75vh]">
                            <table className="w-full text-xs border-collapse">
                                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 10, borderBottom: '2px solid #e2e8f0' }}>
                                    <tr>
                                        {columns.map(col => (
                                            <th
                                                key={col}
                                                style={{
                                                    border: "1px solid #d1d5db", padding: "8px", fontSize: "12px",
                                                    minWidth: col === "All" ? "80px" : col === "Status" ? "150px" : `120px`,
                                                    fontWeight: "bold", color: "#1e40af", textAlign: "center",
                                                    whiteSpace: "nowrap", backgroundColor: "#f1f5f9",
                                                    cursor: col !== "All" ? "pointer" : "default", userSelect: "none"
                                                }}
                                                onClick={() => col !== "All" && handleSort(col)}
                                            >
                                                {col === 'All' && (isAdmin || canNotify) ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                                                        <input type="checkbox"
                                                            checked={isAllOpenSelected}
                                                            onChange={handleSelectAll}
                                                            className="cursor-pointer"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <span style={{ fontSize: '11px', fontWeight: 'normal' }}>All</span>
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
                                        <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px', fontStyle: 'italic', color: '#666' }}>Loading...</td></tr>
                                    ) : sortedAndFilteredRows.length > 0 ? (
                                        sortedAndFilteredRows.map((row, rdx) => (
                                            <tr key={row.id}
                                                style={{
                                                    backgroundColor: currentSelectedRowId === row.id ? '#e0f2fe' :
                                                        selectedRows.has(row.id) ? '#dbeafe' :
                                                            rdx % 2 === 0 ? '#f9fafb' : 'white',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleRowClick(row)}
                                                onMouseEnter={(e) => {
                                                    if (!selectedRows.has(row.id) && currentSelectedRowId !== row.id) {
                                                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (!selectedRows.has(row.id) && currentSelectedRowId !== row.id) {
                                                        e.currentTarget.style.backgroundColor = rdx % 2 === 0 ? '#f9fafb' : 'white';
                                                    }
                                                }}
                                            >
                                                {columns.map(col => (
                                                    <td key={col}
                                                        style={{
                                                            border: "1px solid #e5e7eb", padding: "8px", fontSize: "11px",
                                                            minWidth: col === "All" ? "80px" : col === "Status" ? "150px" : `120px`,
                                                            whiteSpace: "nowrap", textAlign: "center"
                                                        }} >
                                                        {renderTableCell(row, col)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px', fontStyle: 'italic', color: '#666' }}>No data available</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {selectedTimesheetData && (
                    <div className="w-full mt-6" style={{ marginLeft: 24, marginRight: 24, width: "calc(100vw - 220px)" }} data-timesheet-detail>
                        <TimesheetDetailModal
                            timesheetData={selectedTimesheetData}
                            onClose={handleCloseDetail}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
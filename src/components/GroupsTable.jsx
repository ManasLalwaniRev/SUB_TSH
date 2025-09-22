import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css"; // Assuming you have this css file for styling

// A simple toast notification function
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
    const displayTime = 2000;
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, displayTime);
};

// The updated column definitions for the Groups table
const groupColumns = [
    "Purchase Order",
    "Purchase Order Release Number",
    "PO Line Number",
    "Start date",
    "End date",
    "Resource ID",
    "Resource Name",
    "PLC CD",
    "PLC Desc",
    "Email ID",
    "Project",
    "PM USER_ID",
    "PM NAME",
    "Vendor ID",   // <<< ADDED
    "Vendor Name"  // <<< ADDED
];

// Helper function to format dates
const formatDate = (dateInput) => {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return dateInput; // Return original if invalid
    // Using UTC to avoid timezone issues
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
};


export default function GroupsTable() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    
    // State for sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // State for filters
    const [searchPO, setSearchPO] = useState('');
    const [searchResourceId, setSearchResourceId] = useState('');
    const [searchResourceName, setSearchResourceName] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            try { setCurrentUser(JSON.parse(userInfo)); } catch { navigate("/"); }
        } else { navigate("/"); }
        setUserLoaded(true);
    }, [navigate]);

    useEffect(() => {
        if (userLoaded) {
            fetchData();
        }
    }, [userLoaded]);

    const fetchData = async () => {
        setLoading(true);

        const apiUrl = "https://timesheet-subk.onrender.com/api/PurchaseOrders";

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Network response failed');
            
            const apiData = await response.json();
            
            const mappedData = Array.isArray(apiData) ? apiData.map((item, index) => ({
                id: item.purchaseOrderNumber + '-' + item.poLineNumber + '-' + item.resourceId || `group-row-${index}`,
                "Purchase Order": item.purchaseOrderNumber || "",
                "Purchase Order Release Number": item.purchaseOrderRelease || "",
                "PO Line Number": item.poLineNumber || "",
                "Start date": formatDate(item.poLnStartDate),
                "End date": formatDate(item.poLnEndDate),
                "Resource ID": item.resourceId || "",
                "Resource Name": item.resourceName || "",
                "PLC CD": item.plcCd || "",
                "PLC Desc": item.plcDesc || "",
                "EMail ID": item.emailId || "",
                "Project": item.project || "",
                "PM USER_ID": item.pmUserId || "",
                "PM NAME": item.pmName || "",
                "Vendor ID": item.vendorId || "",       // <<< ADDED
                "Vendor Name": item.vendorName || ""   // <<< ADDED
            })) : [];
            
            setRows(mappedData);
        } catch (error) {
            console.error("Failed to fetch group data:", error);
            showToast('Failed to load group data.', "error");
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return ' ⇅';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };
    
    // Apply filtering and sorting to the rows
    const processedRows = [...rows]
        .filter(row => {
            const poMatch = !searchPO || row['Purchase Order']?.toLowerCase().includes(searchPO.toLowerCase());
            const idMatch = !searchResourceId || row['Resource ID']?.toLowerCase().includes(searchResourceId.toLowerCase());
            const nameMatch = !searchResourceName || row['Resource Name']?.toLowerCase().includes(searchResourceName.toLowerCase());
            return poMatch && idMatch && nameMatch;
        })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4 overflow-auto">
            <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8">
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-4 px-6">
                        <h1 className="text-lg font-semibold text-gray-700">Groups / Purchase Orders</h1>
                        <button onClick={handleLogout} className="bg-gray-600 text-white px-3 py-1.5 rounded text-xs hover:bg-gray-700">Logout</button>
                    </div>

                    {/* Filter Section */}
                    <div className="flex gap-3 mb-3 items-center flex-wrap px-6 w-full">
                         <input type="text" value={searchPO} onChange={e => setSearchPO(e.target.value)} placeholder="Purchase Order" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                        <input type="text" value={searchResourceId} onChange={e => setSearchResourceId(e.target.value)} placeholder="Resource ID" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                        <input type="text" value={searchResourceName} onChange={e => setSearchResourceName(e.target.value)} placeholder="Resource Name" className="border border-gray-300 rounded px-3 py-1.5 text-xs" />
                    </div>

                    <div className="border border-gray-300 rounded bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
                        <div className="overflow-auto max-h-[75vh]">
                            <table className="w-full text-xs border-collapse">
                                <thead className="sticky top-0 bg-gray-100 z-10">
                                    <tr>
                                        {groupColumns.map(col => (
                                            <th key={col} className="border p-2 font-bold text-blue-800 text-center whitespace-nowrap bg-gray-200 cursor-pointer select-none" onClick={() => handleSort(col)}>
                                                <span>{col}{getSortIcon(col)}</span>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={groupColumns.length} className="text-center p-5 italic text-gray-500">Loading...</td></tr>
                                    ) : processedRows.length > 0 ? (
                                        processedRows.map(row => (
                                            <tr key={row.id} className="bg-white hover:bg-gray-50">
                                                {groupColumns.map(col => (
                                                    <td key={col} className="border p-2 text-center whitespace-nowrap">
                                                        {row[col]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan={groupColumns.length} className="text-center p-5 italic text-gray-500">No data available</td></tr>
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
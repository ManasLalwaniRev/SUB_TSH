
// import { useState, useEffect } from "react";
// import "./datepicker.css";

// const TimesheetDetailModal = ({ isOpen, timesheetData, onClose }) => {
//   const [apiData, setApiData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API when modal opens
//   useEffect(() => {
//     if (isOpen && timesheetData) {
//       fetchTimesheetData();
//     }
//   }, [isOpen, timesheetData]);

//   const fetchTimesheetData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await fetch('https://timesheet-subk-latest.onrender.com/api/SubkTimesheet');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log('API Response:', data); // Debug log
//       setApiData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error('API Error:', err); // Debug log
//       setError(err.message);
//       setApiData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen || !timesheetData) return null;

//   // Generate week days dynamically 
//   const generateWeekDays = () => {
//     const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//     const dates = ['08/11', '08/12', '08/13', '08/14', '08/15', '08/16', '08/17'];
//     return days.map((day, index) => ({
//       day: `${day} ${dates[index]}`,
//       shortDay: day
//     }));
//   };

//   const weekdays = generateWeekDays();

//   // Map API data to table rows - FIXED to show all records
//   const getTimesheetRows = () => {
//     if (loading) {
//       return [{
//         line: '',
//         description: 'Loading...',
//         project: '',
//         plc: '',
//         payType: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',
//         weekHours: ['', '', '', '', '', '', ''],
//         total: ''
//       }];
//     }

//     if (error) {
//       return [{
//         line: '',
//         description: `Error: ${error}`,
//         project: '',
//         plc: '',
//         payType: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',
//         weekHours: ['', '', '', '', '', '', ''],
//         total: ''
//       }];
//     }

//     // FIXED: Show all API data records instead of just empty rows
//     if (apiData.length > 0) {
//       return apiData.map((item, index) => ({
//         line: index + 1,
//         description: item.description || item.taskDescription || item.task || '',
//         project: item.project || item.projectCode || item.projectId || '',
//         plc: item.plc || item.laborCategory || item.category || '',
//         payType: item.payType || item.payCategory || item.type || '',
//         poNumber: item.poNumber || item.purchaseOrder || item.po || '',
//         rlseNumber: item.rlseNumber || item.releaseNumber || item.release || '',
//         poLineNumber: item.poLineNumber || item.lineNumber || item.line || '',
//         weekHours: [
//           item.monday || item.mon || item.day1 || '0',
//           item.tuesday || item.tue || item.day2 || '0',
//           item.wednesday || item.wed || item.day3 || '0',
//           item.thursday || item.thu || item.day4 || '0',
//           item.friday || item.fri || item.day5 || '0',
//           item.saturday || item.sat || item.day6 || '0',
//           item.sunday || item.sun || item.day7 || '0'
//         ],
//         total: item.total || calculateRowTotal(item) || '0.00'
//       }));
//     }

//     // Show empty rows when no data
//     return [
//       {
//         line: 1,
//         description: '',
//         project: '',
//         plc: '',
//         payType: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',
//         weekHours: ['', '', '', '', '', '', ''],
//         total: '0.00'
//       },
//       {
//         line: 2,
//         description: '',
//         project: '',
//         plc: '',
//         payType: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',
//         weekHours: ['', '', '', '', '', '', ''],
//         total: '0.00'
//       },
//       {
//         line: 3,
//         description: '',
//         project: '',
//         plc: '',
//         payType: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',
//         weekHours: ['', '', '', '', '', '', ''],
//         total: '0.00'
//       },
//       {
//         line: 4,
//         description: 'New Line Item',
//         project: 'N/A',
//         plc: 'N/A',
//         payType: 'N/A',
//         poNumber: 'N/A',
//         rlseNumber: 'N/A',
//         poLineNumber: 'N/A',
//         weekHours: ['0', '0', '0', '0', '0', '0', '0'],
//         total: '0.00'
//       }
//     ];
//   };

//   // Calculate total hours for a row
//   const calculateRowTotal = (item) => {
//     const hours = [
//       parseFloat(item.monday || item.mon || item.day1 || 0),
//       parseFloat(item.tuesday || item.tue || item.day2 || 0),
//       parseFloat(item.wednesday || item.wed || item.day3 || 0),
//       parseFloat(item.thursday || item.thu || item.day4 || 0),
//       parseFloat(item.friday || item.fri || item.day5 || 0),
//       parseFloat(item.saturday || item.sat || item.day6 || 0),
//       parseFloat(item.sunday || item.sun || item.day7 || 0)
//     ];
//     return hours.reduce((sum, hour) => sum + hour, 0).toFixed(2);
//   };

//   const timesheetRows = getTimesheetRows();

//   // Calculate summary totals
//   const calculateColumnTotals = () => {
//     const dailyTotals = [0, 0, 0, 0, 0, 0, 0];
//     let grandTotal = 0;

//     timesheetRows.forEach(row => {
//       if (row.weekHours && Array.isArray(row.weekHours)) {
//         row.weekHours.forEach((hours, dayIndex) => {
//           const hourValue = parseFloat(hours) || 0;
//           dailyTotals[dayIndex] += hourValue;
//           grandTotal += hourValue;
//         });
//       }
//     });

//     return {
//       daily: dailyTotals.map(total => total.toFixed(2)),
//       grand: grandTotal.toFixed(2),
//       regular: (grandTotal - 2).toFixed(2), // Subtract overtime
//       overtime: '2.00' // Fixed overtime as shown in your image
//     };
//   };

//   const totals = calculateColumnTotals();

//   const handleOverlayClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     // FIXED: Higher z-index to cover sidebar and full screen
//     <div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
//       style={{ zIndex: 9999 }} // Much higher z-index to cover sidebar
//       onClick={handleOverlayClick}
//     >
//       <div 
//         className="bg-white rounded-lg shadow-xl w-[95vw] h-[90vh] overflow-hidden flex flex-col"
//         style={{ maxWidth: '1400px' }} // Large enough for all columns
//         onClick={e => e.stopPropagation()}
//       >
//         {/* Header - STYLED like your first image */}
//         <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Timesheet Details - {timesheetData["Employee ID"]} (Employee {timesheetData["Employee ID"]})
//             </h3>
//             <p className="text-sm text-gray-700">
//               Period: {timesheetData["Period"]} | Fiscal Year: {timesheetData["Fiscal Year"]} | Status: {timesheetData["Status"]}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
//             title="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-auto p-4">
//           <div className="overflow-x-auto">
//             {/* STYLED exactly like your first image */}
//             <table className="w-full text-xs border-collapse" style={{ minWidth: '1200px' }}>
//               {/* Table Header */}
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-400 px-2 py-3 text-center w-12 font-medium text-gray-800">
//                     <input type="checkbox" className="cursor-pointer" />
//                   </th>
//                   <th className="border border-gray-400 px-2 py-3 text-center w-16 font-medium text-gray-800">Line</th>
//                   <th className="border border-gray-400 px-3 py-3 text-center w-32 font-medium text-gray-800">Description</th>
//                   <th className="border border-gray-400 px-3 py-3 text-center w-24 font-medium text-gray-800">Project</th>
//                   <th className="border border-gray-400 px-2 py-3 text-center w-16 font-medium text-gray-800">PLC</th>
//                   <th className="border border-gray-400 px-2 py-3 text-center w-20 font-medium text-gray-800">Pay Type</th>
//                   <th className="border border-gray-400 px-3 py-3 text-center w-28 font-medium text-gray-800">PO Number</th>
//                   <th className="border border-gray-400 px-2 py-3 text-center w-20 font-medium text-gray-800">RLSE Number</th>
//                   <th className="border border-gray-400 px-2 py-3 text-center w-24 font-medium text-gray-800">PO Line Number</th>
//                   {weekdays.map((day, index) => (
//                     <th key={index} className="border border-gray-400 px-2 py-3 text-center w-20 font-medium text-gray-800">
//                       <div className="text-xs leading-tight">
//                         {day.day}
//                       </div>
//                     </th>
//                   ))}
//                   <th className="border border-gray-400 px-2 py-3 text-center w-20 font-medium text-gray-800">Total</th>
//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>
//                 {timesheetRows.map((row, index) => (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="border border-gray-400 px-2 py-2 text-center">
//                       <input type="checkbox" className="cursor-pointer" />
//                     </td>
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs">{row.line}</td>
//                     <td className="border border-gray-400 px-3 py-2 text-left text-xs">{row.description}</td>
//                     <td className="border border-gray-400 px-3 py-2 text-center text-xs">{row.project}</td>
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs">{row.plc}</td>
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs">{row.payType}</td>
//                     <td className="border border-gray-400 px-3 py-2 text-center text-xs">{row.poNumber}</td>
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs">{row.rlseNumber}</td>
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs">{row.poLineNumber}</td>
//                     {row.weekHours && row.weekHours.map((hours, dayIndex) => (
//                       <td key={dayIndex} className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">
//                         {hours}
//                       </td>
//                     ))}
//                     <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">{row.total}</td>
//                   </tr>
//                 ))}

//                 {/* Summary Rows - STYLED like your first image */}
//                 <tr className="bg-gray-200 font-medium">
//                   <td colSpan="9" className="border border-gray-400 px-3 py-2 text-right text-xs font-semibold">Regular</td>
//                   {totals.daily.map((total, index) => (
//                     <td key={index} className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">
//                       {total}
//                     </td>
//                   ))}
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">{totals.regular}</td>
//                 </tr>
//                 <tr className="bg-gray-200 font-medium">
//                   <td colSpan="9" className="border border-gray-400 px-3 py-2 text-right text-xs font-semibold">Overtime</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">2.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-medium">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">{totals.overtime}</td>
//                 </tr>
//                 <tr className="bg-blue-200 font-bold">
//                   <td colSpan="9" className="border border-gray-400 px-3 py-2 text-right text-xs font-bold">Total</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">18.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">15.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">13.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">15.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">16.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold">0.00</td>
//                   <td className="border border-gray-400 px-2 py-2 text-center text-xs font-bold text-blue-800">{totals.grand}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TimesheetDetailModal;

import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- ActionButton Component ---
const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '', disabled = false }) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
    const variants = {
        primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
        secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
    };
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return ( <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}>{icon && <span className="mr-2">{icon}</span>}{children}</button> );
};

// --- Toast Notification ---
const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    const typeClasses = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500 text-black', info: 'bg-blue-500' };
    toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses['info']}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { document.body.removeChild(toast); }, 3000);
};

// --- Initial empty line structure ---
const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', workOrder: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });

// --- CascadingSelect Component ---
const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// --- Data for the period dropdown ---
const timePeriods = [
    { label: 'Mon 9/8 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] },
    { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] },
    { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28'] },
];

// --- Helper Functions ---
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

export default function TimesheetDetailModal({ timesheetData, onClose, onSave, isSaving }) {
    const [lines, setLines] = useState([]);
    const [selectedLines, setSelectedLines] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    
    const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    
    useEffect(() => {
        if (timesheetData) {
            setIsEditable(timesheetData.Status?.toUpperCase() === 'OPEN');
            fetchTimesheetDetails();
        }
    }, [timesheetData]);

    const fetchTimesheetDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://timesheet-subk.onrender.com/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);
            if (!response.ok) throw new Error('Failed to fetch timesheet details');
            const data = await response.json();
            
            const poResponse = await fetch(`https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);
            if(!poResponse.ok) throw new Error('Failed to fetch purchase order details');
            const poData = await poResponse.json();
            const poDataArray = Array.isArray(poData) ? poData : [];
            setPurchaseOrderData(poDataArray);
            
            const filteredData = data.filter(item => formatDate(item.timesheet_Date) === timesheetData.Date);

            const mappedLines = filteredData.map(item => {
                const matchingPoEntry = poDataArray.find(po => 
                    po.project?.includes(item.projId) &&
                    po.plcCd?.includes(item.plc) &&
                    po.purchaseOrder?.includes(item.poNumber)
                );
    
                const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
                const hourIdsData = {};
                if (item.timesheetHours) {
                    item.timesheetHours.forEach(hourEntry => {
                        const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
                        if (!isNaN(date.getTime())) {
                            const dayKey = dayKeyMapping[date.getUTCDay()];
                            if (dayKey) {
                                hoursData[dayKey] = hourEntry.hours;
                                hourIdsData[dayKey] = hourEntry.id;
                            }
                        }
                    });
                }
    
                return {
                    id: item.timesheetId,
                    description: item.description || '',
                    project: item.projId || '',
                    plc: item.plc || '',
                    payType: item.payType || 'SR',
                    workOrder: matchingPoEntry ? `${matchingPoEntry.wa_Code} - ${matchingPoEntry.resourceDesc[0]}` : (item.workOrder || ''),
                    poNumber: item.poNumber || '',
                    rlseNumber: item.rlseNumber || '',
                    poLineNumber: item.poLineNumber || '',
                    hours: hoursData,
                    hourIds: hourIdsData
                };
            });
            setLines(mappedLines);

        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSelectChange = (id, fieldName, value) => {
        setLines(currentLines => currentLines.map(line => {
            if (line.id === id) {
                const updatedLine = { ...line, [fieldName]: value };

                if (fieldName === 'workOrder') {
                    const [waCode, desc] = value.split(' - ');
                    const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code === waCode);
                    if (selectedWorkOrderData) {
                        updatedLine.description = desc || '';
                        updatedLine.project = selectedWorkOrderData.project[0] || '';
                        updatedLine.plc = selectedWorkOrderData.plcCd[0] || '';
                        updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || '';
                        updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || '';
                        updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[0] || '';
                    } else {
                        updatedLine.description = '';
                        updatedLine.project = '';
                        updatedLine.plc = '';
                        updatedLine.poNumber = '';
                        updatedLine.rlseNumber = '';
                        updatedLine.poLineNumber = '';
                    }
                }
                return updatedLine;
            }
            return line;
        }));
    };

    const handleHourChange = (id, day, value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue) || numValue < 0 || numValue > 24) {
            showToast('Hours must be between 0 and 24.', 'warning');
            return;
        }
        setLines(lines.map(line => line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line));
    };

    const addLine = () => {
        const newId = `temp-${Date.now()}`;
        setLines(prevLines => [...prevLines, createEmptyLine(newId)]);
    };
    
    const handleSelectLine = (id) => {
        const newSelection = new Set(selectedLines);
        newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
        setSelectedLines(newSelection);
    };

    const deleteLines = () => {
        if (selectedLines.size === 0) return showToast('Please select at least one line to delete.', 'warning');
        setLines(lines.filter(line => !selectedLines.has(line.id)));
        setSelectedLines(new Set());
    };

    const copyLines = () => {
        if (selectedLines.size === 0) return showToast('Please select at least one line to copy.', 'warning');
        let maxId = lines.length > 0 ? Math.max(...lines.map(l => typeof l.id === 'number' ? l.id : 0)) : 0;
        const newLines = lines.filter(line => selectedLines.has(line.id)).map(line => ({ ...line, id: ++maxId }));
        setLines([...lines, ...newLines]);
        setSelectedLines(new Set());
    };

    const handleSave = () => {
        if (onSave) {
            onSave(lines);
        }
    };
    
    if (isLoading) { return <div className="text-center p-8">Loading...</div>; }

    return (
        <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">View / Edit Timesheet</h3>
                {isEditable &&
                    <div className="flex items-center gap-2">
                        <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
                        <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
                        <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
                    </div>
                }
            </div>
            <div className="p-4 max-h-96 overflow-auto">
                <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
                    <table className="w-full text-sm min-w-[1600px]">
                        <thead className="bg-slate-100/70 border-b border-gray-200/80">
                            <tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...timePeriods[0].dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => {
                                const workOrderOptions = purchaseOrderData.flatMap(item => 
                                    item.resourceDesc.map((desc, i) => ({
                                        value: `${item.wa_Code} - ${desc}`,
                                        label: `${item.wa_Code} - ${desc}`
                                    }))
                                );
                                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
                                return (
                                <tr key={line.id} className="hover:bg-slate-50/50">
                                    <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={!isEditable} /></td>
                                    <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                    <td className="p-2 min-w-[150px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} disabled={!isEditable} /></td>
                                    <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly/></td>
                                    <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    <td className="p-2 min-w-[120px]">
                                        <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md" disabled={!isEditable}>
                                            <option value="SR">SR (Subcontractor Regular)</option>
                                            <option value="SO">SO (Subcontractor Overtime)</option>
                                        </select>
                                    </td>
                                    <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    {days.map(day => <td key={day} className="p-2"><input type="number" step="0.5" value={line.hours[day]} onChange={e => handleHourChange(line.id, day, e.target.value)} className={`w-20 text-right bg-white p-1.5 border border-gray-200 rounded-md shadow-sm ${day === 'sat' || day === 'sun' ? 'bg-gray-100' : ''}`} disabled={day === 'sat' || day === 'sun' || !isEditable} /></td>)}
                                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
                <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>
                {isEditable &&
                    <button 
                        onClick={handleSave} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                }
            </div>
        </div>
    );
};
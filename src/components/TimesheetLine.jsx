// import React, { useState } from 'react';

// // --- SVG Icons ---
// const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
// const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
// const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
// const HeartIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;
// const SearchIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;


// const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '' }) => {
//     const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
//     const variants = {
//         primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
//         secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
//     };
//     return (
//         <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
//             {icon && <span className="mr-2">{icon}</span>}
//             {children}
//         </button>
//     );
// };

// export default function TimesheetLine({ onClose }) {
//     const [lines, setLines] = useState([
//         { id: 1, selected: false, description: 'TRAVEL - OPTION 2', project: 'N424.OV2-RDTE NETI', plc: 'ANALYST', payType: 'R', poNumber: 'RDS0424-2', rlseNumber: '2', poLineNumber: '5', hours: { mon: 10, tue: 5, wed: 5, thu: 5, fri: 7, sat: 8, sun: 0 } },
//         { id: 2, selected: false, description: 'Comp Time', project: 'LEAVE.00.XZYM', plc: 'ANALYST', payType: 'COM', poNumber: 'RDS0424-2', rlseNumber: '2', poLineNumber: '5', hours: { mon: 5, tue: 6, wed: 4, thu: 2, fri: 4, sat: 0, sun: 0 } },
//         { id: 3, selected: false, description: 'Universal Time-Off', project: 'LEAVE.00.ABCDZX', plc: 'ANALYST', payType: 'UTO', poNumber: 'RDS0424-2', rlseNumber: '2', poLineNumber: '5', hours: { mon: 2, tue: 5, wed: 4, thu: 4, fri: 4, sat: 0, sun: 0 } },
//     ]);

//     const dayHeaders = ['Mon 09/15', 'Tue 08/16', 'Wed 08/17', 'Thu 08/18', 'Fri 08/19', 'Sat 08/20', 'Sun 08/21'];
//     const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

//     const handleInputChange = (id, field, value) => {
//         setLines(lines.map(l => (l.id === id ? { ...l, [field]: value } : l)));
//     };

//     const handleHourChange = (id, day, value) => {
//         const newLines = lines.map(line => {
//             if (line.id === id) {
//                 return { ...line, hours: { ...line.hours, [day]: parseFloat(value) || 0 } };
//             }
//             return line;
//         });
//         setLines(newLines);
//     };

//     const addLine = () => {
//         const newId = lines.length > 0 ? Math.max(...lines.map(l => l.id)) + 1 : 1;
//         const newLine = { id: newId, selected: false, description: 'New Line Item', project: 'N/A', plc: 'N/A', payType: 'N/A', poNumber: 'N/A', rlseNumber: 'N/A', poLineNumber: 'N/A', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } };
//         setLines([...lines, newLine]);
//     };

//     const calculateRowTotal = (hours) => Object.values(hours).reduce((sum, h) => sum + h, 0).toFixed(2);
    
//     const calculateTotals = () => {
//         const dailyTotals = days.map(day => lines.reduce((sum, line) => sum + (line.hours[day] || 0), 0));
//         const regular = dailyTotals.reduce((sum, total) => sum + total, 0);
//         const overtime = 0; // Simplified for this example
//         return {
//             daily: dailyTotals.map(t => t.toFixed(2)),
//             regular: regular.toFixed(2),
//             overtime: overtime.toFixed(2),
//             total: (regular + overtime).toFixed(2)
//         };
//     };
    
//     const totals = calculateTotals();

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
// <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[1600px] mx-auto my-4 overflow-y-auto max-h-[95vh]">             
//        <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">Timesheet Lines</h2>
//                     <div className="flex items-center gap-2 flex-wrap">
//                         <ActionButton icon={<HeartIcon />}>Favorites</ActionButton>
//                         <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
//                         <ActionButton icon={<CopyIcon />}>Copy</ActionButton>
//                         <ActionButton icon={<TrashIcon />}>Delete</ActionButton>
//                         <ActionButton icon={<SearchIcon />}>Query</ActionButton>
//                     </div>
//                 </div>

//                 <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                     <table className="w-full text-sm">
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80">
//                             <tr>
//                                 {['', 'Line', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...dayHeaders, 'Total'].map(header => (
//                                     <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                             {lines.map((line, index) => (
//                                 <tr key={line.id} className="hover:bg-slate-50/50">
//                                     <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" /></td>
//                                     <td className="p-3 text-center text-gray-500">{index + 1}</td>
//                                     {['description', 'project', 'plc', 'payType', 'poNumber', 'rlseNumber', 'poLineNumber'].map(field => (
//                                         <td key={field} className="p-2"><input type="text" value={line[field]} onChange={e => handleInputChange(line.id, field, e.target.value)} className="w-full bg-transparent p-1 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500" /></td>
//                                     ))}
//                                     {days.map(day => (
//                                         <td key={day} className="p-2"><input type="number" step="0.01" value={line.hours[day]} onChange={e => handleHourChange(line.id, day, e.target.value)} className="w-20 text-right bg-transparent p-1 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500" /></td>
//                                     ))}
//                                     <td className="p-3 text-right font-semibold text-gray-800 pr-4">{calculateRowTotal(line.hours)}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                         <tfoot className="bg-slate-100/70 font-semibold border-t-2 border-gray-300/80">
//                             <tr>
//                                 <td colSpan="9" className="p-3 text-right text-slate-700">Regular</td>
//                                 {totals.daily.map((total, i) => <td key={i} className="p-3 text-right tabular-nums text-slate-700">{total}</td>)}
//                                 <td className="p-3 text-right tabular-nums pr-4 text-slate-800">{totals.regular}</td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="9" className="p-3 text-right text-slate-700">Overtime</td>
//                                 {days.map((day, i) => <td key={i} className="p-3 text-right tabular-nums text-slate-700">0.00</td>)}
//                                 <td className="p-3 text-right tabular-nums pr-4 text-slate-800">{totals.overtime}</td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="9" className="p-3 text-right text-slate-700">Total</td>
//                                 {totals.daily.map((total, i) => <td key={i} className="p-3 text-right tabular-nums text-slate-700">{total}</td>)}
//                                 <td className="p-3 text-right tabular-nums pr-4 text-slate-800">{totals.total}</td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//                  <div className="mt-6 flex justify-end gap-3">
//                     <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
//                     <ActionButton variant="primary">Submit</ActionButton>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useMemo, useRef } from 'react';

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
const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });

// --- CascadingSelect Component ---
const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// --- Data for the period dropdown ---
const timePeriods = [
    { label: 'Mon 7/21 - Sun 7/27', dates: ['Mon 07/21', 'Tue 07/22', 'Wed 07/23', 'Thu 07/24', 'Fri 07/25', 'Sat 07/26', 'Sun 07/27'] },
    { label: 'Mon 7/28 - Sun 8/3',  dates: ['Mon 07/28', 'Tue 07/29', 'Wed 07/30', 'Thu 07/31', 'Fri 08/01', 'Sat 08/02', 'Sun 08/03'] },
    { label: 'Mon 8/4 - Sun 8/10',  dates: ['Mon 08/04', 'Tue 08/05', 'Wed 08/06', 'Thu 08/07', 'Fri 08/08', 'Sat 08/09', 'Sun 08/10'] },
    { label: 'Mon 8/11 - Sun 8/17', dates: ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'] },
    { label: 'Mon 8/18 - Sun 8/24', dates: ['Mon 08/18', 'Tue 08/19', 'Wed 08/20', 'Thu 08/21', 'Fri 08/22', 'Sat 08/23', 'Sun 08/24'] },
    { label: 'Mon 8/25 - Sun 8/31', dates: ['Mon 08/25', 'Tue 08/26', 'Wed 08/27', 'Thu 08/28', 'Fri 08/29', 'Sat 08/30', 'Sun 08/31'] },
    { label: 'Mon 9/1 - Sun 9/7',   dates: ['Mon 09/01', 'Tue 09/02', 'Wed 09/03', 'Thu 09/04', 'Fri 09/05', 'Sat 09/06', 'Sun 09/07'] },
    { label: 'Mon 9/8 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] },
    { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] },
    { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']}

];

// --- Helper Functions ---
const getWeekEndDateFromPeriod = (period) => {
    if (!period?.dates?.length) return null;
    const lastDayString = period.dates[period.dates.length - 1];
    const datePart = lastDayString.split(' ')[1];
    const [month, day] = datePart.split('/');
    // Assuming the year is 2025 for this static data
    const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10)));
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
};

const formatDateForComparison = (dateInput) => {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
};

export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null, currentUser }) {
    const [purchaseOrderData, setPurchaseOrderData] = useState([]);
    const [lines, setLines] = useState([]);
    const [selectedLines, setSelectedLines] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[0]);
    const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);

    const isEditMode = Boolean(timesheetToEdit);
    const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    useEffect(() => {
        if (isEditMode && (!purchaseOrderData || purchaseOrderData.length === 0)) {
            return;
        }

        try {
            if (isEditMode && timesheetToEdit) {
                const editDateStr = formatDateForComparison(timesheetToEdit?.timesheet_Date);
                const matchingPeriod = timePeriods.find(period => getWeekEndDateFromPeriod(period) === editDateStr);
                if (matchingPeriod) setSelectedPeriod(matchingPeriod);

                const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
                const hourIdsData = {};
                timesheetToEdit?.timesheetHours?.forEach(hourEntry => {
                    if (hourEntry && hourEntry.ts_Date) {
                        const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
                        if (!isNaN(date.getTime())) {
                            const dayKey = dayKeyMapping[date.getUTCDay()];
                            if (dayKey) {
                                hoursData[dayKey] = hourEntry.hours;
                                hourIdsData[dayKey] = hourEntry.id;
                            }
                        }
                    }
                });

                let fullWorkOrderString = '';
                const poEntry = purchaseOrderData.find(po => po.project?.includes(timesheetToEdit.projId));
                if (poEntry) {
                    const projectIndex = poEntry.project.indexOf(timesheetToEdit.projId);
                    if (projectIndex > -1) {
                        const correspondingDesc = poEntry.resourceDesc[projectIndex];
                        fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
                    }
                }

                const initialLine = {
                    id: timesheetToEdit?.id,
                    description: timesheetToEdit?.description || '',
                    project: timesheetToEdit?.projId || '',
                    plc: timesheetToEdit?.plc || '',
                    payType: timesheetToEdit?.payType || 'SR',
                    workOrder: fullWorkOrderString,
                    wa_Code: poEntry?.wa_Code || '',
                    pmUserID: poEntry?.pmUserId || '',
                    poNumber: timesheetToEdit?.poNumber || '',
                    rlseNumber: timesheetToEdit?.rlseNumber || '',
                    poLineNumber: timesheetToEdit?.poLineNumber || '',
                    hours: hoursData,
                    hourIds: hourIdsData,
                };
                setLines([initialLine]);
            } else {
                setLines([createEmptyLine(1)]);
            }
        } catch (error) {
            console.error("Error initializing TimesheetLine:", error);
            showToast("Could not load timesheet data for editing.", "error");
            onClose();
        }
    }, [isEditMode, timesheetToEdit, purchaseOrderData]);

    useEffect(() => {
        if (!resourceId) {
            setIsLoading(false);
            return;
        }
        const fetchPurchaseOrders = async () => {
            setIsLoading(true);
            const API_URL = `https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${resourceId}`;
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setPurchaseOrderData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch purchase orders:", error);
                showToast("Could not load purchase order data.", "error");
                setPurchaseOrderData([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPurchaseOrders();
    }, [resourceId]);
    
    useEffect(() => {
        if (isEditMode) {
            setIsPeriodInvalid(false);
            return;
        }
        const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod);
        if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) {
            setIsPeriodInvalid(true);
        } else {
            setIsPeriodInvalid(false);
        }
    }, [selectedPeriod, existingTimesheetDates, isEditMode]);

    const handleSelectChange = (id, fieldName, value) => {
        setLines(currentLines => currentLines.map(line => {
            if (line.id === id) {
                const updatedLine = { ...line, [fieldName]: value };

                if (fieldName === 'workOrder') {
                    if (!value) {
                        updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserId = '';
                        return updatedLine;
                    }

                    const [waCode, desc] = value.split(' - ');
                    const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code === waCode);

                    if (selectedWorkOrderData) {
                        updatedLine.wa_Code = selectedWorkOrderData.wa_Code;
                        updatedLine.pmUserID = selectedWorkOrderData.pmUserId || '';

                        const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);

                        if (descIndex > -1) {
                            updatedLine.description = desc || '';
                            updatedLine.project = selectedWorkOrderData.project[descIndex] || '';
                            updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || '';
                            updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || '';
                            updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || '';
                            updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || '';
                        } else {
                            updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = '';
                        }
                    } else {
                         updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = '';
                    }
                }
                return updatedLine;
            }
            return line;
        }));
    };

    const handleHourChange = (id, day, value) => {
    const numValue = parseFloat(value);

    if (value === '') {
        // Allow the state update to handle setting the value to 0
    } else if (isNaN(numValue) || numValue < 0 || numValue > 24) {
        showToast('Hours for a single entry must be between 0 and 24.', 'warning');
        return;
    } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
        // This is the new validation for .0 and .5 increments
        showToast('Please enter hours in increments of 0.5 (e.g., 7.0, 8.5).', 'warning');
        return;
    }

    const otherLinesTotal = lines
        .filter(line => line.id !== id)
        .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);

    const newColumnTotal = otherLinesTotal + (numValue || 0);

    if (newColumnTotal > 24) {
        showToast(`Total hours for this day cannot exceed 24.`, 'warning');
        return;
    }

    setLines(currentLines =>
        currentLines.map(line =>
            line.id === id
            ? { ...line, hours: { ...line.hours, [day]: value === '' ? 0 : numValue } }
            : line
        )
    );
};

    const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
    const handleSelectLine = (id) => {
        const newSelection = new Set(selectedLines);
        newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
        setSelectedLines(newSelection);
    };
    const deleteLines = () => {
        if (selectedLines.size === 0) return showToast('Please select lines to delete.', 'warning');
        setLines(lines.filter(line => !selectedLines.has(line.id)));
        setSelectedLines(new Set());
    };
    const copyLines = () => {
        if (selectedLines.size === 0) return showToast('Please select lines to copy.', 'warning');
        const copies = lines.filter(line => selectedLines.has(line.id)).map(line => ({
            ...line,
            id: `temp-${Date.now()}-${Math.random()}`,
            hourIds: {}
        }));
        setLines(prev => [...prev, ...copies]);
        setSelectedLines(new Set());
    };

    const handleSubmit = async () => {
        const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

        for (const line of lines) {
            if (!line.project || !line.poLineNumber) {
                showToast(`Please complete the Work Order for "${line.description || 'the new line'}".`, 'warning');
                return;
            }

            const method = isEditMode ? 'PUT' : 'POST';
            const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;

            const now = new Date().toISOString();
            const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
            const weekEndDateAsISO = new Date(weekEndDateString).toISOString();
            const timesheetHours = days.map((day, index) => {
                const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/');
                const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
                return {
                    Id: isEditMode ? (line.hourIds[day] || 0) : 0,
                    Ts_Date: dateForApi,
                    Hours: line.hours[day] || 0
                };
            });

            const payload = {
                Id: isEditMode ? line.id : 0,
                Description: line.description,
                ProjId: line.project,
                Plc: line.plc,
                WorkOrder: line.wa_Code,
                pm_User_Id: line.pmUserID,
                PayType: line.payType,
                PoNumber: line.poNumber,
                RlseNumber: line.rlseNumber || "0",
                Resource_Id: String(resourceId),
                PoLineNumber: parseInt(line.poLineNumber, 10) || 0,
                Timesheet_Date: weekEndDateAsISO,
                UpdatedAt: now,
                UpdatedBy: String(resourceId),
                TimesheetHours: timesheetHours,
                Hours: parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)),
                Status: "OPEN",
                ApprovalStatus: "PENDING"
            };

            if (!isEditMode) {
                payload.CreatedAt = now;
                payload.CreatedBy = String(resourceId);
            }

            try {
                const response = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Submission failed: ${errorText}`);
                }
            } catch (error) {
                showToast(error.message, 'error');
                return;
            }
        }

        showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success');
        onClose();
    };

    const workOrderOptions = useMemo(() => {
        if (!purchaseOrderData) return [];
        const uniqueOptions = new Map();
        purchaseOrderData.forEach(item => {
            item.resourceDesc.forEach(desc => {
                const value = `${item.wa_Code} - ${desc}`;
                uniqueOptions.set(value, { value, label: value });
            });
        });
        return Array.from(uniqueOptions.values());
    }, [purchaseOrderData]);
    
    const dailyTotals = useMemo(() => {
        const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
        lines.forEach(line => {
            days.forEach(day => {
                totals[day] += parseFloat(line.hours[day]) || 0;
            });
        });
        return totals;
    }, [lines, days]);

    const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

    if (isLoading) { return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="text-white text-xl">Loading Data...</div></div>; }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[90vw] mx-auto my-4 overflow-y-auto max-h-[95vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex flex-col items-start">
                            <div className="flex items-center gap-2">
                                <label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label>
                                <select
                                    id="period-select"
                                    value={selectedPeriod.label}
                                    onChange={(e) => {
                                        const newPeriod = timePeriods.find(p => p.label === e.target.value);
                                        if (newPeriod) setSelectedPeriod(newPeriod);
                                    }}
                                    className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                                    disabled={isEditMode}
                                >
                                    {timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}
                                </select>
                            </div>
                            {isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">Warning: A timesheet for this period already exists.</p>)}
                        </div>
                        <div className="flex items-center gap-2">
                            <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
                            <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
                            <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
                    <table className="w-full text-sm min-w-[1600px]">
                        <thead className="bg-slate-100/70 border-b border-gray-200/80">
                            <tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...selectedPeriod.dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => {
                                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
                                return (
                                    <tr key={line.id} className="hover:bg-slate-50/50">
                                        <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} /></td>
                                        <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                        <td className="p-2 min-w-[150px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} /></td>
                                        <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        <td className="p-2 min-w-[120px]">
                                            <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md">
                                                <option value="SR">SR (Subcontractor Regular)</option>
                                                <option value="SO">SO (Subcontractor Overtime)</option>
                                            </select>
                                        </td>
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                        {days.map(day => <td key={day} className="p-2"><input type="number" step="0.5" value={line.hours[day]} onChange={e => handleHourChange(line.id, day, e.target.value)} className={`w-20 text-right bg-white p-1.5 border border-gray-200 rounded-md shadow-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`} disabled={day === 'sat' || day === 'sun'} /></td>)}
                                        <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-200/80 font-semibold">
                            <tr className="border-t-2 border-gray-300">
                                <td colSpan="10" className="p-3 text-right text-gray-800">Total Hours</td>
                                {days.map(day => (
                                    <td key={day} className="p-2 text-center">
                                        <div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-400' : ''}`}>
                                            {dailyTotals[day].toFixed(2)}
                                        </div>
                                    </td>
                                ))}
                                <td className="p-3 text-right font-bold text-blue-700 pr-4">
                                    {grandTotal.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
                    <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid}>
                        {isEditMode ? 'Save Changes' : 'Add'}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}
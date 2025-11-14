// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { backendUrl } from './config';



// // --- SVG Icons ---
// const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
// const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
// const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
// const EyeIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
// const XIcon = ({ className = "h-4 w-4" }) => (
//     <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//     </svg>
// );


// // --- ActionButton Component ---
// const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '', disabled = false }) => {
//     const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
//     const variants = {
//         primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
//         secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
//     };
//     const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
//     return ( <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}>{icon && <span className="mr-2">{icon}</span>}{children}</button> );
// };

// // --- Toast Notification ---
// const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     const typeClasses = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500 text-black', info: 'bg-blue-500' };
//     toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses['info']}`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, 3000);
// };

// const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', workOrder: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });
// const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// const formatDate = (dateInput) => {
//     if (!dateInput) return '';
//     let date;
//     if (dateInput instanceof Date) { date = dateInput; } 
//     else { const dateOnlyString = String(dateInput).split('T')[0]; const parts = dateOnlyString.split('-'); if (parts.length !== 3) return dateInput; const year = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const day = parseInt(parts[2], 10); date = new Date(Date.UTC(year, month, day)); }
//     if (isNaN(date.getTime())) return '';
//     return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
// };

// const getWeekDates = (dateString) => {
//     const startDate = new Date(dateString); const weekDates = {}; const startDay = startDate.getUTCDay(); const monday = new Date(startDate); monday.setUTCDate(startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)); const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
//     for (let i = 0; i < 7; i++) { const currentDate = new Date(monday); currentDate.setUTCDate(monday.getUTCDate() + i); const yyyy = currentDate.getUTCFullYear(); const mm = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); const dd = String(currentDate.getUTCDate()).padStart(2, '0'); weekDates[dayKeys[i]] = `${yyyy}-${mm}-${dd}`; }
//     return weekDates;
// };

// const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const hideableColumns = ['Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number'];

// export default function TimesheetDetailModal({ timesheetData, onClose, onSave, isSaving }) {
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [isEditable, setIsEditable] = useState(false);
//     const [headerDates, setHeaderDates] = useState([]);
//     const [initialLines, setInitialLines] = useState([]);
//     const [linesToDelete, setLinesToDelete] = useState([]);
//     const [isCurrentlySaving, setIsCurrentlySaving] = useState(false);
//     const [timesheetDetails, setTimesheetDetails] = useState(null);
//     const [hiddenColumns, setHiddenColumns] = useState({
//         'Work Order': false,
//         'Description': false,
//         'Project': false,
//         'PLC': false,
//         'Pay Type': false,
//         'PO Number': false,
//         'RLSE Number': false,
//         'PO Line Number': false
//     });

//     const [poLineBudgets, setPoLineBudgets] = useState({});

//     const nextId = useRef(0);

//     useEffect(() => {
//         if (timesheetData) {
//             const status = timesheetData.Status?.toUpperCase();
//             setIsEditable(status === 'OPEN' || status === 'REJECTED' || status === 'SUBMITTED');
//             fetchTimesheetDetails();
//             const startDate = new Date(timesheetData.Date); const startDay = startDate.getUTCDay(); const monday = new Date(startDate); monday.setUTCDate(startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)); const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//             const newHeaderDates = daysOfWeek.map((day, index) => {
//                 const currentDate = new Date(monday); currentDate.setUTCDate(monday.getUTCDate() + index); const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); const dt = String(currentDate.getUTCDate()).padStart(2, '0');
//                 return `${day} ${month}/${dt}`;
//             });
//             setHeaderDates(newHeaderDates);
//         }
//     }, [timesheetData]);

//     const fetchTimesheetDetails = async () => {
//         setIsLoading(true);
//         try {
//             const response = await fetch(`${backendUrl}
// /api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);
//             if (!response.ok) throw new Error('Failed to fetch timesheet details');
//             const data = await response.json();
            
//             const poResponse = await fetch(`${backendUrl}
// /api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);
//             if(!poResponse.ok) throw new Error('Failed to fetch purchase order details');
//             const poData = await poResponse.json();
//             const poDataArray = Array.isArray(poData) ? poData : [];
//             setPurchaseOrderData(poDataArray);

//             const dataArray = Array.isArray(data) ? data : [];
//             const filteredData = dataArray.filter(item => formatDate(item.timesheet_Date) === timesheetData.Date);
            
//             if (filteredData.length > 0) {
//                 setTimesheetDetails(filteredData[0]);
//             }

//             const mappedLines = filteredData.map(item => {
//                 const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
//                 const hourIdsData = {};
//                 if (item.timesheetHours) {
//                     item.timesheetHours.forEach(hourEntry => {
//                         const date = new Date(hourEntry.ts_Date + 'T00:00:00Z');
//                         if (!isNaN(date.getTime())) {
//                             const dayKey = dayKeyMapping[date.getUTCDay()];
//                             if (dayKey) {
//                                 hoursData[dayKey] = hourEntry.hours;
//                                 hourIdsData[dayKey] = hourEntry.id;
//                             }
//                         }
//                     });
//                 }
    
//                 let fullWorkOrderString = '';
//                 const poEntry = poDataArray.find(po => po.project?.includes(item.projId));
//                 if (poEntry) {
//                     const projectIndex = poEntry.project.indexOf(item.projId);
//                     if (projectIndex > -1) {
//                         const correspondingDesc = poEntry.resourceDesc[projectIndex];
//                         fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
//                     }
//                 }
    
//                 return {
//                     id: item.lineNo,
//                     description: item.description || '',
//                     project: item.projId || '',
//                     plc: item.plc || '',
//                     payType: item.payType || 'SR',
//                     workOrder: fullWorkOrderString,
//                     wa_Code: poEntry?.wa_Code || '',
//                     pmUserID: poEntry?.pmUserId || '',
//                     poNumber: item.poNumber || '',
//                     rlseNumber: item.rlseNumber || '',
//                     poLineNumber: item.poLineNumber || '',
//                     hours: hoursData,
//                     hourIds: hourIdsData
//                 };
//             });

//             setLines(mappedLines);
//             setInitialLines(JSON.parse(JSON.stringify(mappedLines)));
//         } catch (error) { showToast(error.message, 'error'); } 
//         finally { setIsLoading(false); }
//     };
    
//     const handleSelectChange = (id, fieldName, value) => {
//         setLines(currentLines => currentLines.map(line => {
//             if (line.id === id) {
//                 let updatedLine = { ...line, [fieldName]: value };
//                 if (fieldName === 'workOrder') {
//                     if (!value) { 
//                         const emptyLine = createEmptyLine(id); 
//                         return { ...emptyLine, id: line.id }; 
//                     }
                    
//                     const splitIndex = value.indexOf(' - ');
//                     const waCode = splitIndex > -1 ? value.substring(0, splitIndex) : value;
//                     const desc = splitIndex > -1 ? value.substring(splitIndex + 3) : '';

//                     const selectedWorkOrderData = purchaseOrderData.find(
//                         item => item.wa_Code === waCode && (item.resourceDesc || []).includes(desc)
//                     );

//                     if (selectedWorkOrderData) {
//                         updatedLine.wa_Code = selectedWorkOrderData.wa_Code || ''; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);
//                         if (descIndex > -1) { updatedLine.description = desc || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || '';
//                             // Set budget limit for this line (hardcoded for now, will be from API)
//                         setPoLineBudgets(prev => ({
//                         ...prev,
//                         [id]: 500 // Hardcoded value - replace with API value later
//                         }));
//                          }
//                         else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; }
//                     } else { const emptyLine = createEmptyLine(id); return { ...emptyLine, id: line.id }; }
//                 }
//                 return updatedLine;
//             }
//             return line;
//         }));
//     };

//     // const handleHourChange = (id, day, value) => {
//     //     if (value === '') {
//     //         setLines(currentLines => currentLines.map(line =>
//     //             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//     //         ));
//     //         return;
//     //     }

//     //     const numValue = parseFloat(value);
//     //     let isValid = true;
//     //     let toastMessage = '';

//     //     if (isNaN(numValue) || numValue < 0 || numValue > 24) {
//     //         isValid = false;
//     //         toastMessage = 'Hours must be between 0 and 24.';
//     //     } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
//     //         isValid = false;
//     //         toastMessage = 'Hours must be in 0.5 increments.';
//     //     } else {
//     //         const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
//     //         const newColumnTotal = otherLinesTotal + numValue;
//     //         if (newColumnTotal > 24) {
//     //             isValid = false;
//     //             toastMessage = `Total hours for this day cannot exceed 24.`;
//     //         }
//     //     }

//     //      // NEW: Check PO Line budget limit
//     // // if (isValid && poLineBudgets[id]) {
//     // //     const currentLine = lines.find(line => line.id === id);
//     // //     if (currentLine) {
//     // //         // Calculate total hours for this line including the new value
//     // //         const currentLineTotal = Object.keys(currentLine.hours).reduce((sum, d) => {
//     // //             if (d === day) {
//     // //                 return sum + numValue;
//     // //             }
//     // //             return sum + (parseFloat(currentLine.hours[d]) || 0);
//     // //         }, 0);

//     // //         if (currentLineTotal > poLineBudgets[id]) {
//     // //             isValid = false;
//     // //             toastMessage = `Total hours for this PO Line cannot exceed ${poLineBudgets[id]} hours. Current total would be: ${currentLineTotal.toFixed(1)}`;
//     // //         }
//     // //     }
//     // // }
//     // if (isValid && poLineBudgets[id]) {
//     //     const budgetLimit = poLineBudgets[id];
        
//     //     // Check if the hours entered for THIS DAY exceed the budget limit
//     //     if (numValue > budgetLimit) {
//     //         isValid = false;
//     //         toastMessage = `Hours for this day cannot exceed PO Line budget of ${budgetLimit} hours.`;
//     //     }
//     // }

//     //     if (isValid) {
//     //         setLines(currentLines => currentLines.map(line =>
//     //             line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
//     //         ));
//     //     } else {
//     //         showToast(toastMessage, 'warning');
//     //         setLines(currentLines => currentLines.map(line =>
//     //             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//     //         ));
//     //     }
//     // };
    
//     const handleHourChange = (id, day, value) => {
//     if (value === '') {
//         setLines(currentLines => currentLines.map(line =>
//             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//         ));
//         return;
//     }

//     const numValue = parseFloat(value);
//     let isValid = true;
//     let toastMessage = '';

//     // VALIDATION 1: Basic hour constraints (0-24, 0.5 increments)
//     if (isNaN(numValue) || numValue < 0 || numValue > 24) {
//         isValid = false;
//         toastMessage = 'Hours must be between 0 and 24.';
//     } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
//         isValid = false;
//         toastMessage = 'Hours must be in 0.5 increments.';
//     }

//     // VALIDATION 3: PO Line budget limit for THIS SPECIFIC DAY
//     if (isValid && poLineBudgets[id]) {
//         const budgetLimit = poLineBudgets[id];
        
//         // Check if the hours entered for THIS DAY exceed the PO Line budget limit
//         if (numValue > budgetLimit) {
//             isValid = false;
//             toastMessage = `Hours for this PO Line on this day cannot exceed ${budgetLimit} hours.`;
//         }
//     }
    
//     // VALIDATION 2: Daily column total (all lines combined) cannot exceed 24
//     if (isValid) {
//         const otherLinesTotal = lines
//             .filter(line => line.id !== id)
//             .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
//         const newColumnTotal = otherLinesTotal + numValue;
        
//         if (newColumnTotal > 24) {
//             isValid = false;
//             toastMessage = `Total hours for this day cannot exceed 24.`;
//         }
//     }

    

//     // Apply the change if valid, otherwise show error
//     if (isValid) {
//         setLines(currentLines => currentLines.map(line =>
//             line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
//         ));
//     } else {
//         showToast(toastMessage, 'warning');
//         // Reset to empty
//         setLines(currentLines => currentLines.map(line =>
//             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//         ));
//     }
// };

//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
//     const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
//     const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } if (timesheetData.Status?.toUpperCase() === 'REJECTED') { showToast("For rejected timesheets, hours will be zeroed out upon saving.", "info"); setLines(currentLines => currentLines.map(line => selectedLines.has(line.id) ? { ...line, hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } } : line)); } else { setLines(currentLines => { const idsToDelete = [...selectedLines].filter(id => typeof id === 'number' || !String(id).startsWith('temp-')); if (idsToDelete.length > 0) { setLinesToDelete(prev => [...new Set([...prev, ...idsToDelete])]); } return currentLines.filter(line => !selectedLines.has(line.id)); }); } setSelectedLines(new Set()); };
    
//     const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { days.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);
    
//     const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { days.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };
    
//     const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

//     const toggleColumnVisibility = (columnName) => {
//         setHiddenColumns(prev => ({
//             ...prev,
//             [columnName]: !prev[columnName]
//         }));
//     };

//     const showAllHiddenColumns = () => {
//         const allVisible = {};
//         Object.keys(hiddenColumns).forEach(col => {
//             allVisible[col] = false;
//         });
//         setHiddenColumns(allVisible);
//     };

//     const handleSave = async () => {
//         setIsCurrentlySaving(true);
//         const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
//         lines.forEach(line => { days.forEach(day => { finalTotals[day] += parseFloat(line.hours[day]) || 0; }); });
//         const invalidDay = days.find(day => finalTotals[day] > 24);
//         if (invalidDay) {
//             showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
//             setIsCurrentlySaving(false);
//             return;
//         }

//         const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
//         if (grandTotalForSave === 0) {
//             showToast("Cannot save a timesheet with zero hours.", "warning");
//             setIsCurrentlySaving(false);
//             return;
//         }

//         const promises = [];
//         const weekDates = getWeekDates(timesheetData.Date);
//         const API_BASE_URL = backendUrl


//         linesToDelete.forEach(id => {
//             if (typeof id === 'number' || !id.startsWith('temp-')) {
//                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
//             }
//         });
//         lines.forEach(currentLine => {
//             const initialLine = initialLines.find(l => l.id === currentLine.id);
//             if (!initialLine) {
//                 const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
//                 if (totalHours > 0) {
//                     const payload = {
//                         Description: currentLine.description || 'New Timesheet Line',
//                         ProjId: currentLine.project || '',
//                         Plc: currentLine.plc || '',
//                         PayType: currentLine.payType || 'SR',
//                         PoNumber: currentLine.poNumber || '',
//                         RlseNumber: currentLine.rlseNumber || "0",
//                         Resource_Id: String(timesheetData["Employee ID"]),
//                         PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
//                         Timesheet_Date: new Date(timesheetData.Date).toISOString(),
//                         CreatedBy: String(timesheetData["Employee ID"]),
//                         TimesheetHours: days.map(day => ({
//                             Ts_Date: weekDates[day],
//                             Hours: currentLine.hours[day] || 0
//                         }))
//                     };
//                     promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                 }
//                 return;
//             }
//             days.forEach(day => {
//                 const initialHour = initialLine.hours[day]; const currentHour = currentLine.hours[day];
//                 if (initialHour !== currentHour) {
//                     const hourId = currentLine.hourIds[day];
//                     if (hourId) {
//                         const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`; const payload = { id: hourId, ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
//                         promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                     } else {
//                         const url = `${API_BASE_URL}/api/TimesheetHours`; const payload = { ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
//                         promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                     }
//                 }
//             });
//         });

//         if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }

//         try {
//             const responses = await Promise.all(promises);
//             for (const response of responses) { if (!response.ok) { const errorText = await response.text(); throw new Error(`Failed to save changes: ${errorText}`); } }
//             showToast('Timesheet saved successfully!', 'success');
//             onSave();
//             setTimeout(() => { window.location.reload(); }, 1000);
//         } catch (error) { 
//             showToast(error.message, 'error'); 
//             console.error("Save error:", error);
//             setIsCurrentlySaving(false);
//         }
//     };

//     if (isLoading) { return <div className="text-center p-8">Loading...</div>; }

//     const workOrderOptions = Array.from(new Map(purchaseOrderData.flatMap(item => (item.resourceDesc || []).map(desc => { const label = `${item.wa_Code} - ${desc}`; return [label, { value: label, label: label }]; }))).values());
//     const hiddenCount = Object.values(hiddenColumns).filter(val => val).length;
//     const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden).map(([col]) => col);

//     return (
//         <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
//             <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
//                 <div className="flex flex-col">
//                     {/* <h3 className="text-lg font-semibold text-gray-900">Timesheet Details</h3> */}
//                     {timesheetDetails && (
//                         <div className="flex gap-4 mt-2 text-sm text-gray-600">
//                             <div><span className="font-medium">Status:</span> {timesheetDetails?.status || 'N/A'}</div>
//                             <div><span className="font-medium">Date:</span> {timesheetDetails?.timesheet_Date ? formatDate(timesheetDetails.timesheet_Date) : 'N/A'}</div>
//                             <div><span className="font-medium">Approved By:</span> {timesheetDetails?.approvedBy || 'N/A'}</div>
//                             <div><span className="font-medium">Approve Date:</span> {timesheetDetails?.approveDate ? formatDate(timesheetDetails.approveDate) : 'N/A'}</div>
//                         </div>
//                     )}
//                 </div>
//                 {isEditable &&
//                     <div className="flex items-center gap-2">
//                         <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
//                         <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
//                         <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
//                     </div>
//                 }
//             </div>

//             {/* Hidden Columns Indicator with Individual Column Buttons */}
//             {hiddenCount > 0 && (
//                 <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
//                     <div className="flex items-center gap-2">
//                         <EyeIcon className="h-4 w-4 text-blue-600" />
//                         <span className="text-sm font-medium text-gray-700">
//                             {hiddenCount} column{hiddenCount > 1 ? 's' : ''} hidden:
//                         </span>
//                     </div>
//                     <div className="flex gap-2 flex-wrap">
//                         {hiddenColumnsList.map(col => (
//                             <button
//                                 key={col}
//                                 onClick={() => toggleColumnVisibility(col)}
//                                 className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer"
//                             >
//                                 {col}
//                             </button>
//                         ))}
//                         <button
//                             onClick={showAllHiddenColumns}
//                             className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer"
//                         >
//                             Show All
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div className="p-4 max-h-[65vh] overflow-auto">
//                 <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                     <table className="w-full text-sm min-w-[1600px]">
//                         {/* <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
//                             <tr>
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
//                                 {hideableColumns.map(col => (
//                                     !hiddenColumns[col] && (
//                                         <th 
//                                             key={col} 
//                                             className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap cursor-pointer hover:bg-slate-200/50 transition-colors"
//                                             onClick={() => toggleColumnVisibility(col)}
//                                             title="Click to hide"
//                                         >
//                                             {col}
//                                         </th>
//                                     )
//                                 ))}
//                                 {headerDates.map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
//                             </tr>
//                         </thead> */}
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
//     <tr>
//         <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
//         <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
//         {hideableColumns.map(col => (
//             !hiddenColumns[col] && (
//                 <th 
//                     key={col} 
//                     className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
//                 >
//                     <div className="flex items-center justify-between gap-2 group">
//                         <span>{col}</span>
//                         <button
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleColumnVisibility(col);
//                             }}
//                             className="p-1 hover:bg-red-100 rounded-full transition-colors"
//                             title="Hide column"
//                             type="button"
//                         >
//                             <XIcon className="h-3.5 w-3.5 text-red-600" />
//                         </button>
//                     </div>
//                 </th>
//             )
//         ))}
//         {headerDates.map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}
//         <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
//     </tr>
// </thead>

//                         <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                             {lines.map((line, index) => {
//                                 const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                                 return (
//                                 <tr key={line.id} className="hover:bg-slate-50/50">
//                                     <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={!isEditable} /></td>
//                                     <td className="p-3 text-center text-gray-500">{index + 1}</td>
//                                     {!hiddenColumns['Work Order'] && (
//                                         <td className="p-2 min-w-[250px]">
//                                             <CascadingSelect 
//                                                 label="Work Order" 
//                                                 options={workOrderOptions} 
//                                                 value={line.workOrder} 
//                                                 onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} 
//                                                 disabled={!isEditable} 
//                                             />
//                                         </td>
//                                     )}
//                                     {!hiddenColumns['Description'] && (
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly/></td>
//                                     )}
//                                     {!hiddenColumns['Project'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PLC'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['Pay Type'] && (
//                                         <td className="p-2 min-w-[120px]">
//                                             <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md" disabled={!isEditable}>
//                                                 <option value="SR">SR (Subcontractor Regular)</option>
//                                                 <option value="SO">SO (Subcontractor Overtime)</option>
//                                             </select>
//                                         </td>
//                                     )}
//                                     {!hiddenColumns['PO Number'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['RLSE Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PO Line Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                     )}
//                                     {days.map((day, dayIndex) => {
//                                         const isWeekend = day === 'sat' || day === 'sun';
//                                         return (
//                                             <td key={day} className="p-2">
//                                                 <input 
//                                                     type="number" 
//                                                     step="0.5" 
//                                                     value={line.hours[day]} 
//                                                     onChange={e => handleHourChange(line.id, day, e.target.value)} 
//                                                     className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || !isEditable ? 'bg-gray-100' : 'bg-white'} ${!isEditable ? 'cursor-not-allowed' : ''}`} 
//                                                     disabled={!isEditable} 
//                                                 />
//                                             </td>
//                                         );
//                                     })}
//                                     <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                 </tr>
//                                 );
//                             })}
//                         </tbody>
//                         <tfoot className="bg-slate-200/80 font-semibold sticky bottom-0">
//                             <tr className="border-t-2 border-gray-300">
//                                 <td colSpan={2 + hideableColumns.filter(col => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>
//                                 {days.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
//                                 <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//             </div>

//             <div className="mt-6 flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
//                 <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>
//                 {isEditable &&
//                     <button
//                         onClick={handleSave}
//                         className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={isSaving || isCurrentlySaving}
//                     >
//                         {isCurrentlySaving ? 'Saving...' : 'Save Changes'}
//                     </button>
//                 }
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect, useMemo, useRef } from 'react';
import { backendUrl } from './config.jsx';


// --- SVG Icons ---
const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const EyeIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const XIcon = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


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
    setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, 3000);
};

const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', workOrder: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });
const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

const formatDate = (dateInput) => {
    if (!dateInput) return '';
    let date;
    if (dateInput instanceof Date) { date = dateInput; } 
    else { const dateOnlyString = String(dateInput).split('T')[0]; const parts = dateOnlyString.split('-'); if (parts.length !== 3) return dateInput; const year = parseInt(parts[0], 10); const month = parseInt(parts[1], 10) - 1; const day = parseInt(parts[2], 10); date = new Date(Date.UTC(year, month, day)); }
    if (isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
};

const getWeekDates = (dateString) => {
    const startDate = new Date(dateString); const weekDates = {}; const startDay = startDate.getUTCDay(); const monday = new Date(startDate); monday.setUTCDate(startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)); const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    for (let i = 0; i < 7; i++) { const currentDate = new Date(monday); currentDate.setUTCDate(monday.getUTCDate() + i); const yyyy = currentDate.getUTCFullYear(); const mm = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); const dd = String(currentDate.getUTCDate()).padStart(2, '0'); weekDates[dayKeys[i]] = `${yyyy}-${mm}-${dd}`; }
    return weekDates;
};

const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const hideableColumns = ['Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number'];

export default function TimesheetDetailModal({ timesheetData, onClose, onSave, isSaving }) {
    const [lines, setLines] = useState([]);
    const [selectedLines, setSelectedLines] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [purchaseOrderData, setPurchaseOrderData] = useState([]);
    const [isEditable, setIsEditable] = useState(false);
    const [headerDates, setHeaderDates] = useState([]);
    const [initialLines, setInitialLines] = useState([]);
    const [linesToDelete, setLinesToDelete] = useState([]);
    const [isCurrentlySaving, setIsCurrentlySaving] = useState(false);
    const [timesheetDetails, setTimesheetDetails] = useState(null);
    const [hiddenColumns, setHiddenColumns] = useState({
        'Work Order': false,
        'Description': false,
        'Project': false,
        'PLC': false,
        'Pay Type': false,
        'PO Number': false,
        'RLSE Number': false,
        'PO Line Number': false
    });

    const [poLineBudgets, setPoLineBudgets] = useState({});

    const nextId = useRef(0);

    useEffect(() => {
        if (timesheetData) {
            const status = timesheetData.Status?.toUpperCase();
            setIsEditable(status === 'OPEN' || status === 'REJECTED' || status === 'SUBMITTED');
            fetchTimesheetDetails();
            const startDate = new Date(timesheetData.Date); const startDay = startDate.getUTCDay(); const monday = new Date(startDate); monday.setUTCDate(startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)); const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const newHeaderDates = daysOfWeek.map((day, index) => {
                const currentDate = new Date(monday); currentDate.setUTCDate(monday.getUTCDate() + index); const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); const dt = String(currentDate.getUTCDate()).padStart(2, '0');
                return `${day} ${month}/${dt}`;
            });
            setHeaderDates(newHeaderDates);
        }
    }, [timesheetData]);

    const fetchTimesheetDetails = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${backendUrl}
/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);
            if (!response.ok) throw new Error('Failed to fetch timesheet details');
            const data = await response.json();
            
            const poResponse = await fetch(`${backendUrl}
/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);
            if(!poResponse.ok) throw new Error('Failed to fetch purchase order details');
            const poData = await poResponse.json();
            const poDataArray = Array.isArray(poData) ? poData : [];
            setPurchaseOrderData(poDataArray);

            const dataArray = Array.isArray(data) ? data : [];
            const filteredData = dataArray.filter(item => formatDate(item.timesheet_Date) === timesheetData.Date);
            
            if (filteredData.length > 0) {
                setTimesheetDetails(filteredData[0]);
            }

            const mappedLines = filteredData.map(item => {
                const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
                const hourIdsData = {};
                if (item.timesheetHours) {
                    item.timesheetHours.forEach(hourEntry => {
                        const date = new Date(hourEntry.ts_Date + 'T00:00:00Z');
                        if (!isNaN(date.getTime())) {
                            const dayKey = dayKeyMapping[date.getUTCDay()];
                            if (dayKey) {
                                hoursData[dayKey] = hourEntry.hours;
                                hourIdsData[dayKey] = hourEntry.id;
                            }
                        }
                    });
                }
    
                let fullWorkOrderString = '';
                const poEntry = poDataArray.find(po => po.project?.includes(item.projId));
                if (poEntry) {
                    const projectIndex = poEntry.project.indexOf(item.projId);
                    if (projectIndex > -1) {
                        const correspondingDesc = poEntry.resourceDesc[projectIndex];
                        fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
                    }
                }
    
                return {
                    id: item.lineNo,
                    description: item.description || '',
                    project: item.projId || '',
                    plc: item.plc || '',
                    payType: item.payType || 'SR',
                    workOrder: fullWorkOrderString,
                    wa_Code: poEntry?.wa_Code || '',
                    pmUserID: poEntry?.pmUserId || '',
                    poNumber: item.poNumber || '',
                    rlseNumber: item.rlseNumber || '',
                    poLineNumber: item.poLineNumber || '',
                    hours: hoursData,
                    hourIds: hourIdsData
                };
            });

            setLines(mappedLines);
            setInitialLines(JSON.parse(JSON.stringify(mappedLines)));
        } catch (error) { showToast(error.message, 'error'); } 
        finally { setIsLoading(false); }
    };
    
    const handleSelectChange = (id, fieldName, value) => {
        setLines(currentLines => currentLines.map(line => {
            if (line.id === id) {
                let updatedLine = { ...line, [fieldName]: value };
                if (fieldName === 'workOrder') {
                    if (!value) { 
                        const emptyLine = createEmptyLine(id); 
                        return { ...emptyLine, id: line.id }; 
                    }
                    
                    const splitIndex = value.indexOf(' - ');
                    const waCode = splitIndex > -1 ? value.substring(0, splitIndex) : value;
                    const desc = splitIndex > -1 ? value.substring(splitIndex + 3) : '';

                    const selectedWorkOrderData = purchaseOrderData.find(
                        item => item.wa_Code === waCode && (item.resourceDesc || []).includes(desc)
                    );

                    if (selectedWorkOrderData) {
                        updatedLine.wa_Code = selectedWorkOrderData.wa_Code || ''; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);
                        if (descIndex > -1) { updatedLine.description = desc || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || '';
                            // Set budget limit for this line (hardcoded for now, will be from API)
                        setPoLineBudgets(prev => ({
                        ...prev,
                        [id]: 500 // Hardcoded value - replace with API value later
                        }));
                         }
                        else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; }
                    } else { const emptyLine = createEmptyLine(id); return { ...emptyLine, id: line.id }; }
                }
                return updatedLine;
            }
            return line;
        }));
    };

    // const handleHourChange = (id, day, value) => {
    //     if (value === '') {
    //         setLines(currentLines => currentLines.map(line =>
    //             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
    //         ));
    //         return;
    //     }

    //     const numValue = parseFloat(value);
    //     let isValid = true;
    //     let toastMessage = '';

    //     if (isNaN(numValue) || numValue < 0 || numValue > 24) {
    //         isValid = false;
    //         toastMessage = 'Hours must be between 0 and 24.';
    //     } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
    //         isValid = false;
    //         toastMessage = 'Hours must be in 0.5 increments.';
    //     } else {
    //         const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
    //         const newColumnTotal = otherLinesTotal + numValue;
    //         if (newColumnTotal > 24) {
    //             isValid = false;
    //             toastMessage = `Total hours for this day cannot exceed 24.`;
    //         }
    //     }

    //      // NEW: Check PO Line budget limit
    // // if (isValid && poLineBudgets[id]) {
    // //     const currentLine = lines.find(line => line.id === id);
    // //     if (currentLine) {
    // //         // Calculate total hours for this line including the new value
    // //         const currentLineTotal = Object.keys(currentLine.hours).reduce((sum, d) => {
    // //             if (d === day) {
    // //                 return sum + numValue;
    // //             }
    // //             return sum + (parseFloat(currentLine.hours[d]) || 0);
    // //         }, 0);

    // //         if (currentLineTotal > poLineBudgets[id]) {
    // //             isValid = false;
    // //             toastMessage = `Total hours for this PO Line cannot exceed ${poLineBudgets[id]} hours. Current total would be: ${currentLineTotal.toFixed(1)}`;
    // //         }
    // //     }
    // // }
    // if (isValid && poLineBudgets[id]) {
    //     const budgetLimit = poLineBudgets[id];
        
    //     // Check if the hours entered for THIS DAY exceed the budget limit
    //     if (numValue > budgetLimit) {
    //         isValid = false;
    //         toastMessage = `Hours for this day cannot exceed PO Line budget of ${budgetLimit} hours.`;
    //     }
    // }

    //     if (isValid) {
    //         setLines(currentLines => currentLines.map(line =>
    //             line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
    //         ));
    //     } else {
    //         showToast(toastMessage, 'warning');
    //         setLines(currentLines => currentLines.map(line =>
    //             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
    //         ));
    //     }
    // };
    
    const handleHourChange = (id, day, value) => {
    if (value === '') {
        setLines(currentLines => currentLines.map(line =>
            line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
        ));
        return;
    }

    const numValue = parseFloat(value);
    let isValid = true;
    let toastMessage = '';

    // VALIDATION 1: Basic hour constraints (0-24, 0.5 increments)
    if (isNaN(numValue) || numValue < 0 || numValue > 24) {
        isValid = false;
        toastMessage = 'Hours must be between 0 and 24.';
    } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
        isValid = false;
        toastMessage = 'Hours must be in 0.5 increments.';
    }

    // VALIDATION 3: PO Line budget limit for THIS SPECIFIC DAY
    if (isValid && poLineBudgets[id]) {
        const budgetLimit = poLineBudgets[id];
        
        // Check if the hours entered for THIS DAY exceed the PO Line budget limit
        if (numValue > budgetLimit) {
            isValid = false;
            toastMessage = `Hours for this PO Line on this day cannot exceed ${budgetLimit} hours.`;
        }
    }
    
    // VALIDATION 2: Daily column total (all lines combined) cannot exceed 24
    if (isValid) {
        const otherLinesTotal = lines
            .filter(line => line.id !== id)
            .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
        const newColumnTotal = otherLinesTotal + numValue;
        
        if (newColumnTotal > 24) {
            isValid = false;
            toastMessage = `Total hours for this day cannot exceed 24.`;
        }
    }

    

    // Apply the change if valid, otherwise show error
    if (isValid) {
        setLines(currentLines => currentLines.map(line =>
            line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
        ));
    } else {
        showToast(toastMessage, 'warning');
        // Reset to empty
        setLines(currentLines => currentLines.map(line =>
            line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
        ));
    }
};

    const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
    const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
    const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } if (timesheetData.Status?.toUpperCase() === 'REJECTED') { showToast("For rejected timesheets, hours will be zeroed out upon saving.", "info"); setLines(currentLines => currentLines.map(line => selectedLines.has(line.id) ? { ...line, hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } } : line)); } else { setLines(currentLines => { const idsToDelete = [...selectedLines].filter(id => typeof id === 'number' || !String(id).startsWith('temp-')); if (idsToDelete.length > 0) { setLinesToDelete(prev => [...new Set([...prev, ...idsToDelete])]); } return currentLines.filter(line => !selectedLines.has(line.id)); }); } setSelectedLines(new Set()); };
    
    const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { days.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);
    
    const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { days.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };
    
    const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

    const toggleColumnVisibility = (columnName) => {
        setHiddenColumns(prev => ({
            ...prev,
            [columnName]: !prev[columnName]
        }));
    };

    const showAllHiddenColumns = () => {
        const allVisible = {};
        Object.keys(hiddenColumns).forEach(col => {
            allVisible[col] = false;
        });
        setHiddenColumns(allVisible);
    };

    // const handleSave = async () => {
    //     setIsCurrentlySaving(true);
    //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    //     lines.forEach(line => { days.forEach(day => { finalTotals[day] += parseFloat(line.hours[day]) || 0; }); });
    //     const invalidDay = days.find(day => finalTotals[day] > 24);
    //     if (invalidDay) {
    //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
    //         setIsCurrentlySaving(false);
    //         return;
    //     }

    //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
    //     if (grandTotalForSave === 0) {
    //         showToast("Cannot save a timesheet with zero hours.", "warning");
    //         setIsCurrentlySaving(false);
    //         return;
    //     }

    //     const promises = [];
    //     const weekDates = getWeekDates(timesheetData.Date);
    //     const API_BASE_URL = backendUrl


    //     linesToDelete.forEach(id => {
    //         if (typeof id === 'number' || !id.startsWith('temp-')) {
    //             promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
    //         }
    //     });
    //     lines.forEach(currentLine => {
    //         const initialLine = initialLines.find(l => l.id === currentLine.id);
    //         if (!initialLine) {
    //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
    //             if (totalHours > 0) {
    //                 const payload = {
    //                     Description: currentLine.description || 'New Timesheet Line',
    //                     ProjId: currentLine.project || '',
    //                     Plc: currentLine.plc || '',
    //                     PayType: currentLine.payType || 'SR',
    //                     PoNumber: currentLine.poNumber || '',
    //                     RlseNumber: currentLine.rlseNumber || "0",
    //                     Resource_Id: String(timesheetData["Employee ID"]),
    //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
    //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
    //                     CreatedBy: String(timesheetData["Employee ID"]),
    //                     TimesheetHours: days.map(day => ({
    //                         Ts_Date: weekDates[day],
    //                         Hours: currentLine.hours[day] || 0
    //                     }))
    //                 };
    //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
    //             }
    //             return;
    //         }
    //         days.forEach(day => {
    //             const initialHour = initialLine.hours[day]; const currentHour = currentLine.hours[day];
    //             if (initialHour !== currentHour) {
    //                 const hourId = currentLine.hourIds[day];
    //                 if (hourId) {
    //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`; const payload = { id: hourId, ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
    //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
    //                 } else {
    //                     const url = `${API_BASE_URL}/api/TimesheetHours`; const payload = { ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
    //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
    //                 }
    //             }
    //         });
    //     });

    //     if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }

    //     try {
    //         const responses = await Promise.all(promises);
    //         for (const response of responses) { if (!response.ok) { const errorText = await response.text(); throw new Error(`Failed to save changes: ${errorText}`); } }
    //         showToast('Timesheet saved successfully!', 'success');
    //         onSave();
    //         setTimeout(() => { window.location.reload(); }, 1000);
    //     } catch (error) { 
    //         showToast(error.message, 'error'); 
    //         console.error("Save error:", error);
    //         setIsCurrentlySaving(false);
    //     }
    // };

    const handleSave = async () => {
    setIsCurrentlySaving(true);
    const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    lines.forEach(line => { days.forEach(day => { finalTotals[day] += parseFloat(line.hours[day]) || 0; }); });
    const invalidDay = days.find(day => finalTotals[day] > 24);
    if (invalidDay) {
        showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
        setIsCurrentlySaving(false);
        return;
    }

    const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
    if (grandTotalForSave === 0) {
        showToast("Cannot save a timesheet with zero hours.", "warning");
        setIsCurrentlySaving(false);
        return;
    }

    const promises = [];
    const weekDates = getWeekDates(timesheetData.Date);
    const API_BASE_URL = backendUrl;

    linesToDelete.forEach(id => {
        if (typeof id === 'number' || !id.startsWith('temp-')) {
            promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
        }
    });
    
    lines.forEach(currentLine => {
        const initialLine = initialLines.find(l => l.id === currentLine.id);
        if (!initialLine) {
            const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
            if (totalHours > 0) {
                const payload = {
                    Description: currentLine.description || 'New Timesheet Line',
                    ProjId: currentLine.project || '',
                    Plc: currentLine.plc || '',
                    PayType: currentLine.payType || 'SR',
                    PoNumber: currentLine.poNumber || '',
                    RlseNumber: currentLine.rlseNumber || "0",
                    Resource_Id: String(timesheetData["Employee ID"]),
                    PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
                    Timesheet_Date: new Date(timesheetData.Date).toISOString(),
                    CreatedBy: String(timesheetData["Employee ID"]),
                    TimesheetHours: days.map(day => {
                        // Convert empty/null/undefined hours to 0
                        let hourValue = currentLine.hours[day];
                        if (hourValue === '' || hourValue === null || hourValue === undefined) {
                            hourValue = 0;
                        } else {
                            hourValue = parseFloat(hourValue);
                            if (isNaN(hourValue)) {
                                hourValue = 0;
                            }
                        }
                        return {
                            Ts_Date: weekDates[day],
                            Hours: hourValue
                        };
                    })
                };
                promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
            }
            return;
        }
        
        days.forEach(day => {
            const initialHour = initialLine.hours[day];
            const currentHour = currentLine.hours[day];
            if (initialHour !== currentHour) {
                const hourId = currentLine.hourIds[day];
                
                // Convert empty/null/undefined hours to 0
                let hourValue = currentHour;
                if (hourValue === '' || hourValue === null || hourValue === undefined) {
                    hourValue = 0;
                } else {
                    hourValue = parseFloat(hourValue);
                    if (isNaN(hourValue)) {
                        hourValue = 0;
                    }
                }
                
                if (hourId) {
                    const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
                    const payload = { 
                        id: hourId, 
                        ts_Date: weekDates[day], 
                        hours: hourValue, 
                        lineNo: currentLine.id 
                    };
                    promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
                } else {
                    const url = `${API_BASE_URL}/api/TimesheetHours`;
                    const payload = { 
                        ts_Date: weekDates[day], 
                        hours: hourValue, 
                        lineNo: currentLine.id 
                    };
                    promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
                }
            }
        });
    });

    if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }

    try {
        const responses = await Promise.all(promises);
        for (const response of responses) { 
            if (!response.ok) { 
                const errorText = await response.text(); 
                throw new Error(`Failed to save changes: ${errorText}`); 
            } 
        }
        showToast('Timesheet saved successfully!', 'success');
        onSave();
        setTimeout(() => { window.location.reload(); }, 1000);
    } catch (error) { 
        showToast(error.message, 'error'); 
        console.error("Save error:", error);
        setIsCurrentlySaving(false);
    }
};


    if (isLoading) { return <div className="text-center p-8">Loading...</div>; }

    const workOrderOptions = Array.from(new Map(purchaseOrderData.flatMap(item => (item.resourceDesc || []).map(desc => { const label = `${item.wa_Code} - ${desc}`; return [label, { value: label, label: label }]; }))).values());
    const hiddenCount = Object.values(hiddenColumns).filter(val => val).length;
    const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden).map(([col]) => col);

    return (
        <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
            <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
                <div className="flex flex-col">
                    {/* <h3 className="text-lg font-semibold text-gray-900">Timesheet Details</h3> */}
                    {timesheetDetails && (
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                            <div><span className="font-medium">Status:</span> {timesheetDetails?.status || 'N/A'}</div>
                            <div><span className="font-medium">Date:</span> {timesheetDetails?.timesheet_Date ? formatDate(timesheetDetails.timesheet_Date) : 'N/A'}</div>
                            <div><span className="font-medium">Approved By:</span> {timesheetDetails?.approvedBy || 'N/A'}</div>
                            <div><span className="font-medium">Approve Date:</span> {timesheetDetails?.approveDate ? formatDate(timesheetDetails.approveDate) : 'N/A'}</div>
                        </div>
                    )}
                </div>
                {isEditable &&
                    <div className="flex items-center gap-2">
                        <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
                        <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
                        <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
                    </div>
                }
            </div>

            {/* Hidden Columns Indicator with Individual Column Buttons */}
            {hiddenCount > 0 && (
                <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                        <EyeIcon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700">
                            {hiddenCount} column{hiddenCount > 1 ? 's' : ''} hidden:
                        </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {hiddenColumnsList.map(col => (
                            <button
                                key={col}
                                onClick={() => toggleColumnVisibility(col)}
                                className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer"
                            >
                                {col}
                            </button>
                        ))}
                        <button
                            onClick={showAllHiddenColumns}
                            className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer"
                        >
                            Show All
                        </button>
                    </div>
                </div>
            )}

            <div className="p-4 max-h-[65vh] overflow-auto">
                <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
                    <table className="w-full text-sm min-w-[1600px]">
                        {/* <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
                                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
                                {hideableColumns.map(col => (
                                    !hiddenColumns[col] && (
                                        <th 
                                            key={col} 
                                            className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap cursor-pointer hover:bg-slate-200/50 transition-colors"
                                            onClick={() => toggleColumnVisibility(col)}
                                            title="Click to hide"
                                        >
                                            {col}
                                        </th>
                                    )
                                ))}
                                {headerDates.map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}
                                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
                            </tr>
                        </thead> */}
                        <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
    <tr>
        <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
        <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
        {hideableColumns.map(col => (
            !hiddenColumns[col] && (
                <th 
                    key={col} 
                    className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                >
                    <div className="flex items-center justify-between gap-2 group">
                        <span>{col}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleColumnVisibility(col);
                            }}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            title="Hide column"
                            type="button"
                        >
                            <XIcon className="h-3.5 w-3.5 text-red-600" />
                        </button>
                    </div>
                </th>
            )
        ))}
        {headerDates.map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}
        <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
    </tr>
</thead>

                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => {
                                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
                                return (
                                <tr key={line.id} className="hover:bg-slate-50/50">
                                    <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={!isEditable} /></td>
                                    <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                    {!hiddenColumns['Work Order'] && (
                                        <td className="p-2 min-w-[250px]">
                                            <CascadingSelect 
                                                label="Work Order" 
                                                options={workOrderOptions} 
                                                value={line.workOrder} 
                                                onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} 
                                                disabled={!isEditable} 
                                            />
                                        </td>
                                    )}
                                    {!hiddenColumns['Description'] && (
                                        <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly/></td>
                                    )}
                                    {!hiddenColumns['Project'] && (
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    )}
                                    {!hiddenColumns['PLC'] && (
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    )}
                                    {!hiddenColumns['Pay Type'] && (
                                        <td className="p-2 min-w-[120px]">
                                            <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md" disabled={!isEditable}>
                                                <option value="SR">SR (Subcontractor Regular)</option>
                                                <option value="SO">SO (Subcontractor Overtime)</option>
                                            </select>
                                        </td>
                                    )}
                                    {!hiddenColumns['PO Number'] && (
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    )}
                                    {!hiddenColumns['RLSE Number'] && (
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    )}
                                    {!hiddenColumns['PO Line Number'] && (
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
                                    )}
                                    {days.map((day, dayIndex) => {
                                        const isWeekend = day === 'sat' || day === 'sun';
                                        return (
                                            <td key={day} className="p-2">
                                                <input 
                                                    type="number" 
                                                    step="0.5" 
                                                    value={line.hours[day]} 
                                                    onChange={e => handleHourChange(line.id, day, e.target.value)} 
                                                    className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || !isEditable ? 'bg-gray-100' : 'bg-white'} ${!isEditable ? 'cursor-not-allowed' : ''}`} 
                                                    disabled={!isEditable} 
                                                />
                                            </td>
                                        );
                                    })}
                                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-200/80 font-semibold sticky bottom-0">
                            <tr className="border-t-2 border-gray-300">
                                <td colSpan={2 + hideableColumns.filter(col => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>
                                {days.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
                                <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
                <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>
                {isEditable &&
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSaving || isCurrentlySaving}
                    >
                        {isCurrentlySaving ? 'Saving...' : 'Save Changes'}
                    </button>
                }
            </div>
        </div>
    );
}

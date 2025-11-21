// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { backendUrl } from './config.jsx';

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
//             setIsEditable(status === 'OPEN' || status === 'REJECTED');
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

//     const promises = [];
//     const weekDates = getWeekDates(timesheetData.Date);
//     const API_BASE_URL = backendUrl;

//     // Check if we're only deleting lines (no lines left or all deleted)
//     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

//     // Only check for zero hours if we're not in a deletion-only scenario
//     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
//     if (!isOnlyDeletion && grandTotalForSave === 0) {
//         showToast("Cannot save a timesheet with zero hours.", "warning");
//         setIsCurrentlySaving(false);
//         return;
//     }

//     // Define the current timestamp and user ID
//     const now = new Date().toISOString();
//     const resourceId = timesheetData["Employee ID"];

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
//                     lineNo: 0,
//                     Description: currentLine.description || 'New Timesheet Line',
//                     ProjId: currentLine.project || '',
//                     Plc: currentLine.plc || '',
//                     WorkOrder: currentLine.wa_Code || '',
//                     pm_User_Id: currentLine.pmUserID || '',
//                     PayType: currentLine.payType || 'SR',
//                     PoNumber: currentLine.poNumber || '',
//                     RlseNumber: currentLine.rlseNumber || "0",
//                     Resource_Id: String(timesheetData["Employee ID"]),
//                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
//                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
//                     CreatedBy: String(timesheetData["Employee ID"]),
//                     UpdatedAt: now,
//                     UpdatedBy: String(resourceId),
//                     TimesheetHours: days.map(day => {
//                         let hourValue = currentLine.hours[day];
//                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
//                             hourValue = 0;
//                         } else {
//                             hourValue = parseFloat(hourValue);
//                             if (isNaN(hourValue)) {
//                                 hourValue = 0;
//                             }
//                         }
//                         return {
//                             id: 0,
//                             lineNo: 0,
//                             Ts_Date: weekDates[day],
//                             Hours: hourValue
//                         };
//                     })
//                 };
//                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//             }
//             return;
//         }

//         days.forEach(day => {
//             const initialHour = initialLine.hours[day];
//             const currentHour = currentLine.hours[day];
//             if (initialHour !== currentHour) {
//                 const hourId = currentLine.hourIds[day];

//                 let hourValue = currentHour;
//                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
//                     hourValue = 0;
//                 } else {
//                     hourValue = parseFloat(hourValue);
//                     if (isNaN(hourValue)) {
//                         hourValue = 0;
//                     }
//                 }

//                 if (hourId) {
//                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
//                     const payload = {
//                         id: hourId,
//                         ts_Date: weekDates[day],
//                         hours: hourValue,
//                         lineNo: 0
//                     };
//                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                 } else {
//                     const url = `${API_BASE_URL}/api/TimesheetHours`;
//                     const payload = {
//                         ts_Date: weekDates[day],
//                         hours: hourValue,
//                         lineNo: 0
//                     };
//                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                 }
//             }
//         });
//     });

//     if (promises.length === 0) {
//         showToast("No changes to save.", "info");
//         setIsCurrentlySaving(false);
//         return;
//     }

//     try {
//         const responses = await Promise.all(promises);
//         for (const response of responses) {
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to save changes: ${errorText}`);
//             }
//         }
//         showToast('Timesheet saved successfully!', 'success');
//         onSave();
//         setTimeout(() => { window.location.reload(); }, 1000);
//     } catch (error) {
//         showToast(error.message, 'error');
//         console.error("Save error:", error);
//         setIsCurrentlySaving(false);
//     }
// };

// // const handleSave = async () => {
// //     setIsCurrentlySaving(true);
// //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
// //     lines.forEach(line => { days.forEach(day => { finalTotals[day] += parseFloat(line.hours[day]) || 0; }); });
// //     const invalidDay = days.find(day => finalTotals[day] > 24);
// //     if (invalidDay) {
// //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
// //         setIsCurrentlySaving(false);
// //         return;
// //     }

// //     const promises = [];
// //     const weekDates = getWeekDates(timesheetData.Date);
// //     const API_BASE_URL = backendUrl;

// //     // Check if we're only deleting lines (no lines left or all deleted)
// //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

// //     // Only check for zero hours if we're not in a deletion-only scenario
// //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
// //     if (!isOnlyDeletion && grandTotalForSave === 0) {
// //         showToast("Cannot save a timesheet with zero hours.", "warning");
// //         setIsCurrentlySaving(false);
// //         return;
// //     }

// //     // Define the current timestamp and user ID
// //     // const now = new Date().toISOString();
// //      const now = new Date().toISOString();
// //     // const now = new Date().toISOString().split('T')[0];
// //     const resourceId = timesheetData["Employee ID"];

// //     linesToDelete.forEach(id => {
// //         if (typeof id === 'number' || !id.startsWith('temp-')) {
// //             promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
// //         }
// //     });

// //     lines.forEach(currentLine => {
// //         const initialLine = initialLines.find(l => l.id === currentLine.id);
// //         if (!initialLine) {
// //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
// //             if (totalHours > 0) {
// //                 const payload = {
// //                     Description: currentLine.description || 'New Timesheet Line',
// //                     ProjId: currentLine.project || '',
// //                     Plc: currentLine.plc || '',
// //                     WorkOrder: currentLine.wa_Code || '',
// //                     pm_User_Id: currentLine.pmUserID || '',
// //                     PayType: currentLine.payType || 'SR',
// //                     PoNumber: currentLine.poNumber || '',
// //                     RlseNumber: currentLine.rlseNumber || "0",
// //                     Resource_Id: String(timesheetData["Employee ID"]),
// //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
// //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
// //                     CreatedBy: String(timesheetData["Employee ID"]),
// //                     UpdatedAt: now,
// //                     UpdatedBy: String(resourceId),
// //                     TimesheetHours: days.map(day => {
// //                         let hourValue = currentLine.hours[day];
// //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
// //                             hourValue = 0;
// //                         } else {
// //                             hourValue = parseFloat(hourValue);
// //                             if (isNaN(hourValue)) {
// //                                 hourValue = 0;
// //                             }
// //                         }
// //                         return {
// //                             Ts_Date: weekDates[day],
// //                             Hours: hourValue
// //                         };
// //                     })
// //                 };
// //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //             }
// //             return;
// //         }

// //         days.forEach(day => {
// //             const initialHour = initialLine.hours[day];
// //             const currentHour = currentLine.hours[day];
// //             if (initialHour !== currentHour) {
// //                 const hourId = currentLine.hourIds[day];

// //                 let hourValue = currentHour;
// //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
// //                     hourValue = 0;
// //                 } else {
// //                     hourValue = parseFloat(hourValue);
// //                     if (isNaN(hourValue)) {
// //                         hourValue = 0;
// //                     }
// //                 }

// //                 if (hourId) {
// //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
// //                     const payload = {
// //                         id: hourId,
// //                         ts_Date: weekDates[day],
// //                         hours: hourValue,
// //                         lineNo: currentLine.id
// //                     };
// //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //                 } else {
// //                     const url = `${API_BASE_URL}/api/TimesheetHours`;
// //                     const payload = {
// //                         ts_Date: weekDates[day],
// //                         hours: hourValue,
// //                         lineNo: currentLine.id
// //                     };
// //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //                 }
// //             }
// //         });
// //     });

// //     if (promises.length === 0) {
// //         showToast("No changes to save.", "info");
// //         setIsCurrentlySaving(false);
// //         return;
// //     }

// //     try {
// //         const responses = await Promise.all(promises);
// //         for (const response of responses) {
// //             if (!response.ok) {
// //                 const errorText = await response.text();
// //                 throw new Error(`Failed to save changes: ${errorText}`);
// //             }
// //         }
// //         showToast('Timesheet saved successfully!', 'success');
// //         onSave();
// //         setTimeout(() => { window.location.reload(); }, 1000);
// //     } catch (error) {
// //         showToast(error.message, 'error');
// //         console.error("Save error:", error);
// //         setIsCurrentlySaving(false);
// //     }
// // };

// //     const handleSave = async () => {
// //     setIsCurrentlySaving(true);
// //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
// //     lines.forEach(line => { days.forEach(day => { finalTotals[day] += parseFloat(line.hours[day]) || 0; }); });
// //     const invalidDay = days.find(day => finalTotals[day] > 24);
// //     if (invalidDay) {
// //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
// //         setIsCurrentlySaving(false);
// //         return;
// //     }

// //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
// //     if (grandTotalForSave === 0) {
// //         showToast("Cannot save a timesheet with zero hours.", "warning");
// //         setIsCurrentlySaving(false);
// //         return;
// //     }

// //     const promises = [];
// //     const weekDates = getWeekDates(timesheetData.Date);
// //     const API_BASE_URL = backendUrl;

// //     linesToDelete.forEach(id => {
// //         if (typeof id === 'number' || !id.startsWith('temp-')) {
// //             promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
// //         }
// //     });

// //     lines.forEach(currentLine => {
// //         const initialLine = initialLines.find(l => l.id === currentLine.id);
// //         if (!initialLine) {
// //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
// //             if (totalHours > 0) {
// //                 const payload = {
// //                     Description: currentLine.description || 'New Timesheet Line',
// //                     ProjId: currentLine.project || '',
// //                     Plc: currentLine.plc || '',
// //                     PayType: currentLine.payType || 'SR',
// //                     PoNumber: currentLine.poNumber || '',
// //                     RlseNumber: currentLine.rlseNumber || "0",
// //                     Resource_Id: String(timesheetData["Employee ID"]),
// //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
// //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
// //                     CreatedBy: String(timesheetData["Employee ID"]),
// //                     TimesheetHours: days.map(day => {
// //                         // Convert empty/null/undefined hours to 0
// //                         let hourValue = currentLine.hours[day];
// //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
// //                             hourValue = 0;
// //                         } else {
// //                             hourValue = parseFloat(hourValue);
// //                             if (isNaN(hourValue)) {
// //                                 hourValue = 0;
// //                             }
// //                         }
// //                         return {
// //                             Ts_Date: weekDates[day],
// //                             Hours: hourValue
// //                         };
// //                     })
// //                 };
// //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //             }
// //             return;
// //         }

// //         days.forEach(day => {
// //             const initialHour = initialLine.hours[day];
// //             const currentHour = currentLine.hours[day];
// //             if (initialHour !== currentHour) {
// //                 const hourId = currentLine.hourIds[day];

// //                 // Convert empty/null/undefined hours to 0
// //                 let hourValue = currentHour;
// //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
// //                     hourValue = 0;
// //                 } else {
// //                     hourValue = parseFloat(hourValue);
// //                     if (isNaN(hourValue)) {
// //                         hourValue = 0;
// //                     }
// //                 }

// //                 if (hourId) {
// //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
// //                     const payload = {
// //                         id: hourId,
// //                         ts_Date: weekDates[day],
// //                         hours: hourValue,
// //                         lineNo: currentLine.id
// //                     };
// //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //                 } else {
// //                     const url = `${API_BASE_URL}/api/TimesheetHours`;
// //                     const payload = {
// //                         ts_Date: weekDates[day],
// //                         hours: hourValue,
// //                         lineNo: currentLine.id
// //                     };
// //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
// //                 }
// //             }
// //         });
// //     });

// //     if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }

// //     try {
// //         const responses = await Promise.all(promises);
// //         for (const response of responses) {
// //             if (!response.ok) {
// //                 const errorText = await response.text();
// //                 throw new Error(`Failed to save changes: ${errorText}`);
// //             }
// //         }
// //         showToast('Timesheet saved successfully!', 'success');
// //         onSave();
// //         setTimeout(() => { window.location.reload(); }, 1000);
// //     } catch (error) {
// //         showToast(error.message, 'error');
// //         console.error("Save error:", error);
// //         setIsCurrentlySaving(false);
// //     }
// // };

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

// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { backendUrl } from './config.jsx';

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
// const hideableColumns = ['Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', 'Remaining Hours'];

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
//         'PO Line Number': false,
//         'Remaining Hours': false
//     });

//     const [remainingPoHours, setRemainingPoHours] = useState({});
//     const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);

//     const nextId = useRef(0);

//     useEffect(() => {
//         if (timesheetData) {
//             const status = timesheetData.Status?.toUpperCase();
//             setIsEditable(status === 'OPEN' || status === 'REJECTED');
//             fetchTimesheetDetails();
//             const startDate = new Date(timesheetData.Date); const startDay = startDate.getUTCDay(); const monday = new Date(startDate); monday.setUTCDate(startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)); const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//             const newHeaderDates = daysOfWeek.map((day, index) => {
//                 const currentDate = new Date(monday); currentDate.setUTCDate(monday.getUTCDate() + index); const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0'); const dt = String(currentDate.getUTCDate()).padStart(2, '0');
//                 return `${day} ${month}/${dt}`;
//             });
//             setHeaderDates(newHeaderDates);
//         }
//     }, [timesheetData]);

//     useEffect(() => {
//         if (!timesheetData || !timesheetData["Employee ID"]) return;

//         const fetchRemainingHours = async () => {
//             setIsLoadingRemainingHours(true);
//             const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${timesheetData["Employee ID"]}`;

//             try {
//                 const response = await fetch(API_URL);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();

//                 // Create a map of poLineNumber -> remainingHours for quick lookup
//                 const hoursMap = {};
//                 if (Array.isArray(data)) {
//                     data.forEach(item => {
//                         if (item.poLineNumber) {
//                             hoursMap[item.poLineNumber] = parseFloat(item.remainingHours) || 0;
//                         }
//                     });
//                 }

//                 setRemainingPoHours(hoursMap);
//             } catch (error) {
//                 console.error("Failed to fetch remaining PO hours:", error);
//                 showToast("Could not load remaining PO hours data.", "error");
//             } finally {
//                 setIsLoadingRemainingHours(false);
//             }
//         };

//         fetchRemainingHours();
//     }, [timesheetData]);

//     const fetchTimesheetDetails = async () => {
//         setIsLoading(true);
//         try {
//             const response = await fetch(`${backendUrl}/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);
//             if (!response.ok) throw new Error('Failed to fetch timesheet details');
//             const data = await response.json();

//             const poResponse = await fetch(`${backendUrl}/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);
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
//                         updatedLine.wa_Code = selectedWorkOrderData.wa_Code || '';
//                         updatedLine.pmUserID = selectedWorkOrderData.pmUserId || '';
//                         const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);
//                         if (descIndex > -1) {
//                             updatedLine.description = desc || '';
//                             updatedLine.project = selectedWorkOrderData.project[descIndex] || '';
//                             updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || '';
//                             updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || '';
//                             updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || '';
//                             updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || '';
//                         }
//                         else {
//                             updatedLine.description = '';
//                             updatedLine.project = '';
//                             updatedLine.plc = '';
//                             updatedLine.poNumber = '';
//                             updatedLine.rlseNumber = '';
//                             updatedLine.poLineNumber = '';
//                         }
//                     } else {
//                         const emptyLine = createEmptyLine(id);
//                         return { ...emptyLine, id: line.id };
//                     }
//                 }
//                 return updatedLine;
//             }
//             return line;
//         }));
//     };

//     const handleHourChange = (id, day, value) => {
//         if (value === '') {
//             setLines(currentLines => currentLines.map(line =>
//                 line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//             ));
//             return;
//         }

//         const numValue = parseFloat(value);
//         let isValid = true;
//         let toastMessage = '';

//         if (isNaN(numValue) || numValue < 0 || numValue > 24) {
//             isValid = false;
//             toastMessage = 'Hours must be between 0 and 24.';
//         } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
//             isValid = false;
//             toastMessage = 'Hours must be in 0.5 increments.';
//         } else {
//             // Check daily total validation
//             const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
//             const newColumnTotal = otherLinesTotal + numValue;

//             if (newColumnTotal > 24) {
//                 isValid = false;
//                 toastMessage = `Total hours for this day cannot exceed 24.`;
//             } else {
//                 // Check remaining PO hours validation
//                 const currentLine = lines.find(line => line.id === id);

//                 if (currentLine && currentLine.poLineNumber) {
//                     const poLineNumber = currentLine.poLineNumber;
//                     const remainingHours = remainingPoHours[poLineNumber];

//                     if (remainingHours !== undefined) {
//                         // Calculate current total hours for this line (excluding the day being changed)
//                         const currentLineTotal = days.reduce((sum, d) => {
//                             if (d === day) return sum;
//                             return sum + (parseFloat(currentLine.hours[d]) || 0);
//                         }, 0);

//                         // Calculate total hours for other lines with same PO Line Number
//                         const otherLinesWithSamePO = lines.filter(line =>
//                             line.id !== id && line.poLineNumber === poLineNumber
//                         );

//                         const otherLinesSamePOTotal = otherLinesWithSamePO.reduce((sum, line) => {
//                             return sum + days.reduce((daySum, d) =>
//                                 daySum + (parseFloat(line.hours[d]) || 0), 0
//                             );
//                         }, 0);

//                         const newTotalForPO = currentLineTotal + numValue + otherLinesSamePOTotal;

//                         if (newTotalForPO > remainingHours) {
//                             isValid = false;
//                             toastMessage = `Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}).`;
//                         }
//                     }
//                 }
//             }
//         }

//         if (isValid) {
//             setLines(currentLines => currentLines.map(line =>
//                 line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
//             ));
//         } else {
//             showToast(toastMessage, 'warning');
//             setLines(currentLines => currentLines.map(line =>
//                 line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//             ));
//         }
//     };

//     const getRemainingHoursForLine = (line) => {
//         if (!line.poLineNumber) return null;
//         const remaining = remainingPoHours[line.poLineNumber];
//         if (remaining === undefined) return null;

//         // Calculate used hours for this PO line across all lines
//         const usedHours = lines
//             .filter(l => l.poLineNumber === line.poLineNumber)
//             .reduce((sum, l) => {
//                 return sum + days.reduce((daySum, day) =>
//                     daySum + (parseFloat(l.hours[day]) || 0), 0
//                 );
//             }, 0);

//         return (remaining - usedHours).toFixed(2);
//     };

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

//     const promises = [];
//     const weekDates = getWeekDates(timesheetData.Date);
//     const API_BASE_URL = backendUrl;

//     // Check if we're only deleting lines (no lines left or all deleted)
//     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

//     // Only check for zero hours if we're not in a deletion-only scenario
//     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
//     if (!isOnlyDeletion && grandTotalForSave === 0) {
//         showToast("Cannot save a timesheet with zero hours.", "warning");
//         setIsCurrentlySaving(false);
//         return;
//     }

//     // Define the current timestamp and user ID
//     const now = new Date().toISOString();
//     const resourceId = timesheetData["Employee ID"];

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
//                     lineNo: 0,
//                     Description: currentLine.description || 'New Timesheet Line',
//                     ProjId: currentLine.project || '',
//                     Plc: currentLine.plc || '',
//                     WorkOrder: currentLine.wa_Code || '',
//                     pm_User_Id: currentLine.pmUserID || '',
//                     PayType: currentLine.payType || 'SR',
//                     PoNumber: currentLine.poNumber || '',
//                     RlseNumber: currentLine.rlseNumber || "0",
//                     Resource_Id: String(timesheetData["Employee ID"]),
//                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
//                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
//                     CreatedBy: String(timesheetData["Employee ID"]),
//                     UpdatedAt: now,
//                     UpdatedBy: String(resourceId),
//                     TimesheetHours: days.map(day => {
//                         let hourValue = currentLine.hours[day];
//                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
//                             hourValue = 0;
//                         } else {
//                             hourValue = parseFloat(hourValue);
//                             if (isNaN(hourValue)) {
//                                 hourValue = 0;
//                             }
//                         }
//                         return {
//                             id: 0,
//                             lineNo: 0,
//                             Ts_Date: weekDates[day],
//                             Hours: hourValue
//                         };
//                     })
//                 };
//                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//             }
//             return;
//         }

//         days.forEach(day => {
//             const initialHour = initialLine.hours[day];
//             const currentHour = currentLine.hours[day];
//             if (initialHour !== currentHour) {
//                 const hourId = currentLine.hourIds[day];

//                 let hourValue = currentHour;
//                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
//                     hourValue = 0;
//                 } else {
//                     hourValue = parseFloat(hourValue);
//                     if (isNaN(hourValue)) {
//                         hourValue = 0;
//                     }
//                 }

//                 if (hourId) {
//                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
//                     const payload = {
//                         id: hourId,
//                         ts_Date: weekDates[day],
//                         hours: hourValue,
//                         lineNo: 0
//                     };
//                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                 } else {
//                     const url = `${API_BASE_URL}/api/TimesheetHours`;
//                     const payload = {
//                         ts_Date: weekDates[day],
//                         hours: hourValue,
//                         lineNo: 0
//                     };
//                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
//                 }
//             }
//         });
//     });

//     if (promises.length === 0) {
//         showToast("No changes to save.", "info");
//         setIsCurrentlySaving(false);
//         return;
//     }

//     try {
//         const responses = await Promise.all(promises);
//         for (const response of responses) {
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Failed to save changes: ${errorText}`);
//             }
//         }
//         showToast('Timesheet saved successfully!', 'success');
//         onSave();
//         setTimeout(() => { window.location.reload(); }, 1000);
//     } catch (error) {
//         showToast(error.message, 'error');
//         console.error("Save error:", error);
//         setIsCurrentlySaving(false);
//     }
// };

//     if (isLoading) { return <div className="text-center p-8">Loading...</div>; }

//     const workOrderOptions = Array.from(new Map(purchaseOrderData.flatMap(item => (item.resourceDesc || []).map(desc => { const label = `${item.wa_Code} - ${desc}`; return [label, { value: label, label: label }]; }))).values());
//     const hiddenCount = Object.values(hiddenColumns).filter(val => val).length;
//     const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden).map(([col]) => col);

//     return (
//         <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
//             <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
//                 <div className="flex flex-col">
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
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
//                             <tr>
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
//                                 {hideableColumns.map(col => (
//                                     !hiddenColumns[col] && (
//                                         <th
//                                             key={col}
//                                             className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
//                                         >
//                                             <div className="flex items-center justify-between gap-2 group">
//                                                 <span>{col}</span>
//                                                 <button
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         toggleColumnVisibility(col);
//                                                     }}
//                                                     className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                                                     title="Hide column"
//                                                     type="button"
//                                                 >
//                                                     <XIcon className="h-3.5 w-3.5 text-red-600" />
//                                                 </button>
//                                             </div>
//                                         </th>
//                                     )
//                                 ))}
//                                 {headerDates.map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}
//                                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
//                             </tr>
//                         </thead>
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
//                                     {!hiddenColumns['Remaining Hours'] && (
//                                         <td className="p-2 min-w-[120px]">
//                                             {line.poLineNumber && remainingPoHours[line.poLineNumber] !== undefined ? (
//                                                 <div className="text-xs font-medium text-center">
//                                                     <span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
//                                                         {getRemainingHoursForLine(line)} hrs
//                                                     </span>
//                                                 </div>
//                                             ) : (
//                                                 <div className="text-xs font-medium text-center text-gray-400">-</div>
//                                             )}
//                                         </td>
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

import React, { useState, useEffect, useMemo, useRef } from "react";
import { backendUrl } from "./config.jsx";

// --- SVG Icons ---
const PlusIcon = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);
const CopyIcon = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
    />
  </svg>
);
const TrashIcon = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);
const EyeIcon = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const XIcon = ({ className = "h-4 w-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- ActionButton Component ---
const ActionButton = ({
  children,
  onClick,
  variant = "secondary",
  icon,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
  const variants = {
    primary:
      "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
    secondary:
      "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
  };
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// --- Toast Notification ---
const showToast = (message, type = "info") => {
  const toast = document.createElement("div");
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-500",
  };
  toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${
    typeClasses[type] || typeClasses["info"]
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
};

const createEmptyLine = (id) => ({
  id,
  description: "",
  project: "",
  plc: "",
  workOrder: "",
  wa_Code: "",
  pmUserID: "",
  payType: "SR",
  poNumber: "",
  rlseNumber: "",
  poLineNumber: "",
  hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
  hourIds: {},
});
const CascadingSelect = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
}) => (
  <select
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
      disabled ? "bg-gray-100 cursor-not-allowed" : ""
    }`}
  >
    <option value="">Select {label}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

const formatDate = (dateInput) => {
  if (!dateInput) return "";
  let date;
  if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    const dateOnlyString = String(dateInput).split("T")[0];
    const parts = dateOnlyString.split("-");
    if (parts.length !== 3) return dateInput;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    date = new Date(Date.UTC(year, month, day));
  }
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};

const getWeekDates = (dateString) => {
  const startDate = new Date(dateString);
  const weekDates = {};
  const startDay = startDate.getUTCDay();
  const monday = new Date(startDate);
  monday.setUTCDate(
    startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)
  );
  const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setUTCDate(monday.getUTCDate() + i);
    const yyyy = currentDate.getUTCFullYear();
    const mm = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(currentDate.getUTCDate()).padStart(2, "0");
    weekDates[dayKeys[i]] = `${yyyy}-${mm}-${dd}`;
  }
  return weekDates;
};

const dayKeyMapping = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hideableColumns = [
  "Work Order",
  "Description",
  "Project",
  "PLC",
  "Pay Type",
  "PO Number",
  "RLSE Number",
  "PO Line Number",
  "PO Remaining Hours",
];

export default function TimesheetDetailModal({
  timesheetData,
  onClose,
  onSave,
  isSaving,
}) {
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
    "Work Order": false,
    Description: false,
    Project: false,
    PLC: false,
    "Pay Type": false,
    "PO Number": false,
    "RLSE Number": false,
    "PO Line Number": false,
    "Remaining Hours": false,
  });

  const [remainingPoHours, setRemainingPoHours] = useState({});
  const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);

  const nextId = useRef(0);

  useEffect(() => {
    if (timesheetData) {
      const status = timesheetData.Status?.toUpperCase();
      setIsEditable(
        status === "OPEN" || status === "REJECTED" || status === "CORRECTION"
      );
      fetchTimesheetDetails();
      const startDate = new Date(timesheetData.Date);
      const startDay = startDate.getUTCDay();
      const monday = new Date(startDate);
      monday.setUTCDate(
        startDate.getUTCDate() - startDay + (startDay === 0 ? -6 : 1)
      );
      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const newHeaderDates = daysOfWeek.map((day, index) => {
        const currentDate = new Date(monday);
        currentDate.setUTCDate(monday.getUTCDate() + index);
        const month = String(currentDate.getUTCMonth() + 1).padStart(2, "0");
        const dt = String(currentDate.getUTCDate()).padStart(2, "0");
        return `${day} ${month}/${dt}`;
      });
      setHeaderDates(newHeaderDates);
    }
  }, [timesheetData]);

  useEffect(() => {
    if (!timesheetData || !timesheetData["Employee ID"]) return;

    const fetchRemainingHours = async () => {
      setIsLoadingRemainingHours(true);
      const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${timesheetData["Employee ID"]}`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        // console.log("Remaining PO Hours API Response:", data);

        // Create a map of poLineNumber -> remainingHours for quick lookup
        const hoursMap = {};
        if (Array.isArray(data)) {
          data.forEach((item) => {
            // Handle both camelCase and PascalCase property names
            const poLineNum = String(
              item.poLineNumber || item.PoLineNumber || ""
            ).trim();
            const remainingHrs = parseFloat(
              item.remainingHours || item.RemainingHours || 0
            );

            if (poLineNum) {
              hoursMap[poLineNum] = remainingHrs;
            }
          });
        }

        // console.log("Remaining PO Hours Map:", hoursMap);
        setRemainingPoHours(hoursMap);
      } catch (error) {
        // console.error("Failed to fetch remaining PO hours:", error);
        // showToast("Could not load remaining PO hours data.", "error");
      } finally {
        setIsLoadingRemainingHours(false);
      }
    };

    fetchRemainingHours();
  }, [timesheetData]);

  const fetchTimesheetDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`
      );
      if (!response.ok) throw new Error("Failed to fetch timesheet details");
      const data = await response.json();

      const poResponse = await fetch(
        `${backendUrl}/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`
      );
      if (!poResponse.ok)
        throw new Error("Failed to fetch purchase order details");
      const poData = await poResponse.json();
      const poDataArray = Array.isArray(poData) ? poData : [];
      setPurchaseOrderData(poDataArray);

      const dataArray = Array.isArray(data) ? data : [];
      const filteredData = dataArray.filter(
        (item) => formatDate(item.timesheet_Date) === timesheetData.Date
      );

      if (filteredData.length > 0) {
        setTimesheetDetails(filteredData[0]);
      }

      const mappedLines = filteredData.map((item) => {
        const hoursData = {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
          sun: 0,
        };
        const hourIdsData = {};
        if (item.timesheetHours) {
          item.timesheetHours.forEach((hourEntry) => {
            const date = new Date(hourEntry.ts_Date + "T00:00:00Z");
            if (!isNaN(date.getTime())) {
              const dayKey = dayKeyMapping[date.getUTCDay()];
              if (dayKey) {
                hoursData[dayKey] = hourEntry.hours;
                hourIdsData[dayKey] = hourEntry.id;
              }
            }
          });
        }

        let fullWorkOrderString = "";
        const poEntry = poDataArray.find((po) =>
          po.project?.includes(item.projId)
        );
        if (poEntry) {
          const projectIndex = poEntry.project.indexOf(item.projId);
          if (projectIndex > -1) {
            const correspondingDesc = poEntry.resourceDesc[projectIndex];
            fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
          }
        }

        return {
          id: item.lineNo,
          description: item.description || "",
          project: item.projId || "",
          plc: item.plc || "",
          payType: item.payType || "SR",
          workOrder: fullWorkOrderString,
          wa_Code: poEntry?.wa_Code || "",
          pmUserID: poEntry?.pmUserId || "",
          poNumber: item.poNumber || "",
          rlseNumber: item.rlseNumber || "",
          poLineNumber: item.poLineNumber || "",
          hours: hoursData,
          hourIds: hourIdsData,
        };
      });

      setLines(mappedLines);
      setInitialLines(JSON.parse(JSON.stringify(mappedLines)));
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (id, fieldName, value) => {
    setLines((currentLines) =>
      currentLines.map((line) => {
        if (line.id === id) {
          let updatedLine = { ...line, [fieldName]: value };
          if (fieldName === "workOrder") {
            if (!value) {
              const emptyLine = createEmptyLine(id);
              return { ...emptyLine, id: line.id };
            }

            const splitIndex = value.indexOf(" - ");
            const waCode =
              splitIndex > -1 ? value.substring(0, splitIndex) : value;
            const desc = splitIndex > -1 ? value.substring(splitIndex + 3) : "";

            const selectedWorkOrderData = purchaseOrderData.find(
              (item) =>
                item.wa_Code === waCode &&
                (item.resourceDesc || []).includes(desc)
            );

            if (selectedWorkOrderData) {
              updatedLine.wa_Code = selectedWorkOrderData.wa_Code || "";
              updatedLine.pmUserID = selectedWorkOrderData.pmUserId || "";
              const descIndex =
                selectedWorkOrderData.resourceDesc.indexOf(desc);
              if (descIndex > -1) {
                updatedLine.description = desc || "";
                updatedLine.project =
                  selectedWorkOrderData.project[descIndex] || "";
                updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || "";
                updatedLine.poNumber =
                  selectedWorkOrderData.purchaseOrder[0] || "";
                updatedLine.rlseNumber =
                  selectedWorkOrderData.purchaseOrderRelease[0] || "";
                updatedLine.poLineNumber =
                  selectedWorkOrderData.poLineNumber[descIndex] || "";
              } else {
                updatedLine.description = "";
                updatedLine.project = "";
                updatedLine.plc = "";
                updatedLine.poNumber = "";
                updatedLine.rlseNumber = "";
                updatedLine.poLineNumber = "";
              }
            } else {
              const emptyLine = createEmptyLine(id);
              return { ...emptyLine, id: line.id };
            }
          }
          return updatedLine;
        }
        return line;
      })
    );
  };

  const handleHourChange = (id, day, value) => {
    if (value === "") {
      setLines((currentLines) =>
        currentLines.map((line) =>
          line.id === id
            ? { ...line, hours: { ...line.hours, [day]: "" } }
            : line
        )
      );
      return;
    }

    const numValue = parseFloat(value);
    let isValid = true;
    let toastMessage = "";

    if (isNaN(numValue) || numValue < 0 || numValue > 24) {
      isValid = false;
      toastMessage = "Hours must be between 0 and 24.";
    } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
      isValid = false;
      toastMessage = "Hours must be in 0.5 increments.";
    } else {
      // Check daily total validation
      const otherLinesTotal = lines
        .filter((line) => line.id !== id)
        .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
      const newColumnTotal = otherLinesTotal + numValue;

      if (newColumnTotal > 24) {
        isValid = false;
        toastMessage = `Total hours for this day cannot exceed 24.`;
      } else {
        // Check remaining PO hours validation
        const currentLine = lines.find((line) => line.id === id);

        // if (currentLine && currentLine.poLineNumber) {
        //     const poLineNumber = String(currentLine.poLineNumber).trim();
        //     const remainingHours = remainingPoHours[poLineNumber];

        //     if (remainingHours !== undefined) {
        //         // Calculate current total hours for this line (excluding the day being changed)
        //         const currentLineTotal = days.reduce((sum, d) => {
        //             if (d === day) return sum;
        //             return sum + (parseFloat(currentLine.hours[d]) || 0);
        //         }, 0);

        //         // Calculate total hours for other lines with same PO Line Number
        //         const otherLinesWithSamePO = lines.filter(line =>
        //             line.id !== id && String(line.poLineNumber).trim() === poLineNumber
        //         );

        //         const otherLinesSamePOTotal = otherLinesWithSamePO.reduce((sum, line) => {
        //             return sum + days.reduce((daySum, d) =>
        //                 daySum + (parseFloat(line.hours[d]) || 0), 0
        //             );
        //         }, 0);

        //         const newTotalForPO = currentLineTotal + numValue + otherLinesSamePOTotal;

        //         if (newTotalForPO > remainingHours) {
        //             isValid = false;
        //             toastMessage = `Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}).`;
        //         }
        //     }
        // }
        if (currentLine && currentLine.poLineNumber) {
          const poLineNumber = String(currentLine.poLineNumber).trim();
          const remainingHours = remainingPoHours[poLineNumber];

          if (remainingHours !== undefined) {
            // Calculate NEW hours being added (current UI hours - initial saved hours)
            const initialLine = initialLines.find((l) => l.id === id);

            // Current line total in UI (including the new value being entered)
            const currentLineUITotal = days.reduce((sum, d) => {
              if (d === day) return sum + numValue;
              return sum + (parseFloat(currentLine.hours[d]) || 0);
            }, 0);

            // Initial line total from database
            const initialLineTotal = initialLine
              ? days.reduce(
                  (sum, d) => sum + (parseFloat(initialLine.hours[d]) || 0),
                  0
                )
              : 0;

            // Calculate NEW hours for this line
            const newHoursForThisLine = currentLineUITotal - initialLineTotal;

            // Calculate NEW hours for other lines with same PO
            const otherLinesWithSamePO = lines.filter(
              (line) =>
                line.id !== id &&
                String(line.poLineNumber).trim() === poLineNumber
            );

            const newHoursForOtherLines = otherLinesWithSamePO.reduce(
              (sum, line) => {
                const otherInitialLine = initialLines.find(
                  (l) => l.id === line.id
                );
                const otherUITotal = days.reduce(
                  (daySum, d) => daySum + (parseFloat(line.hours[d]) || 0),
                  0
                );
                const otherInitialTotal = otherInitialLine
                  ? days.reduce(
                      (daySum, d) =>
                        daySum + (parseFloat(otherInitialLine.hours[d]) || 0),
                      0
                    )
                  : 0;
                return sum + (otherUITotal - otherInitialTotal);
              },
              0
            );

            const totalNewHours = newHoursForThisLine + newHoursForOtherLines;

            // Only validate if we're trying to ADD more hours than available
            if (totalNewHours > remainingHours) {
              isValid = false;
              toastMessage = `Cannot exceed remaining PO hours (${remainingHours.toFixed(
                2
              )} hours available for PO Line ${poLineNumber}).`;
            }
          }
        }
      }
    }

    if (isValid) {
      setLines((currentLines) =>
        currentLines.map((line) =>
          line.id === id
            ? { ...line, hours: { ...line.hours, [day]: numValue } }
            : line
        )
      );
    } else {
      showToast(toastMessage, "warning");
      setLines((currentLines) =>
        currentLines.map((line) =>
          line.id === id
            ? { ...line, hours: { ...line.hours, [day]: "" } }
            : line
        )
      );
    }
  };

  // const getRemainingHoursForLine = (line) => {
  //     if (!line.poLineNumber) return null;

  //     // Convert to string for consistent comparison
  //     const poLineNumStr = String(line.poLineNumber).trim();
  //     const remaining = remainingPoHours[poLineNumStr];

  //     if (remaining === undefined) {
  //         console.log(`No remaining hours found for PO Line: ${poLineNumStr}`);
  //         return null;
  //     }

  //     // Calculate used hours for this PO line across all lines
  //     const usedHours = lines
  //         .filter(l => String(l.poLineNumber).trim() === poLineNumStr)
  //         .reduce((sum, l) => {
  //             return sum + days.reduce((daySum, day) =>
  //                 daySum + (parseFloat(l.hours[day]) || 0), 0
  //             );
  //         }, 0);

  //     const remainingAfterUsed = remaining - usedHours;
  //     console.log(`PO Line ${poLineNumStr}: Total Remaining=${remaining}, Used=${usedHours}, After Used=${remainingAfterUsed}`);

  //     return remainingAfterUsed.toFixed(2);
  // };

  //     const getRemainingHoursForLine = (line) => {
  //     if (!line.poLineNumber) return null;

  //     const poLineNumStr = String(line.poLineNumber).trim();
  //     const remaining = remainingPoHours[poLineNumStr];

  //     if (remaining === undefined) return null;

  //     // Calculate how many NEW hours have been added in UI
  //     const initialLine = initialLines.find(l => l.id === line.id);
  //     const currentUITotal = days.reduce((sum, day) =>
  //         sum + (parseFloat(line.hours[day]) || 0), 0
  //     );
  //     const initialTotal = initialLine ? days.reduce((sum, day) =>
  //         sum + (parseFloat(initialLine.hours[day]) || 0), 0
  //     ) : 0;

  //     const newHoursAdded = currentUITotal - initialTotal;

  //     // Show remaining hours that can still be ADDED
  //     const remainingToAdd = remaining - newHoursAdded;

  //     return remainingToAdd.toFixed(2);
  // };

  //     const getRemainingHoursForLine = (line) => {
  //     if (!line.poLineNumber) return null;

  //     // Convert to string for consistent comparison
  //     const poLineNumStr = String(line.poLineNumber).trim();
  //     const remaining = remainingPoHours[poLineNumStr];

  //     if (remaining === undefined) {
  //         console.log(`No remaining hours found for PO Line: ${poLineNumStr}`);
  //         return null;
  //     }

  //     // The API already returns the remaining hours after accounting for used hours
  //     // So we just display it directly
  //     console.log(`PO Line ${poLineNumStr}: Remaining Hours=${remaining}`);

  //     return remaining.toFixed(2);
  // };

  const getRemainingHoursForLine = (line) => {
    if (!line.poLineNumber) return null;

    const poLineNumStr = String(line.poLineNumber).trim();
    const remaining = remainingPoHours[poLineNumStr];

    if (remaining === undefined) return null;

    // Calculate NEW hours added for ALL lines with the same PO Line Number
    const allLinesWithSamePO = lines.filter(
      (l) => String(l.poLineNumber).trim() === poLineNumStr
    );

    const totalNewHoursForPO = allLinesWithSamePO.reduce((sum, l) => {
      const initialLine = initialLines.find((init) => init.id === l.id);
      const currentUITotal = days.reduce(
        (daySum, day) => daySum + (parseFloat(l.hours[day]) || 0),
        0
      );
      const initialTotal = initialLine
        ? days.reduce(
            (daySum, day) => daySum + (parseFloat(initialLine.hours[day]) || 0),
            0
          )
        : 0;

      return sum + (currentUITotal - initialTotal);
    }, 0);

    // Show remaining hours that can still be ADDED across all lines with this PO
    const remainingToAdd = remaining - totalNewHoursForPO;

    return remainingToAdd.toFixed(2);
  };

  const addLine = () =>
    setLines((prev) => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
  const handleSelectLine = (id) => {
    const newSelection = new Set(selectedLines);
    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
    setSelectedLines(newSelection);
  };
  const deleteLines = () => {
    if (selectedLines.size === 0) {
      showToast("Please select lines to delete.", "warning");
      return;
    }
    if (timesheetData.Status?.toUpperCase() === "REJECTED") {
      showToast(
        "For rejected timesheets, hours will be zeroed out upon saving.",
        "info"
      );
      setLines((currentLines) =>
        currentLines.map((line) =>
          selectedLines.has(line.id)
            ? {
                ...line,
                hours: {
                  mon: 0,
                  tue: 0,
                  wed: 0,
                  thu: 0,
                  fri: 0,
                  sat: 0,
                  sun: 0,
                },
              }
            : line
        )
      );
    } else {
      setLines((currentLines) => {
        const idsToDelete = [...selectedLines].filter(
          (id) => typeof id === "number" || !String(id).startsWith("temp-")
        );
        if (idsToDelete.length > 0) {
          setLinesToDelete((prev) => [...new Set([...prev, ...idsToDelete])]);
        }
        return currentLines.filter((line) => !selectedLines.has(line.id));
      });
    }
    setSelectedLines(new Set());
  };

  const dailyTotals = useMemo(() => {
    const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    lines.forEach((line) => {
      days.forEach((day) => {
        totals[day] += parseFloat(line.hours[day]) || 0;
      });
    });
    return totals;
  }, [lines]);

  const copyLines = () => {
    if (selectedLines.size === 0) {
      showToast("Please select lines to copy.", "warning");
      return;
    }
    const linesToCopy = lines.filter((line) => selectedLines.has(line.id));
    const potentialTotals = { ...dailyTotals };
    let validationFailed = false;
    linesToCopy.forEach((lineToCopy) => {
      days.forEach((day) => {
        potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0;
        if (potentialTotals[day] > 24.01) {
          validationFailed = true;
        }
      });
    });
    if (validationFailed) {
      showToast(
        "Cannot copy, as it would cause a daily total to exceed 24 hours.",
        "error"
      );
      return;
    }
    showToast("Line(s) copied.", "info");
    const newLines = linesToCopy.map((line, index) => ({
      ...line,
      hours: { ...line.hours },
      id: `temp-${Date.now()}-${index}`,
      hourIds: {},
    }));
    setLines((prev) => [...prev, ...newLines]);
    setSelectedLines(new Set());
  };

  const grandTotal = Object.values(dailyTotals).reduce(
    (sum, total) => sum + total,
    0
  );

  const toggleColumnVisibility = (columnName) => {
    setHiddenColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
  };

  const showAllHiddenColumns = () => {
    const allVisible = {};
    Object.keys(hiddenColumns).forEach((col) => {
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

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     // Check if we're only deleting lines (no lines left or all deleted)
  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     // Only check for zero hours if we're not in a deletion-only scenario
  //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //         showToast("Cannot save a timesheet with zero hours.", "warning");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     // Define the current timestamp and user ID
  //     const now = new Date().toISOString();
  //     const resourceId = timesheetData["Employee ID"];

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
  //                     lineNo: 0,
  //                     Description: currentLine.description || 'New Timesheet Line',
  //                     ProjId: currentLine.project || '',
  //                     Plc: currentLine.plc || '',
  //                     WorkOrder: currentLine.wa_Code || '',
  //                     pm_User_Id: currentLine.pmUserID || '',
  //                     PayType: currentLine.payType || 'SR',
  //                     PoNumber: currentLine.poNumber || '',
  //                     RlseNumber: currentLine.rlseNumber || "0",
  //                     Resource_Id: String(timesheetData["Employee ID"]),
  //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //                     CreatedBy: String(timesheetData["Employee ID"]),
  //                     UpdatedAt: now,
  //                     UpdatedBy: String(resourceId),
  //                     TimesheetHours: days.map(day => {
  //                         let hourValue = currentLine.hours[day];
  //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                             hourValue = 0;
  //                         } else {
  //                             hourValue = parseFloat(hourValue);
  //                             if (isNaN(hourValue)) {
  //                                 hourValue = 0;
  //                             }
  //                         }
  //                         return {
  //                             id: 0,
  //                             lineNo: 0,
  //                             Ts_Date: weekDates[day],
  //                             Hours: hourValue
  //                         };
  //                     })
  //                 };
  //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //             }
  //             return;
  //         }

  //         days.forEach(day => {
  //             const initialHour = initialLine.hours[day];
  //             const currentHour = currentLine.hours[day];
  //             if (initialHour !== currentHour) {
  //                 const hourId = currentLine.hourIds[day];

  //                 let hourValue = currentHour;
  //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                     hourValue = 0;
  //                 } else {
  //                     hourValue = parseFloat(hourValue);
  //                     if (isNaN(hourValue)) {
  //                         hourValue = 0;
  //                     }
  //                 }

  //                 if (hourId) {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
  //                     const payload = {
  //                         id: hourId,
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         lineNo: 0
  //                     };
  //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 } else {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours`;
  //                     const payload = {
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         lineNo: 0
  //                     };
  //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 }
  //             }
  //         });
  //     });

  //     if (promises.length === 0) {
  //         showToast("No changes to save.", "info");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     try {
  //         const responses = await Promise.all(promises);
  //         for (const response of responses) {
  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Failed to save changes: ${errorText}`);
  //             }
  //         }
  //         showToast('Timesheet saved successfully!', 'success');
  //         onSave();
  //         setTimeout(() => { window.location.reload(); }, 1000);
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         console.error("Save error:", error);
  //         setIsCurrentlySaving(false);
  //     }
  // };

  // const handleSave = async () => {
  //     setIsCurrentlySaving(true);
  //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
  //     lines.forEach(line => {
  //         days.forEach(day => {
  //             finalTotals[day] += parseFloat(line.hours[day]) || 0;
  //         });
  //     });
  //     const invalidDay = days.find(day => finalTotals[day] > 24);
  //     if (invalidDay) {
  //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     // Check if we're only deleting lines (no lines left or all deleted)
  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     // Only check for zero hours if we're not in a deletion-only scenario
  //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //         showToast("Cannot save a timesheet with zero hours.", "warning");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     // Define the current timestamp and user ID
  //     const now = new Date().toISOString();
  //     const resourceId = timesheetData["Employee ID"];

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
  //                     lineNo: 0,
  //                     Description: currentLine.description || 'New Timesheet Line',
  //                     ProjId: currentLine.project || '',
  //                     Plc: currentLine.plc || '',
  //                     WorkOrder: currentLine.wa_Code || '',
  //                     pm_User_Id: currentLine.pmUserID || '',
  //                     PayType: currentLine.payType || 'SR',
  //                     PoNumber: currentLine.poNumber || '',
  //                     RlseNumber: currentLine.rlseNumber || "0",
  //                     Resource_Id: String(timesheetData["Employee ID"]),
  //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //                     CreatedBy: String(timesheetData["Employee ID"]),
  //                     UpdatedAt: now,
  //                     UpdatedBy: String(resourceId),
  //                     TimesheetHours: days.map(day => {
  //                         let hourValue = currentLine.hours[day];
  //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                             hourValue = 0;
  //                         } else {
  //                             hourValue = parseFloat(hourValue);
  //                             if (isNaN(hourValue)) {
  //                                 hourValue = 0;
  //                             }
  //                         }
  //                         return {
  //                             id: 0,
  //                             lineNo: 0,
  //                             Ts_Date: weekDates[day],
  //                             Hours: hourValue
  //                         };
  //                     })
  //                 };
  //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //             }
  //             return;
  //         }

  //         days.forEach(day => {
  //             const initialHour = initialLine.hours[day];
  //             const currentHour = currentLine.hours[day];
  //             if (initialHour !== currentHour) {
  //                 const hourId = currentLine.hourIds[day];

  //                 let hourValue = currentHour;
  //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                     hourValue = 0;
  //                 } else {
  //                     hourValue = parseFloat(hourValue);
  //                     if (isNaN(hourValue)) {
  //                         hourValue = 0;
  //                     }
  //                 }

  //                 if (hourId) {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
  //                     const payload = {
  //                         id: hourId,
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         lineNo: currentLine.lineNo // Updated: now uses currentLine.lineNo
  //                     };
  //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 } else {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours`;
  //                     const payload = {
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         lineNo: 0
  //                     };
  //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 }
  //             }
  //         });
  //     });

  //     if (promises.length === 0) {
  //         showToast("No changes to save.", "info");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     try {
  //         const responses = await Promise.all(promises);
  //         for (const response of responses) {
  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Failed to save changes: ${errorText}`);
  //             }
  //         }
  //         showToast('Timesheet saved successfully!', 'success');
  //         onSave();
  //         setTimeout(() => { window.location.reload(); }, 1000);
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         console.error("Save error:", error);
  //         setIsCurrentlySaving(false);
  //     }
  // };

  // const handleSave = async () => {
  //     setIsCurrentlySaving(true);

  //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
  //     lines.forEach(line => {
  //         days.forEach(day => {
  //             finalTotals[day] += parseFloat(line.hours[day]) || 0;
  //         });
  //     });

  //     const invalidDay = days.find(day => finalTotals[day] > 24);
  //     if (invalidDay) {
  //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //         showToast("Cannot save a timesheet with zero hours.", "warning");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     const now = new Date().toISOString();
  //     const resourceId = timesheetData["Employee ID"];

  //     // Fetch existing timesheet data for the user/resource
  //     let existingTimesheetData = [];
  //     try {
  //         const res = await fetch(`${API_BASE_URL}/api/SubkTimesheet/ByResource/${resourceId}`);
  //         if (res.ok) {
  //             existingTimesheetData = await res.json();
  //         } else {
  //             throw new Error(`Failed to fetch existing timesheet data: ${res.statusText}`);
  //         }
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     // Helper to get timesheetHours for a given line ID
  //     const getTimesheetHoursForLine = (lineId) => {
  //         const tsItem = existingTimesheetData.find(item => item.id === lineId);
  //         return tsItem && Array.isArray(tsItem.timesheetHours) ? tsItem.timesheetHours : [];
  //     };

  //     // Process deletions
  //     linesToDelete.forEach(id => {
  //         if (typeof id === 'number' || !id.startsWith('temp-')) {
  //             promises.push(
  //                 fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, {
  //                     method: 'DELETE'
  //                 })
  //             );
  //         }
  //     });

  //     // Process lines inserts and updates
  //     for (const currentLine of lines) {
  //         const initialLine = initialLines.find(l => l.id === currentLine.id);

  //         // New line insert
  //         if (!initialLine) {
  //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
  //             if (totalHours > 0) {
  //                 const payload = {
  //                     lineNo: currentLine.lineNo || 0,
  //                     Description: currentLine.description || 'New Timesheet Line',
  //                     ProjId: currentLine.project || '',
  //                     Plc: currentLine.plc || '',
  //                     WorkOrder: currentLine.wa_Code || '',
  //                     pm_User_Id: currentLine.pmUserID || '',
  //                     PayType: currentLine.payType || 'SR',
  //                     PoNumber: currentLine.poNumber || '',
  //                     RlseNumber: currentLine.rlseNumber || "0",
  //                     Resource_Id: String(resourceId),
  //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //                     CreatedBy: String(resourceId),
  //                     UpdatedAt: now,
  //                     UpdatedBy: String(resourceId),
  //                     TimesheetHours: days.map(day => {
  //                         let hourValue = currentLine.hours[day];
  //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                             hourValue = 0;
  //                         } else {
  //                             hourValue = parseFloat(hourValue);
  //                             if (isNaN(hourValue)) {
  //                                 hourValue = 0;
  //                             }
  //                         }
  //                         return {
  //                             id: 0,
  //                             lineNo: currentLine.lineNo || 0,
  //                             Ts_Date: weekDates[day],
  //                             Hours: hourValue
  //                         };
  //                     })
  //                 };

  //                 promises.push(
  //                     fetch(`${API_BASE_URL}/api/SubkTimesheet`, {
  //                         method: 'POST',
  //                         headers: { 'Content-Type': 'application/json' },
  //                         body: JSON.stringify(payload)
  //                     })
  //                 );
  //             }
  //             continue;
  //         }

  //         // Existing lines update - use timesheetHours directly from API response
  //         const timesheetHours = getTimesheetHoursForLine(currentLine.id);

  //         days.forEach((day, index) => {
  //             const initialHour = initialLine.hours[day];
  //             const currentHour = currentLine.hours[day];

  //             if (initialHour !== currentHour) {
  //                 let hourValue = currentHour;
  //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                     hourValue = 0;
  //                 } else {
  //                     hourValue = parseFloat(hourValue);
  //                     if (isNaN(hourValue)) {
  //                         hourValue = 0;
  //                     }
  //                 }

  //                 // Use timesheetHours array order/index to get existing id and lineNo directly for the day
  //                 const existingHourEntry = timesheetHours[index];

  //                 const payload = {
  //                     id: existingHourEntry ? existingHourEntry.id : 0,
  //                     ts_Date: weekDates[day],
  //                     hours: hourValue,
  //                     lineNo: existingHourEntry ? existingHourEntry.lineNo : (currentLine.lineNo || 0)
  //                 };

  //                 promises.push(
  //                     fetch(`${API_BASE_URL}/api/TimesheetHours/upsert`, {
  //                         method: 'POST', // upsert
  //                         headers: { 'Content-Type': 'application/json' },
  //                         body: JSON.stringify(payload)
  //                     })
  //                 );
  //             }
  //         });
  //     }

  //     if (promises.length === 0) {
  //         showToast("No changes to save.", "info");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     try {
  //         const responses = await Promise.all(promises);

  //         for (const response of responses) {
  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Failed to save changes: ${errorText}`);
  //             }
  //         }

  //         showToast('Timesheet saved successfully!', 'success');
  //         onSave();
  //         setTimeout(() => {
  //             window.location.reload();
  //         }, 1000);
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         console.error("Save error:", error);
  //         setIsCurrentlySaving(false);
  //     }
  // };

  // const handleSave = async () => {
  //     setIsCurrentlySaving(true);

  //     // 1. Validations
  //     const finalTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
  //     lines.forEach(line => {
  //         days.forEach(day => {
  //             finalTotals[day] += parseFloat(line.hours[day]) || 0;
  //         });
  //     });

  //     const invalidDay = days.find(day => finalTotals[day] > 24);
  //     if (invalidDay) {
  //         showToast(`Save failed: Total hours for one or more days exceed 24.`, 'error');
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //         showToast("Cannot save a timesheet with zero hours.", "warning");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     const now = new Date().toISOString();
  //     const resourceId = timesheetData["Employee ID"];

  //     // 2. Fetch Existing Data
  //     let existingTimesheetData = [];
  //     try {
  //         const res = await fetch(`${API_BASE_URL}/api/SubkTimesheet/ByResource/${resourceId}`);
  //         if (res.ok) {
  //             existingTimesheetData = await res.json();
  //             // Ensure it's an array
  //             if (!Array.isArray(existingTimesheetData)) {
  //                 existingTimesheetData = [existingTimesheetData];
  //             }
  //         } else {
  //             throw new Error(`Failed to fetch existing timesheet data: ${res.statusText}`);
  //         }
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     // Process deletions
  //     linesToDelete.forEach(id => {
  //         if (typeof id === 'number' || !id.startsWith('temp-')) {
  //             promises.push(
  //                 fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, {
  //                     method: 'DELETE'
  //                 })
  //             );
  //         }
  //     });

  //     // 3. Process Updates and Inserts
  //     for (const currentLine of lines) {
  //         const initialLine = initialLines.find(l => l.id === currentLine.id);

  //         // --- SCENARIO A: NEW LINE INSERT ---
  //         if (!initialLine) {
  //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
  //             if (totalHours > 0) {
  //                 const payload = {
  //                     lineNo: currentLine.lineNo || 0,
  //                     Description: currentLine.description || 'New Timesheet Line',
  //                     ProjId: currentLine.project || '',
  //                     Plc: currentLine.plc || '',
  //                     WorkOrder: currentLine.wa_Code || '',
  //                     pm_User_Id: currentLine.pmUserID || '',
  //                     PayType: currentLine.payType || 'SR',
  //                     PoNumber: currentLine.poNumber || '',
  //                     RlseNumber: currentLine.rlseNumber || "0",
  //                     Resource_Id: String(resourceId),
  //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //                     CreatedBy: String(resourceId),
  //                     UpdatedAt: now,
  //                     UpdatedBy: String(resourceId),
  //                     TimesheetHours: days.map(day => {
  //                         let hourValue = parseFloat(currentLine.hours[day]);
  //                         if (isNaN(hourValue)) hourValue = 0;

  //                         return {
  //                             id: 0,
  //                             lineNo: currentLine.lineNo || 0,
  //                             Ts_Date: weekDates[day],
  //                             Hours: hourValue
  //                         };
  //                     })
  //                 };

  //                 promises.push(
  //                     fetch(`${API_BASE_URL}/api/SubkTimesheet`, {
  //                         method: 'POST',
  //                         headers: { 'Content-Type': 'application/json' },
  //                         body: JSON.stringify(payload)
  //                     })
  //                 );
  //             }
  //             continue;
  //         }

  //         // --- SCENARIO B: EXISTING LINE UPDATE ---

  //         // CRITICAL FIX: Find the backend object that matches the current UI Line Number
  //         // We cannot rely on 'id' alone if the UI uses temp IDs, so we use lineNo.
  //         const matchingBackendLine = existingTimesheetData.find(
  //             item => item.lineNo === currentLine.lineNo
  //         );

  //         // Get the array of hours from that specific backend line
  //         const existingHoursList = matchingBackendLine && Array.isArray(matchingBackendLine.timesheetHours)
  //             ? matchingBackendLine.timesheetHours
  //             : [];

  //         days.forEach((day) => {
  //             const initialHour = initialLine.hours[day];
  //             const currentHour = currentLine.hours[day];

  //             if (initialHour !== currentHour) {
  //                 let hourValue = parseFloat(currentHour);
  //                 if (isNaN(hourValue)) hourValue = 0;

  //                 const targetDateFull = weekDates[day]; // e.g. "2025-10-29"
  //                 // Normalize date for comparison (YYYY-MM-DD)
  //                 const targetDateSimple = targetDateFull.split('T')[0];

  //                 // CRITICAL FIX: Find the specific hour entry by Date
  //                 const matchedEntry = existingHoursList.find(entry => {
  //                     if (!entry.ts_Date) return false;
  //                     const entryDateSimple = entry.ts_Date.split('T')[0];
  //                     return entryDateSimple === targetDateSimple;
  //                 });

  //                 // Construct Payload
  //                 // If matchedEntry exists, we use its ID, Date, and LineNo.
  //                 // If NOT exists, we send 0 and the calculated date.
  //                 const payload = {
  //                     id: matchedEntry ? matchedEntry.id : 0,
  //                     ts_Date: matchedEntry ? matchedEntry.ts_Date : targetDateFull,
  //                     hours: hourValue,
  //                     lineNo: matchedEntry ? matchedEntry.lineNo : (currentLine.lineNo || 0)
  //                 };

  //                 promises.push(
  //                     fetch(`${API_BASE_URL}/api/TimesheetHours/upsert`, {
  //                         method: 'POST',
  //                         headers: { 'Content-Type': 'application/json' },
  //                         body: JSON.stringify(payload)
  //                     })
  //                 );
  //             }
  //         });
  //     }

  //     if (promises.length === 0) {
  //         showToast("No changes to save.", "info");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     try {
  //         const responses = await Promise.all(promises);
  //         for (const response of responses) {
  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Failed to save changes: ${errorText}`);
  //             }
  //         }

  //         showToast('Timesheet saved successfully!', 'success');
  //         onSave();
  //         setTimeout(() => {
  //             window.location.reload();
  //         }, 1000);
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         console.error("Save error:", error);
  //         setIsCurrentlySaving(false);
  //     }
  // };

  //   const handleSave = async () => {
  //     setIsCurrentlySaving(true);
  //     const finalTotals = {
  //       mon: 0,
  //       tue: 0,
  //       wed: 0,
  //       thu: 0,
  //       fri: 0,
  //       sat: 0,
  //       sun: 0,
  //     };
  //     lines.forEach((line) => {
  //       days.forEach((day) => {
  //         finalTotals[day] += parseFloat(line.hours[day]) || 0;
  //       });
  //     });
  //     const invalidDay = days.find((day) => finalTotals[day] > 24);
  //     if (invalidDay) {
  //       showToast(
  //         `Save failed: Total hours for one or more days exceed 24.`,
  //         "error"
  //       );
  //       setIsCurrentlySaving(false);
  //       return;
  //     }

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     // Check if we're only deleting lines (no lines left or all deleted)
  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     // Only check for zero hours if we're not in a deletion-only scenario
  //     const grandTotalForSave = Object.values(finalTotals).reduce(
  //       (sum, total) => sum + total,
  //       0
  //     );
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //       showToast("Cannot save a timesheet with zero hours.", "warning");
  //       setIsCurrentlySaving(false);
  //       return;
  //     }

  //     linesToDelete.forEach((id) => {
  //       if (typeof id === "number" || !id.startsWith("temp-")) {
  //         promises.push(
  //           fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: "DELETE" })
  //         );
  //       }
  //     });

  //     lines.forEach((currentLine) => {
  //       const initialLine = initialLines.find((l) => l.id === currentLine.id);
  //       if (!initialLine) {
  //         const totalHours = Object.values(currentLine.hours).reduce(
  //           (s, h) => s + (parseFloat(h) || 0),
  //           0
  //         );
  //         if (totalHours > 0) {
  //           const payload = {
  //             Description: currentLine.description || "New Timesheet Line",
  //             ProjId: currentLine.project || "",
  //             Plc: currentLine.plc || "",
  //             PayType: currentLine.payType || "SR",
  //             PoNumber: currentLine.poNumber || "",
  //             RlseNumber: currentLine.rlseNumber || "0",
  //             Resource_Id: String(timesheetData["Employee ID"]),
  //             PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //             Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //             CreatedBy: String(timesheetData["Employee ID"]),
  //             TimesheetHours: days.map((day) => {
  //               let hourValue = currentLine.hours[day];
  //               if (
  //                 hourValue === "" ||
  //                 hourValue === null ||
  //                 hourValue === undefined
  //               ) {
  //                 hourValue = 0;
  //               } else {
  //                 hourValue = parseFloat(hourValue);
  //                 if (isNaN(hourValue)) {
  //                   hourValue = 0;
  //                 }
  //               }
  //               return {
  //                 Ts_Date: weekDates[day],
  //                 Hours: hourValue,
  //               };
  //             }),
  //           };
  //           promises.push(
  //             fetch(`${API_BASE_URL}/api/SubkTimesheet`, {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify(payload),
  //             })
  //           );
  //         }
  //         return;
  //       }

  //     //   days.forEach((day) => {
  //     //     const initialHour = initialLine.hours[day];
  //     //     const currentHour = currentLine.hours[day];
  //     //     if (initialHour !== currentHour) {
  //     //       const hourId = currentLine.hourIds[day];

  //     //       let hourValue = currentHour;
  //     //       if (
  //     //         hourValue === "" ||
  //     //         hourValue === null ||
  //     //         hourValue === undefined
  //     //       ) {
  //     //         hourValue = 0;
  //     //       } else {
  //     //         hourValue = parseFloat(hourValue);
  //     //         if (isNaN(hourValue)) {
  //     //           hourValue = 0;
  //     //         }
  //     //       }

  //     //       if (hourId) {
  //     //         const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
  //     //         const payload = {
  //     //           id: hourId,
  //     //           ts_Date: weekDates[day],
  //     //           hours: hourValue,
  //     //           lineNo: currentLine.id,
  //     //         };
  //     //         promises.push(
  //     //           fetch(url, {
  //     //             method: "PUT",
  //     //             headers: { "Content-Type": "application/json" },
  //     //             body: JSON.stringify(payload),
  //     //           })
  //     //         );
  //     //       } else {
  //     //         const url = `${API_BASE_URL}/api/TimesheetHours`;
  //     //         const payload = {
  //     //           ts_Date: weekDates[day],
  //     //           hours: hourValue,
  //     //           lineNo: currentLine.id,
  //     //         };
  //     //         promises.push(
  //     //           fetch(url, {
  //     //             method: "POST",
  //     //             headers: { "Content-Type": "application/json" },
  //     //             body: JSON.stringify(payload),
  //     //           })
  //     //         );
  //     //       }
  //     //     }
  //     //   });

  //     days.forEach((day) => {
  //   const initialHour = initialLine.hours[day];
  //   const currentHour = currentLine.hours[day];
  //   if (initialHour !== currentHour) {
  //     const hourId = currentLine.hourIds[day]; // can be undefined for new hour

  //     let hourValue = currentHour;
  //     if (
  //       hourValue === "" ||
  //       hourValue === null ||
  //       hourValue === undefined
  //     ) {
  //       hourValue = 0;
  //     } else {
  //       hourValue = parseFloat(hourValue);
  //       if (isNaN(hourValue)) {
  //         hourValue = 0;
  //       }
  //     }

  //     const url = `${API_BASE_URL}/api/TimesheetHours/upsert`;
  //     const payload = {
  //       id: hourId || 0, // use 0 or undefined for new hours if backend expects
  //       ts_Date: weekDates[day],
  //       hours: hourValue,
  //       lineNo: currentLine.id,
  //     };

  //     promises.push(
  //       fetch(url, {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       })
  //     );
  //   }
  // });

  // });

  //     if (promises.length === 0) {
  //       showToast("No changes to save.", "info");
  //       setIsCurrentlySaving(false);
  //       return;
  //     }

  //     try {
  //       const responses = await Promise.all(promises);
  //       for (const response of responses) {
  //         if (!response.ok) {
  //           const errorText = await response.text();
  //           throw new Error(`Failed to save changes: ${errorText}`);
  //         }
  //       }
  //       showToast("Timesheet saved successfully!", "success");
  //       onSave();
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     } catch (error) {
  //       showToast(error.message, "error");
  //       console.error("Save error:", error);
  //       setIsCurrentlySaving(false);
  //     }
  //   };

  const handleSave = async () => {
    setIsCurrentlySaving(true);

    const finalTotals = {
      mon: 0,
      tue: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    };
    lines.forEach((line) => {
      days.forEach((day) => {
        finalTotals[day] += parseFloat(line.hours[day]) || 0;
      });
    });

    const invalidDay = days.find((day) => finalTotals[day] > 24);
    if (invalidDay) {
      showToast(
        `Save failed: Total hours for one or more days exceed 24.`,
        "error"
      );
      setIsCurrentlySaving(false);
      return;
    }

    const promises = [];
    const weekDates = getWeekDates(timesheetData.Date);
    const API_BASE_URL = backendUrl;

    const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;
    const grandTotalForSave = Object.values(finalTotals).reduce(
      (sum, total) => sum + total,
      0
    );

    if (!isOnlyDeletion && grandTotalForSave === 0) {
      showToast("Cannot save a timesheet with zero hours.", "warning");
      setIsCurrentlySaving(false);
      return;
    }

    const now = new Date().toISOString();
    const resourceId = timesheetData["Employee ID"];

    linesToDelete.forEach((id) => {
      if (typeof id === "number" || !id.startsWith("temp-")) {
        promises.push(
          fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: "DELETE" })
        );
      }
    });

    lines.forEach((currentLine) => {
      const initialLine = initialLines.find((l) => l.id === currentLine.id);

      if (!initialLine) {
        const totalHours = Object.values(currentLine.hours).reduce(
          (s, h) => s + (parseFloat(h) || 0),
          0
        );
        if (totalHours > 0) {
          const payload = {
            Description: currentLine.description || "New Timesheet Line",
            ProjId: currentLine.project || "",
            Plc: currentLine.plc || "",
            PayType: currentLine.payType || "SR",
            PoNumber: currentLine.poNumber || "",
            RlseNumber: currentLine.rlseNumber || "0",
            Resource_Id: String(resourceId),
            PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
            Timesheet_Date: new Date(timesheetData.Date).toISOString(),
            CreatedBy: String(resourceId),
            UpdatedAt: now,
            UpdatedBy: String(resourceId),
            TimesheetHours: days.map((day) => {
              let hourValue = parseFloat(currentLine.hours[day]);
              if (isNaN(hourValue)) hourValue = 0;
              return {
                Ts_Date: weekDates[day],
                Hours: hourValue,
              };
            }),
          };
          promises.push(
            fetch(`${API_BASE_URL}/api/SubkTimesheet`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          );
        }
        return;
      }

      const isLineChanged =
        currentLine.payType !== initialLine.payType ||
        currentLine.workOrder !== initialLine.workOrder ||
        currentLine.wa_Code !== initialLine.wa_Code ||
        currentLine.description !== initialLine.description;

      if (isLineChanged) {
        const updatePayload = {
          lineNo: currentLine.id,
          description: currentLine.description,
          projId: currentLine.project,
          plc: currentLine.plc,
          payType: currentLine.payType,
          poNumber: currentLine.poNumber,
          rlseNumber: currentLine.rlseNumber,
          resource_Id: String(resourceId),
          pm_User_Id: currentLine.pmUserID,
          poLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
          rvsnNumber: 0,
          timesheet_Date: new Date(timesheetData.Date)
            .toISOString()
            .split("T")[0],
          workOrder: currentLine.wa_Code,
          updatedAt: now,
          updatedBy: String(resourceId),

          // FIX: Added createdBy because API requires it even on Update
          createdBy: String(resourceId),

          // FIX: Added createdAt (using existing line date if available, or now as fallback)
          createdAt: timesheetDetails?.createdAt || now,

          hours: 0,
          status: timesheetData.Status || "OPEN",
        };

        promises.push(
          fetch(`${API_BASE_URL}/api/SubkTimesheet/${currentLine.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatePayload),
          })
        );
      }

      // B2. Check if Hours Changed
      days.forEach((day) => {
        const initialHour = initialLine.hours[day];
        const currentHour = currentLine.hours[day];

        if (initialHour !== currentHour) {
          const hourId = currentLine.hourIds[day];

          let hourValue = currentHour;
          if (
            hourValue === "" ||
            hourValue === null ||
            hourValue === undefined
          ) {
            hourValue = 0;
          } else {
            hourValue = parseFloat(hourValue);
            if (isNaN(hourValue)) {
              hourValue = 0;
            }
          }

          const url = `${API_BASE_URL}/api/TimesheetHours/upsert`;
          const payload = {
            id: hourId || 0,
            ts_Date: weekDates[day],
            hours: hourValue,
            lineNo: currentLine.id,
          };

          promises.push(
            fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          );
        }
      });
    });

    if (promises.length === 0) {
      showToast("No changes to save.", "info");
      setIsCurrentlySaving(false);
      return;
    }

    try {
      const responses = await Promise.all(promises);
      for (const response of responses) {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save changes: ${errorText}`);
        }
      }
      showToast("Timesheet saved successfully!", "success");
      onSave();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      showToast(error.message, "error");
      console.error("Save error:", error);
      setIsCurrentlySaving(false);
    }
  };

  // ADD THIS FUNCTION
  const isLineDisabled = (line) => {
    // If the whole form is not editable, disable everything
    if (!isEditable) return true;

    // Logic specifically for CORRECTION status
    if (timesheetData?.Status?.toUpperCase() === "CORRECTION") {
      // Check if it is an existing line (ID is a number or doesn't start with 'temp-')
      const isExistingLine =
        typeof line.id === "number" || !String(line.id).startsWith("temp-");
      // If it's existing, disable it. If it's new, allow editing.
      return isExistingLine;
    }

    // For OPEN or REJECTED, everything is editable
    return false;
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

  //     const promises = [];
  //     const weekDates = getWeekDates(timesheetData.Date);
  //     const API_BASE_URL = backendUrl;

  //     // Check if we're only deleting lines (no lines left or all deleted)
  //     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;

  //     // Only check for zero hours if we're not in a deletion-only scenario
  //     const grandTotalForSave = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
  //     if (!isOnlyDeletion && grandTotalForSave === 0) {
  //         showToast("Cannot save a timesheet with zero hours.", "warning");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     // Define the current timestamp and user ID
  //     const now = new Date().toISOString();
  //     const resourceId = timesheetData["Employee ID"];

  //     linesToDelete.forEach(id => {
  //         if (typeof id === 'number' || !id.startsWith('temp-')) {
  //             promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: 'DELETE' }));
  //         }
  //     });

  //     lines.forEach(currentLine => {
  //         const initialLine = initialLines.find(l => l.id === currentLine.id);

  //         // --- CASE 1: NEW LINE (POST) ---
  //         if (!initialLine) {
  //             const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);
  //             if (totalHours > 0) {
  //                 const payload = {
  //                     lineNo: 0, // New lines usually start at 0 or are assigned by DB
  //                     Description: currentLine.description || 'New Timesheet Line',
  //                     ProjId: currentLine.project || '',
  //                     Plc: currentLine.plc || '',
  //                     WorkOrder: currentLine.wa_Code || '',
  //                     pm_User_Id: currentLine.pmUserID || '',
  //                     PayType: currentLine.payType || 'SR',
  //                     PoNumber: currentLine.poNumber || '',
  //                     RlseNumber: currentLine.rlseNumber || "0",
  //                     Resource_Id: String(timesheetData["Employee ID"]),
  //                     PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,
  //                     Timesheet_Date: new Date(timesheetData.Date).toISOString(),
  //                     CreatedBy: String(timesheetData["Employee ID"]),
  //                     UpdatedAt: now,
  //                     UpdatedBy: String(resourceId),
  //                     TimesheetHours: days.map(day => {
  //                         let hourValue = currentLine.hours[day];
  //                         if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                             hourValue = 0;
  //                         } else {
  //                             hourValue = parseFloat(hourValue);
  //                             if (isNaN(hourValue)) {
  //                                 hourValue = 0;
  //                             }
  //                         }
  //                         return {
  //                             id: 0,
  //                             lineNo: 0,
  //                             Ts_Date: weekDates[day],
  //                             Hours: hourValue
  //                         };
  //                     })
  //                 };
  //                 promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //             }
  //             return;
  //         }

  //         // --- CASE 2: EXISTING LINE (UPDATE) ---
  //         days.forEach(day => {
  //             const initialHour = initialLine.hours[day];
  //             const currentHour = currentLine.hours[day];

  //             if (initialHour !== currentHour) {
  //                 const hourId = currentLine.hourIds[day];

  //                 let hourValue = currentHour;
  //                 if (hourValue === '' || hourValue === null || hourValue === undefined) {
  //                     hourValue = 0;
  //                 } else {
  //                     hourValue = parseFloat(hourValue);
  //                     if (isNaN(hourValue)) {
  //                         hourValue = 0;
  //                     }
  //                 }

  //                 // If the hour record already exists in DB, we UPDATE (PUT)
  //                 if (hourId) {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`;
  //                     const payload = {
  //                         id: hourId,
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         // FIX: Use currentLine.lineNo instead of 0
  //                         lineNo: currentLine.lineNo || 0
  //                     };
  //                     promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 }
  //                 // If the line exists but this specific day had no hours before, we CREATE (POST) the hour record
  //                 else {
  //                     const url = `${API_BASE_URL}/api/TimesheetHours`;
  //                     const payload = {
  //                         ts_Date: weekDates[day],
  //                         hours: hourValue,
  //                         // FIX: Even for new hours on an existing line, use the existing lineNo
  //                         lineNo: currentLine.lineNo || 0
  //                     };
  //                     promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
  //                 }
  //             }
  //         });
  //     });

  //     if (promises.length === 0) {
  //         showToast("No changes to save.", "info");
  //         setIsCurrentlySaving(false);
  //         return;
  //     }

  //     try {
  //         const responses = await Promise.all(promises);
  //         for (const response of responses) {
  //             if (!response.ok) {
  //                 const errorText = await response.text();
  //                 throw new Error(`Failed to save changes: ${errorText}`);
  //             }
  //         }
  //         showToast('Timesheet saved successfully!', 'success');
  //         onSave();
  //         setTimeout(() => { window.location.reload(); }, 1000);
  //     } catch (error) {
  //         showToast(error.message, 'error');
  //         console.error("Save error:", error);
  //         setIsCurrentlySaving(false);
  //     }
  // };

  if (isLoading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const workOrderOptions = Array.from(
    new Map(
      purchaseOrderData.flatMap((item) =>
        (item.resourceDesc || []).map((desc) => {
          const label = `${item.wa_Code} - ${desc}`;
          return [label, { value: label, label: label }];
        })
      )
    ).values()
  );
  const hiddenCount = Object.values(hiddenColumns).filter((val) => val).length;
  const hiddenColumnsList = Object.entries(hiddenColumns)
    .filter(([col, isHidden]) => isHidden)
    .map(([col]) => col);

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
        <div className="flex flex-col">
          {timesheetDetails && (
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Status:</span>{" "}
                {timesheetDetails?.status || "N/A"}
              </div>
              <div>
                <span className="font-medium">Date:</span>{" "}
                {timesheetDetails?.timesheet_Date
                  ? formatDate(timesheetDetails.timesheet_Date)
                  : "N/A"}
              </div>
              <div>
                <span className="font-medium">Approved By:</span>{" "}
                {timesheetDetails?.approvedBy || "N/A"}
              </div>
              <div>
                <span className="font-medium">Approve Date:</span>{" "}
                {timesheetDetails?.approvedDate
                  ? formatDate(timesheetDetails.approvedDate)
                  : "N/A"}
              </div>
            </div>
          )}
        </div>
        {isEditable && (
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={addLine}
              variant="primary"
              icon={<PlusIcon />}
            >
              Add Line
            </ActionButton>
            <ActionButton onClick={copyLines} icon={<CopyIcon />}>
              Copy
            </ActionButton>

            {timesheetData?.Status?.toUpperCase() !== "CORRECTION" && (
              <ActionButton onClick={deleteLines} icon={<TrashIcon />}>
                Delete
              </ActionButton>
            )}
            {/* <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton> */}
          </div>
        )}
      </div>

      {/* Hidden Columns Indicator with Individual Column Buttons */}
      {hiddenCount > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {hiddenCount} column{hiddenCount > 1 ? "s" : ""} hidden:
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {hiddenColumnsList.map((col) => (
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
            <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Line
                </th>
                {hideableColumns.map(
                  (col) =>
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
                            className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                            title="Hide column"
                            type="button"
                          >
                            <XIcon className="h-3.5 w-3.5 text-red-600" />
                          </button>
                        </div>
                      </th>
                    )
                )}
                {headerDates.map((header) => (
                  <th
                    key={header}
                    className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/80 bg-white/50">
              {/* {lines.map((line, index) => {
                                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
                                return (
                                <tr key={line.id} className="hover:bg-slate-50/50">
                                    <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isLineDisabled(line)} /></td>
                                    <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                    {!hiddenColumns['Work Order'] && (
                                        <td className="p-2 min-w-[250px]">
                                            <CascadingSelect 
                                                label="Work Order" 
                                                options={workOrderOptions} 
                                                value={line.workOrder} 
                                                onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} 
                                                // disabled={!isEditable} 
                                                disabled={isLineDisabled(line)}
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
                                            <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md" disabled={isLineDisabled(line)}>
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
                                    {!hiddenColumns['Remaining Hours'] && (
                                        <td className="p-2 min-w-[120px]">
                                            {line.poLineNumber && remainingPoHours[String(line.poLineNumber).trim()] !== undefined ? (
                                                <div className="text-xs font-medium text-center">
                                                    <span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                        {getRemainingHoursForLine(line)} hrs
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="text-xs font-medium text-center text-gray-400">-</div>
                                            )}
                                        </td>
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
                                                    // disabled={!isEditable} 
                                                    disabled={isLineDisabled(line)}
                                                />
                                            </td>
                                        );
                                    })}
                                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                </tr>
                                );
                            })} */}
              {lines.map((line, index) => {
                const rowTotal = Object.values(line.hours)
                  .reduce((s, h) => s + (parseFloat(h) || 0), 0)
                  .toFixed(2);
                const isDisabled = isLineDisabled(line); // Helper variable to keep code clean

                return (
                  <tr key={line.id} className="hover:bg-slate-50/50">
                    {/* 1. Checkbox - Added opacity and cursor styling */}
                    <td className="p-2 text-center">
                      {/* <input 
                    type="checkbox" 
                    className={`rounded border-gray-300 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    checked={selectedLines.has(line.id)} 
                    onChange={() => handleSelectLine(line.id)} 
                    disabled={isDisabled} 
                /> */}
                      <input
                        type="checkbox"
                        className={`rounded border-gray-300 ${
                          !isEditable
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                        }`}
                        checked={selectedLines.has(line.id)}
                        onChange={() => handleSelectLine(line.id)}
                        disabled={!isEditable}
                      />
                    </td>

                    <td className="p-3 text-center text-gray-500">
                      {index + 1}
                    </td>

                    {!hiddenColumns["Work Order"] && (
                      <td className="p-2 min-w-[250px]">
                        {/* CascadingSelect internally handles disabled styling based on the prop */}
                        <CascadingSelect
                          label="Work Order"
                          options={workOrderOptions}
                          value={line.workOrder}
                          onChange={(e) =>
                            handleSelectChange(
                              line.id,
                              "workOrder",
                              e.target.value
                            )
                          }
                          disabled={isDisabled}
                        />
                      </td>
                    )}

                    {!hiddenColumns["Description"] && (
                      <td className="p-2 min-w-[200px]">
                        <input
                          type="text"
                          value={line.description}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}
                    {!hiddenColumns["Project"] && (
                      <td className="p-2 min-w-[150px]">
                        <input
                          type="text"
                          value={line.project}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}
                    {!hiddenColumns["PLC"] && (
                      <td className="p-2 min-w-[120px]">
                        <input
                          type="text"
                          value={line.plc}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}

                    {!hiddenColumns["Pay Type"] && (
                      <td className="p-2 min-w-[120px]">
                        {/* 2. Pay Type - Logic updated to use isDisabled for background and cursor */}
                        <select
                          value={line.payType}
                          onChange={(e) =>
                            handleSelectChange(
                              line.id,
                              "payType",
                              e.target.value
                            )
                          }
                          className={`w-full p-1.5 border border-gray-200 rounded-md ${
                            isDisabled
                              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "bg-white text-gray-900"
                          }`}
                          disabled={isDisabled}
                        >
                          <option value="SR">SR (Subcontractor Regular)</option>
                          <option value="SO">
                            SO (Subcontractor Overtime)
                          </option>
                        </select>
                      </td>
                    )}

                    {!hiddenColumns["PO Number"] && (
                      <td className="p-2 min-w-[150px]">
                        <input
                          type="text"
                          value={line.poNumber}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}
                    {!hiddenColumns["RLSE Number"] && (
                      <td className="p-2 min-w-[120px]">
                        <input
                          type="text"
                          value={line.rlseNumber}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}
                    {!hiddenColumns["PO Line Number"] && (
                      <td className="p-2 min-w-[120px]">
                        <input
                          type="text"
                          value={line.poLineNumber}
                          className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600"
                          readOnly
                        />
                      </td>
                    )}

                    {!hiddenColumns["Remaining Hours"] && (
                      <td className="p-2 min-w-[120px]">
                        {line.poLineNumber &&
                        remainingPoHours[String(line.poLineNumber).trim()] !==
                          undefined ? (
                          <div className="text-xs font-medium text-center">
                            <span
                              className={`font-semibold ${
                                parseFloat(getRemainingHoursForLine(line)) < 0
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {getRemainingHoursForLine(line)} hrs
                            </span>
                          </div>
                        ) : (
                          <div className="text-xs font-medium text-center text-gray-400">
                            -
                          </div>
                        )}
                      </td>
                    )}

                    {days.map((day, dayIndex) => {
                      const isWeekend = day === "sat" || day === "sun";
                      return (
                        <td key={day} className="p-2">
                          {/* 3. Hours Input - Logic updated to use isDisabled for background, text color, and cursor */}
                          <input
                            type="number"
                            step="0.5"
                            value={line.hours[day]}
                            onChange={(e) =>
                              handleHourChange(line.id, day, e.target.value)
                            }
                            className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm 
                                ${
                                  isWeekend || isDisabled
                                    ? "bg-gray-100 text-gray-500"
                                    : "bg-white text-gray-900"
                                } 
                                ${isDisabled ? "cursor-not-allowed" : ""}`}
                            disabled={isDisabled}
                          />
                        </td>
                      );
                    })}
                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">
                      {rowTotal}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-200/80 font-semibold sticky bottom-0">
              <tr className="border-t-2 border-gray-300">
                <td
                  colSpan={
                    2 +
                    hideableColumns.filter((col) => !hiddenColumns[col]).length
                  }
                  className="p-3 text-right text-gray-800"
                >
                  Total Hours
                </td>
                {days.map((day) => (
                  <td key={day} className="p-2 text-center">
                    <div
                      className={`w-20 p-1.5 ${
                        day === "sat" || day === "sun" ? "text-gray-500" : ""
                      }`}
                    >
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
      </div>

      <div className="mt-6 flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Cancel
        </button>
        {isEditable && (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || isCurrentlySaving}
          >
            {isCurrentlySaving ? "Saving..." : "Save Changes"}
          </button>
        )}
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

// // --- Helper Components & Data ---
// const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '', disabled = false }) => {
//     const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
//     const variants = {
//         primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
//         secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
//     };
//     const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
//     return ( <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}>{icon && <span className="mr-2">{icon}</span>}{children}</button> );
// };

// const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     const typeClasses = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500 text-black', info: 'bg-blue-500' };
//     toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses['info']}`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, 3000);
// };

// const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' }, hourIds: {} });
// const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// const timePeriods = [
//     { label: 'Mon 7/21 - Sun 7/27', dates: ['Mon 07/21', 'Tue 07/22', 'Wed 07/23', 'Thu 07/24', 'Fri 07/25', 'Sat 07/26', 'Sun 07/27'] },
//     { label: 'Mon 7/28 - Sun 8/03',  dates: ['Mon 07/28', 'Tue 07/29', 'Wed 07/30', 'Thu 07/31', 'Fri 08/01', 'Sat 08/02', 'Sun 08/03'] },
//     { label: 'Mon 8/04 - Sun 8/10',  dates: ['Mon 08/04', 'Tue 08/05', 'Wed 08/06', 'Thu 08/07', 'Fri 08/08', 'Sat 08/09', 'Sun 08/10'] },
//     { label: 'Mon 8/11 - Sun 8/17', dates: ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'] },
//     { label: 'Mon 8/18 - Sun 8/24', dates: ['Mon 08/18', 'Tue 08/19', 'Wed 08/20', 'Thu 08/21', 'Fri 08/22', 'Sat 08/23', 'Sun 08/24'] },
//     { label: 'Mon 8/25 - Sun 8/31', dates: ['Mon 08/25', 'Tue 08/26', 'Wed 08/27', 'Thu 08/28', 'Fri 08/29', 'Sat 08/30', 'Sun 08/31'] },
//     { label: 'Mon 9/01 - Sun 9/07',   dates: ['Mon 09/01', 'Tue 09/02', 'Wed 09/03', 'Thu 09/04', 'Fri 09/05', 'Sat 09/06', 'Sun 09/07'] },
//     { label: 'Mon 9/08 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] },
//     { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] },
//     { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']},
//     { label: 'Mon 9/29 - Sun 10/5', dates: ['Mon 09/29', 'Tue 09/30', 'Wed 10/01', 'Thu 10/02', 'Fri 10/03', 'Sat 10/04', 'Sun 10/05'] },
//     { label: 'Mon 10/06 - Sun 10/12', dates: ['Mon 10/06', 'Tue 10/07', 'Wed 10/08', 'Thu 10/09', 'Fri 10/10', 'Sat 10/11', 'Sun 10/12'] },
//     { label: 'Mon 10/13 - Sun 10/19', dates: ['Mon 10/13', 'Tue 10/14', 'Wed 10/15', 'Thu 10/16', 'Fri 10/17', 'Sat 10/18', 'Sun 10/19'] },
//     { label: 'Mon 10/20 - Sun 10/26', dates: ['Mon 10/20', 'Tue 10/21', 'Wed 10/22', 'Thu 10/23', 'Fri 10/24', 'Sat 10/25', 'Sun 10/26'] },
//     { label: 'Mon 10/27 - Sun 11/02', dates: ['Mon 10/27', 'Tue 10/28', 'Wed 10/29', 'Thu 10/30', 'Fri 10/31', 'Sat 11/01', 'Sun 11/02'] }
// ];

// const getWeekEndDateFromPeriod = (period) => { if (!period?.dates?.length) return null; const lastDayString = period.dates[period.dates.length - 1]; const datePart = lastDayString.split(' ')[1]; const [month, day] = datePart.split('/'); const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10))); return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };
// const formatDateForComparison = (dateInput) => { if (!dateInput) return ''; const date = new Date(dateInput); if (isNaN(date.getTime())) return ''; return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };

// // --- Constants ---
// const DAY_KEY_MAPPING = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// const DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const hideableColumns = ['Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number'];

// export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null }) {
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[timePeriods.length -1]);
//     const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [modifiedHours, setModifiedHours] = useState(new Set());
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
//     const [remainingPoHours, setRemainingPoHours] = useState({});
//     const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);

//     const isEditMode = Boolean(timesheetToEdit);

//     useEffect(() => {
//         if (isEditMode && (!purchaseOrderData || purchaseOrderData.length === 0)) {
//             return;
//         }
//         try {
//             if (isEditMode && timesheetToEdit) {
//                 const editDateStr = formatDateForComparison(timesheetToEdit?.timesheet_Date);
//                 const matchingPeriod = timePeriods.find(period => getWeekEndDateFromPeriod(period) === editDateStr);
//                 if (matchingPeriod) setSelectedPeriod(matchingPeriod);
//                 const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
//                 const hourIdsData = {};
//                 timesheetToEdit?.timesheetHours?.forEach(hourEntry => {
//                     if (hourEntry && hourEntry.ts_Date) {
//                         const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
//                         if (!isNaN(date.getTime())) {
//                             const dayKey = DAY_KEY_MAPPING[date.getUTCDay()];
//                             if (dayKey) {
//                                 hoursData[dayKey] = hourEntry.hours;
//                                 hourIdsData[dayKey] = hourEntry.id;
//                             }
//                         }
//                     }
//                 });
//                 let fullWorkOrderString = '';
//                 const poEntry = purchaseOrderData.find(po => po.project?.includes(timesheetToEdit.projId));
//                 if (poEntry) {
//                     const projectIndex = poEntry.project.indexOf(timesheetToEdit.projId);
//                     if (projectIndex > -1) {
//                         const correspondingDesc = poEntry.resourceDesc[projectIndex];
//                         fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
//                     }
//                 }
//                 const initialLine = { id: timesheetToEdit?.id, description: timesheetToEdit?.description || '', project: timesheetToEdit?.projId || '', plc: timesheetToEdit?.plc || '', payType: timesheetToEdit?.payType || 'SR', workOrder: fullWorkOrderString, wa_Code: poEntry?.wa_Code || '', pmUserID: poEntry?.pmUserId || '', poNumber: timesheetToEdit?.poNumber || '', rlseNumber: timesheetToEdit?.rlseNumber || '', poLineNumber: timesheetToEdit?.poLineNumber || '', hours: hoursData, hourIds: hourIdsData };
//                 setLines([initialLine]);
//             } else {
//                 setLines([createEmptyLine(1)]);
//             }
//         } catch (error) {
//             console.error("Error initializing TimesheetLine:", error);
//             showToast("Could not load timesheet data for editing.", "error");
//             onClose();
//         }
//     }, [isEditMode, timesheetToEdit, purchaseOrderData, onClose]);

//     useEffect(() => {
//         if (!resourceId) { setIsLoading(false); return; }
//         const fetchPurchaseOrders = async () => { setIsLoading(true); const API_URL = `${backendUrl}/api/PurchaseOrders/ByResourceDetails/${resourceId}`; try { const response = await fetch(API_URL); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); const data = await response.json(); setPurchaseOrderData(Array.isArray(data) ? data : []); } catch (error) { console.error("Failed to fetch purchase orders:", error); showToast("Could not load purchase order data.", "error"); setPurchaseOrderData([]); } finally { setIsLoading(false); } };
//         fetchPurchaseOrders();
//     }, [resourceId]);

//     useEffect(() => {
//     if (!resourceId) return;

//     const fetchRemainingHours = async () => {
//         setIsLoadingRemainingHours(true);
//         const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${resourceId}`;

//         try {
//             const response = await fetch(API_URL);
//             if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//             const data = await response.json();

//             // Create a map of poLineNumber -> remainingHours for quick lookup
//             const hoursMap = {};
//             if (Array.isArray(data)) {
//                 data.forEach(item => {
//                     if (item.poLineNumber) {
//                         hoursMap[item.poLineNumber] = parseFloat(item.remainingHours) || 0;
//                     }
//                 });
//             }

//             setRemainingPoHours(hoursMap);
//         } catch (error) {
//             console.error("Failed to fetch remaining PO hours:", error);
//             showToast("Could not load remaining PO hours data.", "error");
//         } finally {
//             setIsLoadingRemainingHours(false);
//         }
//     };

//     fetchRemainingHours();
// }, [resourceId]);

//     useEffect(() => { if (isEditMode) { setIsPeriodInvalid(false); return; } const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod); if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) { setIsPeriodInvalid(true); } else { setIsPeriodInvalid(false); } }, [selectedPeriod, existingTimesheetDates, isEditMode]);

//     const handleSelectChange = (id, fieldName, value) => { setLines(currentLines => currentLines.map(line => { if (line.id === id) { const updatedLine = { ...line, [fieldName]: value }; if (fieldName === 'workOrder') { if (!value) { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; return updatedLine; } const separator = ' - '; const separatorIndex = value.indexOf(separator); const waCode = value.substring(0, separatorIndex).trim(); const desc = value.substring(separatorIndex + separator.length).trim(); const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code.trim() === waCode); if (selectedWorkOrderData) { updatedLine.wa_Code = selectedWorkOrderData.wa_Code; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.map(d => d.trim()).indexOf(desc); if (descIndex > -1) { updatedLine.description = selectedWorkOrderData.resourceDesc[descIndex] || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || ''; } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; } } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; } } return updatedLine; } return line; })); };

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

//     //     if (isValid) {
//     //         setLines(currentLines => currentLines.map(line =>
//     //             line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
//     //         ));

//     //         setModifiedHours(prev => new Set(prev).add(`${id}-${day}`));
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

//     if (isNaN(numValue) || numValue < 0 || numValue > 24) {
//         isValid = false;
//         toastMessage = 'Hours must be between 0 and 24.';
//     } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
//         isValid = false;
//         toastMessage = 'Hours must be in 0.5 increments.';
//     } else {
//         // Check daily total validation
//         const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
//         const newColumnTotal = otherLinesTotal + numValue;

//         if (newColumnTotal > 24) {
//             isValid = false;
//             toastMessage = `Total hours for this day cannot exceed 24.`;
//         } else {
//             // NEW: Check remaining PO hours validation
//             const currentLine = lines.find(line => line.id === id);

//             if (currentLine && currentLine.poLineNumber) {
//                 const poLineNumber = currentLine.poLineNumber;
//                 const remainingHours = remainingPoHours[poLineNumber];

//                 if (remainingHours !== undefined) {
//                     // Calculate current total hours for this line (excluding the day being changed)
//                     const currentLineTotal = DAYS_OF_WEEK.reduce((sum, d) => {
//                         if (d === day) return sum;
//                         return sum + (parseFloat(currentLine.hours[d]) || 0);
//                     }, 0);

//                     // Calculate total hours for other lines with same PO Line Number
//                     const otherLinesWithSamePO = lines.filter(line =>
//                         line.id !== id && line.poLineNumber === poLineNumber
//                     );

//                     const otherLinesSamePOTotal = otherLinesWithSamePO.reduce((sum, line) => {
//                         return sum + DAYS_OF_WEEK.reduce((daySum, d) =>
//                             daySum + (parseFloat(line.hours[d]) || 0), 0
//                         );
//                     }, 0);

//                     const newTotalForPO = currentLineTotal + numValue + otherLinesSamePOTotal;

//                     if (newTotalForPO > remainingHours) {
//                         isValid = false;
//                         toastMessage = `Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}).`;
//                     }
//                 } else if (currentLine.poLineNumber) {
//                     // PO Line is selected but no remaining hours data
//                     showToast('Warning: Could not verify remaining PO hours.', 'warning');
//                 }
//             }
//         }
//     }

//     if (isValid) {
//         setLines(currentLines => currentLines.map(line =>
//             line.id === id ? { ...line, hours: { ...line.hours, [day]: numValue } } : line
//         ));

//         setModifiedHours(prev => new Set(prev).add(`${id}-${day}`));
//     } else {
//         showToast(toastMessage, 'warning');
//         setLines(currentLines => currentLines.map(line =>
//             line.id === id ? { ...line, hours: { ...line.hours, [day]: '' } } : line
//         ));
//     }
// };

// const getRemainingHoursForLine = (line) => {
//     if (!line.poLineNumber) return null;
//     const remaining = remainingPoHours[line.poLineNumber];
//     if (remaining === undefined) return null;

//     // Calculate used hours for this PO line across all lines
//     const usedHours = lines
//         .filter(l => l.poLineNumber === line.poLineNumber)
//         .reduce((sum, l) => {
//             return sum + DAYS_OF_WEEK.reduce((daySum, day) =>
//                 daySum + (parseFloat(l.hours[day]) || 0), 0
//             );
//         }, 0);

//     return (remaining - usedHours).toFixed(2);
// };

//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
//     const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
//     const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } setLines(lines.filter(line => !selectedLines.has(line.id))); setSelectedLines(new Set()); };

//     const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { DAYS_OF_WEEK.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);

//     const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } if (isPeriodInvalid) { showToast("Cannot copy. The selected period already has a timesheet.", "error"); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { DAYS_OF_WEEK.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };

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

//     const handleSubmit = async () => {
//         if (isPeriodInvalid) {
//             showToast("The selected period already has a timesheet.", "warning");
//             return;
//         }

//         if (grandTotal === 0) {
//             showToast("Cannot submit a timesheet with zero hours.", "warning");
//             return;
//         }

//         if (isSubmitting) return;

//         setIsSubmitting(true);

//         for (const line of lines) {
//             if (!line.project || !line.poLineNumber) {
//                 showToast(`Please complete the Work Order for all lines.`, 'warning');
//                 setIsSubmitting(false);
//                 return;
//             }
//         }

//         try {
//             const API_URL = `${backendUrl}/api/SubkTimesheet`;

//             for (const line of lines) {
//                 const lineHoursTotal = parseFloat(
//                     Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)
//                 );

//                 if (!isEditMode && lineHoursTotal === 0) continue;

//                 const method = isEditMode ? 'PUT' : 'POST';
//                 const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;
//                 const now = new Date().toISOString();

//                 const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
//                 const [month, day, year] = weekEndDateString.split('/');
//                 const weekEndDateAsISO = new Date(
//                     Date.UTC(parseInt(year, 10) || 2025, parseInt(month, 10) - 1, parseInt(day, 10))
//                 ).toISOString();

//                 const timesheetHours = DAYS_OF_WEEK
//                     .map((day, index) => {
//                         const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/');
//                         const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
//                         return {
//                             Id: isEditMode ? (line.hourIds[day] || 0) : 0,
//                             Ts_Date: dateForApi,
//                             Hours: line.hours[day] || 0,
//                             day: day
//                         };
//                     })
//                     .filter(hourEntry => {
//                         if (isEditMode) {
//                             return modifiedHours.has(`${line.id}-${hourEntry.day}`);
//                         }
//                         return hourEntry.Hours > 0;
//                     })
//                     .map(({ day, ...rest }) => rest);

//                 const payload = {
//                     Id: isEditMode ? line.id : 0,
//                     Description: line.description,
//                     ProjId: line.project,
//                     Plc: line.plc,
//                     WorkOrder: line.wa_Code,
//                     pm_User_Id: line.pmUserID,
//                     PayType: line.payType,
//                     PoNumber: line.poNumber,
//                     RlseNumber: line.rlseNumber || "0",
//                     Resource_Id: String(resourceId),
//                     PoLineNumber: parseInt(line.poLineNumber, 10) || 0,
//                     Timesheet_Date: weekEndDateAsISO,
//                     UpdatedAt: now,
//                     UpdatedBy: String(resourceId),
//                     TimesheetHours: timesheetHours,
//                     Hours: lineHoursTotal,
//                     Status: "OPEN",
//                     ApprovalStatus: "PENDING"
//                 };

//                 if (!isEditMode) {
//                     payload.CreatedAt = now;
//                     payload.CreatedBy = String(resourceId);
//                 }

//                 const response = await fetch(url, {
//                     method: method,
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(`Submission failed: ${errorText}`);
//                 }
//             }

//             showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success');
//             setModifiedHours(new Set());
//             onClose();
//         } catch (error) {
//             showToast(error.message, 'error');
//             setIsSubmitting(false);
//         }
//     };

//     const workOrderOptions = useMemo(() => { if (!purchaseOrderData) return []; const uniqueOptions = new Map(); purchaseOrderData.forEach(item => { item.resourceDesc.forEach(desc => { const value = `${item.wa_Code} - ${desc}`; uniqueOptions.set(value, { value, label: value }); }); }); return Array.from(uniqueOptions.values()); }, [purchaseOrderData]);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     return (
//         <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 md:p-8 w-full max-w-[90vw]">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
//                 <div className="flex items-center gap-4 flex-wrap">
//                     <div className="flex flex-col items-start">
//                         <div className="flex items-center gap-2">
//                             <label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label>
//                             <select id="period-select" value={selectedPeriod.label} onChange={(e) => { const newPeriod = timePeriods.find(p => p.label === e.target.value); if (newPeriod) setSelectedPeriod(newPeriod); }} className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm" disabled={isEditMode}>{timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}</select>
//                         </div>
//                         {isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">A timesheet for this period already exists.</p>)}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />} disabled={isPeriodInvalid}>Add Line</ActionButton>
//                         <ActionButton onClick={copyLines} icon={<CopyIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Copy</ActionButton>
//                         <ActionButton onClick={deleteLines} icon={<TrashIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Delete</ActionButton>
//                     </div>
//                 </div>
//             </div>

//             {(() => {
//                 const hiddenCount = Object.values(hiddenColumns).filter(val => val).length;
//                 const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden).map(([col]) => col);

//                 return hiddenCount > 0 ? (
//                     <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap mb-4">
//                         <div className="flex items-center gap-2">
//                             <EyeIcon className="h-4 w-4 text-blue-600" />
//                             <span className="text-sm font-medium text-gray-700">
//                                 {hiddenCount} column{hiddenCount > 1 ? 's' : ''} hidden:
//                             </span>
//                         </div>
//                         <div className="flex gap-2 flex-wrap">
//                             {hiddenColumnsList.map(col => (
//                                 <button
//                                     key={col}
//                                     onClick={() => toggleColumnVisibility(col)}
//                                     className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer"
//                                 >
//                                     {col}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={showAllHiddenColumns}
//                                 className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer"
//                             >
//                                 Show All
//                             </button>
//                         </div>
//                     </div>
//                 ) : null;
//             })()}

//             <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                 <table className="w-full text-sm min-w-[1600px]">
//                     <thead className="bg-slate-100/70 border-b border-gray-200/80">
//                         <tr>
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
//                             {hideableColumns.map(col => (
//                                 !hiddenColumns[col] && (
//                                     <th
//                                         key={col}
//                                         className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
//                                     >
//                                         <div className="flex items-center justify-between gap-2 group">
//                                             <span>{col}</span>
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     toggleColumnVisibility(col);
//                                                 }}
//                                                 className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                                                 title="Hide column"
//                                                 type="button"
//                                             >
//                                                 <XIcon className="h-3.5 w-3.5 text-red-600" />
//                                             </button>
//                                         </div>
//                                     </th>
//                                 )
//                             ))}
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Remaining Hours</th>
//                             {selectedPeriod.dates.map(date => <th key={date} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{date}</th>)}
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                         {lines.map((line, index) => {
//                             const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                             return (
//                                 <tr key={line.id} className="hover:bg-slate-50/50">
//                                     <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isPeriodInvalid} /></td>
//                                     <td className="p-3 text-center text-gray-500">{index + 1}</td>

//                                     {!hiddenColumns['Work Order'] && (
//                                         <td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} disabled={isPeriodInvalid} /></td>
//                                     )}
//                                     {!hiddenColumns['Description'] && (
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['Project'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PLC'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['Pay Type'] && (
//                                         <td className="p-2 min-w-[120px]"><select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${isPeriodInvalid ? 'bg-gray-100 cursor-not-allowed' : ''}`} disabled={isPeriodInvalid}><option value="SR">SR (Subcontractor Regular)</option><option value="SO">SO (Subcontractor Overtime)</option></select></td>
//                                     )}
//                                     {!hiddenColumns['PO Number'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['RLSE Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PO Line Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}

//                                     {!hiddenColumns['PO Line Number'] && (
//     <td className="p-2 min-w-[120px]">
//         <input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly />
//     </td>
// )}

// {/* NEW: Add this column to show remaining hours */}
// <td className="p-2 min-w-[120px]">
//     {line.poLineNumber && remainingPoHours[line.poLineNumber] !== undefined ? (
//         <div className="text-xs font-medium">
//             <span className="text-gray-600">Remaining: </span>
//             <span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? 'text-red-600' : 'text-green-600'}`}>
//                 {getRemainingHoursForLine(line)} hrs
//             </span>
//         </div>
//     ) : null}
// </td>

//                                     {DAYS_OF_WEEK.map((day, dayIndex) => {
//                                         const dateString = selectedPeriod.dates[dayIndex];
//                                         const dateParts = dateString.split(' ')[1].split('/');
//                                         const month = parseInt(dateParts[0], 10) - 1;
//                                         const dayOfMonth = parseInt(dateParts[1], 10);
//                                         const currentYear = new Date().getFullYear();
//                                         const columnDate = new Date(currentYear, month, dayOfMonth);
//                                         const isFutureDate = columnDate > today;
//                                         const isWeekend = day === 'sat' || day === 'sun';
//                                         const isDisabled = isPeriodInvalid || isFutureDate;

//                                         return (
//                                             <td key={day} className="p-2">
//                                                 <input
//                                                     type="number"
//                                                     step="0.5"
//                                                     value={line.hours[day]}
//                                                     onChange={e => handleHourChange(line.id, day, e.target.value)}
//                                                     className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || isDisabled ? 'bg-gray-100' : 'bg-white'} ${isDisabled ? 'cursor-not-allowed' : ''}`}
//                                                     disabled={isDisabled}
//                                                 />
//                                             </td>
//                                         );
//                                     })}
//                                     <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                     <tfoot className="bg-slate-200/80 font-semibold">
//                         <tr className="border-t-2 border-gray-300">
//                             <td colSpan={2 + hideableColumns.filter(col => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>
//                             {DAYS_OF_WEEK.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
//                             <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
//                         </tr>
//                     </tfoot>
//                 </table>
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
//                 {/* <ActionButton onClick={() => { setModifiedHours(new Set()); onClose(); }} variant="secondary">Cancel</ActionButton> */}
//                 <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
//                 <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting || lines.length === 0}>{isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}</ActionButton>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

// // --- Helper Components & Data ---
// const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '', disabled = false }) => {
//     const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
//     const variants = {
//         primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
//         secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
//     };
//     const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
//     return ( <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}>{icon && <span className="mr-2">{icon}</span>}{children}</button> );
// };

// const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     const typeClasses = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500 text-black', info: 'bg-blue-500' };
//     toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses['info']}`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, 3000);
// };

// const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' }, hourIds: {} });
// const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// const timePeriods = [
//     { label: 'Mon 7/21 - Sun 7/27', dates: ['Mon 07/21', 'Tue 07/22', 'Wed 07/23', 'Thu 07/24', 'Fri 07/25', 'Sat 07/26', 'Sun 07/27'] },
//     { label: 'Mon 7/28 - Sun 8/03',  dates: ['Mon 07/28', 'Tue 07/29', 'Wed 07/30', 'Thu 07/31', 'Fri 08/01', 'Sat 08/02', 'Sun 08/03'] },
//     { label: 'Mon 8/04 - Sun 8/10',  dates: ['Mon 08/04', 'Tue 08/05', 'Wed 08/06', 'Thu 08/07', 'Fri 08/08', 'Sat 08/09', 'Sun 08/10'] },
//     { label: 'Mon 8/11 - Sun 8/17', dates: ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'] },
//     { label: 'Mon 8/18 - Sun 8/24', dates: ['Mon 08/18', 'Tue 08/19', 'Wed 08/20', 'Thu 08/21', 'Fri 08/22', 'Sat 08/23', 'Sun 08/24'] },
//     { label: 'Mon 8/25 - Sun 8/31', dates: ['Mon 08/25', 'Tue 08/26', 'Wed 08/27', 'Thu 08/28', 'Fri 08/29', 'Sat 08/30', 'Sun 08/31'] },
//     { label: 'Mon 9/01 - Sun 9/07',   dates: ['Mon 09/01', 'Tue 09/02', 'Wed 09/03', 'Thu 09/04', 'Fri 09/05', 'Sat 09/06', 'Sun 09/07'] },
//     { label: 'Mon 9/08 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] },
//     { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] },
//     { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']},
//     { label: 'Mon 9/29 - Sun 10/5', dates: ['Mon 09/29', 'Tue 09/30', 'Wed 10/01', 'Thu 10/02', 'Fri 10/03', 'Sat 10/04', 'Sun 10/05'] },
//     { label: 'Mon 10/06 - Sun 10/12', dates: ['Mon 10/06', 'Tue 10/07', 'Wed 10/08', 'Thu 10/09', 'Fri 10/10', 'Sat 10/11', 'Sun 10/12'] },
//     { label: 'Mon 10/13 - Sun 10/19', dates: ['Mon 10/13', 'Tue 10/14', 'Wed 10/15', 'Thu 10/16', 'Fri 10/17', 'Sat 10/18', 'Sun 10/19'] },
//     { label: 'Mon 10/20 - Sun 10/26', dates: ['Mon 10/20', 'Tue 10/21', 'Wed 10/22', 'Thu 10/23', 'Fri 10/24', 'Sat 10/25', 'Sun 10/26'] },
//     { label: 'Mon 10/27 - Sun 11/02', dates: ['Mon 10/27', 'Tue 10/28', 'Wed 10/29', 'Thu 10/30', 'Fri 10/31', 'Sat 11/01', 'Sun 11/02'] }
// ];

// const getWeekEndDateFromPeriod = (period) => { if (!period?.dates?.length) return null; const lastDayString = period.dates[period.dates.length - 1]; const datePart = lastDayString.split(' ')[1]; const [month, day] = datePart.split('/'); const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10))); return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };
// const formatDateForComparison = (dateInput) => { if (!dateInput) return ''; const date = new Date(dateInput); if (isNaN(date.getTime())) return ''; return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };

// // --- Constants ---
// const DAY_KEY_MAPPING = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// const DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// const hideableColumns = ['Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', 'Remaining Hours'];

// export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null }) {
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[timePeriods.length -1]);
//     const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [modifiedHours, setModifiedHours] = useState(new Set());
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

//     const isEditMode = Boolean(timesheetToEdit);

//     useEffect(() => {
//         if (isEditMode && (!purchaseOrderData || purchaseOrderData.length === 0)) {
//             return;
//         }
//         try {
//             if (isEditMode && timesheetToEdit) {
//                 const editDateStr = formatDateForComparison(timesheetToEdit?.timesheet_Date);
//                 const matchingPeriod = timePeriods.find(period => getWeekEndDateFromPeriod(period) === editDateStr);
//                 if (matchingPeriod) setSelectedPeriod(matchingPeriod);
//                 const hoursData = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
//                 const hourIdsData = {};
//                 timesheetToEdit?.timesheetHours?.forEach(hourEntry => {
//                     if (hourEntry && hourEntry.ts_Date) {
//                         const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
//                         if (!isNaN(date.getTime())) {
//                             const dayKey = DAY_KEY_MAPPING[date.getUTCDay()];
//                             if (dayKey) {
//                                 hoursData[dayKey] = hourEntry.hours;
//                                 hourIdsData[dayKey] = hourEntry.id;
//                             }
//                         }
//                     }
//                 });
//                 let fullWorkOrderString = '';
//                 const poEntry = purchaseOrderData.find(po => po.project?.includes(timesheetToEdit.projId));
//                 if (poEntry) {
//                     const projectIndex = poEntry.project.indexOf(timesheetToEdit.projId);
//                     if (projectIndex > -1) {
//                         const correspondingDesc = poEntry.resourceDesc[projectIndex];
//                         fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
//                     }
//                 }
//                 const initialLine = { id: timesheetToEdit?.id, description: timesheetToEdit?.description || '', project: timesheetToEdit?.projId || '', plc: timesheetToEdit?.plc || '', payType: timesheetToEdit?.payType || 'SR', workOrder: fullWorkOrderString, wa_Code: poEntry?.wa_Code || '', pmUserID: poEntry?.pmUserId || '', poNumber: timesheetToEdit?.poNumber || '', rlseNumber: timesheetToEdit?.rlseNumber || '', poLineNumber: timesheetToEdit?.poLineNumber || '', hours: hoursData, hourIds: hourIdsData };
//                 setLines([initialLine]);
//             } else {
//                 setLines([createEmptyLine(1)]);
//             }
//         } catch (error) {
//             console.error("Error initializing TimesheetLine:", error);
//             showToast("Could not load timesheet data for editing.", "error");
//             onClose();
//         }
//     }, [isEditMode, timesheetToEdit, purchaseOrderData, onClose]);

//     useEffect(() => {
//         if (!resourceId) { setIsLoading(false); return; }
//         const fetchPurchaseOrders = async () => { setIsLoading(true); const API_URL = `${backendUrl}/api/PurchaseOrders/ByResourceDetails/${resourceId}`; try { const response = await fetch(API_URL); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); const data = await response.json(); setPurchaseOrderData(Array.isArray(data) ? data : []); } catch (error) { console.error("Failed to fetch purchase orders:", error); showToast("Could not load purchase order data.", "error"); setPurchaseOrderData([]); } finally { setIsLoading(false); } };
//         fetchPurchaseOrders();
//     }, [resourceId]);

//     useEffect(() => {
//         if (!resourceId) return;

//         const fetchRemainingHours = async () => {
//             setIsLoadingRemainingHours(true);
//             const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${resourceId}`;

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
//     }, [resourceId]);

//     useEffect(() => { if (isEditMode) { setIsPeriodInvalid(false); return; } const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod); if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) { setIsPeriodInvalid(true); } else { setIsPeriodInvalid(false); } }, [selectedPeriod, existingTimesheetDates, isEditMode]);

//     const handleSelectChange = (id, fieldName, value) => { setLines(currentLines => currentLines.map(line => { if (line.id === id) { const updatedLine = { ...line, [fieldName]: value }; if (fieldName === 'workOrder') { if (!value) { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; return updatedLine; } const separator = ' - '; const separatorIndex = value.indexOf(separator); const waCode = value.substring(0, separatorIndex).trim(); const desc = value.substring(separatorIndex + separator.length).trim(); const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code.trim() === waCode); if (selectedWorkOrderData) { updatedLine.wa_Code = selectedWorkOrderData.wa_Code; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.map(d => d.trim()).indexOf(desc); if (descIndex > -1) { updatedLine.description = selectedWorkOrderData.resourceDesc[descIndex] || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || ''; } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; } } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; } } return updatedLine; } return line; })); };

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
//                         const currentLineTotal = DAYS_OF_WEEK.reduce((sum, d) => {
//                             if (d === day) return sum;
//                             return sum + (parseFloat(currentLine.hours[d]) || 0);
//                         }, 0);

//                         // Calculate total hours for other lines with same PO Line Number
//                         const otherLinesWithSamePO = lines.filter(line =>
//                             line.id !== id && line.poLineNumber === poLineNumber
//                         );

//                         const otherLinesSamePOTotal = otherLinesWithSamePO.reduce((sum, line) => {
//                             return sum + DAYS_OF_WEEK.reduce((daySum, d) =>
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

//             setModifiedHours(prev => new Set(prev).add(`${id}-${day}`));
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
//                 return sum + DAYS_OF_WEEK.reduce((daySum, day) =>
//                     daySum + (parseFloat(l.hours[day]) || 0), 0
//                 );
//             }, 0);

//         return (remaining - usedHours).toFixed(2);
//     };

//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
//     const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
//     const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } setLines(lines.filter(line => !selectedLines.has(line.id))); setSelectedLines(new Set()); };

//     const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { DAYS_OF_WEEK.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);

//     const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } if (isPeriodInvalid) { showToast("Cannot copy. The selected period already has a timesheet.", "error"); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { DAYS_OF_WEEK.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };

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

//     const handleSubmit = async () => {
//         if (isPeriodInvalid) {
//             showToast("The selected period already has a timesheet.", "warning");
//             return;
//         }

//         if (grandTotal === 0) {
//             showToast("Cannot submit a timesheet with zero hours.", "warning");
//             return;
//         }

//         if (isSubmitting) return;

//         setIsSubmitting(true);

//         for (const line of lines) {
//             if (!line.project || !line.poLineNumber) {
//                 showToast(`Please complete the Work Order for all lines.`, 'warning');
//                 setIsSubmitting(false);
//                 return;
//             }
//         }

//         try {
//             const API_URL = `${backendUrl}/api/SubkTimesheet`;

//             for (const line of lines) {
//                 const lineHoursTotal = parseFloat(
//                     Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)
//                 );

//                 if (!isEditMode && lineHoursTotal === 0) continue;

//                 const method = isEditMode ? 'PUT' : 'POST';
//                 const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;
//                 const now = new Date().toISOString();

//                 const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
//                 const [month, day, year] = weekEndDateString.split('/');
//                 const weekEndDateAsISO = new Date(
//                     Date.UTC(parseInt(year, 10) || 2025, parseInt(month, 10) - 1, parseInt(day, 10))
//                 ).toISOString();

//                 const timesheetHours = DAYS_OF_WEEK
//                     .map((day, index) => {
//                         const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/');
//                         const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
//                         return {
//                             Id: isEditMode ? (line.hourIds[day] || 0) : 0,
//                             Ts_Date: dateForApi,
//                             Hours: line.hours[day] || 0,
//                             day: day
//                         };
//                     })
//                     .filter(hourEntry => {
//                         if (isEditMode) {
//                             return modifiedHours.has(`${line.id}-${hourEntry.day}`);
//                         }
//                         return hourEntry.Hours > 0;
//                     })
//                     .map(({ day, ...rest }) => rest);

//                 const payload = {
//                     Id: isEditMode ? line.id : 0,
//                     Description: line.description,
//                     ProjId: line.project,
//                     Plc: line.plc,
//                     WorkOrder: line.wa_Code,
//                     pm_User_Id: line.pmUserID,
//                     PayType: line.payType,
//                     PoNumber: line.poNumber,
//                     RlseNumber: line.rlseNumber || "0",
//                     Resource_Id: String(resourceId),
//                     PoLineNumber: parseInt(line.poLineNumber, 10) || 0,
//                     Timesheet_Date: weekEndDateAsISO,
//                     UpdatedAt: now,
//                     UpdatedBy: String(resourceId),
//                     TimesheetHours: timesheetHours,
//                     Hours: lineHoursTotal,
//                     Status: "OPEN",
//                     ApprovalStatus: "PENDING"
//                 };

//                 if (!isEditMode) {
//                     payload.CreatedAt = now;
//                     payload.CreatedBy = String(resourceId);
//                 }

//                 const response = await fetch(url, {
//                     method: method,
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });

//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(`Submission failed: ${errorText}`);
//                 }
//             }

//             showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success');
//             setModifiedHours(new Set());
//             onClose();
//         } catch (error) {
//             showToast(error.message, 'error');
//             setIsSubmitting(false);
//         }
//     };

//     const workOrderOptions = useMemo(() => { if (!purchaseOrderData) return []; const uniqueOptions = new Map(); purchaseOrderData.forEach(item => { item.resourceDesc.forEach(desc => { const value = `${item.wa_Code} - ${desc}`; uniqueOptions.set(value, { value, label: value }); }); }); return Array.from(uniqueOptions.values()); }, [purchaseOrderData]);

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     return (
//         <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 md:p-8 w-full max-w-[90vw]">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
//                 <div className="flex items-center gap-4 flex-wrap">
//                     <div className="flex flex-col items-start">
//                         <div className="flex items-center gap-2">
//                             <label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label>
//                             <select id="period-select" value={selectedPeriod.label} onChange={(e) => { const newPeriod = timePeriods.find(p => p.label === e.target.value); if (newPeriod) setSelectedPeriod(newPeriod); }} className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm" disabled={isEditMode}>{timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}</select>
//                         </div>
//                         {isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">A timesheet for this period already exists.</p>)}
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />} disabled={isPeriodInvalid}>Add Line</ActionButton>
//                         <ActionButton onClick={copyLines} icon={<CopyIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Copy</ActionButton>
//                         <ActionButton onClick={deleteLines} icon={<TrashIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Delete</ActionButton>
//                     </div>
//                 </div>
//             </div>

//             {(() => {
//                 const hiddenCount = Object.values(hiddenColumns).filter(val => val).length;
//                 const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden).map(([col]) => col);

//                 return hiddenCount > 0 ? (
//                     <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap mb-4">
//                         <div className="flex items-center gap-2">
//                             <EyeIcon className="h-4 w-4 text-blue-600" />
//                             <span className="text-sm font-medium text-gray-700">
//                                 {hiddenCount} column{hiddenCount > 1 ? 's' : ''} hidden:
//                             </span>
//                         </div>
//                         <div className="flex gap-2 flex-wrap">
//                             {hiddenColumnsList.map(col => (
//                                 <button
//                                     key={col}
//                                     onClick={() => toggleColumnVisibility(col)}
//                                     className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer"
//                                 >
//                                     {col}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={showAllHiddenColumns}
//                                 className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer"
//                             >
//                                 Show All
//                             </button>
//                         </div>
//                     </div>
//                 ) : null;
//             })()}

//             <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                 <table className="w-full text-sm min-w-[1600px]">
//                     <thead className="bg-slate-100/70 border-b border-gray-200/80">
//                         <tr>
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
//                             {hideableColumns.map(col => (
//                                 !hiddenColumns[col] && (
//                                     <th
//                                         key={col}
//                                         className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
//                                     >
//                                         <div className="flex items-center justify-between gap-2 group">
//                                             <span>{col}</span>
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation();
//                                                     toggleColumnVisibility(col);
//                                                 }}
//                                                 className="p-1 hover:bg-red-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
//                                                 title="Hide column"
//                                                 type="button"
//                                             >
//                                                 <XIcon className="h-3.5 w-3.5 text-red-600" />
//                                             </button>
//                                         </div>
//                                     </th>
//                                 )
//                             ))}
//                             {selectedPeriod.dates.map(date => <th key={date} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{date}</th>)}
//                             <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                         {lines.map((line, index) => {
//                             const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                             return (
//                                 <tr key={line.id} className="hover:bg-slate-50/50">
//                                     <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isPeriodInvalid} /></td>
//                                     <td className="p-3 text-center text-gray-500">{index + 1}</td>

//                                     {!hiddenColumns['Work Order'] && (
//                                         <td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} disabled={isPeriodInvalid} /></td>
//                                     )}
//                                     {!hiddenColumns['Description'] && (
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['Project'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PLC'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['Pay Type'] && (
//                                         <td className="p-2 min-w-[120px]"><select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${isPeriodInvalid ? 'bg-gray-100 cursor-not-allowed' : ''}`} disabled={isPeriodInvalid}><option value="SR">SR (Subcontractor Regular)</option><option value="SO">SO (Subcontractor Overtime)</option></select></td>
//                                     )}
//                                     {!hiddenColumns['PO Number'] && (
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['RLSE Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {!hiddenColumns['PO Line Number'] && (
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                     )}
//                                     {/* {!hiddenColumns['Remaining Hours'] && (
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
//                                     )} */}

//                                     {!hiddenColumns['Remaining Hours'] && (
//     <td className="p-2 min-w-[120px]">
//         {(() => {
//             if (!line.poLineNumber) {
//                 return <div className="text-xs font-medium text-center text-gray-400">-</div>;
//             }

//             const remainingHours = getRemainingHoursForLine(line);

//             if (remainingHours === null) {
//                 return <div className="text-xs font-medium text-center text-gray-400">-</div>;
//             }

//             const hoursValue = parseFloat(remainingHours);

//             return (
//                 <div className="text-xs font-medium text-center">
//                     <span className={`font-semibold ${hoursValue < 0 ? 'text-red-600' : 'text-green-600'}`}>
//                         {remainingHours} hrs
//                     </span>
//                 </div>
//             );
//         })()}
//     </td>
// )}

//                                     {DAYS_OF_WEEK.map((day, dayIndex) => {
//                                         const dateString = selectedPeriod.dates[dayIndex];
//                                         const dateParts = dateString.split(' ')[1].split('/');
//                                         const month = parseInt(dateParts[0], 10) - 1;
//                                         const dayOfMonth = parseInt(dateParts[1], 10);
//                                         const currentYear = new Date().getFullYear();
//                                         const columnDate = new Date(currentYear, month, dayOfMonth);
//                                         const isFutureDate = columnDate > today;
//                                         const isWeekend = day === 'sat' || day === 'sun';
//                                         const isDisabled = isPeriodInvalid || isFutureDate;

//                                         return (
//                                             <td key={day} className="p-2">
//                                                 <input
//                                                     type="number"
//                                                     step="0.5"
//                                                     value={line.hours[day]}
//                                                     onChange={e => handleHourChange(line.id, day, e.target.value)}
//                                                     className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || isDisabled ? 'bg-gray-100' : 'bg-white'} ${isDisabled ? 'cursor-not-allowed' : ''}`}
//                                                     disabled={isDisabled}
//                                                 />
//                                             </td>
//                                         );
//                                     })}
//                                     <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                     <tfoot className="bg-slate-200/80 font-semibold">
//                         <tr className="border-t-2 border-gray-300">
//                             <td colSpan={2 + hideableColumns.filter(col => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>
//                             {DAYS_OF_WEEK.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
//                             <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
//                         </tr>
//                     </tfoot>
//                 </table>
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
//                 <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
//                 <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting || lines.length === 0}>{isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}</ActionButton>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { backendUrl } from "./config";

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

// --- Helper Components & Data ---
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
  wa_Code: "",
  pmUserID: "",
  payType: "SR",
  poNumber: "",
  rlseNumber: "",
  poLineNumber: "",
  hours: { mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "" },
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

const timePeriods = [
  {
    label: "Mon 7/21 - Sun 7/27",
    dates: [
      "Mon 07/21",
      "Tue 07/22",
      "Wed 07/23",
      "Thu 07/24",
      "Fri 07/25",
      "Sat 07/26",
      "Sun 07/27",
    ],
  },
  {
    label: "Mon 7/28 - Sun 8/03",
    dates: [
      "Mon 07/28",
      "Tue 07/29",
      "Wed 07/30",
      "Thu 07/31",
      "Fri 08/01",
      "Sat 08/02",
      "Sun 08/03",
    ],
  },
  {
    label: "Mon 8/04 - Sun 8/10",
    dates: [
      "Mon 08/04",
      "Tue 08/05",
      "Wed 08/06",
      "Thu 08/07",
      "Fri 08/08",
      "Sat 08/09",
      "Sun 08/10",
    ],
  },
  {
    label: "Mon 8/11 - Sun 8/17",
    dates: [
      "Mon 08/11",
      "Tue 08/12",
      "Wed 08/13",
      "Thu 08/14",
      "Fri 08/15",
      "Sat 08/16",
      "Sun 08/17",
    ],
  },
  {
    label: "Mon 8/18 - Sun 8/24",
    dates: [
      "Mon 08/18",
      "Tue 08/19",
      "Wed 08/20",
      "Thu 08/21",
      "Fri 08/22",
      "Sat 08/23",
      "Sun 08/24",
    ],
  },
  {
    label: "Mon 8/25 - Sun 8/31",
    dates: [
      "Mon 08/25",
      "Tue 08/26",
      "Wed 08/27",
      "Thu 08/28",
      "Fri 08/29",
      "Sat 08/30",
      "Sun 08/31",
    ],
  },
  {
    label: "Mon 9/01 - Sun 9/07",
    dates: [
      "Mon 09/01",
      "Tue 09/02",
      "Wed 09/03",
      "Thu 09/04",
      "Fri 09/05",
      "Sat 09/06",
      "Sun 09/07",
    ],
  },
  {
    label: "Mon 9/08 - Sun 9/14",
    dates: [
      "Mon 09/08",
      "Tue 09/09",
      "Wed 09/10",
      "Thu 09/11",
      "Fri 09/12",
      "Sat 09/13",
      "Sun 09/14",
    ],
  },
  {
    label: "Mon 9/15 - Sun 9/21",
    dates: [
      "Mon 09/15",
      "Tue 09/16",
      "Wed 09/17",
      "Thu 09/18",
      "Fri 09/19",
      "Sat 09/20",
      "Sun 09/21",
    ],
  },
  {
    label: "Mon 9/22 - Sun 9/28",
    dates: [
      "Mon 09/22",
      "Tue 09/23",
      "Wed 09/24",
      "Thu 09/25",
      "Fri 09/26",
      "Sat 09/27",
      "Sun 09/28",
    ],
  },
  {
    label: "Mon 9/29 - Sun 10/5",
    dates: [
      "Mon 09/29",
      "Tue 09/30",
      "Wed 10/01",
      "Thu 10/02",
      "Fri 10/03",
      "Sat 10/04",
      "Sun 10/05",
    ],
  },
  {
    label: "Mon 10/06 - Sun 10/12",
    dates: [
      "Mon 10/06",
      "Tue 10/07",
      "Wed 10/08",
      "Thu 10/09",
      "Fri 10/10",
      "Sat 10/11",
      "Sun 10/12",
    ],
  },
  {
    label: "Mon 10/13 - Sun 10/19",
    dates: [
      "Mon 10/13",
      "Tue 10/14",
      "Wed 10/15",
      "Thu 10/16",
      "Fri 10/17",
      "Sat 10/18",
      "Sun 10/19",
    ],
  },
  {
    label: "Mon 10/20 - Sun 10/26",
    dates: [
      "Mon 10/20",
      "Tue 10/21",
      "Wed 10/22",
      "Thu 10/23",
      "Fri 10/24",
      "Sat 10/25",
      "Sun 10/26",
    ],
  },
  {
    label: "Mon 10/27 - Sun 11/02",
    dates: [
      "Mon 10/27",
      "Tue 10/28",
      "Wed 10/29",
      "Thu 10/30",
      "Fri 10/31",
      "Sat 11/01",
      "Sun 11/02",
    ],
  },
];

const getWeekEndDateFromPeriod = (period) => {
  if (!period?.dates?.length) return null;
  const lastDayString = period.dates[period.dates.length - 1];
  const datePart = lastDayString.split(" ")[1];
  const [month, day] = datePart.split("/");
  const date = new Date(
    Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10))
  );
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};
const formatDateForComparison = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};

// --- Constants ---
const DAY_KEY_MAPPING = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAYS_OF_WEEK = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const hideableColumns = [
  "Work Order",
  "Description",
  "Project",
  "PLC",
  "Pay Type",
  "PO Number",
  "RLSE Number",
  "PO Line Number",
  " PO Remaining Hours",
];

export default function TimesheetLine({
  onClose,
  resourceId,
  existingTimesheetDates = [],
  timesheetToEdit = null,
}) {
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedLines, setSelectedLines] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(
    timePeriods[timePeriods.length - 1]
  );
  const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modifiedHours, setModifiedHours] = useState(new Set());
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

  const isEditMode = Boolean(timesheetToEdit);

  useEffect(() => {
    if (isEditMode && (!purchaseOrderData || purchaseOrderData.length === 0)) {
      return;
    }
    try {
      if (isEditMode && timesheetToEdit) {
        const editDateStr = formatDateForComparison(
          timesheetToEdit?.timesheet_Date
        );
        const matchingPeriod = timePeriods.find(
          (period) => getWeekEndDateFromPeriod(period) === editDateStr
        );
        if (matchingPeriod) setSelectedPeriod(matchingPeriod);
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
        timesheetToEdit?.timesheetHours?.forEach((hourEntry) => {
          if (hourEntry && hourEntry.ts_Date) {
            const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
            if (!isNaN(date.getTime())) {
              const dayKey = DAY_KEY_MAPPING[date.getUTCDay()];
              if (dayKey) {
                hoursData[dayKey] = hourEntry.hours;
                hourIdsData[dayKey] = hourEntry.id;
              }
            }
          }
        });
        let fullWorkOrderString = "";
        const poEntry = purchaseOrderData.find((po) =>
          po.project?.includes(timesheetToEdit.projId)
        );
        if (poEntry) {
          const projectIndex = poEntry.project.indexOf(timesheetToEdit.projId);
          if (projectIndex > -1) {
            const correspondingDesc = poEntry.resourceDesc[projectIndex];
            fullWorkOrderString = `${poEntry.wa_Code} - ${correspondingDesc}`;
          }
        }
        const initialLine = {
          id: timesheetToEdit?.id,
          description: timesheetToEdit?.description || "",
          project: timesheetToEdit?.projId || "",
          plc: timesheetToEdit?.plc || "",
          payType: timesheetToEdit?.payType || "SR",
          workOrder: fullWorkOrderString,
          wa_Code: poEntry?.wa_Code || "",
          pmUserID: poEntry?.pmUserId || "",
          poNumber: timesheetToEdit?.poNumber || "",
          rlseNumber: timesheetToEdit?.rlseNumber || "",
          poLineNumber: timesheetToEdit?.poLineNumber || "",
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
  }, [isEditMode, timesheetToEdit, purchaseOrderData, onClose]);

  useEffect(() => {
    if (!resourceId) {
      setIsLoading(false);
      return;
    }
    const fetchPurchaseOrders = async () => {
      setIsLoading(true);
      const API_URL = `${backendUrl}/api/PurchaseOrders/ByResourceDetails/${resourceId}`;
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
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
    if (!resourceId) return;

    const fetchRemainingHours = async () => {
      setIsLoadingRemainingHours(true);
      const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${resourceId}`;

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
            if (item.poLineNumber) {
              hoursMap[item.poLineNumber] =
                parseFloat(item.remainingHours) || 0;
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
    setLines((currentLines) =>
      currentLines.map((line) => {
        if (line.id === id) {
          const updatedLine = { ...line, [fieldName]: value };
          if (fieldName === "workOrder") {
            if (!value) {
              updatedLine.description = "";
              updatedLine.project = "";
              updatedLine.plc = "";
              updatedLine.poNumber = "";
              updatedLine.rlseNumber = "";
              updatedLine.poLineNumber = "";
              updatedLine.wa_Code = "";
              updatedLine.pmUserID = "";
              return updatedLine;
            }
            const separator = " - ";
            const separatorIndex = value.indexOf(separator);
            const waCode = value.substring(0, separatorIndex).trim();
            const desc = value
              .substring(separatorIndex + separator.length)
              .trim();
            const selectedWorkOrderData = purchaseOrderData.find(
              (item) => item.wa_Code.trim() === waCode
            );
            if (selectedWorkOrderData) {
              updatedLine.wa_Code = selectedWorkOrderData.wa_Code;
              updatedLine.pmUserID = selectedWorkOrderData.pmUserId || "";
              const descIndex = selectedWorkOrderData.resourceDesc
                .map((d) => d.trim())
                .indexOf(desc);
              if (descIndex > -1) {
                updatedLine.description =
                  selectedWorkOrderData.resourceDesc[descIndex] || "";
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
              updatedLine.description = "";
              updatedLine.project = "";
              updatedLine.plc = "";
              updatedLine.poNumber = "";
              updatedLine.rlseNumber = "";
              updatedLine.poLineNumber = "";
              updatedLine.wa_Code = "";
              updatedLine.pmUserID = "";
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

        if (currentLine && currentLine.poLineNumber) {
          const poLineNumber = currentLine.poLineNumber;
          const remainingHours = remainingPoHours[poLineNumber];

          if (remainingHours !== undefined) {
            // Calculate current total hours for this line (excluding the day being changed)
            const currentLineTotal = DAYS_OF_WEEK.reduce((sum, d) => {
              if (d === day) return sum;
              return sum + (parseFloat(currentLine.hours[d]) || 0);
            }, 0);

            // Calculate total hours for other lines with same PO Line Number
            const otherLinesWithSamePO = lines.filter(
              (line) => line.id !== id && line.poLineNumber === poLineNumber
            );

            const otherLinesSamePOTotal = otherLinesWithSamePO.reduce(
              (sum, line) => {
                return (
                  sum +
                  DAYS_OF_WEEK.reduce(
                    (daySum, d) => daySum + (parseFloat(line.hours[d]) || 0),
                    0
                  )
                );
              },
              0
            );

            const newTotalForPO =
              currentLineTotal + numValue + otherLinesSamePOTotal;

            if (newTotalForPO > remainingHours) {
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

      setModifiedHours((prev) => new Set(prev).add(`${id}-${day}`));
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

  const getRemainingHoursForLine = (line) => {
    if (!line.poLineNumber) return null;
    const remaining = remainingPoHours[line.poLineNumber];
    if (remaining === undefined) return null;

    // Calculate used hours for this PO line across all lines
    const usedHours = lines
      .filter((l) => l.poLineNumber === line.poLineNumber)
      .reduce((sum, l) => {
        return (
          sum +
          DAYS_OF_WEEK.reduce(
            (daySum, day) => daySum + (parseFloat(l.hours[day]) || 0),
            0
          )
        );
      }, 0);

    return (remaining - usedHours).toFixed(2);
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
    setLines(lines.filter((line) => !selectedLines.has(line.id)));
    setSelectedLines(new Set());
  };

  const dailyTotals = useMemo(() => {
    const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    lines.forEach((line) => {
      DAYS_OF_WEEK.forEach((day) => {
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
    if (isPeriodInvalid) {
      showToast(
        "Cannot copy. The selected period already has a timesheet.",
        "error"
      );
      return;
    }
    const linesToCopy = lines.filter((line) => selectedLines.has(line.id));
    const potentialTotals = { ...dailyTotals };
    let validationFailed = false;
    linesToCopy.forEach((lineToCopy) => {
      DAYS_OF_WEEK.forEach((day) => {
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

  const handleSubmit = async () => {
    if (isPeriodInvalid) {
      showToast("The selected period already has a timesheet.", "warning");
      return;
    }

    if (grandTotal === 0) {
      showToast("Cannot submit a timesheet with zero hours.", "warning");
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    for (const line of lines) {
      if (!line.project || !line.poLineNumber) {
        showToast(`Please complete the Work Order for all lines.`, "warning");
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const API_URL = `${backendUrl}/api/SubkTimesheet`;

      for (const line of lines) {
        const lineHoursTotal = parseFloat(
          Object.values(line.hours)
            .reduce((s, h) => s + (parseFloat(h) || 0), 0)
            .toFixed(2)
        );

        if (!isEditMode && lineHoursTotal === 0) continue;

        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;
        const now = new Date().toISOString();

        const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
        const [month, day, year] = weekEndDateString.split("/");
        const weekEndDateAsISO = new Date(
          Date.UTC(
            parseInt(year, 10) || 2025,
            parseInt(month, 10) - 1,
            parseInt(day, 10)
          )
        ).toISOString();

        const timesheetHours = DAYS_OF_WEEK.map((day, index) => {
          const dateParts = selectedPeriod.dates[index]
            .split(" ")[1]
            .split("/");
          const dateForApi = `2025-${dateParts[0].padStart(
            2,
            "0"
          )}-${dateParts[1].padStart(2, "0")}`;
          return {
            Id: isEditMode ? line.hourIds[day] || 0 : 0,
            Ts_Date: dateForApi,
            Hours: line.hours[day] || 0,
            day: day,
          };
        })
          .filter((hourEntry) => {
            if (isEditMode) {
              return modifiedHours.has(`${line.id}-${hourEntry.day}`);
            }
            return hourEntry.Hours > 0;
          })
          .map(({ day, ...rest }) => rest);

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
          Hours: lineHoursTotal,
          Status: "OPEN",
          ApprovalStatus: "PENDING",
        };

        if (!isEditMode) {
          payload.CreatedAt = now;
          payload.CreatedBy = String(resourceId);
        }

        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Submission failed: ${errorText}`);
        }
      }

      showToast(
        `Timesheet ${isEditMode ? "updated" : "created"} successfully!`,
        "success"
      );
      setModifiedHours(new Set());
      onClose();
    } catch (error) {
      showToast(error.message, "error");
      setIsSubmitting(false);
    }
  };

  const workOrderOptions = useMemo(() => {
    if (!purchaseOrderData) return [];
    const uniqueOptions = new Map();
    purchaseOrderData.forEach((item) => {
      item.resourceDesc.forEach((desc) => {
        const value = `${item.wa_Code} - ${desc}`;
        uniqueOptions.set(value, { value, label: value });
      });
    });
    return Array.from(uniqueOptions.values());
  }, [purchaseOrderData]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 md:p-8 w-full max-w-[90vw]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "View / Edit Timesheet" : "Create Timesheet"}
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <label
                htmlFor="period-select"
                className="text-sm font-medium text-gray-700"
              >
                Select Period:
              </label>
              <select
                id="period-select"
                value={selectedPeriod.label}
                onChange={(e) => {
                  const newPeriod = timePeriods.find(
                    (p) => p.label === e.target.value
                  );
                  if (newPeriod) setSelectedPeriod(newPeriod);
                }}
                className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                disabled={isEditMode}
              >
                {timePeriods.map((period) => (
                  <option key={period.label} value={period.label}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
            {isPeriodInvalid && (
              <p className="text-xs text-red-600 font-semibold mt-1">
                A timesheet for this period already exists.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={addLine}
              variant="primary"
              icon={<PlusIcon />}
              disabled={isPeriodInvalid}
            >
              Add Line
            </ActionButton>
            <ActionButton
              onClick={copyLines}
              icon={<CopyIcon />}
              disabled={isPeriodInvalid || selectedLines.size === 0}
            >
              Copy
            </ActionButton>
            <ActionButton
              onClick={deleteLines}
              icon={<TrashIcon />}
              disabled={isPeriodInvalid || selectedLines.size === 0}
            >
              Delete
            </ActionButton>
          </div>
        </div>
      </div>

      {(() => {
        const hiddenCount = Object.values(hiddenColumns).filter(
          (val) => val
        ).length;
        const hiddenColumnsList = Object.entries(hiddenColumns)
          .filter(([col, isHidden]) => isHidden)
          .map(([col]) => col);

        return hiddenCount > 0 ? (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap mb-4">
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
        ) : null;
      })()}

      <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
        <table className="w-full text-sm min-w-[1600px]">
          <thead className="bg-slate-100/70 border-b border-gray-200/80">
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
              {selectedPeriod.dates.map((date) => (
                <th
                  key={date}
                  className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"
                >
                  {date}
                </th>
              ))}
              <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/80 bg-white/50">
            {lines.map((line, index) => {
              const rowTotal = Object.values(line.hours)
                .reduce((s, h) => s + (parseFloat(h) || 0), 0)
                .toFixed(2);
              return (
                <tr key={line.id} className="hover:bg-slate-50/50">
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedLines.has(line.id)}
                      onChange={() => handleSelectLine(line.id)}
                      disabled={isPeriodInvalid}
                    />
                  </td>
                  <td className="p-3 text-center text-gray-500">{index + 1}</td>

                  {!hiddenColumns["Work Order"] && (
                    <td className="p-2 min-w-[250px]">
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
                        disabled={isPeriodInvalid}
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
                      <select
                        value={line.payType}
                        onChange={(e) =>
                          handleSelectChange(line.id, "payType", e.target.value)
                        }
                        className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${
                          isPeriodInvalid
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={isPeriodInvalid}
                      >
                        <option value="SR">SR (Subcontractor Regular)</option>
                        <option value="SO">SO (Subcontractor Overtime)</option>
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
                      remainingPoHours[line.poLineNumber] !== undefined ? (
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

                  {DAYS_OF_WEEK.map((day, dayIndex) => {
                    const dateString = selectedPeriod.dates[dayIndex];
                    const dateParts = dateString.split(" ")[1].split("/");
                    const month = parseInt(dateParts[0], 10) - 1;
                    const dayOfMonth = parseInt(dateParts[1], 10);
                    const currentYear = new Date().getFullYear();
                    const columnDate = new Date(currentYear, month, dayOfMonth);
                    const isFutureDate = columnDate > today;
                    const isWeekend = day === "sat" || day === "sun";
                    const isDisabled = isPeriodInvalid || isFutureDate;

                    return (
                      <td key={day} className="p-2">
                        <input
                          type="number"
                          step="0.5"
                          value={line.hours[day]}
                          onChange={(e) =>
                            handleHourChange(line.id, day, e.target.value)
                          }
                          className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${
                            isWeekend || isDisabled ? "bg-gray-100" : "bg-white"
                          } ${isDisabled ? "cursor-not-allowed" : ""}`}
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
          <tfoot className="bg-slate-200/80 font-semibold">
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
              {DAYS_OF_WEEK.map((day) => (
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
      <div className="mt-6 flex justify-end gap-3">
        <ActionButton onClick={onClose} variant="secondary">
          Cancel
        </ActionButton>
        <ActionButton
          onClick={handleSubmit}
          variant="primary"
          disabled={isPeriodInvalid || isSubmitting || lines.length === 0}
        >
          {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Save"}
        </ActionButton>
      </div>
    </div>
  );
}

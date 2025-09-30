// import React, { useState, useEffect, useMemo, useRef } from 'react';

// // --- SVG Icons ---
// const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
// const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
// const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

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
//     setTimeout(() => { document.body.removeChild(toast); }, 3000);
// };

// // --- Initial empty line structure ---
// const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });

// // --- CascadingSelect Component ---
// const CascadingSelect = ({ label, options, value, onChange, disabled = false, disabledOptions = new Set() }) => (
//     <select 
//         value={value} 
//         onChange={onChange} 
//         disabled={disabled} 
//         className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
//     >
//         <option value="">Select {label}</option>
//         {options.map(opt => <option key={opt.value} value={opt.value} disabled={disabledOptions.has(opt.value)}>{opt.label}</option>)}
//     </select>
// );

// // --- Data for the period dropdown ---
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
//     { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']}
// ];

// // --- Helper Functions ---
// const getWeekEndDateFromPeriod = (period) => {
//     if (!period?.dates?.length) return null;
//     const lastDayString = period.dates[period.dates.length - 1];
//     const datePart = lastDayString.split(' ')[1];
//     const [month, day] = datePart.split('/');
//     const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10)));
//     return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
// };

// const formatDateForComparison = (dateInput) => {
//     if (!dateInput) return '';
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return '';
//     return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
// };

// export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null }) {
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[0]);
//     const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);

//     const isEditMode = Boolean(timesheetToEdit);
//     const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
//     const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

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
//                             const dayKey = dayKeyMapping[date.getUTCDay()];
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

//                 const initialLine = {
//                     id: timesheetToEdit?.id,
//                     description: timesheetToEdit?.description || '',
//                     project: timesheetToEdit?.projId || '',
//                     plc: timesheetToEdit?.plc || '',
//                     payType: timesheetToEdit?.payType || 'SR',
//                     workOrder: fullWorkOrderString,
//                     wa_Code: poEntry?.wa_Code || '',
//                     pmUserID: poEntry?.pmUserId || '',
//                     poNumber: timesheetToEdit?.poNumber || '',
//                     rlseNumber: timesheetToEdit?.rlseNumber || '',
//                     poLineNumber: timesheetToEdit?.poLineNumber || '',
//                     hours: hoursData,
//                     hourIds: hourIdsData,
//                 };
//                 setLines([initialLine]);
//             } else {
//                 setLines([createEmptyLine(1)]);
//             }
//         } catch (error) {
//             console.error("Error initializing TimesheetLine:", error);
//             showToast("Could not load timesheet data for editing.", "error");
//             onClose();
//         }
//     }, [isEditMode, timesheetToEdit, purchaseOrderData]);

//     useEffect(() => {
//         if (!resourceId) {
//             setIsLoading(false);
//             return;
//         }
//         const fetchPurchaseOrders = async () => {
//             setIsLoading(true);
//             const API_URL = `https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${resourceId}`;
//             try {
//                 const response = await fetch(API_URL);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();
//                 setPurchaseOrderData(Array.isArray(data) ? data : []);
//             } catch (error) {
//                 console.error("Failed to fetch purchase orders:", error);
//                 showToast("Could not load purchase order data.", "error");
//                 setPurchaseOrderData([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchPurchaseOrders();
//     }, [resourceId]);
    
//     useEffect(() => {
//         if (isEditMode) {
//             setIsPeriodInvalid(false);
//             return;
//         }
//         const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod);
//         if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) {
//             setIsPeriodInvalid(true);
//         } else {
//             setIsPeriodInvalid(false);
//         }
//     }, [selectedPeriod, existingTimesheetDates, isEditMode]);

//     const handleSelectChange = (id, fieldName, value) => {
//         const lineToChange = lines.find(l => l.id === id);
//         if (!lineToChange) return;

//         const prospectiveWorkOrder = fieldName === 'workOrder' ? value : lineToChange.workOrder;
//         const prospectivePayType = fieldName === 'payType' ? value : lineToChange.payType;

//         if (prospectiveWorkOrder) {
//             const isDuplicate = lines.some(otherLine =>
//                 otherLine.id !== id &&
//                 otherLine.workOrder === prospectiveWorkOrder &&
//                 otherLine.payType === prospectivePayType
//             );

//             if (isDuplicate) {
//                 showToast("This combination of Work Order and Pay Type already exists.", "warning");
//                 setLines(prevLines => [...prevLines]); // Force a re-render to revert the dropdown
//                 return;
//             }
//         }

//         setLines(currentLines => currentLines.map(line => {
//             if (line.id === id) {
//                 const updatedLine = { ...line, [fieldName]: value };

//                 if (fieldName === 'workOrder') {
//                     if (!value) {
//                         return { ...createEmptyLine(id), id: line.id }; // Reset line but keep ID
//                     }

//                     const [waCode, desc] = value.split(' - ');
//                     const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code === waCode && item.resourceDesc.includes(desc));

//                     if (selectedWorkOrderData) {
//                         updatedLine.wa_Code = selectedWorkOrderData.wa_Code;
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
//                     }
//                 }
//                 return updatedLine;
//             }
//             return line;
//         }));
//     };

//     const handleHourChange = (id, day, value) => {
//         const numValue = parseFloat(value);
//         if (value !== '' && (isNaN(numValue) || numValue < 0 || numValue > 24 || (numValue % 0.5 !== 0))) {
//             showToast('Hours must be a number between 0 and 24, in 0.5 increments.', 'warning');
//             return;
//         }

//         const currentVal = value === '' ? 0 : numValue;
//         const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
//         if (otherLinesTotal + currentVal > 24) {
//             showToast(`Total hours for this day cannot exceed 24.`, 'warning');
//             return;
//         }

//         setLines(currentLines =>
//             currentLines.map(line =>
//                 line.id === id
//                 ? { ...line, hours: { ...line.hours, [day]: value === '' ? 0 : currentVal } }
//                 : line
//             )
//         );
//     };

//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
    
//     const handleSelectLine = (id) => {
//         const newSelection = new Set(selectedLines);
//         newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
//         setSelectedLines(newSelection);
//     };

//     const deleteLines = () => {
//         if (selectedLines.size === 0) return showToast('Please select lines to delete.', 'warning');
//         setLines(lines.filter(line => !selectedLines.has(line.id)));
//         setSelectedLines(new Set());
//     };

//     const copyLines = () => {
//         if (selectedLines.size === 0) return showToast('Please select lines to copy.', 'warning');

//         const linesToCopy = lines.filter(line => selectedLines.has(line.id));
//         const potentialTotals = { ...dailyTotals };
//         let validationFailed = false;

//         linesToCopy.forEach(lineToCopy => {
//             days.forEach(day => {
//                 potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0;
//                 if (potentialTotals[day] > 24) validationFailed = true;
//             });
//         });

//         if (validationFailed) return showToast("Copying would exceed 24 hours on a day.", "error");
        
//         showToast("Line copied. Please select a new Work Order.", "info");
//         const newLines = linesToCopy.map(line => ({
//             ...line,
//             hours: { ...line.hours },
//             workOrder: '', description: '', project: '', plc: '', poNumber: '', rlseNumber: '', poLineNumber: '',
//             id: `temp-${Date.now()}-${Math.random()}`,
//             hourIds: {}
//         }));
//         setLines(prev => [...prev, ...newLines]);
//         setSelectedLines(new Set());
//     };

//     const handleSubmit = async () => {
//         setIsSubmitting(true);

//         // --- Start of Fix ---
//         for (const line of lines) {
//             const totalHoursForLine = Object.values(line.hours).reduce((sum, h) => sum + (parseFloat(h) || 0), 0);
//             if (totalHoursForLine > 0 && !line.workOrder) {
//                 showToast(`Please select a Work Order for all lines with hours entered.`, 'warning');
//                 setIsSubmitting(false);
//                 return;
//             }
//         }
//         // --- End of Fix ---

//         if (grandTotal === 0) {
//             showToast("Cannot submit a timesheet with zero hours.", "warning");
//             setIsSubmitting(false);
//             return;
//         }

//         const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//         for (const line of lines.filter(l => Object.values(l.hours).some(h => (parseFloat(h) || 0) > 0))) {
//             const method = isEditMode ? 'PUT' : 'POST';
//             const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;
//             const now = new Date().toISOString();
//             const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
//             const weekEndDateAsISO = new Date(weekEndDateString).toISOString();
//             const timesheetHours = days.map((day, index) => {
//                 const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/');
//                 const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
//                 return {
//                     Id: isEditMode ? (line.hourIds[day] || 0) : 0,
//                     Ts_Date: dateForApi,
//                     Hours: line.hours[day] || 0
//                 };
//             });

//             const payload = {
//                 Id: isEditMode ? line.id : 0,
//                 Description: line.description,
//                 ProjId: line.project,
//                 Plc: line.plc,
//                 WorkOrder: line.wa_Code,
//                 pm_User_Id: line.pmUserID,
//                 PayType: line.payType,
//                 PoNumber: line.poNumber,
//                 RlseNumber: line.rlseNumber || "0",
//                 Resource_Id: String(resourceId),
//                 PoLineNumber: parseInt(line.poLineNumber, 10) || 0,
//                 Timesheet_Date: weekEndDateAsISO,
//                 UpdatedAt: now,
//                 UpdatedBy: String(resourceId),
//                 TimesheetHours: timesheetHours,
//                 Hours: parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)),
//                 Status: "OPEN",
//                 ApprovalStatus: "PENDING"
//             };

//             if (!isEditMode) {
//                 payload.CreatedAt = now;
//                 payload.CreatedBy = String(resourceId);
//             }

//             try {
//                 const response = await fetch(url, {
//                     method: method,
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(payload)
//                 });
//                 if (!response.ok) {
//                     const errorText = await response.text();
//                     throw new Error(`Submission failed: ${errorText}`);
//                 }
//             } catch (error) {
//                 showToast(error.message, 'error');
//                 setIsSubmitting(false);
//                 return;
//             }
//         }

//         showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success');
//         onClose(true); // Pass true to indicate success for refresh
//     };

//     const workOrderOptions = useMemo(() => {
//         return Array.from(new Map(purchaseOrderData.flatMap(item => 
//             (item.resourceDesc || []).map(desc => {
//                 const label = `${item.wa_Code} - ${desc}`;
//                 return [label, { value: label, label }];
//             })
//         )).values());
//     }, [purchaseOrderData]);

//     const fullyUsedWorkOrders = useMemo(() => {
//         const lineCounts = lines.reduce((acc, line) => {
//             if (line.workOrder) acc.set(line.workOrder, (acc.get(line.workOrder) || 0) + 1);
//             return acc;
//         }, new Map());
//         return new Set([...lineCounts.keys()].filter(wo => lineCounts.get(wo) >= 2));
//     }, [lines]);

//     const dailyTotals = useMemo(() => {
//         return lines.reduce((totals, line) => {
//             days.forEach(day => {
//                 totals[day] += parseFloat(line.hours[day]) || 0;
//             });
//             return totals;
//         }, { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 });
//     }, [lines]);

//     const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

//     if (isLoading) { return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="text-white text-xl">Loading Data...</div></div>; }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
//             <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[90vw] mx-auto my-4 overflow-y-auto max-h-[95vh]">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
//                     <div className="flex items-center gap-4 flex-wrap">
//                         <div className="flex flex-col items-start">
//                             <div className="flex items-center gap-2">
//                                 <label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label>
//                                 <select
//                                     id="period-select"
//                                     value={selectedPeriod.label}
//                                     onChange={(e) => {
//                                         const newPeriod = timePeriods.find(p => p.label === e.target.value);
//                                         if (newPeriod) setSelectedPeriod(newPeriod);
//                                     }}
//                                     className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
//                                     disabled={isEditMode}
//                                 >
//                                     {timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}
//                                 </select>
//                             </div>
//                             {isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">Warning: A timesheet for this period already exists.</p>)}
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
//                             <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
//                             <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                     <table className="w-full text-sm min-w-[1600px]">
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80">
//                             <tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...selectedPeriod.dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                             {lines.map((line, index) => {
//                                 const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                                 return (
//                                     <tr key={line.id} className="hover:bg-slate-50/50">
//                                         <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} /></td>
//                                         <td className="p-3 text-center text-gray-500">{index + 1}</td>
//                                         <td className="p-2 min-w-[150px]">
//                                             <CascadingSelect 
//                                                 label="Work Order" 
//                                                 options={workOrderOptions} 
//                                                 value={line.workOrder} 
//                                                 onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)}
//                                                 disabledOptions={new Set([...fullyUsedWorkOrders].filter(wo => wo !== line.workOrder))}
//                                             />
//                                         </td>
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]">
//                                             <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md">
//                                                 <option value="SR">SR (Subcontractor Regular)</option>
//                                                 <option value="SO">SO (Subcontractor Overtime)</option>
//                                             </select>
//                                         </td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         {days.map(day => {
//                                             const isWeekend = day === 'sat' || day === 'sun';
//                                             return(
//                                                 <td key={day} className="p-2">
//                                                     <input 
//                                                         type="number" 
//                                                         step="0.5" 
//                                                         value={line.hours[day]} 
//                                                         onChange={e => handleHourChange(line.id, day, e.target.value)} 
//                                                         className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend ? 'bg-gray-100' : 'bg-white'}`} 
//                                                     />
//                                                 </td>
//                                             );
//                                         })}
//                                         <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                         <tfoot className="bg-slate-200/80 font-semibold">
//                             <tr className="border-t-2 border-gray-300">
//                                 <td colSpan="10" className="p-3 text-right text-gray-800">Total Hours</td>
//                                 {days.map(day => (
//                                     <td key={day} className="p-2 text-center">
//                                         <div className={`w-20 p-1.5`}>
//                                             {dailyTotals[day].toFixed(2)}
//                                         </div>
//                                     </td>
//                                 ))}
//                                 <td className="p-3 text-right font-bold text-blue-700 pr-4">
//                                     {grandTotal.toFixed(2)}
//                                 </td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//                 <div className="mt-6 flex justify-end gap-3">
//                     <ActionButton onClick={() => onClose(false)} variant="secondary">Cancel</ActionButton>
//                     <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting}>
//                         {isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}
//                     </ActionButton>
//                 </div>
//             </div>
//         </div>
//     );
// }


// Working Code Below: 

// import React, { useState, useEffect, useMemo, useRef } from 'react';

// // --- SVG Icons ---
// const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
// const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
// const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

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
//     setTimeout(() => { document.body.removeChild(toast); }, 3000);
// };

// // --- Initial empty line structure ---
// const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });

// // --- CascadingSelect Component ---
// const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// // --- Data for the period dropdown ---
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
//     { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']}

// ];

// // --- Helper Functions ---
// const getWeekEndDateFromPeriod = (period) => {
//     if (!period?.dates?.length) return null;
//     const lastDayString = period.dates[period.dates.length - 1];
//     const datePart = lastDayString.split(' ')[1];
//     const [month, day] = datePart.split('/');
//     // Assuming the year is 2025 for this static data
//     const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10)));
//     return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
// };

// const formatDateForComparison = (dateInput) => {
//     if (!dateInput) return '';
//     const date = new Date(dateInput);
//     if (isNaN(date.getTime())) return '';
//     return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date);
// };

// export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null, currentUser }) {
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[0]);
//     const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const isEditMode = Boolean(timesheetToEdit);
//     const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
//     const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

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
//                             const dayKey = dayKeyMapping[date.getUTCDay()];
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

//                 const initialLine = {
//                     id: timesheetToEdit?.id,
//                     description: timesheetToEdit?.description || '',
//                     project: timesheetToEdit?.projId || '',
//                     plc: timesheetToEdit?.plc || '',
//                     payType: timesheetToEdit?.payType || 'SR',
//                     workOrder: fullWorkOrderString,
//                     wa_Code: poEntry?.wa_Code || '',
//                     pmUserID: poEntry?.pmUserId || '',
//                     poNumber: timesheetToEdit?.poNumber || '',
//                     rlseNumber: timesheetToEdit?.rlseNumber || '',
//                     poLineNumber: timesheetToEdit?.poLineNumber || '',
//                     hours: hoursData,
//                     hourIds: hourIdsData,
//                 };
//                 setLines([initialLine]);
//             } else {
//                 setLines([createEmptyLine(1)]);
//             }
//         } catch (error) {
//             console.error("Error initializing TimesheetLine:", error);
//             showToast("Could not load timesheet data for editing.", "error");
//             onClose();
//         }
//     }, [isEditMode, timesheetToEdit, purchaseOrderData]);

//     useEffect(() => {
//         if (!resourceId) {
//             setIsLoading(false);
//             return;
//         }
//         const fetchPurchaseOrders = async () => {
//             setIsLoading(true);
//             const API_URL = `https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${resourceId}`;
//             try {
//                 const response = await fetch(API_URL);
//                 if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//                 const data = await response.json();
//                 setPurchaseOrderData(Array.isArray(data) ? data : []);
//             } catch (error) {
//                 console.error("Failed to fetch purchase orders:", error);
//                 showToast("Could not load purchase order data.", "error");
//                 setPurchaseOrderData([]);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchPurchaseOrders();
//     }, [resourceId]);
    
//     useEffect(() => {
//         if (isEditMode) {
//             setIsPeriodInvalid(false);
//             return;
//         }
//         const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod);
//         if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) {
//             setIsPeriodInvalid(true);
//         } else {
//             setIsPeriodInvalid(false);
//         }
//     }, [selectedPeriod, existingTimesheetDates, isEditMode]);

//     const handleSelectChange = (id, fieldName, value) => {
//         setLines(currentLines => currentLines.map(line => {
//             if (line.id === id) {
//                 const updatedLine = { ...line, [fieldName]: value };

//                 if (fieldName === 'workOrder') {
//                     if (!value) {
//                         updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserId = '';
//                         return updatedLine;
//                     }

//                     const [waCode, desc] = value.split(' - ');
//                     const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code === waCode);

//                     if (selectedWorkOrderData) {
//                         updatedLine.wa_Code = selectedWorkOrderData.wa_Code;
//                         updatedLine.pmUserID = selectedWorkOrderData.pmUserId || '';

//                         const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);

//                         if (descIndex > -1) {
//                             updatedLine.description = desc || '';
//                             updatedLine.project = selectedWorkOrderData.project[descIndex] || '';
//                             updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || '';
//                             updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || '';
//                             updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || '';
//                             updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || '';
//                         } else {
//                             updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = '';
//                         }
//                     } else {
//                          updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = '';
//                     }
//                 }
//                 return updatedLine;
//             }
//             return line;
//         }));
//     };

//     const handleHourChange = (id, day, value) => {
//         const numValue = parseFloat(value);

//         if (value === '') {
//             // Allow the state update to handle setting the value to 0
//         } else if (isNaN(numValue) || numValue < 0 || numValue > 24) {
//             showToast('Hours for a single entry must be between 0 and 24.', 'warning');
//             return;
//         } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) {
//             // This is the new validation for .0 and .5 increments
//             showToast('Please enter hours in increments of 0.5 (e.g., 7.0, 8.5).', 'warning');
//             return;
//         }

//         const otherLinesTotal = lines
//             .filter(line => line.id !== id)
//             .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);

//         const newColumnTotal = otherLinesTotal + (numValue || 0);

//         if (newColumnTotal > 24) {
//             showToast(`Total hours for this day cannot exceed 24.`, 'warning');
//             return;
//         }

//         setLines(currentLines =>
//             currentLines.map(line =>
//                 line.id === id
//                 ? { ...line, hours: { ...line.hours, [day]: value === '' ? 0 : numValue } }
//                 : line
//             )
//         );
//     };

//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
//     const handleSelectLine = (id) => {
//         const newSelection = new Set(selectedLines);
//         newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
//         setSelectedLines(newSelection);
//     };
//     const deleteLines = () => {
//         if (selectedLines.size === 0) return showToast('Please select lines to delete.', 'warning');
//         setLines(lines.filter(line => !selectedLines.has(line.id)));
//         setSelectedLines(new Set());
//     };
//     const copyLines = () => {
//     if (selectedLines.size === 0) {
//         showToast('Please select lines to copy.', 'warning');
//         return;
//     }

//     const linesToCopy = lines.filter(line => selectedLines.has(line.id));

//     // Validation: Check if this copy action will exceed daily limits
//     const potentialTotals = { ...dailyTotals };
//     let validationFailed = false;

//     linesToCopy.forEach(lineToCopy => {
//         days.forEach(day => {
//             potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0;
//             if (potentialTotals[day] > 24) {
//                 validationFailed = true;
//             }
//         });
//     });

//     if (validationFailed) {
//         showToast("Cannot copy line(s) as it would cause a daily total to exceed 24 hours.", "error");
//         return; // Abort the copy
//     }

//     // If validation passes, inform the user and proceed with copying
//     showToast("Line copied. Please select a new Work Order.", "info");

//     const newLines = linesToCopy.map(line => ({
//         ...line,
//         hours: { ...line.hours }, // Keep the hours

//         // Clear the Work Order and all dependent fields to enforce uniqueness
//         workOrder: '',
//         description: '',
//         project: '',
//         plc: '',
//         poNumber: '',
//         rlseNumber: '',
//         poLineNumber: '',

//         // Assign a new unique ID
//         id: `temp-${Date.now()}-${Math.random()}`,
//         hourIds: {} // Reset database IDs
//     }));

//     setLines(prev => [...prev, ...newLines]);
//     setSelectedLines(new Set());
// };

//     const handleSubmit = async () => {
//         if (grandTotal === 0) {
//             showToast("Cannot submit a timesheet with zero hours.", "warning");
//             return;
//         }
//         if (isSubmitting) return;

//         setIsSubmitting(true);

//         // First, validate all lines client-side
//         for (const line of lines) {
//             if (!line.project || !line.poLineNumber) {
//                 showToast(`Please complete the Work Order for "${line.description || 'the new line'}".`, 'warning');
//                 setIsSubmitting(false); // Reset state
//                 return;
//             }
//         }

//         try {
//             const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

//             for (const line of lines) {
//                 const method = isEditMode ? 'PUT' : 'POST';
//                 const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;

//                 const now = new Date().toISOString();
//                 const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod);
//                 const weekEndDateAsISO = new Date(weekEndDateString).toISOString();
//                 const timesheetHours = days.map((day, index) => {
//                     const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/');
//                     const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
//                     return {
//                         Id: isEditMode ? (line.hourIds[day] || 0) : 0,
//                         Ts_Date: dateForApi,
//                         Hours: line.hours[day] || 0
//                     };
//                 });

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
//                     Hours: parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)),
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
//             onClose();
//         } catch (error) {
//             showToast(error.message, 'error');
//             setIsSubmitting(false); // Reset state on API error
//         }
//     };

//     const workOrderOptions = useMemo(() => {
//         if (!purchaseOrderData) return [];
//         const uniqueOptions = new Map();
//         purchaseOrderData.forEach(item => {
//             item.resourceDesc.forEach(desc => {
//                 const value = `${item.wa_Code} - ${desc}`;
//                 uniqueOptions.set(value, { value, label: value });
//             });
//         });
//         return Array.from(uniqueOptions.values());
//     }, [purchaseOrderData]);
    
//     const dailyTotals = useMemo(() => {
//         const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
//         lines.forEach(line => {
//             days.forEach(day => {
//                 totals[day] += parseFloat(line.hours[day]) || 0;
//             });
//         });
//         return totals;
//     }, [lines, days]);

//     const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

//     if (isLoading) { return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="text-white text-xl">Loading Data...</div></div>; }

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
//             <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[90vw] mx-auto my-4 overflow-y-auto max-h-[95vh]">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
//                     <div className="flex items-center gap-4 flex-wrap">
//                         <div className="flex flex-col items-start">
//                             <div className="flex items-center gap-2">
//                                 <label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label>
//                                 <select
//                                     id="period-select"
//                                     value={selectedPeriod.label}
//                                     onChange={(e) => {
//                                         const newPeriod = timePeriods.find(p => p.label === e.target.value);
//                                         if (newPeriod) setSelectedPeriod(newPeriod);
//                                     }}
//                                     className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
//                                     disabled={isEditMode}
//                                 >
//                                     {timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}
//                                 </select>
//                             </div>
//                             {isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">Warning: A timesheet for this period already exists.</p>)}
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
//                             <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
//                             <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                     <table className="w-full text-sm min-w-[1600px]">
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80">
//                             <tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...selectedPeriod.dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                             {lines.map((line, index) => {
//                                 const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                                 return (
//                                     <tr key={line.id} className="hover:bg-slate-50/50">
//                                         <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} /></td>
//                                         <td className="p-3 text-center text-gray-500">{index + 1}</td>
//                                         <td className="p-2 min-w-[150px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} /></td>
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]">
//                                             <select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className="w-full bg-white p-1.5 border border-gray-200 rounded-md">
//                                                 <option value="SR">SR (Subcontractor Regular)</option>
//                                                 <option value="SO">SO (Subcontractor Overtime)</option>
//                                             </select>
//                                         </td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md" readOnly /></td>
//                                         {days.map(day => {
//                                             const isWeekend = day === 'sat' || day === 'sun';
//                                             return (
//                                                 <td key={day} className="p-2">
//                                                     <input 
//                                                         type="number" 
//                                                         step="0.5" 
//                                                         value={line.hours[day]} 
//                                                         onChange={e => handleHourChange(line.id, day, e.target.value)} 
//                                                         className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend ? 'bg-gray-100' : 'bg-white'}`} 
//                                                     />
//                                                 </td>
//                                             );
//                                         })}
//                                         <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                         <tfoot className="bg-slate-200/80 font-semibold">
//                             <tr className="border-t-2 border-gray-300">
//                                 <td colSpan="10" className="p-3 text-right text-gray-800">Total Hours</td>
//                                 {days.map(day => (
//                                     <td key={day} className="p-2 text-center">
//                                         <div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>
//                                             {dailyTotals[day].toFixed(2)}
//                                         </div>
//                                     </td>
//                                 ))}
//                                 <td className="p-3 text-right font-bold text-blue-700 pr-4">
//                                     {grandTotal.toFixed(2)}
//                                 </td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//                 <div className="mt-6 flex justify-end gap-3">
//                     <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
//                     <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting}>
//                         {isSubmitting ? (isEditMode ? 'Saving...' : 'Saving...') : (isEditMode ? 'Save Changes' : 'Save')}
//                     </ActionButton>
//                 </div>
//             </div>
//         </div>
//     );
// }

// Working Code Above //


// import React, { useState, useEffect, useMemo, useCallback } from 'react'; // Added useCallback

// // --- SVG Icons (No Changes) ---
// const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
// const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
// const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// // --- Helper Components & Data (No Changes) ---
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
// const timePeriods = [ { label: 'Mon 7/21 - Sun 7/27', dates: ['Mon 07/21', 'Tue 07/22', 'Wed 07/23', 'Thu 07/24', 'Fri 07/25', 'Sat 07/26', 'Sun 07/27'] }, { label: 'Mon 7/28 - Sun 8/03',  dates: ['Mon 07/28', 'Tue 07/29', 'Wed 07/30', 'Thu 07/31', 'Fri 08/01', 'Sat 08/02', 'Sun 08/03'] }, { label: 'Mon 8/04 - Sun 8/10',  dates: ['Mon 08/04', 'Tue 08/05', 'Wed 08/06', 'Thu 08/07', 'Fri 08/08', 'Sat 08/09', 'Sun 08/10'] }, { label: 'Mon 8/11 - Sun 8/17', dates: ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'] }, { label: 'Mon 8/18 - Sun 8/24', dates: ['Mon 08/18', 'Tue 08/19', 'Wed 08/20', 'Thu 08/21', 'Fri 08/22', 'Sat 08/23', 'Sun 08/24'] }, { label: 'Mon 8/25 - Sun 8/31', dates: ['Mon 08/25', 'Tue 08/26', 'Wed 08/27', 'Thu 08/28', 'Fri 08/29', 'Sat 08/30', 'Sun 08/31'] }, { label: 'Mon 9/01 - Sun 9/07',   dates: ['Mon 09/01', 'Tue 09/02', 'Wed 09/03', 'Thu 09/04', 'Fri 09/05', 'Sat 09/06', 'Sun 09/07'] }, { label: 'Mon 9/08 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] }, { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] }, { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']}, {
//   label: 'Mon 9/29 - Sun 10/5',
//   dates: ['Mon 09/29', 'Tue 09/30', 'Wed 10/01', 'Thu 10/02', 'Fri 10/03', 'Sat 10/04', 'Sun 10/05']
// }];
// const getWeekEndDateFromPeriod = (period) => { if (!period?.dates?.length) return null; const lastDayString = period.dates[period.dates.length - 1]; const datePart = lastDayString.split(' ')[1]; const [month, day] = datePart.split('/'); const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10))); return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };
// const formatDateForComparison = (dateInput) => { if (!dateInput) return ''; const date = new Date(dateInput); if (isNaN(date.getTime())) return ''; return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };

// // --- FIX: Move constants outside the component definition ---
// const DAY_KEY_MAPPING = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
// const DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


// export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null }) {
//     const [purchaseOrderData, setPurchaseOrderData] = useState([]);
//     const [lines, setLines] = useState([]);
//     const [selectedLines, setSelectedLines] = useState(new Set());
//     const [isLoading, setIsLoading] = useState(true);
//     const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[0]);
//     const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const isEditMode = Boolean(timesheetToEdit);
    
//     // The constants `dayKeyMapping` and `days` have been moved outside.

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
//                             const dayKey = DAY_KEY_MAPPING[date.getUTCDay()]; // Use the constant
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
//     }, [isEditMode, timesheetToEdit, purchaseOrderData, onClose]); // FIX: Removed dayKeyMapping from dependencies

//     // ... The rest of your component logic remains the same ...
    
//     // (I've collapsed the rest of the functions for brevity, but they are unchanged from the previous version)
//     useEffect(() => {
//         if (!resourceId) { setIsLoading(false); return; }
//         const fetchPurchaseOrders = async () => { setIsLoading(true); const API_URL = `https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${resourceId}`; try { const response = await fetch(API_URL); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); const data = await response.json(); setPurchaseOrderData(Array.isArray(data) ? data : []); } catch (error) { console.error("Failed to fetch purchase orders:", error); showToast("Could not load purchase order data.", "error"); setPurchaseOrderData([]); } finally { setIsLoading(false); } };
//         fetchPurchaseOrders();
//     }, [resourceId]);
//     useEffect(() => { if (isEditMode) { setIsPeriodInvalid(false); return; } const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod); if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) { setIsPeriodInvalid(true); } else { setIsPeriodInvalid(false); } }, [selectedPeriod, existingTimesheetDates, isEditMode]);
//     const handleSelectChange = (id, fieldName, value) => { setLines(currentLines => currentLines.map(line => { if (line.id === id) { const updatedLine = { ...line, [fieldName]: value }; if (fieldName === 'workOrder') { if (!value) { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; return updatedLine; } const separator = ' - '; const separatorIndex = value.indexOf(separator); const waCode = value.substring(0, separatorIndex).trim(); const desc = value.substring(separatorIndex + separator.length).trim(); const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code.trim() === waCode); if (selectedWorkOrderData) { updatedLine.wa_Code = selectedWorkOrderData.wa_Code; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.map(d => d.trim()).indexOf(desc); if (descIndex > -1) { updatedLine.description = selectedWorkOrderData.resourceDesc[descIndex] || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || ''; } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; } } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; } } return updatedLine; } return line; })); };
//     const handleHourChange = (id, day, value) => { const numValue = parseFloat(value); if (value === '') { /* Allow empty */ } else if (isNaN(numValue) || numValue < 0 || numValue > 24) { showToast('Hours must be between 0 and 24.', 'warning'); return; } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) { showToast('Hours must be in 0.5 increments.', 'warning'); return; } const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0); const newColumnTotal = otherLinesTotal + (numValue || 0); if (newColumnTotal > 24) { showToast(`Total hours for this day cannot exceed 24.`, 'warning'); return; } setLines(currentLines => currentLines.map(line => line.id === id ? { ...line, hours: { ...line.hours, [day]: value === '' ? 0 : numValue } } : line)); };
//     const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
//     const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
//     const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } setLines(lines.filter(line => !selectedLines.has(line.id))); setSelectedLines(new Set()); };
//     const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { DAYS_OF_WEEK.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);
//     const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } if (isPeriodInvalid) { showToast("Cannot copy. The selected period already has a timesheet.", "error"); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { DAYS_OF_WEEK.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };
//     const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);
//     const handleSubmit = async () => { if (isPeriodInvalid) { showToast("The selected period already has a timesheet.", "warning"); return; } if (grandTotal === 0) { showToast("Cannot submit a timesheet with zero hours.", "warning"); return; } if (isSubmitting) return; setIsSubmitting(true); for (const line of lines) { if (!line.project || !line.poLineNumber) { showToast(`Please complete the Work Order for all lines.`, 'warning'); setIsSubmitting(false); return; } } try { const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet"; for (const line of lines) { const lineHoursTotal = parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)); if (!isEditMode && lineHoursTotal === 0) continue; const method = isEditMode ? 'PUT' : 'POST'; const url = isEditMode ? `${API_URL}/${line.id}` : API_URL; const now = new Date().toISOString(); const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod); const [month, day, year] = weekEndDateString.split('/'); const weekEndDateAsISO = new Date(Date.UTC(parseInt(year, 10) || 2025, parseInt(month, 10) - 1, parseInt(day, 10))).toISOString(); const timesheetHours = DAYS_OF_WEEK.map((day, index) => { const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/'); const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`; return { Id: isEditMode ? (line.hourIds[day] || 0) : 0, Ts_Date: dateForApi, Hours: line.hours[day] || 0 }; }); const payload = { Id: isEditMode ? line.id : 0, Description: line.description, ProjId: line.project, Plc: line.plc, WorkOrder: line.wa_Code, pm_User_Id: line.pmUserID, PayType: line.payType, PoNumber: line.poNumber, RlseNumber: line.rlseNumber || "0", Resource_Id: String(resourceId), PoLineNumber: parseInt(line.poLineNumber, 10) || 0, Timesheet_Date: weekEndDateAsISO, UpdatedAt: now, UpdatedBy: String(resourceId), TimesheetHours: timesheetHours, Hours: lineHoursTotal, Status: "OPEN", ApprovalStatus: "PENDING" }; if (!isEditMode) { payload.CreatedAt = now; payload.CreatedBy = String(resourceId); } const response = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) { const errorText = await response.text(); throw new Error(`Submission failed: ${errorText}`); } } showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success'); onClose(); } catch (error) { showToast(error.message, 'error'); setIsSubmitting(false); } };
//     const workOrderOptions = useMemo(() => { if (!purchaseOrderData) return []; const uniqueOptions = new Map(); purchaseOrderData.forEach(item => { item.resourceDesc.forEach(desc => { const value = `${item.wa_Code} - ${desc}`; uniqueOptions.set(value, { value, label: value }); }); }); return Array.from(uniqueOptions.values()); }, [purchaseOrderData]);

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
//             <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[90vw] mx-auto my-4 overflow-y-auto max-h-[95vh]">
//                 {/* The JSX is unchanged from the previous version, just make sure to use DAYS_OF_WEEK where 'days' was used */}
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
//                     <div className="flex items-center gap-4 flex-wrap">
//                         <div className="flex flex-col items-start"><div className="flex items-center gap-2"><label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label><select id="period-select" value={selectedPeriod.label} onChange={(e) => { const newPeriod = timePeriods.find(p => p.label === e.target.value); if (newPeriod) setSelectedPeriod(newPeriod); }} className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm" disabled={isEditMode}>{timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}</select></div>{isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">A timesheet for this period already exists.</p>)}</div>
//                         <div className="flex items-center gap-2"><ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />} disabled={isPeriodInvalid}>Add Line</ActionButton><ActionButton onClick={copyLines} icon={<CopyIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Copy</ActionButton><ActionButton onClick={deleteLines} icon={<TrashIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Delete</ActionButton></div>
//                     </div>
//                 </div>
//                 {/* <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm"> */}
//                 {/* <div className={`overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm relative ${lines.length >= 4 ? 'h-72 overflow-y-auto' : ''}`}> */}
//                 {/* <div className="overflow-auto max-h-72 rounded-lg border border-gray-200/80 shadow-sm relative"> */}
//                 {/* <div className="p-4 overflow-y-auto" style={{ maxHeight: '40vh' }}> */}
//                 <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
//                     <table className="w-full text-sm min-w-[1600px]">
//                         <thead className="bg-slate-100/70 border-b border-gray-200/80"><tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...selectedPeriod.dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr></thead>
//                         <tbody className="divide-y divide-gray-200/80 bg-white/50">
//                             {lines.map((line, index) => {
//                                 const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
//                                 return (
//                                     <tr key={line.id} className="hover:bg-slate-50/50">
//                                         <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isPeriodInvalid} /></td>
//                                         <td className="p-3 text-center text-gray-500">{index + 1}</td>
//                                         <td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} disabled={isPeriodInvalid} /></td>
//                                         <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${isPeriodInvalid ? 'bg-gray-100 cursor-not-allowed' : ''}`} disabled={isPeriodInvalid}><option value="SR">SR (Subcontractor Regular)</option><option value="SO">SO (Subcontractor Overtime)</option></select></td>
//                                         <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
//                                         {DAYS_OF_WEEK.map(day => {
//                                             const isWeekend = day === 'sat' || day === 'sun';
//                                             return (<td key={day} className="p-2"><input type="number" step="0.5" value={line.hours[day]} onChange={e => handleHourChange(line.id, day, e.target.value)} className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || isPeriodInvalid ? 'bg-gray-100' : 'bg-white'} ${isPeriodInvalid ? 'cursor-not-allowed' : ''}`} disabled={isPeriodInvalid} /></td>);
//                                         })}
//                                         <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                         <tfoot className="bg-slate-200/80 font-semibold">
//                             <tr className="border-t-2 border-gray-300">
//                                 <td colSpan="10" className="p-3 text-right text-gray-800">Total Hours</td>
//                                 {DAYS_OF_WEEK.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
//                                 <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
//                             </tr>
//                         </tfoot>
//                     </table>
//                 </div>
//                 <div className="mt-6 flex justify-end gap-3">
//                     <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
//                     <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting || lines.length === 0}>{isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}</ActionButton>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect, useMemo, useCallback } from 'react';

// --- SVG Icons (No Changes) ---
const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

// --- Helper Components & Data (No Changes) ---
const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '', disabled = false }) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
    const variants = {
        primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
        secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
    };
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
    return ( <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabledClasses}`}>{icon && <span className="mr-2">{icon}</span>}{children}</button> );
};

const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    const typeClasses = { success: 'bg-green-500', error: 'bg-red-500', warning: 'bg-yellow-500 text-black', info: 'bg-blue-500' };
    toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses['info']}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, 3000);
};

const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' }, hourIds: {} });
const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );
const timePeriods = [ { label: 'Mon 7/21 - Sun 7/27', dates: ['Mon 07/21', 'Tue 07/22', 'Wed 07/23', 'Thu 07/24', 'Fri 07/25', 'Sat 07/26', 'Sun 07/27'] }, { label: 'Mon 7/28 - Sun 8/03',  dates: ['Mon 07/28', 'Tue 07/29', 'Wed 07/30', 'Thu 07/31', 'Fri 08/01', 'Sat 08/02', 'Sun 08/03'] }, { label: 'Mon 8/04 - Sun 8/10',  dates: ['Mon 08/04', 'Tue 08/05', 'Wed 08/06', 'Thu 08/07', 'Fri 08/08', 'Sat 08/09', 'Sun 08/10'] }, { label: 'Mon 8/11 - Sun 8/17', dates: ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'] }, { label: 'Mon 8/18 - Sun 8/24', dates: ['Mon 08/18', 'Tue 08/19', 'Wed 08/20', 'Thu 08/21', 'Fri 08/22', 'Sat 08/23', 'Sun 08/24'] }, { label: 'Mon 8/25 - Sun 8/31', dates: ['Mon 08/25', 'Tue 08/26', 'Wed 08/27', 'Thu 08/28', 'Fri 08/29', 'Sat 08/30', 'Sun 08/31'] }, { label: 'Mon 9/01 - Sun 9/07',   dates: ['Mon 09/01', 'Tue 09/02', 'Wed 09/03', 'Thu 09/04', 'Fri 09/05', 'Sat 09/06', 'Sun 09/07'] }, { label: 'Mon 9/08 - Sun 9/14', dates: ['Mon 09/08', 'Tue 09/09', 'Wed 09/10', 'Thu 09/11', 'Fri 09/12', 'Sat 09/13', 'Sun 09/14'] }, { label: 'Mon 9/15 - Sun 9/21', dates: ['Mon 09/15', 'Tue 09/16', 'Wed 09/17', 'Thu 09/18', 'Fri 09/19', 'Sat 09/20', 'Sun 09/21'] }, { label: 'Mon 9/22 - Sun 9/28', dates: ['Mon 09/22', 'Tue 09/23', 'Wed 09/24', 'Thu 09/25', 'Fri 09/26', 'Sat 09/27', 'Sun 09/28']}, {
  label: 'Mon 9/29 - Sun 10/5',
  dates: ['Mon 09/29', 'Tue 09/30', 'Wed 10/01', 'Thu 10/02', 'Fri 10/03', 'Sat 10/04', 'Sun 10/05']
}];
const getWeekEndDateFromPeriod = (period) => { if (!period?.dates?.length) return null; const lastDayString = period.dates[period.dates.length - 1]; const datePart = lastDayString.split(' ')[1]; const [month, day] = datePart.split('/'); const date = new Date(Date.UTC(2025, parseInt(month, 10) - 1, parseInt(day, 10))); return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };
const formatDateForComparison = (dateInput) => { if (!dateInput) return ''; const date = new Date(dateInput); if (isNaN(date.getTime())) return ''; return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC' }).format(date); };

// --- Constants ---
const DAY_KEY_MAPPING = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const DAYS_OF_WEEK = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];


export default function TimesheetLine({ onClose, resourceId, existingTimesheetDates = [], timesheetToEdit = null }) {
    const [purchaseOrderData, setPurchaseOrderData] = useState([]);
    const [lines, setLines] = useState([]);
    const [selectedLines, setSelectedLines] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState(timePeriods[timePeriods.length -1]); // Set to last period for testing
    const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = Boolean(timesheetToEdit);
    
    // All functions and useEffect hooks are unchanged and collapsed for brevity.
    // ... (Your existing component logic remains here)
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
                            const dayKey = DAY_KEY_MAPPING[date.getUTCDay()]; // Use the constant
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
                const initialLine = { id: timesheetToEdit?.id, description: timesheetToEdit?.description || '', project: timesheetToEdit?.projId || '', plc: timesheetToEdit?.plc || '', payType: timesheetToEdit?.payType || 'SR', workOrder: fullWorkOrderString, wa_Code: poEntry?.wa_Code || '', pmUserID: poEntry?.pmUserId || '', poNumber: timesheetToEdit?.poNumber || '', rlseNumber: timesheetToEdit?.rlseNumber || '', poLineNumber: timesheetToEdit?.poLineNumber || '', hours: hoursData, hourIds: hourIdsData };
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
        if (!resourceId) { setIsLoading(false); return; }
        const fetchPurchaseOrders = async () => { setIsLoading(true); const API_URL = `https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${resourceId}`; try { const response = await fetch(API_URL); if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); const data = await response.json(); setPurchaseOrderData(Array.isArray(data) ? data : []); } catch (error) { console.error("Failed to fetch purchase orders:", error); showToast("Could not load purchase order data.", "error"); setPurchaseOrderData([]); } finally { setIsLoading(false); } };
        fetchPurchaseOrders();
    }, [resourceId]);
    useEffect(() => { if (isEditMode) { setIsPeriodInvalid(false); return; } const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod); if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) { setIsPeriodInvalid(true); } else { setIsPeriodInvalid(false); } }, [selectedPeriod, existingTimesheetDates, isEditMode]);
    const handleSelectChange = (id, fieldName, value) => { setLines(currentLines => currentLines.map(line => { if (line.id === id) { const updatedLine = { ...line, [fieldName]: value }; if (fieldName === 'workOrder') { if (!value) { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; return updatedLine; } const separator = ' - '; const separatorIndex = value.indexOf(separator); const waCode = value.substring(0, separatorIndex).trim(); const desc = value.substring(separatorIndex + separator.length).trim(); const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code.trim() === waCode); if (selectedWorkOrderData) { updatedLine.wa_Code = selectedWorkOrderData.wa_Code; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.map(d => d.trim()).indexOf(desc); if (descIndex > -1) { updatedLine.description = selectedWorkOrderData.resourceDesc[descIndex] || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || ''; } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; } } else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; updatedLine.wa_Code = ''; updatedLine.pmUserID = ''; } } return updatedLine; } return line; })); };
    const handleHourChange = (id, day, value) => { const numValue = parseFloat(value); if (value === '') { /* Allow empty */ } else if (isNaN(numValue) || numValue < 0 || numValue > 24) { showToast('Hours must be between 0 and 24.', 'warning'); return; } else if (numValue % 1 !== 0 && numValue % 1 !== 0.5) { showToast('Hours must be in 0.5 increments.', 'warning'); return; } const otherLinesTotal = lines.filter(line => line.id !== id).reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0); const newColumnTotal = otherLinesTotal + (numValue || 0); if (newColumnTotal > 24) { showToast(`Total hours for this day cannot exceed 24.`, 'warning'); return; } setLines(currentLines => currentLines.map(line => line.id === id ? { ...line, hours: { ...line.hours, [day]: value === '' ? 0 : numValue } } : line)); };
    const addLine = () => setLines(prev => [...prev, createEmptyLine(`temp-${Date.now()}`)]);
    const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
    const deleteLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to delete.', 'warning'); return; } setLines(lines.filter(line => !selectedLines.has(line.id))); setSelectedLines(new Set()); };
    const dailyTotals = useMemo(() => { const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }; lines.forEach(line => { DAYS_OF_WEEK.forEach(day => { totals[day] += parseFloat(line.hours[day]) || 0; }); }); return totals; }, [lines]);
    const copyLines = () => { if (selectedLines.size === 0) { showToast('Please select lines to copy.', 'warning'); return; } if (isPeriodInvalid) { showToast("Cannot copy. The selected period already has a timesheet.", "error"); return; } const linesToCopy = lines.filter(line => selectedLines.has(line.id)); const potentialTotals = { ...dailyTotals }; let validationFailed = false; linesToCopy.forEach(lineToCopy => { DAYS_OF_WEEK.forEach(day => { potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0; if (potentialTotals[day] > 24.01) { validationFailed = true; } }); }); if (validationFailed) { showToast("Cannot copy, as it would cause a daily total to exceed 24 hours.", "error"); return; } showToast("Line(s) copied.", "info"); const newLines = linesToCopy.map((line, index) => ({ ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {} })); setLines(prev => [...prev, ...newLines]); setSelectedLines(new Set()); };
    const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);
    const handleSubmit = async () => { if (isPeriodInvalid) { showToast("The selected period already has a timesheet.", "warning"); return; } if (grandTotal === 0) { showToast("Cannot submit a timesheet with zero hours.", "warning"); return; } if (isSubmitting) return; setIsSubmitting(true); for (const line of lines) { if (!line.project || !line.poLineNumber) { showToast(`Please complete the Work Order for all lines.`, 'warning'); setIsSubmitting(false); return; } } try { const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet"; for (const line of lines) { const lineHoursTotal = parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2)); if (!isEditMode && lineHoursTotal === 0) continue; const method = isEditMode ? 'PUT' : 'POST'; const url = isEditMode ? `${API_URL}/${line.id}` : API_URL; const now = new Date().toISOString(); const weekEndDateString = getWeekEndDateFromPeriod(selectedPeriod); const [month, day, year] = weekEndDateString.split('/'); const weekEndDateAsISO = new Date(Date.UTC(parseInt(year, 10) || 2025, parseInt(month, 10) - 1, parseInt(day, 10))).toISOString(); const timesheetHours = DAYS_OF_WEEK.map((day, index) => { const dateParts = selectedPeriod.dates[index].split(' ')[1].split('/'); const dateForApi = `2025-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`; return { Id: isEditMode ? (line.hourIds[day] || 0) : 0, Ts_Date: dateForApi, Hours: line.hours[day] || 0 }; }); const payload = { Id: isEditMode ? line.id : 0, Description: line.description, ProjId: line.project, Plc: line.plc, WorkOrder: line.wa_Code, pm_User_Id: line.pmUserID, PayType: line.payType, PoNumber: line.poNumber, RlseNumber: line.rlseNumber || "0", Resource_Id: String(resourceId), PoLineNumber: parseInt(line.poLineNumber, 10) || 0, Timesheet_Date: weekEndDateAsISO, UpdatedAt: now, UpdatedBy: String(resourceId), TimesheetHours: timesheetHours, Hours: lineHoursTotal, Status: "OPEN", ApprovalStatus: "PENDING" }; if (!isEditMode) { payload.CreatedAt = now; payload.CreatedBy = String(resourceId); } const response = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!response.ok) { const errorText = await response.text(); throw new Error(`Submission failed: ${errorText}`); } } showToast(`Timesheet ${isEditMode ? 'updated' : 'created'} successfully!`, 'success'); onClose(); } catch (error) { showToast(error.message, 'error'); setIsSubmitting(false); } };
    const workOrderOptions = useMemo(() => { if (!purchaseOrderData) return []; const uniqueOptions = new Map(); purchaseOrderData.forEach(item => { item.resourceDesc.forEach(desc => { const value = `${item.wa_Code} - ${desc}`; uniqueOptions.set(value, { value, label: value }); }); }); return Array.from(uniqueOptions.values()); }, [purchaseOrderData]);


    // --- MODIFICATION START ---
    // 1. Get today's date, stripping the time part for accurate date-only comparison.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // --- MODIFICATION END ---

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[90vw] mx-auto my-4 overflow-y-auto max-h-[95vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? 'View / Edit Timesheet' : 'Create Timesheet'}</h2>
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex flex-col items-start"><div className="flex items-center gap-2"><label htmlFor="period-select" className="text-sm font-medium text-gray-700">Select Period:</label><select id="period-select" value={selectedPeriod.label} onChange={(e) => { const newPeriod = timePeriods.find(p => p.label === e.target.value); if (newPeriod) setSelectedPeriod(newPeriod); }} className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm" disabled={isEditMode}>{timePeriods.map(period => (<option key={period.label} value={period.label}>{period.label}</option>))}</select></div>{isPeriodInvalid && (<p className="text-xs text-red-600 font-semibold mt-1">A timesheet for this period already exists.</p>)}</div>
                        <div className="flex items-center gap-2"><ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />} disabled={isPeriodInvalid}>Add Line</ActionButton><ActionButton onClick={copyLines} icon={<CopyIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Copy</ActionButton><ActionButton onClick={deleteLines} icon={<TrashIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Delete</ActionButton></div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
                    <table className="w-full text-sm min-w-[1600px]">
                        <thead className="bg-slate-100/70 border-b border-gray-200/80"><tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...selectedPeriod.dates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr></thead>
                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => {
                                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
                                return (
                                    <tr key={line.id} className="hover:bg-slate-50/50">
                                        <td className="p-2 text-center"><input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isPeriodInvalid} /></td>
                                        <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                        <td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={e => handleSelectChange(line.id, 'workOrder', e.target.value)} disabled={isPeriodInvalid} /></td>
                                        <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><select value={line.payType} onChange={e => handleSelectChange(line.id, 'payType', e.target.value)} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${isPeriodInvalid ? 'bg-gray-100 cursor-not-allowed' : ''}`} disabled={isPeriodInvalid}><option value="SR">SR (Subcontractor Regular)</option><option value="SO">SO (Subcontractor Overtime)</option></select></td>
                                        <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                                        
                                        {/* --- MODIFICATION START --- */}
                                        {DAYS_OF_WEEK.map((day, dayIndex) => {
                                            // 2. Parse the date string from the selected period into a real Date object.
                                            const dateString = selectedPeriod.dates[dayIndex]; // e.g., "Wed 10/01"
                                            const dateParts = dateString.split(' ')[1].split('/'); // e.g., ["10", "01"]
                                            const month = parseInt(dateParts[0], 10) - 1; // JS months are 0-indexed
                                            const dayOfMonth = parseInt(dateParts[1], 10);
                                            const currentYear = new Date().getFullYear(); // Use the actual current year
                                            const columnDate = new Date(currentYear, month, dayOfMonth);

                                            // 3. Check if the column's date is in the future.
                                            const isFutureDate = columnDate > today;
                                            
                                            const isWeekend = day === 'sat' || day === 'sun';
                                            // 4. Combine all conditions that should disable the input.
                                            const isDisabled = isPeriodInvalid || isFutureDate;

                                            return (
                                                <td key={day} className="p-2">
                                                    <input 
                                                        type="number" 
                                                        step="0.5" 
                                                        value={line.hours[day]} 
                                                        onChange={e => handleHourChange(line.id, day, e.target.value)} 
                                                        className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${isWeekend || isDisabled ? 'bg-gray-100' : 'bg-white'} ${isDisabled ? 'cursor-not-allowed' : ''}`} 
                                                        disabled={isDisabled} 
                                                    />
                                                </td>
                                            );
                                        })}
                                        {/* --- MODIFICATION END --- */}

                                        <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-200/80 font-semibold">
                            <tr className="border-t-2 border-gray-300">
                                <td colSpan="10" className="p-3 text-right text-gray-800">Total Hours</td>
                                {DAYS_OF_WEEK.map(day => (<td key={day} className="p-2 text-center"><div className={`w-20 p-1.5 ${day === 'sat' || day === 'sun' ? 'text-gray-500' : ''}`}>{dailyTotals[day].toFixed(2)}</div></td>))}
                                <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
                    <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting || lines.length === 0}>{isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Save')}</ActionButton>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect, useRef } from 'react';

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
const createEmptyLine = (id) => ({ id, description: '', project: '', plc: '', workOrder: '', wa_Code: '', pmUserID: '', payType: 'SR', poNumber: '', rlseNumber: '', poLineNumber: '', hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }, hourIds: {} });

// --- CascadingSelect Component ---
const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => ( <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}><option value="">Select {label}</option>{options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}</select> );

// --- Helper Functions ---
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
    const nextId = useRef(0);

    const dayKeyMapping = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    
    useEffect(() => {
        if (timesheetData) {
            const status = timesheetData.Status?.toUpperCase();
            setIsEditable(status === 'OPEN' || status === 'REJECTED');

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
            const response = await fetch(`https://timesheet-subk.onrender.com/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);
            if (!response.ok) throw new Error('Failed to fetch timesheet details');
            const data = await response.json();
            
            const poResponse = await fetch(`https://timesheet-subk.onrender.com/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);
            if(!poResponse.ok) throw new Error('Failed to fetch purchase order details');
            const poData = await poResponse.json();
            const poDataArray = Array.isArray(poData) ? poData : [];
            setPurchaseOrderData(poDataArray);

            const dataArray = Array.isArray(data) ? data : [];
            const filteredData = dataArray.filter(item => formatDate(item.timesheet_Date) === timesheetData.Date);
            
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
    // ✅ VALIDATION: Check for duplicate Work Order before updating state
    if (fieldName === 'workOrder' && value) { // Check only when a work order is selected
        const isDuplicate = lines.some(line => line.id !== id && line.workOrder === value);
        if (isDuplicate) {
            showToast("This Work Order has already been selected on another line.", "warning");
            return; // Abort the change
        }
    }

    // If validation passes, proceed with the state update
    setLines(currentLines => currentLines.map(line => {
        if (line.id === id) {
            let updatedLine = { ...line, [fieldName]: value };
            if (fieldName === 'workOrder') {
                if (!value) { const emptyLine = createEmptyLine(id); return { ...emptyLine, id: line.id }; } const [waCode, desc] = value.split(' - '); const selectedWorkOrderData = purchaseOrderData.find(item => item.wa_Code === waCode);
                if (selectedWorkOrderData) {
                    updatedLine.wa_Code = selectedWorkOrderData.wa_Code || ''; updatedLine.pmUserID = selectedWorkOrderData.pmUserId || ''; const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);
                    if (descIndex > -1) { updatedLine.description = desc || ''; updatedLine.project = selectedWorkOrderData.project[descIndex] || ''; updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || ''; updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || ''; updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || ''; updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || ''; }
                    else { updatedLine.description = ''; updatedLine.project = ''; updatedLine.plc = ''; updatedLine.poNumber = ''; updatedLine.rlseNumber = ''; updatedLine.poLineNumber = ''; }
                } else { const emptyLine = createEmptyLine(id); return { ...emptyLine, id: line.id }; }
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
            showToast('Please enter hours in increments of 0.5 (e.g., 7.0, 8.5).', 'warning');
            return;
        }

        setLines(currentLines => {
            const otherLinesTotal = currentLines
                .filter(line => line.id !== id)
                .reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0);
    
            const newColumnTotal = otherLinesTotal + (numValue || 0);
    
            if (newColumnTotal > 24) {
                showToast(`Total hours for this day cannot exceed 24.`, 'warning');
                return currentLines;
            }
    
            const indexToUpdate = currentLines.findIndex(line => line.id === id);
            if (indexToUpdate === -1) { console.error("Could not find line with id:", id); return currentLines; }
            const newLines = [...currentLines];
            const updatedLine = { ...newLines[indexToUpdate], hours: { ...newLines[indexToUpdate].hours, [day]: value === '' ? 0 : numValue } };
            newLines[indexToUpdate] = updatedLine;
            return newLines;
        });
    };

    const addLine = () => { const newId = `temp-${nextId.current++}`; setLines(prevLines => [...prevLines, createEmptyLine(newId)]); };
    
    const deleteLines = () => {
        if (selectedLines.size === 0) {
            showToast('Please select at least one line to delete.', 'warning');
            return;
        }
        const originalStatus = timesheetData.Status?.toUpperCase();
        if (originalStatus === 'REJECTED') {
            showToast("For rejected timesheets, lines will have their hours zeroed out upon saving.", "info");
            setLines(currentLines =>
                currentLines.map(line => {
                    if (selectedLines.has(line.id)) {
                        return { ...line, hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } };
                    }
                    return line;
                })
            );
        } else {
            setLines(currentLines => {
                const idsToDeleteFromServer = [];
                for (const id of selectedLines) {
                    if (typeof id === 'number' || (typeof id === 'string' && !id.startsWith('temp-'))) {
                        idsToDeleteFromServer.push(id);
                    }
                }
                if (idsToDeleteFromServer.length > 0) {
                    setLinesToDelete(prev => [...new Set([...prev, ...idsToDeleteFromServer])]);
                }
                return currentLines.filter(line => !selectedLines.has(line.id));
            });
        }
        setSelectedLines(new Set());
    };
    
    const handleSelectLine = (id) => { const newSelection = new Set(selectedLines); newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id); setSelectedLines(newSelection); };
    
const copyLines = () => {
    if (selectedLines.size === 0) {
        showToast('Please select at least one line to copy.', 'warning');
        return;
    }
    
    const linesToCopy = lines.filter(line => selectedLines.has(line.id));

    // First, run the validation to check if copying hours will exceed daily limits
    const potentialTotals = { ...dailyTotals };
    let validationFailed = false;
    linesToCopy.forEach(lineToCopy => {
        days.forEach(day => {
            potentialTotals[day] += parseFloat(lineToCopy.hours[day]) || 0;
            if (potentialTotals[day] > 24) {
                validationFailed = true;
            }
        });
    });

    if (validationFailed) {
        showToast("Cannot copy line(s) as it would cause a daily total to exceed 24 hours.", "error");
        return;
    }

    // If validation passes, proceed with copying
    showToast("Line copied. Please select a new Work Order.", "info");

    const newLines = linesToCopy.map(line => ({
        ...line,
        hours: { ...line.hours }, // Keep the hours

        // ✅ FIX: Clear the Work Order and all dependent fields
        workOrder: '',
        description: '',
        project: '',
        plc: '',
        poNumber: '',
        rlseNumber: '',
        poLineNumber: '',
        
        // Assign a new unique ID for React to track the row
        id: `temp-${nextId.current++}`,
        hourIds: {} // Reset database IDs
    }));

    setLines(currentLines => [...currentLines, ...newLines]);
    setSelectedLines(new Set());
};
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

        const grandTotal = Object.values(finalTotals).reduce((sum, total) => sum + total, 0);
    if (grandTotal === 0) {
        showToast("Cannot save a timesheet with zero hours.", "warning");
        setIsCurrentlySaving(false); // Make sure to unlock the button
        return; // Stop the submission
    }

        const promises = [];
        const weekDates = getWeekDates(timesheetData.Date);
        const API_BASE_URL = "https://timesheet-subk.onrender.com";

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
                    const payload = { Description: currentLine.description || 'New Timesheet Line', ProjId: currentLine.project || '', Plc: currentLine.plc || '', PayType: currentLine.payType || 'SR', PoNumber: currentLine.poNumber || '', RlseNumber: currentLine.rlseNumber || "0", Resource_Id: String(timesheetData["Employee ID"]), PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0, Timesheet_Date: new Date(timesheetData.Date).toISOString(), CreatedBy: String(timesheetData["Employee ID"]), TimesheetHours: days.map(day => ({ Ts_Date: weekDates[day], Hours: currentLine.hours[day] || 0 })) };
                    promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
                }
                return;
            }
            days.forEach(day => {
                const initialHour = initialLine.hours[day]; const currentHour = currentLine.hours[day];
                if (initialHour !== currentHour) {
                    const hourId = currentLine.hourIds[day];
                    if (hourId) {
                        const url = `${API_BASE_URL}/api/TimesheetHours/${hourId}`; const payload = { id: hourId, ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
                        promises.push(fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
                    } else {
                        const url = `${API_BASE_URL}/api/TimesheetHours`; const payload = { ts_Date: weekDates[day], hours: currentHour, lineNo: currentLine.id };
                        promises.push(fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }));
                    }
                }
            });
        });

        if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }

        try {
            const responses = await Promise.all(promises);
            for (const response of responses) { if (!response.ok) { const errorText = await response.text(); throw new Error(`Failed to save changes: ${errorText}`); } }
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
    const dailyTotals = days.reduce((acc, day) => { acc[day] = lines.reduce((sum, line) => sum + (parseFloat(line.hours[day]) || 0), 0); return acc; }, {});
    const grandTotal = Object.values(dailyTotals).reduce((sum, dayTotal) => sum + dayTotal, 0);

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
                            <tr>{['', 'Line', 'Work Order', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...headerDates, 'Total'].map(header => <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>)}</tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => {
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
                                    {days.map(day => 
                                        <td key={day} className="p-2">
                                            <input 
                                                type="number" 
                                                step="0.5" 
                                                value={line.hours[day]} 
                                                onChange={e => handleHourChange(line.id, day, e.target.value)} 
                                                className="w-20 text-right bg-white p-1.5 border border-gray-200 rounded-md shadow-sm disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                                                disabled={!isEditable || day === 'sat' || day === 'sun'} 
                                            />
                                        </td>
                                    )}
                                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                                </tr>
                                );
                            })}
                        </tbody>
                        <tfoot className="bg-slate-100/70 sticky bottom-0">
                            <tr className="border-t-2 border-gray-300 font-semibold">
                                <td colSpan="10" className="p-3 text-right">Total Hours</td>
                                {days.map(day => (
                                    <td key={day} className="p-2">
                                        <div className={`w-20 text-right p-1.5 font-semibold ${day === 'sat' || day === 'sun' ? 'text-gray-400' : 'text-gray-800'}`}>
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
            <div className="flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
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
};
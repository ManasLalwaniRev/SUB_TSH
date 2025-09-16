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

//     const dayHeaders = ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'];
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



import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
const PlusIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const CopyIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const TrashIcon = ({ className = "h-4 w-4" }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;

const ActionButton = ({ children, onClick, variant = 'secondary', icon, className = '' }) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";
    const variants = {
        primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",
        secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",
    };
    return (
        <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-5 right-5 p-4 rounded-md text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 3000);
};

const createEmptyLine = (id) => ({
    id,
    description: '',
    project: '',
    plc: '',
    payType: '',
    poNumber: '',
    rlseNumber: '',
    poLineNumber: '',
    hours: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 }
});

export default function TimesheetLine({ onClose, onAddSuccess, resourceId }) { // <-- Add onAddSuccess // <-- Destructure the new prop
    const [lines, setLines] = useState([createEmptyLine(1)]);
    const [selectedLines, setSelectedLines] = useState(new Set());

    const dayHeaders = ['Mon 08/11', 'Tue 08/12', 'Wed 08/13', 'Thu 08/14', 'Fri 08/15', 'Sat 08/16', 'Sun 08/17'];
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

    const handleInputChange = (id, field, value) => {
        setLines(lines.map(l => (l.id === id ? { ...l, [field]: value } : l)));
    };

    const handleHourChange = (id, day, value) => {
        setLines(lines.map(line => {
            if (line.id === id) {
                return { ...line, hours: { ...line.hours, [day]: parseFloat(value) || 0 } };
            }
            return line;
        }));
    };

    const addLine = () => {
        const newId = lines.length > 0 ? Math.max(...lines.map(l => l.id)) + 1 : 1;
        setLines([...lines, createEmptyLine(newId)]);
    };

    const handleSelectLine = (id) => {
        const newSelection = new Set(selectedLines);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedLines(newSelection);
    };

    const deleteLines = () => {
        if (selectedLines.size === 0) {
            showToast('Please select at least one line to delete.', 'warning');
            return;
        }
        setLines(lines.filter(line => !selectedLines.has(line.id)));
        setSelectedLines(new Set());
    };

    const copyLines = () => {
        if (selectedLines.size === 0) {
            showToast('Please select at least one line to copy.', 'warning');
            return;
        }
        let maxId = lines.length > 0 ? Math.max(...lines.map(l => l.id)) : 0;
        const newLines = lines
            .filter(line => selectedLines.has(line.id))
            .map(line => ({ ...line, id: ++maxId, selected: false }));
        
        setLines([...lines, ...newLines]);
        setSelectedLines(new Set());
    };

    const handleSubmit = async () => {
        const API_URL = "https://timesheet-subk.onrender.com/api/SubkTimesheet";

        for (const line of lines) {
            const now = new Date().toISOString();
            const timesheetHours = days.map((day, index) => {
                const dateParts = dayHeaders[index].split(' ')[1].split('/');
                const date = `2025-${dateParts[0]}-${dateParts[1]}`;
                return {
                    ts_Date: date,
                    hours: line.hours[day],
                };
            });
            
            const payload = {
                description: line.description,
                projId: line.project,
                plc: line.plc,
                payType: line.payType,
                poNumber: line.poNumber,
                rlseNumber: line.rlseNumber,
                resource_Id: resourceId, // <-- Add the resource ID from props
                poLineNumber: parseInt(line.poLineNumber, 10) || 0,
                rvsnNumber: 0,
                createdAt: now,
                createdBy: "resourceId",
                updatedAt: now,
                updatedBy: "resourceId",
                timesheetHours: timesheetHours,
                hours: parseFloat(calculateRowTotal(line.hours))
            };

            console.log("Sending Payload:", JSON.stringify(payload, null, 2));

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    showToast(`Line ${line.id} submitted successfully!`, 'success');
                } else {
                    const errorData = await response.json();
                    showToast(`Error: ${errorData.message || 'Bad Request'}`, 'error');
                }
            } catch (error) {
                console.error('API submission error:', error);
                showToast(`An error occurred while submitting line ${line.id}.`, 'error');
            }
        }
        onClose();
    };
    
    const calculateRowTotal = (hours) => Object.values(hours).reduce((sum, h) => sum + h, 0).toFixed(2);
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
            <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 shadow-2xl rounded-2xl p-6 md:p-8 w-full max-w-[1600px] mx-auto my-4 overflow-y-auto max-h-[95vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Timesheet Lines</h2>
                    <div className="flex items-center gap-2 flex-wrap">
                        <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>
                        <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>
                        <ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100/70 border-b border-gray-200/80">
                            <tr>
                                {['', 'Line', 'Description', 'Project', 'PLC', 'Pay Type', 'PO Number', 'RLSE Number', 'PO Line Number', ...dayHeaders, 'Total'].map(header => (
                                    <th key={header} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200/80 bg-white/50">
                            {lines.map((line, index) => (
                                <tr key={line.id} className="hover:bg-slate-50/50">
                                    <td className="p-2 text-center">
                                        <input 
                                            type="checkbox" 
                                            className="rounded border-gray-300" 
                                            checked={selectedLines.has(line.id)}
                                            onChange={() => handleSelectLine(line.id)}
                                        />
                                    </td>
                                    <td className="p-3 text-center text-gray-500">{index + 1}</td>
                                    {['description', 'project', 'plc', 'payType', 'poNumber', 'rlseNumber', 'poLineNumber'].map(field => (
                                        <td key={field} className="p-2">
                                            <input 
                                                type="text" 
                                                value={line[field]} 
                                                onChange={e => handleInputChange(line.id, field, e.target.value)} 
                                                className="w-full bg-white p-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
                                            />
                                        </td>
                                    ))}
                                    {days.map(day => (
                                        <td key={day} className="p-2">
                                            <input 
                                                type="number" 
                                                step="0.01" 
                                                value={line.hours[day]} 
                                                onChange={e => handleHourChange(line.id, day, e.target.value)} 
                                                className="w-20 text-right bg-white p-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" 
                                            />
                                        </td>
                                    ))}
                                    <td className="p-3 text-right font-semibold text-gray-800 pr-4">{calculateRowTotal(line.hours)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="mt-6 flex justify-end gap-3">
                    <ActionButton onClick={onClose} variant="secondary">Cancel</ActionButton>
                    <ActionButton onClick={handleSubmit} variant="primary">Add</ActionButton>
                </div>
            </div>
        </div>
    );
}
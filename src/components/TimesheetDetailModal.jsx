// import React, { useState, useEffect, useMemo, useRef } from "react";

// import { backendUrl } from "./config.jsx";


// // --- SVG Icons ---

// const PlusIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />

//   </svg>

// );

// const CopyIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />

//   </svg>

// );

// const TrashIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

//   </svg>

// );

// const EyeIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />

//   </svg>

// );

// const XIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

//   </svg>

// );

// const MinusCircleIcon = ({ className = "h-4 w-4" }) => (

//   <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />

//   </svg>

// );


// // --- ActionButton Component ---

// const ActionButton = ({ children, onClick, variant = "secondary", icon, className = "", disabled = false }) => {

//   const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";

//   const variants = {

//     primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",

//     secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",

//   };

//   return (

//     <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>

//       {icon && <span className="mr-2">{icon}</span>}

//       {children}

//     </button>

//   );

// };


// // --- Toast Notification (Updated Duration) ---

// const showToast = (message, type = "info", duration = 3000) => {

//   const toast = document.createElement("div");

//   const typeClasses = { success: "bg-green-500", error: "bg-red-500", warning: "bg-yellow-500 text-black", info: "bg-blue-500" };

//   toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses["info"]}`;

//   toast.textContent = message;

//   document.body.appendChild(toast);

//   setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, duration);

// };


// const createEmptyLine = (id, periodLength) => {

//   const emptyHours = {};

//   for (let i = 0; i < periodLength; i++) { emptyHours[i] = 0; }

//   return {

//     id, description: "", project: "", plc: "", workOrder: "", wa_Code: "", pmUserID: "", payType: "SR",

//     poNumber: "", rlseNumber: "", poLineNumber: "", hours: emptyHours, hourIds: {}, isInvoiced: false,

//   };

// };


// const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => (

//   <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}>

//     <option value="">Select {label}</option>

//     {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}

//   </select>

// );


// const formatDate = (dateInput) => {

//   if (!dateInput) return "";

//   let date;

//   if (dateInput instanceof Date) { date = dateInput; }

//   else {

//     const dateOnlyString = String(dateInput).split("T")[0];

//     const parts = dateOnlyString.split("-");

//     if (parts.length !== 3) return dateInput;

//     const year = parseInt(parts[0], 10);

//     const month = parseInt(parts[1], 10) - 1;

//     const day = parseInt(parts[2], 10);

//     date = new Date(Date.UTC(year, month, day));

//   }

//   if (isNaN(date.getTime())) return "";

//   return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);

// };


// const getPeriodData = (endDateStr, frequency) => {

//   const end = new Date(endDateStr);

//   const dates = [];

//   const freq = frequency ? frequency.toLowerCase() : 'weekly';


//   const numOpt = { month: '2-digit', day: '2-digit', timeZone: 'UTC' };

//   const txtOpt = { month: 'short', day: '2-digit', timeZone: 'UTC' };


//   const getFmt = (d) => {

//     if (freq === 'monthly' || freq === 'semi-monthly') return new Intl.DateTimeFormat('en-US', txtOpt).format(d);

//     return new Intl.DateTimeFormat('en-US', numOpt).format(d);

//   };

//   const getApiFmt = (d) => d.toISOString().split('T')[0];


//   let start = new Date(end);


//   if (freq === 'weekly') {

//     start.setDate(end.getDate() - 6);

//   } else if (freq === 'bi-weekly') {

//     start.setDate(end.getDate() - 13);

//   } else if (freq === 'monthly') {

//     start = new Date(end.getFullYear(), end.getMonth(), 1);

//   } else if (freq === 'semi-monthly') {

//     if (end.getDate() <= 15) {

//       start = new Date(end.getFullYear(), end.getMonth(), 1);

//     } else {

//       start = new Date(end.getFullYear(), end.getMonth(), 16);

//     }

//   }


//   for (let d = new Date(start); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {

//     const currentDay = new Date(d);

//     dates.push({ display: getFmt(currentDay), apiDate: getApiFmt(currentDay), obj: currentDay });

//   }


//   return dates;

// };


// const hideableColumns = [

//   "Work Order", "Description", "Project", "PLC", "Pay Type",

//   "PO Number", "RLSE Number", "PO Line Number", "PO Remaining Hours",

// ];


// export default function TimesheetDetailModal({

//   timesheetData,

//   onClose,

//   onSave,

//   isSaving,

//   isAdmin = false,

// }) {

//   const [lines, setLines] = useState([]);

//   const [selectedLines, setSelectedLines] = useState(new Set());

//   const [isLoading, setIsLoading] = useState(true);

//   const [purchaseOrderData, setPurchaseOrderData] = useState([]);

//   const [isEditable, setIsEditable] = useState(false);


//   const [initialLines, setInitialLines] = useState([]);

//   const [linesToDelete, setLinesToDelete] = useState([]);

//   const [isCurrentlySaving, setIsCurrentlySaving] = useState(false);

//   const [timesheetDetails, setTimesheetDetails] = useState(null);

//   const [hiddenColumns, setHiddenColumns] = useState({

//     "Work Order": false, "Description": false, "Project": false, "PLC": false, "Pay Type": false,

//     "PO Number": false, "RLSE Number": false, "PO Line Number": false, "PO Remaining Hours": false,

//   });


//   // Config States

//   const [periodType, setPeriodType] = useState("Weekly");

//   const [configWeekends, setConfigWeekends] = useState([]);

//   const [configHighlightColor, setConfigHighlightColor] = useState("");

//   const [maxDailyHours, setMaxDailyHours] = useState(24);

//   const [hardEdit, setHardEdit] = useState(false);


//   // Dynamic Dates

//   const periodDates = useMemo(() => {

//     if(!timesheetData?.Date) return [];

//     return getPeriodData(timesheetData.Date, periodType);

//   }, [timesheetData, periodType]);


//   const [remainingPoHours, setRemainingPoHours] = useState({});

//   const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);


//   const nextId = useRef(0);


//   // Global 'today' variable for future date check, set to midnight UTC
//   // We keep this as UTC midnight for correct date part comparison.
//   const today = useMemo(() => {

//     const d = new Date();

//     return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

//   }, []);


//   // 1. Fetch Config (Updated)

//   useEffect(() => {

//     const fetchConfig = async () => {

//       try {

//         const response = await fetch("https://timesheet-subk-wa-approval-latest.onrender.com/api/ConfigValues");

//         if (!response.ok) throw new Error("Failed to fetch config");

//         const data = await response.json();


//         const getConfigValue = (name) => data.find(item => item.name?.toLowerCase() === name)?.value;


//         const periodConfig = getConfigValue("timesheet_period");

//         const weekendConfig = getConfigValue("weekend");

//         const colorConfig = getConfigValue("weekend_highlight_color");


//         const maxDailyHoursConfig = getConfigValue("max_daily_hours");

//         const hardEditConfig = getConfigValue("hard_edit");


//         if (periodConfig) setPeriodType(periodConfig);

//         if (weekendConfig) {

//           const days = weekendConfig.split(',').map(d => d.trim().toLowerCase());

//           setConfigWeekends(days);

//         }

//         if (colorConfig) setConfigHighlightColor(colorConfig);


//         if (maxDailyHoursConfig) setMaxDailyHours(parseFloat(maxDailyHoursConfig) || 24);

//         if (hardEditConfig) setHardEdit(hardEditConfig.toLowerCase() === 'true');

//       } catch (error) {

//         console.error("Config fetch error:", error);

//         setPeriodType("Weekly"); // Fallback

//         setConfigWeekends(["saturday", "sunday"]); // Fallback

//         setConfigHighlightColor("#e5e7eb"); // Fallback

//         setMaxDailyHours(24); // Fallback

//         setHardEdit(false); // Fallback

//       }

//     };

//     fetchConfig();

//   }, []);


//   // 2. Check Editability

//   useEffect(() => {

//     if (timesheetData) {

//       const status = timesheetData.Status?.toUpperCase();

//       setIsEditable(

//         status === "OPEN" || status === "REJECTED" || status === "CORRECTION"

//       );

//     }

//   }, [timesheetData]);


//   // 3. Fetch PO Remaining Hours

//   useEffect(() => {

//     if (!timesheetData || !timesheetData["Employee ID"]) return;

//     const fetchRemainingHours = async () => {

//       setIsLoadingRemainingHours(true);

//       const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${timesheetData["Employee ID"]}`;

//       try {

//         const response = await fetch(API_URL);

//         if (!response.ok) throw new Error(`HTTP error!`);

//         const data = await response.json();

//         const hoursMap = {};

//         if (Array.isArray(data)) {

//           data.forEach((item) => {

//             const poLineNum = String(item.poLineNumber || item.PoLineNumber || "").trim();

//             if (poLineNum) hoursMap[poLineNum] = parseFloat(item.remainingHours || item.RemainingHours || 0);

//           });

//         }

//         setRemainingPoHours(hoursMap);

//       } catch (error) { } finally { setIsLoadingRemainingHours(false); }

//     };

//     fetchRemainingHours();

//   }, [timesheetData]);


//   // 4. Fetch Details & Map to Dynamic Period

//   useEffect(() => {

//     // Only fetch details once we have the correct Period Type loaded

//     if(periodDates.length === 0) return;

//     fetchTimesheetDetails();

//   }, [periodDates]);


//   const fetchTimesheetDetails = async () => {

//     setIsLoading(true);

//     try {

//       const response = await fetch(`${backendUrl}/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);

//       if (!response.ok) throw new Error("Failed to fetch timesheet details");

//       const data = await response.json();


//       const poResponse = await fetch(`${backendUrl}/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);

//       if (!poResponse.ok) throw new Error("Failed to fetch purchase order details");

//       const poData = await poResponse.json();

//       const poDataArray = Array.isArray(poData) ? poData : [];

//       setPurchaseOrderData(poDataArray);


//       const dataArray = Array.isArray(data) ? data : [];

//       const filteredData = dataArray.filter((item) => formatDate(item.timesheet_Date) === timesheetData.Date);


//       if (filteredData.length > 0) {

//         setTimesheetDetails(filteredData[0]);

//       }


//       const mappedLines = filteredData.map((item) => {

//         const hoursData = {};

//         const hourIdsData = {};


//         periodDates.forEach((_, index) => { hoursData[index] = 0; });


//         let isLineInvoiced = false;


//         if (item.timesheetHours) {

//           item.timesheetHours.forEach((hourEntry) => {

//             if (hourEntry.invoiceGenerated === true) isLineInvoiced = true;


//             const entryDateStr = hourEntry.ts_Date.split("T")[0];

//             const dateIndex = periodDates.findIndex(d => d.apiDate === entryDateStr);


//             if (dateIndex !== -1) {

//               hoursData[dateIndex] = hourEntry.hours;

//               hourIdsData[dateIndex] = hourEntry.id;

//             }

//           });

//         }


//         let fullWorkOrderString = "";

//         const poEntry = poDataArray.find((po) => po.project?.includes(item.projId));

//         if (poEntry) {

//           const projectIndex = poEntry.project.indexOf(item.projId);

//           if (projectIndex > -1) {

//             fullWorkOrderString = `${poEntry.wa_Code} - ${poEntry.resourceDesc[projectIndex]}`;

//           }

//         }


//         return {

//           id: item.lineNo, description: item.description || "", project: item.projId || "",

//           plc: item.plc || "", payType: item.payType || "SR", workOrder: fullWorkOrderString,

//           wa_Code: poEntry?.wa_Code || "", pmUserID: poEntry?.pmUserId || "",

//           poNumber: item.poNumber || "", rlseNumber: item.rlseNumber || "",

//           poLineNumber: item.poLineNumber || "",

//           hours: hoursData, hourIds: hourIdsData, isInvoiced: isLineInvoiced,

//         };

//       });


//       setLines(mappedLines);

//       setInitialLines(JSON.parse(JSON.stringify(mappedLines)));

//     } catch (error) {

//       showToast(error.message, "error");

//     } finally {

//       setIsLoading(false);

//     }

//   };


//   const handleSelectChange = (id, fieldName, value) => {

//     setLines((currentLines) =>

//       currentLines.map((line) => {

//         if (line.id === id) {

//           let updatedLine = { ...line, [fieldName]: value };

//           if (fieldName === "workOrder") {

//             if (!value) {

//               const emptyLine = createEmptyLine(id, periodDates.length);

//               return { ...emptyLine, id: line.id };

//             }

//             const splitIndex = value.indexOf(" - ");

//             const waCode = splitIndex > -1 ? value.substring(0, splitIndex) : value;

//             const desc = splitIndex > -1 ? value.substring(splitIndex + 3) : "";

//             const selectedWorkOrderData = purchaseOrderData.find((item) => item.wa_Code === waCode && (item.resourceDesc || []).includes(desc));


//             if (selectedWorkOrderData) {

//               updatedLine.wa_Code = selectedWorkOrderData.wa_Code || "";

//               updatedLine.pmUserID = selectedWorkOrderData.pmUserId || "";

//               const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);

//               if (descIndex > -1) {

//                 updatedLine.description = desc || "";

//                 updatedLine.project = selectedWorkOrderData.project[descIndex] || "";

//                 updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || "";

//                 updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || "";

//                 updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || "";

//                 updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || "";

//               }

//             } else {

//               const emptyLine = createEmptyLine(id, periodDates.length);

//               return { ...emptyLine, id: line.id };

//             }

//           }

//           return updatedLine;

//         }

//         return line;

//       })

//     );

//   };


//   // --- UPDATED handleHourChange ---

//   const handleHourChange = (id, dayIndex, value) => {

//     // FIX: Preserve current value as empty string or 0 in state if input is empty

//     if (value === "") {

//       setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: "" } } : line));

//       return;

//     }


//     const numValue = parseFloat(value);

//     let isValid = true;

//     let toastMessage = "";

//     let toastType = "warning";

//     let isPOExceeded = false;

//     let isMaxDailyExceeded = false;



//     // VALIDATION 1: Basic hour constraints (0-24, 0.5 increments)

//     if (isNaN(numValue) || numValue < 0 || numValue > 24) {

//       isValid = false;

//       toastMessage = "Hours must be between 0 and 24.";

//     } else if (numValue % 0.5 !== 0) {

//       isValid = false;

//       toastMessage = "Hours must be in 0.5 increments.";

//     }


//     if (isValid) {

//       // VALIDATION 2: Max Daily Hours (Configurable)

//       const otherLinesTotal = lines

//         .filter((line) => line.id !== id)

//         .reduce((sum, line) => sum + (parseFloat(line.hours[dayIndex]) || 0), 0);


//       if (otherLinesTotal + numValue > maxDailyHours) {

//         isMaxDailyExceeded = true;

//         toastMessage = `Warning: Daily total hours exceed the maximum limit of ${maxDailyHours}.`;

//       }

//     }


//     if (isValid) {

//       // VALIDATION 3: PO Remaining Hours (Conditional based on hardEdit)

//       const currentLine = lines.find((line) => line.id === id);

//       if (currentLine && currentLine.poLineNumber) {

//         const poLineNumber = String(currentLine.poLineNumber).trim();

//         const remainingHours = remainingPoHours[poLineNumber];


//         if (remainingHours !== undefined) {

//           // Calculate the NEW hours being *added* across ALL lines for this PO


//           // Create a temporary view of the lines with the new value applied

//           const tempLines = lines.map(line =>

//             line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: numValue } } : line

//           );


//           const allLinesWithSamePO = tempLines.filter((l) => String(l.poLineNumber).trim() === poLineNumber);


//           const totalNewHoursForPO = allLinesWithSamePO.reduce((sum, l) => {

//             const initialLine = initialLines.find((init) => init.id === l.id);

//             const currentUITotal = Object.values(l.hours).reduce((s, h) => s + (parseFloat(h)||0), 0);

//             const initialTotal = initialLine ? Object.values(initialLine.hours).reduce((s, h) => s + (parseFloat(h)||0), 0) : 0;

//             return sum + (currentUITotal - initialTotal);

//           }, 0);


//           if (totalNewHoursForPO > remainingHours) {

//             isPOExceeded = true;


//             if (!hardEdit) { // HARD STOP

//               isValid = false;

//               toastType = "error";

//               toastMessage = `Disabled: Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} available for PO Line ${poLineNumber}).`;

//             } else { // SOFT WARNING

//               if (!isMaxDailyExceeded) { // Only set PO message if Max Daily wasn't already set

//                 toastMessage = `Warning: PO hours exceeded. ${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}.`;

//               } else {

//                 toastMessage += ` Also, PO hours exceeded.`;

//               }

//               toastType = "warning";

//             }

//           }

//         }

//       }

//     }


//     // Determine toast duration (5 seconds if hardEdit is true and a warning is triggered)

//     const toastDuration = (hardEdit && (isMaxDailyExceeded || isPOExceeded)) ? 5000 : 3000;


//     if (isValid) {

//       setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: numValue } } : line));

//       if (isMaxDailyExceeded || isPOExceeded) {

//         showToast(toastMessage, toastType, toastDuration);

//       }

//     } else {

//       showToast(toastMessage, toastType, toastDuration);

//       setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: line.hours[dayIndex] } } : line));
//     }

//   };


//   const getRemainingHoursForLine = (line) => {

//     if (!line.poLineNumber) return null;

//     const poLineNumStr = String(line.poLineNumber).trim();

//     const remaining = remainingPoHours[poLineNumStr];

//     if (remaining === undefined) return null;


//     const allLinesWithSamePO = lines.filter((l) => String(l.poLineNumber).trim() === poLineNumStr);

//     const totalNewHoursForPO = allLinesWithSamePO.reduce((sum, l) => {

//       const initialLine = initialLines.find((init) => init.id === l.id);

//       const currentUITotal = Object.values(l.hours).reduce((s, h) => s + (parseFloat(h)||0), 0);

//       const initialTotal = initialLine ? Object.values(initialLine.hours).reduce((s, h) => s + (parseFloat(h)||0), 0) : 0;

//       return sum + (currentUITotal - initialTotal);

//     }, 0);


//     return (remaining - totalNewHoursForPO).toFixed(2);

//   };


//   const addLine = () => setLines((prev) => [...prev, createEmptyLine(`temp-${Date.now()}`, periodDates.length)]);


//   const handleSelectLine = (id) => {

//     const newSelection = new Set(selectedLines);

//     newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);

//     setSelectedLines(newSelection);

//   };


//   const deleteLines = () => {

//     if (selectedLines.size === 0) { showToast("Please select lines to delete.", "warning"); return; }

//     if (timesheetData.Status?.toUpperCase() === "REJECTED") {

//       showToast("For rejected timesheets, hours will be zeroed out upon saving.", "info");

//       setLines((currentLines) =>

//         currentLines.map((line) =>

//           selectedLines.has(line.id) ? { ...line, hours: Object.keys(line.hours).reduce((acc,k)=>({...acc, [k]:0}), {}) } : line

//         )

//       );

//     } else {

//       setLines((currentLines) => {

//         const idsToDelete = [...selectedLines].filter((id) => typeof id === "number" || !String(id).startsWith("temp-"));

//         if (idsToDelete.length > 0) setLinesToDelete((prev) => [...new Set([...prev, ...idsToDelete])]);

//         return currentLines.filter((line) => !selectedLines.has(line.id));

//       });

//     }

//     setSelectedLines(new Set());

//   };


//   // Correct Dynamic Totals

//   const dailyTotals = useMemo(() => {

//     if(periodDates.length === 0) return {};

//     const totals = {};

//     periodDates.forEach((_, index) => { totals[index] = 0; });

//     lines.forEach((line) => {

//       Object.keys(line.hours).forEach((idx) => {

//         totals[idx] = (totals[idx] || 0) + (parseFloat(line.hours[idx]) || 0);

//       });

//     });

//     return totals;

//   }, [lines, periodDates]);


//   const copyLines = () => {

//     if (selectedLines.size === 0) { showToast("Please select lines to copy.", "warning"); return; }

//     const linesToCopy = lines.filter((line) => selectedLines.has(line.id));

//     const potentialTotals = { ...dailyTotals };

//     let validationFailed = false;

//     linesToCopy.forEach((lineToCopy) => {

//       Object.keys(lineToCopy.hours).forEach((idx) => {

//         potentialTotals[idx] = (potentialTotals[idx] || 0) + (parseFloat(lineToCopy.hours[idx]) || 0);

//         if (potentialTotals[idx] > maxDailyHours) validationFailed = true;

//       });

//     });

//     if (validationFailed) { showToast(`Cannot copy, as it would cause a daily total to exceed ${maxDailyHours} hours.`, "error"); return; }

//     showToast("Line(s) copied.", "info");

//     const newLines = linesToCopy.map((line, index) => ({

//       ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {},

//     }));

//     setLines((prev) => [...prev, ...newLines]);

//     setSelectedLines(new Set());

//   };


//   const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);


//   const toggleColumnVisibility = (columnName) => { setHiddenColumns((prev) => ({ ...prev, [columnName]: !prev[columnName] })); };

//   const showAllHiddenColumns = () => {

//     const allVisible = {}; Object.keys(hiddenColumns).forEach((col) => { allVisible[col] = false; }); setHiddenColumns(allVisible);

//   };


//   const handleSave = async () => {

//     setIsCurrentlySaving(true);

//     const invalidDay = Object.values(dailyTotals).find(val => val > maxDailyHours);

//     if (invalidDay) { showToast(`Save failed: Total hours for one or more days exceed ${maxDailyHours}.`, "error"); setIsCurrentlySaving(false); return; }


//     const promises = [];

//     const API_BASE_URL = backendUrl;

//     const isOnlyDeletion = lines.length === 0 || linesToDelete.length > 0;


//     if (!isOnlyDeletion && grandTotal === 0) { showToast("Cannot save a timesheet with zero hours.", "warning"); setIsCurrentlySaving(false); return; }


//     const now = new Date().toISOString();

//     const resourceId = timesheetData["Employee ID"];


//     linesToDelete.forEach((id) => {

//       if (typeof id === "number" || !id.startsWith("temp-")) {

//         promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}`, { method: "DELETE" }));

//       }

//     });


//     lines.forEach((currentLine) => {

//       const initialLine = initialLines.find((l) => l.id === currentLine.id);

//       const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);


//       if (!initialLine) {

//         if (totalHours > 0) {

//           const payload = {

//             Description: currentLine.description || "New Timesheet Line",

//             ProjId: currentLine.project || "",

//             Plc: currentLine.plc || "",

//             PayType: currentLine.payType || "SR",

//             PoNumber: currentLine.poNumber || "",

//             RlseNumber: currentLine.rlseNumber || "0",

//             Resource_Id: String(resourceId),

//             WorkOrder: currentLine.wa_Code,

//             Pm_User_Id: currentLine.pmUserID || "",

//             PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,

//             Timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

//             CreatedBy: String(resourceId),

//             UpdatedAt: now,

//             UpdatedBy: String(resourceId),

//             TimesheetHours: periodDates.map((dateInfo, idx) => {

//               let hourValue = parseFloat(currentLine.hours[idx]);

//               if (isNaN(hourValue)) hourValue = 0;

//               return { Ts_Date: dateInfo.apiDate, Hours: hourValue };

//             }),

//           };

//           promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

//         }

//         return;

//       }


//       const isLineChanged =

//         currentLine.payType !== initialLine.payType ||

//         currentLine.workOrder !== initialLine.workOrder ||

//         currentLine.wa_Code !== initialLine.wa_Code ||

//         currentLine.description !== initialLine.description;


//       if (isLineChanged) {

//         const updatePayload = {

//           lineNo: currentLine.id,

//           description: currentLine.description,

//           projId: currentLine.project,

//           plc: currentLine.plc,

//           payType: currentLine.payType,

//           poNumber: currentLine.poNumber,

//           rlseNumber: currentLine.rlseNumber,

//           resource_Id: String(resourceId),

//           pm_User_Id: currentLine.pmUserID,

//           poLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,

//           rvsnNumber: 0,

//           timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

//           workOrder: currentLine.wa_Code,

//           updatedAt: now,

//           updatedBy: String(resourceId),

//           createdBy: String(resourceId),

//           createdAt: timesheetDetails?.createdAt || now,

//           hours: 0,

//           status: timesheetData.Status || "OPEN",

//         };

//         promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${currentLine.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatePayload) }));

//       }


//       Object.keys(currentLine.hours).forEach((idx) => {

//         const initialHour = initialLine.hours[idx];

//         const currentHour = currentLine.hours[idx];

//         if (initialHour !== currentHour) {

//           const hourId = currentLine.hourIds[idx];

//           let hourValue = parseFloat(currentHour);

//           if (isNaN(hourValue)) hourValue = 0;


//           const url = `${API_BASE_URL}/api/TimesheetHours/upsert`;

//           const payload = {

//             id: hourId || 0,

//             ts_Date: periodDates[idx].apiDate,

//             hours: hourValue,

//             lineNo: currentLine.id,

//           };

//           promises.push(fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

//         }

//       });

//     });


//     if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }


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

//       setIsCurrentlySaving(false);

//     } catch (error) {

//       showToast(error.message, "error");

//       console.error("Save error:", error);

//       setIsCurrentlySaving(false);

//     }

//   };


//   const isLineDisabled = (line) => {

//     if (!isEditable) return true;

//     if (timesheetData?.Status?.toUpperCase() === "CORRECTION") return line.isInvoiced === true;

//     return false;

//   };


//   if (isLoading) return <div className="text-center p-8">Loading...</div>;


//   const workOrderOptions = Array.from(new Map(purchaseOrderData.flatMap((item) => (item.resourceDesc || []).map((desc) => { const label = `${item.wa_Code} - ${desc}`; return [label, { value: label, label: label }]; }))).values());

//   const availableHideableColumns = hideableColumns.filter((col) => col === "PO Remaining Hours" ? isAdmin : true);

//   const hiddenCount = Object.entries(hiddenColumns).filter(([key, val]) => val && (key === "PO Remaining Hours" ? isAdmin : true)).length;

//   const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden && (col === "PO Remaining Hours" ? isAdmin : true)).map(([col]) => col);


//   return (

//     <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">

//       <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">

//         <div className="flex flex-col">

//           {timesheetDetails && (

//             <div className="flex gap-4 mt-2 text-sm text-gray-600">

//               <div><span className="font-medium">Status:</span>   {timesheetData.Status

//        ? timesheetData.Status.charAt(0).toUpperCase() +

//          timesheetData.Status.slice(1).toLowerCase()

//        : "N/A"}</div>

//               <div><span className="font-medium">Date:</span> {timesheetDetails?.timesheet_Date ? formatDate(timesheetDetails.timesheet_Date) : "N/A"}</div>

//               <div><span className="font-medium">Approved By:</span> {timesheetDetails?.approvedBy || "N/A"}</div>

//               <div><span className="font-medium">Approved Date:</span> {timesheetDetails?.approvedDate ? formatDate(timesheetDetails.approvedDate) : "N/A"}</div>

//             </div>

//           )}

//         </div>

//         {isEditable && (

//           <div className="flex items-center gap-2">

//             <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>

//             <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>

//             {timesheetData?.Status?.toUpperCase() !== "CORRECTION" && (<ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>)}

//           </div>

//         )}

//       </div>


//       {hiddenCount > 0 && (

//         <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">

//           <div className="flex items-center gap-2"><EyeIcon className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium text-gray-700">{hiddenCount} column{hiddenCount > 1 ? "s" : ""} hidden:</span></div>

//           <div className="flex gap-2 flex-wrap">

//             {hiddenColumnsList.map((col) => (

//               <button key={col} onClick={() => toggleColumnVisibility(col)} className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer">{col}</button>

//             ))}

//             <button onClick={showAllHiddenColumns} className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer">Show All</button>

//           </div>

//         </div>

//       )}


//       <div className="p-4 max-h-[65vh] overflow-auto">

//         <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">

//           <table className="w-full text-sm min-w-[1600px]">

//             <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">

//               <tr>

//                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>

//                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>

//                 {availableHideableColumns.map((col) => !hiddenColumns[col] && (

//                   <th key={col} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">

//                     <div className="flex items-center justify-between gap-2 group">

//                       <span>{col}</span>

//                       <button onClick={(e) => { e.stopPropagation(); toggleColumnVisibility(col); }} className="p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100" title="Hide column" type="button">

//                         <MinusCircleIcon className="h-4 w-4 text-gray-500 hover:text-gray-800" />

//                       </button>

//                     </div>

//                   </th>

//                 ))}

//                 {periodDates.map((dateInfo) => (

//                   <th key={dateInfo.apiDate} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{dateInfo.display}</th>

//                 ))}

//                 <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-gray-200/80 bg-white/50">

//               {lines.map((line, index) => {

//                 const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);

//                 const isDisabled = isLineDisabled(line);

//                 return (

//                   <tr key={line.id} className="hover:bg-slate-50/50">

//                     <td className="p-2 text-center">

//                       <input type="checkbox" className={`rounded border-gray-300 ${!isEditable ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={!isEditable} />

//                     </td>

//                     <td className="p-3 text-center text-gray-500">{index + 1}</td>

//                     {!hiddenColumns["Work Order"] && (<td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={(e) => handleSelectChange(line.id, "workOrder", e.target.value)} disabled={isDisabled} /></td>)}

//                     {!hiddenColumns["Description"] && (<td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {!hiddenColumns["Project"] && (<td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {!hiddenColumns["PLC"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {!hiddenColumns["Pay Type"] && (<td className="p-2 min-w-[120px]"><select value={line.payType} onChange={(e) => handleSelectChange(line.id, "payType", e.target.value)} className={`w-full p-1.5 border border-gray-200 rounded-md ${isDisabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`} disabled={isDisabled}><option value="SR">  Regular</option><option value="SO">Overtime</option></select></td>)}

//                     {!hiddenColumns["PO Number"] && (<td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {!hiddenColumns["RLSE Number"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {!hiddenColumns["PO Line Number"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

//                     {isAdmin && !hiddenColumns["PO Remaining Hours"] && (<td className="p-2 min-w-[120px]">{line.poLineNumber && remainingPoHours[String(line.poLineNumber).trim()] !== undefined ? (<div className="text-xs font-medium text-center"><span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? "text-red-600" : "text-green-600"}`}>{getRemainingHoursForLine(line)} hrs</span></div>) : ( <div className="text-xs font-medium text-center text-gray-400">-</div> )}</td>)}


//                     {/* --- DAILY HOURS COLUMN (with Future Date Check) --- */}

//                     {periodDates.map((dateInfo, dayIndex) => {

//                       const dayName = dateInfo.obj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

//                       const isWeekend = configWeekends.includes(dayName);


//                       // FUTURE DATE LOGIC (MODIFIED): Compare UTC date parts to avoid millisecond/timezone issues.
//                       // Date is "future" if the year, or (same year AND future month), or (same year/month AND future day)
//                       const isFutureDate = 
//                           dateInfo.obj.getUTCFullYear() > today.getUTCFullYear() ||
//                           (dateInfo.obj.getUTCFullYear() === today.getUTCFullYear() && dateInfo.obj.getUTCMonth() > today.getUTCMonth()) ||
//                           (dateInfo.obj.getUTCFullYear() === today.getUTCFullYear() && dateInfo.obj.getUTCMonth() === today.getUTCMonth() && dateInfo.obj.getUTCDate() > today.getUTCDate());

//                       // COMBINED DISABILITY
//                       const finalDisabled = isDisabled || isFutureDate;


//                       // MAX DAILY HOURS HIGHLIGHT
//                       const dayTotal = dailyTotals[dayIndex] || 0;
//                       const exceededMax = dayTotal > maxDailyHours;

//                       // Conditional styling based on status/config
//                       let inputClasses = `w-20 text-right p-1.5 border rounded-md shadow-sm `;
//                       let inputStyle = {};

//                       if (exceededMax) {
//                         inputClasses += 'bg-red-200 border-red-500 text-red-800';
//                       } else if (finalDisabled) {
//                         inputClasses += 'bg-gray-100 text-gray-500';
//                       } else if (isWeekend && configHighlightColor) {
//                         inputStyle.backgroundColor = configHighlightColor;
//                         inputClasses += 'text-gray-900';
//                       } else if (isWeekend && !configHighlightColor) {
//                         inputClasses += 'bg-gray-100 text-gray-900';
//                       } else {
//                         inputClasses += 'bg-white text-gray-900';
//                       }

//                       if (finalDisabled) {
//                         inputClasses += ' cursor-not-allowed';
//                       }


//                       return (
//                         <td key={dateInfo.apiDate} className="p-2">
//                           <input
//                             type="number"
//                             step="0.5"
//                             // FIX: Conditionally show value if input is disabled and the value is not empty
//                             value={line.hours[dayIndex] === 0 || line.hours[dayIndex] === "" ? "" : line.hours[dayIndex]}
//                             onChange={(e) => handleHourChange(line.id, dayIndex, e.target.value)}
//                             className={inputClasses}
//                             style={inputStyle}
//                             disabled={finalDisabled}
//                           />
//                         </td>
//                       );
//                     })}

//                     <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>

//                   </tr>

//                 );
//               })}
//             </tbody>

//             <tfoot className="bg-slate-200/80 font-semibold sticky bottom-0">

//               <tr className="border-t-2 border-gray-300">

//                 <td colSpan={2 + availableHideableColumns.filter((col) => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>

//                 {periodDates.map((_, idx) => (

//                   <td key={idx} className="p-2 text-center">

//                     <div className={`w-20 p-1.5 ${dailyTotals[idx] > maxDailyHours ? 'text-red-600 font-bold' : ''}`}>

//                       {dailyTotals[idx] ? dailyTotals[idx].toFixed(2) : "0.00"}

//                     </div>

//                   </td>

//                 ))}

//                 <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>

//               </tr>

//             </tfoot>

//           </table>

//         </div>


//       </div>

//       <div className="mt-6 flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">

//         <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>

//         {isEditable && (<button onClick={handleSave} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving || isCurrentlySaving}>{isCurrentlySaving ? "Saving..." : "Save Changes"}</button>)}

//       </div>

//     </div>

//   );

// }

import React, { useState, useEffect, useMemo, useRef } from "react";

import { backendUrl } from "./config.jsx";
import { comment } from "postcss";


// --- SVG Icons ---

const PlusIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />

  </svg>

);

const CopyIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />

  </svg>

);

const TrashIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />

  </svg>

);

const EyeIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />

  </svg>

);

const XIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />

  </svg>

);

const MinusCircleIcon = ({ className = "h-4 w-4" }) => (

  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">

    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />

  </svg>

);


// --- ActionButton Component ---

const ActionButton = ({ children, onClick, variant = "secondary", icon, className = "", disabled = false }) => {

  const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150";

  const variants = {

    primary: "border-transparent text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 focus:ring-indigo-500",

    secondary: "border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-indigo-500 font-semibold",

  };

  return (

    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>

      {icon && <span className="mr-2">{icon}</span>}

      {children}

    </button>

  );

};


// --- Toast Notification (Updated Duration) ---

const showToast = (message, type = "info", duration = 3000) => {

  const toast = document.createElement("div");

  const typeClasses = { success: "bg-green-500", error: "bg-red-500", warning: "bg-yellow-500 text-black", info: "bg-blue-500" };

  toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses["info"]}`;

  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => { if (document.body.contains(toast)) { document.body.removeChild(toast); } }, duration);

};


const createEmptyLine = (id, periodLength) => {

  const emptyHours = {};

  for (let i = 0; i < periodLength; i++) { emptyHours[i] = 0; }

  return {

    id, description: "", project: "", plc: "", workOrder: "", wa_Code: "", pmUserID: "", payType: "SR",

    poNumber: "", rlseNumber: "", poLineNumber: "", hours: emptyHours, hourIds: {}, isInvoiced: false,

  };

};


const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => (

  <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}>

    <option value="">Select {label}</option>

    {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}

  </select>

);


const formatDate = (dateInput) => {

  if (!dateInput) return "";

  let date;

  if (dateInput instanceof Date) { date = dateInput; }

  else {

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


const getPeriodData = (endDateStr, frequency) => {

  const end = new Date(endDateStr);

  const dates = [];

  const freq = frequency ? frequency.toLowerCase() : 'weekly';


  const numOpt = { month: '2-digit', day: '2-digit', timeZone: 'UTC' };

  const txtOpt = { month: 'short', day: '2-digit', timeZone: 'UTC' };


  const getFmt = (d) => {

    if (freq === 'monthly' || freq === 'semi-monthly') return new Intl.DateTimeFormat('en-US', txtOpt).format(d);

    return new Intl.DateTimeFormat('en-US', numOpt).format(d);

  };

  const getApiFmt = (d) => d.toISOString().split('T')[0];


  let start = new Date(end);


  if (freq === 'weekly') {

    start.setDate(end.getDate() - 6);

  } else if (freq === 'bi-weekly') {

    start.setDate(end.getDate() - 13);

  } else if (freq === 'monthly') {

    start = new Date(end.getFullYear(), end.getMonth(), 1);

  } else if (freq === 'semi-monthly') {

    if (end.getDate() <= 15) {

      start = new Date(end.getFullYear(), end.getMonth(), 1);

    } else {

      start = new Date(end.getFullYear(), end.getMonth(), 16);

    }

  }


  for (let d = new Date(start); d.getTime() <= end.getTime(); d.setDate(d.getDate() + 1)) {

    const currentDay = new Date(d);

    dates.push({ display: getFmt(currentDay), apiDate: getApiFmt(currentDay), obj: currentDay });

  }


  return dates;

};


const hideableColumns = [

  "Work Order", "Description", "Project", "PLC", "Pay Type",

  "PO Number", "RLSE Number", "PO Line Number", "PO Remaining Hours",

];


export default function TimesheetDetailModal({

  timesheetData,

  onClose,

  onSave,

  isSaving,

  isAdmin = false,

}) {

  const [lines, setLines] = useState([]);

  const [selectedLines, setSelectedLines] = useState(new Set());

  const [isLoading, setIsLoading] = useState(true);

  const [purchaseOrderData, setPurchaseOrderData] = useState([]);

  const [isEditable, setIsEditable] = useState(false);


  const [initialLines, setInitialLines] = useState([]);

  const [linesToDelete, setLinesToDelete] = useState([]);

  const [isCurrentlySaving, setIsCurrentlySaving] = useState(false);

  const [timesheetDetails, setTimesheetDetails] = useState(null);

  const [hiddenColumns, setHiddenColumns] = useState({

    "Work Order": false, "Description": false, "Project": false, "PLC": false, "Pay Type": false,

    "PO Number": false, "RLSE Number": false, "PO Line Number": false, "PO Remaining Hours": false,

  });


  // Config States

  const [periodType, setPeriodType] = useState("Weekly");

  const [configWeekends, setConfigWeekends] = useState([]);

  const [configHighlightColor, setConfigHighlightColor] = useState("");

  const [maxDailyHours, setMaxDailyHours] = useState(24);

  const [hardEdit, setHardEdit] = useState(false);


  // Dynamic Dates

  const periodDates = useMemo(() => {

    if(!timesheetData?.Date) return [];

    return getPeriodData(timesheetData.Date, periodType);

  }, [timesheetData, periodType]);


  const [remainingPoHours, setRemainingPoHours] = useState({});

  const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);

  
 

  const [showReasonPrompt, setShowReasonPrompt] = useState(false);

  const [updateReason, setUpdateReason] = useState("");

  
  const nextId = useRef(0);


  // Global 'today' variable for future date check, set to midnight UTC
  // We keep this as UTC midnight for correct date part comparison.
  const today = useMemo(() => {

    const d = new Date();

    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

  }, []);


  // 1. Fetch Config (Updated)

  useEffect(() => {

    const fetchConfig = async () => {

      try {

        const response = await fetch(`${backendUrl}/api/ConfigValues`);

        if (!response.ok) throw new Error("Failed to fetch config");

        const data = await response.json();


        const getConfigValue = (name) => data.find(item => item.name?.toLowerCase() === name)?.value;


        const periodConfig = getConfigValue("timesheet_period");

        const weekendConfig = getConfigValue("weekend");

        const colorConfig = getConfigValue("weekend_highlight_color");


        const maxDailyHoursConfig = getConfigValue("max_daily_hours");

        const hardEditConfig = getConfigValue("hard_edit");


        if (periodConfig) setPeriodType(periodConfig);

        if (weekendConfig) {

          const days = weekendConfig.split(',').map(d => d.trim().toLowerCase());

          setConfigWeekends(days);

        }

        if (colorConfig) setConfigHighlightColor(colorConfig);


        if (maxDailyHoursConfig) setMaxDailyHours(parseFloat(maxDailyHoursConfig) || 24);

        if (hardEditConfig) setHardEdit(hardEditConfig.toLowerCase() === 'true');

      } catch (error) {

        console.error("Config fetch error:", error);

        setPeriodType("Weekly"); // Fallback

        setConfigWeekends(["saturday", "sunday"]); // Fallback

        setConfigHighlightColor("#e5e7eb"); // Fallback

        setMaxDailyHours(24); // Fallback

        setHardEdit(false); // Fallback

      }

    };

    fetchConfig();

  }, []);


  // 2. Check Editability

  useEffect(() => {

    if (timesheetData) {

      const status = timesheetData.Status?.toUpperCase();

      setIsEditable(

        status === "OPEN" || status === "REJECTED" || status === "CORRECTION"

      );

    }

  }, [timesheetData]);


  // 3. Fetch PO Remaining Hours

  useEffect(() => {

    if (!timesheetData || !timesheetData["Employee ID"]) return;

    const fetchRemainingHours = async () => {

      setIsLoadingRemainingHours(true);

      const API_URL = `${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${timesheetData["Employee ID"]}`;

      try {

        const response = await fetch(API_URL);

        if (!response.ok) throw new Error(`HTTP error!`);

        const data = await response.json();

        const hoursMap = {};

        if (Array.isArray(data)) {

          data.forEach((item) => {

            const poLineNum = String(item.poLineNumber || item.PoLineNumber || "").trim();

            if (poLineNum) hoursMap[poLineNum] = parseFloat(item.remainingHours || item.RemainingHours || 0);

          });

        }

        setRemainingPoHours(hoursMap);

      } catch (error) { } finally { setIsLoadingRemainingHours(false); }

    };

    fetchRemainingHours();

  }, [timesheetData]);


  // 4. Fetch Details & Map to Dynamic Period

  useEffect(() => {

    // Only fetch details once we have the correct Period Type loaded

    if(periodDates.length === 0) return;

    fetchTimesheetDetails();

  }, [periodDates]);


  const fetchTimesheetDetails = async () => {

    setIsLoading(true);

    try {

      const response = await fetch(`${backendUrl}/api/SubkTimesheet/ByResource/${timesheetData["Employee ID"]}`);

      if (!response.ok) throw new Error("Failed to fetch timesheet details");

      const data = await response.json();


      const poResponse = await fetch(`${backendUrl}/api/PurchaseOrders/ByResourceDetails/${timesheetData["Employee ID"]}`);

      if (!poResponse.ok) throw new Error("Failed to fetch purchase order details");

      const poData = await poResponse.json();

      const poDataArray = Array.isArray(poData) ? poData : [];

      setPurchaseOrderData(poDataArray);


      const dataArray = Array.isArray(data) ? data : [];

      const filteredData = dataArray.filter((item) => formatDate(item.timesheet_Date) === timesheetData.Date);


      if (filteredData.length > 0) {

        setTimesheetDetails(filteredData[0]);

      }


      const mappedLines = filteredData.map((item) => {

        const hoursData = {};

        const hourIdsData = {};


        periodDates.forEach((_, index) => { hoursData[index] = 0; });


        let isLineInvoiced = false;


        if (item.timesheetHours) {

          item.timesheetHours.forEach((hourEntry) => {

            if (hourEntry.invoiceGenerated === true) isLineInvoiced = true;


            const entryDateStr = hourEntry.ts_Date.split("T")[0];

            const dateIndex = periodDates.findIndex(d => d.apiDate === entryDateStr);


            if (dateIndex !== -1) {

              hoursData[dateIndex] = hourEntry.hours;

              hourIdsData[dateIndex] = hourEntry.id;

            }

          });

        }


        let fullWorkOrderString = "";

        const poEntry = poDataArray.find((po) => po.project?.includes(item.projId));

        if (poEntry) {

          const projectIndex = poEntry.project.indexOf(item.projId);

          if (projectIndex > -1) {

            fullWorkOrderString = `${poEntry.wa_Code} - ${poEntry.resourceDesc[projectIndex]}`;

          }

        }


        return {

          id: item.lineNo, description: item.description || "", project: item.projId || "",

          plc: item.plc || "", payType: item.payType || "SR", workOrder: fullWorkOrderString,

          wa_Code: poEntry?.wa_Code || "", pmUserID: poEntry?.pmUserId || "",

          poNumber: item.poNumber || "", rlseNumber: item.rlseNumber || "",

          poLineNumber: item.poLineNumber || "",

          hours: hoursData, hourIds: hourIdsData, isInvoiced: isLineInvoiced,

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

              const emptyLine = createEmptyLine(id, periodDates.length);

              return { ...emptyLine, id: line.id };

            }

            const splitIndex = value.indexOf(" - ");

            const waCode = splitIndex > -1 ? value.substring(0, splitIndex) : value;

            const desc = splitIndex > -1 ? value.substring(splitIndex + 3) : "";

            const selectedWorkOrderData = purchaseOrderData.find((item) => item.wa_Code === waCode && (item.resourceDesc || []).includes(desc));


            if (selectedWorkOrderData) {

              updatedLine.wa_Code = selectedWorkOrderData.wa_Code || "";

              updatedLine.pmUserID = selectedWorkOrderData.pmUserId || "";

              const descIndex = selectedWorkOrderData.resourceDesc.indexOf(desc);

              if (descIndex > -1) {

                updatedLine.description = desc || "";

                updatedLine.project = selectedWorkOrderData.project[descIndex] || "";

                updatedLine.plc = selectedWorkOrderData.plcCd[descIndex] || "";

                updatedLine.poNumber = selectedWorkOrderData.purchaseOrder[0] || "";

                updatedLine.rlseNumber = selectedWorkOrderData.purchaseOrderRelease[0] || "";

                updatedLine.poLineNumber = selectedWorkOrderData.poLineNumber[descIndex] || "";

              }

            } else {

              const emptyLine = createEmptyLine(id, periodDates.length);

              return { ...emptyLine, id: line.id };

            }

          }

          return updatedLine;

        }

        return line;

      })

    );

  };


  // --- UPDATED handleHourChange ---

  const handleHourChange = (id, dayIndex, value) => {

    // FIX: Preserve current value as empty string or 0 in state if input is empty

    if (value === "") {

      setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: "" } } : line));

      return;

    }


    const numValue = parseFloat(value);

    let isValid = true;

    let toastMessage = "";

    let toastType = "warning";

    let isPOExceeded = false;

    let isMaxDailyExceeded = false;



    // VALIDATION 1: Basic hour constraints (0-24, 0.5 increments)

    if (isNaN(numValue) || numValue < 0 || numValue > 24) {

      isValid = false;

      toastMessage = "Hours must be between 0 and 24.";

    } else if (numValue % 0.5 !== 0) {

      isValid = false;

      toastMessage = "Hours must be in 0.5 increments.";

    }


    if (isValid) {

      // VALIDATION 2: Max Daily Hours (Configurable)

      const otherLinesTotal = lines

        .filter((line) => line.id !== id)

        .reduce((sum, line) => sum + (parseFloat(line.hours[dayIndex]) || 0), 0);


      if (otherLinesTotal + numValue > maxDailyHours) {

        isMaxDailyExceeded = true;

        toastMessage = `Warning: Daily total hours exceed the maximum limit of ${maxDailyHours}.`;

      }

    }


    if (isValid) {

      // VALIDATION 3: PO Remaining Hours (Conditional based on hardEdit)

      const currentLine = lines.find((line) => line.id === id);

      if (currentLine && currentLine.poLineNumber) {

        const poLineNumber = String(currentLine.poLineNumber).trim();

        const remainingHours = remainingPoHours[poLineNumber];


        if (remainingHours !== undefined) {

          // Calculate the NEW hours being *added* across ALL lines for this PO


          // Create a temporary view of the lines with the new value applied

          const tempLines = lines.map(line =>

            line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: numValue } } : line

          );


          const allLinesWithSamePO = tempLines.filter((l) => String(l.poLineNumber).trim() === poLineNumber);


          const totalNewHoursForPO = allLinesWithSamePO.reduce((sum, l) => {

            const initialLine = initialLines.find((init) => init.id === l.id);

            const currentUITotal = Object.values(l.hours).reduce((s, h) => s + (parseFloat(h)||0), 0);

            const initialTotal = initialLine ? Object.values(initialLine.hours).reduce((s, h) => s + (parseFloat(h)||0), 0) : 0;

            return sum + (currentUITotal - initialTotal);

          }, 0);


          if (totalNewHoursForPO > remainingHours) {

            isPOExceeded = true;


            if (!hardEdit) { // HARD STOP

              isValid = false;

              toastType = "error";

              toastMessage = `Disabled: Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} available for PO Line ${poLineNumber}).`;

            } else { // SOFT WARNING

              if (!isMaxDailyExceeded) { // Only set PO message if Max Daily wasn't already set

                toastMessage = `Warning: PO hours exceeded. ${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}.`;

              } else {

                toastMessage += ` Also, PO hours exceeded.`;

              }

              toastType = "warning";

            }

          }

        }

      }

    }


    // Determine toast duration (5 seconds if hardEdit is true and a warning is triggered)

    const toastDuration = (hardEdit && (isMaxDailyExceeded || isPOExceeded)) ? 5000 : 3000;


    if (isValid) {

      setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: numValue } } : line));

      if (isMaxDailyExceeded || isPOExceeded) {

        showToast(toastMessage, toastType, toastDuration);

      }

    } else {

      showToast(toastMessage, toastType, toastDuration);

      setLines((currentLines) => currentLines.map((line) => line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: line.hours[dayIndex] } } : line));
    }

  };


  const getRemainingHoursForLine = (line) => {

    if (!line.poLineNumber) return null;

    const poLineNumStr = String(line.poLineNumber).trim();

    const remaining = remainingPoHours[poLineNumStr];

    if (remaining === undefined) return null;


    const allLinesWithSamePO = lines.filter((l) => String(l.poLineNumber).trim() === poLineNumStr);

    const totalNewHoursForPO = allLinesWithSamePO.reduce((sum, l) => {

      const initialLine = initialLines.find((init) => init.id === l.id);

      const currentUITotal = Object.values(l.hours).reduce((s, h) => s + (parseFloat(h)||0), 0);

      const initialTotal = initialLine ? Object.values(initialLine.hours).reduce((s, h) => s + (parseFloat(h)||0), 0) : 0;

      return sum + (currentUITotal - initialTotal);

    }, 0);


    return (remaining - totalNewHoursForPO).toFixed(2);

  };


  const addLine = () => setLines((prev) => [...prev, createEmptyLine(`temp-${Date.now()}`, periodDates.length)]);


  const handleSelectLine = (id) => {

    const newSelection = new Set(selectedLines);

    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);

    setSelectedLines(newSelection);

  };


  const deleteLines = () => {

    if (selectedLines.size === 0) { showToast("Please select lines to delete.", "warning"); return; }

    if (timesheetData.Status?.toUpperCase() === "REJECTED") {

      showToast("For rejected timesheets, hours will be zeroed out upon saving.", "info");

      setLines((currentLines) =>

        currentLines.map((line) =>

          selectedLines.has(line.id) ? { ...line, hours: Object.keys(line.hours).reduce((acc,k)=>({...acc, [k]:0}), {}) } : line

        )

      );

    } else {

      setLines((currentLines) => {

        const idsToDelete = [...selectedLines].filter((id) => typeof id === "number" || !String(id).startsWith("temp-"));

        if (idsToDelete.length > 0) setLinesToDelete((prev) => [...new Set([...prev, ...idsToDelete])]);

        return currentLines.filter((line) => !selectedLines.has(line.id));

      });

    }

    setSelectedLines(new Set());

  };


  // Correct Dynamic Totals

  const dailyTotals = useMemo(() => {

    if(periodDates.length === 0) return {};

    const totals = {};

    periodDates.forEach((_, index) => { totals[index] = 0; });

    lines.forEach((line) => {

      Object.keys(line.hours).forEach((idx) => {

        totals[idx] = (totals[idx] || 0) + (parseFloat(line.hours[idx]) || 0);

      });

    });

    return totals;

  }, [lines, periodDates]);


  const copyLines = () => {

    if (selectedLines.size === 0) { showToast("Please select lines to copy.", "warning"); return; }

    const linesToCopy = lines.filter((line) => selectedLines.has(line.id));

    const potentialTotals = { ...dailyTotals };

    let validationFailed = false;

    linesToCopy.forEach((lineToCopy) => {

      Object.keys(lineToCopy.hours).forEach((idx) => {

        potentialTotals[idx] = (potentialTotals[idx] || 0) + (parseFloat(lineToCopy.hours[idx]) || 0);

        if (potentialTotals[idx] > maxDailyHours) validationFailed = true;

      });

    });

    if (validationFailed) { showToast(`Cannot copy, as it would cause a daily total to exceed ${maxDailyHours} hours.`, "error"); return; }

    showToast("Line(s) copied.", "info");

    const newLines = linesToCopy.map((line, index) => ({

      ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {},

    }));

    setLines((prev) => [...prev, ...newLines]);

    setSelectedLines(new Set());

  };


  const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);


  const toggleColumnVisibility = (columnName) => { setHiddenColumns((prev) => ({ ...prev, [columnName]: !prev[columnName] })); };

  const showAllHiddenColumns = () => {

    const allVisible = {}; Object.keys(hiddenColumns).forEach((col) => { allVisible[col] = false; }); setHiddenColumns(allVisible);

  };
  
  
 

  const hasChangesToExistingData = useMemo(() => {

    // Check for deletions of existing lines (lines with numeric IDs)

    if (linesToDelete.some(id => typeof id === "number" || !String(id).startsWith("temp-"))) {

      return true;

    }


    // Check for changes to existing lines or hours

    for (const currentLine of lines) {

      // Only check lines that existed initially (non-temp IDs)

      if (typeof currentLine.id === "number" || !String(currentLine.id).startsWith("temp-")) {

        const initialLine = initialLines.find((l) => l.id === currentLine.id);

        

        if (!initialLine) continue; // Should not happen for existing lines


        // 1. Check line property changes

        const isLineChanged =

          currentLine.payType !== initialLine.payType ||

          currentLine.workOrder !== initialLine.workOrder ||

          currentLine.wa_Code !== initialLine.wa_Code ||

          currentLine.description !== initialLine.description;

        

        if (isLineChanged) return true;


        // 2. Check hour changes

        for (const idx of Object.keys(currentLine.hours)) {

          // Use '===' comparison for primitive values after initial load normalization

          if (String(currentLine.hours[idx]) !== String(initialLine.hours[idx])) {

            return true;

          }

        }

      }

    }

    return false;

  }, [lines, initialLines, linesToDelete]);


 

  const handleSaveWithReasonPrompt = () => {

    const invalidDay = Object.values(dailyTotals).find(val => val > maxDailyHours);

    if (invalidDay) { showToast(`Save failed: Total hours for one or more days exceed ${maxDailyHours}.`, "error"); return; }


    const linesToPost = lines.filter((line) => String(line.id).startsWith("temp-"));

    const isOnlyNewLines = linesToPost.length > 0 && lines.length === linesToPost.length && linesToDelete.length === 0;

    

    if (grandTotal === 0 && (lines.length > 0 || linesToDelete.length > 0)) { showToast("Cannot save a timesheet with zero hours (unless deleting all lines).", "warning"); return; }


    if (hasChangesToExistingData || linesToDelete.length > 0) {

      setShowReasonPrompt(true);

    } else {

      // If only new lines are added, or no changes at all, proceed without reason

      handleSave(""); 

    }

  };


 
//   const handleSave = async (reason = "") => {

//     setIsCurrentlySaving(true);

//     setShowReasonPrompt(false); // Close prompt modal

//     setUpdateReason(""); // Reset reason field


//     const invalidDay = Object.values(dailyTotals).find(val => val > maxDailyHours);

//     if (invalidDay) { showToast(`Save failed: Total hours for one or more days exceed ${maxDailyHours}.`, "error"); setIsCurrentlySaving(false); return; }


//     const promises = [];

//     const API_BASE_URL = backendUrl;

//     const isOnlyDeletion = lines.length === 0 && linesToDelete.length > 0;


//     if (!isOnlyDeletion && grandTotal === 0) { showToast("Cannot save a timesheet with zero hours.", "warning"); setIsCurrentlySaving(false); return; }


//     const now = new Date().toISOString();

//     const resourceId = timesheetData["Employee ID"];


//     // 1. Deletions

//     linesToDelete.forEach((id) => {

//       if (typeof id === "number" || !String(id).startsWith("temp-")) {

//         promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}?reason=${encodeURIComponent(reason)}`, { method: "DELETE" })); 

//       }

//     });


//     // 2. New Lines (POST) / Existing Lines (PUT/Hours Upsert)

//     lines.forEach((currentLine) => {

//       const initialLine = initialLines.find((l) => l.id === currentLine.id);

//       const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);


//       // A. New Line (POST)

//       if (!initialLine) {

//         if (totalHours > 0) {

//           const payload = {

//             Description: currentLine.description || "New Timesheet Line",

//             ProjId: currentLine.project || "",

//             Plc: currentLine.plc || "",

//             PayType: currentLine.payType || "SR",

//             PoNumber: currentLine.poNumber || "",

//             RlseNumber: currentLine.rlseNumber || "0",

//             Resource_Id: String(resourceId),

//             WorkOrder: currentLine.wa_Code,

//             Pm_User_Id: currentLine.pmUserID || "",

//             PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,

//             Timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

//             CreatedBy: String(resourceId),

//             UpdatedAt: now,

//             UpdatedBy: String(resourceId),

//             UpdateReason: reason, 

//             TimesheetHours: periodDates.map((dateInfo, idx) => {

//               let hourValue = parseFloat(currentLine.hours[idx]);

//               if (isNaN(hourValue)) hourValue = 0;

//               return { Ts_Date: dateInfo.apiDate, Hours: hourValue };

//             }),

//           };

//           promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

//         }

//         return;

//       }


//       // B. Existing Line Property Change (PUT)

//       const isLineChanged =

//         currentLine.payType !== initialLine.payType ||

//         currentLine.workOrder !== initialLine.workOrder ||

//         currentLine.wa_Code !== initialLine.wa_Code ||

//         currentLine.description !== initialLine.description;


//       if (isLineChanged) {

//         const updatePayload = {

//           lineNo: currentLine.id,

//           description: currentLine.description,

//           projId: currentLine.project,

//           plc: currentLine.plc,

//           payType: currentLine.payType,

//           poNumber: currentLine.poNumber,

//           rlseNumber: currentLine.rlseNumber,

//           resource_Id: String(resourceId),

//           pm_User_Id: currentLine.pmUserID,

//           poLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,

//           rvsnNumber: 0,

//           timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

//           workOrder: currentLine.wa_Code,

//           updatedAt: now,

//           updatedBy: String(resourceId),

//           createdBy: String(resourceId),

//           createdAt: timesheetDetails?.createdAt || now,

//           hours: 0,

//           status: timesheetData.Status || "OPEN",

//           UpdateReason: reason, 
//         };

//         promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${currentLine.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatePayload) }));

//       }


//       // C. Existing Hour Change (TimesheetHours upsert)

//       Object.keys(currentLine.hours).forEach((idx) => {

//         const initialHour = initialLine.hours[idx];

//         const currentHour = currentLine.hours[idx];

//         if (String(initialHour) !== String(currentHour)) {

//           const hourId = currentLine.hourIds[idx];

//           let hourValue = parseFloat(currentHour);

//           if (isNaN(hourValue)) hourValue = 0;


//           const url = `${API_BASE_URL}/api/TimesheetHours/upsert`;

//           const payload = {

//             id: hourId || 0,

//             ts_Date: periodDates[idx].apiDate,

//             hours: hourValue,

//             lineNo: currentLine.id,

// //             UpdateReason: reason, 

//           };

//           promises.push(fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

//         }

//       });

//     });


//     if (promises.length === 0) { showToast("No changes to save.", "info"); setIsCurrentlySaving(false); return; }


//     try {

//       const responses = await Promise.all(promises);

//       for (const response of responses) {

//         if (!response.ok) {

//           const errorText = await response.text();

//           throw new Error(`Failed to save changes: ${errorText}`);

//         }

//       }

//       showToast("Timesheet saved successfully!", "success");

//       onSave();

//       setIsCurrentlySaving(false);

//     } catch (error) {

//       showToast(error.message, "error");

//       console.error("Save error:", error);

//       setIsCurrentlySaving(false);

//     }

//   };

const handleSave = async (reason = "") => {

    setIsCurrentlySaving(true);

    setShowReasonPrompt(false); // Close prompt modal

    setUpdateReason(""); // Reset reason field


    const invalidDay = Object.values(dailyTotals).find(val => val > maxDailyHours);

    if (invalidDay) { showToast(`Save failed: Total hours for one or more days exceed ${maxDailyHours}.`, "error"); setIsCurrentlySaving(false); return; }


    const promises = [];

    const API_BASE_URL = backendUrl;

    const isOnlyDeletion = lines.length === 0 && linesToDelete.length > 0;


    if (!isOnlyDeletion && grandTotal === 0) { showToast("Cannot save a timesheet with zero hours.", "warning"); setIsCurrentlySaving(false); return; }


    const now = new Date().toISOString();

    const resourceId = timesheetData["Employee ID"];
  
    const currentUserName = String(resourceId); 


    // 1. Deletions

    linesToDelete.forEach((id) => {

      if (typeof id === "number" || !String(id).startsWith("temp-")) {

        promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${id}?reason=${encodeURIComponent(reason)}`, { method: "DELETE" })); 

      }

    });


    // 2. New Lines (POST) / Existing Lines (PUT/Hours Upsert)

    lines.forEach((currentLine) => {

      const initialLine = initialLines.find((l) => l.id === currentLine.id);

      const totalHours = Object.values(currentLine.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0);


      // A. New Line (POST)

      if (!initialLine) {

        if (totalHours > 0) {

          const payload = {

            Description: currentLine.description || "New Timesheet Line",

            ProjId: currentLine.project || "",

            Plc: currentLine.plc || "",

            PayType: currentLine.payType || "SR",

            PoNumber: currentLine.poNumber || "",

            RlseNumber: currentLine.rlseNumber || "0",

            Resource_Id: String(resourceId),

            WorkOrder: currentLine.wa_Code,

            Pm_User_Id: currentLine.pmUserID || "",

            PoLineNumber: parseInt(currentLine.poLineNumber, 10) || 0,

            Timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

            CreatedBy: String(resourceId), // Existing line property payload uses resourceId

            UpdatedAt: now,

            UpdatedBy: String(resourceId), // Existing line property payload uses resourceId

            UpdateReason: reason, 

            TimesheetHours: periodDates.map((dateInfo, idx) => {

              let hourValue = parseFloat(currentLine.hours[idx]);

              if (isNaN(hourValue)) hourValue = 0;

              return { Ts_Date: dateInfo.apiDate, Hours: hourValue, CreatedBy: currentUserName, UpdatedBy: currentUserName }; 

            }),

          };

          promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

        }

        return;

      }


      // B. Existing Line Property Change (PUT)

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

          timesheet_Date: new Date(timesheetData.Date).toISOString().split("T")[0],

          workOrder: currentLine.wa_Code,

          updatedAt: now,

          updatedBy: String(resourceId),

          createdBy: String(resourceId),

          createdAt: timesheetDetails?.createdAt || now,

          hours: 0,

          status: timesheetData.Status || "OPEN",

          UpdateReason: reason, 

        };

        promises.push(fetch(`${API_BASE_URL}/api/SubkTimesheet/${currentLine.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(updatePayload) }));

      }


      // C. Existing Hour Change (TimesheetHours upsert)

      Object.keys(currentLine.hours).forEach((idx) => {

        const initialHour = initialLine.hours[idx];

        const currentHour = currentLine.hours[idx];

        if (String(initialHour) !== String(currentHour)) {

          const hourId = currentLine.hourIds[idx];

          let hourValue = parseFloat(currentHour);

          if (isNaN(hourValue)) hourValue = 0;


          const url = `${API_BASE_URL}/api/TimesheetHours/upsert`;

          const payload = {

            id: hourId || 0,

            ts_Date: periodDates[idx].apiDate,

            hours: hourValue,

            lineNo: currentLine.id,
            CreatedBy: currentUserName, 
            UpdatedBy: currentUserName, 
         comment: reason,


          };

          promises.push(fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }));

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

      showToast("Timesheet saved successfully!", "success");

      onSave();

      setIsCurrentlySaving(false);

    } catch (error) {

      showToast(error.message, "error");

      console.error("Save error:", error);

      setIsCurrentlySaving(false);

    }

  };


  const isLineDisabled = (line) => {

    if (!isEditable) return true;

    if (timesheetData?.Status?.toUpperCase() === "CORRECTION") return line.isInvoiced === true;

    return false;

  };


  if (isLoading) return <div className="text-center p-8">Loading...</div>;


  const workOrderOptions = Array.from(new Map(purchaseOrderData.flatMap((item) => (item.resourceDesc || []).map((desc) => { const label = `${item.wa_Code} - ${desc}`; return [label, { value: label, label: label }]; }))).values());

  const availableHideableColumns = hideableColumns.filter((col) => col === "PO Remaining Hours" ? isAdmin : true);

  const hiddenCount = Object.entries(hiddenColumns).filter(([key, val]) => val && (key === "PO Remaining Hours" ? isAdmin : true)).length;

  const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden && (col === "PO Remaining Hours" ? isAdmin : true)).map(([col]) => col);


  return (

    <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden w-full max-w-[90vw]">
      
      {showReasonPrompt && ( 
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-[10001] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reason for Timesheet Update</h3>
{/*             <p className="text-sm text-gray-600 mb-4">Please provide a brief reason for modifying the existing timesheet entries or hours (required for changes to existing data).</p> */}
            <textarea
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={updateReason}
              onChange={(e) => setUpdateReason(e.target.value)}
              placeholder="E.g., Corrected hours for Monday, switched project code."
            />
            <div className="mt-4 flex justify-end gap-3">
              <ActionButton onClick={() => { setShowReasonPrompt(false); setUpdateReason(""); setIsCurrentlySaving(false); }} variant="secondary">Cancel</ActionButton>
              <ActionButton 
                onClick={() => handleSave(updateReason)} 
                variant="primary" 
                disabled={!updateReason.trim() || isCurrentlySaving}
              >
                {isCurrentlySaving ? "Saving..." : "Confirm & Save"}
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">

        <div className="flex flex-col">

          {timesheetDetails && (

            <div className="flex gap-4 mt-2 text-sm text-gray-600">

              <div><span className="font-medium">Status:</span>   {timesheetData.Status

       ? timesheetData.Status.charAt(0).toUpperCase() +

         timesheetData.Status.slice(1).toLowerCase()

       : "N/A"}</div>

              <div><span className="font-medium">Date:</span> {timesheetDetails?.timesheet_Date ? formatDate(timesheetDetails.timesheet_Date) : "N/A"}</div>

              <div><span className="font-medium">Approved By:</span> {timesheetDetails?.approvedBy || "N/A"}</div>

              <div><span className="font-medium">Approved Date:</span> {timesheetDetails?.approvedDate ? formatDate(timesheetDetails.approvedDate) : "N/A"}</div>

            </div>

          )}

        </div>

        {isEditable && (

          <div className="flex items-center gap-2">

            <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />}>Add Line</ActionButton>

            <ActionButton onClick={copyLines} icon={<CopyIcon />}>Copy</ActionButton>

            {timesheetData?.Status?.toUpperCase() !== "CORRECTION" && (<ActionButton onClick={deleteLines} icon={<TrashIcon />}>Delete</ActionButton>)}

          </div>

        )}

      </div>


      {hiddenCount > 0 && (

        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">

          <div className="flex items-center gap-2"><EyeIcon className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium text-gray-700">{hiddenCount} column{hiddenCount > 1 ? "s" : ""} hidden:</span></div>

          <div className="flex gap-2 flex-wrap">

            {hiddenColumnsList.map((col) => (

              <button key={col} onClick={() => toggleColumnVisibility(col)} className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer">{col}</button>

            ))}

            <button onClick={showAllHiddenColumns} className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer">Show All</button>

          </div>

        </div>

      )}


      <div className="p-4 max-h-[65vh] overflow-auto">

        <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">

          <table className="w-full text-sm min-w-[1600px]">

            <thead className="bg-slate-100/70 border-b border-gray-200/80 sticky top-0 z-10">

              <tr>

                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>

                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>

                {availableHideableColumns.map((col) => !hiddenColumns[col] && (

                  <th key={col} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">

                    <div className="flex items-center justify-between gap-2 group">

                      <span>{col}</span>

                      <button onClick={(e) => { e.stopPropagation(); toggleColumnVisibility(col); }} className="p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100" title="Hide column" type="button">

                        <MinusCircleIcon className="h-4 w-4 text-gray-500 hover:text-gray-800" />

                      </button>

                    </div>

                  </th>

                ))}

                {periodDates.map((dateInfo) => (

                  <th key={dateInfo.apiDate} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">{dateInfo.display}</th>

                ))}

                <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200/80 bg-white/50">

              {lines.map((line, index) => {

                const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);

                const isDisabled = isLineDisabled(line);

                return (

                  <tr key={line.id} className="hover:bg-slate-50/50">

                    <td className="p-2 text-center">

                      <input type="checkbox" className={`rounded border-gray-300 ${!isEditable ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={!isEditable} />

                    </td>

                    <td className="p-3 text-center text-gray-500">{index + 1}</td>

                    {!hiddenColumns["Work Order"] && (<td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={(e) => handleSelectChange(line.id, "workOrder", e.target.value)} disabled={isDisabled} /></td>)}

                    {!hiddenColumns["Description"] && (<td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {!hiddenColumns["Project"] && (<td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {!hiddenColumns["PLC"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {!hiddenColumns["Pay Type"] && (<td className="p-2 min-w-[120px]"><select value={line.payType} onChange={(e) => handleSelectChange(line.id, "payType", e.target.value)} className={`w-full p-1.5 border border-gray-200 rounded-md ${isDisabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"}`} disabled={isDisabled}><option value="SR">  Regular</option><option value="SO">Overtime</option></select></td>)}

                    {!hiddenColumns["PO Number"] && (<td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {!hiddenColumns["RLSE Number"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {!hiddenColumns["PO Line Number"] && (<td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>)}

                    {isAdmin && !hiddenColumns["PO Remaining Hours"] && (<td className="p-2 min-w-[120px]">{line.poLineNumber && remainingPoHours[String(line.poLineNumber).trim()] !== undefined ? (<div className="text-xs font-medium text-center"><span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? "text-red-600" : "text-green-600"}`}>{getRemainingHoursForLine(line)} hrs</span></div>) : ( <div className="text-xs font-medium text-center text-gray-400">-</div> )}</td>)}


                    {/* --- DAILY HOURS COLUMN (with Future Date Check) --- */}

                    {periodDates.map((dateInfo, dayIndex) => {

                      const dayName = dateInfo.obj.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

                      const isWeekend = configWeekends.includes(dayName);


                      // FUTURE DATE LOGIC (MODIFIED): Compare UTC date parts to avoid millisecond/timezone issues.
                      // Date is "future" if the year, or (same year AND future month), or (same year/month AND future day)
                      const isFutureDate = 
                          dateInfo.obj.getUTCFullYear() > today.getUTCFullYear() ||
                          (dateInfo.obj.getUTCFullYear() === today.getUTCFullYear() && dateInfo.obj.getUTCMonth() > today.getUTCMonth()) ||
                          (dateInfo.obj.getUTCFullYear() === today.getUTCFullYear() && dateInfo.obj.getUTCMonth() === today.getUTCMonth() && dateInfo.obj.getUTCDate() > today.getUTCDate());

                      // COMBINED DISABILITY
                      const finalDisabled = isDisabled || isFutureDate;


                      // MAX DAILY HOURS HIGHLIGHT
                      const dayTotal = dailyTotals[dayIndex] || 0;
                      const exceededMax = dayTotal > maxDailyHours;

                      // Conditional styling based on status/config
//                       let inputClasses = `w-20 text-right p-1.5 border rounded-md shadow-sm `;
//                       let inputStyle = {};

//                       if (exceededMax) {
//                         inputClasses += 'bg-red-200 border-red-500 text-red-800';
//                       } else if (finalDisabled) {
// //                         inputClasses += 'bg-gray-100 text-gray-500';
//                         // Disabled styling: Remove previous background class (which was applied if no custom color was set in step 1)
//                         inputClasses = inputClasses.replace('bg-gray-100', '').replace('bg-white', '');
//                         
//                         // If the highlight color was set via inputStyle, it remains. 
//                         // If not (e.g., config was empty), we apply a default gray class.
//                         if (!isWeekend || !configHighlightColor) {
//                           inputClasses += 'bg-gray-100'; // Only apply default gray if it's NOT a custom colored weekend cell
//                         }

//                         inputClasses += ' text-gray-500'; // Apply muted text color
//                       } else if (isWeekend && configHighlightColor) {
//                         inputStyle.backgroundColor = configHighlightColor;
//                         inputClasses += 'text-gray-900';
//                       } else if (isWeekend && !configHighlightColor) {
//                         inputClasses += 'bg-gray-100 text-gray-900';
//                       } else {
//                         inputClasses += 'bg-white text-gray-900';
//                       }

                       let inputClasses = `w-20 text-right p-1.5 border rounded-md shadow-sm `;
                      let inputStyle = {};


                      // 1. Apply Weekend Highlight Color first (Dynamically, via inputStyle)
                      if (isWeekend && configHighlightColor) {
                        inputStyle.backgroundColor = configHighlightColor;
                      } 
                      
                      // 2. Determine base background class if not using custom inline style
                      if (!inputStyle.backgroundColor && isWeekend) {
                        inputClasses += 'bg-gray-100'; // Default gray for weekends if no color configured
                      } else if (!inputStyle.backgroundColor) {
                        inputClasses += 'bg-white';
                      }


                      // 3. Apply Disabled/Max Hours overrides (These must come last)

                      if (exceededMax) {
                        // Max exceeded styling takes priority
                        inputStyle.backgroundColor = ''; // Clear custom background style
                        inputClasses = inputClasses.replace('bg-gray-100', '').replace('bg-white', ''); // Remove base background
                        inputClasses += 'bg-red-200 border-red-500 text-red-800';
                      } else if (finalDisabled) {
                        // Disabled styling (Muted Text/Cursor)
                        inputClasses = inputClasses.replace('bg-white', ''); // Remove base white background class
                        
                        // Only replace existing gray class if we DIDN'T set a custom color
                        if (isWeekend && configHighlightColor) {
                          // Custom color is set via inputStyle, do nothing to background class, but mute text
                          inputClasses = inputClasses.replace('bg-gray-100', ''); 
                        } else {
                          // Default gray background for disabled fields (this includes weekends without custom color config)
                          inputStyle.backgroundColor = ''; // Ensure inline style is cleared if we use the class
                          inputClasses += 'bg-gray-100';
                        }

                        inputClasses += ' text-gray-500 cursor-not-allowed';
                      } else {
                        // Ensure active fields have standard text color
                        inputClasses += ' text-gray-900';
                      }

                      if (finalDisabled) {
                        inputClasses += ' cursor-not-allowed';
                      }


                      return (
                        <td key={dateInfo.apiDate} className="p-2">
                          <input
                            type="number"
                            step="0.5"
                            // FIX: Conditionally show value if input is disabled and the value is not empty
                            value={line.hours[dayIndex] === 0 || line.hours[dayIndex] === "" ? "" : line.hours[dayIndex]}
                            onChange={(e) => handleHourChange(line.id, dayIndex, e.target.value)}
                            className={inputClasses}
                            style={inputStyle}
                            disabled={finalDisabled}
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

                <td colSpan={2 + availableHideableColumns.filter((col) => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>

                {periodDates.map((_, idx) => (

                  <td key={idx} className="p-2 text-center">

                    <div className={`w-20 p-1.5 ${dailyTotals[idx] > maxDailyHours ? 'text-red-600 font-bold' : ''}`}>

                      {dailyTotals[idx] ? dailyTotals[idx].toFixed(2) : "0.00"}

                    </div>

                  </td>

                ))}

                <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>

              </tr>

            </tfoot>

          </table>

        </div>


      </div>

      <div className="mt-6 flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">

        <button onClick={onClose} className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">Cancel</button>

      

        {isEditable && (<button onClick={handleSaveWithReasonPrompt} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSaving || isCurrentlySaving}>{isCurrentlySaving ? "Saving..." : "Save Changes"}</button>)}

      </div>

    </div>

  );

}
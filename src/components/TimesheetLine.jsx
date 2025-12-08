import React, { useState, useEffect, useMemo, useCallback } from "react";
import { backendUrl } from "./config";

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

// --- Helper Functions ---

const parseDateString = (dateStr, year = 2025) => {
  if (!dateStr) return new Date();
  if (dateStr.includes('/')) {
    const [month, day] = dateStr.split('/');
    return new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day)));
  } else {
    const months = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
    const parts = dateStr.split(' ');
    if (parts.length === 2) {
        const monthIndex = months[parts[0].toLowerCase()];
        const day = parseInt(parts[1]);
        if (monthIndex !== undefined && !isNaN(day)) {
            return new Date(Date.UTC(year, monthIndex, day));
        }
    }
  }
  return new Date();
};

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

// MODIFIED: Added duration parameter, defaulting to 3000ms
const showToast = (message, type = "info", duration = 3000) => {
  const toast = document.createElement("div");
  const typeClasses = { success: "bg-green-500", error: "bg-red-500", warning: "bg-yellow-500 text-black", info: "bg-blue-500" };
  toast.className = `fixed top-5 right-5 p-4 rounded-md text-white shadow-lg z-[10000] ${typeClasses[type] || typeClasses["info"]}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { if (document.body.contains(toast)) document.body.removeChild(toast); }, duration);
};

const createEmptyLine = (id, periodLength = 7) => {
  const emptyHours = {};
  for (let i = 0; i < periodLength; i++) { emptyHours[i] = ""; }
  return {
    id, description: "", project: "", plc: "", wa_Code: "", pmUserID: "", payType: "SR",
    poNumber: "", rlseNumber: "", poLineNumber: "", hours: emptyHours, hourIds: {}, workOrder: "", // Added workOrder for completeness
  };
};

const CascadingSelect = ({ label, options, value, onChange, disabled = false }) => (
  <select value={value} onChange={onChange} disabled={disabled} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}>
    <option value="">Select {label}</option>
    {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
  </select>
);

// --- Dynamic Period Generation ---
const generatePeriodDates = (year, periodType) => {
  const periods = [];
  const numericOptions = { month: "2-digit", day: "2-digit", timeZone: "UTC" };
  const textOptions = { month: "short", day: "2-digit", timeZone: "UTC" };
  const type = periodType ? periodType.toLowerCase() : "weekly";

  if (type === "weekly") {
    let d = new Date(Date.UTC(year, 0, 1));
    while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
    while (d.getUTCFullYear() === year) {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        dates.push(new Intl.DateTimeFormat("en-US", numericOptions).format(d));
        d.setUTCDate(d.getUTCDate() + 1);
      }
      periods.push({ label: `${dates[0]} - ${dates[6]}`, dates });
    }
  } else if (type === "bi-weekly") {
    let d = new Date(Date.UTC(year, 0, 1));
    while (d.getUTCDay() !== 1) d.setUTCDate(d.getUTCDate() + 1);
    while (d.getUTCFullYear() === year) {
      const dates = [];
      for (let i = 0; i < 14; i++) {
        dates.push(new Intl.DateTimeFormat("en-US", numericOptions).format(d));
        d.setUTCDate(d.getUTCDate() + 1);
      }
      periods.push({ label: `${dates[0]} - ${dates[13]}`, dates });
    }
  } else if (type === "semi-monthly") {
    for (let m = 0; m < 12; m++) {
      const dates1 = [];
      for (let day = 1; day <= 15; day++) {
        const d = new Date(Date.UTC(year, m, day));
        dates1.push(new Intl.DateTimeFormat("en-US", textOptions).format(d));
      }
      periods.push({ label: `${dates1[0]} - ${dates1[14]}`, dates: dates1 });
      const dates2 = [];
      const daysInMonth = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
      for (let day = 16; day <= daysInMonth; day++) {
        const d = new Date(Date.UTC(year, m, day));
        dates2.push(new Intl.DateTimeFormat("en-US", textOptions).format(d));
      }
      periods.push({ label: `${dates2[0]} - ${dates2[dates2.length - 1]}`, dates: dates2 });
    }
  } else if (type === "monthly") {
    for (let m = 0; m < 12; m++) {
      const dates = [];
      const daysInMonth = new Date(Date.UTC(year, m + 1, 0)).getUTCDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(Date.UTC(year, m, day));
        dates.push(new Intl.DateTimeFormat("en-US", textOptions).format(d));
      }
      periods.push({ label: `${dates[0]} - ${dates[dates.length - 1]}`, dates });
    }
  }
  return periods;
};

const getWeekEndDateFromPeriod = (period) => {
  if (!period?.dates?.length) return null;
  const lastDayString = period.dates[period.dates.length - 1];
  const date = parseDateString(lastDayString, 2025);
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};

const formatDateForComparison = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};

const hideableColumns = [
  "Work Order", "Description", "Project", "PLC", "Pay Type",
  "PO Number", "RLSE Number", "PO Line Number", "PO Remaining Hours",
];

export default function TimesheetLine({
  onClose,
  resourceId,
  existingTimesheetDates = [],
  timesheetToEdit = null,
  isAdmin = false,
}) {
  const [purchaseOrderData, setPurchaseOrderData] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedLines, setSelectedLines] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  
  // --- Config States ---
  const [periodType, setPeriodType] = useState("Weekly"); 
  const [configWeekends, setConfigWeekends] = useState([]);
  const [configHighlightColor, setConfigHighlightColor] = useState("");
  
  // --- NEW CONFIG STATES ---
  const [maxDailyHours, setMaxDailyHours] = useState(24); // Default to 24
  const [hardEdit, setHardEdit] = useState(false); // Default to false
  
  // Track cells that exceed max daily hours for highlighting
  const [maxHoursExceededCells, setMaxHoursExceededCells] = useState(new Set());

  const timePeriods = useMemo(() => generatePeriodDates(2025, periodType), [periodType]);
  const [selectedPeriod, setSelectedPeriod] = useState({});
  
  const [isPeriodInvalid, setIsPeriodInvalid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modifiedHours, setModifiedHours] = useState(new Set());
  const [hiddenColumns, setHiddenColumns] = useState({
    "Work Order": false, "Description": false, "Project": false, "PLC": false, "Pay Type": false,
    "PO Number": false, "RLSE Number": false, "PO Line Number": false, "PO Remaining Hours": false,
  });
  const [remainingPoHours, setRemainingPoHours] = useState({});
  const [isLoadingRemainingHours, setIsLoadingRemainingHours] = useState(false);

  const isEditMode = Boolean(timesheetToEdit);

  useEffect(() => {
    const fetchConfig = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/ConfigValues`);
            if (!response.ok) throw new Error("Failed to fetch config");
            const data = await response.json();
            const periodConfig = data.find(item => item.name?.toLowerCase() === "timesheet_period");
            const weekendConfig = data.find(item => item.name?.toLowerCase() === "weekend");
            const colorConfig = data.find(item => item.name?.toLowerCase() === "weekend_highlight_color");
            
            // NEW CONFIG FETCH
            const maxHoursConfig = data.find(item => item.name?.toLowerCase() === "max_daily_hours");
            const hardEditConfig = data.find(item => item.name?.toLowerCase() === "hard_edit");
            
            if (periodConfig) setPeriodType(periodConfig.value);
            if (weekendConfig && weekendConfig.value) {
                const days = weekendConfig.value.split(',').map(d => d.trim().toLowerCase());
                setConfigWeekends(days);
            }
            if (colorConfig) setConfigHighlightColor(colorConfig.value);
            
            if (maxHoursConfig && maxHoursConfig.value) setMaxDailyHours(parseFloat(maxHoursConfig.value) || 24);
            if (hardEditConfig && hardEditConfig.value) setHardEdit(String(hardEditConfig.value).toLowerCase() === "true");
            
        } catch (error) {
            console.error("Config fetch error:", error);
            setPeriodType("Weekly");
            setConfigWeekends(["saturday", "sunday"]);
            setConfigHighlightColor("#e5e7eb"); 
            setMaxDailyHours(24);
            setHardEdit(false);
        }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (timePeriods.length > 0 && !isEditMode) {
      const today = new Date();
      const utcToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
      const currentIdx = timePeriods.findIndex(p => {
        if(!p.dates || p.dates.length === 0) return false;
        const start = parseDateString(p.dates[0], 2025);
        const end = parseDateString(p.dates[p.dates.length-1], 2025);
        return utcToday >= start && utcToday <= end;
      });
      if(currentIdx !== -1) setSelectedPeriod(timePeriods[currentIdx]);
      else setSelectedPeriod(timePeriods[0]);
    }
  }, [timePeriods, isEditMode]);

  useEffect(() => {
    if (isEditMode && (!purchaseOrderData || purchaseOrderData.length === 0)) return;
    try {
      if (isEditMode && timesheetToEdit) {
        const editDateStr = formatDateForComparison(timesheetToEdit?.timesheet_Date);
        const matchingPeriod = timePeriods.find((period) => getWeekEndDateFromPeriod(period) === editDateStr);
        if (matchingPeriod) setSelectedPeriod(matchingPeriod);

        const hoursData = {};
        const hourIdsData = {};
        const datesInPeriod = matchingPeriod ? matchingPeriod.dates : [];
        
        // FIX for Unexpected Token Error: Check for timesheetHours existence explicitly before calling forEach
        const timesheetHours = timesheetToEdit?.timesheetHours;
        if (timesheetHours) {
            timesheetHours.forEach((hourEntry) => {
                if (hourEntry && hourEntry.ts_Date) {
                    const d = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
                    const numericFmt = new Intl.DateTimeFormat("en-US", { month: "2-digit", day: "2-digit", timeZone: "UTC" }).format(d);
                    const textFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "2-digit", timeZone: "UTC" }).format(d);
                    
                    const dateIndex = datesInPeriod.findIndex((dp) => dp === numericFmt || dp === textFmt);
                    
                    if (dateIndex !== -1) {
                        hoursData[dateIndex] = hourEntry.hours;
                        hourIdsData[dateIndex] = hourEntry.id;
                    }
                }
            });
        }
        // END FIX

        if (matchingPeriod) {
            for(var i=0; i<matchingPeriod.dates.length; i++) { 
                if(hoursData[i] === undefined) hoursData[i] = "";
            }
        }

        let fullWorkOrderString = "";
        const poEntry = purchaseOrderData.find((po) => po.project?.includes(timesheetToEdit.projId));
        if (poEntry) {
          const projectIndex = poEntry.project.indexOf(timesheetToEdit.projId);
          if (projectIndex > -1) {
            // FIX: Ensure the format matches the selected value in handleSelectChange
            fullWorkOrderString = `${poEntry.wa_Code}:::${poEntry.resourceDesc[projectIndex]}`;
          }
        }

        const initialLine = {
          id: timesheetToEdit?.id,
          description: timesheetToEdit?.description || "",
          project: timesheetToEdit?.projId || "",
          plc: timesheetToEdit?.plc || "",
          payType: timesheetToEdit?.payType || "SR",
          workOrder: fullWorkOrderString, // THIS IS THE KEY TO PERSISTENCE
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
        setLines([createEmptyLine(1, selectedPeriod.dates?.length || 7)]);
      }
    } catch (error) {
      console.error(error);
      onClose();
    }
  }, [isEditMode, timesheetToEdit, purchaseOrderData, onClose, timePeriods]);

  useEffect(() => {
    if (!resourceId) { setIsLoading(false); return; }
    const fetchPurchaseOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}/api/PurchaseOrders/ByResourceDetails/${resourceId}`);
        if (!response.ok) throw new Error("Error");
        const data = await response.json();
        setPurchaseOrderData(Array.isArray(data) ? data : []);
      } catch (error) { setPurchaseOrderData([]); } finally { setIsLoading(false); }
    };
    fetchPurchaseOrders();
  }, [resourceId]);

  useEffect(() => {
    if (!resourceId) return;
    const fetchRemainingHours = async () => {
      setIsLoadingRemainingHours(true);
      try {
        const response = await fetch(`${backendUrl}/api/SubkTimesheet/GetRemainingPoHours?resourceId=${resourceId}`);
        const data = await response.json();
        const hoursMap = {};
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.poLineNumber) hoursMap[item.poLineNumber] = parseFloat(item.remainingHours) || 0;
          });
        }
        setRemainingPoHours(hoursMap);
      } catch (error) { } finally { setIsLoadingRemainingHours(false); }
    };
    fetchRemainingHours();
  }, [resourceId]);

  useEffect(() => {
    if (isEditMode) { setIsPeriodInvalid(false); return; }
    const weekEndDate = getWeekEndDateFromPeriod(selectedPeriod);
    if (weekEndDate && existingTimesheetDates.includes(weekEndDate)) setIsPeriodInvalid(true);
    else setIsPeriodInvalid(false);
  }, [selectedPeriod, existingTimesheetDates, isEditMode]);

  useEffect(() => {
      if(!isEditMode && selectedPeriod.dates) {
          setLines(prevLines => prevLines.map(line => {
              const newHours = {};
              for(let i=0; i<selectedPeriod.dates.length; i++) newHours[i] = line.hours[i] || "";
              return { ...line, hours: newHours };
          }));
      }
  }, [selectedPeriod, isEditMode]);

//   const handleSelectChange = (id, fieldName, value) => {
//     setLines((currentLines) =>
//       currentLines.map((line) => {
//         if (line.id === id) {
//           const updatedLine = { ...line, [fieldName]: value };
//           if (fieldName === "workOrder") {
//             if (!value) {
//               // FIX 2: Ensure all derived fields are cleared only when Work Order is explicitly cleared
//               updatedLine.description = ""; updatedLine.project = ""; updatedLine.plc = "";
//               updatedLine.poNumber = ""; updatedLine.rlseNumber = ""; updatedLine.poLineNumber = "";
//               updatedLine.wa_Code = ""; updatedLine.pmUserID = "";
//               return updatedLine;
//             }
//             // Use safe separator :::
//             const parts = value.split(":::");
//             const waCode = parts[0];
//             // Correctly re-join description parts if they contained the separator
//             const desc = parts.slice(1).join(":::"); 

//             // Find the corresponding PO data entry
//             const selectedPOEntry = purchaseOrderData.find((item) => {
//                 if (item.wa_Code !== waCode) return false;
//                 const descIndex = item.resourceDesc.findIndex(d => d === desc || d.trim() === desc.trim());
//                 return descIndex > -1;
//             });

//             if (selectedPOEntry) {
//               updatedLine.wa_Code = selectedPOEntry.wa_Code;
//               updatedLine.pmUserID = selectedPOEntry.pmUserId || "";
//               
//               const descIndex = selectedPOEntry.resourceDesc.findIndex(d => d === desc || d.trim() === desc.trim());
//               
//               // FIX: Ensure fields are correctly mapped using the found index
//               if (descIndex > -1) {
//                 updatedLine.description = selectedPOEntry.resourceDesc[descIndex] || "";
//                 updatedLine.project = selectedPOEntry.project[descIndex] || "";
//                 updatedLine.plc = selectedPOEntry.plcCd[descIndex] || "";
//                 updatedLine.poNumber = selectedPOEntry.purchaseOrder[0] || "";
//                 updatedLine.rlseNumber = selectedPOEntry.purchaseOrderRelease[0] || "";
//                 updatedLine.poLineNumber = selectedPOEntry.poLineNumber[descIndex] || "";
//               } else {
//                 updatedLine.description = desc;
//                 // Clear derived fields if description index is missing/failed lookup
//                 updatedLine.project = ""; updatedLine.plc = "";
//                 updatedLine.poNumber = ""; updatedLine.rlseNumber = ""; updatedLine.poLineNumber = "";
//               }
//             } else {
//                 // If not found, clear all derived fields except the selected description and waCode
//                 updatedLine.description = desc; 
//                 updatedLine.project = ""; updatedLine.plc = "";
//                 updatedLine.poNumber = ""; updatedLine.rlseNumber = ""; updatedLine.poLineNumber = "";
//                 updatedLine.wa_Code = waCode; updatedLine.pmUserID = "";
//             }
//           }
//           return updatedLine;
//         }
//         return line;
//       })
//     );
//   };

  // --- IMMEDIATE VALIDATION LOGIC ---
  
const handleSelectChange = (id, fieldName, value) => {
    setLines((currentLines) =>
        currentLines.map((line) => {
            if (line.id === id) {
                const updatedLine = { ...line, [fieldName]: value };
                
                if (fieldName === "workOrder") {
                    if (!value) {
                        // Clear all derived fields if Work Order is cleared
                        updatedLine.description = ""; updatedLine.project = ""; updatedLine.plc = "";
                        updatedLine.poNumber = ""; updatedLine.rlseNumber = ""; updatedLine.poLineNumber = "";
                        updatedLine.wa_Code = ""; updatedLine.pmUserID = "";
                        return updatedLine;
                    }

                    // 1. Robustly parse the value using the safe separator ':::'
                    const parts = value.split(":::");
                    const waCode = parts[0];
                    // The rest is the description, correctly re-joined in case it contained ':::'
                    const desc = parts.slice(1).join(":::"); 
                    
                    let selectedPOEntry = null;
                    let descIndex = -1;

                    // 2. Use explicit loop to find the exact PO data entry and the correct index
                    for (const item of purchaseOrderData) {
                        if (item.wa_Code === waCode) {
                            // Find the precise index of the description within this PO entry
                            const foundIndex = item.resourceDesc.findIndex(d => d === desc);
                            if (foundIndex > -1) {
                                selectedPOEntry = item;
                                descIndex = foundIndex;
                                break; // Found the match, stop searching
                            }
                        }
                    }

                    if (selectedPOEntry) {
                        // 3. Map all derived fields using the discovered PO entry and index
                        updatedLine.wa_Code = selectedPOEntry.wa_Code;
                        updatedLine.pmUserID = selectedPOEntry.pmUserId || "";
                        updatedLine.description = selectedPOEntry.resourceDesc[descIndex] || "";
                        updatedLine.project = selectedPOEntry.project[descIndex] || "";
                        updatedLine.plc = selectedPOEntry.plcCd[descIndex] || "";
                        
                        // PO/RLSE numbers are usually at index 0 for the parent PO entry
                        updatedLine.poNumber = selectedPOEntry.purchaseOrder[0] || ""; 
                        updatedLine.rlseNumber = selectedPOEntry.purchaseOrderRelease[0] || "";
                        
                        // The critical PO Line Number must use the correct index
                        updatedLine.poLineNumber = selectedPOEntry.poLineNumber[descIndex] || "";
                    } else {
                        // 4. If no match is found (shouldn't happen if workOrderOptions is correct), clear the associated details
                        console.warn(`Could not find matching PO details for value: ${value}`);
                        updatedLine.description = desc; // Keep the selected description for context
                        updatedLine.project = ""; updatedLine.plc = "";
                        updatedLine.poNumber = ""; updatedLine.rlseNumber = ""; updatedLine.poLineNumber = "";
                        updatedLine.wa_Code = waCode; updatedLine.pmUserID = "";
                    }
                }
                return updatedLine;
            }
            return line;
        })
    );
};


const handleHourChange = (id, dayIndex, value) => {
    const cellKey = `${id}-${dayIndex}`;
    const currentLine = lines.find((line) => line.id === id);
    
    // Helper function to update hours and clear the highlight/toast
    const updateHoursAndClearHighlight = (newValue) => {
        // FIX 1: Explicitly remove highlight when the cell is cleared or becomes valid
        setMaxHoursExceededCells(prev => { 
            const next = new Set(prev); 
            // Check the daily total after the update (simulated) to ensure we clear if the day is fine now
            const newDailyTotal = lines
                .filter(line => line.id !== id) // Other lines
                .reduce((sum, line) => sum + (parseFloat(line.hours[dayIndex]) || 0), 0) + 
                (parseFloat(newValue) || 0);
                
            if (newDailyTotal <= maxDailyHours) {
                next.delete(cellKey); 
            }
            return next; 
        });
        setLines((currentLines) =>
            currentLines.map((line) =>
            line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: newValue } } : line
            )
        );
        setModifiedHours((prev) => new Set(prev).add(cellKey));
    };

    if (value === "") {
        // FIX 1: When clearing the cell, also clear the highlight and update hours to ""
        updateHoursAndClearHighlight("");
        return;
    }

    const numValue = parseFloat(value);
    let isValid = true;
    let toastMessage = "";
    let exceedsPoRemaining = false;
    let exceedsMaxDailyHours = false;

    // 1. Base validations (Only check 0.5 increments and positive numbers)
    if (isNaN(numValue) || numValue < 0) {
        isValid = false;
        toastMessage = "Hours must be a positive number.";
    } else if (numValue % 0.5 !== 0) {
        isValid = false;
        toastMessage = "Hours must be in 0.5 increments.";
    } else {
        // 2. PO Remaining Hours Check (CONDITIONAL on hardEdit) - PRIORITY CHECK
        
        if (currentLine && currentLine.poLineNumber) {
            const poLineNumber = currentLine.poLineNumber;
            const remainingHours = remainingPoHours[poLineNumber];
            
            if (remainingHours !== undefined) {
                // Calculate newTotalForPO: Sum all hours for this PO Line, 
                // replacing the old hours for the current cell with the new numValue.
                const newTotalForPO = lines
                    .filter((line) => line.poLineNumber === poLineNumber)
                    .reduce((total, line) => {
                        return total + Object.keys(line.hours).reduce((lineSum, index) => {
                            const hourValue = parseFloat(line.hours[index]) || 0;
                            // Check if this is the *current* cell being updated
                            if (line.id === id && String(index) === String(dayIndex)) {
                                return lineSum + numValue; // Add the new value
                            }
                            return lineSum + hourValue; // Add existing values
                        }, 0);
                    }, 0);

                if (newTotalForPO > remainingHours) {
                    exceedsPoRemaining = true;
                    
                    // Hard Edit Logic: Block if hardEdit is false, Warn if hardEdit is true
                    if (!hardEdit) {
                        isValid = false; // Block entry (Hard Stop)
                        toastMessage = `Cannot exceed remaining PO hours (${remainingHours.toFixed(2)} available for PO Line ${poLineNumber}).`;
                    } else {
                        // Hard Edit is true, allow entry but set PO warning
                        toastMessage = `PO Limit Exceeded: ${remainingHours.toFixed(2)} hours available for PO Line ${poLineNumber}.`;
                    }
                }
            }
        }

        // 3. Max Daily Hours Check (DYNAMIC) - If not blocked by step 1 or 2
        if (isValid) {
            // Recalculate column total based on current state + new input
            const otherLinesTotal = lines
                .filter((line) => line.id !== id)
                .reduce((sum, line) => sum + (parseFloat(line.hours[dayIndex]) || 0), 0);
            
            // The `lines` state still holds the old value for the current cell, so calculate new total
            const newColumnTotal = otherLinesTotal + numValue;

            if (newColumnTotal > maxDailyHours) {
                exceedsMaxDailyHours = true;
                // Hard Block if Max Daily Hours is exceeded
                isValid = false;
                const maxDailyError = `Daily total (${newColumnTotal.toFixed(1)} hrs) exceeds the maximum limit of ${maxDailyHours} hours.`;
                
                // Set the overall toast message to the hard error, 
                // appending previous PO warning if it existed and was overridden by the Max Daily check.
                toastMessage = exceedsPoRemaining ? `${toastMessage} | ${maxDailyError}` : maxDailyError;
                
                // We also need to flag the cell itself as exceeded
                setMaxHoursExceededCells(prev => new Set(prev).add(cellKey));
            } else if (exceedsPoRemaining) {
                // If Max Daily was fine, but PO was exceeded (and hardEdit is true), keep the PO warning.
                // toastMessage is already set in step 2.
                
                // Also make sure highlight is cleared if it existed before this change
                setMaxHoursExceededCells(prev => { const next = new Set(prev); next.delete(cellKey); return next; });
            } else {
                // No violation: Ensure highlight is cleared if it existed.
                setMaxHoursExceededCells(prev => { const next = new Set(prev); next.delete(cellKey); return next; });
            }
        }
    }

    // Apply changes or revert
    if (isValid) {
        // Value is valid to be set in state
        updateHoursAndClearHighlight(numValue);
        
        // Show toast if any warning/issue occurred and the input was allowed (hardEdit was true/PO exceeded/etc.)
        if (toastMessage) {
            // Show warning for 3 seconds
            showToast(toastMessage, "warning", 3000); 
        }

    } else {
        // Input blocked (Max Daily exceeded, hardEdit false PO limit exceeded, or base validation failure)
        
        // Revert to the old value
//         setLines((currentLines) =>
//             currentLines.map((line) =>
//             line.id === id ? { ...line, hours: { ...line.hours, [dayIndex]: currentLine.hours[dayIndex] } } : line
//             )
//         );
         setLines((currentLines) => currentLines.map((line) => line.id === id ? currentLine : line));
        
        // If the error was NOT due to exceeding maxDaily, make sure to clear highlight
        if (!exceedsMaxDailyHours) {
            setMaxHoursExceededCells(prev => { const next = new Set(prev); next.delete(cellKey); return next; });
        }

        // Show error for 3 seconds
        showToast(toastMessage, "error", 3000); 
    }
  };

  const getRemainingHoursForLine = (line) => {
    if (!line.poLineNumber) return null;
    const remaining = remainingPoHours[line.poLineNumber];
    if (remaining === undefined) return null;
    const usedHours = lines
      .filter((l) => l.poLineNumber === line.poLineNumber)
      .reduce((sum, l) => sum + Object.values(l.hours).reduce((daySum, h) => daySum + (parseFloat(h) || 0), 0), 0);
    return (remaining - usedHours).toFixed(2);
  };

  const addLine = () => setLines((prev) => [...prev, createEmptyLine(`temp-${Date.now()}`, selectedPeriod.dates.length)]);
  
  const handleSelectLine = (id) => {
    const newSelection = new Set(selectedLines);
    newSelection.has(id) ? newSelection.delete(id) : newSelection.add(id);
    setSelectedLines(newSelection);
  };
  
  const deleteLines = () => {
    if (selectedLines.size === 0) { showToast("Please select lines to delete.", "warning"); return; }
    // IMPORTANT: Also clear highlights for deleted lines
    setMaxHoursExceededCells(prev => {
      const next = new Set(prev);
      lines.forEach(line => {
        if (selectedLines.has(line.id)) {
          for (let i = 0; i < selectedPeriod.dates.length; i++) {
            next.delete(`${line.id}-${i}`);
          }
        }
      });
      return next;
    });
    
    setLines(lines.filter((line) => !selectedLines.has(line.id)));
    setSelectedLines(new Set());
  };

  const dailyTotals = useMemo(() => {
    if (!selectedPeriod.dates) return {};
    const totals = {};
    selectedPeriod.dates.forEach((_, index) => { totals[index] = 0; });
    lines.forEach((line) => {
      Object.keys(line.hours).forEach((index) => {
        totals[index] = (totals[index] || 0) + (parseFloat(line.hours[index]) || 0);
      });
    });
    return totals;
  }, [lines, selectedPeriod]);

  const copyLines = () => {
    if (selectedLines.size === 0) { showToast("Please select lines to copy.", "warning"); return; }
    if (isPeriodInvalid) { showToast("Cannot copy. The selected period already has a timesheet.", "error"); return; }
    const linesToCopy = lines.filter((line) => selectedLines.has(line.id));
    const potentialTotals = { ...dailyTotals };
    let validationFailed = false;
    
    linesToCopy.forEach((lineToCopy) => {
        Object.keys(lineToCopy.hours).forEach((index) => {
            potentialTotals[index] = (potentialTotals[index] || 0) + (parseFloat(lineToCopy.hours[index]) || 0);
            // Using maxDailyHours for copy validation
            if (potentialTotals[index] > maxDailyHours) validationFailed = true; 
        });
    });

    if (validationFailed) { showToast(`Cannot copy, as it would cause a daily total to exceed the max limit of ${maxDailyHours} hours.`, "error"); return; }
    showToast("Line(s) copied.", "info");
    const newLines = linesToCopy.map((line, index) => ({
      ...line, hours: { ...line.hours }, id: `temp-${Date.now()}-${index}`, hourIds: {},
    }));
    setLines((prev) => [...prev, ...newLines]);
    setSelectedLines(new Set());
  };

  const grandTotal = Object.values(dailyTotals).reduce((sum, total) => sum + total, 0);

  const toggleColumnVisibility = (columnName) => {
    setHiddenColumns((prev) => ({ ...prev, [columnName]: !prev[columnName] }));
  };

  const showAllHiddenColumns = () => {
    const allVisible = {};
    Object.keys(hiddenColumns).forEach((col) => { allVisible[col] = false; });
    setHiddenColumns(allVisible);
  };

  const handleSubmit = async () => {
    if (isPeriodInvalid) { showToast("The selected period already has a timesheet.", "warning"); return; }
    if (grandTotal === 0) { showToast("Cannot submit a timesheet with zero hours.", "warning"); return; }
    
    // Check for any cells that exceeded the Max Daily Hours (prevent submission if hard-highlighted)
    if (maxHoursExceededCells.size > 0) {
      showToast(`Cannot submit. Please review and correct the ${maxHoursExceededCells.size} highlighted cell(s) exceeding the maximum daily hours (${maxDailyHours}).`, "error");
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
      const now = new Date().toISOString();
      const endDateObj = parseDateString(selectedPeriod.dates[selectedPeriod.dates.length - 1], 2025);
      const weekEndDateAsISO = endDateObj.toISOString().split("T")[0];

      for (const line of lines) {
        const lineHoursTotal = parseFloat(Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2));
        if (!isEditMode && lineHoursTotal === 0) continue;

        const method = isEditMode ? "PUT" : "POST";
        const url = isEditMode ? `${API_URL}/${line.id}` : API_URL;

        const timesheetHours = selectedPeriod.dates.map((dateStr, index) => {
          const dateObj = parseDateString(dateStr, 2025);
          const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getUTCDate()).padStart(2, '0');
          const dateForApi = `2025-${month}-${day}`;
          
          return {
            Id: isEditMode ? line.hourIds[index] || 0 : 0,
            Ts_Date: dateForApi,
            Hours: line.hours[index] || 0,
            dayIndex: index,
          };
        }).filter((hourEntry) => {
            if (isEditMode) return modifiedHours.has(`${line.id}-${hourEntry.dayIndex}`);
            return hourEntry.Hours > 0;
        }).map(({ dayIndex, ...rest }) => rest);

        const payload = {
          Id: isEditMode ? line.id : 0, Description: line.description, ProjId: line.project, Plc: line.plc,
          WorkOrder: line.wa_Code, pm_User_Id: line.pmUserID, PayType: line.payType, PoNumber: line.poNumber,
          RlseNumber: line.rlseNumber || "0", Resource_Id: String(resourceId),
          PoLineNumber: parseInt(line.poLineNumber, 10) || 0, Timesheet_Date: weekEndDateAsISO,
          UpdatedAt: now, UpdatedBy: String(resourceId), TimesheetHours: timesheetHours,
          Hours: lineHoursTotal, Status: "OPEN", ApprovalStatus: "PENDING",
        };

        if (!isEditMode) { payload.CreatedAt = now; payload.CreatedBy = String(resourceId); }

        const response = await fetch(url, { method: method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) { const errorText = await response.text(); throw new Error(`Submission failed: ${errorText}`); }
      }
      showToast(`Timesheet ${isEditMode ? "updated" : "created"} successfully!`, "success");
      setModifiedHours(new Set());
      onClose(weekEndDateAsISO);
    } catch (error) { showToast(error.message, "error"); setIsSubmitting(false); }
  };

  const workOrderOptions = useMemo(() => {
    if (!purchaseOrderData) return [];
    const uniqueOptions = new Map();
    purchaseOrderData.forEach((item) => {
      item.resourceDesc.forEach((desc, index) => {
        // Use safe separator ::: for internal value, regular dash for display
        const value = `${item.wa_Code}:::${desc}`;
        const label = `${item.wa_Code} - ${desc}`;
        
        // Only add if the PO line number exists
        if (item.poLineNumber && item.poLineNumber[index]) {
          uniqueOptions.set(value, { value, label: label });
        }
      });
    });
    return Array.from(uniqueOptions.values());
  }, [purchaseOrderData]);

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

const today = useMemo(() => {
    const d = new Date();
    // Get the current UTC date components
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const date = d.getUTCDate();
    
    // Create a new Date object representing the start of the current UTC calendar day
    return new Date(Date.UTC(year, month, date));
}, []);

  // Only show PO Remaining Hours column if isAdmin is true AND it's not hidden
  const availableHideableColumns = hideableColumns.filter(col => col === "PO Remaining Hours" ? isAdmin : true);

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 md:p-8 w-full max-w-[95vw]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{isEditMode ? "View / Edit Timesheet" : "Create Timesheet"}</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-col">
                <label htmlFor="period-select" className="text-xs font-medium text-gray-500 mb-0.5">Select Period</label>
                <select id="period-select" value={selectedPeriod?.label || ""} onChange={(e) => { const newPeriod = timePeriods.find((p) => p.label === e.target.value); if (newPeriod) setSelectedPeriod(newPeriod); }} className="bg-white p-1.5 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm min-w-[200px]" disabled={isEditMode}>
                    {timePeriods.map((period) => (<option key={period.label} value={period.label}>{period.label}</option>))}
                </select>
            </div>
            {isPeriodInvalid && <p className="text-xs text-red-600 font-semibold mt-1">A timesheet for this period already exists.</p>}
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <ActionButton onClick={addLine} variant="primary" icon={<PlusIcon />} disabled={isPeriodInvalid}>Add Line</ActionButton>
            <ActionButton onClick={copyLines} icon={<CopyIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Copy</ActionButton>
            <ActionButton onClick={deleteLines} icon={<TrashIcon />} disabled={isPeriodInvalid || selectedLines.size === 0}>Delete</ActionButton>
          </div>
        </div>
      </div>

      {(() => {
        const hiddenCount = Object.entries(hiddenColumns).filter(([key, val]) => val && (key === "PO Remaining Hours" ? isAdmin : true)).length;
        const hiddenColumnsList = Object.entries(hiddenColumns).filter(([col, isHidden]) => isHidden && (col === "PO Remaining Hours" ? isAdmin : true)).map(([col]) => col);
        return hiddenCount > 0 ? (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap mb-4">
            <div className="flex items-center gap-2"><EyeIcon className="h-4 w-4 text-blue-600" /><span className="text-sm font-medium text-gray-700">{hiddenCount} column{hiddenCount > 1 ? "s" : ""} hidden:</span></div>
            <div className="flex gap-2 flex-wrap">
              {hiddenColumnsList.map((col) => (
                <button key={col} onClick={() => toggleColumnVisibility(col)} className="inline-flex items-center px-2.5 py-1 bg-white hover:bg-blue-100 border border-blue-300 rounded-full text-xs font-medium text-blue-700 transition-colors shadow-sm cursor-pointer">{col}</button>
              ))}
              <button onClick={showAllHiddenColumns} className="inline-flex items-center px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer">Show All</button>
            </div>
          </div>
        ) : null;
      })()}

      <div className="overflow-x-auto rounded-lg border border-gray-200/80 shadow-sm">
        <table className="w-full text-sm min-w-[1600px]">
          <thead className="bg-slate-100/70 border-b border-gray-200/80">
            <tr>
              <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap"></th>
              <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Line</th>
              {availableHideableColumns.map((col) => !hiddenColumns[col] && (
                <th key={col} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">
                  <div className="flex items-center justify-between gap-2 group">
                    <span>{col}</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleColumnVisibility(col); }} className="p-1 hover:bg-gray-200 rounded-full transition-colors opacity-0 group-hover:opacity-100" title="Hide column" type="button">
                      <MinusCircleIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </th>
              ))}
              {selectedPeriod.dates && selectedPeriod.dates.map((date) => (
                <th key={date} className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap min-w-[80px]">{date}</th>
              ))}
              <th className="p-3 text-left font-semibold text-gray-600 whitespace-nowrap">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200/80 bg-white/50">
            {lines.map((line, index) => {
              const rowTotal = Object.values(line.hours).reduce((s, h) => s + (parseFloat(h) || 0), 0).toFixed(2);
              return (
                <tr key={line.id} className="hover:bg-slate-50/50">
                  <td className="p-2 text-center">
                    <input type="checkbox" className="rounded border-gray-300" checked={selectedLines.has(line.id)} onChange={() => handleSelectLine(line.id)} disabled={isPeriodInvalid} />
                  </td>
                  <td className="p-3 text-center text-gray-500">{index + 1}</td>
                  {!hiddenColumns["Work Order"] && (
                    <td className="p-2 min-w-[250px]"><CascadingSelect label="Work Order" options={workOrderOptions} value={line.workOrder} onChange={(e) => handleSelectChange(line.id, "workOrder", e.target.value)} disabled={isPeriodInvalid} /></td>
                  )}
                  {!hiddenColumns["Description"] && (
                    <td className="p-2 min-w-[200px]"><input type="text" value={line.description} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {!hiddenColumns["Project"] && (
                    <td className="p-2 min-w-[150px]"><input type="text" value={line.project} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {!hiddenColumns["PLC"] && (
                    <td className="p-2 min-w-[120px]"><input type="text" value={line.plc} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {!hiddenColumns["Pay Type"] && (
                    <td className="p-2 min-w-[120px]">
                        {/* MODIFIED: Restricted Pay Type Options */}
                        <select value={line.payType} onChange={(e) => handleSelectChange(line.id, "payType", e.target.value)} className={`w-full bg-white p-1.5 border border-gray-200 rounded-md ${isPeriodInvalid ? "bg-gray-100 cursor-not-allowed" : ""}`} disabled={isPeriodInvalid}>
                            <option value="SR">Regular</option>
                            <option value="SO">Overtime</option>
                        </select>
                    </td>
                  )}
                  {!hiddenColumns["PO Number"] && (
                    <td className="p-2 min-w-[150px]"><input type="text" value={line.poNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {!hiddenColumns["RLSE Number"] && (
                    <td className="p-2 min-w-[120px]"><input type="text" value={line.rlseNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {!hiddenColumns["PO Line Number"] && (
                    <td className="p-2 min-w-[120px]"><input type="text" value={line.poLineNumber} className="w-full bg-gray-100 p-1.5 border border-gray-200 rounded-md text-gray-600" readOnly /></td>
                  )}
                  {isAdmin && !hiddenColumns["PO Remaining Hours"] && (
                    <td className="p-2 min-w-[120px]">
                      {line.poLineNumber && remainingPoHours[line.poLineNumber] !== undefined ? (
                        <div className="text-xs font-medium text-center"><span className={`font-semibold ${parseFloat(getRemainingHoursForLine(line)) < 0 ? "text-red-600" : "text-green-600"}`}>{getRemainingHoursForLine(line)} hrs</span></div>
                      ) : ( <div className="text-xs font-medium text-center text-gray-400">-</div> )}
                    </td>
                  )}
                  {selectedPeriod.dates && selectedPeriod.dates.map((dateString, dayIndex) => {
                    const d = parseDateString(dateString, 2025);
                    
                    // Day Name Fix for Weekends
                    const daysMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
                    const dayName = daysMap[d.getUTCDay()];
                    const isWeekend = configWeekends.includes(dayName);
                    
                    const columnDate = d;
                    const isFutureDate = columnDate.getTime() > today.getTime();

                    const isDisabled = isPeriodInvalid || isFutureDate;
                    
                    // Check if this specific cell key is flagged for exceeding Max Daily Hours
                    const cellKey = `${line.id}-${dayIndex}`;
                    const isExceeded = maxHoursExceededCells.has(cellKey);

                    // Determine background style
                    let backgroundStyle = {};
                    let backgroundClass = "bg-white";

                    if (isExceeded) {
                        // Highlight red for Max Daily Hours violation
                        backgroundStyle = { backgroundColor: '#fcd3d3' }; // A light red for highlighting
                        backgroundClass = "";
                    } else if (isWeekend && configHighlightColor) {
                        // Highlight weekend using configured color
                        backgroundStyle = { backgroundColor: configHighlightColor };
                        backgroundClass = "";
                    } else if (isWeekend) {
                        // Fallback highlight for weekend if no color configured
                        backgroundClass = "bg-gray-100";
                    }

                    return (
                      <td key={dayIndex} className="p-2">
                        <input type="number" step="0.5" value={line.hours[dayIndex] || ""}
                          onChange={(e) => handleHourChange(line.id, dayIndex, e.target.value)}
                          style={backgroundStyle}
                          className={`w-20 text-right p-1.5 border border-gray-200 rounded-md shadow-sm ${backgroundClass} ${isDisabled ? "cursor-not-allowed" : ""} ${isExceeded ? "border-red-600 ring-2 ring-red-300" : ""}`}
                          disabled={isDisabled}
                        />
                      </td>
                    );
                  })}
                  <td className="p-3 text-right font-semibold text-gray-800 pr-4">{rowTotal}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-slate-200/80 font-semibold">
            <tr className="border-t-2 border-gray-300">
              <td colSpan={2 + availableHideableColumns.filter((col) => !hiddenColumns[col]).length} className="p-3 text-right text-gray-800">Total Hours</td>
              {selectedPeriod.dates && selectedPeriod.dates.map((dateString, index) => {
                  // Check if the column total is flagged for highlighting
                  const dayTotal = dailyTotals[index] || 0;
                  const isDayExceeded = dayTotal > maxDailyHours;
                  
                  // Highlight the total row text if the daily limit is exceeded
                  const isColumnHighlighted = isDayExceeded;

                  return (
                    <td key={index} className="p-2 text-center">
                      <div className={`w-20 p-1.5 ${isColumnHighlighted ? "text-red-700 font-bold" : "text-gray-800"}`}>
                        {dayTotal.toFixed(2)}
                      </div>
                    </td>
                 )
              })}
              <td className="p-3 text-right font-bold text-blue-700 pr-4">{grandTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <ActionButton onClick={() => onClose()} variant="secondary">Cancel</ActionButton>
        <ActionButton onClick={handleSubmit} variant="primary" disabled={isPeriodInvalid || isSubmitting || lines.length === 0 || maxHoursExceededCells.size > 0}>{isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Save"}</ActionButton>
      </div>
    </div>
  );
}
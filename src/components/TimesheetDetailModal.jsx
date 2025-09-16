
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


import { useState, useEffect } from "react";
import "./datepicker.css";

const TimesheetDetailModal = ({ timesheetData, onClose }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API when component mounts
  useEffect(() => {
    if (timesheetData) {
      fetchTimesheetData();
    }
  }, [timesheetData]);

  const fetchTimesheetData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://timesheet-subk.onrender.com/api/SubkTimesheet');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      setApiData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
      setApiData([]);
    } finally {
      setLoading(false);
    }
  };

  if (!timesheetData) return null;

  // Get the selected line data based on the lineNo from timesheetData
  const getSelectedLineData = () => {
    if (loading || error || apiData.length === 0) return null;

    // Get lineNo from the passed timesheet data
    const selectedLineNo = timesheetData.lineNo || 
                          timesheetData.id || 
                          timesheetData["Employee ID"];
    
    console.log('Looking for lineNo:', selectedLineNo);
    console.log('Available lines:', apiData.map(item => item.lineNo || item.timesheetId || item.id));

    // Find the line that matches the selected line number
    const selectedLine = apiData.find(item => 
      (item.lineNo && item.lineNo.toString() === selectedLineNo.toString()) ||
      (item.timesheetId && item.timesheetId.toString() === selectedLineNo.toString()) ||
      (item.id && item.id.toString() === selectedLineNo.toString())
    );
    
    if (!selectedLine) {
      console.log('No matching line found for:', selectedLineNo);
      return null;
    }

    console.log('Found selected line:', selectedLine);
    return selectedLine;
  };

  // Get timesheet hours for the selected line
  const getTimesheetHours = () => {
    const selectedLine = getSelectedLineData();
    
    if (!selectedLine || !selectedLine.timesheetHours) {
      return [];
    }

    // Sort by date to ensure proper order
    return selectedLine.timesheetHours.sort((a, b) => new Date(a.ts_Date) - new Date(b.ts_Date));
  };

  // Format date for display (only MM/DD without day name)
  const formatDateHeader = (dateString) => {
    if (!dateString) return '';
    
    try {
      // Parse date parts to avoid timezone conversion
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        const month = String(parseInt(dateParts[1])).padStart(2, '0');
        const day = String(parseInt(dateParts[2])).padStart(2, '0');
        return `${month}/${day}`;
      }
      return dateString;
    } catch {
      return dateString;
    }
  };

  // Calculate total hours for the selected line
  const calculateTotalHours = () => {
    const timesheetHours = getTimesheetHours();
    return timesheetHours.reduce((total, entry) => {
      return total + (parseFloat(entry.hours) || 0);
    }, 0).toFixed(2);
  };

  // Get unique dates for header columns
  const getWeekDates = () => {
    const timesheetHours = getTimesheetHours();
    if (timesheetHours.length === 0) return [];
    
    const dates = [...new Set(timesheetHours.map(entry => entry.ts_Date))].sort();
    return dates;
  };

  // Create data structure for table display
  const getTableData = () => {
    const selectedLine = getSelectedLineData();
    const timesheetHours = getTimesheetHours();
    const weekDates = getWeekDates();

    if (!selectedLine || timesheetHours.length === 0) {
      return { lineData: {}, weekDates: [], selectedLine: null };
    }

    // Create a map of date -> hours for easy lookup
    const dateHoursMap = {};
    timesheetHours.forEach(entry => {
      dateHoursMap[entry.ts_Date] = parseFloat(entry.hours) || 0;
    });

    return { 
      lineData: dateHoursMap, 
      weekDates, 
      selectedLine 
    };
  };

  const { lineData, weekDates, selectedLine } = getTableData();
  const totalHours = calculateTotalHours();

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-gray-600">Loading timesheet data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden max-w-6xl">
      {/* Header - Simple title with close button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300 bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Timesheet Detail
        </h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 max-h-96 overflow-auto">
        {!selectedLine ? (
          <div className="text-center py-8 text-gray-500">
            No timesheet data found for the selected line
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-400 min-w-max">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-3 py-2 text-center font-medium text-gray-800 min-w-24">
                    Line Number
                  </th>
                  {weekDates.map((date, index) => (
                    <th key={index} className="border border-gray-400 px-3 py-2 text-center font-medium text-gray-800 min-w-20">
                      {formatDateHeader(date)}
                    </th>
                  ))}
                  <th className="border border-gray-400 px-3 py-2 text-center font-medium text-gray-800 min-w-16">
                    Total
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* Line Data Row */}
                <tr className="bg-white">
                  <td className="border border-gray-400 px-3 py-2 text-center font-medium">
                    Line {selectedLine.lineNo || selectedLine.timesheetId || selectedLine.id}
                  </td>
                  {weekDates.map((date, index) => (
                    <td key={index} className="border border-gray-400 px-3 py-2 text-center">
                      {lineData[date] || 0}
                    </td>
                  ))}
                  <td className="border border-gray-400 px-3 py-2 text-center font-medium text-blue-800">
                    {totalHours}
                  </td>
                </tr>

                {/* Regular Hours Row */}
                <tr className="bg-blue-100 font-medium">
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold">
                    Regular
                  </td>
                  {weekDates.map((date, index) => (
                    <td key={index} className="border border-gray-400 px-3 py-2 text-center font-medium">
                      {(lineData[date] || 0).toFixed(2)}
                    </td>
                  ))}
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold text-blue-800">
                    {totalHours}
                  </td>
                </tr>

                {/* Overtime Row */}
                <tr className="bg-yellow-100 font-medium">
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold">
                    Overtime
                  </td>
                  {weekDates.map((date, index) => (
                    <td key={index} className="border border-gray-400 px-3 py-2 text-center font-medium">
                      0.00
                    </td>
                  ))}
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold text-yellow-800">
                    0.00
                  </td>
                </tr>

                {/* Total Row */}
                <tr className="bg-green-200 font-bold">
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold">
                    Total
                  </td>
                  {weekDates.map((date, index) => (
                    <td key={index} className="border border-gray-400 px-3 py-2 text-center font-bold">
                      {(lineData[date] || 0).toFixed(2)}
                    </td>
                  ))}
                  <td className="border border-gray-400 px-3 py-2 text-center font-bold text-green-800">
                    {totalHours}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-4 border-t border-gray-300 bg-gray-100">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TimesheetDetailModal;

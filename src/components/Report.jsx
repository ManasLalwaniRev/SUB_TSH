import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';   
import { useNavigate } from "react-router-dom";
import { Receipt, Filter, Download, X, Eye, FileDown } from "lucide-react";
import { FileText } from "lucide-react";
import { backendUrl } from "./config";

// Toast notification utility
const showToast = (message, type = "info") => {
  const bgColor =
    type === "success"
      ? "#4ade80"
      : type === "error"
      ? "#ef4444"
      : type === "warning"
      ? "#f59e0b"
      : "#3b82f6";

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: ${bgColor};
    color: white;
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1000);
};

const Report = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState(new Set());
const [selectAll, setSelectAll] = useState(false);


  // filters that map to EmployeeHoursReportRequest
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [poNumber, setPoNumber] = useState("");

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // load user
  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        setUserLoaded(true);
      } catch (error) {
        console.error("Error parsing user info:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  // optional config load hook you already had
  useEffect(() => {
    if (userLoaded && currentUser) {
      if (typeof loadConfigValues === "function") {
        loadConfigValues();
      }
    }
  }, [userLoaded, currentUser]);

  const buildRequestBody = () => {
    // backend expects DateOnly? so send yyyy-MM-dd or null
    const toDateOrNull = (val) => (val ? val : null);

    return {
      startDate: toDateOrNull(startDate),
      endDate: toDateOrNull(endDate),
      vendorId: vendorId || null,
      resourceId: resourceId || null,
      poNumber: poNumber || null,
    };
  };

  const handleFetchReport = async () => {
    try {
      setLoading(true);

      const body = buildRequestBody();

      const res = await fetch(`${backendUrl}/api/Reports/employee-hours-report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`Failed to load report: ${res.status}`);
      }

      const data = await res.json();

      const safeData = Array.isArray(data) ? data : [];
      setRows(safeData);

      if (safeData.length > 0) {
        setColumns(Object.keys(safeData[0]));
      } else {
        setColumns([]);
      }

      if (safeData.length === 0) {
        showToast("No data available for selected filters", "warning");
      }
    } catch (e) {
      console.error(e);
      showToast(e.message || "Failed to load report", "error");
      setRows([]);
      setColumns([]);
    } finally {
      setLoading(false);
    }
  };

  const getRowKey = (row) =>
  `${row.employeeId || ""}|${row.vendorId || ""}|${row.projectId || ""}|${row.plc || ""}|${row.poNumber || ""}`;

const handleToggleEmployee = (row) => {
  const key = getRowKey(row);
  setSelectedEmployees((prev) => {
    const next = new Set(prev);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    // update header checkbox
    const allSelected =
      rows.length > 0 &&
      rows.every((r) => next.has(getRowKey(r)));
    setSelectAll(allSelected);
    return next;
  });
};

const handleToggleAll = () => {
  setSelectAll((prev) => {
    const nextValue = !prev;
    setSelectedEmployees(() => {
      if (!nextValue) return new Set();
      const all = new Set();
      rows.forEach((r) => all.add(getRowKey(r)));
      return all;
    });
    return nextValue;
  });
};


  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

const downloadExcel = (allRows) => {
  if (!allRows || allRows.length === 0) return;

  const filteredRows =
    selectedEmployees.size === 0
      ? allRows
      : allRows.filter((r) => selectedEmployees.has(getRowKey(r)));

  if (filteredRows.length === 0) {
    showToast("No employees selected to download", "warning");
    return;
  }

  const wb = XLSX.utils.book_new();

  // ========== SHEET 1: SUMMARY ==========
  const wsSummary = XLSX.utils.aoa_to_sheet([]);
  let rowIdx = 0;

  const summaryHeaders = [
    "Employee ID",
    "Employee Name",
    "Vendor",
    "Project",
    "PLC",
    "PO Number",
    "Total Hours",
  ];

  // Add summary header (row 0)
  summaryHeaders.forEach((h, i) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
    wsSummary[cellRef] = {
      t: "s",
      v: h,
      s: {
        font: { bold: true },
      },
    };
  });

  // Add all employee summary rows (row 1+)
  rowIdx = 1;
  filteredRows.forEach((emp) => {
    const summaryValues = [
      emp.employeeId ?? "",
      emp.employeeName ?? "",
      emp.vendorName ?? "",
      emp.projectId ?? "",
      emp.plc ?? "",
      emp.poNumber ?? "",
      emp.totalHours ?? "",
    ];

    summaryValues.forEach((val, i) => {
      const cellRef = XLSX.utils.encode_cell({ r: rowIdx, c: i });
      wsSummary[cellRef] = {
        t: typeof val === "number" ? "n" : "s",
        v: val,
      };
    });

    rowIdx++;
  });

  wsSummary["!cols"] = [
    { wch: 12 }, // Employee ID
    { wch: 20 }, // Employee Name
    { wch: 25 }, // Vendor
    { wch: 25 }, // Project
    { wch: 10 }, // PLC
    { wch: 15 }, // PO Number
    { wch: 12 }, // Total Hours
  ];

  wsSummary["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: rowIdx - 1, c: 6 },
  });

  // ========== SHEET 2: DETAILS ==========
  const wsDetails = XLSX.utils.aoa_to_sheet([]);
  rowIdx = 0;

  const detailHeaders = [
    "Employee ID",
    "Employee Name",
    "Timesheet Date",
    "Description",
    "Work Order",
    "Pay Type",
    "Hours",
  ];

  // Add detail header (row 0)
  detailHeaders.forEach((h, i) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: i });
    wsDetails[cellRef] = {
      t: "s",
      v: h,
      s: {
        font: { bold: true },
      },
    };
  });

  // Add all detail rows (row 1+)
  rowIdx = 1;
  filteredRows.forEach((emp) => {
    if (Array.isArray(emp.details) && emp.details.length > 0) {
      emp.details.forEach((d) => {
        const detailValues = [
          emp.employeeId ?? "",
          emp.employeeName ?? "",
          d.timesheetDate ?? "",
          d.description ?? "",
          d.workOrder ?? "",
          d.payType ?? "",
          d.hours ?? "",
        ];

        detailValues.forEach((val, i) => {
          const cellRef = XLSX.utils.encode_cell({ r: rowIdx, c: i });
          wsDetails[cellRef] = {
            t: typeof val === "number" ? "n" : "s",
            v: val,
          };
        });

        rowIdx++;
      });
    }
  });

  wsDetails["!cols"] = [
    { wch: 12 }, // Employee ID
    { wch: 20 }, // Employee Name
    { wch: 15 }, // Timesheet Date
    { wch: 30 }, // Description
    { wch: 15 }, // Work Order
    { wch: 10 }, // Pay Type
    { wch: 8 },  // Hours
  ];

  wsDetails["!ref"] = XLSX.utils.encode_range({
    s: { r: 0, c: 0 },
    e: { r: rowIdx - 1, c: 6 },
  });

  // ========== ADD SHEETS TO WORKBOOK ==========
  XLSX.utils.book_append_sheet(wb, wsSummary, "Summary");
  XLSX.utils.book_append_sheet(wb, wsDetails, "Details");

  // Download file
  XLSX.writeFile(wb, "employee-hours-report.xlsx");

  showToast(
    `Downloaded ${filteredRows.length} employee(s) successfully!`,
    "success"
  );
};



  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-600">Loading user session...</span>
      </div>
    );
  }
//     <div className="h-screen bg-[#f9fafd] flex flex-col pr-4 overflow-hidden">
//       <div className="flex-1 flex flex-col pt-6 pb-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 px-9">
//           <div className="flex items-center">
//             <FileText className="h-8 w-8 text-green-600 mr-3" />
//             <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
//           >
//             Logout
//           </button>
//         </div>

//       {/* Filters */}
    //   <div className="px-8 pt-4 pb-2">
    //     <fieldset className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
    //       <legend className="text-sm font-semibold text-gray-600 px-2">
    //         Filters
    //       </legend>
    //       <div className="flex flex-wrap gap-4 items-end">
    //         <div className="flex flex-col">
    //           <label className="text-xs font-semibold text-gray-600">
    //             Start Date
    //           </label>
    //           <input
    //             type="date"
    //             value={startDate}
    //             onChange={(e) => setStartDate(e.target.value)}
    //             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-xs font-semibold text-gray-600">
    //             End Date
    //           </label>
    //           <input
    //             type="date"
    //             value={endDate}
    //             onChange={(e) => setEndDate(e.target.value)}
    //             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-xs font-semibold text-gray-600">
    //             Vendor Id
    //           </label>
    //           <input
    //             type="text"
    //             value={vendorId}
    //             onChange={(e) => setVendorId(e.target.value)}
    //             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-xs font-semibold text-gray-600">
    //             Resource Id
    //           </label>
    //           <input
    //             type="text"
    //             value={resourceId}
    //             onChange={(e) => setResourceId(e.target.value)}
    //             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
    //           />
    //         </div>
    //         <div className="flex flex-col">
    //           <label className="text-xs font-semibold text-gray-600">
    //             PO Number
    //           </label>
    //           <input
    //             type="text"
    //             value={poNumber}
    //             onChange={(e) => setPoNumber(e.target.value)}
    //             className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
    //           />
    //         </div>
    //         <button
    //           onClick={handleFetchReport}
    //           disabled={loading}
    //           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-sm disabled:opacity-50"
    //         >
    //           {loading ? "Loading..." : "Run Report"}
    //         </button>
    //       </div>
    //     </fieldset>
    //   </div>

//       {/* Table */}
//       <div className="flex-1 px-8 pb-8">
//         <div className="border border-gray-300 rounded bg-white shadow-sm overflow-auto">
//           {loading ? (
//             <div className="p-4 text-sm text-gray-600">Loading...</div>
//           ) : rows.length === 0 ? (
//             <div className="p-4 text-sm text-gray-600">No data available</div>
//           ) : (
//             <table className="min-w-full text-xs table-auto">
//               <thead className="bg-gray-100">
//                 <tr>
//                   {columns.map((col) => (
//                     <th
//                       key={col}
//                       className="px-3 py-2 text-left font-semibold text-gray-700 border-b"
//                     >
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, idx) => (
//                   <tr key={idx} className="hover:bg-gray-50">
//                     {columns.map((col) => (
//                       <td
//                         key={col}
//                         className="px-3 py-1.5 border-b text-gray-800"
//                       >
//                         {row[col]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//     </div>
//   );

// ...imports, showToast, user loading, filters, handleFetchReport stay as you have now...

// Replace only the JSX return where the table is rendered:

return (
  <div className="min-h-screen bg-[#f9fafd] flex flex-col overflow-auto">
    {/* Header */}
    <div className="flex items-center justify-between px-8 py-4 pt-8 ">
      <div className="flex items-center gap-3">
        <FileText className="h-7 w-7 text-green-600" />
        <h1 className="text-xl font-semibold text-gray-900">
        Reports
        </h1>
      </div>

      <div className="flex items-center gap-3">
         
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 rounded text-sm shadow-sm"
        >
          Logout
        </button>
      </div>
    </div>

    {/* Filters block – keep what you already have here */}
          <div className="px-8 pt-1 pb-2">
        <fieldset className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
          <legend className="text-sm font-semibold text-gray-600 px-2">
            Filters
          </legend>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600">
                Vendor Id
              </label>
              <input
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600">
                Resource Id
              </label>
              <input
                type="text"
                value={resourceId}
                onChange={(e) => setResourceId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-600">
                PO Number
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleFetchReport}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-sm disabled:opacity-50"
            >
              {loading ? "Loading..." : "Run Report"}
            </button>

              <button
          onClick={() => downloadExcel(rows)}
          disabled={!rows || rows.length === 0}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-xs font-semibold shadow-sm disabled:opacity-50"
        >
          {/* Download */}
          <Download className="h-4 w-4 mr-2" />
        </button>
          </div>    
        </fieldset>
      </div>

    {/* Master / detail table */}
    <div className="flex-1 px-8 pb-8 pt-4">
      <div
    className="border border-gray-300 rounded bg-white shadow-sm"
    style={{ maxHeight: "550px", overflow: "auto" }}  // vertical + horizontal scroll
  >
        {loading ? (
          <div className="p-4 text-sm text-gray-600">Loading...</div>
        ) : !rows || rows.length === 0 ? (
          <div className="p-4 text-sm text-gray-600">No data available</div>
        ) : (
          <table className="min-w-full text-xs table-auto overflow-auto">
            <thead className="bg-gray-100">
                  <tr>
    <th className="px-2 py-2 text-center font-semibold text-gray-700 border-b w-8">
      <input
        type="checkbox"
        checked={selectAll && rows.length > 0}
        onChange={handleToggleAll}
        className="cursor-pointer"
      />
    </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  Employee ID
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  Employee Name
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  Vendor
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  Project
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  PLC
                </th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 border-b">
                  PO Number
                </th>
                <th className="px-3 py-2 text-right font-semibold text-gray-700 border-b">
                  Total Hours
                </th>
              </tr>
            </thead>
          <tbody>
  {rows.map((row, idx) => {
    const isOpen = expandedIndex === idx;
    return (
      <React.Fragment key={idx}>
        {/* Header row is clickable */}
        <tr
          className={`cursor-pointer ${isOpen ? "bg-blue-50" : "bg-gray-50"}`}
          onClick={() =>
            setExpandedIndex(isOpen ? null : idx)
          }
        >
             <td className="px-2 py-1.5 border-b text-center">
    <input
      type="checkbox"
      checked={selectedEmployees.has(getRowKey(row))}
      onChange={() => handleToggleEmployee(row)}
      className="cursor-pointer"
    />
  </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.employeeId}
          </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.employeeName || "-"}
          </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.vendorId} {row.vendorName ? `- ${row.vendorName}` : ""}
          </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.projectId}
          </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.plc}
          </td>
          <td className="px-3 py-1.5 border-b text-gray-800">
            {row.poNumber}
          </td>
          <td className="px-3 py-1.5 border-b text-right text-gray-800">
            {row.totalHours?.toFixed
              ? row.totalHours.toFixed(2)
              : row.totalHours}
          </td>
        </tr>

        {/* Detail row shown only when expanded */}
        {isOpen && (
          <tr>
            <td colSpan={7} className="px-3 pb-2 pt-1 border-b bg-white">
              {row.details && row.details.length > 0 ? (
                <table className="w-full text-[11px] table-fixed border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 py-1 text-left font-semibold text-gray-700 border-b">
                        Timesheet Date
                      </th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-700 border-b">
                        Description
                      </th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-700 border-b">
                        Work Order
                      </th>
                      <th className="px-2 py-1 text-left font-semibold text-gray-700 border-b">
                        Pay Type
                      </th>
                      <th className="px-2 py-1 text-right font-semibold text-gray-700 border-b">
                        Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.details.map((d, dIdx) => (
                      <tr key={dIdx} className="hover:bg-gray-50">
                        <td className="px-2 py-0.5 border-b text-gray-800">
                          {d.timesheetDate}
                        </td>
                        <td className="px-2 py-0.5 border-b text-gray-800">
                          {d.description}
                        </td>
                        <td className="px-2 py-0.5 border-b text-gray-800">
                          {d.workOrder}
                        </td>
                        <td className="px-2 py-0.5 border-b text-gray-800">
                          {d.payType}
                        </td>
                        <td className="px-2 py-0.5 border-b text-right text-gray-800">
                          {d.hours?.toFixed ? d.hours.toFixed(2) : d.hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-[11px] text-gray-500">
                  No detail rows
                </div>
              )}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  })}
</tbody>

          </table>
        )}
      </div>
    </div>
  </div>
);


};

export default Report;

import React, { useState, useEffect } from "react";
import { backendUrl } from "./config";

// --- SVG Icons ---
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

// --- Helper Functions ---
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
    document.body.removeChild(toast);
  }, 3000);
};

// Hideable columns
const hideableColumns = [
  "Work Order",
  "Description",
  "Project",
  "PLC",
  "Pay Type",
  "Po Id",
  "Release",
  "PO LN No",
];

export default function TimesheetApprovalView({
  resourceId,
  timesheetDate,
  onClose,
}) {
  const [lines, setLines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerDates, setHeaderDates] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState({
    "Work Order": false,
    Description: false,
    Project: false,
    PLC: false,
    "Pay Type": false,
    "Po Id": false,
    Release: false,
    "PO LN No": false,
  });

  const [timesheetDetails, setTimesheetDetails] = useState(null);

  const dayKeyMapping = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  useEffect(() => {
    console.log("Resource ID received in approval view:", resourceId);
    if (resourceId) {
      fetchTimesheetData();
    }
  }, [resourceId, timesheetDate]);

  const fetchTimesheetData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/SubkTimesheet/ByResource/${resourceId}`
      );
      if (!response.ok) throw new Error("Failed to fetch timesheet data");
      const data = await response.json();

      console.log("Timesheet data received from API:", data);

      const dataArray = Array.isArray(data) ? data : [];

      // Filter by the selected timesheet date
      const filteredData = dataArray.filter((item) => {
        if (!timesheetDate) return true; // Show all if no date specified

        const itemDate = new Date(item.timesheet_Date);
        const selectedDate = new Date(timesheetDate);
        return itemDate.toDateString() === selectedDate.toDateString();
      });

      if (filteredData.length > 0) {
        setTimesheetDetails(filteredData[0]);
        const firstDate = filteredData[0].timesheet_Date;
        const startDate = new Date(firstDate);
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

      // Map filteredData with sequential line numbers and work order
      const mappedLines = filteredData.map((item, index) => {
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

        if (item.timesheetHours && Array.isArray(item.timesheetHours)) {
          item.timesheetHours.forEach((hourEntry) => {
            const date = new Date(`${hourEntry.ts_Date}T00:00:00Z`);
            if (!isNaN(date.getTime())) {
              const dayKey = dayKeyMapping[date.getUTCDay()];
              if (dayKey) {
                hoursData[dayKey] = hourEntry.hours;
                hourIdsData[dayKey] = hourEntry.id;
              }
            }
          });
        }
        return {
          id: item.lineNo || index + 1,
          lineNumber: index + 1,
          workOrder:
            item.workOrder || item.work_order || item.workOrderNumber || "",
          description: item.description || "",
          project: item.projId || "",
          plc: item.plc || "",
          payType: item.payType || "SR",
          poNumber: item.poNumber || "",
          rlseNumber: item.rlseNumber || "",
          poLineNumber: item.poLineNumber || "",
          hours: hoursData,
          hourIds: hourIdsData,
          totalHours: item.hours || 0,
          resourceId: item.resource_Id,
        };
      });

      setLines(mappedLines);
    } catch (error) {
      showToast(error.message, "error");
      console.error("Error fetching timesheet data:", error);
      setLines([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Day wise total
  const dailyTotals = React.useMemo(() => {
    const totals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    lines.forEach((line) => {
      days.forEach((day) => {
        totals[day] += parseFloat(line.hours[day] || 0);
      });
    });
    return totals;
  }, [lines, days]);

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

  if (isLoading) {
    return (
      <div className="w-full mt-4 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-center text-blue-700">
          Loading timesheet data...
        </div>
      </div>
    );
  }

  const tableHeaders = [
    "Line No",
    "Work Order",
    "Description",
    "Project",
    "PLC",
    "Pay Type",
    "Po Id",
    "Release",
    "PO LN No",
    ...headerDates,
    "Total Hours",
  ];

  const hiddenCount = Object.values(hiddenColumns).filter((val) => val).length;
  const hiddenColumnsList = Object.entries(hiddenColumns)
    .filter(([col, isHidden]) => isHidden)
    .map(([col]) => col);

  const getColumnKey = (header) => {
    if (header === "Line No") return "Line No";
    if (header === "Work Order") return "Work Order";
    if (header === "Description") return "Description";
    if (header === "Project") return "Project";
    if (header === "PLC") return "PLC";
    if (header === "Pay Type") return "Pay Type";
    if (header === "Po Id") return "Po Id";
    if (header === "Release") return "Release";
    if (header === "PO LN No") return "PO LN No";
    return null;
  };

  const isColumnHidden = (header) => {
    const columnKey = getColumnKey(header);
    return columnKey && hiddenColumns[columnKey];
  };

  return (
    <div className="w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center p-2 border-b border-gray-300 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          {/* <h3 className="text-lg font-semibold text-gray-900">
            Timesheet Details
          </h3> */}
          {timesheetDetails && (
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
              <div>
                <span className="font-medium">Status:</span>{" "}
                {timesheetDetails.status || "N/A"}
              </div>
              <div>
                <span className="font-medium">Date:</span>{" "}
                {timesheetDetails.timesheet_Date
                  ? formatDate(timesheetDetails.timesheet_Date)
                  : "N/A"}
              </div>
              <div>
                <span className="font-medium">Approved By:</span>{" "}
                {timesheetDetails.approvedBy ||
                  timesheetDetails.pm_User_Id ||
                  "N/A"}
              </div>
              <div>
                <span className="font-medium">Approve Date:</span>{" "}
                {timesheetDetails.approveDate
                  ? formatDate(timesheetDetails.approveDate)
                  : "N/A"}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
        >
          ✕ Close
        </button>
      </div>

      {/* Hidden Columns Indicator */}
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

      {/* Content Section */}
      <div className="p-2">
        {lines.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium mb-2">No Data Found</div>
            <div className="text-sm">No timesheet data found</div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm min-w-[1600px]">
              {/* <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  {tableHeaders.map((header, index) => {
                    if (isColumnHidden(header) && hideableColumns.includes(header)) {
                      return null;
                    }
                    return (
                      <th
                        key={`header-${index}-${header}`}
                        className="p-3 text-center font-semibold text-gray-700 whitespace-nowrap border-r border-gray-200 last:border-r-0 cursor-pointer hover:bg-gray-200/50 transition-colors"
                        onClick={() => {
                          const columnKey = getColumnKey(header);
                          if (columnKey && hideableColumns.includes(columnKey)) {
                            toggleColumnVisibility(columnKey);
                          }
                        }}
                        title={
                          hideableColumns.includes(header)
                            ? "Click to hide"
                            : ""
                        }
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead> */}
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  {tableHeaders.map((header, index) => {
                    if (
                      isColumnHidden(header) &&
                      hideableColumns.includes(header)
                    ) {
                      return null;
                    }
                    const columnKey = getColumnKey(header);
                    const isHideable =
                      columnKey && hideableColumns.includes(columnKey);

                    return (
                      <th
                        key={`header-${index}-${header}`}
                        className="p-3 text-center font-semibold text-gray-700 whitespace-nowrap border-r border-gray-200 last:border-r-0"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="flex-1">{header}</span>
                          {isHideable && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleColumnVisibility(columnKey);
                              }}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                              title="Hide column"
                              type="button"
                            >
                              <XIcon className="h-3.5 w-3.5 text-red-600" />
                            </button>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {lines.map((line, index) => {
                  const rowTotal = Object.values(line.hours)
                    .reduce((s, h) => s + (parseFloat(h) || 0), 0)
                    .toFixed(2);

                  return (
                    <tr
                      key={line.id}
                      className={`hover:bg-blue-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      {/* Line No column */}
                      {!isColumnHidden("Line No") && (
                        <td className="p-2 min-w-[80px] border-r border-gray-200 text-center">
                          <div className="text-sm font-semibold text-gray-800 bg-blue-50 rounded px-2 py-1">
                            {line.lineNumber}
                          </div>
                        </td>
                      )}
                      {/* Work Order column */}
                      {!isColumnHidden("Work Order") && (
                        <td className="p-2  border-r border-gray-200  text-center">
                          <div className="text-sm font-mono text-gray-700">
                            {line.workOrder || "-"}
                          </div>
                        </td>
                      )}
                      {/* Description column */}
                      {!isColumnHidden("Description") && (
                        <td className="p-2   border-r border-gray-200">
                          <div
                            className="text-sm font-medium text-gray-900 truncate"
                            title={line.description}
                          >
                            {line.description || "-"}
                          </div>
                        </td>
                      )}
                      {/* Project column */}
                      {!isColumnHidden("Project") && (
                        <td className="p-2  text-center border-r border-gray-200">
                          <div className="text-sm text-gray-700 font-mono">
                            {line.project || "-"}
                          </div>
                        </td>
                      )}
                      {/* PLC column */}
                      {!isColumnHidden("PLC") && (
                        <td className="p-2  text-center border-r border-gray-200">
                          <div className="text-sm text-gray-700">
                            {line.plc || "-"}
                          </div>
                        </td>
                      )}
                      {/* Pay Type column */}
                      {!isColumnHidden("Pay Type") && (
                        <td className="p-2  text-center border-r border-gray-200">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs  font-medium">
                            {line.payType}
                          </span>
                        </td>
                      )}
                      {/* PO Number column */}
                      {!isColumnHidden("Po Id") && (
                        <td className="p-2  text-center  border-r border-gray-200">
                          <div className="text-sm text-gray-700 truncate">
                            {line.poNumber || "-"}
                          </div>
                        </td>
                      )}
                      {/* RLSE Number column */}
                      {!isColumnHidden("Release") && (
                        <td className="p-2  text-center border-r border-gray-200">
                          <div className="text-sm text-gray-700">
                            {line.rlseNumber || "-"}
                          </div>
                        </td>
                      )}
                      {/* PO Line Number column */}
                      {!isColumnHidden("PO LN No") && (
                        <td className="p-2  text-center border-r border-gray-200">
                          <div className="text-sm text-gray-700">
                            {line.poLineNumber || "-"}
                          </div>
                        </td>
                      )}
                      {/* Daily hours columns */}
                      {days.map((day) => (
                        <td
                          key={`${line.id}-${day}`}
                          className="p-2 border-r border-gray-200"
                        >
                          <div
                            className={`w-16 text-center p-1.5 rounded text-sm font-medium ${
                              line.hours[day] > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-500"
                            } ${
                              day === "sat" || day === "sun" ? "bg-blue-50" : ""
                            }`}
                          >
                            {line.hours[day]
                              ? parseFloat(line.hours[day]).toFixed(1)
                              : "0.0"}
                          </div>
                        </td>
                      ))}
                      {/* Total Hours column */}
                      <td className="p-3 text-center font-bold text-gray-800 bg-blue-50">
                        {line.totalHours
                          ? parseFloat(line.totalHours).toFixed(1)
                          : rowTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot className="bg-slate-100/70 sticky bottom-0">
                <tr className="border-t-2 border-gray-300 font-semibold">
                  <td
                    colSpan={
                      9 - Object.values(hiddenColumns).filter((v) => v).length
                    }
                    className="p-3 text-right"
                  >
                    Total Hours
                  </td>
                  {days.map((day) => (
                    <td key={day} className="p-2 text-center">
                      <div className="w-20 p-1.5 font-semibold">
                        {dailyTotals[day].toFixed(2)}
                      </div>
                    </td>
                  ))}
                  <td className="p-3 text-center font-bold text-blue-700 pr-4">
                    {lines
                      .reduce(
                        (acc, line) => acc + (parseFloat(line.totalHours) || 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      {/* Footer Section */}
      {lines.length > 0 && (
        <div className="flex justify-end items-center p-4 border-t border-gray-300 bg-gray-50">
          {/* Empty footer */}
        </div>
      )}
    </div>
  );
}

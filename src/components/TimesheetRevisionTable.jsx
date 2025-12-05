import React, { useEffect, useState } from "react";
import { backendUrl } from "./config";

const TimesheetRevisionTable = ({ timesheetDate,lines, onClose }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!timesheetDate) return;
    const fetchRevision = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${backendUrl}/api/SubkTimesheet/GetAuditLogsV1`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lines),
          }
        );
        if (!res.ok) throw new Error("Failed to load revision audit");
        const data = await res.json();
        setRows(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRevision();
  }, [timesheetDate, lines]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-800">
            Revision Audit – {timesheetDate}
          </h2>
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
          >
            Close
          </button>
        </div>

        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-xs">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Field
                </th>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Old Value
                </th>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  New Value
                </th>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Changed By
                </th>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Changed Comment
                </th>
                <th className="px-3 py-2 text-left font-semibold text-blue-800">
                  Changed At
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-4 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-4 text-center text-gray-500"
                  >
                    No revision data available
                  </td>
                </tr>
              ) : (
                rows.map((r, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-blue-50/40"}
                  >
                    <td className="px-3 py-1">{r.columnName}</td>
                    <td className="px-3 py-1">{r.oldValue}</td>
                    <td className="px-3 py-1">{r.newValue}</td>
                    <td className="px-3 py-1">{r.changedBy}</td>
                    <td className="px-3 py-1">{r.changeComment}</td>
                    <td className="px-3 py-1">{r.changedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimesheetRevisionTable;

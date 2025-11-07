// components/WorkflowLevelsTable.jsx
import React from "react";

const workflowRows = [
  { levelNo: 1, levelName: "Project Manager" },
  { levelNo: 2, levelName: "Approver" },
  { levelNo: 3, levelName: "Finance Head" }
];

export default function WorkFlow() {
  return (
    <div className="min-h-screen bg-[#f9fafd] flex flex-col pl-44 pr-4">
      <div className="flex-1 flex flex-col items-center justify-start pt-8">
        <div className="w-full flex flex-col items-center">
          <div
            className="border border-gray-300 rounded bg-white shadow"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              minWidth: 300,
              padding: "0.5rem",
              minHeight: "220px",
              maxHeight: "70vh",
              overflow: "hidden",
              marginBottom: "0px"
            }}
          >
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "50vh",
                minHeight: "70px",
                width: "100%"
              }}
            >
              <table style={{
                borderCollapse: "collapse",
                fontSize: "12px",
                minWidth: "350px",
                width: "max-content"
              }}>
                <thead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 10 }}>
                  <tr>
                    <th style={{
                      border: "1px solid #d1d5db",
                      padding: "8px",
                      fontSize: "13px",
                      minWidth: 80,
                      fontWeight: "bold",
                      color: "#1e40af",
                      textAlign: "left",
                      whiteSpace: "nowrap"
                    }}>Level No</th>
                    <th style={{
                      border: "1px solid #d1d5db",
                      padding: "8px",
                      fontSize: "13px",
                      minWidth: 230,
                      fontWeight: "bold",
                      color: "#1e40af",
                      textAlign: "left",
                      whiteSpace: "nowrap"
                    }}>Level Name</th>
                  </tr>
                </thead>
                <tbody>
                  {workflowRows.map((row, idx) => (
                    <tr key={row.levelNo}
                      style={{
                        backgroundColor: idx % 2 === 0 ? "#f9fafb" : "white"
                      }}
                    >
                      <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 80 }}>
                        {row.levelNo}
                      </td>
                      <td style={{ border: "1px solid #e5e7eb", padding: "8px", minWidth: 230 }}>
                        {row.levelName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div className="flex gap-8 justify-start items-center mt-3 pt-2 border-t border-gray-200 w-full pl-2">
              <span className="text-xs font-medium text-blue-700">Manage Workflow</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

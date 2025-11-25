import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClockIcon, Signal } from "lucide-react";
import { backendUrl } from "./config";

const POStatusTable = () => {
  const navigate = useNavigate();

  // Data and loading states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [filterPurchaseOrder, setFilterPurchaseOrder] = useState("");
  const [filterWACode, setFilterWACode] = useState("");
  const [filterResourceId, setFilterResourceId] = useState("");
  // Grouping controls
  const [groupByPO, setGroupByPO] = useState(false);
  const [groupByWO, setGroupByWO] = useState(false);
  const [groupByResource, setGroupByResource] = useState(false);

  // Fetch PO Status data from API
  useEffect(() => {
    const fetchData = async () => {
      const url = `${backendUrl}/api/SubkTimesheet/GetPOStatus`;
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter by PO and Work Order
  const filteredData = data.filter((item) => {
    const poMatch =
      !filterPurchaseOrder ||
      item.poNumber
        ?.toString()
        .toLowerCase()
        .includes(filterPurchaseOrder.toLowerCase());
    const woMatch =
      !filterWACode ||
      item.workOrder
        ?.toString()
        .toLowerCase()
        .includes(filterWACode.toLowerCase());
    const rIdMatch =
      !filterResourceId ||
      item.resourceId
        ?.toString()
        .toLowerCase()
        .includes(filterResourceId.toLowerCase());

    return poMatch && woMatch && rIdMatch;
  });

  // --- GROUPING LOGIC ---
  // Helper: Compute totals for an array of rows
  const calculateTotals = (rows) => ({
    totHrs: rows.reduce((sum, r) => sum + (+r.totHrs || 0), 0),
    totalCost: rows.reduce((sum, r) => sum + (+r.totalCost || 0), 0),
    timesheetHours: rows.reduce((sum, r) => sum + (+r.timesheetHours || 0), 0),
    timesheetCost: rows.reduce((sum, r) => sum + (+r.timesheetCost || 0), 0),
    voucheredHours: rows.reduce((sum, r) => sum + (+r.voucheredHours || 0), 0),
    voucheredCost: rows.reduce((sum, r) => sum + (+r.voucheredCost || 0), 0),
    unvoucheredCost: rows.reduce(
      (sum, r) => sum + (+r.unvoucheredCost || 0),
      0
    ),
    utilizationPercent: rows.reduce(
      (sum, r) => sum + (+r.utilizationPercent || 0),
      0
    ),
    voucheredPercent: rows.reduce(
      (sum, r) => sum + (+r.voucheredPercent || 0),
      0
    ),
  });

  // Helper: Flat grouping, returns compact groups
  function flatGroupData(rows, keys, path = []) {
    if (keys.length === 0)
      return [{ path, rows, totals: calculateTotals(rows) }];
    const key = keys[0];
    const rest = keys.slice(1);
    const groups = rows.reduce((acc, row) => {
      const val = row[key] || "Unknown";
      if (!acc[val]) acc[val] = [];
      acc[val].push(row);
      return acc;
    }, {});
    return Object.entries(groups).flatMap(([val, groupRows]) =>
      flatGroupData(groupRows, rest, [...path, { key, val }])
    );
  }

  // Determine grouping keys based on checkboxes
  const groupingKeys = [];
  if (groupByPO) groupingKeys.push("poNumber");
  if (groupByWO) groupingKeys.push("workOrder");
  if (groupByResource) groupingKeys.push("resourceDesc");
  const flatGroups =
    groupingKeys.length > 0 ? flatGroupData(filteredData, groupingKeys) : [];

  // Formatting helpers
  const formatCurrency = (num) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(num) || 0);
  const formatNumber = (num) =>
    Number(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Compact group header + rows renderer
  function renderFlatGroup(group, idx) {
    const label = group.path
      .map(
        (p) =>
          `${
            p.key === "poNumber"
              ? "PO Number"
              : p.key === "workOrder"
              ? "Work Order"
              : "Resource Description"
          }: ${p.val}`
      )
      .join(" | ");
    return (
      <React.Fragment key={label + idx}>
        {group.rows.map((row, i) => renderRow(row, i))}
        <tr className="bg-gray-200 font-bold">
          {/* Group label in first column */}
          <td className="border px-4 py-2 font" colSpan={3}>
            {/* {group.path
              .map(
                (p) =>
                  `${
                    p.key === "poNumber"
                      ? "PO Number"
                      : p.key === "workOrder"
                      ? "Work Order"
                      : "Resource Description"
                  }: ${p.val}`
              )
              .join(" | ")} */}
              {" "}
            Totals
          </td>
          {/* Group totals in each column, matching field order */}
          <td className="border px-4 py-2 text-right">
            {formatNumber(group.totals.totHrs)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatCurrency(group.totals.totalCost)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatNumber(group.totals.timesheetHours)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatCurrency(group.totals.timesheetCost)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatNumber(group.totals.voucheredHours)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatCurrency(group.totals.voucheredCost)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatCurrency(group.totals.unvoucheredCost)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatNumber(group.totals.utilizationPercent)}
          </td>
          <td className="border px-4 py-2 text-right">
            {formatNumber(group.totals.voucheredPercent)}
          </td>
        </tr>
      </React.Fragment>
    );
  }

  // Standard row renderer
  function renderRow(row, idx) {
    return (
      <tr key={idx} className="hover:bg-gray-50">
        <td className="border px-4 py-2">{row.resourceId}</td>
        <td className="border px-4 py-2">{row.poNumber}</td>
        {/* <td className="border px-4 py-2">{row.workOrder}</td> */}
        <td className="border px-4 py-2">{row.resourceDesc}</td>
        <td className="border px-4 py-2 text-right">
          {formatNumber(row.totHrs)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatCurrency(row.totalCost)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatNumber(row.timesheetHours)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatCurrency(row.timesheetCost)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatNumber(row.voucheredHours)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatCurrency(row.voucheredCost)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatCurrency(row.unvoucheredCost)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatNumber(row.utilizationPercent)}
        </td>
        <td className="border px-4 py-2 text-right">
          {formatNumber(row.voucheredPercent)}
        </td>
      </tr>
    );
  }

  // Render
  return (
    <div className="min-h-screen bg-grey-200 flex flex-col pr-4 mx-auto">
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8 px-6 py-4">
        <div className="w-full flex flex-col items-center">
          {/* Header and Logout */}
          <div className="w-full flex justify-between items-center mb-4 px-1">
            <div className="flex items-center">
              <Signal className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">PO Status</h1>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                navigate("/");
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm shadow transition"
            >
              Logout
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-3 items-center flex-wrap px-1 w-full">
            {/* <input
              type="text"
              placeholder="Filter Work Order"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterWACode}
              onChange={(e) => setFilterWACode(e.target.value)}
            /> */}
            <input
              type="text"
              placeholder="Filter PO Number"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterPurchaseOrder}
              onChange={(e) => setFilterPurchaseOrder(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter Resource ID"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filterResourceId}
              onChange={(e) => setFilterResourceId(e.target.value)}
            />
          </div>

          {/* Grouping checkboxes */}
          <div className="flex gap-3 mb-3 items-center flex-wrap px-1 w-full">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={groupByPO}
                onChange={(e) => setGroupByPO(e.target.checked)}
              />
              PO Number
            </label>
            {/* <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={groupByWO}
              onChange={(e) => setGroupByWO(e.target.checked)}
            />
            Work Order
          </label> */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={groupByResource}
                onChange={(e) => setGroupByResource(e.target.checked)}
              />
              Resource Description
            </label>
          </div>

          {/* Data Table */}
          <div className="border border-gray-300 rounded-2xl bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
            <div className="relative">
              <div className="overflow-x-auto max-h-[75vh] mt-1">
                <table className="w-full border-collapse text-sm">
                  <thead className="sticky top-0 bg-blue-50">
                    <tr>
                      <th className="border px-4 py-2 text-left">
                        Resource ID
                      </th>
                      <th className="border px-4 py-2 text-left">PO Number</th>
                      {/* <th className="border px-4 py-2 text-left">Work Order</th> */}
                      <th className="border px-4 py-2 text-left">
                        Resource Description
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Total Hours
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Total Cost
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Timesheet Hours
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Timesheet Cost
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Vouchered Hours
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Vouchered Cost
                      </th>
                      <th className="border px-4 py-2 text-right">
                        Unvouchered Cost
                      </th>
                      <th className="border px-4 py-2 text-right whitespace-nowrap">
                        Utilization
                      </th>
                      <th className="border px-4 py-2 text-right whitespace-nowrap">
                        Vouchered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={13} className="px-4 py-2 text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan={13}
                          className="px-4 py-2 text-center text-red-600"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : groupingKeys.length > 0 ? (
                      flatGroups.map(renderFlatGroup)
                    ) : filteredData.length === 0 ? (
                      <tr>
                        <td className="px-4 py-2 text-center" colSpan={13}>
                          No data available
                        </td>
                      </tr>
                    ) : (
                      filteredData.map(renderRow)
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POStatusTable;

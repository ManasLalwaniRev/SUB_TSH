import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageSquare,
  Download,
  Receipt,
  Package,
  Users,
} from "lucide-react";
import { backendUrl } from './config.jsx';


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
    position: fixed; top: 20px; right: 20px; z-index: 9999;
    background: ${bgColor}; color: white; padding: 12px 16px;
    border-radius: 6px; font-size: 14px; max-width: 300px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 1000);
};

const WorkAssignment = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [approvedRows, setApprovedRows] = useState(new Set());

  // Filter states - Added PO Line Key filter
  const [filterPurchaseOrder, setFilterPurchaseOrder] = useState("");
  const [filterPurchaseOrderRelease, setFilterPurchaseOrderRelease] =
    useState("");
  const [filterWACode, setFilterWACode] = useState("");
  const [filterPOLineKey, setFilterPOLineKey] = useState("");

  // Updated column configuration with WA Code
  const columns = [
    "Select",
    "WA Code",
    "Purchase Order",
    "Purchase Order Release",
    // "PO Line Key",
  ];
  const colWidth = 120;
  const selectColWidth = 80;

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

  useEffect(() => {
    if (userLoaded && currentUser) {
      fetchWorkAssignments();
    }
  }, [userLoaded, currentUser]);

  // Fetch data from API
  const fetchWorkAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${backendUrl}/api/PurchaseOrders/GetAllWorkAssignments`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData)
        ? apiData.map((item, index) => ({
            id: item.id || `work-${index}`,
            waId: item.waId || 0,
            "WA Code": item.wa_Code || "",
            "Purchase Order": item.purchaseOrder || "",
            "Purchase Order Release": item.purchaseOrderRelease || "",
            "PO Line Key": item.poLnKey || "",
            originalItem: item,
            hasWACode: Boolean(item.wa_Code), // Check if wa_Code exists
          }))
        : [];

      setRows(mappedData);
      setSelectedRows(new Set());
      setSelectAll(false);
    } catch (error) {
      console.error("Fetch error:", error);
      showToast(
        "Failed to load work order. Please check your connection.",
        "error"
      );
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // Get filtered rows based on filter criteria - Added PO Line Key filter
  const getFilteredRows = () => {
    let filtered = rows;

    if (filterPurchaseOrder.trim()) {
      filtered = filtered.filter((row) =>
        (row["Purchase Order"] || "")
          .toLowerCase()
          .includes(filterPurchaseOrder.toLowerCase())
      );
    }

    if (filterPurchaseOrderRelease.trim()) {
      filtered = filtered.filter((row) =>
        (row["Purchase Order Release"] || "")
          .toLowerCase()
          .includes(filterPurchaseOrderRelease.toLowerCase())
      );
    }

    if (filterWACode.trim()) {
      filtered = filtered.filter((row) =>
        (row["WA Code"] || "")
          .toLowerCase()
          .includes(filterWACode.toLowerCase())
      );
    }

    if (filterPOLineKey.trim()) {
      filtered = filtered.filter((row) =>
        (row["PO Line Key"] || "")
          .toLowerCase()
          .includes(filterPOLineKey.toLowerCase())
      );
    }

    return filtered;
  };

  // Handle individual row selection - exclude approved rows and rows with wa_Code
  const handleRowSelect = (rowId) => {
    const row = rows.find((r) => r.id === rowId);
    if (approvedRows.has(rowId) || row?.hasWACode) return;

    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    const availableRows = getFilteredRows().filter(
      (row) => !approvedRows.has(row.id) && !row.hasWACode
    );
    setSelectAll(
      newSelectedRows.size === availableRows.length && availableRows.length > 0
    );
  };

  // Handle select all - exclude approved rows and rows with wa_Code
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const availableRowIds = new Set(
        getFilteredRows()
          .filter((row) => !approvedRows.has(row.id) && !row.hasWACode)
          .map((row) => row.id)
      );
      setSelectedRows(availableRowIds);
      setSelectAll(true);
    }
  };

  // Update select all when rows change - Added PO Line Key dependency
  useEffect(() => {
    const availableRows = getFilteredRows().filter(
      (row) => !approvedRows.has(row.id) && !row.hasWACode
    );
    if (availableRows.length > 0) {
      const allSelected = availableRows.every((row) =>
        selectedRows.has(row.id)
      );
      setSelectAll(allSelected);
    } else {
      setSelectAll(false);
    }
  }, [
    rows,
    selectedRows,
    approvedRows,
    filterPurchaseOrder,
    filterPurchaseOrderRelease,
    filterWACode,
    filterPOLineKey,
  ]);

  // Handle sorting
  const handleSort = (key) => {
    if (key === "Select") return;
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (columnKey) => {
    if (columnKey === "Select") return null;
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? " ↑" : " ↓";
    }
    return " ⇅";
  };

  // Get sorted and filtered rows
  const getSortedRows = () => {
    let filtered = getFilteredRows();

    if (sortConfig.key && sortConfig.key !== "Select") {
      filtered.sort((a, b) => {
        const aVal = String(a[sortConfig.key] || "").toLowerCase();
        const bVal = String(b[sortConfig.key] || "").toLowerCase();

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  // Handle approve action - Added API refresh after successful approval
  const handleApprove = async () => {
    if (selectedRows.size === 0) {
      showToast(
        "Please select at least one work assignment to approve",
        "warning"
      );
      return;
    }

    try {
      setApproveLoading(true);

      const selectedData = rows.filter((row) => selectedRows.has(row.id));

      const approvePromises = selectedData.map(async (row) => {
        const requestBody = {
          waId: row.waId,
          purchaseOrder: row["Purchase Order"],
          purchaseOrderRelease: row["Purchase Order Release"],
          poLnKey: row["PO Line Key"],
        };

        const response = await fetch(
          `${backendUrl}/api/WorkAssignments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to approve work assignment ${row.id}: ${response.status}`
          );
        }
        return response.json();
      });

      await Promise.all(approvePromises);

      showToast(
        `Successfully approved ${selectedRows.size} work order`,
        "success"
      );

      // Clear selections first
      setSelectedRows(new Set());
      setSelectAll(false);
      setApprovedRows(new Set()); // Reset approved rows since we're refreshing data

      // Refresh data from API after successful approval
      await fetchWorkAssignments();
    } catch (error) {
      console.error("Approve error:", error);
      showToast(
        "Failed to approve some work order. Please try again.",
        "error"
      );
    } finally {
      setApproveLoading(false);
    }
  };

  if (!userLoaded || !currentUser) {
    return (
      <div className="min-h-screen bg-[#f9fafd] flex flex-col pr-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading user session...</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-f9fafd flex items-center justify-center pr-4">
        <div className="text-center">
          <Package className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-lg text-gray-600">Loading work orders...</p>
        </div>
      </div>
    );
  }

  const sortedRows = getSortedRows();
  const availableRowsCount = sortedRows.filter(
    (row) => !approvedRows.has(row.id) && !row.hasWACode
  ).length;

  return (
    <div className="h-screen bg-[#f9fafd] flex flex-col pr-4 overflow-hidden">
      <div className="flex-1 flex flex-col pt-6 pb-6">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-6 px-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Work Order
              </h1>
              <button
                onClick={handleLogout}
                className="absolute top-6 right-8 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
              >
                Logout
              </button>
              {/* <p className="text-gray-600">Manage and export invoice data</p> */}
            {/* </div> */}
          {/* </div> */}
         {/* </div> */} 
         <div className="flex justify-between items-center mb-6 px-4">
          {/* Left side: icon + heading */}
          <div className="flex items-center">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Work Order</h1>
          </div>
 
          {/* Right side: Logout button */}
          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
          >
            Logout
          </button>
        </div>
        
        {/* Filters - Added PO Line Key filter */}
        <div className="flex gap-3 mb-4 px-4">
          <input
            type="text"
            value={filterWACode}
            onChange={(e) => setFilterWACode(e.target.value)}
            placeholder="Filter WA Code"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPurchaseOrder}
            onChange={(e) => setFilterPurchaseOrder(e.target.value)}
            placeholder="Filter Purchase Order"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPurchaseOrderRelease}
            onChange={(e) => setFilterPurchaseOrderRelease(e.target.value)}
            placeholder="Filter Purchase Order Release"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          {/* <input
            type="text"
            value={filterPOLineKey}
            onChange={e => setFilterPOLineKey(e.target.value)}
            placeholder="Filter PO Line Key"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          /> */}
        </div>

        {/* Data Table Container */}
        <div className="px-4 pb-4" style={{ height: "calc(100vh - 150px)" }}>
          <div className="h-full border border-gray-300 rounded bg-white shadow flex flex-col">
            {/* Sticky Action Button */}
            <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4">
              <button
                onClick={handleApprove}
                disabled={selectedRows.size === 0 || approveLoading}
                className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
              >
                {approveLoading
                  ? "Processing..."
                  : `Create Work Order (${selectedRows.size})`}
              </button>
            </div>

            {/* Scrollable Table Container */}
            <div
              className="flex-1 overflow-y-auto overflow-x-hidden"
              style={{ maxHeight: "calc(100vh - 250px)" }}
            >
              <table className="w-full border-collapse text-sm">
                {/* Sticky Header */}
                <thead className="sticky top-0 z-10 bg-blue-50">
                  <tr>
                    {columns.map((col, index) => (
                      <th
                        key={col}
                        className={`border border-gray-300 p-3 text-center font-bold text-blue-800 bg-blue-50 ${
                          col !== "Select"
                            ? "cursor-pointer hover:bg-blue-100"
                            : ""
                        }`}
                        style={{
                          width:
                            col === "Select" ? `${selectColWidth}px` : "auto",
                          minWidth:
                            col === "Select" ? `${selectColWidth}px` : "80px",
                        }}
                        onClick={() => col !== "Select" && handleSort(col)}
                      >
                        {col === "Select" ? (
                          <div className="flex items-center justify-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              className="cursor-pointer scale-110"
                              title="Select All"
                              disabled={availableRowsCount === 0}
                            />
                            <span className="text-xs text-gray-600 font-medium">
                              All
                            </span>
                          </div>
                        ) : (
                          <span>
                            {col}
                            {getSortIcon(col)}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {sortedRows.length > 0 ? (
                    sortedRows.map((row, rdx) => {
                      const isApproved = approvedRows.has(row.id);
                      const hasWACode = row.hasWACode;
                      const isDisabled = isApproved || hasWACode;

                      return (
                        <tr
                          key={`${row.id}-${rdx}`}
                          className={`${
                            rdx % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } hover:bg-gray-100`}
                        >
                          {columns.map((col, colIndex) => (
                            <td
                              key={col}
                              className="border border-gray-300 p-3 text-center"
                              style={{
                                width:
                                  col === "Select"
                                    ? `${selectColWidth}px`
                                    : "auto",
                                minWidth:
                                  col === "Select"
                                    ? `${selectColWidth}px`
                                    : "80px",
                              }}
                            >
                              {col === "Select" ? (
                                <input
                                  type="checkbox"
                                  checked={selectedRows.has(row.id)}
                                  onChange={() => handleRowSelect(row.id)}
                                  className="cursor-pointer scale-110"
                                  disabled={isDisabled}
                                  title={
                                    isApproved
                                      ? "Already approved"
                                      : hasWACode
                                      ? "Has WA Code - cannot approve"
                                      : ""
                                  }
                                />
                              ) : (
                                <span title={row[col] || ""}>
                                  {row[col] || ""}
                                </span>
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="text-center p-8 text-gray-500 italic"
                      >
                        No work order available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkAssignment;

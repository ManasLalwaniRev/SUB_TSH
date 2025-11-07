import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { backendUrl } from "./config";

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
  const displayTime = 3000;
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => document.body.removeChild(toast), 300);
  }, displayTime);
};

const groupColumns = [
  "All",
  "Purchase Order",
  "Release Number",
  "PO Line Number",
  "Start date",
  "End date",
  "Resource ID",
  "Resource Name",
  "PLC CD",
  "PLC Desc",
  "Email ID",
  "Project",
  "PM USER_ID",
  "PM NAME",
  "Vendor ID",
  "Vendor Name",
  "Hourly Rate",
];

const formatDate = (dateInput) => {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return dateInput;
  return new Intl.DateTimeFormat("en-US", { timeZone: "UTC" }).format(date);
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export default function GroupsTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchPO, setSearchPO] = useState("");
  const [searchResourceId, setSearchResourceId] = useState("");
  const [searchResourceName, setSearchResourceName] = useState("");

  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const poInfoFileInputRef = useRef(null);
  const vendorMasterFileInputRef = useRef(null);

  const API_URL = `${backendUrl}/api/PurchaseOrders`;

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        setCurrentUser(JSON.parse(userInfo));
      } catch {
        navigate("/");
      }
    } else {
      navigate("/");
    }
    setUserLoaded(true);
  }, [navigate]);

  useEffect(() => {
    if (userLoaded && !editingRowId) {
      fetchData();
    }
  }, [userLoaded, editingRowId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response failed");
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData)
        ? apiData.map((item) => ({
            id: `${item.purchaseOrderNumber}-${item.poLineNumber}-${item.resourceId}-${item.purchaseOrderRelease}`,
            "Purchase Order": item.purchaseOrderNumber || "",
            "Release Number": item.purchaseOrderRelease || "",
            "PO Line Number": item.poLineNumber || "",
            "Start date": formatDate(item.poLnStartDate),
            "End date": formatDate(item.poLnEndDate),
            "Resource ID": item.resourceId || "",
            "Resource Name": item.resourceName || "",
            "PLC CD": item.plcCd || "",
            "PLC Desc": item.plcDesc || "",
            "Email ID": item.emailId || "",
            Project: item.project || "",
            "PM USER_ID": item.pmUserId || "",
            "PM NAME": item.pmName || "",
            "Vendor ID": item.vendorId || "",
            "Vendor Name": item.vendorName || "",
            "Hourly Rate": formatCurrency(item.hourlyRate),
          }))
        : [];

      setRows(mappedData);
    } catch (error) {
      console.error("Failed to fetch group data:", error);
      showToast("Failed to load group data.", "error");
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return " ⇅";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  const processedRows = [...rows]
    .filter((row) => {
      const poMatch =
        !searchPO ||
        row["Purchase Order"]?.toLowerCase().includes(searchPO.toLowerCase());
      const idMatch =
        !searchResourceId ||
        row["Resource ID"]
          ?.toLowerCase()
          .includes(searchResourceId.toLowerCase());
      const nameMatch =
        !searchResourceName ||
        row["Resource Name"]
          ?.toLowerCase()
          .includes(searchResourceName.toLowerCase());
      return poMatch && idMatch && nameMatch;
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (sortConfig.key === "Hourly Rate") {
        const numA = parseFloat(String(aVal).replace(/[^0-9.-]+/g, ""));
        const numB = parseFloat(String(bVal).replace(/[^0-9.-]+/g, ""));
        if (numA < numB) return sortConfig.direction === "asc" ? -1 : 1;
        if (numA > numB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  const handleAddRecord = () => {
    const tempId = `new-record-${Date.now()}`;
    const newRecord = {
      id: tempId,
      ...groupColumns.reduce((acc, col) => ({ ...acc, [col]: "" }), {}),
    };
    setEditedRowData(newRecord);
    setEditingRowId(tempId);
    setRows((prevRows) => [newRecord, ...prevRows]);
  };

  const handleEditChange = (e) => {
    let { name, value } = e.target;
    const noNegativeFields = [
      "Release Number",
      "PO Line Number",
      "Resource ID",
      "PM USER_ID",
      "Hourly Rate",
    ];

    if (noNegativeFields.includes(name)) {
      if (value === "" || /^[0-9]*$/.test(value)) {
        if (value !== "" && parseFloat(value) < 0) {
          return;
        }
      } else {
        return;
      }
    }

    if (noNegativeFields.includes(e.target.name)) {
      if (e.key === "-" || e.key === "e" || e.key === "+") {
        e.preventDefault();
      }
    }

    setEditedRowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCancelAdd = () => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== editingRowId));
    setEditingRowId(null);
    setEditedRowData(null);
  };

  const handleSaveRecord = async () => {
    const mandatoryColumns = groupColumns.filter(
      (col) => !["PLC CD", "PLC Desc", "Actions", "All"].includes(col)
    );

    for (const col of mandatoryColumns) {
      if (!editedRowData[col] || String(editedRowData[col]).trim() === "") {
        showToast(`Error: "${col}" is a required field.`, "error");
        return;
      }
    }

    const apiPayload = {
      companyId: "1",
      purchaseOrderNumber: String(editedRowData["Purchase Order"]),
      poLineNumber: Number(editedRowData["PO Line Number"]),
      resourceId: String(editedRowData["Resource ID"]),
      purchaseOrderRelease: String(editedRowData["Release Number"]),
      resourceName: String(editedRowData["Resource Name"]),
      plcCd: String(editedRowData["PLC CD"]),
      emailId: String(editedRowData["Email ID"]),
      project: String(editedRowData["Project"]),
      pmUserId: String(editedRowData["PM USER_ID"]),
      pmName: String(editedRowData["PM NAME"]),
      plcDesc: String(editedRowData["PLC Desc"]),
      vendorId: String(editedRowData["Vendor ID"]),
      vendorName: String(editedRowData["Vendor Name"]),
      hourlyRate:
        parseFloat(
          String(editedRowData["Hourly Rate"]).replace(/[^0-9.-]+/g, "")
        ) || 0,
      poLnStartDate: new Date(editedRowData["Start date"]).toISOString(),
      poLnEndDate: new Date(editedRowData["End date"]).toISOString(),
      poLnKey: String(editedRowData["PO Line Number"]),
      roleCd: "PM",
      organization: "1.01.03.01",
      accountId: "51-000-000",
      projectDesc: "USAF LABOR",
      pmEmailId: "",
      organizationName: "SAS",
      glcCd: "",
      glcDesc: "",
      resourceLine: null,
      resourceDesc: `${editedRowData["Resource Name"]} (${editedRowData["PLC CD"]} ${editedRowData["PLC Desc"]})`,
      noOfResources: 1,
      totalHours: 0,
      extendedCost: null,
      accountName: "Sub Labor Exp-Onsite",
      managerIdVendor: "",
      managerNameVendor: "",
      managerEmailId: null,
    };

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Failed to save record. The server responded with an error.",
        }));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      showToast("Record saved successfully!", "success");
    } catch (error) {
      console.error("API Save Error:", error);
      showToast(error.message, "error");
    } finally {
      setEditingRowId(null);
      setEditedRowData(null);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (["+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "-") {
      e.preventDefault();
      toast.error("Negative values are not allowed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCheckboxChange = (rowId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(processedRows.map((row) => row.id));
      setSelectAll(true);
    }
  };

  const handleImportPOInfo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/PurchaseOrders/import-excel`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Import PO Info failed");
      }

      showToast("PO Info imported successfully!", "success");
      setSelectedRows([]);
      setSelectAll(false);
      fetchData();
    } catch (error) {
      console.error("Import PO Info Error:", error);
      showToast("Failed to import PO Info.", "error");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleImportVendorMaster = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/PurchaseOrders/import-venor-master`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Import Vendor Master failed");
      }

      showToast("Vendor Master imported successfully!", "success");
      setSelectedRows([]);
      setSelectAll(false);
      fetchData();
    } catch (error) {
      console.error("Import Vendor Master Error:", error);
      showToast("Failed to import Vendor Master.", "error");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  useEffect(() => {
    if (
      processedRows.length > 0 &&
      selectedRows.length === processedRows.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, processedRows]);

  return (
    <div className="min-h-screen bg-grey-200 flex flex-col pr-4 mx-auto">
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8 px-6 py-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4 px-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Purchase Orders Information
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
            >
              Logout
            </button>
          </div>

          <div className="flex gap-3 mb-3 items-center flex-wrap px-1 w-full">
            <input
              type="text"
              value={searchPO}
              onChange={(e) => setSearchPO(e.target.value)}
              placeholder="Purchase Order"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs"
            />
            <input
              type="text"
              value={searchResourceId}
              onChange={(e) => setSearchResourceId(e.target.value)}
              placeholder="Resource ID"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs"
            />
            <input
              type="text"
              value={searchResourceName}
              onChange={(e) => setSearchResourceName(e.target.value)}
              placeholder="Resource Name"
              className="border border-gray-300 rounded px-3 py-1.5 text-xs"
            />
          </div>

          <div className="border border-gray-300 rounded bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
            {/* Import Buttons with Dynamic Count */}
            <div className="flex justify-end items-center gap-2 mb-2">
              <input
                type="file"
                ref={poInfoFileInputRef}
                onChange={handleImportPOInfo}
                accept=".xlsx,.xls"
                style={{ display: "none" }}
              />
              <button
                onClick={() => poInfoFileInputRef.current.click()}
                disabled={selectedRows.length === 0}
                className={`px-3 py-1.5 rounded text-xs font-normal shadow transition ${
                  selectedRows.length === 0
                    ? "bg-gray-400  text-black cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Import-PO-Info ({selectedRows.length})
              </button>

              <input
                type="file"
                ref={vendorMasterFileInputRef}
                onChange={handleImportVendorMaster}
                accept=".xlsx,.xls"
                style={{ display: "none" }}
              />
              <button
                onClick={() => vendorMasterFileInputRef.current.click()}
                disabled={selectedRows.length === 0}
                className={`px-3 py-1.5 rounded text-xs font-normal shadow transition ${
                  selectedRows.length === 0
                    ? "bg-gray-400 text-black cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Import-Vendor-Master ({selectedRows.length})
              </button>
            </div>

            <div className="relative">
              <div className="overflow-x-auto max-h-[75vh] mt-1">
                <table className="w-full text-xs border-collapse">
                  <thead className="sticky top-0 bg-blue-50">
                    <tr>
                      {groupColumns.map((col) => (
                        <th
                          key={col}
                          className="border p-2 font-bold text-blue-800 text-center whitespace-nowrap bg-blue-50 cursor-pointer select-none"
                          onClick={() =>
                            col !== "Actions" &&
                            col !== "All" &&
                            handleSort(col)
                          }
                        >
                          {col === "All" ? (
                            <input
                              type="checkbox"
                              checked={selectAll}
                              onChange={handleSelectAll}
                              className="cursor-pointer w-4 h-4"
                            />
                          ) : (
                            <span>
                              {col}
                              {col !== "Actions" && getSortIcon(col)}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading && !editingRowId ? (
                      <tr>
                        <td
                          colSpan={groupColumns.length}
                          className="text-center p-5 italic text-gray-500"
                        >
                          Loading...
                        </td>
                      </tr>
                    ) : processedRows.length > 0 ? (
                      processedRows.map((row) => (
                        <tr
                          key={row.id}
                          className={
                            editingRowId === row.id
                              ? "bg-blue-50"
                              : "bg-white hover:bg-gray-50"
                          }
                        >
                          {groupColumns.map((col) => {
                            if (col === "All") {
                              return (
                                <td
                                  key={col}
                                  className="border p-1 text-center whitespace-nowrap"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(row.id)}
                                    onChange={() =>
                                      handleCheckboxChange(row.id)
                                    }
                                    className="cursor-pointer w-4 h-4"
                                  />
                                </td>
                              );
                            }
                            if (col === "Actions") {
                              return (
                                <td
                                  key={col}
                                  className="border p-1 text-center whitespace-nowrap"
                                >
                                  {editingRowId === row.id && (
                                    <div className="flex gap-2 justify-center">
                                      <button
                                        onClick={handleSaveRecord}
                                        className="font-semibold text-green-600 hover:text-green-800"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={handleCancelAdd}
                                        className="font-semibold text-red-600 hover:text-red-800"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  )}
                                </td>
                              );
                            }
                            return (
                              <td
                                key={col}
                                className="border p-1 text-center whitespace-nowrap"
                              >
                                {editingRowId === row.id ? (
                                  <input
                                    type={
                                      col === "Email ID"
                                        ? "email"
                                        : col === "Hourly Rate" ||
                                          col.includes("Number") ||
                                          col.includes("ID")
                                        ? "number"
                                        : col.includes("date")
                                        ? "date"
                                        : "text"
                                    }
                                    name={col}
                                    value={editedRowData[col] || ""}
                                    onChange={handleEditChange}
                                    className="w-full p-1.5 text-xs border rounded bg-white"
                                    placeholder={col}
                                    step={col === "Hourly Rate" ? "0.01" : "1"}
                                    min={
                                      [
                                        "Release Number",
                                        "PO Line Number",
                                        "Resource ID",
                                        "PM USER_ID",
                                        "Hourly Rate",
                                      ].includes(col)
                                        ? "0"
                                        : undefined
                                    }
                                    onKeyDown={
                                      [
                                        "Release Number",
                                        "PO Line Number",
                                        "Resource ID",
                                        "PM USER_ID",
                                        "Hourly Rate",
                                      ].includes(col)
                                        ? handleKeyDown
                                        : undefined
                                    }
                                  />
                                ) : (
                                  row[col]
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))
                    ) : (
                      !loading &&
                      !editingRowId && (
                        <tr>
                          <td
                            colSpan={groupColumns.length}
                            className="text-center p-5 italic text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

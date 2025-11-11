import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { CheckSquare } from "lucide-react";
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

  const [searchPO, setSearchPO] = useState("");
  const [searchResourceId, setSearchResourceId] = useState("");
  const [searchResourceName, setSearchResourceName] = useState("");

  //import
  const [selectedFile, setSelectedFile] = useState(null);
  const [importLoading, setImportLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedUserFile, setSelectedUserFile] = useState(null);

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
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response failed");
      const apiData = await response.json();

      const mappedData = Array.isArray(apiData)
        ? apiData.map((item) => ({
            id: item.id,
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

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  const processedRows = rows.filter((row) => {
    return (
      (row["Purchase Order"] || "")
        .toLowerCase()
        .includes(searchPO.trim().toLowerCase()) &&
      (row["Resource ID"] || "")
        .toLowerCase()
        .includes(searchResourceId.trim().toLowerCase()) &&
      (row["Resource Name"] || "")
        .toLowerCase()
        .includes(searchResourceName.trim().toLowerCase())
    );
  });

  const handleImportPOInfo = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      showToast("No file selected", "error");
      return;
    }

    // Validate file extension
    const allowedExtensions = [".csv", ".xls", ".xlsx", ".xlsm", ".xlsb"];
    const fileName = selectedFile.name.toLowerCase();

    if (!allowedExtensions.some((ext) => fileName.endsWith(ext))) {
      showToast("Please select a CSV or Excel file", "error");
      return;
    }

    setImportLoading(true);

    try {
      // Fetch presigned URL for upload
      const presignResp = await fetch(
        `${backendUrl}/api/PurchaseOrders/GetPresignedUrl/${encodeURIComponent(
          selectedFile.name
        )}`
      );

      if (!presignResp.ok) {
        throw new Error(
          `Failed to get presigned URL (status: ${presignResp.status})`
        );
      }

      const presignedUrl = await presignResp.text();

      // Upload file via PUT to presigned S3 URL
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Upload to S3 failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      // Call backend import API that processes the uploaded file
      setLoading(true);
      try {
        const importResponse = await fetch(
          `${backendUrl}/api/PurchaseOrders/import-excel-s3?filename=${encodeURIComponent(
            selectedFile.name
          )}&Username=${encodeURIComponent(currentUser?.name || "")}`,
          { method: "POST" }
        );

        if (!importResponse.ok) {
          throw new Error(
            `Import API call failed: ${importResponse.status} ${importResponse.statusText}`
          );
        }

        const contentType = importResponse.headers.get("content-type") || "";

        if (
          contentType.includes("text/csv") ||
          contentType.includes("text/plain")
        ) {
          const csvText = await importResponse.text();
          const downloadedFileName = `imported_${selectedFile.name.replace(
            /\.(csv|xls|xlsx|xlsm|xlsb)$/i,
            ""
          )}_${Date.now()}.csv`;
          downloadCSV(csvText, downloadedFileName);
          showToast("Import skipped with CSV output", "error");
        } else {
          showToast("Import successful", "success");
        }
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload/import error:", error);
      showToast("Upload or import failed: " + error.message, "error");
    } finally {
      setImportLoading(false);
      setSelectedFile(null);
      if (poInfoFileInputRef.current) poInfoFileInputRef.current.value = "";
    }
  };

  const handleImportVendorMaster = async (e) => {
    e.preventDefault();

    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      showToast("No file selected", "error");
      return;
    }

    // Validate file extension
    const allowedExtensions = [".csv", ".xls", ".xlsx", ".xlsm", ".xlsb"];
    const fileName = selectedFile.name.toLowerCase();

    if (!allowedExtensions.some((ext) => fileName.endsWith(ext))) {
      showToast("Please select a CSV or Excel file", "error");
      return;
    }

    setUserLoading(true);

    try {
      // Fetch presigned URL for upload
      const presignResp = await fetch(
        `${backendUrl}/api/PurchaseOrders/GetPresignedUrl/${encodeURIComponent(
          selectedFile.name
        )}`
      );

      if (!presignResp.ok) {
        throw new Error(
          `Failed to get presigned URL (status: ${presignResp.status})`
        );
      }

      const presignedUrl = await presignResp.text();

      // Upload file via PUT to presigned S3 URL
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type || "application/octet-stream",
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error(
          `Upload to S3 failed: ${uploadResponse.status} ${uploadResponse.statusText}`
        );
      }

      // Call backend import API that processes the uploaded file
      setLoading(true);
      try {
        const importResponse = await fetch(
          `${backendUrl}/api/PurchaseOrders/import-venor-master-s3?filename=${encodeURIComponent(
            selectedFile.name
          )}&Username=${encodeURIComponent(currentUser?.name || "")}`,
          { method: "POST" }
        );

        if (!importResponse.ok) {
          throw new Error(
            `Import API call failed: ${importResponse.status} ${importResponse.statusText}`
          );
        }

        const contentType = importResponse.headers.get("content-type") || "";

        if (
          contentType.includes("text/csv") ||
          contentType.includes("text/plain")
        ) {
          const csvText = await importResponse.text();
          const downloadedFileName = `imported_${selectedFile.name.replace(
            /\.(csv|xls|xlsx|xlsm|xlsb)$/i,
            ""
          )}_${Date.now()}.csv`;
          downloadCSV(csvText, downloadedFileName);
          showToast("Import skipped with CSV output", "error");
        } else {
          showToast("Import successful", "success");
        }
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload/import error:", error);
      showToast("Upload or import failed: " + error.message, "error");
    } finally {
      setUserLoading(false);
      setSelectedFile(null);
      if (vendorMasterFileInputRef.current)
        vendorMasterFileInputRef.current.value = "";
    }
  };

  function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-grey-200 flex flex-col pr-4 mx-auto">
      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-8 px-6 py-4">
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-4 px-1">
            <div className="flex items-center">
              <CheckSquare className="h-8 w-8 text-green-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Purchase Orders Information
              </h1>
            </div>
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
                disabled={importLoading}
              />
              <button
                onClick={() => poInfoFileInputRef.current.click()}
                disabled={importLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-normal shadow transition"
              >
                {importLoading ? "Processing..." : "Import-PO-Info"}
              </button>

              <input
                type="file"
                ref={vendorMasterFileInputRef}
                onChange={handleImportVendorMaster}
                accept=".xlsx,.xls"
                style={{ display: "none" }}
                disabled={userLoading}
              />
              <button
                onClick={() => vendorMasterFileInputRef.current.click()}
                disabled={userLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-xs font-normal shadow transition"
              >
                {userLoading ? "Processing..." : "Import-Vendor-Master"}
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
                        >
                          <span>{col}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
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
                        <tr key={row.id} className="bg-white hover:bg-gray-50">
                          {groupColumns.map((col) => (
                            <td
                              key={col}
                              className="border p-1 text-center whitespace-nowrap"
                            >
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={groupColumns.length}
                          className="text-center p-5 italic text-gray-500"
                        >
                          No data available
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
      <ToastContainer />
    </div>
  );
}

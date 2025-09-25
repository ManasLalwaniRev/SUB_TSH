// import React, { useState, useEffect } from "react";
// import { Receipt, Filter, Download, X, Eye } from "lucide-react";
// import InvoiceViewer from "./InvoiceViewer";

// export default function InvoiceExport() {
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
//   const [selectedInvoices, setSelectedInvoices] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [previewModalVisible, setPreviewModalVisible] = useState(false);
//   const [previewData, setPreviewData] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   // Get user role from localStorage (set during login)
//   useEffect(() => {
//     const getUserRole = () => {
//       try {
//         // Try to get from loginResponse first
//         const loginResponse = localStorage.getItem("loginResponse");
//         if (loginResponse) {
//           const parsedResponse = JSON.parse(loginResponse);
//           setUserRole(parsedResponse.role?.toLowerCase() || "user");
//           return;
//         }

//         // Fallback: try userData
//         const userData = localStorage.getItem("userData");
//         if (userData) {
//           const parsedUserData = JSON.parse(userData);
//           setUserRole(parsedUserData.role?.toLowerCase() || "user");
//           return;
//         }

//         // Fallback: try individual userRole
//         const storedRole = localStorage.getItem("userRole");
//         if (storedRole) {
//           setUserRole(storedRole.toLowerCase());
//           return;
//         }

//         // Default fallback - temporarily set to admin for testing
//         setUserRole("admin"); // Change this back to 'user' for production
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         setUserRole("admin"); // Change this back to 'user' for production
//       }
//     };

//     getUserRole();
//   }, []);

//   // Fetch invoices from API
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://timesheet-subk.onrender.com/api/Invoices"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setInvoices(data);
//         setFilteredInvoices(data);
//       } catch (err) {
//         console.error("Error fetching invoices:", err);
//         setError(err.message || "Failed to fetch invoices");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   // Filter invoices based on invoice number filter
//   useEffect(() => {
//     let filtered = invoices;

//     // Filter by invoice number
//     if (filterInvoiceNumber) {
//       filtered = filtered.filter(
//         (invoice) =>
//           invoice.invoiceNumber &&
//           invoice.invoiceNumber
//             .toLowerCase()
//             .includes(filterInvoiceNumber.toLowerCase())
//       );
//     }

//     setFilteredInvoices(filtered);
//     // Reset selections when filter changes
//     setSelectedInvoices(new Set());
//     setSelectAll(false);
//   }, [invoices, filterInvoiceNumber]);

//   // Dynamic table container style based on content
//   const getTableContainerStyle = () => {
//     const headerHeight = 120; // Header section height
//     const filterHeight = 80; // Filter section height
//     const padding = 48; // Top and bottom padding (24px each)
//     const margin = 24; // Margin
//     const footerSpace = 20; // Space for any footer content

//     // Calculate minimum height needed for the content
//     const rowHeight = 61; // Approximate height per row (including border)
//     const headerRowHeight = 48; // Header row height
//     const minContentHeight =
//       headerRowHeight + filteredInvoices.length * rowHeight;

//     // Calculate available space
//     const availableHeight =
//       window.innerHeight -
//       headerHeight -
//       filterHeight -
//       padding -
//       margin -
//       footerSpace;

//     // Use the smaller of content height or available height, with reasonable limits
//     const dynamicHeight = Math.min(
//       Math.max(minContentHeight, 200), // Minimum 200px
//       Math.max(availableHeight, 400) // Maximum available space, but at least 400px
//     );

//     return {
//       height: `${dynamicHeight}px`,
//       minHeight: "200px",
//       maxHeight: `calc(100vh - ${
//         headerHeight + filterHeight + padding + margin + footerSpace
//       }px)`,
//     };
//   };

//   // Alternative: Get table wrapper style that adjusts to content
//   const getTableWrapperStyle = () => {
//     // If there are few items, don't use fixed height
//     if (filteredInvoices.length <= 5) {
//       return {
//         minHeight: "200px",
//         maxHeight: "calc(100vh - 300px)", // Just prevent it from being too tall
//       };
//     }

//     // For more items, use scrollable container
//     return {
//       height: "calc(100vh - 300px)",
//       minHeight: "400px",
//     };
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${month}-${day}-${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   // Format currency helper
//   const formatCurrency = (amount, currency = "USD") => {
//     if (!amount && amount !== 0) return "N/A";
//     try {
//       return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: currency || "USD",
//       }).format(amount);
//     } catch {
//       return `${currency || "$"} ${amount}`;
//     }
//   };

//   // Calculate selectable invoices (only those that are not exported)
//   const selectableInvoices = filteredInvoices.filter(
//     (invoice) => !invoice.isExported
//   );
//   const disabledInvoices = filteredInvoices.filter(
//     (invoice) => invoice.isExported
//   );

//   // Handle select all checkbox
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//       // Only select invoices that are not exported (isExported: false)
//       const allSelectableIds = new Set(
//         selectableInvoices.map(
//           (invoice, index) =>
//             invoice.invoiceId || filteredInvoices.indexOf(invoice)
//         )
//       );
//       setSelectedInvoices(allSelectableIds);
//     } else {
//       setSelectedInvoices(new Set());
//     }
//   };

//   // Handle individual checkbox
//   const handleSelectInvoice = (invoiceId, checked, invoice) => {
//     // Prevent selection if invoice is exported
//     if (invoice && invoice.isExported) return;

//     setSelectedInvoices((prev) => {
//       const newSelected = new Set(prev);
//       if (checked) {
//         newSelected.add(invoiceId);
//       } else {
//         newSelected.delete(invoiceId);
//       }

//       // Update select all state - check if all selectable invoices are selected
//       const allSelectableSelected =
//         selectableInvoices.length > 0 &&
//         selectableInvoices.every((inv) => {
//           const id = inv.invoiceId || filteredInvoices.indexOf(inv);
//           return newSelected.has(id);
//         });
//       setSelectAll(allSelectableSelected);

//       return newSelected;
//     });
//   };

//   // Handle unexport (reopen) invoice - only for admin
//   const handleUnexport = async (invoice) => {
//     if (userRole !== "admin") {
//       alert("Access denied. Admin privileges required.");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to reopen invoice ${invoice.invoiceNumber}?`
//     );
//     if (!confirmed) return;

//     try {
//       // Show loading state
//       const openButton = document.querySelector(
//         `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
//       );
//       if (openButton) {
//         openButton.disabled = true;
//         openButton.textContent = "Opening...";
//       }

//       // Prepare the request body with the current invoice data
//       const requestBody = {
//         invoiceId: invoice.invoiceId || invoice.id || 0,
//         invoiceNumber: invoice.invoiceNumber || "string",
//         po_Number: invoice.po_Number || invoice.poNumber || "string",
//         invoiceDate: invoice.invoiceDate || new Date().toISOString(),
//         invoiceAmount: invoice.invoiceAmount || 0,
//         currency: invoice.currency || "USD",
//         createdAt: invoice.createdAt || new Date().toISOString(),
//         createdBy: invoice.createdBy || "string",
//         updatedAt: new Date().toISOString(),
//         updatedBy: "admin", // or get from current user context
//         billTo: invoice.billTo || "string",
//         remitTo: invoice.remitTo || "string",
//         isExported: false, // This is the key change - setting to false to reopen
//         invoiceTimesheetLines: invoice.invoiceTimesheetLines || [],
//       };

//       // API call to update the invoice using the correct endpoint
//       const response = await fetch(
//         `https://timesheet-subk.onrender.com/api/Invoices/${
//           invoice.invoiceId || invoice.id
//         }`,
//         {
//           method: "PUT", // Using PUT as per the API structure
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `HTTP ${response.status}: ${errorText || response.statusText}`
//         );
//       }

//       // Check if response has content
//       let result = null;
//       const contentType = response.headers.get("Content-Type");
//       if (contentType && contentType.includes("application/json")) {
//         result = await response.json();
//       }

//       console.log("Invoice reopened successfully:", result);

//       // Update the local state
//       setInvoices((prev) =>
//         prev.map((inv) =>
//           (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
//             ? { ...inv, isExported: false }
//             : inv
//         )
//       );

//       setFilteredInvoices((prev) =>
//         prev.map((inv) =>
//           (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
//             ? { ...inv, isExported: false }
//             : inv
//         )
//       );

//       alert(`Invoice ${invoice.invoiceNumber} has been reopened successfully!`);
//     } catch (error) {
//       console.error("Error reopening invoice:", error);

//       // More specific error messages
//       let errorMessage = "Failed to reopen invoice: ";
//       if (error.message.includes("404")) {
//         errorMessage += "Invoice not found or endpoint not available.";
//       } else if (error.message.includes("403")) {
//         errorMessage += "Access denied. Please check your permissions.";
//       } else if (error.message.includes("401")) {
//         errorMessage += "Authentication failed. Please log in again.";
//       } else {
//         errorMessage += error.message;
//       }

//       alert(errorMessage);
//     } finally {
//       // Reset button state
//       const openButton = document.querySelector(
//         `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
//       );
//       if (openButton) {
//         openButton.disabled = false;
//         openButton.textContent = "OPEN";
//       }
//     }
//   };

//   // Handle preview click
//   const handlePreview = async (invoice) => {
//     try {
//       setPreviewModalVisible(true);
//       setPreviewData(null);

//       const response = await fetch(
//         `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//           invoice.invoiceNumber
//         )}`
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//       }

//       const apiData = await response.json();

//       const transformedData = [
//         {
//           invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
//           invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
//           period: formatDate(
//             apiData.period || apiData.invoiceDate || invoice.invoiceDate
//           ),
//           currency: apiData.currency || invoice.currency || "USD",
//           totalAmount:
//             apiData.totalAmount ||
//             apiData.invoiceAmount ||
//             invoice.invoiceAmount ||
//             0,

//           lineItems: (
//             apiData.lineItems ||
//             apiData.invoiceTimesheetLines ||
//             []
//           ).map((item, index) => ({
//             poLine: item.poLine || item.timesheetLineNo || "",
//             plc: item.plc || "",
//             vendor: item.vendor || "",
//             employee: item.employee || item.createdBy || "",
//             hours: item.hours || item.mappedHours,
//             rate:
//               item.rate,
//             amount: item.amount || item.mappedAmount,
//             line_No: item.line_No || item.timesheetLineNo || index + 1,
//           })),

//           billTo:
//             apiData.billTo ||
//             "",
//           buyer: apiData.buyer || "",
//           purchaseOrderId: apiData.purchaseOrderId || "",
//           releaseNumber: apiData.releaseNumber || "",
//           changeOrderNumber: apiData.changeOrderNumber || "0",
//           poStartEndDate: apiData.poStartEndDate || "",
//           remitTo:
//             apiData.remitTo ||
//             "",
//           terms: apiData.terms || "",
//           amountDue:
//             apiData.amountDue ||
//             apiData.totalAmount ||
//             apiData.invoiceAmount ||
//             invoice.invoiceAmount ||
//             0,
//         },
//       ];

//       setPreviewData(transformedData);
//     } catch (error) {
//       console.error("Error fetching invoice preview:", error);
//       alert(`Failed to load invoice preview: ${error.message}`);

//       const fallbackData = [
//         {
//           invoiceId: invoice.invoiceNumber,
//           invoiceDate: formatDate(invoice.invoiceDate),
//           period: formatDate(invoice.invoiceDate),
//           currency: invoice.currency || "USD",
//           totalAmount: invoice.invoiceAmount || 0,
//           lineItems: [],
//           billTo:"",
//           buyer: "",
//           purchaseOrderId: "",
//           releaseNumber: "",
//           changeOrderNumber: "",
//           poStartEndDate: "",
//           remitTo: "",
//           terms: "",
//           amountDue: invoice.invoiceAmount || 0,
//         },
//       ];

//       setPreviewData(fallbackData);
//     }
//   };

//   // Export function (keeping your existing export logic)
//   // const exportToCSV = async () => {
//   //   const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//   //     selectedInvoices.has(invoice.invoiceId || index)
//   //   );

//   //   if (invoicesToExport.length === 0) {
//   //     alert("Please select invoices to export");
//   //     return;
//   //   }

//   //   try {
//   //     const exportButton = document.querySelector("[data-export-button]");
//   //     if (exportButton) {
//   //       exportButton.disabled = true;
//   //       exportButton.innerHTML =
//   //         '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//   //     }

//   //     for (let i = 0; i < invoicesToExport.length; i++) {
//   //       const invoice = invoicesToExport[i];
//   //       const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//   //       if (!invoiceId) {
//   //         console.warn(
//   //           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//   //         );
//   //         continue;
//   //       }

//   //       try {
//   //         const columnHeaderValues = [
//   //           invoice.invoiceNumber || "",
//   //           formatDate(invoice.invoiceDate) || "",
//   //           invoice.invoiceAmount || 0,
//   //           invoice.currency || "USD",
//   //           formatDate(invoice.createdAt) || "",
//   //           "PLC001",
//   //           invoice.createdBy || "Employee",
//   //           "40.00",
//   //           ((invoice.invoiceAmount || 0) / 40).toFixed(2),
//   //           "0.00",
//   //           (invoice.invoiceAmount || 0).toFixed(2),
//   //           "40.00",
//   //           (invoice.invoiceAmount || 0).toFixed(2),
//   //         ];

//   //         const payload = {
//   //           ColumnHeaderValues: columnHeaderValues,
//   //           IncludeHeaders: true,
//   //           ExportFormat: "CSV",
//   //         };

//   //         const response = await fetch(
//   //           `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
//   //             invoiceId
//   //           )}`,
//   //           {
//   //             method: "POST",
//   //             headers: {
//   //               Accept:
//   //                 "text/csv, application/csv, application/octet-stream, */*",
//   //               "Content-Type": "application/json",
//   //             },
//   //             // body: JSON.stringify(payload)
//   //           }
//   //         );

//   //         if (!response.ok) {
//   //           let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//   //           try {
//   //             const errorData = await response.text();
//   //             if (errorData) {
//   //               errorMessage += ` - ${errorData}`;
//   //             }
//   //           } catch (e) {
//   //             // Ignore if can't parse error
//   //           }
//   //           throw new Error(errorMessage);
//   //         }

//   //         const blob = await response.blob();

//   //         if (blob.type && blob.type.includes("application/json")) {
//   //           const text = await blob.text();
//   //           console.error("Received JSON instead of file:", text);
//   //           throw new Error("Server returned an error instead of a file");
//   //         }

//   //         let filename = `invoice_${invoiceId}_export.csv`;
//   //         const contentDisposition = response.headers.get(
//   //           "Content-Disposition"
//   //         );
//   //         if (contentDisposition) {
//   //           const filenameMatch = contentDisposition.match(
//   //             /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
//   //           );
//   //           if (filenameMatch && filenameMatch[1]) {
//   //             filename = filenameMatch[1].replace(/['"]/g, "");
//   //           }
//   //         }

//   //         const url = window.URL.createObjectURL(blob);
//   //         const link = document.createElement("a");
//   //         link.href = url;
//   //         link.download = filename;
//   //         link.style.display = "none";
//   //         document.body.appendChild(link);
//   //         link.click();

//   //         window.URL.revokeObjectURL(url);
//   //         document.body.removeChild(link);

//   //         if (i < invoicesToExport.length - 1) {
//   //           await new Promise((resolve) => setTimeout(resolve, 500));
//   //         }
//   //       } catch (invoiceError) {
//   //         console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//   //         alert(
//   //           `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
//   //         );
//   //       }
//   //     }

//   //     const successMessage =
//   //       invoicesToExport.length === 1
//   //         ? "Invoice exported successfully!"
//   //         : `${invoicesToExport.length} invoices exported successfully!`;

//   //     alert(successMessage);
//   //   } catch (error) {
//   //     console.error("Error during export process:", error);
//   //     alert(`Export failed: ${error.message}`);
//   //   } finally {
//   //     const exportButton = document.querySelector("[data-export-button]");
//   //     if (exportButton) {
//   //       exportButton.disabled = false;
//   //       exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//   //     }
//   //   }
//   // };
//   const exportToCSV = async () => {
//     const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//       selectedInvoices.has(invoice.invoiceId || index)
//     );

//     if (invoicesToExport.length === 0) {
//       alert("Please select invoices to export");
//       return;
//     }

//     try {
//       const exportButton = document.querySelector("[data-export-button]");
//       if (exportButton) {
//         exportButton.disabled = true;
//         exportButton.innerHTML =
//           '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//       }

//       // Track successfully exported invoices for state update
//       const successfullyExportedIds = [];

//       for (let i = 0; i < invoicesToExport.length; i++) {
//         const invoice = invoicesToExport[i];
//         const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//         if (!invoiceId) {
//           console.warn(
//             `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//           );
//           continue;
//         }

//         try {
//           const columnHeaderValues = [
//             invoice.invoiceNumber || "",
//             formatDate(invoice.invoiceDate) || "",
//             invoice.invoiceAmount || 0,
//             invoice.currency || "USD",
//             formatDate(invoice.createdAt) || "",
//             "",
//             invoice.createdBy || "Employee",
//             "40.00",
//             ((invoice.invoiceAmount || 0) / 40).toFixed(2),
//             "0.00",
//             (invoice.invoiceAmount || 0).toFixed(2),
//             "40.00",
//             (invoice.invoiceAmount || 0).toFixed(2),
//           ];

//           const payload = {
//             ColumnHeaderValues: columnHeaderValues,
//             IncludeHeaders: true,
//             ExportFormat: "CSV",
//           };

//           const response = await fetch(
//             `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
//               invoiceId
//             )}`,
//             {
//               method: "POST",
//               headers: {
//                 Accept:
//                   "text/csv, application/csv, application/octet-stream, */*",
//                 "Content-Type": "application/json",
//               },
//               // body: JSON.stringify(payload)
//             }
//           );

//           if (!response.ok) {
//             let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//             try {
//               const errorData = await response.text();
//               if (errorData) {
//                 errorMessage += ` - ${errorData}`;
//               }
//             } catch (e) {
//               // Ignore if can't parse error
//             }
//             throw new Error(errorMessage);
//           }

//           const blob = await response.blob();

//           if (blob.type && blob.type.includes("application/json")) {
//             const text = await blob.text();
//             console.error("Received JSON instead of file:", text);
//             throw new Error("Server returned an error instead of a file");
//           }

//           let filename = `invoice_${invoiceId}_export.csv`;
//           const contentDisposition = response.headers.get(
//             "Content-Disposition"
//           );
//           if (contentDisposition) {
//             const filenameMatch = contentDisposition.match(
//               /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
//             );
//             if (filenameMatch && filenameMatch[1]) {
//               filename = filenameMatch[1].replace(/['"]/g, "");
//             }
//           }

//           const url = window.URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = filename;
//           link.style.display = "none";
//           document.body.appendChild(link);
//           link.click();

//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(link);

//           // Mark this invoice as successfully exported
//           successfullyExportedIds.push(invoice.invoiceId);

//           // **NEW: Update invoice export status in database**
//           try {
//             const updateResponse = await fetch(
//               `https://timesheet-subk.onrender.com/api/Invoices/${invoice.invoiceId}`,
//               {
//                 method: "PUT",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   ...invoice,
//                   isExported: true, // Mark as exported
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin", // or get from current user context
//                 }),
//               }
//             );

//             if (!updateResponse.ok) {
//               console.warn(
//                 `Failed to update export status for invoice ${invoiceId}`
//               );
//             }
//           } catch (updateError) {
//             console.warn(
//               `Error updating export status for invoice ${invoiceId}:`,
//               updateError
//             );
//           }

//           if (i < invoicesToExport.length - 1) {
//             await new Promise((resolve) => setTimeout(resolve, 500));
//           }
//         } catch (invoiceError) {
//           console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//           alert(
//             `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
//           );
//         }
//       }

//       // **NEW: Update local state for successfully exported invoices**
//       if (successfullyExportedIds.length > 0) {
//         setInvoices((prev) =>
//           prev.map((inv) =>
//             successfullyExportedIds.includes(inv.invoiceId)
//               ? {
//                   ...inv,
//                   isExported: true,
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin",
//                 }
//               : inv
//           )
//         );

//         setFilteredInvoices((prev) =>
//           prev.map((inv) =>
//             successfullyExportedIds.includes(inv.invoiceId)
//               ? {
//                   ...inv,
//                   isExported: true,
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin",
//                 }
//               : inv
//           )
//         );

//         // Clear selections for exported invoices since they can't be selected anymore
//         setSelectedInvoices((prev) => {
//           const newSelected = new Set(prev);
//           successfullyExportedIds.forEach((id) => newSelected.delete(id));
//           return newSelected;
//         });

//         // Update select all checkbox state
//         const remainingSelectableInvoices = filteredInvoices.filter(
//           (inv) =>
//             !successfullyExportedIds.includes(inv.invoiceId) && !inv.isExported
//         );
//         setSelectAll(false); // Reset select all since exported invoices are deselected
//       }

//       const successMessage =
//         invoicesToExport.length === 1
//           ? "Invoice exported successfully!"
//           : `${invoicesToExport.length} invoices exported successfully!`;

//       alert(successMessage);
//     } catch (error) {
//       console.error("Error during export process:", error);
//       alert(`Export failed: ${error.message}`);
//     } finally {
//       const exportButton = document.querySelector("[data-export-button]");
//       if (exportButton) {
//         exportButton.disabled = false;
//         exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="ml-48 flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading invoices...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="ml-48 flex-1 flex items-center justify-center">
//         <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//           <div className="text-red-600 mb-4">
//             <Receipt className="h-12 w-12 mx-auto mb-2" />
//             <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//           </div>
//           <p className="text-red-700">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Receipt className="h-8 w-8 text-green-600 mr-3" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Invoice Export
//                 </h1>
//                 <p className="text-gray-600">
//                   Manage and export invoice data
//                   {/* {userRole === 'admin' && (
//                                         <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                                             Admin Mode
//                                         </span>
//                                     )} */}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={exportToCSV}
//                 disabled={selectedInvoices.size === 0}
//                 data-export-button
//                 className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//                   selectedInvoices.size === 0
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Export ({selectedInvoices.size})
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white border-b border-gray-200 p-4 -mx-6">
//           <div className="flex items-center justify-start">
//             <div className="w-80 relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Filter by Invoice Number"
//                 value={filterInvoiceNumber}
//                 onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             {filterInvoiceNumber && (
//               <button
//                 onClick={() => setFilterInvoiceNumber("")}
//                 className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Table Container with Dynamic Height */}
//         <div className="flex-1 mt-6 pb-6">
//           {filteredInvoices.length === 0 ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="text-center text-gray-500">
//                 <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                 <p className="text-lg font-medium">No invoices found</p>
//                 <p className="text-sm">Try adjusting your filter criteria</p>
//               </div>
//             </div>
//           ) : (
//             <div
//               className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto overflow-y-auto"
//               style={getTableWrapperStyle()}
//             >
//               <table className="min-w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={selectAll}
//                           onChange={(e) => handleSelectAll(e.target.checked)}
//                           disabled={selectableInvoices.length === 0}
//                           className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//                             selectableInvoices.length === 0
//                               ? "opacity-50 cursor-not-allowed"
//                               : disabledInvoices.length > 0
//                               ? "opacity-75"
//                               : "cursor-pointer"
//                           }`}
//                         />
//                         <span className="text-xs font-medium text-gray-500 tracking-wider">
//                           All
//                         </span>
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Invoice Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Vendor
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Invoice Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Currency
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Created At
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredInvoices.map((invoice, index) => {
//                     const invoiceId = invoice.invoiceId || invoice.id || index;
//                     return (
//                       <tr
//                         key={invoiceId}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="checkbox"
//                             checked={selectedInvoices.has(invoiceId)}
//                             onChange={(e) =>
//                               handleSelectInvoice(
//                                 invoiceId,
//                                 e.target.checked,
//                                 invoice
//                               )
//                             }
//                             disabled={invoice.isExported}
//                             className={`h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//                               invoice.isExported
//                                 ? "opacity-50 cursor-not-allowed bg-gray-100"
//                                 : "cursor-pointer hover:bg-green-50"
//                             }`}
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                           {invoice.invoiceNumber || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                           {invoice.invoiceTimesheetLines?.[0]?.vendor || "N/A"}
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           {formatDate(invoice.invoiceDate)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
//                           {formatCurrency(
//                             invoice.invoiceAmount,
//                             invoice.currency
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
//                             {invoice.currency || "USD"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           {formatDate(invoice.createdAt)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => handlePreview(invoice)}
//                               className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
//                             >
//                               <Eye className="h-4 w-4 mr-1" />
//                               Preview
//                             </button>

//                             {/* OPEN button - only for admin and exported invoices */}
//                             {userRole === "admin" && invoice.isExported && (
//                               <button
//                                 onClick={() => handleUnexport(invoice)}
//                                 data-open-invoice={
//                                   invoice.invoiceId || invoice.id
//                                 }
//                                 className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-medium"
//                               >
//                                 OPEN
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Preview Modal */}
//       {previewModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Invoice Preview
//               </h2>
//               <button
//                 onClick={() => setPreviewModalVisible(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="p-6">
//               <InvoiceViewer
//                 data={previewData}
//                 setInvoiceModalVisible={setPreviewModalVisible}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Receipt, Filter, Download, X, Eye } from "lucide-react";
// import InvoiceViewer from "./InvoiceViewer";

// export default function InvoiceExport() {
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
//   const [selectedInvoices, setSelectedInvoices] = useState(new Set());
//   const [selectAll, setSelectAll] = useState(false);
//   const [previewModalVisible, setPreviewModalVisible] = useState(false);
//   const [previewData, setPreviewData] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   // Get user role from localStorage (set during login)
//   useEffect(() => {
//     const getUserRole = () => {
//       try {
//         // Try to get from loginResponse first
//         const loginResponse = localStorage.getItem("loginResponse");
//         if (loginResponse) {
//           const parsedResponse = JSON.parse(loginResponse);
//           setUserRole(parsedResponse.role?.toLowerCase() || "user");
//           return;
//         }

//         // Fallback: try userData
//         const userData = localStorage.getItem("userData");
//         if (userData) {
//           const parsedUserData = JSON.parse(userData);
//           setUserRole(parsedUserData.role?.toLowerCase() || "user");
//           return;
//         }

//         // Fallback: try individual userRole
//         const storedRole = localStorage.getItem("userRole");
//         if (storedRole) {
//           setUserRole(storedRole.toLowerCase());
//           return;
//         }

//         // Default fallback - temporarily set to admin for testing
//         setUserRole("admin"); // Change this back to 'user' for production
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//         setUserRole("admin"); // Change this back to 'user' for production
//       }
//     };

//     getUserRole();
//   }, []);

//   // Fetch invoices from API
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://timesheet-subk.onrender.com/api/Invoices"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setInvoices(data);
//         setFilteredInvoices(data);
//       } catch (err) {
//         console.error("Error fetching invoices:", err);
//         setError(err.message || "Failed to fetch invoices");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInvoices();
//   }, []);

//   // Filter invoices based on invoice number filter
//   useEffect(() => {
//     let filtered = invoices;

//     // Filter by invoice number
//     if (filterInvoiceNumber) {
//       filtered = filtered.filter(
//         (invoice) =>
//           invoice.invoiceNumber &&
//           invoice.invoiceNumber
//             .toLowerCase()
//             .includes(filterInvoiceNumber.toLowerCase())
//       );
//     }

//     setFilteredInvoices(filtered);
//     // Reset selections when filter changes
//     setSelectedInvoices(new Set());
//     setSelectAll(false);
//   }, [invoices, filterInvoiceNumber]);

//   // Dynamic table container style based on content
//   const getTableContainerStyle = () => {
//     const headerHeight = 120; // Header section height
//     const filterHeight = 80; // Filter section height
//     const padding = 48; // Top and bottom padding (24px each)
//     const margin = 24; // Margin
//     const footerSpace = 20; // Space for any footer content

//     // Calculate minimum height needed for the content
//     const rowHeight = 61; // Approximate height per row (including border)
//     const headerRowHeight = 48; // Header row height
//     const minContentHeight =
//       headerRowHeight + filteredInvoices.length * rowHeight;

//     // Calculate available space
//     const availableHeight =
//       window.innerHeight -
//       headerHeight -
//       filterHeight -
//       padding -
//       margin -
//       footerSpace;

//     // Use the smaller of content height or available height, with reasonable limits
//     const dynamicHeight = Math.min(
//       Math.max(minContentHeight, 200), // Minimum 200px
//       Math.max(availableHeight, 400) // Maximum available space, but at least 400px
//     );

//     return {
//       height: `${dynamicHeight}px`,
//       minHeight: "200px",
//       maxHeight: `calc(100vh - ${
//         headerHeight + filterHeight + padding + margin + footerSpace
//       }px)`,
//     };
//   };

//   // Alternative: Get table wrapper style that adjusts to content
//   const getTableWrapperStyle = () => {
//     // If there are few items, don't use fixed height
//     if (filteredInvoices.length <= 5) {
//       return {
//         minHeight: "200px",
//         maxHeight: "calc(100vh - 300px)", // Just prevent it from being too tall
//       };
//     }

//     // For more items, use scrollable container
//     return {
//       height: "calc(100vh - 300px)",
//       minHeight: "400px",
//     };
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${month}-${day}-${year}`;
//     } catch {
//       return dateString;
//     }
//   };

//   // Format currency helper
//   const formatCurrency = (amount, currency = "USD") => {
//     if (!amount && amount !== 0) return "N/A";
//     try {
//       return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: currency || "USD",
//       }).format(amount);
//     } catch {
//       return `${currency || "$"} ${amount}`;
//     }
//   };

//   // Calculate selectable invoices (only those that are not exported)
//   const selectableInvoices = filteredInvoices.filter(
//     (invoice) => !invoice.isExported
//   );
//   const disabledInvoices = filteredInvoices.filter(
//     (invoice) => invoice.isExported
//   );

//   // Handle select all checkbox
//   const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//       // Only select invoices that are not exported (isExported: false)
//       const allSelectableIds = new Set(
//         selectableInvoices.map(
//           (invoice, index) =>
//             invoice.invoiceId || filteredInvoices.indexOf(invoice)
//         )
//       );
//       setSelectedInvoices(allSelectableIds);
//     } else {
//       setSelectedInvoices(new Set());
//     }
//   };

//   // Handle individual checkbox
//   const handleSelectInvoice = (invoiceId, checked, invoice) => {
//     // Prevent selection if invoice is exported
//     if (invoice && invoice.isExported) return;

//     setSelectedInvoices((prev) => {
//       const newSelected = new Set(prev);
//       if (checked) {
//         newSelected.add(invoiceId);
//       } else {
//         newSelected.delete(invoiceId);
//       }

//       // Update select all state - check if all selectable invoices are selected
//       const allSelectableSelected =
//         selectableInvoices.length > 0 &&
//         selectableInvoices.every((inv) => {
//           const id = inv.invoiceId || filteredInvoices.indexOf(inv);
//           return newSelected.has(id);
//         });
//       setSelectAll(allSelectableSelected);

//       return newSelected;
//     });
//   };

//   // Handle unexport (reopen) invoice - only for admin
//   const handleUnexport = async (invoice) => {
//     if (userRole !== "admin") {
//       alert("Access denied. Admin privileges required.");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Are you sure you want to reopen invoice ${invoice.invoiceNumber}?`
//     );
//     if (!confirmed) return;

//     try {
//       // Show loading state
//       const openButton = document.querySelector(
//         `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
//       );
//       if (openButton) {
//         openButton.disabled = true;
//         openButton.textContent = "Opening...";
//       }

//       // Prepare the request body with the current invoice data
//       const requestBody = {
//         invoiceId: invoice.invoiceId || invoice.id || 0,
//         invoiceNumber: invoice.invoiceNumber || "string",
//         po_Number: invoice.po_Number || invoice.poNumber || "string",
//         invoiceDate: invoice.invoiceDate || new Date().toISOString(),
//         invoiceAmount: invoice.invoiceAmount || 0,
//         currency: invoice.currency || "USD",
//         createdAt: invoice.createdAt || new Date().toISOString(),
//         createdBy: invoice.createdBy || "string",
//         updatedAt: new Date().toISOString(),
//         updatedBy: "admin", // or get from current user context
//         billTo: invoice.billTo || "string",
//         remitTo: invoice.remitTo || "string",
//         isExported: false, // This is the key change - setting to false to reopen
//         invoiceTimesheetLines: invoice.invoiceTimesheetLines || [],
//       };

//       // API call to update the invoice using the correct endpoint
//       const response = await fetch(
//         `https://timesheet-subk.onrender.com/api/Invoices/${
//           invoice.invoiceId || invoice.id
//         }`,
//         {
//           method: "PUT", // Using PUT as per the API structure
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `HTTP ${response.status}: ${errorText || response.statusText}`
//         );
//       }

//       // Check if response has content
//       let result = null;
//       const contentType = response.headers.get("Content-Type");
//       if (contentType && contentType.includes("application/json")) {
//         result = await response.json();
//       }

//       console.log("Invoice reopened successfully:", result);

//       // Update the local state
//       setInvoices((prev) =>
//         prev.map((inv) =>
//           (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
//             ? { ...inv, isExported: false }
//             : inv
//         )
//       );

//       setFilteredInvoices((prev) =>
//         prev.map((inv) =>
//           (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
//             ? { ...inv, isExported: false }
//             : inv
//         )
//       );

//       alert(`Invoice ${invoice.invoiceNumber} has been reopened successfully!`);
//     } catch (error) {
//       console.error("Error reopening invoice:", error);

//       // More specific error messages
//       let errorMessage = "Failed to reopen invoice: ";
//       if (error.message.includes("404")) {
//         errorMessage += "Invoice not found or endpoint not available.";
//       } else if (error.message.includes("403")) {
//         errorMessage += "Access denied. Please check your permissions.";
//       } else if (error.message.includes("401")) {
//         errorMessage += "Authentication failed. Please log in again.";
//       } else {
//         errorMessage += error.message;
//       }

//       alert(errorMessage);
//     } finally {
//       // Reset button state
//       const openButton = document.querySelector(
//         `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
//       );
//       if (openButton) {
//         openButton.disabled = false;
//         openButton.textContent = "OPEN";
//       }
//     }
//   };

//   // Handle preview click
//   // const handlePreview = async (invoice) => {
//   //   try {
//   //     setPreviewModalVisible(true);
//   //     setPreviewData(null);

//   //     const response = await fetch(
//   //       `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//   //         invoice.invoiceNumber
//   //       )}`
//   //     );

//   //     if (!response.ok) {
//   //       throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//   //     }

//   //     const apiData = await response.json();

//   //     const transformedData = [
//   //       {
//   //         invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
//   //         invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
//   //         period: formatDate(
//   //           apiData.period || apiData.invoiceDate || invoice.invoiceDate
//   //         ),
//   //         currency: apiData.currency || invoice.currency || "USD",
//   //         totalAmount:
//   //           apiData.totalAmount ||
//   //           apiData.invoiceAmount ||
//   //           invoice.invoiceAmount ||
//   //           0,

//   //         lineItems: (
//   //           apiData.lineItems ||
//   //           apiData.invoiceTimesheetLines ||
//   //           []
//   //         ).map((item, index) => ({
//   //           poLine: item.poLine || item.timesheetLineNo || "",
//   //           plc: item.plc || "",
//   //           vendor: item.vendor || " ",
//   //           employee: item.employee || item.createdBy || " ",
//   //           hours: item.hours || item.mappedHours,
//   //           rate: item.rate || (item.mappedAmount || 0) / item.mappedHours || 0,
//   //           amount: item.amount || item.mappedAmount,
//   //           line_No: item.line_No || item.timesheetLineNo,
//   //         })),

//   //         billTo: apiData.billTo || " ",
//   //         buyer: apiData.buyer || " ",
//   //         purchaseOrderId: apiData.purchaseOrderId || " ",
//   //         releaseNumber: apiData.releaseNumber || "",
//   //         // changeOrderNumber: apiData.changeOrderNumber || "",
//   //         poStartEndDate: apiData.poStartEndDate || " ",
//   //         // remitTo:
//   //         //   apiData.remitTo ||
//   //         //   " ",
//   //         terms: apiData.terms || " ",
//   //         amountDue:
//   //           apiData.amountDue ||
//   //           apiData.totalAmount ||
//   //           apiData.invoiceAmount ||
//   //           invoice.invoiceAmount ||
//   //           0,
//   //       },
//   //     ];

//   //     setPreviewData(transformedData);
//   //   } catch (error) {
//   //     console.error("Error fetching invoice preview:", error);
//   //     alert(`Failed to load invoice preview: ${error.message}`);

//   //     // const fallbackData = [
//   //     //   {
//   //     //     invoiceId: invoice.invoiceNumber,
//   //     //     invoiceDate: formatDate(invoice.invoiceDate),
//   //     //     period: formatDate(invoice.invoiceDate),
//   //     //     currency: invoice.currency || "USD",
//   //     //     totalAmount: invoice.invoiceAmount || 0,
//   //     //     lineItems: [
//   //     //       {
//   //     //         poLine: "Default PO Line",
//   //     //         plc: "PLC001",
//   //     //         vendor: "Vendor",
//   //     //         employee: invoice.createdBy || "Employee",
//   //     //         hours: 40.0,
//   //     //         rate: (invoice.invoiceAmount || 0) / 40,
//   //     //         amount: invoice.invoiceAmount || 0,
//   //     //         line_No: 1,
//   //     //       },
//   //     //     ],
//   //     //     billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//   //     //     buyer: "Clore, Heather J",
//   //     //     purchaseOrderId: "2181218010",
//   //     //     releaseNumber: "3",
//   //     //     changeOrderNumber: "0",
//   //     //     poStartEndDate: "12/10/18 to 12/08/24",
//   //     //     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//   //     //     terms: "PAYNPD",
//   //     //     amountDue: invoice.invoiceAmount || 0,
//   //     //   },
//   //     // ];

//   //     // setPreviewData(fallbackData);
//   //   }
//   // };

//   const handlePreview = async (invoice) => {
//     try {
//       setPreviewModalVisible(true);
//       setPreviewData(null);

//       const response = await fetch(
//         `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//           invoice.invoiceNumber
//         )}`
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//       }

//       const apiData = await response.json();

//       const transformedData = [
//         {
//           invoiceId: apiData.invoiceId || " ",
//           invoiceDate: apiData.period || " ",
//           // period: apiData.period || " ",
//           currency: apiData.currency || " ",
//           totalAmount: apiData.totalAmount || 0,

//           lineItems: (apiData.lineItems || []).map((item, index) => ({
//             poLine: item.poLine || " ",
//             plc: item.plc || " ",
//             vendor: item.vendor || " ",
//             employee: item.employee || " ",
//             hours: item.hours || 0,
//             rate: item.rate || 0,
//             amount: item.amount || 0,
//             line_No: item.line_No || " ",
//           })),

//           billTo: apiData.billTo || " ",
//           buyer: apiData.buyer || " ",
//           purchaseOrderId: apiData.po_Number || " ",
//           releaseNumber: apiData.po_rlse_Number || " ",
//           poStartEndDate: apiData.po_Start_End_Date || " ",
//           terms: apiData.terms || " ",
//           amountDue: apiData.totalAmount || 0,
//         },
//       ];

//       setPreviewData(transformedData);
//     } catch (error) {
//       console.error("Error fetching invoice preview:", error);
//       alert(`Failed to load invoice preview: ${error.message}`);
//     }
//   };

//   // Export function (keeping your existing export logic)
//   // const exportToCSV = async () => {
//   //   const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//   //     selectedInvoices.has(invoice.invoiceId || index)
//   //   );

//   //   if (invoicesToExport.length === 0) {
//   //     alert("Please select invoices to export");
//   //     return;
//   //   }

//   //   try {
//   //     const exportButton = document.querySelector("[data-export-button]");
//   //     if (exportButton) {
//   //       exportButton.disabled = true;
//   //       exportButton.innerHTML =
//   //         '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//   //     }

//   //     for (let i = 0; i < invoicesToExport.length; i++) {
//   //       const invoice = invoicesToExport[i];
//   //       const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//   //       if (!invoiceId) {
//   //         console.warn(
//   //           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//   //         );
//   //         continue;
//   //       }

//   //       try {
//   //         const columnHeaderValues = [
//   //           invoice.invoiceNumber || "",
//   //           formatDate(invoice.invoiceDate) || "",
//   //           invoice.invoiceAmount || 0,
//   //           invoice.currency || "USD",
//   //           formatDate(invoice.createdAt) || "",
//   //           "PLC001",
//   //           invoice.createdBy || "Employee",
//   //           "40.00",
//   //           ((invoice.invoiceAmount || 0) / 40).toFixed(2),
//   //           "0.00",
//   //           (invoice.invoiceAmount || 0).toFixed(2),
//   //           "40.00",
//   //           (invoice.invoiceAmount || 0).toFixed(2),
//   //         ];

//   //         const payload = {
//   //           ColumnHeaderValues: columnHeaderValues,
//   //           IncludeHeaders: true,
//   //           ExportFormat: "CSV",
//   //         };

//   //         const response = await fetch(
//   //           `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
//   //             invoiceId
//   //           )}`,
//   //           {
//   //             method: "POST",
//   //             headers: {
//   //               Accept:
//   //                 "text/csv, application/csv, application/octet-stream, */*",
//   //               "Content-Type": "application/json",
//   //             },
//   //             // body: JSON.stringify(payload)
//   //           }
//   //         );

//   //         if (!response.ok) {
//   //           let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//   //           try {
//   //             const errorData = await response.text();
//   //             if (errorData) {
//   //               errorMessage += ` - ${errorData}`;
//   //             }
//   //           } catch (e) {
//   //             // Ignore if can't parse error
//   //           }
//   //           throw new Error(errorMessage);
//   //         }

//   //         const blob = await response.blob();

//   //         if (blob.type && blob.type.includes("application/json")) {
//   //           const text = await blob.text();
//   //           console.error("Received JSON instead of file:", text);
//   //           throw new Error("Server returned an error instead of a file");
//   //         }

//   //         let filename = `invoice_${invoiceId}_export.csv`;
//   //         const contentDisposition = response.headers.get(
//   //           "Content-Disposition"
//   //         );
//   //         if (contentDisposition) {
//   //           const filenameMatch = contentDisposition.match(
//   //             /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
//   //           );
//   //           if (filenameMatch && filenameMatch[1]) {
//   //             filename = filenameMatch[1].replace(/['"]/g, "");
//   //           }
//   //         }

//   //         const url = window.URL.createObjectURL(blob);
//   //         const link = document.createElement("a");
//   //         link.href = url;
//   //         link.download = filename;
//   //         link.style.display = "none";
//   //         document.body.appendChild(link);
//   //         link.click();

//   //         window.URL.revokeObjectURL(url);
//   //         document.body.removeChild(link);

//   //         if (i < invoicesToExport.length - 1) {
//   //           await new Promise((resolve) => setTimeout(resolve, 500));
//   //         }
//   //       } catch (invoiceError) {
//   //         console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//   //         alert(
//   //           `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
//   //         );
//   //       }
//   //     }

//   //     const successMessage =
//   //       invoicesToExport.length === 1
//   //         ? "Invoice exported successfully!"
//   //         : `${invoicesToExport.length} invoices exported successfully!`;

//   //     alert(successMessage);
//   //   } catch (error) {
//   //     console.error("Error during export process:", error);
//   //     alert(`Export failed: ${error.message}`);
//   //   } finally {
//   //     const exportButton = document.querySelector("[data-export-button]");
//   //     if (exportButton) {
//   //       exportButton.disabled = false;
//   //       exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//   //     }
//   //   }
//   // };

//   const exportToCSV = async () => {
//     const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//       selectedInvoices.has(invoice.invoiceId || index)
//     );

//     if (invoicesToExport.length === 0) {
//       alert("Please select invoices to export");
//       return;
//     }

//     try {
//       const exportButton = document.querySelector("[data-export-button]");
//       if (exportButton) {
//         exportButton.disabled = true;
//         exportButton.innerHTML =
//           '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//       }

//       // Track successfully exported invoices for state update
//       const successfullyExportedIds = [];

//       for (let i = 0; i < invoicesToExport.length; i++) {
//         const invoice = invoicesToExport[i];
//         const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//         if (!invoiceId) {
//           console.warn(
//             `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//           );
//           continue;
//         }

//         try {
//           const columnHeaderValues = [
//             invoice.invoiceNumber || "",
//             formatDate(invoice.invoiceDate) || "",
//             invoice.invoiceAmount || 0,
//             invoice.currency || "USD",
//             formatDate(invoice.createdAt) || "",
//             "PLC001",
//             invoice.createdBy || "Employee",
//             "40.00",
//             ((invoice.invoiceAmount || 0) / 40).toFixed(2),
//             "0.00",
//             (invoice.invoiceAmount || 0).toFixed(2),
//             "40.00",
//             (invoice.invoiceAmount || 0).toFixed(2),
//           ];

//           const payload = {
//             ColumnHeaderValues: columnHeaderValues,
//             IncludeHeaders: true,
//             ExportFormat: "CSV",
//           };

//           const response = await fetch(
//             `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
//               invoiceId
//             )}`,
//             {
//               method: "POST",
//               headers: {
//                 Accept:
//                   "text/csv, application/csv, application/octet-stream, */*",
//                 "Content-Type": "application/json",
//               },
//               // body: JSON.stringify(payload)
//             }
//           );

//           if (!response.ok) {
//             let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//             try {
//               const errorData = await response.text();
//               if (errorData) {
//                 errorMessage += ` - ${errorData}`;
//               }
//             } catch (e) {
//               // Ignore if can't parse error
//             }
//             throw new Error(errorMessage);
//           }

//           const blob = await response.blob();

//           if (blob.type && blob.type.includes("application/json")) {
//             const text = await blob.text();
//             console.error("Received JSON instead of file:", text);
//             throw new Error("Server returned an error instead of a file");
//           }

//           let filename = `invoice_${invoiceId}_export.csv`;
//           const contentDisposition = response.headers.get(
//             "Content-Disposition"
//           );
//           if (contentDisposition) {
//             const filenameMatch = contentDisposition.match(
//               /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
//             );
//             if (filenameMatch && filenameMatch[1]) {
//               filename = filenameMatch[1].replace(/['"]/g, "");
//             }
//           }

//           const url = window.URL.createObjectURL(blob);
//           const link = document.createElement("a");
//           link.href = url;
//           link.download = filename;
//           link.style.display = "none";
//           document.body.appendChild(link);
//           link.click();

//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(link);

//           // Mark this invoice as successfully exported
//           successfullyExportedIds.push(invoice.invoiceId);

//           // **NEW: Update invoice export status in database**
//           try {
//             const updateResponse = await fetch(
//               `https://timesheet-subk.onrender.com/api/Invoices/${invoice.invoiceId}`,
//               {
//                 method: "PUT",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   ...invoice,
//                   isExported: true, // Mark as exported
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin", // or get from current user context
//                 }),
//               }
//             );

//             if (!updateResponse.ok) {
//               console.warn(
//                 `Failed to update export status for invoice ${invoiceId}`
//               );
//             }
//           } catch (updateError) {
//             console.warn(
//               `Error updating export status for invoice ${invoiceId}:`,
//               updateError
//             );
//           }

//           if (i < invoicesToExport.length - 1) {
//             await new Promise((resolve) => setTimeout(resolve, 500));
//           }
//         } catch (invoiceError) {
//           console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//           alert(
//             `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
//           );
//         }
//       }

//       // **NEW: Update local state for successfully exported invoices**
//       if (successfullyExportedIds.length > 0) {
//         setInvoices((prev) =>
//           prev.map((inv) =>
//             successfullyExportedIds.includes(inv.invoiceId)
//               ? {
//                   ...inv,
//                   isExported: true,
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin",
//                 }
//               : inv
//           )
//         );

//         setFilteredInvoices((prev) =>
//           prev.map((inv) =>
//             successfullyExportedIds.includes(inv.invoiceId)
//               ? {
//                   ...inv,
//                   isExported: true,
//                   updatedAt: new Date().toISOString(),
//                   updatedBy: "admin",
//                 }
//               : inv
//           )
//         );

//         // Clear selections for exported invoices since they can't be selected anymore
//         setSelectedInvoices((prev) => {
//           const newSelected = new Set(prev);
//           successfullyExportedIds.forEach((id) => newSelected.delete(id));
//           return newSelected;
//         });

//         // Update select all checkbox state
//         const remainingSelectableInvoices = filteredInvoices.filter(
//           (inv) =>
//             !successfullyExportedIds.includes(inv.invoiceId) && !inv.isExported
//         );
//         setSelectAll(false); // Reset select all since exported invoices are deselected
//       }

//       const successMessage =
//         invoicesToExport.length === 1
//           ? "Invoice exported successfully!"
//           : `${invoicesToExport.length} invoices exported successfully!`;

//       alert(successMessage);
//     } catch (error) {
//       console.error("Error during export process:", error);
//       alert(`Export failed: ${error.message}`);
//     } finally {
//       const exportButton = document.querySelector("[data-export-button]");
//       if (exportButton) {
//         exportButton.disabled = false;
//         exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="ml-48 flex-1 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading invoices...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="ml-48 flex-1 flex items-center justify-center">
//         <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//           <div className="text-red-600 mb-4">
//             <Receipt className="h-12 w-12 mx-auto mb-2" />
//             <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//           </div>
//           <p className="text-red-700">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
//         {/* Header */}
//         <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Receipt className="h-8 w-8 text-green-600 mr-3" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Invoice Export
//                 </h1>
//                 <p className="text-gray-600">
//                   Manage and export invoice data
//                   {/* {userRole === 'admin' && (
//                                         <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                                             Admin Mode
//                                         </span>
//                                     )} */}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={exportToCSV}
//                 disabled={selectedInvoices.size === 0}
//                 data-export-button
//                 className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//                   selectedInvoices.size === 0
//                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                     : "bg-green-600 text-white hover:bg-green-700"
//                 }`}
//               >
//                 <Download className="h-4 w-4 mr-2" />
//                 Export ({selectedInvoices.size})
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white border-b border-gray-200 p-4 -mx-6">
//           <div className="flex items-center justify-start">
//             <div className="w-80 relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Filter by Invoice Number"
//                 value={filterInvoiceNumber}
//                 onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>

//             {filterInvoiceNumber && (
//               <button
//                 onClick={() => setFilterInvoiceNumber("")}
//                 className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Table Container with Dynamic Height */}
//         <div className="flex-1 mt-6 pb-6">
//           {filteredInvoices.length === 0 ? (
//             <div className="flex items-center justify-center h-64">
//               <div className="text-center text-gray-500">
//                 <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                 <p className="text-lg font-medium">No invoices found</p>
//                 <p className="text-sm">Try adjusting your filter criteria</p>
//               </div>
//             </div>
//           ) : (
//             <div
//               className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto overflow-y-auto"
//               style={getTableWrapperStyle()}
//             >
//               <table className="min-w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       <div className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={selectAll}
//                           onChange={(e) => handleSelectAll(e.target.checked)}
//                           disabled={selectableInvoices.length === 0}
//                           className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//                             selectableInvoices.length === 0
//                               ? "opacity-50 cursor-not-allowed"
//                               : disabledInvoices.length > 0
//                               ? "opacity-75"
//                               : "cursor-pointer"
//                           }`}
//                         />
//                         <span className="text-xs font-medium text-gray-500 tracking-wider">
//                           All
//                         </span>
//                       </div>
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Invoice Number
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Vendor
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Invoice Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Amount
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Currency
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Created At
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredInvoices.map((invoice, index) => {
//                     const invoiceId = invoice.invoiceId || invoice.id || index;
//                     return (
//                       <tr
//                         key={invoiceId}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="checkbox"
//                             checked={selectedInvoices.has(invoiceId)}
//                             onChange={(e) =>
//                               handleSelectInvoice(
//                                 invoiceId,
//                                 e.target.checked,
//                                 invoice
//                               )
//                             }
//                             disabled={invoice.isExported}
//                             className={`h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//                               invoice.isExported
//                                 ? "opacity-50 cursor-not-allowed bg-gray-100"
//                                 : "cursor-pointer hover:bg-green-50"
//                             }`}
//                           />
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                           {invoice.invoiceNumber || "N/A"}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                           {invoice.invoiceTimesheetLines?.[0]?.vendor || "N/A"}
//                         </td>

//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           {formatDate(invoice.invoiceDate)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
//                           {formatCurrency(
//                             invoice.invoiceAmount,
//                             invoice.currency
//                           )}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
//                             {invoice.currency || "USD"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           {formatDate(invoice.createdAt)}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={() => handlePreview(invoice)}
//                               className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
//                             >
//                               <Eye className="h-4 w-4 mr-1" />
//                               Preview
//                             </button>

//                             {/* OPEN button - only for admin and exported invoices */}
//                             {userRole === "admin" && invoice.isExported && (
//                               <button
//                                 onClick={() => handleUnexport(invoice)}
//                                 data-open-invoice={
//                                   invoice.invoiceId || invoice.id
//                                 }
//                                 className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-medium"
//                               >
//                                 OPEN
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Preview Modal */}
//       {previewModalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Invoice Preview
//               </h2>
//               <button
//                 onClick={() => setPreviewModalVisible(false)}
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="p-6">
//               <InvoiceViewer
//                 data={previewData}
//                 setInvoiceModalVisible={setPreviewModalVisible}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Receipt, Filter, Download, X, Eye, FileDown } from "lucide-react";
import InvoiceViewer from "./InvoiceViewer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logoImg from "../assets/image.png";

export default function InvoiceExport() {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Get user role from localStorage (set during login)
  useEffect(() => {
    const getUserRole = () => {
      try {
        // Try to get from loginResponse first
        const loginResponse = localStorage.getItem("loginResponse");
        if (loginResponse) {
          const parsedResponse = JSON.parse(loginResponse);
          setUserRole(parsedResponse.role?.toLowerCase() || "user");
          return;
        }

        // Fallback: try userData
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUserRole(parsedUserData.role?.toLowerCase() || "user");
          return;
        }

        // Fallback: try individual userRole
        const storedRole = localStorage.getItem("userRole");
        if (storedRole) {
          setUserRole(storedRole.toLowerCase());
          return;
        }

        // Default fallback - temporarily set to admin for testing
        setUserRole("admin"); // Change this back to 'user' for production
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserRole("admin"); // Change this back to 'user' for production
      }
    };

    getUserRole();
  }, []);

  // Fetch invoices from API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://timesheet-subk.onrender.com/api/Invoices"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setInvoices(data);
        setFilteredInvoices(data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError(err.message || "Failed to fetch invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Filter invoices based on invoice number filter
  useEffect(() => {
    let filtered = invoices;

    // Filter by invoice number
    if (filterInvoiceNumber) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoiceNumber &&
          invoice.invoiceNumber
            .toLowerCase()
            .includes(filterInvoiceNumber.toLowerCase())
      );
    }

    setFilteredInvoices(filtered);
    // Reset selections when filter changes
    setSelectedInvoices(new Set());
    setSelectAll(false);
  }, [invoices, filterInvoiceNumber]);

  // Enhanced table wrapper style that adjusts to content
  const getTableWrapperStyle = () => {
    // If there are few items, don't use fixed height
    if (filteredInvoices.length <= 5) {
      return {
        minHeight: "300px",
        maxHeight: "calc(100vh - 280px)",
      };
    }
    // For more items, use scrollable container
    return {
      height: "calc(100vh - 280px)",
      minHeight: "400px",
      maxHeight: "calc(100vh - 280px)",
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
    } catch {
      return dateString;
    }
  };

  // Format currency helper
  const formatCurrency = (amount, currency = "USD") => {
    if (!amount && amount !== 0) return "N/A";
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "USD",
      }).format(amount);
    } catch {
      return `${currency || "$"} ${amount}`;
    }
  };

  // Calculate selectable invoices (only those that are not exported)
  const selectableInvoices = filteredInvoices.filter(
    (invoice) => !invoice.isExported
  );

  // Handle select all checkbox
  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      // Only select invoices that are not exported (isExported: false)
      const allSelectableIds = new Set(
        selectableInvoices.map(
          (invoice, index) =>
            invoice.invoiceId || filteredInvoices.indexOf(invoice)
        )
      );
      setSelectedInvoices(allSelectableIds);
    } else {
      setSelectedInvoices(new Set());
    }
  };

  // Handle individual checkbox
  const handleSelectInvoice = (invoiceId, checked, invoice) => {
    // Prevent selection if invoice is exported
    if (invoice && invoice.isExported) return;

    setSelectedInvoices((prev) => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(invoiceId);
      } else {
        newSelected.delete(invoiceId);
      }

      // Update select all state - check if all selectable invoices are selected
      const allSelectableSelected =
        selectableInvoices.length > 0 &&
        selectableInvoices.every((inv) => {
          const id = inv.invoiceId || filteredInvoices.indexOf(inv);
          return newSelected.has(id);
        });
      setSelectAll(allSelectableSelected);

      return newSelected;
    });
  };

  // Create invoice HTML content exactly like InvoiceViewer with proper styling
  const createInvoiceHTML = (apiData, invoice) => {
    // Group line items by PO Line for rendering with headers
    const groupedByPoLine = (apiData.lineItems || []).reduce((groups, item) => {
      const key = item.poLine || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});

    return `
      <div style="max-width: 768px; margin: auto; padding: 20px; border: 2px solid #d1d5db; font-family: monospace; font-size: 15px; color: #1a202c; background-color: #fff;">
        <img src="${logoImg}" alt="Company Logo" style="height: 60px; object-fit: contain;" />
        <h1 style="text-align: center; margin-bottom: 20px; font-size: 18px; font-weight: 600;">SUMARIA SYSTEMS, LLC</h1>
        
        <div style="margin-bottom: 20px;">
          <div style="display: inline-block; width: 48%; vertical-align: top;">
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Subcontractor Invoice Number:</span>
            </div>
            <div style="margin-bottom: 16px;">
              ${apiData.invoiceId || invoice.invoiceNumber || ""}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Bill To:</span>
            </div>
            <div style="margin-bottom: 16px; white-space: pre-line;">
              ${apiData.billTo || ""}
            </div>
            <div style="margin-bottom: 16px;">
              <span style="font-weight: 700;">Buyer:</span>
              <span style="margin-left: 4px;">${apiData.buyer || " "}</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Purchase Order ID:</span>
            </div>
            <div style="margin-bottom: 16px;">
              ${apiData.po_Number || ""} Release Number ${apiData.po_rlse_Number || ""}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">PO Start and End Date:</span>
            </div>
            <div>${apiData.po_Start_End_Date || " "}</div>
          </div>
          
          <div style="display: inline-block; width: 48%; vertical-align: top; margin-left: 4%;">
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Invoice Date:</span>
            </div>
            <div style="margin-bottom: 16px;">
              ${apiData.period || " "}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Billing Currency:</span>
            </div>
            <div style="margin-bottom: 16px;">
              ${apiData.currency || "USD"}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Terms:</span>
            </div>
            <div style="margin-bottom: 16px;">
              ${apiData.terms || "NET 45"}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="font-weight: 700;">Amount Due</span>
            </div>
            <div>
              $${(apiData.totalAmount || 0).toFixed(2)}
            </div>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px;">
          <thead>
            <tr>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: left; background-color: #f3f4f6; width: 120px;">PLC</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: left; background-color: #f3f4f6; width: 150px;">Vendor Employee</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 80px;">Current Hrs/Qty</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 60px;">Rate</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 80px;">Additional Amount</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 80px;">Current Amount</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 80px;">Cumulative Hrs/Qty</th>
              <th style="border: 1px solid #d1d5db; padding: 4px; text-align: center; background-color: #f3f4f6; width: 80px;">Cumulative Amount</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(groupedByPoLine).map(([poLine, items]) => `
              <tr>
                <td colspan="8" style="font-weight: 700; font-size: 13px; padding: 8px 4px; border: 1px solid #d1d5db;">PO LINE ${poLine}</td>
              </tr>
              ${items.map(item => `
                <tr>
                  <td style="border: 1px solid #d1d5db; padding: 4px; vertical-align: top;">
                    <div style="font-weight: 600; margin-bottom: 2px;">${item.plc || ""}</div>
                  </td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; vertical-align: top;">
                    <div style="margin-left: 10px;">
                      <div style="margin-bottom: 1px;">${item.employee || ""}</div>
                      <div>${item.vendor || ""}</div>
                    </div>
                  </td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">${(item.hours || 0).toFixed(2)}</td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">$${(item.rate || 0).toFixed(2)}</td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">$0.00</td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">$${(item.amount || 0).toFixed(2)}</td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">${(item.hours || 0).toFixed(2)}</td>
                  <td style="border: 1px solid #d1d5db; padding: 4px; text-align: right;">$${(item.amount || 0).toFixed(2)}</td>
                </tr>
              `).join('')}
            `).join('')}
          </tbody>
        </table>
        
        <div style="text-align: right; font-weight: 600; font-size: 16px; margin-bottom: 24px;">
          Total Amount Due: $${(apiData.totalAmount || 0).toFixed(2)}
        </div>
      </div>
    `;
  };

  // Updated download function using exact InvoiceViewer format with invoice number filename
  // const downloadInvoices = async () => {
  //   const invoicesToDownload = filteredInvoices.filter((invoice, index) =>
  //     selectedInvoices.has(invoice.invoiceId || index)
  //   );

  //   if (invoicesToDownload.length === 0) {
  //     alert("Please select invoices to download");
  //     return;
  //   }

  //   try {
  //     setIsDownloading(true);

  //     for (let i = 0; i < invoicesToDownload.length; i++) {
  //       const invoice = invoicesToDownload[i];
  //       const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

  //       if (!invoiceId) {
  //         console.warn(`Skipping invoice without ID: ${JSON.stringify(invoice)}`);
  //         continue;
  //       }

  //       try {
  //         // First fetch invoice preview data (same as preview functionality)
  //         const previewResponse = await fetch(
  //           `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
  //             invoice.invoiceNumber
  //           )}`
  //         );

  //         if (!previewResponse.ok) {
  //           throw new Error(`Failed to fetch invoice preview: ${previewResponse.status}`);
  //         }

  //         const apiData = await previewResponse.json();
          
  //         // Create temporary invoice element using exact InvoiceViewer format
  //         const tempInvoiceElement = document.createElement('div');
  //         tempInvoiceElement.style.position = 'absolute';
  //         tempInvoiceElement.style.left = '-9999px';
  //         tempInvoiceElement.style.width = '800px';
  //         tempInvoiceElement.style.backgroundColor = 'white';

  //         // Use the exact same HTML structure as InvoiceViewer with proper styling
  //         tempInvoiceElement.innerHTML = createInvoiceHTML(apiData, invoice);
  //         document.body.appendChild(tempInvoiceElement);

  //         // Generate PDF using the same method as InvoiceViewer
  //         const pdf = new jsPDF("p", "mm", "a4");
  //         const padding = 10;
          
  //         const canvas = await html2canvas(tempInvoiceElement, { 
  //           scale: 2, 
  //           useCORS: true,
  //           backgroundColor: '#ffffff'
  //         });
          
  //         const imgData = canvas.toDataURL("image/png");

  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = pdf.internal.pageSize.getHeight();
  //         const usableWidth = pdfWidth - 2 * padding;
  //         const usableHeight = pdfHeight - 2 * padding;

  //         const imgProps = pdf.getImageProperties(imgData);
  //         const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

  //         let heightLeft = pdfImgHeight;
  //         let position = padding;

  //         pdf.addImage(imgData, "PNG", padding, position, usableWidth, pdfImgHeight);
  //         heightLeft -= usableHeight;

  //         while (heightLeft > 0) {
  //           pdf.addPage();
  //           position = padding - heightLeft;
  //           pdf.addImage(
  //             imgData,
  //             "PNG",
  //             padding,
  //             position,
  //             usableWidth,
  //             pdfImgHeight
  //           );
  //           heightLeft -= usableHeight;
  //         }

  //         // Clean up temporary element
  //         document.body.removeChild(tempInvoiceElement);

  //         // Save PDF with invoice number as filename
  //         const filename = `${invoice.invoiceNumber || `invoice_${invoiceId}`}.pdf`;
  //         pdf.save(filename);

  //         // Add delay between downloads
  //         if (i < invoicesToDownload.length - 1) {
  //           await new Promise((resolve) => setTimeout(resolve, 1000));
  //         }

  //       } catch (invoiceError) {
  //         console.error(`Error downloading invoice ${invoiceId}:`, invoiceError);
  //         alert(`Failed to download invoice ${invoiceId}: ${invoiceError.message}`);
  //       }
  //     }

  //     const successMessage =
  //       invoicesToDownload.length === 1
  //         ? "Invoice downloaded successfully!"
  //         : `${invoicesToDownload.length} invoices downloaded successfully!`;

  //     alert(successMessage);

  //   } catch (error) {
  //     console.error("Error during download process:", error);
  //     alert(`Download failed: ${error.message}`);
  //   } finally {
  //     setIsDownloading(false);
  //   }
  // };

  const downloadInvoices = async () => {
  const invoicesToDownload = filteredInvoices.filter((invoice, index) =>
    selectedInvoices.has(invoice.invoiceId || index)
  );

  if (invoicesToDownload.length === 0) {
    alert("Please select invoices to download");
    return;
  }

  try {
    setIsDownloading(true);

    for (let i = 0; i < invoicesToDownload.length; i++) {
      const invoice = invoicesToDownload[i];
      const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

      if (!invoiceId) {
        console.warn(`Skipping invoice without ID: ${JSON.stringify(invoice)}`);
        continue;
      }

      try {
        // First fetch invoice preview data (same as preview functionality)
        const previewResponse = await fetch(
          `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
            invoice.invoiceNumber
          )}`
        );

        if (!previewResponse.ok) {
          throw new Error(`Failed to fetch invoice preview: ${previewResponse.status}`);
        }

        const apiData = await previewResponse.json();

        // Transform data exactly like in handlePreview
        const transformedData = [
          {
            invoiceId: apiData.invoiceId || " ",
            invoiceDate: apiData.period || " ",
            currency: apiData.currency || " ",
            totalAmount: apiData.totalAmount || 0,

            lineItems: (apiData.lineItems || []).map((item, index) => ({
              poLine: item.poLine || " ",
              plc: item.plc || " ",
              vendor: item.vendor || " ",
              employee: item.employee || " ",
              hours: item.hours || 0,
              rate: item.rate || 0,
              amount: item.amount || 0,
              line_No: item.line_No || " ",
            })),

            billTo: apiData.billTo || " ",
            buyer: apiData.buyer || " ",
            purchaseOrderId: apiData.po_Number || " ",
            releaseNumber: apiData.po_rlse_Number || " ",
            poStartEndDate: apiData.po_Start_End_Date || " ",
            terms: apiData.terms || " ",
            amountDue: apiData.totalAmount || 0,
            period: apiData.period || " ",
            po_Number: apiData.po_Number || " ",
            po_rlse_Number: apiData.po_rlse_Number || " ",
            po_Start_End_Date: apiData.po_Start_End_Date || " ",
          },
        ];

        // Create temporary container to render InvoiceViewer component
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.width = '800px';
        tempContainer.style.backgroundColor = 'white';
        document.body.appendChild(tempContainer);

        // Create temporary React root and render InvoiceViewer
        const ReactDOM = (await import('react-dom/client')).default;
        const React = (await import('react')).default;
        
        // Import InvoiceViewer component
        const { default: InvoiceViewer } = await import('./InvoiceViewer');
        
        const root = ReactDOM.createRoot(tempContainer);
        
        // Render InvoiceViewer component
        await new Promise((resolve) => {
          root.render(
            React.createElement(InvoiceViewer, {
              data: transformedData,
              setInvoiceModalVisible: () => {},
            })
          );
          
          // Wait for component to render
          setTimeout(resolve, 500);
        });

        // Find the invoice content div (the one with ref)
        const input = tempContainer.querySelector('div[style*="max-width: 768px"]');
        
        if (!input) {
          throw new Error('Invoice content not found');
        }

        // Use exact same PDF generation logic as handleDownloadPdf
        const pdf = new jsPDF("p", "mm", "a4");
        const padding = 10;
        const canvas = await html2canvas(input, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const usableWidth = pdfWidth - 2 * padding;
        const usableHeight = pdfHeight - 2 * padding;

        const imgProps = pdf.getImageProperties(imgData);
        const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

        let heightLeft = pdfImgHeight;
        let position = padding;

        pdf.addImage(imgData, "PNG", padding, position, usableWidth, pdfImgHeight);
        heightLeft -= usableHeight;

        while (heightLeft > 0) {
          pdf.addPage();
          position = padding - heightLeft;
          pdf.addImage(
            imgData,
            "PNG",
            padding,
            position,
            usableWidth,
            pdfImgHeight
          );
          heightLeft -= usableHeight;
        }

        // Clean up
        root.unmount();
        document.body.removeChild(tempContainer);

        // Save PDF with invoice number as filename
        const filename = `${invoice.invoiceNumber || `invoice_${invoiceId}`}.pdf`;
        pdf.save(filename);

        // Add delay between downloads
        if (i < invoicesToDownload.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

      } catch (invoiceError) {
        console.error(`Error downloading invoice ${invoiceId}:`, invoiceError);
        alert(`Failed to download invoice ${invoiceId}: ${invoiceError.message}`);
      }
    }

    const successMessage =
      invoicesToDownload.length === 1
        ? "Invoice downloaded successfully!"
        : `${invoicesToDownload.length} invoices downloaded successfully!`;

    alert(successMessage);

  } catch (error) {
    console.error("Error during download process:", error);
    alert(`Download failed: ${error.message}`);
  } finally {
    setIsDownloading(false);
  }
};


  // Handle unexport (reopen) invoice - only for admin
  const handleUnexport = async (invoice) => {
    if (userRole !== "admin") {
      alert("Access denied. Admin privileges required.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to reopen invoice ${invoice.invoiceNumber}?`
    );
    if (!confirmed) return;

    try {
      // Show loading state
      const openButton = document.querySelector(
        `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
      );
      if (openButton) {
        openButton.disabled = true;
        openButton.textContent = "Opening...";
      }

      // Prepare the request body with the current invoice data
      const requestBody = {
        invoiceId: invoice.invoiceId || invoice.id || 0,
        invoiceNumber: invoice.invoiceNumber || "string",
        po_Number: invoice.po_Number || invoice.poNumber || "string",
        invoiceDate: invoice.invoiceDate || new Date().toISOString(),
        invoiceAmount: invoice.invoiceAmount || 0,
        currency: invoice.currency || "USD",
        createdAt: invoice.createdAt || new Date().toISOString(),
        createdBy: invoice.createdBy || "string",
        updatedAt: new Date().toISOString(),
        updatedBy: "admin", // or get from current user context
        billTo: invoice.billTo || "string",
        remitTo: invoice.remitTo || "string",
        isExported: false, // This is the key change - setting to false to reopen
        invoiceTimesheetLines: invoice.invoiceTimesheetLines || [],
      };

      // API call to update the invoice using the correct endpoint
      const response = await fetch(
        `https://timesheet-subk.onrender.com/api/Invoices/${
          invoice.invoiceId || invoice.id
        }`,
        {
          method: "PUT", // Using PUT as per the API structure
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${errorText || response.statusText}`
        );
      }

      // Check if response has content
      let result = null;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      }

      console.log("Invoice reopened successfully:", result);

      // Update the local state
      setInvoices((prev) =>
        prev.map((inv) =>
          (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
            ? { ...inv, isExported: false }
            : inv
        )
      );

      setFilteredInvoices((prev) =>
        prev.map((inv) =>
          (inv.invoiceId || inv.id) === (invoice.invoiceId || invoice.id)
            ? { ...inv, isExported: false }
            : inv
        )
      );

      alert(`Invoice ${invoice.invoiceNumber} has been reopened successfully!`);
    } catch (error) {
      console.error("Error reopening invoice:", error);

      // More specific error messages
      let errorMessage = "Failed to reopen invoice: ";
      if (error.message.includes("404")) {
        errorMessage += "Invoice not found or endpoint not available.";
      } else if (error.message.includes("403")) {
        errorMessage += "Access denied. Please check your permissions.";
      } else if (error.message.includes("401")) {
        errorMessage += "Authentication failed. Please log in again.";
      } else {
        errorMessage += error.message;
      }

      alert(errorMessage);
    } finally {
      // Reset button state
      const openButton = document.querySelector(
        `[data-open-invoice="${invoice.invoiceId || invoice.id}"]`
      );
      if (openButton) {
        openButton.disabled = false;
        openButton.textContent = "OPEN";
      }
    }
  };

  // const handlePreview = async (invoice) => {
  //   try {
  //     setPreviewModalVisible(true);
  //     setPreviewData(null);

  //     const response = await fetch(
  //       `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
  //         invoice.invoiceNumber
  //       )}`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch invoice preview: ${response.status}`);
  //     }

  //     const apiData = await response.json();

  //     const transformedData = [
  //       {
  //         invoiceId: apiData.invoiceId || " ",
  //         invoiceDate: apiData.period || " ",
  //         currency: apiData.currency || " ",
  //         totalAmount: apiData.totalAmount || 0,

  //         lineItems: (apiData.lineItems || []).map((item, index) => ({
  //           poLine: item.poLine || " ",
  //           plc: item.plc || " ",
  //           vendor: item.vendor || " ",
  //           employee: item.employee || " ",
  //           hours: item.hours || 0,
  //           rate: item.rate || 0,
  //           amount: item.amount || 0,
  //           line_No: item.line_No || " ",
  //         })),

  //         billTo: apiData.billTo || " ",
  //         buyer: apiData.buyer || " ",
  //         purchaseOrderId: apiData.po_Number || " ",
  //         releaseNumber: apiData.po_rlse_Number || " ",
  //         poStartEndDate: apiData.po_Start_End_Date || " ",
  //         terms: apiData.terms || " ",
  //         amountDue: apiData.totalAmount || 0,
  //         period: apiData.period || " ",
  //         po_Number: apiData.po_Number || " ",
  //         po_rlse_Number: apiData.po_rlse_Number || " ",
  //         po_Start_End_Date: apiData.po_Start_End_Date || " ",
  //       },
  //     ];

  //     setPreviewData(transformedData);
  //   } catch (error) {
  //     console.error("Error fetching invoice preview:", error);
  //     alert(`Failed to load invoice preview: ${error.message}`);
  //   }
  // };
  
  const handlePreview = async (invoice) => {
    try {
      setPreviewModalVisible(true);
      setPreviewData(null);
 
      const response = await fetch(
        `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
          invoice.invoiceNumber
        )}`
      );
 
      if (!response.ok) {
        throw new Error(`Failed to fetch invoice preview: ${response.status}`);
      }
 
      const apiData = await response.json();
 
      const transformedData = [
        {
          invoiceId: apiData.invoiceId || " ",
          period: apiData.period || " ",
          // period: new Date(invoice.period).toISOString() || " ",
          // period: apiData.period || " ",
          currency: apiData.currency || " ",
          totalAmount: apiData.totalAmount || 0,
 
          lineItems: (apiData.lineItems || []).map((item, index) => ({
            poLine: item.poLine || " ",
            plc: item.plc || " ",
            vendor: item.vendor || " ",
            employee: item.employee || " ",
            hours: item.hours || 0,
            rate: item.rate || 0,
            amount: item.amount || 0,
            line_No: item.line_No || " ",
          })),
 
          billTo: apiData.billTo || " ",
          buyer: apiData.buyer || " ",
          po_Number: apiData.po_Number || " ",
          po_rlse_Number: apiData.po_rlse_Number || " ",
          po_Start_End_Date: apiData.po_Start_End_Date || " ",
          terms: apiData.terms || " ",
          amountDue: apiData.totalAmount || 0,
        },
      ];
 
      setPreviewData(transformedData);
    } catch (error) {
      console.error("Error fetching invoice preview:", error);
      alert(`Failed to load invoice preview: ${error.message}`);
    }
  };
 
  const exportToCSV = async () => {
    const invoicesToExport = filteredInvoices.filter((invoice, index) =>
      selectedInvoices.has(invoice.invoiceId || index)
    );

    if (invoicesToExport.length === 0) {
      alert("Please select invoices to export");
      return;
    }

    try {
      // Track successfully exported invoices for state update
      const successfullyExportedIds = [];

      for (let i = 0; i < invoicesToExport.length; i++) {
        const invoice = invoicesToExport[i];
        const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

        if (!invoiceId) {
          console.warn(
            `Skipping invoice without ID: ${JSON.stringify(invoice)}`
          );
          continue;
        }

        try {
          const columnHeaderValues = [
            invoice.invoiceNumber || "",
            formatDate(invoice.invoiceDate) || "",
            invoice.invoiceAmount || 0,
            invoice.currency || "USD",
            formatDate(invoice.createdAt) || "",
            "PLC001",
            invoice.createdBy || "Employee",
            "40.00",
            ((invoice.invoiceAmount || 0) / 40).toFixed(2),
            "0.00",
            (invoice.invoiceAmount || 0).toFixed(2),
            "40.00",
            (invoice.invoiceAmount || 0).toFixed(2),
          ];

          const payload = {
            ColumnHeaderValues: columnHeaderValues,
            IncludeHeaders: true,
            ExportFormat: "CSV",
          };

          const response = await fetch(
            `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
              invoiceId
            )}`,
            {
              method: "POST",
              headers: {
                Accept:
                  "text/csv, application/csv, application/octet-stream, */*",
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            try {
              const errorData = await response.text();
              if (errorData) {
                errorMessage += ` - ${errorData}`;
              }
            } catch (e) {
              // Ignore if can't parse error
            }
            throw new Error(errorMessage);
          }

          const blob = await response.blob();

          if (blob.type && blob.type.includes("application/json")) {
            const text = await blob.text();
            console.error("Received JSON instead of file:", text);
            throw new Error("Server returned an error instead of a file");
          }

          let filename = `invoice_${invoiceId}_export.csv`;
          const contentDisposition = response.headers.get(
            "Content-Disposition"
          );
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            );
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, "");
            }
          }

          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();

          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);

          // Mark this invoice as successfully exported
          successfullyExportedIds.push(invoice.invoiceId);

          // Update invoice export status in database
          try {
            const updateResponse = await fetch(
              `https://timesheet-subk.onrender.com/api/Invoices/${invoice.invoiceId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...invoice,
                  isExported: true, // Mark as exported
                  updatedAt: new Date().toISOString(),
                  updatedBy: "admin", // or get from current user context
                }),
              }
            );

            if (!updateResponse.ok) {
              console.warn(
                `Failed to update export status for invoice ${invoiceId}`
              );
            }
          } catch (updateError) {
            console.warn(
              `Error updating export status for invoice ${invoiceId}:`,
              updateError
            );
          }

          if (i < invoicesToExport.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (invoiceError) {
          console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
          alert(
            `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
          );
        }
      }

      // Update local state for successfully exported invoices
      if (successfullyExportedIds.length > 0) {
        setInvoices((prev) =>
          prev.map((inv) =>
            successfullyExportedIds.includes(inv.invoiceId)
              ? {
                  ...inv,
                  isExported: true,
                  updatedAt: new Date().toISOString(),
                  updatedBy: "admin",
                }
              : inv
          )
        );

        setFilteredInvoices((prev) =>
          prev.map((inv) =>
            successfullyExportedIds.includes(inv.invoiceId)
              ? {
                  ...inv,
                  isExported: true,
                  updatedAt: new Date().toISOString(),
                  updatedBy: "admin",
                }
              : inv
          )
        );

        // Clear selections for exported invoices since they can't be selected anymore
        setSelectedInvoices((prev) => {
          const newSelected = new Set(prev);
          successfullyExportedIds.forEach((id) => newSelected.delete(id));
          return newSelected;
        });

        // Update select all checkbox state
        setSelectAll(false); // Reset select all since exported invoices are deselected
      }

      const successMessage =
        invoicesToExport.length === 1
          ? "Invoice exported successfully!"
          : `${invoicesToExport.length} invoices exported successfully!`;

      alert(successMessage);
    } catch (error) {
      console.error("Error during export process:", error);
      alert(`Export failed: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="ml-48 flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-48 flex-1 flex items-center justify-center">
        <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
          <div className="text-red-600 mb-4">
            <Receipt className="h-12 w-12 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
          </div>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Invoice Export
                </h1>
                <p className="text-gray-600">
                  Manage and export invoice data
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Download Invoice Button */}
              <button
                onClick={downloadInvoices}
                disabled={selectedInvoices.size === 0 || isDownloading}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
                  selectedInvoices.size === 0 || isDownloading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <FileDown className="h-4 w-4 mr-2" />
                {isDownloading ? 'Downloading...' : `Download Invoice (${selectedInvoices.size})`}
              </button>
              
              {/* Export Button */}
              <button
                onClick={exportToCSV}
                disabled={selectedInvoices.size === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
                  selectedInvoices.size === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                <Download className="h-4 w-4 mr-2" />
                Export ({selectedInvoices.size})
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-start">
            <div className="w-80 relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by Invoice Number"
                value={filterInvoiceNumber}
                onChange={(e) => setFilterInvoiceNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {filterInvoiceNumber && (
              <button
                onClick={() => setFilterInvoiceNumber("")}
                className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Table Container with Proper Sizing */}
        <div className="flex-1 p-6">
          {filteredInvoices.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No invoices found</p>
                <p className="text-sm">Try adjusting your filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Table wrapper with enhanced horizontal scroll and proper width handling */}
              <div 
                className="overflow-auto"
                style={getTableWrapperStyle()}
              >
                <table className="w-full min-w-[1600px]"> {/* Increased minimum width for better spacing */}
                  <thead className="bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="w-20 px-4 py-3 text-left border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            disabled={selectableInvoices.length === 0}
                            className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
                              selectableInvoices.length === 0
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          />
                          <span className="text-xs font-medium text-gray-500 tracking-wider">
                            All
                          </span>
                        </div>
                      </th>
                      <th className="min-w-[220px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Invoice Number
                      </th>
                      <th className="min-w-[280px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Vendor
                      </th>
                      <th className="min-w-[140px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Invoice Date
                      </th>
                      <th className="min-w-[140px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Amount
                      </th>
                      <th className="min-w-[100px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Currency
                      </th>
                      <th className="min-w-[140px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Created At
                      </th>
                      <th className="min-w-[200px] px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 bg-gray-50">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredInvoices.map((invoice, index) => {
                      const invoiceId = invoice.invoiceId || invoice.id || index;
                      return (
                        <tr
                          key={invoiceId}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="w-20 px-4 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedInvoices.has(invoiceId)}
                              onChange={(e) =>
                                handleSelectInvoice(
                                  invoiceId,
                                  e.target.checked,
                                  invoice
                                )
                              }
                              disabled={invoice.isExported}
                              className={`h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
                                invoice.isExported
                                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                                  : "cursor-pointer hover:bg-green-50"
                              }`}
                            />
                          </td>
                          <td className="min-w-[220px] px-6 py-4">
                            <div className="text-sm font-medium text-gray-900 break-all" title={invoice.invoiceNumber || "N/A"}>
                              {invoice.invoiceNumber || "N/A"}
                            </div>
                          </td>
                          <td className="min-w-[280px] px-6 py-4">
                            <div className="text-sm text-gray-900 break-all" title={invoice.invoiceTimesheetLines?.[0]?.vendor || "N/A"}>
                              {invoice.invoiceTimesheetLines?.[0]?.vendor || "N/A"}
                            </div>
                          </td>
                          <td className="min-w-[140px] px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {formatDate(invoice.invoiceDate)}
                            </div>
                          </td>
                          <td className="min-w-[140px] px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              {formatCurrency(
                                invoice.invoiceAmount,
                                invoice.currency
                              )}
                            </div>
                          </td>
                          <td className="min-w-[100px] px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {invoice.currency || "USD"}
                            </span>
                          </td>
                          <td className="min-w-[140px] px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">
                              {formatDate(invoice.createdAt)}
                            </div>
                          </td>
                          <td className="min-w-[200px] px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handlePreview(invoice)}
                                className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </button>

                              {/* OPEN button - only for admin and exported invoices */}
                              {userRole === "admin" && invoice.isExported && (
                                <button
                                  onClick={() => handleUnexport(invoice)}
                                  data-open-invoice={
                                    invoice.invoiceId || invoice.id
                                  }
                                  className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors font-medium"
                                >
                                  OPEN
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Table Info Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
                {/* <span>Showing {filteredInvoices.length} invoices</span> */}
                {/* <span>Scroll horizontally to view all columns</span> */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Invoice Preview
              </h2>
              <button
                onClick={() => setPreviewModalVisible(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <InvoiceViewer
                data={previewData}
                setInvoiceModalVisible={setPreviewModalVisible}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

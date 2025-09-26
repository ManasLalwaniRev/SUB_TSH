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
  const [isExporting, setIsExporting] = useState(false);


  // Table dimensions matching ExportTable
  const colWidth = 120;
  const minTableWidth = 2200; // Fixed width to force horizontal scroll

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
      alert(`Failed to reopen invoice: ${error.message}`);
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

  // Handle preview click
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
  //         invoiceDate: formatDate(apiData.invoiceDate) || " ",
  //         period: apiData.period || " ",
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
  //         po_Number: apiData.po_Number || " ",
  //         po_rlse_Number: apiData.po_rlse_Number || " ",
  //         po_Start_End_Date: apiData.po_Start_End_Date || " ",
  //         terms: apiData.terms || " ",
  //         amountDue: apiData.totalAmount || 0,
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

    // Function to group and combine line items with same PLC, Vendor, and Employee
    const groupAndCombineLineItems = (lineItems) => {
      if (!lineItems || !Array.isArray(lineItems)) {
        return [];
      }

      const groupedItems = {};

      lineItems.forEach((item, index) => {
        // Create a unique key for grouping based on PLC, Vendor, and Employee
        const plcKey = item.plc || '';
        const vendorKey = item.vendor || '';
        const employeeKey = item.employee || '';
        
        const groupKey = `${plcKey}_${vendorKey}_${employeeKey}`;
        
        if (groupedItems[groupKey]) {
          // Combine with existing group - sum hours and amounts
          const existingHours = parseFloat(groupedItems[groupKey].hours) || 0;
          const newHours = parseFloat(item.hours) || 0;
          groupedItems[groupKey].hours = existingHours + newHours;
          
          const existingAmount = parseFloat(groupedItems[groupKey].amount) || 0;
          const newAmount = parseFloat(item.amount) || 0;
          groupedItems[groupKey].amount = existingAmount + newAmount;
          
          // Keep track of combined count for reference
          groupedItems[groupKey].combinedCount = (groupedItems[groupKey].combinedCount || 1) + 1;
          
        } else {
          // First occurrence of this combination
          groupedItems[groupKey] = {
            poLine: item.poLine || " ",
            plc: item.plc || " ",
            vendor: item.vendor || " ",
            employee: item.employee || " ",
            hours: parseFloat(item.hours) || 0,
            rate: item.rate || 0,
            amount: parseFloat(item.amount) || 0,
            line_No: item.line_No || " ",
            combinedCount: 1
          };
        }
      });

      // Convert grouped items back to array with formatted values
      return Object.values(groupedItems).map(item => ({
        poLine: item.poLine,
        plc: item.plc,
        vendor: item.vendor,
        employee: item.employee,
        hours: Number(item.hours.toFixed(2)),
        rate: item.rate,
        amount: Number(item.amount.toFixed(2)),
        line_No: item.line_No,
      }));
    };

    // Group and combine line items
    const combinedLineItems = groupAndCombineLineItems(apiData.lineItems || []);

    // Recalculate total amount based on combined line items
    const newTotalAmount = combinedLineItems.reduce((sum, item) => {
      return sum + (parseFloat(item.amount) || 0);
    }, 0);

    const transformedData = [
      {
        invoiceId: apiData.invoiceId || " ",
        invoiceDate: formatDate(apiData.invoiceDate) || " ",
        period: apiData.period || " ",
        currency: apiData.currency || " ",
        totalAmount: Number(newTotalAmount.toFixed(2)),

        lineItems: combinedLineItems,

        billTo: apiData.billTo || " ",
        buyer: apiData.buyer || " ",
        po_Number: apiData.po_Number || " ",
        po_rlse_Number: apiData.po_rlse_Number || " ",
        po_Start_End_Date: apiData.po_Start_End_Date || " ",
        terms: apiData.terms || " ",
        amountDue: Number(newTotalAmount.toFixed(2)),
      },
    ];

    console.log("Original API data:", apiData);
    console.log("Combined line items:", combinedLineItems);
    console.log("Transformed preview data:", transformedData);

    setPreviewData(transformedData);
  } catch (error) {
    console.error("Error fetching invoice preview:", error);
    alert(`Failed to load invoice preview: ${error.message}`);
  }
};


  // Download invoices function
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
  //         console.warn(
  //           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
  //         );
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
  //           throw new Error(
  //             `Failed to fetch invoice preview: ${previewResponse.status}`
  //           );
  //         }

  //         const apiData = await previewResponse.json();

  //         // Transform data exactly like in handlePreview
  //         const transformedData = [
  //           {
  //             invoiceId: apiData.invoiceId || " ",
  //             invoiceDate: apiData.period || " ",
  //             currency: apiData.currency || " ",
  //             totalAmount: apiData.totalAmount || 0,
  //             lineItems: (apiData.lineItems || []).map((item, index) => ({
  //               poLine: item.poLine || " ",
  //               plc: item.plc || " ",
  //               vendor: item.vendor || " ",
  //               employee: item.employee || " ",
  //               hours: item.hours || 0,
  //               rate: item.rate || 0,
  //               amount: item.amount || 0,
  //               line_No: item.line_No || " ",
  //             })),
  //             billTo: apiData.billTo || " ",
  //             buyer: apiData.buyer || " ",
  //             terms: apiData.terms || " ",
  //             amountDue: apiData.totalAmount || 0,
  //             po_Number: apiData.po_Number || "",
  //             po_rlse_Number: apiData.po_rlse_Number || " ",
  //             po_Start_End_Date: apiData.Po_Start_End_Date || " ",
  //           },
  //         ];

  //         // Create temporary container to render InvoiceViewer component
  //         const tempContainer = document.createElement("div");
  //         tempContainer.style.position = "absolute";
  //         tempContainer.style.left = "-9999px";
  //         tempContainer.style.width = "800px";
  //         tempContainer.style.backgroundColor = "white";
  //         document.body.appendChild(tempContainer);

  //         // Create temporary React root and render InvoiceViewer
  //         const ReactDOM = (await import("react-dom/client")).default;
  //         const React = (await import("react")).default;

  //         // Import InvoiceViewer component
  //         const { default: InvoiceViewer } = await import("./InvoiceViewer");

  //         const root = ReactDOM.createRoot(tempContainer);

  //         // Render InvoiceViewer component
  //         await new Promise((resolve) => {
  //           root.render(
  //             React.createElement(InvoiceViewer, {
  //               data: transformedData,
  //               setInvoiceModalVisible: () => {},
  //             })
  //           );

  //           // Wait for component to render
  //           setTimeout(resolve, 500);
  //         });

  //         // Find the invoice content div (the one with ref)
  //         const input = tempContainer.querySelector(
  //           'div[style*="max-width: 768px"]'
  //         );

  //         if (!input) {
  //           throw new Error("Invoice content not found");
  //         }

  //         // Use exact same PDF generation logic as handleDownloadPdf
  //         const pdf = new jsPDF("p", "mm", "a4");
  //         const padding = 10;
  //         const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  //         const imgData = canvas.toDataURL("image/png");

  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = pdf.internal.pageSize.getHeight();

  //         const usableWidth = pdfWidth - 2 * padding;
  //         const usableHeight = pdfHeight - 2 * padding;

  //         const imgProps = pdf.getImageProperties(imgData);
  //         const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

  //         let heightLeft = pdfImgHeight;
  //         let position = padding;

  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           padding,
  //           position,
  //           usableWidth,
  //           pdfImgHeight
  //         );
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

  //         // Clean up
  //         root.unmount();
  //         document.body.removeChild(tempContainer);

  //         // Save PDF with invoice number as filename
  //         const filename = `${
  //           invoice.invoiceNumber || `invoice_${invoiceId}`
  //         }.pdf`;
  //         pdf.save(filename);

  //         // Add delay between downloads
  //         if (i < invoicesToDownload.length - 1) {
  //           await new Promise((resolve) => setTimeout(resolve, 1000));
  //         }
  //       } catch (invoiceError) {
  //         console.error(
  //           `Error downloading invoice ${invoiceId}:`,
  //           invoiceError
  //         );
  //         alert(
  //           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
  //         );
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

//   const downloadInvoices = async () => {
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
//         console.warn(
//           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//         );
//         continue;
//       }

//       try {
//         // First fetch invoice preview data
//         const previewResponse = await fetch(
//           `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//             invoice.invoiceNumber
//           )}`
//         );

//         if (!previewResponse.ok) {
//           throw new Error(
//             `Failed to fetch invoice preview: ${previewResponse.status}`
//           );
//         }

//         const apiData = await previewResponse.json();

//         // Transform data exactly like in handlePreview
//         const transformedData = [
//           {
//             invoiceId: apiData.invoiceId || " ",
//             invoiceDate: apiData.period || " ",
//             currency: apiData.currency || " ",
//             totalAmount: apiData.totalAmount || 0,

//             lineItems: (apiData.lineItems || []).map((item, index) => ({
//               poLine: item.poLine || " ",
//               plc: item.plc || " ",
//               vendor: item.vendor || " ",
//               employee: item.employee || " ",
//               hours: item.hours || 0,
//               rate: item.rate || 0,
//               amount: item.amount || 0,
//               line_No: item.line_No || " ",
//             })),

//             billTo: apiData.billTo || " ",
//             buyer: apiData.buyer || " ",
//             purchaseOrderId: apiData.po_Number || " ",
//             releaseNumber: apiData.po_rlse_Number || " ",
//             poStartEndDate: apiData.po_Start_End_Date || " ",
//             terms: apiData.terms || " ",
//             amountDue: apiData.totalAmount || 0,
//             period: apiData.period || " ",
//             po_Number: apiData.po_Number || " ",
//             po_rlse_Number: apiData.po_rlse_Number || " ",
//             po_Start_End_Date: apiData.po_Start_End_Date || " ",
//           },
//         ];

//         // Create temporary container with proper sizing for large invoices
//         const tempContainer = document.createElement("div");
//         tempContainer.style.position = "absolute";
//         tempContainer.style.left = "-9999px";
//         tempContainer.style.width = "210mm"; // A4 width
//         tempContainer.style.minHeight = "297mm"; // A4 height
//         tempContainer.style.backgroundColor = "white";
//         tempContainer.style.padding = "0";
//         tempContainer.style.margin = "0";
//         tempContainer.style.overflow = "visible";
//         document.body.appendChild(tempContainer);

//         // Create temporary React root and render InvoiceViewer
//         const ReactDOM = (await import("react-dom/client")).default;
//         const React = (await import("react")).default;

//         // Import InvoiceViewer component
//         const { default: InvoiceViewer } = await import("./InvoiceViewer");

//         const root = ReactDOM.createRoot(tempContainer);

//         // Render InvoiceViewer component
//         await new Promise((resolve) => {
//           root.render(
//             React.createElement(InvoiceViewer, {
//               data: transformedData,
//               setInvoiceModalVisible: () => {},
//             })
//           );

//           // Wait longer for component to render completely with all line items
//           setTimeout(resolve, 1500);
//         });

//         // Find the invoice content div
//         const input = tempContainer.querySelector(
//           'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
//         ) || tempContainer.firstElementChild;

//         if (!input) {
//           throw new Error("Invoice content not found");
//         }

//         // Enhanced PDF generation for large invoices
//         const pdf = new jsPDF("p", "mm", "a4");
        
//         // Improved html2canvas options for better quality and large content handling
//         const canvas = await html2canvas(input, { 
//           scale: 1.5, // Reduced scale for better performance with large content
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: '#ffffff',
//           scrollX: 0,
//           scrollY: 0,
//           width: input.scrollWidth,
//           height: input.scrollHeight,
//           windowWidth: input.scrollWidth,
//           windowHeight: input.scrollHeight
//         });
        
//         const imgData = canvas.toDataURL("image/png", 0.95); // Slightly compressed for smaller file size

//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const padding = 5; // Reduced padding for more content space

//         const usableWidth = pdfWidth - 2 * padding;
//         const usableHeight = pdfHeight - 2 * padding;

//         const imgProps = pdf.getImageProperties(imgData);
//         const aspectRatio = imgProps.height / imgProps.width;
//         const pdfImgHeight = usableWidth * aspectRatio;

//         let heightLeft = pdfImgHeight;
//         let position = padding;

//         // Add first page
//         pdf.addImage(
//           imgData,
//           "PNG",
//           padding,
//           position,
//           usableWidth,
//           pdfImgHeight
//         );
//         heightLeft -= usableHeight;

//         // Add additional pages for large invoices
//         while (heightLeft > 0) {
//           pdf.addPage();
//           position = -(pdfImgHeight - heightLeft) + padding;
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

//         // Clean up
//         root.unmount();
//         document.body.removeChild(tempContainer);

//         // Save PDF with invoice number as filename
//         const filename = `${
//           invoice.invoiceNumber || `invoice_${invoiceId}`
//         }.pdf`;
//         pdf.save(filename);

//         // Add delay between downloads to prevent browser blocking
//         if (i < invoicesToDownload.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         }
//       } catch (invoiceError) {
//         console.error(
//           `Error downloading invoice ${invoiceId}:`,
//           invoiceError
//         );
//         alert(
//           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
//         );
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
        console.warn(
          `Skipping invoice without ID: ${JSON.stringify(invoice)}`
        );
        continue;
      }

      try {
        // First fetch invoice preview data
        const previewResponse = await fetch(
          `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
            invoice.invoiceNumber
          )}`
        );

        if (!previewResponse.ok) {
          throw new Error(
            `Failed to fetch invoice preview: ${previewResponse.status}`
          );
        }

        const apiData = await previewResponse.json();

        // Function to group and combine line items with same PLC, Vendor, and Employee
        const groupAndCombineLineItems = (lineItems) => {
          if (!lineItems || !Array.isArray(lineItems)) {
            return [];
          }

          const groupedItems = {};

          lineItems.forEach((item, index) => {
            // Create a unique key for grouping based on PLC, Vendor, and Employee
            const plcKey = item.plc || '';
            const vendorKey = item.vendor || '';
            const employeeKey = item.employee || '';
            
            const groupKey = `${plcKey}_${vendorKey}_${employeeKey}`;
            
            if (groupedItems[groupKey]) {
              // Combine with existing group - sum hours and amounts
              const existingHours = parseFloat(groupedItems[groupKey].hours) || 0;
              const newHours = parseFloat(item.hours) || 0;
              groupedItems[groupKey].hours = existingHours + newHours;
              
              const existingAmount = parseFloat(groupedItems[groupKey].amount) || 0;
              const newAmount = parseFloat(item.amount) || 0;
              groupedItems[groupKey].amount = existingAmount + newAmount;
              
              // Keep track of combined count for reference
              groupedItems[groupKey].combinedCount = (groupedItems[groupKey].combinedCount || 1) + 1;
              
            } else {
              // First occurrence of this combination
              groupedItems[groupKey] = {
                poLine: item.poLine || " ",
                plc: item.plc || " ",
                vendor: item.vendor || " ",
                employee: item.employee || " ",
                hours: parseFloat(item.hours) || 0,
                rate: item.rate || 0,
                amount: parseFloat(item.amount) || 0,
                line_No: item.line_No || " ",
                combinedCount: 1
              };
            }
          });

          // Convert grouped items back to array with formatted values
          return Object.values(groupedItems).map(item => ({
            poLine: item.poLine,
            plc: item.plc,
            vendor: item.vendor,
            employee: item.employee,
            hours: Number(item.hours.toFixed(2)),
            rate: item.rate,
            amount: Number(item.amount.toFixed(2)),
            line_No: item.line_No,
          }));
        };

        // Group and combine line items
        const combinedLineItems = groupAndCombineLineItems(apiData.lineItems || []);

        // Recalculate total amount based on combined line items
        const newTotalAmount = combinedLineItems.reduce((sum, item) => {
          return sum + (parseFloat(item.amount) || 0);
        }, 0);

        // Transform data with combined line items
        const transformedData = [
          {
            invoiceId: apiData.invoiceId || " ",
            invoiceDate: apiData.period || " ",
            currency: apiData.currency || " ",
            totalAmount: Number(newTotalAmount.toFixed(2)),

            lineItems: combinedLineItems,

            billTo: apiData.billTo || " ",
            buyer: apiData.buyer || " ",
            purchaseOrderId: apiData.po_Number || " ",
            releaseNumber: apiData.po_rlse_Number || " ",
            poStartEndDate: apiData.po_Start_End_Date || " ",
            terms: apiData.terms || " ",
            amountDue: Number(newTotalAmount.toFixed(2)),
            period: apiData.period || " ",
            po_Number: apiData.po_Number || " ",
            po_rlse_Number: apiData.po_rlse_Number || " ",
            po_Start_End_Date: apiData.po_Start_End_Date || " ",
          },
        ];

        console.log("Original API data for download:", apiData);
        console.log("Combined line items for download:", combinedLineItems);
        console.log("Transformed download data:", transformedData);

        // Create temporary container
    //     const tempContainer = document.createElement("div");
    //     tempContainer.style.position = "absolute";
    //     tempContainer.style.left = "-9999px";
    //     tempContainer.style.top = "0";
    //     tempContainer.style.width = "210mm";
    //     tempContainer.style.backgroundColor = "white";
    //     tempContainer.style.padding = "14mm";
    //     tempContainer.style.margin = "0";
    //     tempContainer.style.boxSizing = "border-box";
    //     tempContainer.style.fontFamily = "Arial, sans-serif";
    //     tempContainer.style.fontSize = "12px";
    //     tempContainer.style.lineHeight = "1.4";
    //     tempContainer.style.color = "#000000";
    //     document.body.appendChild(tempContainer);

    //     // Create temporary React root and render InvoiceViewer
    //     const ReactDOM = (await import("react-dom/client")).default;
    //     const React = (await import("react")).default;
    //     const { default: InvoiceViewer } = await import("./InvoiceViewer");

    //     const root = ReactDOM.createRoot(tempContainer);

    //     await new Promise((resolve) => {
    //       root.render(
    //         React.createElement(InvoiceViewer, {
    //           data: transformedData,
    //           setInvoiceModalVisible: () => {},
    //         })
    //       );
    //       setTimeout(resolve, 3000);
    //     });

    //     await new Promise(resolve => setTimeout(resolve, 1000));

    //     const input = tempContainer.querySelector(
    //       'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
    //     ) || tempContainer.firstElementChild || tempContainer;

    //     if (!input) {
    //       throw new Error("Invoice content not found");
    //     }

    //     // Ensure content is visible
    //     input.style.display = "block";
    //     input.style.visibility = "visible";
    //     input.style.opacity = "1";

    //     // Initialize PDF
    //     const pdf = new jsPDF("p", "mm", "a4");
    //     const pdfWidth = pdf.internal.pageSize.getWidth();
    //     const pdfHeight = pdf.internal.pageSize.getHeight();
    //     const margin = 10;
    //     const usableWidth = pdfWidth - 2 * margin;
    //     const usableHeight = pdfHeight - 2 * margin;

    //     // Capture full content first
    //     const fullCanvas = await html2canvas(input, {
    //       scale: 1.5,
    //       useCORS: true,
    //       allowTaint: true,
    //       backgroundColor: '#ffffff',
    //       scrollX: 0,
    //       scrollY: 0,
    //       width: input.scrollWidth || input.clientWidth,
    //       height: input.scrollHeight || input.clientHeight,
    //       windowWidth: 1200,
    //       logging: false,
    //     });

    //     if (fullCanvas.width === 0 || fullCanvas.height === 0) {
    //       throw new Error("Canvas has zero dimensions");
    //     }

    //     const fullImgData = fullCanvas.toDataURL("image/png", 0.98);
        
    //     // Calculate scaling
    //     const imgProps = pdf.getImageProperties(fullImgData);
    //     const scale = usableWidth / imgProps.width;
    //     const scaledHeight = imgProps.height * scale;

    //     // Calculate pages needed
    //     const pageHeight = usableHeight;
    //     const totalPages = Math.ceil(scaledHeight / pageHeight);

    //     // Smart page breaking - detect table rows and avoid cutting them
    //     let currentY = 0;
    //     let pageNumber = 0;

    //     // Detect table rows by looking for horizontal patterns in the content
    //     const detectTableRows = () => {
    //       const rows = [];
    //       const tableElements = input.querySelectorAll('tr, .table-row, [class*="row"]');
          
    //       if (tableElements.length > 0) {
    //         tableElements.forEach(row => {
    //           const rect = row.getBoundingClientRect();
    //           const inputRect = input.getBoundingClientRect();
    //           const relativeTop = rect.top - inputRect.top + input.scrollTop;
    //           const relativeBottom = relativeTop + rect.height;
              
    //           rows.push({
    //             top: relativeTop * scale,
    //             bottom: relativeBottom * scale,
    //             height: rect.height * scale
    //           });
    //         });
    //       }
          
    //       return rows.sort((a, b) => a.top - b.top);
    //     };

    //     const tableRows = detectTableRows();

    //     while (currentY < scaledHeight && pageNumber < 50) { // Safety limit
    //       if (pageNumber > 0) {
    //         pdf.addPage();
    //       }

    //       let nextY = currentY + pageHeight;
          
    //       // Check if we would cut through a table row
    //       if (tableRows.length > 0) {
    //         for (const row of tableRows) {
    //           // If a row would be cut by the page break
    //           if (row.top < nextY && row.bottom > nextY) {
    //             // If the row can fit on current page, adjust nextY to include it
    //             if (row.bottom - currentY <= pageHeight) {
    //               nextY = row.bottom;
    //             } else {
    //               // If row is too big for current page, move it to next page
    //               nextY = row.top;
    //             }
    //             break;
    //           }
    //         }
    //       }

    //       // Ensure we don't go beyond content
    //       const actualHeight = Math.min(nextY - currentY, scaledHeight - currentY);
          
    //       if (actualHeight > 0) {
    //         // Create canvas for this page section
    //         const pageCanvas = document.createElement('canvas');
    //         const pageCtx = pageCanvas.getContext('2d');
            
    //         const sourceY = currentY / scale;
    //         const sourceHeight = actualHeight / scale;
            
    //         pageCanvas.width = fullCanvas.width;
    //         pageCanvas.height = sourceHeight;
            
    //         // Draw the section
    //         pageCtx.drawImage(
    //           fullCanvas,
    //           0, sourceY, fullCanvas.width, sourceHeight,
    //           0, 0, fullCanvas.width, sourceHeight
    //         );
            
    //         const pageImgData = pageCanvas.toDataURL("image/png", 0.98);
            
    //         // Add to PDF
    //         pdf.addImage(
    //           pageImgData,
    //           "PNG",
    //           margin,
    //           margin,
    //           usableWidth,
    //           actualHeight
    //         );
    //       }

    //       currentY = nextY;
    //       pageNumber++;
    //     }

    //     // Fallback: if no pages were created, add the full image
    //     if (pageNumber === 0) {
    //       pdf.addImage(
    //         fullImgData,
    //         "PNG",
    //         margin,
    //         margin,
    //         usableWidth,
    //         Math.min(scaledHeight, pageHeight)
    //       );
    //     }

    //     // Clean up
    //     root.unmount();
    //     document.body.removeChild(tempContainer);

    //     // Save PDF
    //     const filename = `${
    //       invoice.invoiceNumber || `invoice_${invoiceId}`
    //     }.pdf`;
    //     pdf.save(filename);

    //     // Add delay between downloads
    //     if (i < invoicesToDownload.length - 1) {
    //       await new Promise((resolve) => setTimeout(resolve, 2000));
    //     }

    //   } catch (invoiceError) {
    //     console.error(
    //       `Error downloading invoice ${invoiceId}:`,
    //       invoiceError
    //     );
    //     alert(
    //       `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
    //     );
    //   }
    // }

    // const successMessage =
    //   invoicesToDownload.length === 1
    //     ? "Invoice downloaded successfully!"
    //     : `${invoicesToDownload.length} invoices downloaded successfully!`;

    // alert(successMessage);

    // Create temporary container
          const tempContainer = document.createElement("div");
          tempContainer.style.position = "absolute";
          tempContainer.style.left = "-9999px";
          tempContainer.style.top = "0";
          tempContainer.style.width = "210mm";
          tempContainer.style.backgroundColor = "white";
          tempContainer.style.padding = "14mm";
          tempContainer.style.margin = "0";
          tempContainer.style.boxSizing = "border-box";
          tempContainer.style.fontFamily = "Arial, sans-serif";
          tempContainer.style.fontSize = "12px";
          tempContainer.style.lineHeight = "1.4";
          tempContainer.style.color = "#000000";
          document.body.appendChild(tempContainer);
 
          const ReactDOM = (await import("react-dom/client")).default;
          const React = (await import("react")).default;
          const { default: InvoiceViewer } = await import("./InvoiceViewer");
 
          const root = ReactDOM.createRoot(tempContainer);
 
          await new Promise((resolve) => {
            root.render(
              React.createElement(InvoiceViewer, {
                data: transformedData,
                setInvoiceModalVisible: () => {},
              })
            );
            setTimeout(resolve, 3000);
          });
 
          await new Promise((resolve) => setTimeout(resolve, 1000));
 
          const input =
            tempContainer.querySelector(
              'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
            ) ||
            tempContainer.firstElementChild ||
            tempContainer;
 
          if (!input) {
            throw new Error("Invoice content not found");
          }
 
          input.style.display = "block";
          input.style.visibility = "visible";
          input.style.opacity = "1";
 
          // **COMPLETELY FIXED PDF GENERATION WITH PROPER ROW DETECTION**
        //   const pdf = new jsPDF("p", "mm", "a4");
        //   const pdfWidth = pdf.internal.pageSize.getWidth();
        //   const pdfHeight = pdf.internal.pageSize.getHeight();
        //   const margin = 10;
        //   const usableWidth = pdfWidth - 2 * margin;
        //   const usableHeight = pdfHeight - 2 * margin;
        //   const bottomPadding = 15; // Extra padding to prevent cutting
 
        //   // Capture full content
        //   const fullCanvas = await html2canvas(input, {
        //     scale: 1.5,
        //     useCORS: true,
        //     allowTaint: true,
        //     backgroundColor: "#ffffff",
        //     scrollX: 0,
        //     scrollY: 0,
        //     width: input.scrollWidth || input.clientWidth,
        //     height: input.scrollHeight || input.clientHeight,
        //     windowWidth: 1200,
        //     logging: false,
        //   });
 
        //   if (fullCanvas.width === 0 || fullCanvas.height === 0) {
        //     throw new Error("Canvas has zero dimensions");
        //   }
 
        //   const fullImgData = fullCanvas.toDataURL("image/png", 0.98);
        //   const imgProps = pdf.getImageProperties(fullImgData);
        //   const scale = usableWidth / imgProps.width;
        //   const scaledHeight = imgProps.height * scale;
 
        //   // **IMPROVED TABLE ROW DETECTION**
        //   const detectTableRowBoundaries = () => {
        //     const rowBoundaries = [];
 
        //     // Look for table structure elements
        //     const tableRows = input.querySelectorAll("tr");
        //     const cellElements = input.querySelectorAll("td, th");
 
        //     if (tableRows.length > 0) {
        //       // Use actual table rows
        //       tableRows.forEach((row, index) => {
        //         const rect = row.getBoundingClientRect();
        //         const inputRect = input.getBoundingClientRect();
        //         const relativeTop =
        //           (rect.top - inputRect.top + input.scrollTop) * scale;
        //         const relativeBottom = relativeTop + rect.height * scale;
 
        //         rowBoundaries.push({
        //           top: relativeTop,
        //           bottom: relativeBottom,
        //           height: rect.height * scale,
        //           element: row,
        //           index: index,
        //         });
        //       });
        //     } else if (cellElements.length > 0) {
        //       // Fallback: group cells into logical rows by vertical position
        //       const cellPositions = Array.from(cellElements).map((cell) => {
        //         const rect = cell.getBoundingClientRect();
        //         const inputRect = input.getBoundingClientRect();
        //         return {
        //           top: (rect.top - inputRect.top + input.scrollTop) * scale,
        //           bottom:
        //             (rect.top - inputRect.top + input.scrollTop + rect.height) *
        //             scale,
        //           height: rect.height * scale,
        //           element: cell,
        //         };
        //       });
 
        //       // Group cells by similar top positions (within 5 pixels)
        //       const tolerance = 5 * scale;
        //       const groupedRows = [];
 
        //       cellPositions.forEach((cell) => {
        //         let foundGroup = false;
        //         for (const group of groupedRows) {
        //           if (Math.abs(group[0].top - cell.top) <= tolerance) {
        //             group.push(cell);
        //             foundGroup = true;
        //             break;
        //           }
        //         }
        //         if (!foundGroup) {
        //           groupedRows.push([cell]);
        //         }
        //       });
 
        //       // Create row boundaries from grouped cells
        //       groupedRows.forEach((group, index) => {
        //         const minTop = Math.min(...group.map((cell) => cell.top));
        //         const maxBottom = Math.max(...group.map((cell) => cell.bottom));
 
        //         rowBoundaries.push({
        //           top: minTop,
        //           bottom: maxBottom,
        //           height: maxBottom - minTop,
        //           index: index,
        //         });
        //       });
        //     }
 
        //     return rowBoundaries.sort((a, b) => a.top - b.top);
        //   };
 
        //   const rowBoundaries = detectTableRowBoundaries();
        //   console.log("Detected row boundaries:", rowBoundaries.length);
 
        //   // **SMART PAGE BREAKING WITH PROPER ROW HANDLING**
        //   let currentY = 0;
        //   let pageNumber = 0;
 
        //   while (currentY < scaledHeight && pageNumber < 50) {
        //     if (pageNumber > 0) {
        //       pdf.addPage();
        //     }
 
        //     const availableHeight = usableHeight - bottomPadding;
        //     let nextY = currentY + availableHeight;
 
        //     // **IMPROVED ROW BOUNDARY CHECKING**
        //     if (rowBoundaries.length > 0) {
        //       // Find rows that would be affected by this page break
        //       for (const row of rowBoundaries) {
        //         // If we would cut through this row
        //         if (
        //           row.top >= currentY &&
        //           row.top < nextY &&
        //           row.bottom > nextY
        //         ) {
        //           // Check if entire row can fit on current page
        //           if (row.bottom - currentY <= availableHeight) {
        //             // Include the complete row
        //             nextY = row.bottom + 2; // Small buffer after row
        //           } else {
        //             // Move entire row to next page
        //             nextY = row.top;
        //           }
        //           break;
        //         }
        //         // If row starts within current page but extends beyond
        //         else if (row.top < nextY && row.bottom > nextY) {
        //           // If most of row is on current page, include it
        //           const rowOnCurrentPage = nextY - row.top;
        //           const rowTotal = row.bottom - row.top;
 
        //           if (rowOnCurrentPage >= rowTotal * 0.6) {
        //             nextY = row.bottom + 2;
        //           } else {
        //             nextY = row.top;
        //           }
        //           break;
        //         }
        //       }
        //     }
 
        //     // Ensure we don't exceed total content
        //     const actualHeight = Math.min(
        //       nextY - currentY,
        //       scaledHeight - currentY
        //     );
 
        //     if (actualHeight > 0) {
        //       // Create canvas section for this page
        //       const pageCanvas = document.createElement("canvas");
        //       const pageCtx = pageCanvas.getContext("2d");
 
        //       const sourceY = currentY / scale;
        //       const sourceHeight = actualHeight / scale;
 
        //       pageCanvas.width = fullCanvas.width;
        //       pageCanvas.height = sourceHeight;
 
        //       // Draw the specific section
        //       pageCtx.drawImage(
        //         fullCanvas,
        //         0,
        //         sourceY, // Source x, y
        //         fullCanvas.width,
        //         sourceHeight, // Source width, height
        //         0,
        //         0, // Destination x, y
        //         fullCanvas.width,
        //         sourceHeight // Destination width, height
        //       );
 
        //       const pageImgData = pageCanvas.toDataURL("image/png", 0.98);
 
        //       // Add to PDF
        //       pdf.addImage(
        //         pageImgData,
        //         "PNG",
        //         margin,
        //         margin,
        //         usableWidth,
        //         actualHeight
        //       );
        //     }
 
        //     currentY = nextY;
        //     pageNumber++;
        //   }
 
        //   // Fallback
        //   if (pageNumber === 0) {
        //     pdf.addImage(
        //       fullImgData,
        //       "PNG",
        //       margin,
        //       margin,
        //       usableWidth,
        //       Math.min(scaledHeight, usableHeight)
        //     );
        //   }

        // Initialize PDF with same settings as downloadInvoices
const pdf = new jsPDF("p", "mm", "a4");
const pdfWidth = pdf.internal.pageSize.getWidth();
const pdfHeight = pdf.internal.pageSize.getHeight();
const margin = 10;
const usableWidth = pdfWidth - 2 * margin;
const usableHeight = pdfHeight - 2 * margin;

// Capture full content first with same settings as downloadInvoices
const fullCanvas = await html2canvas(input, {
  scale: 1.5,
  useCORS: true,
  allowTaint: true,
  backgroundColor: "#ffffff",
  scrollX: 0,
  scrollY: 0,
  width: input.scrollWidth || input.clientWidth,
  height: input.scrollHeight || input.clientHeight,
  windowWidth: 1200,
  logging: false,
});

if (fullCanvas.width === 0 || fullCanvas.height === 0) {
  throw new Error("Canvas has zero dimensions");
}

const fullImgData = fullCanvas.toDataURL("image/png", 0.98);

// Calculate scaling
const imgProps = pdf.getImageProperties(fullImgData);
const scale = usableWidth / imgProps.width;
const scaledHeight = imgProps.height * scale;

// Calculate pages needed
const pageHeight = usableHeight;

// Smart page breaking - detect table rows and avoid cutting them
let currentY = 0;
let pageNumber = 0;

// Detect table rows by looking for horizontal patterns in the content
const detectTableRows = () => {
  const rows = [];
  const tableElements = input.querySelectorAll(
    'tr, .table-row, [class*="row"]'
  );

  if (tableElements.length > 0) {
    tableElements.forEach((row) => {
      const rect = row.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();
      const relativeTop = rect.top - inputRect.top + input.scrollTop;
      const relativeBottom = relativeTop + rect.height;

      rows.push({
        top: relativeTop * scale,
        bottom: relativeBottom * scale,
        height: rect.height * scale,
      });
    });
  }

  return rows.sort((a, b) => a.top - b.top);
};

const tableRows = detectTableRows();

while (currentY < scaledHeight && pageNumber < 50) {
  // Safety limit
  if (pageNumber > 0) {
    pdf.addPage();
  }

  let nextY = currentY + pageHeight;

  // Check if we would cut through a table row
  if (tableRows.length > 0) {
    for (const row of tableRows) {
      // If a row would be cut by the page break
      if (row.top < nextY && row.bottom > nextY) {
        // If the row can fit on current page, adjust nextY to include it
        if (row.bottom - currentY <= pageHeight) {
          nextY = row.bottom;
        } else {
          // If row is too big for current page, move it to next page
          nextY = row.top;
        }
        break;
      }
    }
  }

  // Ensure we don't go beyond content
  const actualHeight = Math.min(
    nextY - currentY,
    scaledHeight - currentY
  );

  if (actualHeight > 0) {
    // Create canvas for this page section
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    const sourceY = currentY / scale;
    const sourceHeight = actualHeight / scale;

    pageCanvas.width = fullCanvas.width;
    pageCanvas.height = sourceHeight;

    // Draw the section
    pageCtx.drawImage(
      fullCanvas,
      0,
      sourceY,
      fullCanvas.width,
      sourceHeight,
      0,
      0,
      fullCanvas.width,
      sourceHeight
    );

    const pageImgData = pageCanvas.toDataURL("image/png", 0.98);

    // Add to PDF
    pdf.addImage(
      pageImgData,
      "PNG",
      margin,
      margin,
      usableWidth,
      actualHeight
    );
  }

  currentY = nextY;
  pageNumber++;
}

// Fallback: if no pages were created, add the full image
if (pageNumber === 0) {
  pdf.addImage(
    fullImgData,
    "PNG",
    margin,
    margin,
    usableWidth,
    Math.min(scaledHeight, pageHeight)
  );
}

 
          // Clean up
          root.unmount();
          document.body.removeChild(tempContainer);
 
          // Save PDF
          const filename = `${
            invoice.invoiceNumber || `invoice_${invoiceId}`
          }.pdf`;
          pdf.save(filename);
 
          if (i < invoicesToDownload.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }
        } catch (invoiceError) {
          console.error(
            `Error downloading invoice ${invoiceId}:`,
            invoiceError
          );
          alert(
            `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
          );
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
//         console.warn(
//           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//         );
//         continue;
//       }

//       try {
//         // First fetch invoice preview data
//         const previewResponse = await fetch(
//           `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//             invoice.invoiceNumber
//           )}`
//         );

//         if (!previewResponse.ok) {
//           throw new Error(
//             `Failed to fetch invoice preview: ${previewResponse.status}`
//           );
//         }

//         const apiData = await previewResponse.json();

//         // Transform data exactly like in handlePreview
//         const transformedData = [
//           {
//             invoiceId: apiData.invoiceId || " ",
//             invoiceDate: apiData.period || " ",
//             currency: apiData.currency || " ",
//             totalAmount: apiData.totalAmount || 0,

//             lineItems: (apiData.lineItems || []).map((item, index) => ({
//               poLine: item.poLine || " ",
//               plc: item.plc || " ",
//               vendor: item.vendor || " ",
//               employee: item.employee || " ",
//               hours: item.hours || 0,
//               rate: item.rate || 0,
//               amount: item.amount || 0,
//               line_No: item.line_No || " ",
//             })),

//             billTo: apiData.billTo || " ",
//             buyer: apiData.buyer || " ",
//             purchaseOrderId: apiData.po_Number || " ",
//             releaseNumber: apiData.po_rlse_Number || " ",
//             poStartEndDate: apiData.po_Start_End_Date || " ",
//             terms: apiData.terms || " ",
//             amountDue: apiData.totalAmount || 0,
//             period: apiData.period || " ",
//             po_Number: apiData.po_Number || " ",
//             po_rlse_Number: apiData.po_rlse_Number || " ",
//             po_Start_End_Date: apiData.po_Start_End_Date || " ",
//           },
//         ];

//         // Create temporary container
//         const tempContainer = document.createElement("div");
//         tempContainer.style.position = "absolute";
//         tempContainer.style.left = "-9999px";
//         tempContainer.style.top = "0";
//         tempContainer.style.width = "210mm";
//         tempContainer.style.backgroundColor = "white";
//         tempContainer.style.padding = "15mm";
//         tempContainer.style.margin = "0";
//         tempContainer.style.boxSizing = "border-box";
//         tempContainer.style.fontFamily = "Arial, sans-serif";
//         tempContainer.style.fontSize = "12px";
//         tempContainer.style.lineHeight = "1.4";
//         tempContainer.style.color = "#000000";
//         document.body.appendChild(tempContainer);

//         // Create temporary React root and render InvoiceViewer
//         const ReactDOM = (await import("react-dom/client")).default;
//         const React = (await import("react")).default;
//         const { default: InvoiceViewer } = await import("./InvoiceViewer");

//         const root = ReactDOM.createRoot(tempContainer);

//         await new Promise((resolve) => {
//           root.render(
//             React.createElement(InvoiceViewer, {
//               data: transformedData,
//               setInvoiceModalVisible: () => {},
//             })
//           );
//           setTimeout(resolve, 3000);
//         });

//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const input = tempContainer.querySelector(
//           'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
//         ) || tempContainer.firstElementChild || tempContainer;

//         if (!input) {
//           throw new Error("Invoice content not found");
//         }

//         // Ensure content is visible
//         input.style.display = "block";
//         input.style.visibility = "visible";
//         input.style.opacity = "1";

//         // Initialize PDF
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const margin = 10;
//         const usableWidth = pdfWidth - 2 * margin;
//         const usableHeight = pdfHeight - 2 * margin;

//         // Capture full content first
//         const fullCanvas = await html2canvas(input, {
//           scale: 1.5,
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: '#ffffff',
//           scrollX: 0,
//           scrollY: 0,
//           width: input.scrollWidth || input.clientWidth,
//           height: input.scrollHeight || input.clientHeight,
//           windowWidth: 1200,
//           logging: false,
//         });

//         if (fullCanvas.width === 0 || fullCanvas.height === 0) {
//           throw new Error("Canvas has zero dimensions");
//         }

//         const fullImgData = fullCanvas.toDataURL("image/png", 0.98);
        
//         // Calculate scaling
//         const imgProps = pdf.getImageProperties(fullImgData);
//         const scale = usableWidth / imgProps.width;
//         const scaledHeight = imgProps.height * scale;

//         // Calculate pages needed
//         const pageHeight = usableHeight;
//         const totalPages = Math.ceil(scaledHeight / pageHeight);

//         // Smart page breaking - detect table rows and avoid cutting them
//         let currentY = 0;
//         let pageNumber = 0;

//         // Detect table rows by looking for horizontal patterns in the content
//         const detectTableRows = () => {
//           const rows = [];
//           const tableElements = input.querySelectorAll('tr, .table-row, [class*="row"]');
          
//           if (tableElements.length > 0) {
//             tableElements.forEach(row => {
//               const rect = row.getBoundingClientRect();
//               const inputRect = input.getBoundingClientRect();
//               const relativeTop = rect.top - inputRect.top + input.scrollTop;
//               const relativeBottom = relativeTop + rect.height;
              
//               rows.push({
//                 top: relativeTop * scale,
//                 bottom: relativeBottom * scale,
//                 height: rect.height * scale
//               });
//             });
//           }
          
//           return rows.sort((a, b) => a.top - b.top);
//         };

//         const tableRows = detectTableRows();

//         while (currentY < scaledHeight && pageNumber < 50) { // Safety limit
//           if (pageNumber > 0) {
//             pdf.addPage();
//           }

//           let nextY = currentY + pageHeight;
          
//           // Check if we would cut through a table row
//           if (tableRows.length > 0) {
//             for (const row of tableRows) {
//               // If a row would be cut by the page break
//               if (row.top < nextY && row.bottom > nextY) {
//                 // If the row can fit on current page, adjust nextY to include it
//                 if (row.bottom - currentY <= pageHeight) {
//                   nextY = row.bottom;
//                 } else {
//                   // If row is too big for current page, move it to next page
//                   nextY = row.top;
//                 }
//                 break;
//               }
//             }
//           }

//           // Ensure we don't go beyond content
//           const actualHeight = Math.min(nextY - currentY, scaledHeight - currentY);
          
//           if (actualHeight > 0) {
//             // Create canvas for this page section
//             const pageCanvas = document.createElement('canvas');
//             const pageCtx = pageCanvas.getContext('2d');
            
//             const sourceY = currentY / scale;
//             const sourceHeight = actualHeight / scale;
            
//             pageCanvas.width = fullCanvas.width;
//             pageCanvas.height = sourceHeight;
            
//             // Draw the section
//             pageCtx.drawImage(
//               fullCanvas,
//               0, sourceY, fullCanvas.width, sourceHeight,
//               0, 0, fullCanvas.width, sourceHeight
//             );
            
//             const pageImgData = pageCanvas.toDataURL("image/png", 0.98);
            
//             // Add to PDF
//             pdf.addImage(
//               pageImgData,
//               "PNG",
//               margin,
//               margin,
//               usableWidth,
//               actualHeight
//             );
//           }

//           currentY = nextY;
//           pageNumber++;
//         }

//         // Fallback: if no pages were created, add the full image
//         if (pageNumber === 0) {
//           pdf.addImage(
//             fullImgData,
//             "PNG",
//             margin,
//             margin,
//             usableWidth,
//             Math.min(scaledHeight, pageHeight)
//           );
//         }

//         // Clean up
//         root.unmount();
//         document.body.removeChild(tempContainer);

//         // Save PDF
//         const filename = `${
//           invoice.invoiceNumber || `invoice_${invoiceId}`
//         }.pdf`;
//         pdf.save(filename);

//         // Add delay between downloads
//         if (i < invoicesToDownload.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         }

//       } catch (invoiceError) {
//         console.error(
//           `Error downloading invoice ${invoiceId}:`,
//           invoiceError
//         );
//         alert(
//           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
//         );
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
//         console.warn(
//           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//         );
//         continue;
//       }

//       try {
//         // First fetch invoice preview data
//         const previewResponse = await fetch(
//           `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//             invoice.invoiceNumber
//           )}`
//         );

//         if (!previewResponse.ok) {
//           throw new Error(
//             `Failed to fetch invoice preview: ${previewResponse.status}`
//           );
//         }

//         const apiData = await previewResponse.json();

//         // Transform data exactly like in handlePreview
//         const transformedData = [
//           {
//             invoiceId: apiData.invoiceId || " ",
//             invoiceDate: apiData.period || " ",
//             currency: apiData.currency || " ",
//             totalAmount: apiData.totalAmount || 0,

//             lineItems: (apiData.lineItems || []).map((item, index) => ({
//               poLine: item.poLine || " ",
//               plc: item.plc || " ",
//               vendor: item.vendor || " ",
//               employee: item.employee || " ",
//               hours: item.hours || 0,
//               rate: item.rate || 0,
//               amount: item.amount || 0,
//               line_No: item.line_No || " ",
//             })),

//             billTo: apiData.billTo || " ",
//             buyer: apiData.buyer || " ",
//             purchaseOrderId: apiData.po_Number || " ",
//             releaseNumber: apiData.po_rlse_Number || " ",
//             poStartEndDate: apiData.po_Start_End_Date || " ",
//             terms: apiData.terms || " ",
//             amountDue: apiData.totalAmount || 0,
//             period: apiData.period || " ",
//             po_Number: apiData.po_Number || " ",
//             po_rlse_Number: apiData.po_rlse_Number || " ",
//             po_Start_End_Date: apiData.po_Start_End_Date || " ",
//           },
//         ];

//         // Create temporary container with consistent styling
//         const tempContainer = document.createElement("div");
//         tempContainer.style.position = "absolute";
//         tempContainer.style.left = "-9999px";
//         tempContainer.style.top = "0";
//         tempContainer.style.width = "210mm";
//         tempContainer.style.backgroundColor = "white";
//         tempContainer.style.padding = "15mm";
//         tempContainer.style.margin = "0";
//         tempContainer.style.boxSizing = "border-box";
//         tempContainer.style.fontFamily = "Arial, sans-serif";
//         tempContainer.style.fontSize = "12px";
//         tempContainer.style.lineHeight = "1.4";
//         tempContainer.style.color = "#000000";
//         // Force consistent font rendering
//         tempContainer.style.webkitFontSmoothing = "antialiased";
//         tempContainer.style.mozOsxFontSmoothing = "grayscale";
//         document.body.appendChild(tempContainer);

//         // Create temporary React root and render InvoiceViewer
//         const ReactDOM = (await import("react-dom/client")).default;
//         const React = (await import("react")).default;
//         const { default: InvoiceViewer } = await import("./InvoiceViewer");

//         const root = ReactDOM.createRoot(tempContainer);

//         await new Promise((resolve) => {
//           root.render(
//             React.createElement(InvoiceViewer, {
//               data: transformedData,
//               setInvoiceModalVisible: () => {},
//             })
//           );
//           setTimeout(resolve, 3000);
//         });

//         await new Promise(resolve => setTimeout(resolve, 1000));

//         // Find the complete invoice content (not just table)
//         const input = tempContainer.querySelector(
//           'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
//         ) || tempContainer.firstElementChild || tempContainer;

//         if (!input) {
//           throw new Error("Invoice content not found");
//         }

//         // Ensure all content is visible and properly styled
//         input.style.display = "block";
//         input.style.visibility = "visible";
//         input.style.opacity = "1";
        
//         // Force consistent font sizes throughout
//         const allElements = input.querySelectorAll('*');
//         allElements.forEach(el => {
//           if (el.style) {
//             // Ensure consistent font sizes
//             if (!el.style.fontSize || el.style.fontSize === '') {
//               el.style.fontSize = '12px';
//             }
//             // Ensure visibility
//             if (el.style.display === 'none') {
//               el.style.display = 'block';
//             }
//             el.style.visibility = 'visible';
//             el.style.opacity = '1';
//           }
//         });

//         // Initialize PDF
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const margin = 10;
//         const usableWidth = pdfWidth - 2 * margin;
//         const usableHeight = pdfHeight - 2 * margin;

//         // Capture the COMPLETE invoice content
//         const fullCanvas = await html2canvas(input, {
//           scale: 1.5,
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: '#ffffff',
//           scrollX: 0,
//           scrollY: 0,
//           width: input.scrollWidth || input.clientWidth,
//           height: input.scrollHeight || input.clientHeight,
//           windowWidth: 1200,
//           windowHeight: input.scrollHeight || input.clientHeight,
//           logging: false,
//           onclone: (clonedDoc, element) => {
//             // Ensure all elements maintain consistent styling in clone
//             const allClonedElements = clonedDoc.querySelectorAll('*');
//             allClonedElements.forEach(el => {
//               if (el.style) {
//                 el.style.display = el.style.display === 'none' ? 'block' : el.style.display;
//                 el.style.visibility = 'visible';
//                 el.style.opacity = '1';
//                 el.style.fontSize = el.style.fontSize || '12px';
//                 el.style.fontFamily = 'Arial, sans-serif';
//               }
//             });
//           }
//         });

//         if (fullCanvas.width === 0 || fullCanvas.height === 0) {
//           throw new Error("Canvas has zero dimensions");
//         }

//         const fullImgData = fullCanvas.toDataURL("image/png", 0.98);
        
//         // Calculate scaling to fit page width
//         const imgProps = pdf.getImageProperties(fullImgData);
//         const scale = usableWidth / imgProps.width;
//         const scaledHeight = imgProps.height * scale;

//         // Smart page breaking that respects content boundaries
//         let currentY = 0;
//         let pageNumber = 0;
//         const rowHeight = 25 * scale; // Approximate row height in scaled units

//         while (currentY < scaledHeight && pageNumber < 50) {
//           if (pageNumber > 0) {
//             pdf.addPage();
//           }

//           let nextY = currentY + usableHeight;
          
//           // If this isn't the last section, try to break at row boundary
//           if (nextY < scaledHeight) {
//             // Find a good break point near the end of the page
//             const searchStart = Math.max(currentY + (usableHeight * 0.7), currentY);
//             const searchEnd = nextY;
            
//             // Look for row boundaries in the last 30% of the page
//             let bestBreak = nextY;
//             for (let y = searchEnd; y >= searchStart; y -= rowHeight) {
//               bestBreak = y;
//               break; // Use the first row boundary we find
//             }
//             nextY = bestBreak;
//           }

//           const sectionHeight = Math.min(nextY - currentY, scaledHeight - currentY);
          
//           if (sectionHeight > 0) {
//             // Create canvas for this page section
//             const pageCanvas = document.createElement('canvas');
//             const pageCtx = pageCanvas.getContext('2d');
            
//             const sourceY = currentY / scale;
//             const sourceHeight = sectionHeight / scale;
            
//             pageCanvas.width = fullCanvas.width;
//             pageCanvas.height = sourceHeight;
            
//             // Draw the section with proper scaling
//             pageCtx.drawImage(
//               fullCanvas,
//               0, sourceY, fullCanvas.width, sourceHeight,
//               0, 0, fullCanvas.width, sourceHeight
//             );
            
//             const pageImgData = pageCanvas.toDataURL("image/png", 0.98);
            
//             // Add to PDF with consistent scaling
//             pdf.addImage(
//               pageImgData,
//               "PNG",
//               margin,
//               margin,
//               usableWidth,
//               sectionHeight
//             );
//           }

//           currentY = nextY;
//           pageNumber++;
//         }

//         // Fallback: if no pages were created, add the full image
//         if (pageNumber === 0) {
//           pdf.addImage(
//             fullImgData,
//             "PNG",
//             margin,
//             margin,
//             usableWidth,
//             Math.min(scaledHeight, usableHeight)
//           );
//         }

//         // Clean up
//         root.unmount();
//         document.body.removeChild(tempContainer);

//         // Save PDF
//         const filename = `${
//           invoice.invoiceNumber || `invoice_${invoiceId}`
//         }.pdf`;
//         pdf.save(filename);

//         // Add delay between downloads
//         if (i < invoicesToDownload.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         }

//       } catch (invoiceError) {
//         console.error(
//           `Error downloading invoice ${invoiceId}:`,
//           invoiceError
//         );
//         alert(
//           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
//         );
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
//         console.warn(
//           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
//         );
//         continue;
//       }

//       try {
//         // First fetch invoice preview data
//         const previewResponse = await fetch(
//           `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(
//             invoice.invoiceNumber
//           )}`
//         );

//         if (!previewResponse.ok) {
//           throw new Error(
//             `Failed to fetch invoice preview: ${previewResponse.status}`
//           );
//         }

//         const apiData = await previewResponse.json();

//         // Transform data exactly like in handlePreview
//         const transformedData = [
//           {
//             invoiceId: apiData.invoiceId || " ",
//             invoiceDate: apiData.period || " ",
//             currency: apiData.currency || " ",
//             totalAmount: apiData.totalAmount || 0,

//             lineItems: (apiData.lineItems || []).map((item, index) => ({
//               poLine: item.poLine || " ",
//               plc: item.plc || " ",
//               vendor: item.vendor || " ",
//               employee: item.employee || " ",
//               hours: item.hours || 0,
//               rate: item.rate || 0,
//               amount: item.amount || 0,
//               line_No: item.line_No || " ",
//             })),

//             billTo: apiData.billTo || " ",
//             buyer: apiData.buyer || " ",
//             purchaseOrderId: apiData.po_Number || " ",
//             releaseNumber: apiData.po_rlse_Number || " ",
//             poStartEndDate: apiData.po_Start_End_Date || " ",
//             terms: apiData.terms || " ",
//             amountDue: apiData.totalAmount || 0,
//             period: apiData.period || " ",
//             po_Number: apiData.po_Number || " ",
//             po_rlse_Number: apiData.po_rlse_Number || " ",
//             po_Start_End_Date: apiData.po_Start_End_Date || " ",
//           },
//         ];

//         // Create temporary container
//         const tempContainer = document.createElement("div");
//         tempContainer.style.position = "absolute";
//         tempContainer.style.left = "-9999px";
//         tempContainer.style.top = "0";
//         tempContainer.style.width = "210mm";
//         tempContainer.style.backgroundColor = "white";
//         tempContainer.style.padding = "15mm";
//         tempContainer.style.margin = "0";
//         tempContainer.style.boxSizing = "border-box";
//         tempContainer.style.fontFamily = "Arial, sans-serif";
//         tempContainer.style.fontSize = "12px";
//         tempContainer.style.lineHeight = "1.4";
//         tempContainer.style.color = "#000000";
//         document.body.appendChild(tempContainer);

//         // Create temporary React root and render InvoiceViewer
//         const ReactDOM = (await import("react-dom/client")).default;
//         const React = (await import("react")).default;
//         const { default: InvoiceViewer } = await import("./InvoiceViewer");

//         const root = ReactDOM.createRoot(tempContainer);

//         await new Promise((resolve) => {
//           root.render(
//             React.createElement(InvoiceViewer, {
//               data: transformedData,
//               setInvoiceModalVisible: () => {},
//             })
//           );
//           setTimeout(resolve, 3000);
//         });

//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const input = tempContainer.querySelector(
//           'div[style*="max-width: 768px"], .invoice-content, .invoice-viewer'
//         ) || tempContainer.firstElementChild || tempContainer;

//         if (!input) {
//           throw new Error("Invoice content not found");
//         }

//         input.style.display = "block";
//         input.style.visibility = "visible";
//         input.style.opacity = "1";

//         // Initialize PDF
//         const pdf = new jsPDF("p", "mm", "a4");
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
//         const margin = 10;
//         const usableWidth = pdfWidth - 2 * margin;
//         const usableHeight = pdfHeight - 2 * margin;

//         // Capture full content
//         const fullCanvas = await html2canvas(input, {
//           scale: 1.5,
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: '#ffffff',
//           scrollX: 0,
//           scrollY: 0,
//           width: input.scrollWidth || input.clientWidth,
//           height: input.scrollHeight || input.clientHeight,
//           windowWidth: 1200,
//           logging: false,
//         });

//         if (fullCanvas.width === 0 || fullCanvas.height === 0) {
//           throw new Error("Canvas has zero dimensions");
//         }

//         const fullImgData = fullCanvas.toDataURL("image/png", 0.98);
        
//         // Calculate scaling
//         const imgProps = pdf.getImageProperties(fullImgData);
//         const scale = usableWidth / imgProps.width;
//         const scaledHeight = imgProps.height * scale;

//         // Get all table row elements and their positions
//         const getRowBreakPoints = () => {
//           const breakPoints = [0]; // Start with top of document
          
//           // Find all table rows, divs that look like rows, and elements with row-like content
//           const rowSelectors = [
//             'tr',
//             'tbody tr', 
//             '.table-row',
//             '[class*="row"]',
//             'div[style*="border"]',
//             'div:has(table)',
//             'div > div:nth-child(n+2)' // Multiple child divs that might be rows
//           ];
          
//           const allRows = [];
          
//           rowSelectors.forEach(selector => {
//             try {
//               const elements = input.querySelectorAll(selector);
//               elements.forEach(el => {
//                 if (el.offsetHeight > 0) { // Only visible elements
//                   allRows.push(el);
//                 }
//               });
//             } catch (e) {
//               // Skip invalid selectors
//             }
//           });

//           // Get positions of all potential row elements
//           allRows.forEach(row => {
//             const rect = row.getBoundingClientRect();
//             const inputRect = input.getBoundingClientRect();
//             const relativeTop = (rect.top - inputRect.top + input.scrollTop) * scale;
//             const relativeBottom = relativeTop + (rect.height * scale);
            
//             if (relativeTop > 0 && relativeTop < scaledHeight) {
//               breakPoints.push(relativeTop);
//               breakPoints.push(relativeBottom);
//             }
//           });

//           // Remove duplicates and sort
//           return [...new Set(breakPoints)].sort((a, b) => a - b);
//         };

//         const breakPoints = getRowBreakPoints();
        
//         let currentY = 0;
//         let pageNumber = 0;

//         while (currentY < scaledHeight && pageNumber < 50) {
//           if (pageNumber > 0) {
//             pdf.addPage();
//           }

//           let nextY = currentY + usableHeight;
          
//           // Find the best break point that doesn't cut content
//           if (nextY < scaledHeight) { // Only adjust if we're not on the last section
//             let bestBreakPoint = nextY;
            
//             // Look for a break point within 50 units before the natural break
//             for (let i = breakPoints.length - 1; i >= 0; i--) {
//               const breakPoint = breakPoints[i];
//               if (breakPoint <= nextY && breakPoint >= currentY + (usableHeight * 0.3)) {
//                 // Found a good break point that gives us at least 30% of page content
//                 bestBreakPoint = breakPoint;
//                 break;
//               }
//             }
            
//             nextY = bestBreakPoint;
//           }

//           const actualHeight = Math.min(nextY - currentY, scaledHeight - currentY);
          
//           if (actualHeight > 0) {
//             // Create canvas for this page section
//             const pageCanvas = document.createElement('canvas');
//             const pageCtx = pageCanvas.getContext('2d');
            
//             const sourceY = currentY / scale;
//             const sourceHeight = actualHeight / scale;
            
//             pageCanvas.width = fullCanvas.width;
//             pageCanvas.height = sourceHeight;
            
//             // Draw the section
//             pageCtx.drawImage(
//               fullCanvas,
//               0, sourceY, fullCanvas.width, sourceHeight,
//               0, 0, fullCanvas.width, sourceHeight
//             );
            
//             const pageImgData = pageCanvas.toDataURL("image/png", 0.98);
            
//             // Add to PDF
//             pdf.addImage(
//               pageImgData,
//               "PNG",
//               margin,
//               margin,
//               usableWidth,
//               actualHeight
//             );
//           }

//           currentY = nextY;
//           pageNumber++;
//         }

//         // Fallback: if no pages were created, add the full image
//         if (pageNumber === 0) {
//           pdf.addImage(
//             fullImgData,
//             "PNG",
//             margin,
//             margin,
//             usableWidth,
//             Math.min(scaledHeight, usableHeight)
//           );
//         }

//         // Clean up
//         root.unmount();
//         document.body.removeChild(tempContainer);

//         // Save PDF
//         const filename = `${
//           invoice.invoiceNumber || `invoice_${invoiceId}`
//         }.pdf`;
//         pdf.save(filename);

//         // Add delay between downloads
//         if (i < invoicesToDownload.length - 1) {
//           await new Promise((resolve) => setTimeout(resolve, 2000));
//         }

//       } catch (invoiceError) {
//         console.error(
//           `Error downloading invoice ${invoiceId}:`,
//           invoiceError
//         );
//         alert(
//           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
//         );
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
  //         console.warn(
  //           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
  //         );
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
  //           throw new Error(
  //             `Failed to fetch invoice preview: ${previewResponse.status}`
  //           );
  //         }

  //         const apiData = await previewResponse.json();

  //         // Transform data exactly like in handlePreview
  //         const transformedData = [
  //           {
  //             invoiceId: apiData.invoiceId || " ",
  //             invoiceDate: apiData.period || " ",
  //             currency: apiData.currency || " ",
  //             totalAmount: apiData.totalAmount || 0,

  //             lineItems: (apiData.lineItems || []).map((item, index) => ({
  //               poLine: item.poLine || " ",
  //               plc: item.plc || " ",
  //               vendor: item.vendor || " ",
  //               employee: item.employee || " ",
  //               hours: item.hours || 0,
  //               rate: item.rate || 0,
  //               amount: item.amount || 0,
  //               line_No: item.line_No || " ",
  //             })),

  //             billTo: apiData.billTo || " ",
  //             buyer: apiData.buyer || " ",
  //             purchaseOrderId: apiData.po_Number || " ",
  //             releaseNumber: apiData.po_rlse_Number || " ",
  //             poStartEndDate: apiData.po_Start_End_Date || " ",
  //             terms: apiData.terms || " ",
  //             amountDue: apiData.totalAmount || 0,
  //             period: apiData.period || " ",
  //             po_Number: apiData.po_Number || " ",
  //             po_rlse_Number: apiData.po_rlse_Number || " ",
  //             po_Start_End_Date: apiData.po_Start_End_Date || " ",
  //           },
  //         ];

  //         // Create temporary container to render InvoiceViewer component
  //         const tempContainer = document.createElement("div");
  //         tempContainer.style.position = "absolute";
  //         tempContainer.style.left = "-9999px";
  //         tempContainer.style.width = "800px";
  //         tempContainer.style.backgroundColor = "white";
  //         document.body.appendChild(tempContainer);

  //         // Create temporary React root and render InvoiceViewer
  //         const ReactDOM = (await import("react-dom/client")).default;
  //         const React = (await import("react")).default;

  //         // Import InvoiceViewer component
  //         const { default: InvoiceViewer } = await import("./InvoiceViewer");

  //         const root = ReactDOM.createRoot(tempContainer);

  //         // Render InvoiceViewer component
  //         await new Promise((resolve) => {
  //           root.render(
  //             React.createElement(InvoiceViewer, {
  //               data: transformedData,
  //               setInvoiceModalVisible: () => {},
  //             })
  //           );

  //           // Wait for component to render
  //           setTimeout(resolve, 500);
  //         });

  //         // Find the invoice content div (the one with ref)
  //         const input = tempContainer.querySelector(
  //           'div[style*="max-width: 768px"]'
  //         );

  //         if (!input) {
  //           throw new Error("Invoice content not found");
  //         }

  //         // Use exact same PDF generation logic as handleDownloadPdf
  //         const pdf = new jsPDF("p", "mm", "a4");
  //         const padding = 10;
  //         const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  //         const imgData = canvas.toDataURL("image/png");

  //         const pdfWidth = pdf.internal.pageSize.getWidth();
  //         const pdfHeight = pdf.internal.pageSize.getHeight();

  //         const usableWidth = pdfWidth - 2 * padding;
  //         const usableHeight = pdfHeight - 2 * padding;

  //         const imgProps = pdf.getImageProperties(imgData);
  //         const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

  //         let heightLeft = pdfImgHeight;
  //         let position = padding;

  //         pdf.addImage(
  //           imgData,
  //           "PNG",
  //           padding,
  //           position,
  //           usableWidth,
  //           pdfImgHeight
  //         );
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

  //         // Clean up
  //         root.unmount();
  //         document.body.removeChild(tempContainer);

  //         // Save PDF with invoice number as filename
  //         const filename = `${
  //           invoice.invoiceNumber || `invoice_${invoiceId}`
  //         }.pdf`;
  //         pdf.save(filename);

  //         // Add delay between downloads
  //         if (i < invoicesToDownload.length - 1) {
  //           await new Promise((resolve) => setTimeout(resolve, 1000));
  //         }
  //       } catch (invoiceError) {
  //         console.error(
  //           `Error downloading invoice ${invoiceId}:`,
  //           invoiceError
  //         );
  //         alert(
  //           `Failed to download invoice ${invoiceId}: ${invoiceError.message}`
  //         );
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

  // Export to CSV function
  
  const exportToCSV = async () => {
    const invoicesToExport = filteredInvoices.filter((invoice, index) =>
      selectedInvoices.has(invoice.invoiceId || index)
    );

    if (invoicesToExport.length === 0) {
      alert("Please select invoices to export");
      return;
    }

    try {
      setIsExporting(true);
      // Track successfully exported invoices for state update
      const successfullyExportedIds = [];

      // Collect all invoice IDs for bulk export
      const invoiceIds = invoicesToExport
        .map((invoice) => invoice.invoiceId || invoice.invoiceNumber)
        .filter((id) => id) // Remove any null/undefined values
        .map((id) => parseInt(id, 10)) // Ensure they are integers
        .filter((id) => !isNaN(id)); // Remove any NaN values

      if (invoiceIds.length === 0) {
        alert("No valid invoice IDs found for export");
        return;
      }

      console.log("Invoice IDs to export:", invoiceIds); // Debug log

      try {
        // Send the array directly as the request body (not wrapped in an object)
        const response = await fetch(
          "https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoices",
          {
            method: "POST",
            headers: {
              Accept:
                "text/csv, application/csv, application/octet-stream, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(invoiceIds), // Send array directly, not wrapped in object
          }
        );

        console.log("Request body:", JSON.stringify(invoiceIds)); // Debug log

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

        // Check if response is actually a file, not JSON error
        if (blob.type && blob.type.includes("application/json")) {
          const text = await blob.text();
          console.error("Received JSON instead of file:", text);
          throw new Error("Server returned an error instead of a file");
        }

        // Generate filename for bulk export
        let filename = `bulk_invoice_export_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        const contentDisposition = response.headers.get("Content-Disposition");
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(
            /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
          );
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, "");
          }
        }

        // Download the file
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

        // Mark all invoices as successfully exported
        successfullyExportedIds.push(...invoiceIds);

        // Update invoice export status in database for each invoice
        for (const invoice of invoicesToExport) {
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
                  isExported: true,
                  updatedAt: new Date().toISOString(),
                  updatedBy: "admin",
                }),
              }
            );

            if (!updateResponse.ok) {
              console.warn(
                `Failed to update export status for invoice ${invoice.invoiceId}`
              );
            }
          } catch (updateError) {
            console.warn(
              `Error updating export status for invoice ${invoice.invoiceId}:`,
              updateError
            );
          }
        }
      } catch (exportError) {
        console.error("Error during bulk export:", exportError);
        alert(`Failed to export invoices: ${exportError.message}`);
        return;
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

        // Clear selections for exported invoices
        setSelectedInvoices((prev) => {
          const newSelected = new Set(prev);
          successfullyExportedIds.forEach((id) => newSelected.delete(id));
          return newSelected;
        });

        setSelectAll(false);
      }

      const successMessage =
        invoicesToExport.length === 1
          ? "Invoice exported successfully!"
          : `${invoicesToExport.length} invoices exported successfully!`;

      alert(successMessage);
    } catch (error) {
      console.error("Error during export process:", error);
      alert(`Export failed: ${error.message}`);
    } finally {
    setIsExporting(false); // ADD THIS LINE HERE
  }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-f9fafd flex items-center justify-center pl-44 pr-4">
        <div className="text-center">
          <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-lg text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-f9fafd flex items-center justify-center pl-44 pr-4">
        <div className="text-center text-red-600">
          <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main container matching ExportTable layout */}
      <div className="min-h-screen bg-f9fafd flex flex-col pl-44 pr-4 overflow-auto">
        {/* Header Section */}
        <div
          className="w-full flex justify-between items-center mb-4 mt-5"
          style={{
            marginLeft: 24,
            marginRight: 24,
            width: "calc(100vw - 220px)",
          }}
        >
          <div className="flex items-center">
            <Receipt className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Invoice Export
              </h1>
              <p className="text-gray-600">Manage and export invoice data</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Download Invoice Button */}
            <button
              onClick={downloadInvoices}
              disabled={selectedInvoices.size === 0 || isDownloading}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm text-sm ${
                selectedInvoices.size === 0 || isDownloading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading
                ? "Downloading..."
                : `Download (${selectedInvoices.size})`}
            </button>

            {/* Export Button */}
           {/* Export Button */}
<button
  onClick={exportToCSV}
  disabled={selectedInvoices.size === 0 || isExporting}
  data-export-button
  className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm text-sm ${
    selectedInvoices.size === 0 || isExporting
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-green-600 text-white hover:bg-green-700'
  }`}
>
  <FileDown className="h-4 w-4 mr-2" />
  {isExporting ? 'Exporting...' : `Export (${selectedInvoices.size})`}
</button>

          </div>
        </div>

        {/* Filters Section */}
        <div
          className="w-full flex justify-between items-center mb-4"
          style={{
            marginLeft: 24,
            marginRight: 24,
            width: "calc(100vw - 220px)",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Filter by Invoice Number"
                value={filterInvoiceNumber}
                onChange={(e) => setFilterInvoiceNumber(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                style={{ minWidth: "300px" }}
              />
            </div>

            {filterInvoiceNumber && (
              <button
                onClick={() => setFilterInvoiceNumber("")}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Table Container - Matching ExportTable style */}
        {filteredInvoices.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center text-gray-500">
              <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No invoices found</p>
              <p className="text-sm">Try adjusting your filter criteria</p>
            </div>
          </div>
        ) : (
          <div
            className="border border-gray-300 rounded bg-white shadow"
            style={{
              marginLeft: 24,
              marginRight: 24,
              width: "calc(100vw - 220px)",
              maxWidth: "none",
              minWidth: "800px",
              padding: "0.5rem",
              minHeight: "350px",
              maxHeight: "calc(100vh - 180px)",
              overflow: "hidden",
              marginBottom: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Action Buttons Section */}
            <div
              className="flex justify-between items-center mb-2 w-full"
              style={{ flexShrink: 0 }}
            >
              <div className="flex gap-2">
                <span className="text-sm text-gray-600">
                  Selected: {selectedInvoices.size} of{" "}
                  {selectableInvoices.length}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Showing {filteredInvoices.length} invoices
              </div>
            </div>

            {/* Scrollable Table Container - Matching ExportTable exactly */}
            <div
              style={{
                overflowX: "auto",
                overflowY: "auto",
                maxHeight: "calc(100vh - 180px)",
                minHeight: "200px",
                width: "100%",
                flex: 1,
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
              }}
            >
              <table
                style={{
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: `${minTableWidth}px`, // Force horizontal scroll
                  width: "max-content",
                }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#f8fafc",
                    zIndex: 10,
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "80px",
                        width: "80px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          disabled={selectableInvoices.length === 0}
                          className="cursor-pointer"
                        />
                        <span
                          style={{ fontSize: "11px", fontWeight: "normal" }}
                        >
                          All
                        </span>
                      </div>
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "280px",
                        width: "280px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Invoice Number
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "280px",
                        width: "280px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Work Order
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "320px",
                        width: "320px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Vendor
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "180px",
                        width: "180px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Invoice Date
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "180px",
                        width: "180px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "120px",
                        width: "120px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Currency
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "180px",
                        width: "180px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Created At
                    </th>
                    <th
                      style={{
                        border: "1px solid #d1d5db",
                        padding: "8px",
                        fontSize: "12px",
                        minWidth: "240px",
                        width: "240px",
                        fontWeight: "bold",
                        color: "#1e40af",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        backgroundColor: "#f1f5f9",
                      }}
                    >
                      Action
                    </th>
                    {userRole === "admin" && (
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "8px",
                          fontSize: "12px",
                          minWidth: "240px",
                          width: "240px",
                          fontWeight: "bold",
                          color: "#1e40af",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          backgroundColor: "#f1f5f9",
                        }}
                      >
                        Correction
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice, index) => {
                    const invoiceId = invoice.invoiceId || invoice.id || index;
                    return (
                      <tr
                        key={invoiceId}
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9fafb" : "white",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!selectedInvoices.has(invoiceId)) {
                            e.target.closest("tr").style.backgroundColor =
                              "#f3f4f6";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!selectedInvoices.has(invoiceId)) {
                            e.target.closest("tr").style.backgroundColor =
                              index % 2 === 0 ? "#f9fafb" : "white";
                          }
                        }}
                      >
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "80px",
                            width: "80px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
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
                            className={`cursor-pointer ${
                              invoice.isExported
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          />
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "280px",
                            width: "280px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {invoice.invoiceNumber || "N/A"}
                          </div>
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "280px",
                            width: "280px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {invoice.workOrder || "N/A"}
                          </div>
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "320px",
                            width: "320px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {invoice.invoiceTimesheetLines?.[0]?.vendor ||
                              "N/A"}
                          </div>
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "180px",
                            width: "180px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {formatDate(invoice.invoiceDate)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "180px",
                            width: "180px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {formatCurrency(
                            invoice.invoiceAmount,
                            invoice.currency
                          )}
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "120px",
                            width: "120px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#dbeafe",
                              color: "#1e40af",
                              padding: "2px 8px",
                              borderRadius: "12px",
                              fontSize: "10px",
                              fontWeight: "500",
                            }}
                          >
                            {invoice.currency || "USD"}
                          </span>
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "180px",
                            width: "180px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {formatDate(invoice.createdAt)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #e5e7eb",
                            padding: "8px",
                            fontSize: "11px",
                            minWidth: "240px",
                            width: "240px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          <button
                            onClick={() => handlePreview(invoice)}
                            style={{
                              backgroundColor: "#dbeafe",
                              color: "#1e40af",
                              padding: "4px 12px",
                              borderRadius: "6px",
                              border: "none",
                              fontSize: "10px",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Eye style={{ width: "14px", height: "14px" }} />
                            Preview
                          </button>
                        </td>
                        {/* Conditional correction column */}
                        {userRole === "admin" && (
                          <td
                            style={{
                              border: "1px solid #e5e7eb",
                              padding: "8px",
                              fontSize: "11px",
                              minWidth: "240px",
                              width: "240px",
                              whiteSpace: "nowrap",
                              textAlign: "center",
                            }}
                          >
                            {invoice.isExported && (
                              <button
                                onClick={() => handleUnexport(invoice)}
                                data-open-invoice={
                                  invoice.invoiceId || invoice.id
                                }
                                style={{
                                  backgroundColor: "#fed7aa",
                                  color: "#c2410c",
                                  padding: "4px 12px",
                                  borderRadius: "6px",
                                  border: "none",
                                  fontSize: "10px",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                }}
                              >
                                OPEN
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
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

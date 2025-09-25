
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
          invoiceDate: formatDate(apiData.invoiceDate) || " ",
          period: apiData.period || " ",
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
          // First fetch invoice preview data (same as preview functionality)
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
          const tempContainer = document.createElement("div");
          tempContainer.style.position = "absolute";
          tempContainer.style.left = "-9999px";
          tempContainer.style.width = "800px";
          tempContainer.style.backgroundColor = "white";
          document.body.appendChild(tempContainer);

          // Create temporary React root and render InvoiceViewer
          const ReactDOM = (await import("react-dom/client")).default;
          const React = (await import("react")).default;

          // Import InvoiceViewer component
          const { default: InvoiceViewer } = await import("./InvoiceViewer");

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
          const input = tempContainer.querySelector(
            'div[style*="max-width: 768px"]'
          );

          if (!input) {
            throw new Error("Invoice content not found");
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

          pdf.addImage(
            imgData,
            "PNG",
            padding,
            position,
            usableWidth,
            pdfImgHeight
          );
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
          const filename = `${
            invoice.invoiceNumber || `invoice_${invoiceId}`
          }.pdf`;
          pdf.save(filename);

          // Add delay between downloads
          if (i < invoicesToDownload.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
              <FileDown className="h-4 w-4 mr-2" />
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
  <Download className="h-4 w-4 mr-2" />
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

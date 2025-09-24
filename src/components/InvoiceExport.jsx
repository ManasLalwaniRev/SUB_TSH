// import React, { useState, useEffect } from "react";
// import { Receipt, Search, Filter, Download, Calendar } from "lucide-react";

// export default function InvoiceExport() {
//     const [invoices, setInvoices] = useState([]);
//     const [filteredInvoices, setFilteredInvoices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");

//     // Fetch invoices from API
//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch('https://timesheet-subk.onrender.com/api/Invoices');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setInvoices(data);
//                 setFilteredInvoices(data);
//             } catch (err) {
//                 console.error('Error fetching invoices:', err);
//                 setError(err.message || 'Failed to fetch invoices');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     // Filter invoices based on search term and invoice number filter
//     useEffect(() => {
//         let filtered = invoices;

//         // Filter by invoice number
//         if (filterInvoiceNumber) {
//             filtered = filtered.filter(invoice =>
//                 invoice.invoiceNumber &&
//                 invoice.invoiceNumber.toLowerCase().includes(filterInvoiceNumber.toLowerCase())
//             );
//         }

//         // General search across all visible fields
//         if (searchTerm) {
//             filtered = filtered.filter(invoice =>
//                 Object.values(invoice).some(value =>
//                     value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//                 )
//             );
//         }

//         setFilteredInvoices(filtered);
//     }, [invoices, searchTerm, filterInvoiceNumber]);

//     // Format date helper
//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         try {
//             return new Date(dateString).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: '2-digit'
//             });
//         } catch {
//             return dateString;
//         }
//     };

//     // Format currency helper
//     const formatCurrency = (amount, currency = 'USD') => {
//         if (!amount && amount !== 0) return 'N/A';
//         try {
//             return new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: currency || 'USD'
//             }).format(amount);
//         } catch {
//             return `${currency || '$'} ${amount}`;
//         }
//     };

//     // Export to CSV function
//     const exportToCSV = () => {
//         if (filteredInvoices.length === 0) {
//             alert('No data to export');
//             return;
//         }

//         const headers = ['Invoice Number', 'Invoice Date', 'Invoice Amount', 'Currency', 'Created At', 'Created By'];
//         const csvContent = [
//             headers.join(','),
//             ...filteredInvoices.map(invoice => [
//                 `"${invoice.invoiceNumber || ''}"`,
//                 `"${formatDate(invoice.invoiceDate)}"`,
//                 `"${invoice.invoiceAmount || 0}"`,
//                 `"${invoice.currency || 'USD'}"`,
//                 `"${formatDate(invoice.createdAt)}"`,
//                 `"${invoice.createdBy || ''}"`
//             ].join(','))
//         ].join('\n');

//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const link = document.createElement('a');
//         const url = URL.createObjectURL(blob);
//         link.setAttribute('href', url);
//         link.setAttribute('download', `invoices_export_${new Date().toISOString().split('T')[0]}.csv`);
//         link.style.visibility = 'hidden';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     if (loading) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading invoices...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//                     <div className="text-red-600 mb-4">
//                         <Receipt className="h-12 w-12 mx-auto mb-2" />
//                         <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//                     </div>
//                     <p className="text-red-700">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen">
//             {/* Header */}
//             <div className="bg-white shadow-sm border-b border-gray-200 p-6">
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                         <Receipt className="h-8 w-8 text-green-600 mr-3" />
//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-900">Invoice Export</h1>
//                             <p className="text-gray-600">Manage and export invoice data</p>
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         {/* <span className="text-sm text-gray-600">
//                             Total: {filteredInvoices.length} invoices
//                         </span> */}
//                         <button
//                             onClick={exportToCSV}
//                             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
//                         >
//                             <Download className="h-4 w-4 mr-2" />
//                             Export
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Filters */}
//             <div className="bg-white border-b border-gray-200 p-4">
//                 <div className="flex items-center space-x-4">
//                     {/* General Search */}
//                     <div className="flex-1 relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Search invoices..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                     </div>

//                     {/* Invoice Number Filter */}
//                     <div className="w-64 relative">
//                         <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <input
//                             type="text"
//                             placeholder="Filter by Invoice Number"
//                             value={filterInvoiceNumber}
//                             onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                         />
//                     </div>

//                     {/* Clear Filters */}
//                     {(searchTerm || filterInvoiceNumber) && (
//                         <button
//                             onClick={() => {
//                                 setSearchTerm("");
//                                 setFilterInvoiceNumber("");
//                             }}
//                             className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                         >
//                             Clear
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Table */}
//             <div className="flex-1 overflow-hidden">
//                 <div className="h-full overflow-auto">
//                     {filteredInvoices.length === 0 ? (
//                         <div className="flex items-center justify-center h-64">
//                             <div className="text-center text-gray-500">
//                                 <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                                 <p className="text-lg font-medium">No invoices found</p>
//                                 <p className="text-sm">Try adjusting your search or filter criteria</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <table className="min-w-full bg-white">
//                             <thead className="bg-gray-50 sticky top-0 z-10">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Invoice Number
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Invoice Date
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Amount
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Currency
//                                     </th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Created At
//                                     </th>
//                                     {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
//                                         Created By
//                                     </th> */}
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {filteredInvoices.map((invoice, index) => (
//                                     <tr key={invoice.invoiceId || index} className="hover:bg-gray-50 transition-colors">
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                             {invoice.invoiceNumber || 'N/A'}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             {formatDate(invoice.invoiceDate)}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
//                                             {formatCurrency(invoice.invoiceAmount, invoice.currency)}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                                                 {invoice.currency || 'USD'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             {formatDate(invoice.createdAt)}
//                                         </td>
//                                         {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             {invoice.createdBy || 'N/A'}
//                                         </td> */}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { Receipt, Filter, Download, X, Eye } from "lucide-react";
// import InvoiceViewer from "./InvoiceViewer";

// export default function InvoiceExport() {
//     const [invoices, setInvoices] = useState([]);
//     const [filteredInvoices, setFilteredInvoices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
//     const [selectedInvoices, setSelectedInvoices] = useState(new Set());
//     const [selectAll, setSelectAll] = useState(false);
//     const [previewModalVisible, setPreviewModalVisible] = useState(false);
//     const [previewData, setPreviewData] = useState(null);

//     // Fetch invoices from API
//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch('https://timesheet-subk.onrender.com/api/Invoices');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setInvoices(data);
//                 setFilteredInvoices(data);
//             } catch (err) {
//                 console.error('Error fetching invoices:', err);
//                 setError(err.message || 'Failed to fetch invoices');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     // Filter invoices based on invoice number filter
//     useEffect(() => {
//         let filtered = invoices;

//         // Filter by invoice number
//         if (filterInvoiceNumber) {
//             filtered = filtered.filter(invoice =>
//                 invoice.invoiceNumber &&
//                 invoice.invoiceNumber.toLowerCase().includes(filterInvoiceNumber.toLowerCase())
//             );
//         }

//         setFilteredInvoices(filtered);
//         // Reset selections when filter changes
//         setSelectedInvoices(new Set());
//         setSelectAll(false);
//     }, [invoices, filterInvoiceNumber]);

// //     const getResponsiveTableStyle = () => {
// //     return {
// //         height: 'calc(100vh - 280px)', // Adjust 280px based on your header + filters + margins
// //         minHeight: '250px',
// //         maxHeight: '70vh'
// //     };
// // };

//     // Format date helper - MM-DD-YYYY format

//     // Enhanced responsive table function
// const getResponsiveTableStyle = () => {
//     const headerHeight = 120; // Header section height
//     const filterHeight = 80;  // Filter section height
//     const marginPadding = 100; // Extra margins and padding

//     return {
//         height: `calc(100vh - ${headerHeight + filterHeight + marginPadding}px)`,
//         minHeight: '400px',
//         maxHeight: '70vh'
//     };
// };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         try {
//             const date = new Date(dateString);
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const day = String(date.getDate()).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${month}-${day}-${year}`;
//         } catch {
//             return dateString;
//         }
//     };

//     // Format currency helper
//     const formatCurrency = (amount, currency = 'USD') => {
//         if (!amount && amount !== 0) return 'N/A';
//         try {
//             return new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: currency || 'USD'
//             }).format(amount);
//         } catch {
//             return `${currency || '$'} ${amount}`;
//         }
//     };

//     // Handle select all checkbox
//     const handleSelectAll = (checked) => {
//         setSelectAll(checked);
//         if (checked) {
//             const allIds = new Set(filteredInvoices.map((invoice, index) => invoice.invoiceId || index));
//             setSelectedInvoices(allIds);
//         } else {
//             setSelectedInvoices(new Set());
//         }
//     };

//     // Handle individual checkbox
//     const handleSelectInvoice = (invoiceId, checked) => {
//         const newSelected = new Set(selectedInvoices);
//         if (checked) {
//             newSelected.add(invoiceId);
//         } else {
//             newSelected.delete(invoiceId);
//         }
//         setSelectedInvoices(newSelected);
//         setSelectAll(newSelected.size === filteredInvoices.length);
//     };

//     // Handle preview click
//     // const handlePreview = (invoice) => {
//     //     // Transform invoice data to match InvoiceViewer expected format
//     //     const transformedData = [{
//     //         invoiceId: invoice.invoiceNumber,
//     //         invoiceDate: formatDate(invoice.invoiceDate),
//     //         period: formatDate(invoice.invoiceDate),
//     //         currency: invoice.currency || 'USD',
//     //         totalAmount: invoice.invoiceAmount || 0,
//     //         lineItems: [
//     //             {
//     //                 poLine: "Default PO Line",
//     //                 plc: "PLC001",
//     //                 vendor: "Vendor",
//     //                 employee: invoice.createdBy || "Employee",
//     //                 hours: 40.00,
//     //                 rate: (invoice.invoiceAmount || 0) / 40,
//     //                 amount: invoice.invoiceAmount || 0,
//     //                 line_No: 1
//     //             }
//     //         ],
//     //         // Default values for other fields
//     //         billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//     //         buyer: "Clore, Heather J",
//     //         purchaseOrderId: "2181218010",
//     //         releaseNumber: "3",
//     //         changeOrderNumber: "0",
//     //         poStartEndDate: "12/10/18 to 12/08/24",
//     //         remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//     //         terms: "PAYNPD",
//     //         amountDue: invoice.invoiceAmount || 0
//     //     }];

//     //     setPreviewData(transformedData);
//     //     setPreviewModalVisible(true);
//     // };

//     // Handle preview click
// const handlePreview = async (invoice) => {
//     try {
//         // Set loading state if you want to show a loading indicator
//         setPreviewModalVisible(true);
//         setPreviewData(null); // Clear previous data

//         // Fetch data from the preview API
//         const response = await fetch(
//             `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(invoice.invoiceNumber)}`
//         );

//         if (!response.ok) {
//             throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//         }

//         const apiData = await response.json();

//         // Transform the API data to match InvoiceViewer expected format
//         const transformedData = [{
//             invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
//             invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
//             period: formatDate(apiData.period || apiData.invoiceDate || invoice.invoiceDate),
//             currency: apiData.currency || invoice.currency || 'USD',
//             totalAmount: apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0,

//             // Transform line items from API response
//             lineItems: (apiData.lineItems || apiData.invoiceTimesheetLines || []).map((item, index) => ({
//                 poLine: item.poLine || item.timesheetLineNo || "Default PO Line",
//                 plc: item.plc || "PLC001",
//                 vendor: item.vendor || "Vendor",
//                 employee: item.employee || item.createdBy || "Employee",
//                 hours: item.hours || item.mappedHours || 40.00,
//                 rate: item.rate || (item.mappedAmount || 0) / (item.mappedHours || 40) || 0,
//                 amount: item.amount || item.mappedAmount || 0,
//                 line_No: item.line_No || item.timesheetLineNo || index + 1
//             })),

//             // Use API data if available, otherwise use defaults
//             billTo: apiData.billTo || "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//             buyer: apiData.buyer || "Clore, Heather J",
//             purchaseOrderId: apiData.purchaseOrderId || "2181218010",
//             releaseNumber: apiData.releaseNumber || "3",
//             changeOrderNumber: apiData.changeOrderNumber || "0",
//             poStartEndDate: apiData.poStartEndDate || "12/10/18 to 12/08/24",
//             remitTo: apiData.remitTo || "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//             terms: apiData.terms || "PAYNPD",
//             amountDue: apiData.amountDue || apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0
//         }];

//         setPreviewData(transformedData);

//     } catch (error) {
//         console.error('Error fetching invoice preview:', error);

//         // Show error message or fallback to original data
//         alert(`Failed to load invoice preview: ${error.message}`);

//         // Optional: Use original transformation as fallback
//         const fallbackData = [{
//             invoiceId: invoice.invoiceNumber,
//             invoiceDate: formatDate(invoice.invoiceDate),
//             period: formatDate(invoice.invoiceDate),
//             currency: invoice.currency || 'USD',
//             totalAmount: invoice.invoiceAmount || 0,
//             lineItems: [
//                 {
//                     poLine: "Default PO Line",
//                     plc: "PLC001",
//                     vendor: "Vendor",
//                     employee: invoice.createdBy || "Employee",
//                     hours: 40.00,
//                     rate: (invoice.invoiceAmount || 0) / 40,
//                     amount: invoice.invoiceAmount || 0,
//                     line_No: 1
//                 }
//             ],
//             billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//             buyer: "Clore, Heather J",
//             purchaseOrderId: "2181218010",
//             releaseNumber: "3",
//             changeOrderNumber: "0",
//             poStartEndDate: "12/10/18 to 12/08/24",
//             remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//             terms: "PAYNPD",
//             amountDue: invoice.invoiceAmount || 0
//         }];

//         setPreviewData(fallbackData);
//     }
// };

//     // Export to CSV function - only selected invoices
//     // const exportToCSV = () => {
//     //     const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//     //         selectedInvoices.has(invoice.invoiceId || index)
//     //     );

//     //     if (invoicesToExport.length === 0) {
//     //         alert('Please select invoices to export');
//     //         return;
//     //     }

//     //     const headers = ['Invoice Number', 'Invoice Date', 'Invoice Amount', 'Currency', 'Created At'];
//     //     const csvContent = [
//     //         headers.join(','),
//     //         ...invoicesToExport.map(invoice => [
//     //             `"${invoice.invoiceNumber || ''}"`,
//     //             `"${formatDate(invoice.invoiceDate)}"`,
//     //             `"${invoice.invoiceAmount || 0}"`,
//     //             `"${invoice.currency || 'USD'}"`,
//     //             `"${formatDate(invoice.createdAt)}"`
//     //         ].join(','))
//     //     ].join('\n');

//     //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     //     const link = document.createElement('a');
//     //     const url = URL.createObjectURL(blob);
//     //     link.setAttribute('href', url);
//     //     link.setAttribute('download', `selected_invoices_export_${new Date().toISOString().split('T')[0]}.csv`);
//     //     link.style.visibility = 'hidden';
//     //     document.body.appendChild(link);
//     //     link.click();
//     //     document.body.removeChild(link);
//     // };

//     // Export function using API - selected invoices
// // Export function using POST API with column headers in payload
// // Export function using POST API with InvoiceId as URL parameter and column values in payload
// const exportToCSV = async () => {
//     const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//         selectedInvoices.has(invoice.invoiceId || index)
//     );

//     if (invoicesToExport.length === 0) {
//         alert('Please select invoices to export');
//         return;
//     }

//     try {
//         // Show loading state
//         const exportButton = document.querySelector('[data-export-button]');
//         if (exportButton) {
//             exportButton.disabled = true;
//             exportButton.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//         }

//         // Process exports for each selected invoice
//         for (let i = 0; i < invoicesToExport.length; i++) {
//             const invoice = invoicesToExport[i];
//             const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//             if (!invoiceId) {
//                 console.warn(`Skipping invoice without ID: ${JSON.stringify(invoice)}`);
//                 continue;
//             }

//             try {
//                 // Prepare column header VALUES (actual data) in payload
//                 const columnHeaderValues = [
//                     invoice.invoiceNumber || '',
//                     formatDate(invoice.invoiceDate) || '',
//                     invoice.invoiceAmount || 0,
//                     invoice.currency || 'USD',
//                     formatDate(invoice.createdAt) || '',
//                     // Add more actual values as needed for PLC, Vendor Employee, etc.
//                     'PLC001', // Default or actual PLC value
//                     invoice.createdBy || 'Employee', // Vendor Employee
//                     '40.00', // Current Hrs/Qty - replace with actual value
//                     ((invoice.invoiceAmount || 0) / 40).toFixed(2), // Rate
//                     '0.00', // Additional Amount
//                     (invoice.invoiceAmount || 0).toFixed(2), // Current Amount
//                     '40.00', // Cumulative Hrs/Qty
//                     (invoice.invoiceAmount || 0).toFixed(2) // Cumulative Amount
//                 ];

//                 // Prepare the payload with column header VALUES
//                 const payload = {
//                     ColumnHeaderValues: columnHeaderValues,
//                     // Add any additional configuration if needed
//                     IncludeHeaders: true,
//                     ExportFormat: 'CSV'
//                 };

//                 console.log('Sending InvoiceId as parameter:', invoiceId);
//                 console.log('Sending payload with column values:', payload);

//                 // Make POST API call with InvoiceId as URL parameter and column values in payload
//                 const response = await fetch(
//                     `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(invoiceId)}`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Accept': 'text/csv, application/csv, application/octet-stream, */*',
//                             'Content-Type': 'application/json',
//                             // Add authorization header if your API requires it
//                             // 'Authorization': `Bearer ${yourTokenHere}`,
//                         },
//                         body: JSON.stringify(payload)
//                     }
//                 );

//                 console.log('Response status:', response.status);
//                 console.log('Response headers:', [...response.headers.entries()]);

//                 if (!response.ok) {
//                     // Get error details from response
//                     let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//                     try {
//                         const errorData = await response.text();
//                         if (errorData) {
//                             errorMessage += ` - ${errorData}`;
//                         }
//                     } catch (e) {
//                         // Ignore if can't parse error
//                     }
//                     throw new Error(errorMessage);
//                 }

//                 // Get the file as blob
//                 const blob = await response.blob();

//                 // Check if the response is actually a file or an error
//                 if (blob.type && blob.type.includes('application/json')) {
//                     // If it's JSON, it might be an error response
//                     const text = await blob.text();
//                     console.error('Received JSON instead of file:', text);
//                     throw new Error('Server returned an error instead of a file');
//                 }

//                 // Extract filename from Content-Disposition header or use default
//                 let filename = `invoice_${invoiceId}_export.csv`;
//                 const contentDisposition = response.headers.get('Content-Disposition');
//                 if (contentDisposition) {
//                     const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
//                     if (filenameMatch && filenameMatch[1]) {
//                         filename = filenameMatch[1].replace(/['"]/g, '');
//                     }
//                 }

//                 // Create download link and trigger download
//                 const url = window.URL.createObjectURL(blob);
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.download = filename;
//                 link.style.display = 'none';
//                 document.body.appendChild(link);
//                 link.click();

//                 // Clean up
//                 window.URL.revokeObjectURL(url);
//                 document.body.removeChild(link);

//                 // Add small delay between downloads
//                 if (i < invoicesToExport.length - 1) {
//                     await new Promise(resolve => setTimeout(resolve, 500));
//                 }

//             } catch (invoiceError) {
//                 console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//                 alert(`Failed to export invoice ${invoiceId}: ${invoiceError.message}`);
//             }
//         }

//         // Show success message
//         const successMessage = invoicesToExport.length === 1
//             ? 'Invoice exported successfully!'
//             : `${invoicesToExport.length} invoices exported successfully!`;

//         alert(successMessage);

//     } catch (error) {
//         console.error('Error during export process:', error);
//         alert(`Export failed: ${error.message}`);
//     } finally {
//         // Reset button state
//         const exportButton = document.querySelector('[data-export-button]');
//         if (exportButton) {
//             exportButton.disabled = false;
//             exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//         }
//     }
// };

//     if (loading) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading invoices...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//                     <div className="text-red-600 mb-4">
//                         <Receipt className="h-12 w-12 mx-auto mb-2" />
//                         <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//                     </div>
//                     <p className="text-red-700">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
//                 {/* Header */}
//                 <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Receipt className="h-8 w-8 text-green-600 mr-3" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Invoice Export</h1>
//                                 <p className="text-gray-600">Manage and export invoice data</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             {/* <span className="text-sm text-gray-600">
//                                 Selected: {selectedInvoices.size} / {filteredInvoices.length} invoices
//                             </span> */}
//                             {/* <button
//                                 onClick={exportToCSV}
//                                 disabled={selectedInvoices.size === 0}
//                                 className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//                                     selectedInvoices.size === 0
//                                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                         : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 <Download className="h-4 w-4 mr-2" />
//                                 Export ({selectedInvoices.size})
//                             </button> */}
//                             <button
//     onClick={exportToCSV}
//     disabled={selectedInvoices.size === 0}
//     data-export-button
//     className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//         selectedInvoices.size === 0
//             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             : 'bg-green-600 text-white hover:bg-green-700'
//     }`}
// >
//     <Download className="h-4 w-4 mr-2" />
//     Export ({selectedInvoices.size})
// </button>

//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white border-b border-gray-200 p-4 -mx-6">
//                     <div className="flex items-center justify-start">
//                         {/* Invoice Number Filter */}
//                         <div className="w-80 relative">
//                             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Filter by Invoice Number"
//                                 value={filterInvoiceNumber}
//                                 onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Clear Filter */}
//                         {filterInvoiceNumber && (
//                             <button
//                                 onClick={() => setFilterInvoiceNumber("")}
//                                 className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                             >
//                                 Clear
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="flex-1 overflow-hidden mt-6">
//                     <div className="h-full overflow-auto">
//                         {filteredInvoices.length === 0 ? (
//                             <div className="flex items-center justify-center h-64">
//                                 <div className="text-center text-gray-500">
//                                     <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                                     <p className="text-lg font-medium">No invoices found</p>
//                                     <p className="text-sm">Try adjusting your filter criteria</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col" style={getResponsiveTableStyle()}>
//                                 <table className="min-w-full">
//                                     <thead className="bg-gray-50 sticky">
//                                         <tr>
//                                             {/* <th className="px-6 py-3 text-left border-b border-gray-200">
//                                                 <input
//                                                     type="checkbox"
//                                                     text="All"
//                                                     checked={selectAll}
//                                                     onChange={(e) => handleSelectAll(e.target.checked)}
//                                                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                 />
//                                             </th> */}
//                                             <th className="px-6 py-3 text-left border-b border-gray-200">
//     <div className="flex items-center space-x-2">
//         <input
//             type="checkbox"
//             checked={selectAll}
//             onChange={(e) => handleSelectAll(e.target.checked)}
//             className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//         />
//         <span className="text-xs font-medium text-gray-500 tracking-wider">
//             All
//         </span>
//     </div>
// </th>

//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
//                                                 Invoice Number
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
//                                                 Invoice Date
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
//                                                 Amount
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200">
//                                                 Currency
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
//                                                 Created At
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200">
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-200">
//                                         {filteredInvoices.map((invoice, index) => {
//                                             const invoiceId = invoice.invoiceId || index;
//                                             return (
//                                                 <tr key={invoiceId} className="hover:bg-gray-50 transition-colors">
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={selectedInvoices.has(invoiceId)}
//                                                             onChange={(e) => handleSelectInvoice(invoiceId, e.target.checked)}
//                                                             className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                         />
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                                                         {invoice.invoiceNumber || 'N/A'}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         {formatDate(invoice.invoiceDate)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
//                                                         {formatCurrency(invoice.invoiceAmount, invoice.currency)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
//                                                             {invoice.currency || 'USD'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         {formatDate(invoice.createdAt)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         <button
//                                                             onClick={() => handlePreview(invoice)}
//                                                             className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
//                                                         >
//                                                             <Eye className="h-4 w-4 mr-1" />
//                                                             Preview
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Preview Modal */}
//             {previewModalVisible && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                             <h2 className="text-xl font-semibold text-gray-900">Invoice Preview</h2>
//                             <button
//                                 onClick={() => setPreviewModalVisible(false)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>
//                         <div className="p-6">
//                             <InvoiceViewer
//                                 data={previewData}
//                                 setInvoiceModalVisible={setPreviewModalVisible}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { Receipt, Filter, Download, X, Eye } from "lucide-react";
// import InvoiceViewer from "./InvoiceViewer";

// export default function InvoiceExport() {
//     const [invoices, setInvoices] = useState([]);
//     const [filteredInvoices, setFilteredInvoices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
//     const [selectedInvoices, setSelectedInvoices] = useState(new Set());
//     const [selectAll, setSelectAll] = useState(false);
//     const [previewModalVisible, setPreviewModalVisible] = useState(false);
//     const [previewData, setPreviewData] = useState(null);

//     // Fetch invoices from API
//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch('https://timesheet-subk.onrender.com/api/Invoices');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setInvoices(data);
//                 setFilteredInvoices(data);
//             } catch (err) {
//                 console.error('Error fetching invoices:', err);
//                 setError(err.message || 'Failed to fetch invoices');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     // Filter invoices based on invoice number filter
//     useEffect(() => {
//         let filtered = invoices;

//         // Filter by invoice number
//         if (filterInvoiceNumber) {
//             filtered = filtered.filter(invoice =>
//                 invoice.invoiceNumber &&
//                 invoice.invoiceNumber.toLowerCase().includes(filterInvoiceNumber.toLowerCase())
//             );
//         }

//         setFilteredInvoices(filtered);
//         // Reset selections when filter changes
//         setSelectedInvoices(new Set());
//         setSelectAll(false);
//     }, [invoices, filterInvoiceNumber]);

//     // Enhanced responsive table function
//     const getResponsiveTableStyle = () => {
//         const headerHeight = 120; // Header section height
//         const filterHeight = 80;  // Filter section height
//         const marginPadding = 100; // Extra margins and padding

//         return {
//             height: `calc(100vh - ${headerHeight + filterHeight + marginPadding}px)`,
//             minHeight: '400px',
//             maxHeight: '70vh'
//         };
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         try {
//             const date = new Date(dateString);
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const day = String(date.getDate()).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${month}-${day}-${year}`;
//         } catch {
//             return dateString;
//         }
//     };

//     // Format currency helper
//     const formatCurrency = (amount, currency = 'USD') => {
//         if (!amount && amount !== 0) return 'N/A';
//         try {
//             return new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: currency || 'USD'
//             }).format(amount);
//         } catch {
//             return `${currency || '$'} ${amount}`;
//         }
//     };

//     // Handle select all checkbox
//     const handleSelectAll = (checked) => {
//         setSelectAll(checked);
//         if (checked) {
//             const allIds = new Set(filteredInvoices.map((invoice, index) => invoice.invoiceId || index));
//             setSelectedInvoices(allIds);
//         } else {
//             setSelectedInvoices(new Set());
//         }
//     };

//     // Handle individual checkbox
//     const handleSelectInvoice = (invoiceId, checked) => {
//         const newSelected = new Set(selectedInvoices);
//         if (checked) {
//             newSelected.add(invoiceId);
//         } else {
//             newSelected.delete(invoiceId);
//         }
//         setSelectedInvoices(newSelected);
//         setSelectAll(newSelected.size === filteredInvoices.length);
//     };

//     // Handle preview click
//     const handlePreview = async (invoice) => {
//         try {
//             // Set loading state if you want to show a loading indicator
//             setPreviewModalVisible(true);
//             setPreviewData(null); // Clear previous data

//             // Fetch data from the preview API
//             const response = await fetch(
//                 `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(invoice.invoiceNumber)}`
//             );

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//             }

//             const apiData = await response.json();

//             // Transform the API data to match InvoiceViewer expected format
//             const transformedData = [{
//                 invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
//                 invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
//                 period: formatDate(apiData.period || apiData.invoiceDate || invoice.invoiceDate),
//                 currency: apiData.currency || invoice.currency || 'USD',
//                 totalAmount: apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0,

//                 // Transform line items from API response
//                 lineItems: (apiData.lineItems || apiData.invoiceTimesheetLines || []).map((item, index) => ({
//                     poLine: item.poLine || item.timesheetLineNo || "Default PO Line",
//                     plc: item.plc || "PLC001",
//                     vendor: item.vendor || "Vendor",
//                     employee: item.employee || item.createdBy || "Employee",
//                     hours: item.hours || item.mappedHours || 40.00,
//                     rate: item.rate || (item.mappedAmount || 0) / (item.mappedHours || 40) || 0,
//                     amount: item.amount || item.mappedAmount || 0,
//                     line_No: item.line_No || item.timesheetLineNo || index + 1
//                 })),

//                 // Use API data if available, otherwise use defaults
//                 billTo: apiData.billTo || "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//                 buyer: apiData.buyer || "Clore, Heather J",
//                 purchaseOrderId: apiData.purchaseOrderId || "2181218010",
//                 releaseNumber: apiData.releaseNumber || "3",
//                 changeOrderNumber: apiData.changeOrderNumber || "0",
//                 poStartEndDate: apiData.poStartEndDate || "12/10/18 to 12/08/24",
//                 remitTo: apiData.remitTo || "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//                 terms: apiData.terms || "PAYNPD",
//                 amountDue: apiData.amountDue || apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0
//             }];

//             setPreviewData(transformedData);

//         } catch (error) {
//             console.error('Error fetching invoice preview:', error);

//             // Show error message or fallback to original data
//             alert(`Failed to load invoice preview: ${error.message}`);

//             // Optional: Use original transformation as fallback
//             const fallbackData = [{
//                 invoiceId: invoice.invoiceNumber,
//                 invoiceDate: formatDate(invoice.invoiceDate),
//                 period: formatDate(invoice.invoiceDate),
//                 currency: invoice.currency || 'USD',
//                 totalAmount: invoice.invoiceAmount || 0,
//                 lineItems: [
//                     {
//                         poLine: "Default PO Line",
//                         plc: "PLC001",
//                         vendor: "Vendor",
//                         employee: invoice.createdBy || "Employee",
//                         hours: 40.00,
//                         rate: (invoice.invoiceAmount || 0) / 40,
//                         amount: invoice.invoiceAmount || 0,
//                         line_No: 1
//                     }
//                 ],
//                 billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//                 buyer: "Clore, Heather J",
//                 purchaseOrderId: "2181218010",
//                 releaseNumber: "3",
//                 changeOrderNumber: "0",
//                 poStartEndDate: "12/10/18 to 12/08/24",
//                 remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//                 terms: "PAYNPD",
//                 amountDue: invoice.invoiceAmount || 0
//             }];

//             setPreviewData(fallbackData);
//         }
//     };

//     // Export function using POST API with InvoiceId as URL parameter and column values in payload
//     const exportToCSV = async () => {
//         const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//             selectedInvoices.has(invoice.invoiceId || index)
//         );

//         if (invoicesToExport.length === 0) {
//             alert('Please select invoices to export');
//             return;
//         }

//         try {
//             // Show loading state
//             const exportButton = document.querySelector('[data-export-button]');
//             if (exportButton) {
//                 exportButton.disabled = true;
//                 exportButton.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//             }

//             // Process exports for each selected invoice
//             for (let i = 0; i < invoicesToExport.length; i++) {
//                 const invoice = invoicesToExport[i];
//                 const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//                 if (!invoiceId) {
//                     console.warn(`Skipping invoice without ID: ${JSON.stringify(invoice)}`);
//                     continue;
//                 }

//                 try {
//                     // Prepare column header VALUES (actual data) in payload
//                     const columnHeaderValues = [
//                         invoice.invoiceNumber || '',
//                         formatDate(invoice.invoiceDate) || '',
//                         invoice.invoiceAmount || 0,
//                         invoice.currency || 'USD',
//                         formatDate(invoice.createdAt) || '',
//                         // Add more actual values as needed for PLC, Vendor Employee, etc.
//                         'PLC001', // Default or actual PLC value
//                         invoice.createdBy || 'Employee', // Vendor Employee
//                         '40.00', // Current Hrs/Qty - replace with actual value
//                         ((invoice.invoiceAmount || 0) / 40).toFixed(2), // Rate
//                         '0.00', // Additional Amount
//                         (invoice.invoiceAmount || 0).toFixed(2), // Current Amount
//                         '40.00', // Cumulative Hrs/Qty
//                         (invoice.invoiceAmount || 0).toFixed(2) // Cumulative Amount
//                     ];

//                     // Prepare the payload with column header VALUES
//                     const payload = {
//                         ColumnHeaderValues: columnHeaderValues,
//                         // Add any additional configuration if needed
//                         IncludeHeaders: true,
//                         ExportFormat: 'CSV'
//                     };

//                     console.log('Sending InvoiceId as parameter:', invoiceId);
//                     console.log('Sending payload with column values:', payload);

//                     // Make POST API call with InvoiceId as URL parameter and column values in payload
//                     const response = await fetch(
//                         `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(invoiceId)}`,
//                         {
//                             method: 'POST',
//                             headers: {
//                                 'Accept': 'text/csv, application/csv, application/octet-stream, */*',
//                                 'Content-Type': 'application/json',
//                                 // Add authorization header if your API requires it
//                                 // 'Authorization': `Bearer ${yourTokenHere}`,
//                             },
//                             body: JSON.stringify(payload)
//                         }
//                     );

//                     console.log('Response status:', response.status);
//                     console.log('Response headers:', [...response.headers.entries()]);

//                     if (!response.ok) {
//                         // Get error details from response
//                         let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//                         try {
//                             const errorData = await response.text();
//                             if (errorData) {
//                                 errorMessage += ` - ${errorData}`;
//                             }
//                         } catch (e) {
//                             // Ignore if can't parse error
//                         }
//                         throw new Error(errorMessage);
//                     }

//                     // Get the file as blob
//                     const blob = await response.blob();

//                     // Check if the response is actually a file or an error
//                     if (blob.type && blob.type.includes('application/json')) {
//                         // If it's JSON, it might be an error response
//                         const text = await blob.text();
//                         console.error('Received JSON instead of file:', text);
//                         throw new Error('Server returned an error instead of a file');
//                     }

//                     // Extract filename from Content-Disposition header or use default
//                     let filename = `invoice_${invoiceId}_export.csv`;
//                     const contentDisposition = response.headers.get('Content-Disposition');
//                     if (contentDisposition) {
//                         const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
//                         if (filenameMatch && filenameMatch[1]) {
//                             filename = filenameMatch[1].replace(/['"]/g, '');
//                         }
//                     }

//                     // Create download link and trigger download
//                     const url = window.URL.createObjectURL(blob);
//                     const link = document.createElement('a');
//                     link.href = url;
//                     link.download = filename;
//                     link.style.display = 'none';
//                     document.body.appendChild(link);
//                     link.click();

//                     // Clean up
//                     window.URL.revokeObjectURL(url);
//                     document.body.removeChild(link);

//                     // Add small delay between downloads
//                     if (i < invoicesToExport.length - 1) {
//                         await new Promise(resolve => setTimeout(resolve, 500));
//                     }

//                 } catch (invoiceError) {
//                     console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//                     alert(`Failed to export invoice ${invoiceId}: ${invoiceError.message}`);
//                 }
//             }

//             // Show success message
//             const successMessage = invoicesToExport.length === 1
//                 ? 'Invoice exported successfully!'
//                 : `${invoicesToExport.length} invoices exported successfully!`;

//             alert(successMessage);

//         } catch (error) {
//             console.error('Error during export process:', error);
//             alert(`Export failed: ${error.message}`);
//         } finally {
//             // Reset button state
//             const exportButton = document.querySelector('[data-export-button]');
//             if (exportButton) {
//                 exportButton.disabled = false;
//                 exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//             }
//         }
//     };

//     if (loading) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading invoices...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//                     <div className="text-red-600 mb-4">
//                         <Receipt className="h-12 w-12 mx-auto mb-2" />
//                         <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//                     </div>
//                     <p className="text-red-700">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
//                 {/* Header */}
//                 <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Receipt className="h-8 w-8 text-green-600 mr-3" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Invoice Export</h1>
//                                 <p className="text-gray-600">Manage and export invoice data</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={exportToCSV}
//                                 disabled={selectedInvoices.size === 0}
//                                 data-export-button
//                                 className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//                                     selectedInvoices.size === 0
//                                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                         : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 <Download className="h-4 w-4 mr-2" />
//                                 Export ({selectedInvoices.size})
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white border-b border-gray-200 p-4 -mx-6">
//                     <div className="flex items-center justify-start">
//                         {/* Invoice Number Filter */}
//                         <div className="w-80 relative">
//                             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Filter by Invoice Number"
//                                 value={filterInvoiceNumber}
//                                 onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                         </div>

//                         {/* Clear Filter */}
//                         {filterInvoiceNumber && (
//                             <button
//                                 onClick={() => setFilterInvoiceNumber("")}
//                                 className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                             >
//                                 Clear
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Table */}
//                 <div className="flex-1 overflow-hidden mt-6">
//                     <div className="h-full overflow-auto">
//                         {filteredInvoices.length === 0 ? (
//                             <div className="flex items-center justify-center h-64">
//                                 <div className="text-center text-gray-500">
//                                     <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                                     <p className="text-lg font-medium">No invoices found</p>
//                                     <p className="text-sm">Try adjusting your filter criteria</p>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="bg-white rounded-lg shadow-sm border border-gray-200" style={getResponsiveTableStyle()}>
//                                 <table className="min-w-full">
//                                     <thead className="bg-gray-50">
//                                         <tr>
//                                             <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 <div className="flex items-center space-x-2">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectAll}
//                                                         onChange={(e) => handleSelectAll(e.target.checked)}
//                                                         className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                     />
//                                                     <span className="text-xs font-medium text-gray-500 tracking-wider">
//                                                         All
//                                                     </span>
//                                                 </div>
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Invoice Number
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Invoice Date
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Amount
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Currency
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Created At
//                                             </th>
//                                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-200">
//                                         {filteredInvoices.map((invoice, index) => {
//                                             const invoiceId = invoice.invoiceId || index;
//                                             return (
//                                                 <tr key={invoiceId} className="hover:bg-gray-50 transition-colors">
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={selectedInvoices.has(invoiceId)}
//                                                             onChange={(e) => handleSelectInvoice(invoiceId, e.target.checked)}
//                                                             className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                         />
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                                                         {invoice.invoiceNumber || 'N/A'}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         {formatDate(invoice.invoiceDate)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
//                                                         {formatCurrency(invoice.invoiceAmount, invoice.currency)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
//                                                             {invoice.currency || 'USD'}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         {formatDate(invoice.createdAt)}
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                         <button
//                                                             onClick={() => handlePreview(invoice)}
//                                                             className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
//                                                         >
//                                                             <Eye className="h-4 w-4 mr-1" />
//                                                             Preview
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Preview Modal */}
//             {previewModalVisible && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                             <h2 className="text-xl font-semibold text-gray-900">Invoice Preview</h2>
//                             <button
//                                 onClick={() => setPreviewModalVisible(false)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>
//                         <div className="p-6">
//                             <InvoiceViewer
//                                 data={previewData}
//                                 setInvoiceModalVisible={setPreviewModalVisible}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

// import React, { useState, useEffect } from "react";
// import { Receipt, Filter, Download, X, Eye } from "lucide-react";
// import InvoiceViewer from "./InvoiceViewer";

// export default function InvoiceExport() {
//     const [invoices, setInvoices] = useState([]);
//     const [filteredInvoices, setFilteredInvoices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filterInvoiceNumber, setFilterInvoiceNumber] = useState("");
//     const [selectedInvoices, setSelectedInvoices] = useState(new Set());
//     const [selectAll, setSelectAll] = useState(false);
//     const [previewModalVisible, setPreviewModalVisible] = useState(false);
//     const [previewData, setPreviewData] = useState(null);

//     // Fetch invoices from API
//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch('https://timesheet-subk.onrender.com/api/Invoices');

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 setInvoices(data);
//                 setFilteredInvoices(data);
//             } catch (err) {
//                 console.error('Error fetching invoices:', err);
//                 setError(err.message || 'Failed to fetch invoices');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     // Filter invoices based on invoice number filter
//     useEffect(() => {
//         let filtered = invoices;

//         // Filter by invoice number
//         if (filterInvoiceNumber) {
//             filtered = filtered.filter(invoice =>
//                 invoice.invoiceNumber &&
//                 invoice.invoiceNumber.toLowerCase().includes(filterInvoiceNumber.toLowerCase())
//             );
//         }

//         setFilteredInvoices(filtered);
//         // Reset selections when filter changes
//         setSelectedInvoices(new Set());
//         setSelectAll(false);
//     }, [invoices, filterInvoiceNumber]);

//     // Dynamic table container style based on content
//     const getTableContainerStyle = () => {
//         const headerHeight = 120; // Header section height
//         const filterHeight = 80;  // Filter section height
//         const padding = 48; // Top and bottom padding (24px each)
//         const margin = 24; // Margin
//         const footerSpace = 20; // Space for any footer content

//         // Calculate minimum height needed for the content
//         const rowHeight = 61; // Approximate height per row (including border)
//         const headerRowHeight = 48; // Header row height
//         const minContentHeight = headerRowHeight + (filteredInvoices.length * rowHeight);

//         // Calculate available space
//         const availableHeight = window.innerHeight - headerHeight - filterHeight - padding - margin - footerSpace;

//         // Use the smaller of content height or available height, with reasonable limits
//         const dynamicHeight = Math.min(
//             Math.max(minContentHeight, 200), // Minimum 200px
//             Math.max(availableHeight, 400)   // Maximum available space, but at least 400px
//         );

//         return {
//             height: `${dynamicHeight}px`,
//             minHeight: '200px',
//             maxHeight: `calc(100vh - ${headerHeight + filterHeight + padding + margin + footerSpace}px)`
//         };
//     };

//     // Alternative: Get table wrapper style that adjusts to content
//     const getTableWrapperStyle = () => {
//         // If there are few items, don't use fixed height
//         if (filteredInvoices.length <= 5) {
//             return {
//                 minHeight: '200px',
//                 maxHeight: 'calc(100vh - 300px)' // Just prevent it from being too tall
//             };
//         }

//         // For more items, use scrollable container
//         return {
//             height: 'calc(100vh - 300px)',
//             minHeight: '400px'
//         };
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         try {
//             const date = new Date(dateString);
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const day = String(date.getDate()).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${month}-${day}-${year}`;
//         } catch {
//             return dateString;
//         }
//     };

//     // Format currency helper
//     const formatCurrency = (amount, currency = 'USD') => {
//         if (!amount && amount !== 0) return 'N/A';
//         try {
//             return new Intl.NumberFormat('en-US', {
//                 style: 'currency',
//                 currency: currency || 'USD'
//             }).format(amount);
//         } catch {
//             return `${currency || '$'} ${amount}`;
//         }
//     };

//     // Handle select all checkbox
//     // const handleSelectAll = (checked) => {
//     //     setSelectAll(checked);
//     //     if (checked) {
//     //         const allIds = new Set(filteredInvoices.map((invoice, index) => invoice.invoiceId || index));
//     //         setSelectedInvoices(allIds);
//     //     } else {
//     //         setSelectedInvoices(new Set());
//     //     }
//     // };
// //     const handleSelectAll = (checked) => {
// //     setSelectAll(checked);
// //     if (checked) {
// //         // Only select invoices that are not exported (isExported: false)
// //         const selectableInvoices = filteredInvoices.filter(invoice => !invoice.isExported);
// //         const allSelectableIds = new Set(selectableInvoices.map((invoice, index) => invoice.invoiceId || index));
// //         setSelectedInvoices(allSelectableIds);
// //     } else {
// //         setSelectedInvoices(new Set());
// //     }
// // };

//     // Handle individual checkbox
//     // const handleSelectInvoice = (invoiceId, invoice,checked) => {
//     //     if (invoice.isExported) return;
//     //     const newSelected = new Set(selectedInvoices);
//     //     if (checked) {
//     //         newSelected.add(invoiceId);
//     //     } else {
//     //         newSelected.delete(invoiceId);
//     //     }
//     //     setSelectedInvoices(newSelected);
//     //     setSelectAll(newSelected.size === filteredInvoices.length);
//     // };

//     // Calculate selectable invoices (only those that are not exported)
// const selectableInvoices = filteredInvoices.filter(invoice => !invoice.isExported);
// const disabledInvoices = filteredInvoices.filter(invoice => invoice.isExported);

// // Handle select all checkbox
// const handleSelectAll = (checked) => {
//     setSelectAll(checked);
//     if (checked) {
//         // Only select invoices that are not exported (isExported: false)
//         const allSelectableIds = new Set(selectableInvoices.map((invoice, index) =>
//             invoice.invoiceId || filteredInvoices.indexOf(invoice)
//         ));
//         setSelectedInvoices(allSelectableIds);
//     } else {
//         setSelectedInvoices(new Set());
//     }
// };

// // Handle individual checkbox
// const handleSelectInvoice = (invoiceId, checked, invoice) => {
//     // Prevent selection if invoice is exported
//     if (invoice && invoice.isExported) return;

//     setSelectedInvoices(prev => {
//         const newSelected = new Set(prev);
//         if (checked) {
//             newSelected.add(invoiceId);
//         } else {
//             newSelected.delete(invoiceId);
//         }

//         // Update select all state - check if all selectable invoices are selected
//         const allSelectableSelected = selectableInvoices.length > 0 &&
//             selectableInvoices.every(inv => {
//                 const id = inv.invoiceId || filteredInvoices.indexOf(inv);
//                 return newSelected.has(id);
//             });
//         setSelectAll(allSelectableSelected);

//         return newSelected;
//     });
// };

// // // Handle unexport (reopen) invoice - only for admin
// // const handletoUnexport = async (invoice) => {
// //     if (userRole !== 'admin') {
// //         alert('Access denied. Admin privileges required.');
// //         return;
// //     }

// //     try {
// //         // API call to unexport the invoice
// //         const response = await fetch(`https://timesheet-subk.onrender.com/api/invoices/${invoice.invoiceId}/unexport`, {
// //             method: 'PATCH', // or PUT depending on your API
// //             headers: {
// //                 'Content-Type': 'application/json',
// //                 // Add authorization header if needed
// //                 // 'Authorization': `Bearer ${token}`
// //             },
// //             body: JSON.stringify({
// //                 isExported: false
// //             })
// //         });

// //         if (!response.ok) {
// //             throw new Error(`HTTP error! status: ${response.status}`);
// //         }

// //         const updatedInvoice = await response.json();

// //         // Update the local state
// //         setInvoices(prev => prev.map(inv =>
// //             inv.invoiceId === invoice.invoiceId
// //                 ? { ...inv, isExported: false }
// //                 : inv
// //         ));

// //         setFilteredInvoices(prev => prev.map(inv =>
// //             inv.invoiceId === invoice.invoiceId
// //                 ? { ...inv, isExported: false }
// //                 : inv
// //         ));

// //         alert('Invoice reopened successfully!');

// //     } catch (error) {
// //         console.error('Error reopening invoice:', error);
// //         alert('Failed to reopen invoice: ' + error.message);
// //     }
// // };

//     // Handle preview click
//     const handlePreview = async (invoice) => {
//         try {
//             setPreviewModalVisible(true);
//             setPreviewData(null);

//             const response = await fetch(
//                 `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(invoice.invoiceNumber)}`
//             );

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch invoice preview: ${response.status}`);
//             }

//             const apiData = await response.json();

//             const transformedData = [{
//                 invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
//                 invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
//                 period: formatDate(apiData.period || apiData.invoiceDate || invoice.invoiceDate),
//                 currency: apiData.currency || invoice.currency || 'USD',
//                 totalAmount: apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0,

//                 lineItems: (apiData.lineItems || apiData.invoiceTimesheetLines || []).map((item, index) => ({
//                     poLine: item.poLine || item.timesheetLineNo || "Default PO Line",
//                     plc: item.plc || "PLC001",
//                     vendor: item.vendor || "Vendor",
//                     employee: item.employee || item.createdBy || "Employee",
//                     hours: item.hours || item.mappedHours || 40.00,
//                     rate: item.rate || (item.mappedAmount || 0) / (item.mappedHours || 40) || 0,
//                     amount: item.amount || item.mappedAmount || 0,
//                     line_No: item.line_No || item.timesheetLineNo || index + 1
//                 })),

//                 billTo: apiData.billTo || "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//                 buyer: apiData.buyer || "Clore, Heather J",
//                 purchaseOrderId: apiData.purchaseOrderId || "2181218010",
//                 releaseNumber: apiData.releaseNumber || "3",
//                 changeOrderNumber: apiData.changeOrderNumber || "0",
//                 poStartEndDate: apiData.poStartEndDate || "12/10/18 to 12/08/24",
//                 remitTo: apiData.remitTo || "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//                 terms: apiData.terms || "PAYNPD",
//                 amountDue: apiData.amountDue || apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0
//             }];

//             setPreviewData(transformedData);

//         } catch (error) {
//             console.error('Error fetching invoice preview:', error);
//             alert(`Failed to load invoice preview: ${error.message}`);

//             const fallbackData = [{
//                 invoiceId: invoice.invoiceNumber,
//                 invoiceDate: formatDate(invoice.invoiceDate),
//                 period: formatDate(invoice.invoiceDate),
//                 currency: invoice.currency || 'USD',
//                 totalAmount: invoice.invoiceAmount || 0,
//                 lineItems: [
//                     {
//                         poLine: "Default PO Line",
//                         plc: "PLC001",
//                         vendor: "Vendor",
//                         employee: invoice.createdBy || "Employee",
//                         hours: 40.00,
//                         rate: (invoice.invoiceAmount || 0) / 40,
//                         amount: invoice.invoiceAmount || 0,
//                         line_No: 1
//                     }
//                 ],
//                 billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
//                 buyer: "Clore, Heather J",
//                 purchaseOrderId: "2181218010",
//                 releaseNumber: "3",
//                 changeOrderNumber: "0",
//                 poStartEndDate: "12/10/18 to 12/08/24",
//                 remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
//                 terms: "PAYNPD",
//                 amountDue: invoice.invoiceAmount || 0
//             }];

//             setPreviewData(fallbackData);
//         }
//     };

//     // Export function (keeping your existing export logic)
//     const exportToCSV = async () => {
//         const invoicesToExport = filteredInvoices.filter((invoice, index) =>
//             selectedInvoices.has(invoice.invoiceId || index)
//         );

//         if (invoicesToExport.length === 0) {
//             alert('Please select invoices to export');
//             return;
//         }

//         try {
//             const exportButton = document.querySelector('[data-export-button]');
//             if (exportButton) {
//                 exportButton.disabled = true;
//                 exportButton.innerHTML = '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
//             }

//             for (let i = 0; i < invoicesToExport.length; i++) {
//                 const invoice = invoicesToExport[i];
//                 const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

//                 if (!invoiceId) {
//                     console.warn(`Skipping invoice without ID: ${JSON.stringify(invoice)}`);
//                     continue;
//                 }

//                 try {
//                     const columnHeaderValues = [
//                         invoice.invoiceNumber || '',
//                         formatDate(invoice.invoiceDate) || '',
//                         invoice.invoiceAmount || 0,
//                         invoice.currency || 'USD',
//                         formatDate(invoice.createdAt) || '',
//                         'PLC001',
//                         invoice.createdBy || 'Employee',
//                         '40.00',
//                         ((invoice.invoiceAmount || 0) / 40).toFixed(2),
//                         '0.00',
//                         (invoice.invoiceAmount || 0).toFixed(2),
//                         '40.00',
//                         (invoice.invoiceAmount || 0).toFixed(2)
//                     ];

//                     const payload = {
//                         ColumnHeaderValues: columnHeaderValues,
//                         IncludeHeaders: true,
//                         ExportFormat: 'CSV'
//                     };

//                     const response = await fetch(
//                         `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(invoiceId)}`,
//                         {
//                             method: 'POST',
//                             headers: {
//                                 'Accept': 'text/csv, application/csv, application/octet-stream, */*',
//                                 'Content-Type': 'application/json',
//                             },
//                             // body: JSON.stringify(payload)
//                         }
//                     );

//                     if (!response.ok) {
//                         let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
//                         try {
//                             const errorData = await response.text();
//                             if (errorData) {
//                                 errorMessage += ` - ${errorData}`;
//                             }
//                         } catch (e) {
//                             // Ignore if can't parse error
//                         }
//                         throw new Error(errorMessage);
//                     }

//                     const blob = await response.blob();

//                     if (blob.type && blob.type.includes('application/json')) {
//                         const text = await blob.text();
//                         console.error('Received JSON instead of file:', text);
//                         throw new Error('Server returned an error instead of a file');
//                     }

//                     let filename = `invoice_${invoiceId}_export.csv`;
//                     const contentDisposition = response.headers.get('Content-Disposition');
//                     if (contentDisposition) {
//                         const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
//                         if (filenameMatch && filenameMatch[1]) {
//                             filename = filenameMatch[1].replace(/['"]/g, '');
//                         }
//                     }

//                     const url = window.URL.createObjectURL(blob);
//                     const link = document.createElement('a');
//                     link.href = url;
//                     link.download = filename;
//                     link.style.display = 'none';
//                     document.body.appendChild(link);
//                     link.click();

//                     window.URL.revokeObjectURL(url);
//                     document.body.removeChild(link);

//                     if (i < invoicesToExport.length - 1) {
//                         await new Promise(resolve => setTimeout(resolve, 500));
//                     }

//                 } catch (invoiceError) {
//                     console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
//                     alert(`Failed to export invoice ${invoiceId}: ${invoiceError.message}`);
//                 }
//             }

//             const successMessage = invoicesToExport.length === 1
//                 ? 'Invoice exported successfully!'
//                 : `${invoicesToExport.length} invoices exported successfully!`;

//             alert(successMessage);

//         } catch (error) {
//             console.error('Error during export process:', error);
//             alert(`Export failed: ${error.message}`);
//         } finally {
//             const exportButton = document.querySelector('[data-export-button]');
//             if (exportButton) {
//                 exportButton.disabled = false;
//                 exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
//             }
//         }
//     };

//     if (loading) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading invoices...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="ml-48 flex-1 flex items-center justify-center">
//                 <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
//                     <div className="text-red-600 mb-4">
//                         <Receipt className="h-12 w-12 mx-auto mb-2" />
//                         <h2 className="text-lg font-semibold">Error Loading Invoices</h2>
//                     </div>
//                     <p className="text-red-700">{error}</p>
//                     <button
//                         onClick={() => window.location.reload()}
//                         className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
//                 {/* Header */}
//                 <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                             <Receipt className="h-8 w-8 text-green-600 mr-3" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Invoice Export</h1>
//                                 <p className="text-gray-600">Manage and export invoice data</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={exportToCSV}
//                                 disabled={selectedInvoices.size === 0}
//                                 data-export-button
//                                 className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
//                                     selectedInvoices.size === 0
//                                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                         : 'bg-green-600 text-white hover:bg-green-700'
//                                 }`}
//                             >
//                                 <Download className="h-4 w-4 mr-2" />
//                                 Export ({selectedInvoices.size})
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Filters */}
//                 <div className="bg-white border-b border-gray-200 p-4 -mx-6">
//                     <div className="flex items-center justify-start">
//                         <div className="w-80 relative">
//                             <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                             <input
//                                 type="text"
//                                 placeholder="Filter by Invoice Number"
//                                 value={filterInvoiceNumber}
//                                 onChange={(e) => setFilterInvoiceNumber(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                             />
//                         </div>

//                         {filterInvoiceNumber && (
//                             <button
//                                 onClick={() => setFilterInvoiceNumber("")}
//                                 className="ml-3 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
//                             >
//                                 Clear
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Table Container with Dynamic Height */}
//                 <div className="flex-1 mt-6 pb-6">
//                     {filteredInvoices.length === 0 ? (
//                         <div className="flex items-center justify-center h-64">
//                             <div className="text-center text-gray-500">
//                                 <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
//                                 <p className="text-lg font-medium">No invoices found</p>
//                                 <p className="text-sm">Try adjusting your filter criteria</p>
//                             </div>
//                         </div>
//                     ) : (
//                         <div
//                             className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-auto"
//                             style={getTableWrapperStyle()}
//                         >
//                             <table className="min-w-full">
//                                 <thead className="bg-gray-50">
//                                     <tr>
//                                         {/* <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             <div className="flex items-center space-x-2">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={selectAll}
//                                                     onChange={(e) => handleSelectAll(e.target.checked)}

//                                                     className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                 />

//                                                 <span className="text-xs font-medium text-gray-500 tracking-wider">
//                                                     All
//                                                 </span>
//                                             </div>
//                                         </th> */}
//                                         <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//     <div className="flex items-center space-x-2">
//         <input
//             type="checkbox"
//             checked={selectAll}
//             onChange={(e) => handleSelectAll(e.target.checked)}
//             // Disable if no selectable invoices exist
//             disabled={selectableInvoices.length === 0}
//             // Add visual styling for mixed state (some disabled invoices exist)
//             className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//                 selectableInvoices.length === 0
//                     ? 'opacity-50 cursor-not-allowed'
//                     : disabledInvoices.length > 0
//                         ? 'opacity-75' // Visual indicator that some are disabled
//                         : 'cursor-pointer'
//             }`}
//         />
//         <span className="text-xs font-medium text-gray-500 tracking-wider">
//             All
//         </span>
//     </div>
// </th>

//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Invoice Number
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Invoice Date
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Amount
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Currency
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Created At
//                                         </th>
//                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
//                                             Action
//                                         </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-200">
//                                     {filteredInvoices.map((invoice, index) => {
//                                         const invoiceId = invoice.invoiceId || index;
//                                         return (
//                                             <tr key={invoiceId} className="hover:bg-gray-50 transition-colors">
//                                                 <td className="px-6 py-4 whitespace-nowrap">
//                                                     {/* <input
//                                                         type="checkbox"
//                                                         checked={selectedInvoices.has(invoiceId)}
//                                                         onChange={(e) => handleSelectInvoice(invoiceId, e.target.checked)}
//                                                         className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//                                                     /> */}
//                                                     <input
//     type="checkbox"
//     checked={selectedInvoices.has(invoiceId)}
//     onChange={(e) => handleSelectInvoice(invoiceId, e.target.checked, invoice)}
//     disabled={invoice.isExported}
//     className={`h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
//         invoice.isExported
//             ? 'opacity-50 cursor-not-allowed bg-gray-100'
//             : 'cursor-pointer hover:bg-green-50'
//     }`}
// />
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
//                                                     {invoice.invoiceNumber || 'N/A'}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                     {formatDate(invoice.invoiceDate)}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
//                                                     {formatCurrency(invoice.invoiceAmount, invoice.currency)}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
//                                                         {invoice.currency || 'USD'}
//                                                     </span>
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                     {formatDate(invoice.createdAt)}
//                                                 </td>
//                                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                                     <button
//                                                         onClick={() => handlePreview(invoice)}
//                                                         className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
//                                                     >
//                                                         <Eye className="h-4 w-4 mr-1" />
//                                                         Preview
//                                                     </button>
//                                                     {/* OPEN button - only for admin and exported invoices */}
//         {/* {userRole === 'admin' && invoice.isExported && (
//             <button
//                 onClick={() => handletoUnexport(invoice)}
//                 className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
//             >
//                 <Eye className="h-4 w-4 mr-1" />
//                 OPEN
//             </button>
//         )} */}

//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Preview Modal */}
//             {previewModalVisible && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//                             <h2 className="text-xl font-semibold text-gray-900">Invoice Preview</h2>
//                             <button
//                                 onClick={() => setPreviewModalVisible(false)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <X className="h-6 w-6" />
//                             </button>
//                         </div>
//                         <div className="p-6">
//                             <InvoiceViewer
//                                 data={previewData}
//                                 setInvoiceModalVisible={setPreviewModalVisible}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }

import React, { useState, useEffect } from "react";
import { Receipt, Filter, Download, X, Eye } from "lucide-react";
import InvoiceViewer from "./InvoiceViewer";

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

  // Dynamic table container style based on content
  const getTableContainerStyle = () => {
    const headerHeight = 120; // Header section height
    const filterHeight = 80; // Filter section height
    const padding = 48; // Top and bottom padding (24px each)
    const margin = 24; // Margin
    const footerSpace = 20; // Space for any footer content

    // Calculate minimum height needed for the content
    const rowHeight = 61; // Approximate height per row (including border)
    const headerRowHeight = 48; // Header row height
    const minContentHeight =
      headerRowHeight + filteredInvoices.length * rowHeight;

    // Calculate available space
    const availableHeight =
      window.innerHeight -
      headerHeight -
      filterHeight -
      padding -
      margin -
      footerSpace;

    // Use the smaller of content height or available height, with reasonable limits
    const dynamicHeight = Math.min(
      Math.max(minContentHeight, 200), // Minimum 200px
      Math.max(availableHeight, 400) // Maximum available space, but at least 400px
    );

    return {
      height: `${dynamicHeight}px`,
      minHeight: "200px",
      maxHeight: `calc(100vh - ${
        headerHeight + filterHeight + padding + margin + footerSpace
      }px)`,
    };
  };

  // Alternative: Get table wrapper style that adjusts to content
  const getTableWrapperStyle = () => {
    // If there are few items, don't use fixed height
    if (filteredInvoices.length <= 5) {
      return {
        minHeight: "200px",
        maxHeight: "calc(100vh - 300px)", // Just prevent it from being too tall
      };
    }

    // For more items, use scrollable container
    return {
      height: "calc(100vh - 300px)",
      minHeight: "400px",
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
  const disabledInvoices = filteredInvoices.filter(
    (invoice) => invoice.isExported
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
          invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
          invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
          period: formatDate(
            apiData.period || apiData.invoiceDate || invoice.invoiceDate
          ),
          currency: apiData.currency || invoice.currency || "USD",
          totalAmount:
            apiData.totalAmount ||
            apiData.invoiceAmount ||
            invoice.invoiceAmount ||
            0,

          lineItems: (
            apiData.lineItems ||
            apiData.invoiceTimesheetLines ||
            []
          ).map((item, index) => ({
            poLine: item.poLine || item.timesheetLineNo || "Default PO Line",
            plc: item.plc || "PLC001",
            vendor: item.vendor || "Vendor",
            employee: item.employee || item.createdBy || "Employee",
            hours: item.hours || item.mappedHours || 40.0,
            rate:
              item.rate ||
              (item.mappedAmount || 0) / (item.mappedHours || 40) ||
              0,
            amount: item.amount || item.mappedAmount || 0,
            line_No: item.line_No || item.timesheetLineNo || index + 1,
          })),

          billTo:
            apiData.billTo ||
            "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
          buyer: apiData.buyer || "Clore, Heather J",
          purchaseOrderId: apiData.purchaseOrderId || "2181218010",
          releaseNumber: apiData.releaseNumber || "3",
          changeOrderNumber: apiData.changeOrderNumber || "0",
          poStartEndDate: apiData.poStartEndDate || "12/10/18 to 12/08/24",
          remitTo:
            apiData.remitTo ||
            "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
          terms: apiData.terms || "PAYNPD",
          amountDue:
            apiData.amountDue ||
            apiData.totalAmount ||
            apiData.invoiceAmount ||
            invoice.invoiceAmount ||
            0,
        },
      ];

      setPreviewData(transformedData);
    } catch (error) {
      console.error("Error fetching invoice preview:", error);
      alert(`Failed to load invoice preview: ${error.message}`);

      const fallbackData = [
        {
          invoiceId: invoice.invoiceNumber,
          invoiceDate: formatDate(invoice.invoiceDate),
          period: formatDate(invoice.invoiceDate),
          currency: invoice.currency || "USD",
          totalAmount: invoice.invoiceAmount || 0,
          lineItems: [
            {
              poLine: "Default PO Line",
              plc: "PLC001",
              vendor: "Vendor",
              employee: invoice.createdBy || "Employee",
              hours: 40.0,
              rate: (invoice.invoiceAmount || 0) / 40,
              amount: invoice.invoiceAmount || 0,
              line_No: 1,
            },
          ],
          billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
          buyer: "Clore, Heather J",
          purchaseOrderId: "2181218010",
          releaseNumber: "3",
          changeOrderNumber: "0",
          poStartEndDate: "12/10/18 to 12/08/24",
          remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
          terms: "PAYNPD",
          amountDue: invoice.invoiceAmount || 0,
        },
      ];

      setPreviewData(fallbackData);
    }
  };

  // Export function (keeping your existing export logic)
  // const exportToCSV = async () => {
  //   const invoicesToExport = filteredInvoices.filter((invoice, index) =>
  //     selectedInvoices.has(invoice.invoiceId || index)
  //   );

  //   if (invoicesToExport.length === 0) {
  //     alert("Please select invoices to export");
  //     return;
  //   }

  //   try {
  //     const exportButton = document.querySelector("[data-export-button]");
  //     if (exportButton) {
  //       exportButton.disabled = true;
  //       exportButton.innerHTML =
  //         '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
  //     }

  //     for (let i = 0; i < invoicesToExport.length; i++) {
  //       const invoice = invoicesToExport[i];
  //       const invoiceId = invoice.invoiceId || invoice.invoiceNumber;

  //       if (!invoiceId) {
  //         console.warn(
  //           `Skipping invoice without ID: ${JSON.stringify(invoice)}`
  //         );
  //         continue;
  //       }

  //       try {
  //         const columnHeaderValues = [
  //           invoice.invoiceNumber || "",
  //           formatDate(invoice.invoiceDate) || "",
  //           invoice.invoiceAmount || 0,
  //           invoice.currency || "USD",
  //           formatDate(invoice.createdAt) || "",
  //           "PLC001",
  //           invoice.createdBy || "Employee",
  //           "40.00",
  //           ((invoice.invoiceAmount || 0) / 40).toFixed(2),
  //           "0.00",
  //           (invoice.invoiceAmount || 0).toFixed(2),
  //           "40.00",
  //           (invoice.invoiceAmount || 0).toFixed(2),
  //         ];

  //         const payload = {
  //           ColumnHeaderValues: columnHeaderValues,
  //           IncludeHeaders: true,
  //           ExportFormat: "CSV",
  //         };

  //         const response = await fetch(
  //           `https://timesheet-subk.onrender.com/api/SubkTimesheet/export-invoice?InvoiceId=${encodeURIComponent(
  //             invoiceId
  //           )}`,
  //           {
  //             method: "POST",
  //             headers: {
  //               Accept:
  //                 "text/csv, application/csv, application/octet-stream, */*",
  //               "Content-Type": "application/json",
  //             },
  //             // body: JSON.stringify(payload)
  //           }
  //         );

  //         if (!response.ok) {
  //           let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
  //           try {
  //             const errorData = await response.text();
  //             if (errorData) {
  //               errorMessage += ` - ${errorData}`;
  //             }
  //           } catch (e) {
  //             // Ignore if can't parse error
  //           }
  //           throw new Error(errorMessage);
  //         }

  //         const blob = await response.blob();

  //         if (blob.type && blob.type.includes("application/json")) {
  //           const text = await blob.text();
  //           console.error("Received JSON instead of file:", text);
  //           throw new Error("Server returned an error instead of a file");
  //         }

  //         let filename = `invoice_${invoiceId}_export.csv`;
  //         const contentDisposition = response.headers.get(
  //           "Content-Disposition"
  //         );
  //         if (contentDisposition) {
  //           const filenameMatch = contentDisposition.match(
  //             /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  //           );
  //           if (filenameMatch && filenameMatch[1]) {
  //             filename = filenameMatch[1].replace(/['"]/g, "");
  //           }
  //         }

  //         const url = window.URL.createObjectURL(blob);
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.download = filename;
  //         link.style.display = "none";
  //         document.body.appendChild(link);
  //         link.click();

  //         window.URL.revokeObjectURL(url);
  //         document.body.removeChild(link);

  //         if (i < invoicesToExport.length - 1) {
  //           await new Promise((resolve) => setTimeout(resolve, 500));
  //         }
  //       } catch (invoiceError) {
  //         console.error(`Error exporting invoice ${invoiceId}:`, invoiceError);
  //         alert(
  //           `Failed to export invoice ${invoiceId}: ${invoiceError.message}`
  //         );
  //       }
  //     }

  //     const successMessage =
  //       invoicesToExport.length === 1
  //         ? "Invoice exported successfully!"
  //         : `${invoicesToExport.length} invoices exported successfully!`;

  //     alert(successMessage);
  //   } catch (error) {
  //     console.error("Error during export process:", error);
  //     alert(`Export failed: ${error.message}`);
  //   } finally {
  //     const exportButton = document.querySelector("[data-export-button]");
  //     if (exportButton) {
  //       exportButton.disabled = false;
  //       exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
  //     }
  //   }
  // };
  const exportToCSV = async () => {
    const invoicesToExport = filteredInvoices.filter((invoice, index) =>
      selectedInvoices.has(invoice.invoiceId || index)
    );

    if (invoicesToExport.length === 0) {
      alert("Please select invoices to export");
      return;
    }

    try {
      const exportButton = document.querySelector("[data-export-button]");
      if (exportButton) {
        exportButton.disabled = true;
        exportButton.innerHTML =
          '<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>Exporting...';
      }

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
              // body: JSON.stringify(payload)
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

          // **NEW: Update invoice export status in database**
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

      // **NEW: Update local state for successfully exported invoices**
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
        const remainingSelectableInvoices = filteredInvoices.filter(
          (inv) =>
            !successfullyExportedIds.includes(inv.invoiceId) && !inv.isExported
        );
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
    } finally {
      const exportButton = document.querySelector("[data-export-button]");
      if (exportButton) {
        exportButton.disabled = false;
        exportButton.innerHTML = `<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>Export (${selectedInvoices.size})`;
      }
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
      <div className="ml-48 flex-1 flex flex-col bg-gray-50 min-h-screen px-6">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6 -mx-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Invoice Export
                </h1>
                <p className="text-gray-600">
                  Manage and export invoice data
                  {/* {userRole === 'admin' && (
                                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            Admin Mode
                                        </span>
                                    )} */}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToCSV}
                disabled={selectedInvoices.size === 0}
                data-export-button
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
        <div className="bg-white border-b border-gray-200 p-4 -mx-6">
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

        {/* Table Container with Dynamic Height */}
        <div className="flex-1 mt-6 pb-6">
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
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto overflow-y-auto"
              style={getTableWrapperStyle()}
            >
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                          disabled={selectableInvoices.length === 0}
                          className={`h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded ${
                            selectableInvoices.length === 0
                              ? "opacity-50 cursor-not-allowed"
                              : disabledInvoices.length > 0
                              ? "opacity-75"
                              : "cursor-pointer"
                          }`}
                        />
                        <span className="text-xs font-medium text-gray-500 tracking-wider">
                          All
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Invoice Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Invoice Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Currency
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200 sticky top-0 bg-gray-50 z-10">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInvoices.map((invoice, index) => {
                    const invoiceId = invoice.invoiceId || invoice.id || index;
                    return (
                      <tr
                        key={invoiceId}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
                          {invoice.invoiceNumber || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
                          {invoice.invoiceTimesheetLines?.[0]?.vendor || "N/A"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(invoice.invoiceDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
                          {formatCurrency(
                            invoice.invoiceAmount,
                            invoice.currency
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
                            {invoice.currency || "USD"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {formatDate(invoice.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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

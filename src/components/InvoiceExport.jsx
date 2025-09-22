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

    // Fetch invoices from API
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://timesheet-subk.onrender.com/api/Invoices');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setInvoices(data);
                setFilteredInvoices(data);
            } catch (err) {
                console.error('Error fetching invoices:', err);
                setError(err.message || 'Failed to fetch invoices');
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
            filtered = filtered.filter(invoice => 
                invoice.invoiceNumber && 
                invoice.invoiceNumber.toLowerCase().includes(filterInvoiceNumber.toLowerCase())
            );
        }

        setFilteredInvoices(filtered);
        // Reset selections when filter changes
        setSelectedInvoices(new Set());
        setSelectAll(false);
    }, [invoices, filterInvoiceNumber]);

    const getResponsiveTableStyle = () => {
    return {
        height: 'calc(100vh - 280px)', // Adjust 280px based on your header + filters + margins
        minHeight: '250px',
        maxHeight: '70vh'
    };
};

    // Format date helper - MM-DD-YYYY format
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}-${day}-${year}`;
        } catch {
            return dateString;
        }
    };

    // Format currency helper
    const formatCurrency = (amount, currency = 'USD') => {
        if (!amount && amount !== 0) return 'N/A';
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency || 'USD'
            }).format(amount);
        } catch {
            return `${currency || '$'} ${amount}`;
        }
    };

    // Handle select all checkbox
    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            const allIds = new Set(filteredInvoices.map((invoice, index) => invoice.invoiceId || index));
            setSelectedInvoices(allIds);
        } else {
            setSelectedInvoices(new Set());
        }
    };

    // Handle individual checkbox
    const handleSelectInvoice = (invoiceId, checked) => {
        const newSelected = new Set(selectedInvoices);
        if (checked) {
            newSelected.add(invoiceId);
        } else {
            newSelected.delete(invoiceId);
        }
        setSelectedInvoices(newSelected);
        setSelectAll(newSelected.size === filteredInvoices.length);
    };

    // Handle preview click
    // const handlePreview = (invoice) => {
    //     // Transform invoice data to match InvoiceViewer expected format
    //     const transformedData = [{
    //         invoiceId: invoice.invoiceNumber,
    //         invoiceDate: formatDate(invoice.invoiceDate),
    //         period: formatDate(invoice.invoiceDate),
    //         currency: invoice.currency || 'USD',
    //         totalAmount: invoice.invoiceAmount || 0,
    //         lineItems: [
    //             {
    //                 poLine: "Default PO Line",
    //                 plc: "PLC001",
    //                 vendor: "Vendor",
    //                 employee: invoice.createdBy || "Employee",
    //                 hours: 40.00,
    //                 rate: (invoice.invoiceAmount || 0) / 40,
    //                 amount: invoice.invoiceAmount || 0,
    //                 line_No: 1
    //             }
    //         ],
    //         // Default values for other fields
    //         billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
    //         buyer: "Clore, Heather J",
    //         purchaseOrderId: "2181218010",
    //         releaseNumber: "3",
    //         changeOrderNumber: "0",
    //         poStartEndDate: "12/10/18 to 12/08/24",
    //         remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
    //         terms: "PAYNPD",
    //         amountDue: invoice.invoiceAmount || 0
    //     }];
        
    //     setPreviewData(transformedData);
    //     setPreviewModalVisible(true);
    // };

    // Handle preview click
const handlePreview = async (invoice) => {
    try {
        // Set loading state if you want to show a loading indicator
        setPreviewModalVisible(true);
        setPreviewData(null); // Clear previous data
        
        // Fetch data from the preview API
        const response = await fetch(
            `https://timesheet-subk.onrender.com/api/SubkTimesheet/PreviewInvoice?Invoice_Number=${encodeURIComponent(invoice.invoiceNumber)}`
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch invoice preview: ${response.status}`);
        }
        
        const apiData = await response.json();
        
        // Transform the API data to match InvoiceViewer expected format
        const transformedData = [{
            invoiceId: apiData.invoiceNumber || invoice.invoiceNumber,
            invoiceDate: formatDate(apiData.invoiceDate || invoice.invoiceDate),
            period: formatDate(apiData.period || apiData.invoiceDate || invoice.invoiceDate),
            currency: apiData.currency || invoice.currency || 'USD',
            totalAmount: apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0,
            
            // Transform line items from API response
            lineItems: (apiData.lineItems || apiData.invoiceTimesheetLines || []).map((item, index) => ({
                poLine: item.poLine || item.timesheetLineNo || "Default PO Line",
                plc: item.plc || "PLC001",
                vendor: item.vendor || "Vendor",
                employee: item.employee || item.createdBy || "Employee",
                hours: item.hours || item.mappedHours || 40.00,
                rate: item.rate || (item.mappedAmount || 0) / (item.mappedHours || 40) || 0,
                amount: item.amount || item.mappedAmount || 0,
                line_No: item.line_No || item.timesheetLineNo || index + 1
            })),
            
            // Use API data if available, otherwise use defaults
            billTo: apiData.billTo || "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
            buyer: apiData.buyer || "Clore, Heather J",
            purchaseOrderId: apiData.purchaseOrderId || "2181218010",
            releaseNumber: apiData.releaseNumber || "3",
            changeOrderNumber: apiData.changeOrderNumber || "0",
            poStartEndDate: apiData.poStartEndDate || "12/10/18 to 12/08/24",
            remitTo: apiData.remitTo || "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
            terms: apiData.terms || "PAYNPD",
            amountDue: apiData.amountDue || apiData.totalAmount || apiData.invoiceAmount || invoice.invoiceAmount || 0
        }];
        
        setPreviewData(transformedData);
        
    } catch (error) {
        console.error('Error fetching invoice preview:', error);
        
        // Show error message or fallback to original data
        alert(`Failed to load invoice preview: ${error.message}`);
        
        // Optional: Use original transformation as fallback
        const fallbackData = [{
            invoiceId: invoice.invoiceNumber,
            invoiceDate: formatDate(invoice.invoiceDate),
            period: formatDate(invoice.invoiceDate),
            currency: invoice.currency || 'USD',
            totalAmount: invoice.invoiceAmount || 0,
            lineItems: [
                {
                    poLine: "Default PO Line",
                    plc: "PLC001",
                    vendor: "Vendor",
                    employee: invoice.createdBy || "Employee",
                    hours: 40.00,
                    rate: (invoice.invoiceAmount || 0) / 40,
                    amount: invoice.invoiceAmount || 0,
                    line_No: 1
                }
            ],
            billTo: "SSAI\n10210 GREENBELT RD\nSUITE 600\nLANHAM\nMD\n20706",
            buyer: "Clore, Heather J",
            purchaseOrderId: "2181218010",
            releaseNumber: "3",
            changeOrderNumber: "0",
            poStartEndDate: "12/10/18 to 12/08/24",
            remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville\nMD\n21638",
            terms: "PAYNPD",
            amountDue: invoice.invoiceAmount || 0
        }];
        
        setPreviewData(fallbackData);
    }
};


    // Export to CSV function - only selected invoices
    const exportToCSV = () => {
        const invoicesToExport = filteredInvoices.filter((invoice, index) => 
            selectedInvoices.has(invoice.invoiceId || index)
        );
        
        if (invoicesToExport.length === 0) {
            alert('Please select invoices to export');
            return;
        }

        const headers = ['Invoice Number', 'Invoice Date', 'Invoice Amount', 'Currency', 'Created At'];
        const csvContent = [
            headers.join(','),
            ...invoicesToExport.map(invoice => [
                `"${invoice.invoiceNumber || ''}"`,
                `"${formatDate(invoice.invoiceDate)}"`,
                `"${invoice.invoiceAmount || 0}"`,
                `"${invoice.currency || 'USD'}"`,
                `"${formatDate(invoice.createdAt)}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `selected_invoices_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                                <h1 className="text-2xl font-bold text-gray-900">Invoice Export</h1>
                                <p className="text-gray-600">Manage and export invoice data</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* <span className="text-sm text-gray-600">
                                Selected: {selectedInvoices.size} / {filteredInvoices.length} invoices
                            </span> */}
                            <button
                                onClick={exportToCSV}
                                disabled={selectedInvoices.size === 0}
                                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm ${
                                    selectedInvoices.size === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-green-600 text-white hover:bg-green-700'
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
                        {/* Invoice Number Filter */}
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

                        {/* Clear Filter */}
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

                {/* Table */}
                <div className="flex-1 overflow-hidden mt-6">
                    <div className="h-full overflow-auto">
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
                                <table className="min-w-full">
                                    <thead className="bg-gray-50 sticky">
                                        <tr>
                                            {/* <th className="px-6 py-3 text-left border-b border-gray-200">
                                                <input
                                                    type="checkbox"
                                                    text="All"
                                                    checked={selectAll}
                                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                            </th> */}
                                            <th className="px-6 py-3 text-left border-b border-gray-200">
    <div className="flex items-center space-x-2">
        <input
            type="checkbox"
            checked={selectAll}
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <span className="text-xs font-medium text-gray-500 tracking-wider">
            All
        </span>
    </div>
</th>

                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
                                                Invoice Number
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
                                                Invoice Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200">
                                                Currency
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider border-b border-gray-200">
                                                Created At
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider border-b border-gray-200">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredInvoices.map((invoice, index) => {
                                            const invoiceId = invoice.invoiceId || index;
                                            return (
                                                <tr key={invoiceId} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedInvoices.has(invoiceId)}
                                                            onChange={(e) => handleSelectInvoice(invoiceId, e.target.checked)}
                                                            className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-small text-gray-900">
                                                        {invoice.invoiceNumber || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {formatDate(invoice.invoiceDate)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-small">
                                                        {formatCurrency(invoice.invoiceAmount, invoice.currency)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-small bg-blue-100 text-blue-800">
                                                            {invoice.currency || 'USD'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        {formatDate(invoice.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                        <button
                                                            onClick={() => handlePreview(invoice)}
                                                            className="inline-flex items-center px-3 py-1 rounded-md text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                                        >
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Preview
                                                        </button>
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
            </div>

            {/* Preview Modal */}
            {previewModalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">Invoice Preview</h2>
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

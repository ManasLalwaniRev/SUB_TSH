// import React, { useRef } from "react";
// import logoImg from "./image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { Line } from "react-chartjs-2";

// const InvoiceViewer = () => {
//   const invoiceRef = useRef();

//   //   const invoiceData = {
//   //     period: "09/30/24",
//   //     currency: "USD",
//   //     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//   //     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//   //     lineItems: [
//   //       {
//   //         plc: "7 MCHE Mechanical Eng",
//   //         vendor: "S01415 - Mark Aukerman",
//   //         employee: "S01415 - Mark Aukerman",
//   //         hours: 108.5,
//   //         rate: 91.91,
//   //         amount: 9972.24,Due

//   //       },
//   //       {
//   //         plc: "STS1 Staff Eng Sr 1",
//   //         vendor: "S01413 - Jason Solimani",
//   //         employee: "S01413 - Jason Solimani",
//   //         hours: 50,
//   //         rate: 138.45,
//   //         amount: 6922.51,
//   //       },
//   //       {
//   //         plc: "VT-CMCHE - Mechanical Eng",
//   //         vendor: "S01413 - Jason Solimani",
//   //         employee: "S01413 - Jason Solimani",
//   //         hours: 31,
//   //         rate: 91.91,
//   //         amount: 2854.21,
//   //       },
//   //     ],
//   //     totalAmount: 19931.25,
//   //   };

//   const invoiceData = {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [
//       {
//         lineno: "line 1",
//         plc: "B014",
//         vendor: "UID 014 Logistics Manager Senior",
//         employee: "UID 014 Logistics Manager Senior",
//         hours: 45,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//       {
//         lineno: "line 2",
//         plc: "B173",
//         vendor: "UID 173 Quality Assurance Senior",
//         employee: "UID 173 Quality Assurance Senior",
//         hours: 10,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//       {
//         lineno: "line 3",
//         plc: "B014",
//         vendor: "UID 014 Logistics Manager Senior",
//         employee: "UID 014 Logistics Manager Senior",
//         hours: 24,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//     ],
//     totalAmount: 0, // Sum of all line item amounts
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };

//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };

//   const addressTitleStyle = {
//     fontWeight: "700",
//     marginBottom: "5px",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };

//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };

//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//   };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };

//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };

//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />

//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>
//                   {item.lineno}.{item.plc}
//                 </td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({
//   selectedRows,
//   filteredRows,
//   currentUser,
//   showToast,
//   actionLoading,
//   setActionLoading,
// }) => {
//   const invoiceRef = useRef();

//   // State holding invoice data to render
//   const [invoiceData, setInvoiceData] = useState({
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [],
//     totalAmount: 0,
//   });

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   // Function to generate invoice by calling your API and updating invoice state
//   //   const handleGenerateInvoice = async (e) => {
//   //     e.preventDefault();
//   //     e.stopPropagation();
//   //     if (actionLoading) return;

//   //     if (selectedRows.size === 0) {
//   //       showToast("Please select at least one timesheet to export", "warning");
//   //       return;
//   //     }

//   //     try {
//   //       setActionLoading(true);
//   //       const selectedData = filteredRows.filter((row) =>
//   //         selectedRows.has(row.id)
//   //       );

//   //       if (selectedData.length === 0) {
//   //         showToast("No selected data to export", "warning");
//   //         setActionLoading(false);
//   //         return;
//   //       }

//   //       const payload = selectedData.map((row) => {
//   //         const originalItem = row.originalItem;
//   //         return {
//   //           ...originalItem,
//   //           CreatedBy:
//   //             originalItem.CreatedBy ||
//   //             currentUser?.username ||
//   //             currentUser?.id ||
//   //             "admin",
//   //           UpdatedBy:
//   //             originalItem.UpdatedBy ||
//   //             currentUser?.username ||
//   //             currentUser?.id ||
//   //             "admin",
//   //           CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
//   //           UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
//   //         };
//   //       });

//   //       const response = await fetch(
//   //         "https://timesheet-subk.onrender.com/api/SubkTimesheet/GenerateInvoice",
//   //         {
//   //           method: "POST",
//   //           headers: { "Content-Type": "application/json" },
//   //           body: JSON.stringify(payload),
//   //         }
//   //       );

//   //       if (!response.ok) {
//   //         const errorText = await response.text();
//   //         throw new Error(errorText || "Failed to generate invoice");
//   //       }

//   //       const responseData = await response.json();

//   //       // Update invoice data state with response data for rendering
//   //       setInvoiceData(responseData);

//   //       showToast("Invoice generated successfully", "success");
//   //     } catch (error) {
//   //       console.error("Error generating invoice:", error);
//   //       showToast(error.message || "Generate Invoice failed", "error");
//   //     } finally {
//   //       setActionLoading(false);
//   //     }
//   //   };

//   // Styling (can move to CSS/module if preferred)
//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleGenerateInvoice} style={buttonStyle}>
//         Generate Invoice
//       </button>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;
// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = () => {
//   const invoiceRef = useRef();

//   const invoiceData = {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [
//       {
//         plc: "7 MCHE Mechanical Eng",
//         vendor: "S01415 - Mark Aukerman",
//         employee: "S01415 - Mark Aukerman",
//         hours: 108.5,
//         rate: 91.91,
//         amount: 9972.24,
//       },
//       {
//         plc: "STS1 Staff Eng Sr 1",
//         vendor: "S01413 - Jason Solimani",
//         employee: "S01413 - Jason Solimani",
//         hours: 50,
//         rate: 138.45,
//         amount: 6922.51,
//       },
//       {
//         plc: "VT-CMCHE - Mechanical Eng",
//         vendor: "S01413 - Jason Solimani",
//         employee: "S01413 - Jason Solimani",
//         hours: 31,
//         rate: 91.91,
//         amount: 2854.21,
//       },
//     ],
//     totalAmount: 19931.25,
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };

//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };

//   const addressTitleStyle = {
//     fontWeight: "700",
//     marginBottom: "5px",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };

//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };

//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//   };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };

//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };

//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />

//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   // Default fallback if no data is passed
//   const invoiceData = data || {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [],
//     totalAmount: 0,
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoiceData.invoiceNumber || "200"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoiceData.invoiceDate || "01/01/2025"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(invoiceData.lineItems || []).map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{Number(item.hours).toFixed(2)}</td>
//                 <td style={tdRightStyle}>${Number(item.rate).toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${Number(item.amount).toFixed(2)}</td>
//                 <td style={tdRightStyle}>{Number(item.hours).toFixed(2)}</td>
//                 <td style={tdRightStyle}>${Number(item.amount).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${Number(invoiceData.totalAmount).toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useMemo } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ payload }) => {
//   const invoiceRef = useRef();

//   const RATE_PER_HOUR = 100; // default rate

//   // Defensive mapping of payload to invoiceData
//   const invoiceData = useMemo(() => {
//     if (!Array.isArray(payload) || payload.length === 0) {
//       return {
//         period: "09/30/24",
//         currency: "USD",
//         billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//         remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//         lineItems: [],
//         totalAmount: 0,
//       };
//     }

//     const lineItems = payload.map((item) => ({
//       lineNumber: item.lineNo || "", // from payload
//       plc: item.plc || "", // from payload
//       vendor: item.description || "", // from payload
//       employee: item.description || "", // from payload, fallback to description
//       hours: Number(item.hours) || 0, // parse numeric hours
//       rate: Number(item.rate) || RATE_PER_HOUR, // rate from payload or default
//       amount: (Number(item.hours) || 0) * (Number(item.rate) || RATE_PER_HOUR),
//     }));

//     const totalAmount = lineItems.reduce((total, li) => total + li.amount, 0);

//     return {
//       period: "09/30/24",
//       currency: "USD",
//       billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//       remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//       lineItems,
//       totalAmount,
//     };
//   }, [payload]);

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;

//     const canvas = await html2canvas(invoiceRef.current, {
//       scale: 2,
//       useCORS: true,
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: 60, objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>

//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Line No</th>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, idx) => (
//               <tr key={idx}>
//                 <td style={tdStyle}>{item.lineNumber}</td>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   // If no data provided or empty array, use fallback
//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   // We expect data to be an array with one invoice object
//   const invoice = data[0];

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   // const infoStyle = { marginBottom: "20px" };
//   // const boldTextStyle = { fontWeight: "700" };
//   // const flexBetweenStyle = {
//   //   display: "flex",
//   //   justifyContent: "space-between",
//   //   whiteSpace: "pre-line",
//   //   marginBottom: "20px",
//   // };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };

//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "20px",
//     whiteSpace: "pre-line",
//     fontFamily: "monospace",
//     fontSize: "15px",
//   };
//   const columnStyle = { width: "48%" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         {/* <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoice.invoiceId || "N/A"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoice.period || "09/30/24"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoice.currency || "USD"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Bill To: </span>
//             {invoice.billTo ||
//               "SSAI \n 10210 GREENBELT RD SUITE 600 \n LANHAM MD 20706"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Remit To: </span>
//             {invoice.remitTo ||
//               "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638"}
//           </div>
//         </div> */}
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoice.invoiceId || "130617"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoice.invoiceDate || "09/30/24"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoice.period || "09/30/24 - 09/30/24"}
//           </div>

//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoice.currency || "USD"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Bill To: </span>
//             {invoice.billTo ||
//               `SSAI
// 10210 GREENBELT RD
// SUITE 600
// LANHAM
// MD
// 20706`}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Remit To: </span>
//             {invoice.remitTo ||
//               `Vertex Aerospace, LLC
// PO Box 192
// Grasonville
// MD
// 21638`}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Buyer: </span>
//             {invoice.buyer || "Clore, Heather J"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Terms: </span>
//             {invoice.terms || "PAYNPD"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Amount Due </span>
//             {invoice.amountDue || "4,307.21"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Purchase Order ID: </span>
//             {invoice.purchaseOrderId || "2181218010"}
//             {" Release Number "}
//             {invoice.releaseNumber || "3"}
//             {" Change Order Number "}
//             {invoice.changeOrderNumber || "0"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>PO Start and End Date: </span>
//             {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc || ""}</td>
//                 <td style={tdStyle}>{item.vendor || item.employee || ""}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   const invoice = data[0];

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const columnStyle = { width: "49%" };
//   const addressBlockStyle = { marginBottom: "16px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         {/* Two-column information block mimicking image layout */}
//         <div style={flexBetweenStyle}>
//           {/* Left Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//               {invoice.invoiceId || "130617"}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Bill To: {"\n"}</span>
//               {invoice.billTo ||
//                 `SSAI
// 10210 GREENBELT RD
// SUITE 600
// LANHAM
// MD
// 20706`}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Buyer: </span>
//               {invoice.buyer || "Clore, Heather J"}
//             </div>
//             <div style={{ marginTop: "16px" }}>
//               <span style={boldTextStyle}>Purchase Order ID: </span>
//               {invoice.purchaseOrderId || "2181218010"} Release Number{" "}
//               {invoice.releaseNumber || "3"} Change Order Number{" "}
//               {invoice.changeOrderNumber || "0"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>PO Start and End Date: </span>
//               {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
//             </div>
//           </div>
//           {/* Right Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Invoice Date: </span>
//               {invoice.invoiceDate || "09/30/24"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>For the Period: </span>
//               {invoice.period || "09/30/24 - 09/30/24"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Billing Currency: </span>
//               {invoice.currency || "USD"}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Remit To: {"\n"}</span>
//               {invoice.remitTo ||
//                 `Vertex Aerospace, LLC
// PO Box 192
// Grasonville
// MD
// 21638`}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Terms: </span>
//               {invoice.terms || "PAYNPD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Amount Due </span>
//               {invoice.amountDue || "4,307.21"}
//             </div>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc || ""}</td>
//                 <td style={tdStyle}>{item.vendor || item.employee || ""}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data, setInvoiceModalVisible, onInvoiceSuccess }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const invoiceRef = useRef();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   const invoice = data[0];

//   // Group line items by PO Line for rendering with headers
//   const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
//     const key = item.poLine || "Other";
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(item);
//     return groups;
//   }, {});

//   // const handleDownloadPdf = async () => {
//   //   if (!invoiceRef.current) return;
//   //   const input = invoiceRef.current;
//   //   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //   const imgData = canvas.toDataURL("image/png");
//   //   const pdf = new jsPDF({
//   //     orientation: "portrait",
//   //     unit: "mm",
//   //     format: "a4",
//   //   });
//   //   const pdfWidth = pdf.internal.pageSize.getWidth();
//   //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   //   pdf.save("invoice.pdf");
//   // };

//   // const handleDownloadPdf = async () => {
//   //   setIsLoading(true);
//   //   if (!invoiceRef.current || !invoice) {
//   //     console.warn("Invoice content or data is missing.");
//   //     return;
//   //   }
//   //   const input = invoiceRef.current;
//   //   const totalAmount = invoice.lineItems.reduce(
//   //     (acc, line) => acc + line.amount,
//   //     0
//   //   );
//   //   const invoicePayload = {
//   //     invoiceNumber: invoice.invoiceId,
//   //     invoiceDate: new Date(invoice.period).toISOString(),
//   //     invoiceAmount: totalAmount,
//   //     createdBy: "Test",
//   //     updatedBy: "Test",
//   //     billTo: invoice.billTo,
//   //     remitTo: invoice.remitTo,
//   //     po_Number: invoice.po_Number,
//   //     currency: invoice.currency,
//   //     invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//   //       poLineNumber: line.poLine,
//   //       timesheetLineNo: line.line_No,
//   //       mappedHours: line.hours,
//   //       mappedAmount: line.amount,
//   //       rate: line.rate,
//   //       employee: line.employee,
//   //       vendor: line.vendor,
//   //       plc: line.plc,
//   //       hours_Date: line.hours_Date,
//   //       createdBy: "Test",
//   //       updatedBy: "Test",
//   //     })),
//   //   };

//   //   try {
//   //     const response = await fetch(
//   //       "https://timesheet-subk.onrender.com/api/Invoices",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(invoicePayload),
//   //       }
//   //     );

//   //     if (!response.ok)
//   //       throw new Error(`Failed to create invoice: ${response.status}`);

//   //     // const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //     // const imgData = canvas.toDataURL("image/png");
//   //     // const pdf = new jsPDF({
//   //     //   orientation: "portrait",
//   //     //   unit: "mm",
//   //     //   format: "a4",
//   //     // });
//   //     // const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   //     // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   //     // pdf.save("invoice.pdf");
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //     const imgData = canvas.toDataURL("image/png");

//   //     const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     const pdfHeight = pdf.internal.pageSize.getHeight();

//   //     const imgProps = pdf.getImageProperties(imgData);
//   //     const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//   //     let heightLeft = pdfImgHeight;
//   //     let position = 0;

//   //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//   //     heightLeft -= pdfHeight;

//   //     while (heightLeft > 0) {
//   //       position = heightLeft - pdfImgHeight;
//   //       pdf.addPage();
//   //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//   //       heightLeft -= pdfHeight;
//   //     }
//   //     toast.success("Invoice generated");
//   //     pdf.save("invoice.pdf");
//   //     // setInvoiceModalVisible(false);
//   //     setTimeout(() => setInvoiceModalVisible(false), 1000);
//   //     // setInvoiceModalVisible(false);

//   //
//   //
//   //     // await fetchExportData();
//   //   } catch (error) {
//   //     console.error("Error creating invoice or generating PDF:", error);
//   //     toast.error("Error generating invoice");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleDownloadPdf = async () => {
//     setIsLoading(true);
//     if (!invoiceRef.current || !invoice) {
//       console.warn("Invoice content or data is missing.");
//       setIsLoading(false);
//       return;
//     }

//     const input = invoiceRef.current;
//     const totalAmount = invoice.lineItems.reduce(
//       (acc, line) => acc + line.amount,
//       0
//     );

//     const invoicePayload = {
//       invoiceNumber: invoice.invoiceId,
//       invoiceDate: new Date(invoice.period).toISOString(),
//       invoiceAmount: totalAmount,
//       createdBy: "Test",
//       updatedBy: "Test",
//       billTo: invoice.billTo,
//       remitTo: invoice.remitTo,
//       po_Number: invoice.po_Number,
//       currency: invoice.currency,
//       invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//         poLineNumber: line.poLine,
//         timesheetLineNo: line.line_No,
//         mappedHours: line.hours,
//         mappedAmount: line.amount,
//         rate: line.rate,
//         employee: line.employee,
//         vendor: line.vendor,
//         plc: line.plc,
//         hours_Date: line.hours_Date,
//         // hours_date_str: line.hours_Date_str,
//         createdBy: "Test",
//         updatedBy: "Test",
//       })),
//     };

//     try {
//       const response = await fetch(
//         "https://timesheet-subk.onrender.com/api/Invoices",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(invoicePayload),
//         }
//       );

//       if (!response.ok)
//         throw new Error(`Failed to create invoice: ${response.status}`);

//       const pdf = new jsPDF("p", "mm", "a4");
//       const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//       const imgData = canvas.toDataURL("image/png");

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       let heightLeft = pdfImgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//       heightLeft -= pdfHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - pdfImgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//         heightLeft -= pdfHeight;
//       }

//       toast.success("Invoice generated");
//       pdf.save("invoice.pdf");

//       // Close modal after a short delay
//       setTimeout(() => setInvoiceModalVisible(false), 1000);

//       // Call the callback to update parent component's data
//       if (onInvoiceSuccess) {
//         setTimeout(() => {
//           onInvoiceSuccess(invoice);
//         }, 1500);
//       }
//     } catch (error) {
//       console.error("Error creating invoice or generating PDF:", error);
//       toast.error("Error generating invoice");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // const handleDownloadPdf = async () => {
//   //   setIsLoading(true);
//   //   if (!invoiceRef.current || !invoice) {
//   //     console.warn("Invoice content or data is missing.");
//   //     setIsLoading(false);
//   //     return;
//   //   }

//   //   const input = invoiceRef.current;
//   //   const totalAmount = invoice.lineItems.reduce(
//   //     (acc, line) => acc + line.amount,
//   //     0
//   //   );

//   //   // Prepare API payload
//   //   const invoicePayload = {
//   //     invoiceNumber: invoice.invoiceId,
//   //     invoiceDate: new Date(invoice.period).toISOString(),
//   //     invoiceAmount: totalAmount,
//   //     createdBy: "Test",
//   //     updatedBy: "Test",
//   //     billTo: invoice.billTo,
//   //     remitTo: invoice.remitTo,
//   //     po_Number: invoice.po_Number,
//   //     currency: invoice.currency,
//   //     invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//   //       poLineNumber: line.poLine,
//   //       timesheetLineNo: line.line_No,
//   //       mappedHours: line.hours,
//   //       mappedAmount: line.amount,
//   //       rate: line.rate,
//   //       employee: line.employee,
//   //       vendor: line.vendor,
//   //       plc: line.plc,
//   //       hours_Date: line.hours_Date,
//   //       createdBy: "Test",
//   //       updatedBy: "Test",
//   //     })),
//   //   };

//   //   try {
//   //     // First, make the API call to create the invoice
//   //     const response = await fetch(
//   //       "https://timesheet-subk.onrender.com/api/Invoices",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(invoicePayload),
//   //       }
//   //     );

//   //     if (!response.ok)
//   //       throw new Error(`Failed to create invoice: ${response.status}`);

//   //     // Store original styles
//   //     const originalStyles = {
//   //       height: input.style.height,
//   //       maxHeight: input.style.maxHeight,
//   //       overflow: input.style.overflow,
//   //       position: input.style.position,
//   //       transform: input.style.transform,
//   //       width: input.style.width,
//   //       minHeight: input.style.minHeight,
//   //     };

//   //     // Prepare the element - make it fully visible
//   //     input.style.height = "auto";
//   //     input.style.maxHeight = "none";
//   //     input.style.minHeight = "auto";
//   //     input.style.overflow = "visible";
//   //     input.style.position = "relative";
//   //     input.style.transform = "none";
//   //     input.style.width = "800px"; // Fixed width for consistency

//   //     // Also prepare all child elements
//   //     const allChildren = input.querySelectorAll("*");
//   //     const childrenOriginalStyles = [];

//   //     allChildren.forEach((child, index) => {
//   //       childrenOriginalStyles[index] = {
//   //         height: child.style.height,
//   //         maxHeight: child.style.maxHeight,
//   //         overflow: child.style.overflow,
//   //         minHeight: child.style.minHeight,
//   //       };

//   //       child.style.height = "auto";
//   //       child.style.maxHeight = "none";
//   //       child.style.minHeight = "auto";
//   //       child.style.overflow = "visible";
//   //     });

//   //     // Wait for styles to take effect
//   //     await new Promise((resolve) => setTimeout(resolve, 1000));

//   //     // Force browser to recalculate layout
//   //     input.offsetHeight; // Trigger reflow

//   //     // Get the actual full dimensions
//   //     const actualHeight = Math.max(
//   //       input.scrollHeight,
//   //       input.offsetHeight,
//   //       input.clientHeight,
//   //       input.getBoundingClientRect().height
//   //     );

//   //     const actualWidth = Math.max(input.scrollWidth, input.offsetWidth, 800);

//   //     console.log(`Capturing dimensions: ${actualWidth}x${actualHeight}`);

//   //     // Capture the entire content in one go with high quality
//   //     const canvas = await html2canvas(input, {
//   //       scale: 2, // Higher scale for better quality
//   //       useCORS: true,
//   //       allowTaint: true,
//   //       backgroundColor: "#ffffff",
//   //       width: actualWidth,
//   //       height: actualHeight,
//   //       scrollX: 0,
//   //       scrollY: 0,
//   //       windowWidth: actualWidth,
//   //       windowHeight: actualHeight,
//   //       removeContainer: false,
//   //       imageTimeout: 0,
//   //       onclone: (clonedDoc, element) => {
//   //         // Ensure the cloned element has the same styling
//   //         element.style.height = "auto";
//   //         element.style.maxHeight = "none";
//   //         element.style.minHeight = "auto";
//   //         element.style.overflow = "visible";
//   //         element.style.position = "relative";
//   //         element.style.width = actualWidth + "px";

//   //         // Fix all tables
//   //         const tables = clonedDoc.querySelectorAll("table");
//   //         tables.forEach((table) => {
//   //           table.style.tableLayout = "auto";
//   //           table.style.width = "100%";
//   //           table.style.borderCollapse = "collapse";
//   //           table.style.pageBreakInside = "avoid";
//   //         });

//   //         // Fix all cells
//   //         const cells = clonedDoc.querySelectorAll("td, th");
//   //         cells.forEach((cell) => {
//   //           cell.style.wordWrap = "break-word";
//   //           cell.style.whiteSpace = "normal";
//   //           cell.style.overflow = "visible";
//   //           cell.style.padding = "4px";
//   //           cell.style.border = "1px solid #ccc";
//   //           cell.style.verticalAlign = "top";
//   //         });

//   //         // Make sure all elements are fully visible
//   //         const allElements = clonedDoc.querySelectorAll("*");
//   //         allElements.forEach((el) => {
//   //           el.style.overflow = "visible";
//   //           el.style.height = "auto";
//   //           el.style.maxHeight = "none";
//   //           el.style.minHeight = "auto";
//   //           if (el.style.display === "none") {
//   //             el.style.display = "block";
//   //           }
//   //         });
//   //       },
//   //     });

//   //     // Create PDF
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     const pdfHeight = pdf.internal.pageSize.getHeight();
//   //     const margin = 15;
//   //     const usableWidth = pdfWidth - 2 * margin;
//   //     const usableHeight = pdfHeight - 2 * margin;

//   //     // Convert canvas to image data
//   //     const imgData = canvas.toDataURL("image/png", 1.0);
//   //     const imgProps = pdf.getImageProperties(imgData);

//   //     // Calculate scaling to fit page width
//   //     const imgWidth = imgProps.width;
//   //     const imgHeight = imgProps.height;

//   //     // Convert pixels to mm (assuming 96 DPI)
//   //     const imgWidthMM = (imgWidth * 25.4) / (96 * 2); // Divided by 2 because of scale factor
//   //     const imgHeightMM = (imgHeight * 25.4) / (96 * 2);

//   //     // Scale to fit page width
//   //     const scale = usableWidth / imgWidthMM;
//   //     const scaledWidth = usableWidth;
//   //     const scaledHeight = imgHeightMM * scale;

//   //     console.log(
//   //       `PDF dimensions: ${scaledWidth}x${scaledHeight}mm, Pages needed: ${Math.ceil(
//   //         scaledHeight / usableHeight
//   //       )}`
//   //     );

//   //     // Now split the image across multiple pages
//   //     let yOffset = 0;
//   //     let pageCount = 0;

//   //     while (yOffset < scaledHeight) {
//   //       if (pageCount > 0) {
//   //         pdf.addPage();
//   //       }

//   //       // Calculate how much of the image fits on this page
//   //       const remainingHeight = scaledHeight - yOffset;
//   //       const heightForThisPage = Math.min(usableHeight, remainingHeight);

//   //       // Calculate the source rectangle in the original image
//   //       const sourceY = ((yOffset / scale) * (96 * 2)) / 25.4; // Convert back to pixels
//   //       const sourceHeight = ((heightForThisPage / scale) * (96 * 2)) / 25.4;

//   //       // Create a temporary canvas for this page
//   //       const pageCanvas = document.createElement("canvas");
//   //       const pageCtx = pageCanvas.getContext("2d");

//   //       pageCanvas.width = imgWidth;
//   //       pageCanvas.height = sourceHeight;

//   //       // Draw the portion of the original image
//   //       pageCtx.drawImage(
//   //         canvas,
//   //         0,
//   //         sourceY,
//   //         imgWidth,
//   //         sourceHeight, // Source rectangle
//   //         0,
//   //         0,
//   //         imgWidth,
//   //         sourceHeight // Destination rectangle
//   //       );

//   //       const pageImgData = pageCanvas.toDataURL("image/png", 1.0);

//   //       // Add this portion to the PDF
//   //       pdf.addImage(
//   //         pageImgData,
//   //         "PNG",
//   //         margin,
//   //         margin,
//   //         scaledWidth,
//   //         heightForThisPage
//   //       );

//   //       yOffset += heightForThisPage;
//   //       pageCount++;

//   //       // Safety check to prevent infinite loop
//   //       if (pageCount > 100) {
//   //         console.warn("Too many pages, stopping");
//   //         break;
//   //       }
//   //     }

//   //     // Restore original styles
//   //     Object.assign(input.style, originalStyles);
//   //     allChildren.forEach((child, index) => {
//   //       if (childrenOriginalStyles[index]) {
//   //         Object.assign(child.style, childrenOriginalStyles[index]);
//   //       }
//   //     });

//   //     console.log(`PDF generated with ${pageCount} pages`);

//   //     // Success notification and file save
//   //     toast.success("Invoice generated");
//   //     pdf.save("invoice.pdf");

//   //     // Close modal after a short delay
//   //     setTimeout(() => setInvoiceModalVisible(false), 1000);

//   //     // Call the callback to update parent component's data
//   //     if (onInvoiceSuccess) {
//   //       setTimeout(() => {
//   //         onInvoiceSuccess(invoice);
//   //       }, 1500);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating invoice or generating PDF:", error);
//   //     toast.error("Error generating invoice");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//     paddingBottom: "20px",
//   };
//   const columnStyle = { width: "49%" };
//   const addressBlockStyle = { marginBottom: "16px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "4px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "2px",
//     whiteSpace: "pre-line",
//   };

//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   const buttonContainerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "10px", // space between buttons
//     marginTop: "20px",
//   };

//   const confirm = {
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   const cancel = {
//     padding: "10px 20px",
//     backgroundColor: "#eb370fff",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         {/* Two-column information block */}
//         <div style={flexBetweenStyle}>
//           {/* Left Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//               {invoice.invoiceId || " "}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Bill To: {"\n"}</span>
//               {invoice.billTo || `  `}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Buyer: </span>
//               {invoice.buyer || " "}
//             </div>
//             <div style={{ marginTop: "16px" }}>
//               <span style={boldTextStyle}>Purchase Order ID: </span>
//               {invoice.po_Number || ""} Release Number{" "}
//               {invoice.releaseNumber || ""}
//             </div>
//             <div>
//               <span style={boldTextStyle}>PO Start and End Date: </span>
//               {invoice.poStartEndDate || " "}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Invoice Date: </span>
//               {invoice.invoiceDate || ""}
//             </div>
//             <div>
//               <span style={boldTextStyle}>For the Period: </span>
//               {invoice.period || " "}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Billing Currency: </span>
//               {invoice.currency || "USD"}
//             </div>
//             {/* <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Remit To: {"\n"}</span>
//               {invoice.remitTo || `Ashburn, VA 20147`}
//             </div> */}
//             <div>
//               <span style={boldTextStyle}>Terms: </span>
//               {invoice.terms || "PAYNPD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Amount Due </span>
//               {invoice.totalAmount.toFixed(2) || " "}
//             </div>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   border: "1px solid #d1d5db",
//                   padding: "4px",
//                   textAlign: "left",
//                   backgroundColor: "#f3f4f6",
//                   borderRight: "none",
//                 }}
//               >
//                 PLC
//               </th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(groupedByPoLine).map(([poLine, items]) => (
//               <React.Fragment key={poLine}>
//                 <tr>
//                   <td
//                     colSpan={8}
//                     style={{
//                       fontWeight: 700,
//                       fontSize: "15px",
//                       paddingBottom: "20px",
//                     }}
//                   >
//                     PO LINE {poLine}
//                   </td>{" "}
//                 </tr>
//                 {items.map((item, index) => (
//                   <tr key={index}>
//                     {/* <td style={tdStyle}>{item.plc || ""}</td>
//                       <td style={tdStyle}>
//                         {[item.vendor, item.employee].filter(Boolean).join("\n")}
//                       </td> */}

//                     <td
//                       style={{
//                         border: "1px solid #d1d5db",
//                         padding: "4px",
//                         fontFamily: "monospace",
//                         fontSize: "12px",
//                         whiteSpace: "normal",
//                         wordBreak: "break-word",
//                         verticalAlign: "top",
//                       }}
//                       colSpan={2} // span across the two previous separate columns
//                     >
//                       <div>{item.plc}</div>
//                       <div
//                         style={{
//                           paddingLeft: "20px",
//                           marginTop: "2px",
//                         }}
//                       >
//                         <div>{item.employee}</div>
//                         <div>{item.vendor}</div>
//                       </div>
//                     </td>
//                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                     <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                     <td style={tdRightStyle}>$0.00</td>
//                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <div style={buttonContainerStyle}>
//         {/* {isLoading && <div>Loading, please wait...</div>} */}

//         <button
//           onClick={handleDownloadPdf}
//           style={confirm}
//           disabled={isLoading}
//         >
//           {isLoading ? "Generating..." : "Confirm"}
//         </button>

//         <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
//           Cancel
//         </button>
//       </div>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data, setInvoiceModalVisible, onInvoiceSuccess }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [downloadingIndex, setDownloadingIndex] = useState(null);
//   const [invoicesCreated, setInvoicesCreated] = useState(new Set());
//   const invoiceRefs = useRef([]);

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   // Handle API calls only (no download) when clicking "Confirm"
//   const handleConfirmInvoices = async () => {
//     setIsLoading(true);

//     try {
//       const successfulInvoices = new Set();

//       // Process each invoice separately with API calls
//       for (let i = 0; i < data.length; i++) {
//         const invoice = data[i];

//         try {
//           const totalAmount = invoice.lineItems.reduce(
//             (acc, line) => acc + line.amount,
//             0
//           );

//           // const invoicePayload = {
//           //   invoiceNumber: invoice.invoiceId,

//           //   invoiceAmount: totalAmount,
//           //   createdBy: "Test",
//           //   updatedBy: "Test",
//           //   billTo: invoice.billTo,
//           //   remitTo: invoice.remitTo,
//           //   po_Number: invoice.po_Number,
//           //   currency: invoice.currency,
//           //   invoiceTimesheetLines: invoice.lineItems.map((line) => ({
//           //     poLineNumber: line.poLine,
//           //     timesheetLineNo: line.line_No,
//           //     mappedHours: line.hours,
//           //     mappedAmount: line.amount,
//           //     rate: line.rate,
//           //     employee: line.employee,
//           //     vendor: line.vendor,
//           //     plc: line.plc,
//           //     hours_Date: line.hours_Date,
//           //     createdBy: "Test",
//           //     updatedBy: "Test",
//           //   })),
//           // };

//           const invoicePayload = {
//             invoiceNumber: invoice.invoiceId,
//             invoiceDate: new Date(invoice.period).toISOString(),
//             invoiceAmount: invoice.totalAmount,
//             createdBy: "Test",
//             updatedBy: "Test",
//             billTo: invoice.billTo,
//             remitTo: invoice.remitTo,
//             po_Number: invoice.po_Number,
//             po_rlse_Number: invoice.po_rlse_Number,
//             po_Start_End_Date: invoice.po_Start_End_Date,
//             buyer: invoice.buyer,
//             terms: invoice.terms,
//             currency: invoice.currency,
//             invoiceTimesheetLines: invoice.lineItems.map((line) => ({
//               poLineNumber: line.poLine,
//               timesheetLineNo: line.line_No,
//               mappedHours: line.hours,
//               mappedAmount: line.amount,
//               rate: line.rate,
//               employee: line.employee,
//               vendor: line.vendor,
//               plc: line.plc,
//               hours_Date: line.hours_Date,
//               createdBy: "Test",
//               updatedBy: "Test",
//             })),
//           };

//           console.log(
//             `Creating invoice ${i + 1}/${data.length}:`,
//             invoicePayload
//           );

//           const response = await fetch(
//             "https://timesheet-subk.onrender.com/api/Invoices",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(invoicePayload),
//             }
//           );

//           if (!response.ok) {
//             throw new Error(
//               `Failed to create invoice ${invoice.invoiceId}: ${response.status}`
//             );
//           }

//           const responseData = await response.json();
//           console.log(`Invoice ${i + 1} created successfully:`, responseData);

//           successfulInvoices.add(i);
//           toast.success(
//             `Invoice ${i + 1} (${invoice.invoiceId}) created successfully`
//           );

//           // Small delay between API calls to prevent overwhelming the server
//           if (i < data.length - 1) {
//             await new Promise((resolve) => setTimeout(resolve, 500));
//           }
//         } catch (error) {
//           console.error(`Error creating invoice ${i + 1}:`, error);
//           toast.error(`Failed to create invoice ${i + 1}: ${error.message}`);
//         }
//       }

//       setInvoicesCreated(successfulInvoices);

//       if (successfulInvoices.size === data.length) {
//         toast.success(
//           `All ${data.length} invoices created successfully! You can now download them individually.`
//         );
//       } else if (successfulInvoices.size > 0) {
//         toast.warning(
//           `${successfulInvoices.size}/${data.length} invoices created successfully. Some failed - check individual statuses.`
//         );
//       } else {
//         toast.error("Failed to create any invoices. Please try again.");
//       }

//       setInvoiceModalVisible(false);
//       // Call success callback
//       if (onInvoiceSuccess && successfulInvoices.size > 0) {
//         setTimeout(() => {
//           onInvoiceSuccess(
//             data.filter((_, index) => successfulInvoices.has(index))
//           );
//         }, 1000);
//       }
//     } catch (error) {
//       console.error("Error in invoice confirmation process:", error);
//       toast.error("Error processing invoices");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Download individual invoice as separate PDF
//   const handleDownloadSinglePdf = async (invoice, index) => {
//     if (!invoicesCreated.has(index)) {
//       toast.warning(
//         `Please create Invoice ${
//           index + 1
//         } first by clicking "Confirm All Invoices"`
//       );
//       return;
//     }

//     setDownloadingIndex(index);

//     if (!invoiceRefs.current[index]) {
//       toast.error("Invoice content not found");
//       setDownloadingIndex(null);
//       return;
//     }

//     try {
//       const element = invoiceRefs.current[index];
//       await generatePdfForElement(
//         element,
//         `invoice_${invoice.invoiceId || `${index + 1}`}.pdf`
//       );
//       toast.success(
//         `Invoice ${invoice.invoiceId || index + 1} downloaded successfully`
//       );
//     } catch (error) {
//       console.error(`Error downloading invoice ${index + 1}:`, error);
//       toast.error(`Error downloading invoice ${index + 1}`);
//     } finally {
//       setDownloadingIndex(null);
//     }
//   };

//   // Helper function to generate PDF from DOM element
//   const generatePdfForElement = async (element, filename) => {
//     // Store original styles
//     const originalStyles = {
//       height: element.style.height,
//       maxHeight: element.style.maxHeight,
//       overflow: element.style.overflow,
//       position: element.style.position,
//       transform: element.style.transform,
//       width: element.style.width,
//       minHeight: element.style.minHeight,
//     };

//     // Prepare element for capture
//     element.style.height = "auto";
//     element.style.maxHeight = "none";
//     element.style.minHeight = "auto";
//     element.style.overflow = "visible";
//     element.style.position = "relative";
//     element.style.transform = "none";
//     element.style.width = "800px";

//     // Prepare all child elements
//     const allChildren = element.querySelectorAll("*");
//     const childrenOriginalStyles = [];

//     allChildren.forEach((child, index) => {
//       childrenOriginalStyles[index] = {
//         height: child.style.height,
//         maxHeight: child.style.maxHeight,
//         overflow: child.style.overflow,
//         minHeight: child.style.minHeight,
//         width: child.style.width,
//         maxWidth: child.style.maxWidth,
//       };

//       child.style.height = "auto";
//       child.style.maxHeight = "none";
//       child.style.minHeight = "auto";
//       child.style.overflow = "visible";
//     });

//     // Control logo sizes
//     const logoElements = element.querySelectorAll(
//       'img, .logo, [class*="logo"], [id*="logo"]'
//     );
//     logoElements.forEach((logo) => {
//       if (logo.tagName === "IMG") {
//         logo.style.width = "120px";
//         logo.style.height = "auto";
//         logo.style.maxWidth = "120px";
//         logo.style.maxHeight = "60px";
//       }
//     });

//     await new Promise((resolve) => setTimeout(resolve, 500));
//     element.offsetHeight; // Trigger reflow

//     const actualHeight = Math.max(
//       element.scrollHeight,
//       element.offsetHeight,
//       element.clientHeight,
//       element.getBoundingClientRect().height
//     );
//     const actualWidth = Math.max(element.scrollWidth, element.offsetWidth, 800);

//     // Capture canvas
//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       allowTaint: true,
//       backgroundColor: "#ffffff",
//       width: actualWidth,
//       height: actualHeight,
//       scrollX: 0,
//       scrollY: 0,
//       windowWidth: actualWidth,
//       windowHeight: actualHeight,
//       removeContainer: false,
//       imageTimeout: 0,
//       onclone: (clonedDoc, clonedElement) => {
//         clonedElement.style.height = "auto";
//         clonedElement.style.maxHeight = "none";
//         clonedElement.style.minHeight = "auto";
//         clonedElement.style.overflow = "visible";
//         clonedElement.style.position = "relative";
//         clonedElement.style.width = actualWidth + "px";

//         // Control cloned logos
//         const clonedLogos = clonedDoc.querySelectorAll(
//           'img, .logo, [class*="logo"], [id*="logo"]'
//         );
//         clonedLogos.forEach((logo) => {
//           if (logo.tagName === "IMG") {
//             logo.style.width = "120px";
//             logo.style.height = "auto";
//             logo.style.maxWidth = "120px";
//             logo.style.maxHeight = "60px";
//           }
//         });

//         // Fix tables and cells
//         const tables = clonedDoc.querySelectorAll("table");
//         tables.forEach((table) => {
//           table.style.tableLayout = "auto";
//           table.style.width = "100%";
//           table.style.borderCollapse = "collapse";
//         });

//         const cells = clonedDoc.querySelectorAll("td, th");
//         cells.forEach((cell) => {
//           cell.style.wordWrap = "break-word";
//           cell.style.whiteSpace = "normal";
//           cell.style.overflow = "visible";
//           cell.style.padding = "4px";
//           cell.style.border = "1px solid #ccc";
//           cell.style.verticalAlign = "top";
//         });
//       },
//     });

//     // Create PDF
//     const pdf = new jsPDF("p", "mm", "a4");
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     const margin = 15;
//     const usableWidth = pdfWidth - 2 * margin;
//     const usableHeight = pdfHeight - 2 * margin;

//     const imgData = canvas.toDataURL("image/png", 1.0);
//     const imgProps = pdf.getImageProperties(imgData);

//     const imgWidthMM = (imgProps.width * 25.4) / (96 * 2);
//     const imgHeightMM = (imgProps.height * 25.4) / (96 * 2);

//     const scale = usableWidth / imgWidthMM;
//     const scaledWidth = usableWidth;
//     const scaledHeight = imgHeightMM * scale;

//     // Handle multi-page PDF if needed
//     let yOffset = 0;
//     let pageCount = 0;

//     while (yOffset < scaledHeight) {
//       if (pageCount > 0) {
//         pdf.addPage();
//       }

//       const remainingHeight = scaledHeight - yOffset;
//       const heightForThisPage = Math.min(usableHeight, remainingHeight);

//       const sourceY = ((yOffset / scale) * (96 * 2)) / 25.4;
//       const sourceHeight = ((heightForThisPage / scale) * (96 * 2)) / 25.4;

//       const pageCanvas = document.createElement("canvas");
//       const pageCtx = pageCanvas.getContext("2d");
//       pageCanvas.width = imgProps.width;
//       pageCanvas.height = sourceHeight;

//       pageCtx.drawImage(
//         canvas,
//         0,
//         sourceY,
//         imgProps.width,
//         sourceHeight,
//         0,
//         0,
//         imgProps.width,
//         sourceHeight
//       );

//       const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
//       pdf.addImage(
//         pageImgData,
//         "PNG",
//         margin,
//         margin,
//         scaledWidth,
//         heightForThisPage
//       );

//       yOffset += heightForThisPage;
//       pageCount++;

//       if (pageCount > 50) {
//         console.warn("Too many pages, stopping");
//         break;
//       }
//     }

//     // Restore original styles
//     Object.assign(element.style, originalStyles);
//     allChildren.forEach((child, index) => {
//       if (childrenOriginalStyles[index]) {
//         Object.assign(child.style, childrenOriginalStyles[index]);
//       }
//     });

//     // Save the PDF
//     pdf.save("invoice.pdf");
//   };

//   // Render individual invoice component
//   const renderSingleInvoice = (invoice, index) => {
//     const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
//       const key = item.poLine || "Other";
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(item);
//       return groups;
//     }, {});

//     const isCreated = invoicesCreated.has(index);

//     const containerStyle = {
//       maxWidth: "768px",
//       margin: "auto",
//       padding: "20px",
//       border: `2px solid ${isCreated ? "#10b981" : "#d1d5db"}`,
//       fontFamily: "monospace",
//       fontSize: "15px",
//       color: "#1a202c",
//       backgroundColor: "#fff",
//       marginBottom: "30px",
//       borderRadius: "8px",
//       position: "relative",
//     };

//     const statusBadgeStyle = {
//       position: "absolute",
//       top: "10px",
//       right: "10px",
//       padding: "4px 8px",
//       borderRadius: "4px",
//       fontSize: "12px",
//       fontWeight: "bold",
//       backgroundColor: isCreated ? "#10b981" : "#6b7280",
//       color: "white",
//     };

//     // ... (other styles remain the same as before)
//     const titleStyle = {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "18px",
//       fontWeight: "600",
//     };

//     const boldTextStyle = { fontWeight: 700 };

//     const flexBetweenStyle = {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "flex-start",
//       fontFamily: "monospace",
//       fontSize: "15px",

//       whiteSpace: "nowrap",
//       paddingBottom: "20px",
//     };

//     const columnStyle = { width: "49%", whiteSpace: "pre-line" };
//     const addressBlockStyle = { marginBottom: "16px" };

//     const tableStyle = {
//       width: "100%",
//       borderCollapse: "collapse",
//       marginBottom: "20px",
//       fontSize: "12px",
//     };

//     const thStyle = {
//       border: "1px solid #d1d5db",
//       padding: "4px",
//       textAlign: "left",
//       backgroundColor: "#f3f4f6",
//     };

//     const thRightStyle = { ...thStyle, textAlign: "right" };
//     const tdStyle = {
//       border: "1px solid #d1d5db",
//       padding: "2px",
//       whiteSpace: "pre-line",
//     };
//     const tdRightStyle = { ...tdStyle, textAlign: "right" };

//     const totalAmountStyle = {
//       textAlign: "right",
//       fontWeight: "600",
//       fontSize: "16px",
//       marginBottom: "24px",
//     };

//     const enhancedTitleStyle = {
//       color: "#1e40af",
//       fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
//       fontSize: "1.5rem",
//       fontWeight: "700",
//       letterSpacing: "0.05em",
//       textAlign: "center",
//       textShadow: "0 2px 4px rgba(30, 64, 175, 0.1)",
//     };

//     return (
//       <div key={`invoice-${index}`} style={containerStyle}>
//         {/* <div style={statusBadgeStyle}>{isCreated ? "CREATED" : "PENDING"}</div> */}

//         <div ref={(el) => (invoiceRefs.current[index] = el)}>
//           {/* Invoice Header */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginBottom: "20px",
//             }}
//           >
//             <img
//               src={logoImg}
//               alt="Company Logo"
//               style={{ height: "60px", objectFit: "contain" }}
//             />
//             <div
//               style={{ textAlign: "right", fontSize: "14px", color: "#666" }}
//             >
//               <div>
//                 <strong>
//                   Invoice #{index + 1} of {data.length}
//                 </strong>
//               </div>
//               <div>ID: {invoice.invoiceId || "N/A"}</div>
//             </div>
//           </div>

//           {/* <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1> */}
//           <h1 style={enhancedTitleStyle} className="font-bold">
//             REVOLVE, LLC
//           </h1>

//           {/* Two-column information block */}
//           <div style={flexBetweenStyle}>
//             <div style={columnStyle}>
//               <div>
//                 <span style={boldTextStyle}>
//                   Subcontractor Invoice Number:{" "}
//                 </span>
//                 {invoice.invoiceId || ""}
//               </div>
//               <div style={addressBlockStyle}>
//                 <span style={boldTextStyle}>Bill To: {"\n"}</span>
//                 {invoice.billTo || ``}
//               </div>
//               <div>
//                 <span style={boldTextStyle}>Buyer: </span>
//                 {invoice.buyer || " "}
//               </div>
//               <div style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
//                 <span style={boldTextStyle}>Purchase Order ID: </span>
//                 {invoice.po_Number || ""} Release Number{" "}
//                 {invoice.po_rlse_Number || ""}
//               </div>
//               <div style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
//                 <span style={boldTextStyle}> PO Start and End Date: </span>
//                 {invoice.po_Start_End_Date || " "}
//               </div>
//             </div>

//             <div style={{ ...columnStyle, textAlign: "right" }}>
//               <div>
//                 <span style={boldTextStyle}>Invoice Date: </span>
//                 {invoice.period || " "}
//               </div>
//               <div>
//                 <span style={boldTextStyle}>Billing Currency: </span>
//                 {invoice.currency || "USD"}
//               </div>
//               <div>
//                 <span style={boldTextStyle}>Terms: </span>
//                 {invoice.terms || "PAYNPD"}
//               </div>
//               <div>
//                 <span style={boldTextStyle}>Amount Due: </span>$
//                 {invoice.totalAmount?.toFixed(2) || "0.00"}
//               </div>
//             </div>
//           </div>

//           {/* Invoice Table */}
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     border: "1px solid #d1d5db",
//                     padding: "4px",
//                     textAlign: "left",
//                     backgroundColor: "#f3f4f6",
//                     borderRight: "none",
//                   }}
//                 >
//                   PLC
//                 </th>
//                 <th style={thStyle}>Vendor Employee</th>
//                 <th style={thRightStyle}>Current Hrs/Qty</th>
//                 <th style={thRightStyle}>Rate</th>
//                 <th style={thRightStyle}>Additional Amount</th>
//                 <th style={thRightStyle}>Current Amount</th>
//                 <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//                 <th style={thRightStyle}>Cumulative Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(groupedByPoLine).map(([poLine, items]) => (
//                 <React.Fragment key={`${index}-${poLine}`}>
//                   <tr>
//                     <td
//                       colSpan={8}
//                       style={{
//                         fontWeight: 700,
//                         fontSize: "15px",
//                         paddingBottom: "20px",
//                       }}
//                     >
//                       PO LINE {poLine}
//                     </td>
//                   </tr>
//                   {items.map((item, itemIndex) => (
//                     <tr key={`${index}-${poLine}-${itemIndex}`}>
//                       <td
//                         style={{
//                           border: "1px solid #d1d5db",
//                           padding: "4px",
//                           fontFamily: "monospace",
//                           fontSize: "12px",
//                           whiteSpace: "normal",
//                           wordBreak: "break-word",
//                           verticalAlign: "top",
//                         }}
//                         colSpan={2}
//                       >
//                         <div>{item.plc}</div>
//                         <div style={{ paddingLeft: "20px", marginTop: "2px" }}>
//                           <div>{item.employee}</div>
//                           <div>{item.vendor}</div>
//                         </div>
//                       </td>
//                       <td style={tdRightStyle}>
//                         {item.hours?.toFixed(2) || "0.00"}
//                       </td>
//                       <td style={tdRightStyle}>
//                         ${item.rate?.toFixed(2) || "0.00"}
//                       </td>
//                       <td style={tdRightStyle}>$0.00</td>
//                       <td style={tdRightStyle}>
//                         ${item.amount?.toFixed(2) || "0.00"}
//                       </td>
//                       <td style={tdRightStyle}>
//                         {item.hours?.toFixed(2) || "0.00"}
//                       </td>
//                       <td style={tdRightStyle}>
//                         ${item.amount?.toFixed(2) || "0.00"}
//                       </td>
//                     </tr>
//                   ))}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>

//           <div style={totalAmountStyle}>
//             Total Amount Due: ${invoice.totalAmount?.toFixed(2) || "0.00"}
//           </div>
//         </div>

//         {/* Individual Download Button */}
//         <div
//           style={{
//             textAlign: "center",
//             marginTop: "20px",
//             borderTop: "1px solid #e5e7eb",
//             paddingTop: "15px",
//           }}
//         >
//           {/* <button
//             onClick={() => handleDownloadSinglePdf(invoice, index)}
//             disabled={downloadingIndex === index || !isCreated}
//             style={{
//               padding: "8px 16px",
//               backgroundColor:
//                 downloadingIndex === index
//                   ? "#9ca3af"
//                   : !isCreated
//                   ? "#d1d5db"
//                   : "#10b981",
//               color: !isCreated ? "#6b7280" : "#fff",
//               fontWeight: "500",
//               borderRadius: "4px",
//               cursor:
//                 downloadingIndex === index
//                   ? "not-allowed"
//                   : !isCreated
//                   ? "not-allowed"
//                   : "pointer",
//               border: "none",
//               fontSize: "14px",
//             }}
//           >
//             {downloadingIndex === index
//               ? "Downloading..."
//               : !isCreated
//               ? "Create Invoice First"
//               : `Download Invoice #${index + 1}`}
//           </button> */}
//         </div>
//       </div>
//     );
//   };

//   const buttonContainerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "15px",
//     marginTop: "20px",
//     position: "sticky",
//     bottom: "0",
//     backgroundColor: "white",
//     padding: "20px 0",
//     borderTop: "2px solid #e5e7eb",
//     boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
//   };

//   const buttonStyle = {
//     padding: "12px 24px",
//     fontWeight: "500",
//     borderRadius: "6px",
//     cursor: "pointer",
//     border: "none",
//     fontSize: "14px",
//     minWidth: "140px",
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={4000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />

//       <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "20px" }}>
//         {/* Header */}
//         <div
//           style={{
//             textAlign: "center",
//             fontSize: "20px",
//             fontWeight: "bold",
//             marginBottom: "25px",
//             color: "#1f2937",
//             backgroundColor: "#f3f4f6",
//             padding: "15px",
//             borderRadius: "8px",
//           }}
//         >
//           <div>
//             Invoice Preview - {data.length} Invoice
//             {data.length > 1 ? "s" : ""} Found
//           </div>
//           {/* <div
//             style={{
//               fontSize: "14px",
//               fontWeight: "normal",
//               marginTop: "5px",
//               color: "#6b7280",
//             }}
//           >
//             Click "Confirm" to create invoices via API, then download each
//             separately
//           </div> */}
//         </div>

//         {/* Render each invoice */}
//         {data.map((invoice, index) => renderSingleInvoice(invoice, index))}
//       </div>

//       {/* Action Buttons */}
//       <div style={buttonContainerStyle}>
//         <button
//           onClick={handleConfirmInvoices}
//           disabled={isLoading}
//           style={{
//             ...buttonStyle,
//             backgroundColor: isLoading ? "#9ca3af" : "#3b82f6",
//             color: "#fff",
//             cursor: isLoading ? "not-allowed" : "pointer",
//           }}
//         >
//           {isLoading
//             ? "Creating Invoices..."
//             : `Confirm All ${data.length} Invoice${data.length > 1 ? "s" : ""}`}
//         </button>

//         <button
//           onClick={() => setInvoiceModalVisible(false)}
//           style={{
//             ...buttonStyle,
//             backgroundColor: "#ef4444",
//             color: "#fff",
//           }}
//         >
//           Close
//         </button>
//       </div>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "./image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import { Line } from "react-chartjs-2";

// const InvoiceViewer = () => {
//   const invoiceRef = useRef();

//   //   const invoiceData = {
//   //     period: "09/30/24",
//   //     currency: "USD",
//   //     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//   //     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//   //     lineItems: [
//   //       {
//   //         plc: "7 MCHE Mechanical Eng",
//   //         vendor: "S01415 - Mark Aukerman",
//   //         employee: "S01415 - Mark Aukerman",
//   //         hours: 108.5,
//   //         rate: 91.91,
//   //         amount: 9972.24,
//   //       },
//   //       {
//   //         plc: "STS1 Staff Eng Sr 1",
//   //         vendor: "S01413 - Jason Solimani",
//   //         employee: "S01413 - Jason Solimani",
//   //         hours: 50,
//   //         rate: 138.45,
//   //         amount: 6922.51,
//   //       },
//   //       {
//   //         plc: "VT-CMCHE - Mechanical Eng",
//   //         vendor: "S01413 - Jason Solimani",
//   //         employee: "S01413 - Jason Solimani",
//   //         hours: 31,
//   //         rate: 91.91,
//   //         amount: 2854.21,
//   //       },
//   //     ],
//   //     totalAmount: 19931.25,
//   //   };

//   const invoiceData = {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [
//       {
//         lineno: "line 1",
//         plc: "B014",
//         vendor: "UID 014 Logistics Manager Senior",
//         employee: "UID 014 Logistics Manager Senior",
//         hours: 45,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//       {
//         lineno: "line 2",
//         plc: "B173",
//         vendor: "UID 173 Quality Assurance Senior",
//         employee: "UID 173 Quality Assurance Senior",
//         hours: 10,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//       {
//         lineno: "line 3",
//         plc: "B014",
//         vendor: "UID 014 Logistics Manager Senior",
//         employee: "UID 014 Logistics Manager Senior",
//         hours: 24,
//         rate: 0, // Set your rate here
//         amount: 0, // Set your amount here (hours * rate)
//       },
//     ],
//     totalAmount: 0, // Sum of all line item amounts
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };

//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };

//   const addressTitleStyle = {
//     fontWeight: "700",
//     marginBottom: "5px",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };

//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };

//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//   };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };

//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };

//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />

//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>
//                   {item.lineno}.{item.plc}
//                 </td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({
//   selectedRows,
//   filteredRows,
//   currentUser,
//   showToast,
//   actionLoading,
//   setActionLoading,
// }) => {
//   const invoiceRef = useRef();

//   // State holding invoice data to render
//   const [invoiceData, setInvoiceData] = useState({
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [],
//     totalAmount: 0,
//   });

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   // Function to generate invoice by calling your API and updating invoice state
//   //   const handleGenerateInvoice = async (e) => {
//   //     e.preventDefault();
//   //     e.stopPropagation();
//   //     if (actionLoading) return;

//   //     if (selectedRows.size === 0) {
//   //       showToast("Please select at least one timesheet to export", "warning");
//   //       return;
//   //     }

//   //     try {
//   //       setActionLoading(true);
//   //       const selectedData = filteredRows.filter((row) =>
//   //         selectedRows.has(row.id)
//   //       );

//   //       if (selectedData.length === 0) {
//   //         showToast("No selected data to export", "warning");
//   //         setActionLoading(false);
//   //         return;
//   //       }

//   //       const payload = selectedData.map((row) => {
//   //         const originalItem = row.originalItem;
//   //         return {
//   //           ...originalItem,
//   //           CreatedBy:
//   //             originalItem.CreatedBy ||
//   //             currentUser?.username ||
//   //             currentUser?.id ||
//   //             "admin",
//   //           UpdatedBy:
//   //             originalItem.UpdatedBy ||
//   //             currentUser?.username ||
//   //             currentUser?.id ||
//   //             "admin",
//   //           CreatedAt: originalItem.CreatedAt || new Date().toISOString(),
//   //           UpdatedAt: originalItem.UpdatedAt || new Date().toISOString(),
//   //         };
//   //       });

//   //       const response = await fetch(
//   //         "https://timesheet-subk.onrender.com/api/SubkTimesheet/GenerateInvoice",
//   //         {
//   //           method: "POST",
//   //           headers: { "Content-Type": "application/json" },
//   //           body: JSON.stringify(payload),
//   //         }
//   //       );

//   //       if (!response.ok) {
//   //         const errorText = await response.text();
//   //         throw new Error(errorText || "Failed to generate invoice");
//   //       }

//   //       const responseData = await response.json();

//   //       // Update invoice data state with response data for rendering
//   //       setInvoiceData(responseData);

//   //       showToast("Invoice generated successfully", "success");
//   //     } catch (error) {
//   //       console.error("Error generating invoice:", error);
//   //       showToast(error.message || "Generate Invoice failed", "error");
//   //     } finally {
//   //       setActionLoading(false);
//   //     }
//   //   };

//   // Styling (can move to CSS/module if preferred)
//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleGenerateInvoice} style={buttonStyle}>
//         Generate Invoice
//       </button>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;
// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = () => {
//   const invoiceRef = useRef();

//   const invoiceData = {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [
//       {
//         plc: "7 MCHE Mechanical Eng",
//         vendor: "S01415 - Mark Aukerman",
//         employee: "S01415 - Mark Aukerman",
//         hours: 108.5,
//         rate: 91.91,
//         amount: 9972.24,
//       },
//       {
//         plc: "STS1 Staff Eng Sr 1",
//         vendor: "S01413 - Jason Solimani",
//         employee: "S01413 - Jason Solimani",
//         hours: 50,
//         rate: 138.45,
//         amount: 6922.51,
//       },
//       {
//         plc: "VT-CMCHE - Mechanical Eng",
//         vendor: "S01413 - Jason Solimani",
//         employee: "S01413 - Jason Solimani",
//         hours: 31,
//         rate: 91.91,
//         amount: 2854.21,
//       },
//     ],
//     totalAmount: 19931.25,
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };

//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };

//   const addressTitleStyle = {
//     fontWeight: "700",
//     marginBottom: "5px",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };

//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };

//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//   };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };

//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };

//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />

//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   // Default fallback if no data is passed
//   const invoiceData = data || {
//     period: "09/30/24",
//     currency: "USD",
//     billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//     remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//     lineItems: [],
//     totalAmount: 0,
//   };

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };

//   const infoStyle = { marginBottom: "20px" };
//   const boldTextStyle = { fontWeight: "700" };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     whiteSpace: "pre-line",
//     marginBottom: "20px",
//   };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoiceData.invoiceNumber || "200"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoiceData.invoiceDate || "01/01/2025"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>
//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumlative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumaltive Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(invoiceData.lineItems || []).map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{Number(item.hours).toFixed(2)}</td>
//                 <td style={tdRightStyle}>${Number(item.rate).toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${Number(item.amount).toFixed(2)}</td>
//                 <td style={tdRightStyle}>{Number(item.hours).toFixed(2)}</td>
//                 <td style={tdRightStyle}>${Number(item.amount).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${Number(invoiceData.totalAmount).toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useMemo } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ payload }) => {
//   const invoiceRef = useRef();

//   const RATE_PER_HOUR = 100; // default rate

//   // Defensive mapping of payload to invoiceData
//   const invoiceData = useMemo(() => {
//     if (!Array.isArray(payload) || payload.length === 0) {
//       return {
//         period: "09/30/24",
//         currency: "USD",
//         billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//         remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//         lineItems: [],
//         totalAmount: 0,
//       };
//     }

//     const lineItems = payload.map((item) => ({
//       lineNumber: item.lineNo || "", // from payload
//       plc: item.plc || "", // from payload
//       vendor: item.description || "", // from payload
//       employee: item.description || "", // from payload, fallback to description
//       hours: Number(item.hours) || 0, // parse numeric hours
//       rate: Number(item.rate) || RATE_PER_HOUR, // rate from payload or default
//       amount: (Number(item.hours) || 0) * (Number(item.rate) || RATE_PER_HOUR),
//     }));

//     const totalAmount = lineItems.reduce((total, li) => total + li.amount, 0);

//     return {
//       period: "09/30/24",
//       currency: "USD",
//       billTo: "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706",
//       remitTo: "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638",
//       lineItems,
//       totalAmount,
//     };
//   }, [payload]);

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;

//     const canvas = await html2canvas(invoiceRef.current, {
//       scale: 2,
//       useCORS: true,
//     });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: 60, objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>200
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>01/01/2025
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoiceData.period}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoiceData.currency}
//           </div>
//         </div>

//         <div style={flexBetweenStyle}>
//           <div>
//             <h4 style={addressTitleStyle}>Bill To</h4>
//             <p>{invoiceData.billTo}</p>
//           </div>
//           <div>
//             <h4 style={addressTitleStyle}>Remit To</h4>
//             <p>{invoiceData.remitTo}</p>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Line No</th>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoiceData.lineItems.map((item, idx) => (
//               <tr key={idx}>
//                 <td style={tdStyle}>{item.lineNumber}</td>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoiceData.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   // If no data provided or empty array, use fallback
//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   // We expect data to be an array with one invoice object
//   const invoice = data[0];

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "14px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   // const infoStyle = { marginBottom: "20px" };
//   // const boldTextStyle = { fontWeight: "700" };
//   // const flexBetweenStyle = {
//   //   display: "flex",
//   //   justifyContent: "space-between",
//   //   whiteSpace: "pre-line",
//   //   marginBottom: "20px",
//   // };
//   const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };

//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: "20px",
//     whiteSpace: "pre-line",
//     fontFamily: "monospace",
//     fontSize: "15px",
//   };
//   const columnStyle = { width: "48%" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
//         {/* <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoice.invoiceId || "N/A"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoice.period || "09/30/24"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoice.currency || "USD"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Bill To: </span>
//             {invoice.billTo ||
//               "SSAI \n 10210 GREENBELT RD SUITE 600 \n LANHAM MD 20706"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Remit To: </span>
//             {invoice.remitTo ||
//               "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638"}
//           </div>
//         </div> */}
//         <div style={infoStyle}>
//           <div>
//             <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//             {invoice.invoiceId || "130617"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Invoice Date: </span>
//             {invoice.invoiceDate || "09/30/24"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>For the Period: </span>
//             {invoice.period || "09/30/24 - 09/30/24"}
//           </div>

//           <div>
//             <span style={boldTextStyle}>Billing Currency: </span>
//             {invoice.currency || "USD"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Bill To: </span>
//             {invoice.billTo ||
//               `SSAI
// 10210 GREENBELT RD
// SUITE 600
// LANHAM
// MD
// 20706`}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Remit To: </span>
//             {invoice.remitTo ||
//               `Vertex Aerospace, LLC
// PO Box 192
// Grasonville
// MD
// 21638`}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Buyer: </span>
//             {invoice.buyer || "Clore, Heather J"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Terms: </span>
//             {invoice.terms || "PAYNPD"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>Amount Due </span>
//             {invoice.amountDue || "4,307.21"}
//           </div>
//           <br />
//           <div>
//             <span style={boldTextStyle}>Purchase Order ID: </span>
//             {invoice.purchaseOrderId || "2181218010"}
//             {" Release Number "}
//             {invoice.releaseNumber || "3"}
//             {" Change Order Number "}
//             {invoice.changeOrderNumber || "0"}
//           </div>
//           <div>
//             <span style={boldTextStyle}>PO Start and End Date: </span>
//             {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
//           </div>
//         </div>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc || ""}</td>
//                 <td style={tdStyle}>{item.vendor || item.employee || ""}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef } from "react";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data }) => {
//   const invoiceRef = useRef();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   const invoice = data[0];

//   const handleDownloadPdf = async () => {
//     if (!invoiceRef.current) return;
//     const input = invoiceRef.current;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("invoice.pdf");
//   };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const columnStyle = { width: "49%" };
//   const addressBlockStyle = { marginBottom: "16px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "8px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         {/* Two-column information block mimicking image layout */}
//         <div style={flexBetweenStyle}>
//           {/* Left Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//               {invoice.invoiceId || "130617"}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Bill To: {"\n"}</span>
//               {invoice.billTo ||
//                 `SSAI
// 10210 GREENBELT RD
// SUITE 600
// LANHAM
// MD
// 20706`}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Buyer: </span>
//               {invoice.buyer || "Clore, Heather J"}
//             </div>
//             <div style={{ marginTop: "16px" }}>
//               <span style={boldTextStyle}>Purchase Order ID: </span>
//               {invoice.purchaseOrderId || "2181218010"} Release Number{" "}
//               {invoice.releaseNumber || "3"} Change Order Number{" "}
//               {invoice.changeOrderNumber || "0"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>PO Start and End Date: </span>
//               {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
//             </div>
//           </div>
//           {/* Right Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Invoice Date: </span>
//               {invoice.invoiceDate || "09/30/24"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>For the Period: </span>
//               {invoice.period || "09/30/24 - 09/30/24"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Billing Currency: </span>
//               {invoice.currency || "USD"}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Remit To: {"\n"}</span>
//               {invoice.remitTo ||
//                 `Vertex Aerospace, LLC
// PO Box 192
// Grasonville
// MD
// 21638`}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Terms: </span>
//               {invoice.terms || "PAYNPD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Amount Due </span>
//               {invoice.amountDue || "4,307.21"}
//             </div>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.lineItems.map((item, index) => (
//               <tr key={index}>
//                 <td style={tdStyle}>{item.plc || ""}</td>
//                 <td style={tdStyle}>{item.vendor || item.employee || ""}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>$0.00</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button onClick={handleDownloadPdf} style={buttonStyle}>
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data, setInvoiceModalVisible, onInvoiceSuccess }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const invoiceRef = useRef();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>No invoice data available</div>;
//   }

//   const invoice = data[0];

//   // Group line items by PO Line for rendering with headers
//   const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
//     const key = item.poLine || "Other";
//     if (!groups[key]) groups[key] = [];
//     groups[key].push(item);
//     return groups;
//   }, {});

//   // const handleDownloadPdf = async () => {
//   //   if (!invoiceRef.current) return;
//   //   const input = invoiceRef.current;
//   //   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //   const imgData = canvas.toDataURL("image/png");
//   //   const pdf = new jsPDF({
//   //     orientation: "portrait",
//   //     unit: "mm",
//   //     format: "a4",
//   //   });
//   //   const pdfWidth = pdf.internal.pageSize.getWidth();
//   //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   //   pdf.save("invoice.pdf");
//   // };

//   // const handleDownloadPdf = async () => {
//   //   setIsLoading(true);
//   //   if (!invoiceRef.current || !invoice) {
//   //     console.warn("Invoice content or data is missing.");
//   //     return;
//   //   }
//   //   const input = invoiceRef.current;
//   //   const totalAmount = invoice.lineItems.reduce(
//   //     (acc, line) => acc + line.amount,
//   //     0
//   //   );
//   //   const invoicePayload = {
//   //     invoiceNumber: invoice.invoiceId,
//   //     invoiceDate: new Date(invoice.period).toISOString(),
//   //     invoiceAmount: totalAmount,
//   //     createdBy: "Test",
//   //     updatedBy: "Test",
//   //     billTo: invoice.billTo,
//   //     remitTo: invoice.remitTo,
//   //     po_Number: invoice.po_Number,
//   //     currency: invoice.currency,
//   //     invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//   //       poLineNumber: line.poLine,
//   //       timesheetLineNo: line.line_No,
//   //       mappedHours: line.hours,
//   //       mappedAmount: line.amount,
//   //       rate: line.rate,
//   //       employee: line.employee,
//   //       vendor: line.vendor,
//   //       plc: line.plc,
//   //       hours_Date: line.hours_Date,
//   //       createdBy: "Test",
//   //       updatedBy: "Test",
//   //     })),
//   //   };

//   //   try {
//   //     const response = await fetch(
//   //       "https://timesheet-subk.onrender.com/api/Invoices",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(invoicePayload),
//   //       }
//   //     );

//   //     if (!response.ok)
//   //       throw new Error(`Failed to create invoice: ${response.status}`);

//   //     // const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //     // const imgData = canvas.toDataURL("image/png");
//   //     // const pdf = new jsPDF({
//   //     //   orientation: "portrait",
//   //     //   unit: "mm",
//   //     //   format: "a4",
//   //     // });
//   //     // const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//   //     // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//   //     // pdf.save("invoice.pdf");
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//   //     const imgData = canvas.toDataURL("image/png");

//   //     const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     const pdfHeight = pdf.internal.pageSize.getHeight();

//   //     const imgProps = pdf.getImageProperties(imgData);
//   //     const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//   //     let heightLeft = pdfImgHeight;
//   //     let position = 0;

//   //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//   //     heightLeft -= pdfHeight;

//   //     while (heightLeft > 0) {
//   //       position = heightLeft - pdfImgHeight;
//   //       pdf.addPage();
//   //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//   //       heightLeft -= pdfHeight;
//   //     }
//   //     toast.success("Invoice generated");
//   //     pdf.save("invoice.pdf");
//   //     // setInvoiceModalVisible(false);
//   //     setTimeout(() => setInvoiceModalVisible(false), 1000);
//   //     // setInvoiceModalVisible(false);

//   //
//   //
//   //     // await fetchExportData();
//   //   } catch (error) {
//   //     console.error("Error creating invoice or generating PDF:", error);
//   //     toast.error("Error generating invoice");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const handleDownloadPdf = async () => {
//     setIsLoading(true);
//     if (!invoiceRef.current || !invoice) {
//       console.warn("Invoice content or data is missing.");
//       setIsLoading(false);
//       return;
//     }

//     const input = invoiceRef.current;
//     const totalAmount = invoice.lineItems.reduce(
//       (acc, line) => acc + line.amount,
//       0
//     );

//     const invoicePayload = {
//       invoiceNumber: invoice.invoiceId,
//       invoiceDate: new Date(invoice.period).toISOString(),
//       invoiceAmount: totalAmount,
//       createdBy: "Test",
//       updatedBy: "Test",
//       billTo: invoice.billTo,
//       remitTo: invoice.remitTo,
//       po_Number: invoice.po_Number,
//       currency: invoice.currency,
//       invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//         poLineNumber: line.poLine,
//         timesheetLineNo: line.line_No,
//         mappedHours: line.hours,
//         mappedAmount: line.amount,
//         rate: line.rate,
//         employee: line.employee,
//         vendor: line.vendor,
//         plc: line.plc,
//         hours_Date: line.hours_Date,
//         // hours_date_str: line.hours_Date_str,
//         createdBy: "Test",
//         updatedBy: "Test",
//       })),
//     };

//     try {
//       const response = await fetch(
//         "https://timesheet-subk.onrender.com/api/Invoices",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(invoicePayload),
//         }
//       );

//       if (!response.ok)
//         throw new Error(`Failed to create invoice: ${response.status}`);

//       const pdf = new jsPDF("p", "mm", "a4");
//       const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//       const imgData = canvas.toDataURL("image/png");

//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgProps = pdf.getImageProperties(imgData);
//       const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

//       let heightLeft = pdfImgHeight;
//       let position = 0;

//       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//       heightLeft -= pdfHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - pdfImgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//         heightLeft -= pdfHeight;
//       }

//       toast.success("Invoice generated");
//       pdf.save("invoice.pdf");

//       // Close modal after a short delay
//       setTimeout(() => setInvoiceModalVisible(false), 1000);

//       // Call the callback to update parent component's data
//       if (onInvoiceSuccess) {
//         setTimeout(() => {
//           onInvoiceSuccess(invoice);
//         }, 1500);
//       }
//     } catch (error) {
//       console.error("Error creating invoice or generating PDF:", error);
//       toast.error("Error generating invoice");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // const handleDownloadPdf = async () => {
//   //   setIsLoading(true);
//   //   if (!invoiceRef.current || !invoice) {
//   //     console.warn("Invoice content or data is missing.");
//   //     setIsLoading(false);
//   //     return;
//   //   }

//   //   const input = invoiceRef.current;
//   //   const totalAmount = invoice.lineItems.reduce(
//   //     (acc, line) => acc + line.amount,
//   //     0
//   //   );

//   //   // Prepare API payload
//   //   const invoicePayload = {
//   //     invoiceNumber: invoice.invoiceId,
//   //     invoiceDate: new Date(invoice.period).toISOString(),
//   //     invoiceAmount: totalAmount,
//   //     createdBy: "Test",
//   //     updatedBy: "Test",
//   //     billTo: invoice.billTo,
//   //     remitTo: invoice.remitTo,
//   //     po_Number: invoice.po_Number,
//   //     currency: invoice.currency,
//   //     invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//   //       poLineNumber: line.poLine,
//   //       timesheetLineNo: line.line_No,
//   //       mappedHours: line.hours,
//   //       mappedAmount: line.amount,
//   //       rate: line.rate,
//   //       employee: line.employee,
//   //       vendor: line.vendor,
//   //       plc: line.plc,
//   //       hours_Date: line.hours_Date,
//   //       createdBy: "Test",
//   //       updatedBy: "Test",
//   //     })),
//   //   };

//   //   try {
//   //     // First, make the API call to create the invoice
//   //     const response = await fetch(
//   //       "https://timesheet-subk.onrender.com/api/Invoices",
//   //       {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(invoicePayload),
//   //       }
//   //     );

//   //     if (!response.ok)
//   //       throw new Error(`Failed to create invoice: ${response.status}`);

//   //     // Store original styles
//   //     const originalStyles = {
//   //       height: input.style.height,
//   //       maxHeight: input.style.maxHeight,
//   //       overflow: input.style.overflow,
//   //       position: input.style.position,
//   //       transform: input.style.transform,
//   //       width: input.style.width,
//   //       minHeight: input.style.minHeight,
//   //     };

//   //     // Prepare the element - make it fully visible
//   //     input.style.height = "auto";
//   //     input.style.maxHeight = "none";
//   //     input.style.minHeight = "auto";
//   //     input.style.overflow = "visible";
//   //     input.style.position = "relative";
//   //     input.style.transform = "none";
//   //     input.style.width = "800px"; // Fixed width for consistency

//   //     // Also prepare all child elements
//   //     const allChildren = input.querySelectorAll("*");
//   //     const childrenOriginalStyles = [];

//   //     allChildren.forEach((child, index) => {
//   //       childrenOriginalStyles[index] = {
//   //         height: child.style.height,
//   //         maxHeight: child.style.maxHeight,
//   //         overflow: child.style.overflow,
//   //         minHeight: child.style.minHeight,
//   //       };

//   //       child.style.height = "auto";
//   //       child.style.maxHeight = "none";
//   //       child.style.minHeight = "auto";
//   //       child.style.overflow = "visible";
//   //     });

//   //     // Wait for styles to take effect
//   //     await new Promise((resolve) => setTimeout(resolve, 1000));

//   //     // Force browser to recalculate layout
//   //     input.offsetHeight; // Trigger reflow

//   //     // Get the actual full dimensions
//   //     const actualHeight = Math.max(
//   //       input.scrollHeight,
//   //       input.offsetHeight,
//   //       input.clientHeight,
//   //       input.getBoundingClientRect().height
//   //     );

//   //     const actualWidth = Math.max(input.scrollWidth, input.offsetWidth, 800);

//   //     console.log(`Capturing dimensions: ${actualWidth}x${actualHeight}`);

//   //     // Capture the entire content in one go with high quality
//   //     const canvas = await html2canvas(input, {
//   //       scale: 2, // Higher scale for better quality
//   //       useCORS: true,
//   //       allowTaint: true,
//   //       backgroundColor: "#ffffff",
//   //       width: actualWidth,
//   //       height: actualHeight,
//   //       scrollX: 0,
//   //       scrollY: 0,
//   //       windowWidth: actualWidth,
//   //       windowHeight: actualHeight,
//   //       removeContainer: false,
//   //       imageTimeout: 0,
//   //       onclone: (clonedDoc, element) => {
//   //         // Ensure the cloned element has the same styling
//   //         element.style.height = "auto";
//   //         element.style.maxHeight = "none";
//   //         element.style.minHeight = "auto";
//   //         element.style.overflow = "visible";
//   //         element.style.position = "relative";
//   //         element.style.width = actualWidth + "px";

//   //         // Fix all tables
//   //         const tables = clonedDoc.querySelectorAll("table");
//   //         tables.forEach((table) => {
//   //           table.style.tableLayout = "auto";
//   //           table.style.width = "100%";
//   //           table.style.borderCollapse = "collapse";
//   //           table.style.pageBreakInside = "avoid";
//   //         });

//   //         // Fix all cells
//   //         const cells = clonedDoc.querySelectorAll("td, th");
//   //         cells.forEach((cell) => {
//   //           cell.style.wordWrap = "break-word";
//   //           cell.style.whiteSpace = "normal";
//   //           cell.style.overflow = "visible";
//   //           cell.style.padding = "4px";
//   //           cell.style.border = "1px solid #ccc";
//   //           cell.style.verticalAlign = "top";
//   //         });

//   //         // Make sure all elements are fully visible
//   //         const allElements = clonedDoc.querySelectorAll("*");
//   //         allElements.forEach((el) => {
//   //           el.style.overflow = "visible";
//   //           el.style.height = "auto";
//   //           el.style.maxHeight = "none";
//   //           el.style.minHeight = "auto";
//   //           if (el.style.display === "none") {
//   //             el.style.display = "block";
//   //           }
//   //         });
//   //       },
//   //     });

//   //     // Create PDF
//   //     const pdf = new jsPDF("p", "mm", "a4");
//   //     const pdfWidth = pdf.internal.pageSize.getWidth();
//   //     const pdfHeight = pdf.internal.pageSize.getHeight();
//   //     const margin = 15;
//   //     const usableWidth = pdfWidth - 2 * margin;
//   //     const usableHeight = pdfHeight - 2 * margin;

//   //     // Convert canvas to image data
//   //     const imgData = canvas.toDataURL("image/png", 1.0);
//   //     const imgProps = pdf.getImageProperties(imgData);

//   //     // Calculate scaling to fit page width
//   //     const imgWidth = imgProps.width;
//   //     const imgHeight = imgProps.height;

//   //     // Convert pixels to mm (assuming 96 DPI)
//   //     const imgWidthMM = (imgWidth * 25.4) / (96 * 2); // Divided by 2 because of scale factor
//   //     const imgHeightMM = (imgHeight * 25.4) / (96 * 2);

//   //     // Scale to fit page width
//   //     const scale = usableWidth / imgWidthMM;
//   //     const scaledWidth = usableWidth;
//   //     const scaledHeight = imgHeightMM * scale;

//   //     console.log(
//   //       `PDF dimensions: ${scaledWidth}x${scaledHeight}mm, Pages needed: ${Math.ceil(
//   //         scaledHeight / usableHeight
//   //       )}`
//   //     );

//   //     // Now split the image across multiple pages
//   //     let yOffset = 0;
//   //     let pageCount = 0;

//   //     while (yOffset < scaledHeight) {
//   //       if (pageCount > 0) {
//   //         pdf.addPage();
//   //       }

//   //       // Calculate how much of the image fits on this page
//   //       const remainingHeight = scaledHeight - yOffset;
//   //       const heightForThisPage = Math.min(usableHeight, remainingHeight);

//   //       // Calculate the source rectangle in the original image
//   //       const sourceY = ((yOffset / scale) * (96 * 2)) / 25.4; // Convert back to pixels
//   //       const sourceHeight = ((heightForThisPage / scale) * (96 * 2)) / 25.4;

//   //       // Create a temporary canvas for this page
//   //       const pageCanvas = document.createElement("canvas");
//   //       const pageCtx = pageCanvas.getContext("2d");

//   //       pageCanvas.width = imgWidth;
//   //       pageCanvas.height = sourceHeight;

//   //       // Draw the portion of the original image
//   //       pageCtx.drawImage(
//   //         canvas,
//   //         0,
//   //         sourceY,
//   //         imgWidth,
//   //         sourceHeight, // Source rectangle
//   //         0,
//   //         0,
//   //         imgWidth,
//   //         sourceHeight // Destination rectangle
//   //       );

//   //       const pageImgData = pageCanvas.toDataURL("image/png", 1.0);

//   //       // Add this portion to the PDF
//   //       pdf.addImage(
//   //         pageImgData,
//   //         "PNG",
//   //         margin,
//   //         margin,
//   //         scaledWidth,
//   //         heightForThisPage
//   //       );

//   //       yOffset += heightForThisPage;
//   //       pageCount++;

//   //       // Safety check to prevent infinite loop
//   //       if (pageCount > 100) {
//   //         console.warn("Too many pages, stopping");
//   //         break;
//   //       }
//   //     }

//   //     // Restore original styles
//   //     Object.assign(input.style, originalStyles);
//   //     allChildren.forEach((child, index) => {
//   //       if (childrenOriginalStyles[index]) {
//   //         Object.assign(child.style, childrenOriginalStyles[index]);
//   //       }
//   //     });

//   //     console.log(`PDF generated with ${pageCount} pages`);

//   //     // Success notification and file save
//   //     toast.success("Invoice generated");
//   //     pdf.save("invoice.pdf");

//   //     // Close modal after a short delay
//   //     setTimeout(() => setInvoiceModalVisible(false), 1000);

//   //     // Call the callback to update parent component's data
//   //     if (onInvoiceSuccess) {
//   //       setTimeout(() => {
//   //         onInvoiceSuccess(invoice);
//   //       }, 1500);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error creating invoice or generating PDF:", error);
//   //     toast.error("Error generating invoice");
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   const containerStyle = {
//     maxWidth: "768px",
//     margin: "auto",
//     padding: "20px",
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };
//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "20px",
//     fontSize: "18px",
//     fontWeight: "600",
//   };
//   const infoStyle = {
//     marginBottom: "20px",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//   };
//   const boldTextStyle = { fontWeight: 700 };
//   const flexBetweenStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     fontFamily: "monospace",
//     fontSize: "15px",
//     whiteSpace: "pre-line",
//     paddingBottom: "20px",
//   };
//   const columnStyle = { width: "49%" };
//   const addressBlockStyle = { marginBottom: "16px" };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: "20px",
//     fontSize: "12px",
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "4px",
//     textAlign: "left",
//     backgroundColor: "#f3f4f6",
//   };
//   const thRightStyle = { ...thStyle, textAlign: "right" };
//   const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "2px",
//     whiteSpace: "pre-line",
//   };

//   const tdRightStyle = { ...tdStyle, textAlign: "right" };
//   const totalAmountStyle = {
//     textAlign: "right",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginBottom: "24px",
//   };
//   const buttonStyle = {
//     display: "block",
//     margin: "20px auto 0",
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   const buttonContainerStyle = {
//     display: "flex",
//     justifyContent: "center",
//     gap: "10px", // space between buttons
//     marginTop: "20px",
//   };

//   const confirm = {
//     padding: "10px 20px",
//     backgroundColor: "#2563eb",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   const cancel = {
//     padding: "10px 20px",
//     backgroundColor: "#eb370fff",
//     color: "#fff",
//     fontWeight: "500",
//     borderRadius: "4px",
//     cursor: "pointer",
//     border: "none",
//   };

//   return (
//     <>
//       <div ref={invoiceRef} style={containerStyle}>
//         <ToastContainer
//           position="top-right"
//           autoClose={3000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//         <img
//           src={logoImg}
//           alt="Company Logo"
//           style={{ height: "60px", objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

//         {/* Two-column information block */}
//         <div style={flexBetweenStyle}>
//           {/* Left Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//               {invoice.invoiceId || " "}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Bill To: {"\n"}</span>
//               {invoice.billTo || `  `}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Buyer: </span>
//               {invoice.buyer || " "}
//             </div>
//             <div style={{ marginTop: "16px" }}>
//               <span style={boldTextStyle}>Purchase Order ID: </span>
//               {invoice.po_Number || ""} Release Number{" "}
//               {invoice.releaseNumber || ""}
//             </div>
//             <div>
//               <span style={boldTextStyle}>PO Start and End Date: </span>
//               {invoice.poStartEndDate || " "}
//             </div>
//           </div>

//           {/* Right Column */}
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Invoice Date: </span>
//               {invoice.invoiceDate || ""}
//             </div>
//             <div>
//               <span style={boldTextStyle}>For the Period: </span>
//               {invoice.period || " "}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Billing Currency: </span>
//               {invoice.currency || "USD"}
//             </div>
//             {/* <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Remit To: {"\n"}</span>
//               {invoice.remitTo || `Ashburn, VA 20147`}
//             </div> */}
//             <div>
//               <span style={boldTextStyle}>Terms: </span>
//               {invoice.terms || "PAYNPD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Amount Due </span>
//               {invoice.totalAmount.toFixed(2) || " "}
//             </div>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   border: "1px solid #d1d5db",
//                   padding: "4px",
//                   textAlign: "left",
//                   backgroundColor: "#f3f4f6",
//                   borderRight: "none",
//                 }}
//               >
//                 PLC
//               </th>
//               <th style={thStyle}>Vendor Employee</th>
//               <th style={thRightStyle}>Current Hrs/Qty</th>
//               <th style={thRightStyle}>Rate</th>
//               <th style={thRightStyle}>Additional Amount</th>
//               <th style={thRightStyle}>Current Amount</th>
//               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
//               <th style={thRightStyle}>Cumulative Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.entries(groupedByPoLine).map(([poLine, items]) => (
//               <React.Fragment key={poLine}>
//                 <tr>
//                   <td
//                     colSpan={8}
//                     style={{
//                       fontWeight: 700,
//                       fontSize: "15px",
//                       paddingBottom: "20px",
//                     }}
//                   >
//                     PO LINE {poLine}
//                   </td>{" "}
//                 </tr>
//                 {items.map((item, index) => (
//                   <tr key={index}>
//                     {/* <td style={tdStyle}>{item.plc || ""}</td>
//                       <td style={tdStyle}>
//                         {[item.vendor, item.employee].filter(Boolean).join("\n")}
//                       </td> */}

//                     <td
//                       style={{
//                         border: "1px solid #d1d5db",
//                         padding: "4px",
//                         fontFamily: "monospace",
//                         fontSize: "12px",
//                         whiteSpace: "normal",
//                         wordBreak: "break-word",
//                         verticalAlign: "top",
//                       }}
//                       colSpan={2} // span across the two previous separate columns
//                     >
//                       <div>{item.plc}</div>
//                       <div
//                         style={{
//                           paddingLeft: "20px",
//                           marginTop: "2px",
//                         }}
//                       >
//                         <div>{item.employee}</div>
//                         <div>{item.vendor}</div>
//                       </div>
//                     </td>
//                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                     <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                     <td style={tdRightStyle}>$0.00</td>
//                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//         <div style={totalAmountStyle}>
//           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <div style={buttonContainerStyle}>
//         {/* {isLoading && <div>Loading, please wait...</div>} */}

//         <button
//           onClick={handleDownloadPdf}
//           style={confirm}
//           disabled={isLoading}
//         >
//           {isLoading ? "Generating..." : "Confirm"}
//         </button>

//         <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
//           Cancel
//         </button>
//       </div>
//     </>
//   );
// };

// export default InvoiceViewer;

import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceViewer = ({ data, setInvoiceModalVisible, onInvoiceSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState(null);
  const [invoicesCreated, setInvoicesCreated] = useState(new Set());
  const invoiceRefs = useRef([]);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No invoice data available</div>;
  }

  // Handle API calls only (no download) when clicking "Confirm"
  const handleConfirmInvoices = async () => {
    setIsLoading(true);

    try {
      const successfulInvoices = new Set();

      // Process each invoice separately with API calls
      for (let i = 0; i < data.length; i++) {
        const invoice = data[i];

        try {
          const totalAmount = invoice.lineItems.reduce(
            (acc, line) => acc + line.amount,
            0
          );

          // const invoicePayload = {
          //   invoiceNumber: invoice.invoiceId,

          //   invoiceAmount: totalAmount,
          //   createdBy: "Test",
          //   updatedBy: "Test",
          //   billTo: invoice.billTo,
          //   remitTo: invoice.remitTo,
          //   po_Number: invoice.po_Number,
          //   currency: invoice.currency,
          //   invoiceTimesheetLines: invoice.lineItems.map((line) => ({
          //     poLineNumber: line.poLine,
          //     timesheetLineNo: line.line_No,
          //     mappedHours: line.hours,
          //     mappedAmount: line.amount,
          //     rate: line.rate,
          //     employee: line.employee,
          //     vendor: line.vendor,
          //     plc: line.plc,
          //     hours_Date: line.hours_Date,
          //     createdBy: "Test",
          //     updatedBy: "Test",
          //   })),
          // };

          const invoicePayload = {
            invoiceNumber: invoice.invoiceId,
            invoiceDate: new Date(invoice.period).toISOString(),
            invoiceAmount: invoice.totalAmount,
            createdBy: "Test",
            updatedBy: "Test",
            billTo: invoice.billTo,
            remitTo: invoice.remitTo,
            po_Number: invoice.po_Number,
            po_rlse_Number: invoice.po_rlse_Number,
            po_Start_End_Date: invoice.po_Start_End_Date,
            buyer: invoice.buyer,
            terms: invoice.terms,
            currency: invoice.currency,
            invoiceTimesheetLines: invoice.lineItems.map((line) => ({
              poLineNumber: line.poLine,
              timesheetLineNo: line.line_No,
              mappedHours: line.hours,
              mappedAmount: line.amount,
              rate: line.rate,
              employee: line.employee,
              vendor: line.vendor,
              plc: line.plc,
              hours_Date: line.hours_Date,
              createdBy: "Test",
              updatedBy: "Test",
            })),
          };

          console.log(
            `Creating invoice ${i + 1}/${data.length}:`,
            invoicePayload
          );

          const response = await fetch(
            "https://timesheet-subk.onrender.com/api/Invoices",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(invoicePayload),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to create invoice ${invoice.invoiceId}: ${response.status}`
            );
          }

          const responseData = await response.json();
          console.log(`Invoice ${i + 1} created successfully:`, responseData);

          successfulInvoices.add(i);
          toast.success(
            `Invoice ${i + 1} (${invoice.invoiceId}) created successfully`
          );

          // Small delay between API calls to prevent overwhelming the server
          if (i < data.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Error creating invoice ${i + 1}:`, error);
          toast.error(`Failed to create invoice ${i + 1}: ${error.message}`);
        }
      }

      setInvoicesCreated(successfulInvoices);

      if (successfulInvoices.size === data.length) {
        toast.success(
          `All ${data.length} invoices created successfully! You can now download them individually.`
        );
      } else if (successfulInvoices.size > 0) {
        toast.warning(
          `${successfulInvoices.size}/${data.length} invoices created successfully. Some failed - check individual statuses.`
        );
      } else {
        toast.error("Failed to create any invoices. Please try again.");
      }

      setInvoiceModalVisible(false);
      // Call success callback
      if (onInvoiceSuccess && successfulInvoices.size > 0) {
        setTimeout(() => {
          onInvoiceSuccess(
            data.filter((_, index) => successfulInvoices.has(index))
          );
        }, 1000);
      }
    } catch (error) {
      console.error("Error in invoice confirmation process:", error);
      toast.error("Error processing invoices");
    } finally {
      setIsLoading(false);
    }
  };

  // Download individual invoice as separate PDF
  const handleDownloadSinglePdf = async (invoice, index) => {
    if (!invoicesCreated.has(index)) {
      toast.warning(
        `Please create Invoice ${
          index + 1
        } first by clicking "Confirm All Invoices"`
      );
      return;
    }

    setDownloadingIndex(index);

    if (!invoiceRefs.current[index]) {
      toast.error("Invoice content not found");
      setDownloadingIndex(null);
      return;
    }

    try {
      const element = invoiceRefs.current[index];
      await generatePdfForElement(
        element,
        `invoice_${invoice.invoiceId || `${index + 1}`}.pdf`
      );
      toast.success(
        `Invoice ${invoice.invoiceId || index + 1} downloaded successfully`
      );
    } catch (error) {
      console.error(`Error downloading invoice ${index + 1}:`, error);
      toast.error(`Error downloading invoice ${index + 1}`);
    } finally {
      setDownloadingIndex(null);
    }
  };

  // Helper function to generate PDF from DOM element
  const generatePdfForElement = async (element, filename) => {
    // Store original styles
    const originalStyles = {
      height: element.style.height,
      maxHeight: element.style.maxHeight,
      overflow: element.style.overflow,
      position: element.style.position,
      transform: element.style.transform,
      width: element.style.width,
      minHeight: element.style.minHeight,
    };

    // Prepare element for capture
    element.style.height = "auto";
    element.style.maxHeight = "none";
    element.style.minHeight = "auto";
    element.style.overflow = "visible";
    element.style.position = "relative";
    element.style.transform = "none";
    element.style.width = "800px";

    // Prepare all child elements
    const allChildren = element.querySelectorAll("*");
    const childrenOriginalStyles = [];

    allChildren.forEach((child, index) => {
      childrenOriginalStyles[index] = {
        height: child.style.height,
        maxHeight: child.style.maxHeight,
        overflow: child.style.overflow,
        minHeight: child.style.minHeight,
        width: child.style.width,
        maxWidth: child.style.maxWidth,
      };

      child.style.height = "auto";
      child.style.maxHeight = "none";
      child.style.minHeight = "auto";
      child.style.overflow = "visible";
    });

    // Control logo sizes
    const logoElements = element.querySelectorAll(
      'img, .logo, [class*="logo"], [id*="logo"]'
    );
    logoElements.forEach((logo) => {
      if (logo.tagName === "IMG") {
        logo.style.width = "120px";
        logo.style.height = "auto";
        logo.style.maxWidth = "120px";
        logo.style.maxHeight = "60px";
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    element.offsetHeight; // Trigger reflow

    const actualHeight = Math.max(
      element.scrollHeight,
      element.offsetHeight,
      element.clientHeight,
      element.getBoundingClientRect().height
    );
    const actualWidth = Math.max(element.scrollWidth, element.offsetWidth, 800);

    // Capture canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      width: actualWidth,
      height: actualHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: actualWidth,
      windowHeight: actualHeight,
      removeContainer: false,
      imageTimeout: 0,
      onclone: (clonedDoc, clonedElement) => {
        clonedElement.style.height = "auto";
        clonedElement.style.maxHeight = "none";
        clonedElement.style.minHeight = "auto";
        clonedElement.style.overflow = "visible";
        clonedElement.style.position = "relative";
        clonedElement.style.width = actualWidth + "px";

        // Control cloned logos
        const clonedLogos = clonedDoc.querySelectorAll(
          'img, .logo, [class*="logo"], [id*="logo"]'
        );
        clonedLogos.forEach((logo) => {
          if (logo.tagName === "IMG") {
            logo.style.width = "120px";
            logo.style.height = "auto";
            logo.style.maxWidth = "120px";
            logo.style.maxHeight = "60px";
          }
        });

        // Fix tables and cells
        const tables = clonedDoc.querySelectorAll("table");
        tables.forEach((table) => {
          table.style.tableLayout = "auto";
          table.style.width = "100%";
          table.style.borderCollapse = "collapse";
        });

        const cells = clonedDoc.querySelectorAll("td, th");
        cells.forEach((cell) => {
          cell.style.wordWrap = "break-word";
          cell.style.whiteSpace = "normal";
          cell.style.overflow = "visible";
          cell.style.padding = "4px";
          cell.style.border = "1px solid #ccc";
          cell.style.verticalAlign = "top";
        });
      },
    });

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const usableWidth = pdfWidth - 2 * margin;
    const usableHeight = pdfHeight - 2 * margin;

    const imgData = canvas.toDataURL("image/png", 1.0);
    const imgProps = pdf.getImageProperties(imgData);

    const imgWidthMM = (imgProps.width * 25.4) / (96 * 2);
    const imgHeightMM = (imgProps.height * 25.4) / (96 * 2);

    const scale = usableWidth / imgWidthMM;
    const scaledWidth = usableWidth;
    const scaledHeight = imgHeightMM * scale;

    // Handle multi-page PDF if needed
    let yOffset = 0;
    let pageCount = 0;

    while (yOffset < scaledHeight) {
      if (pageCount > 0) {
        pdf.addPage();
      }

      const remainingHeight = scaledHeight - yOffset;
      const heightForThisPage = Math.min(usableHeight, remainingHeight);

      const sourceY = ((yOffset / scale) * (96 * 2)) / 25.4;
      const sourceHeight = ((heightForThisPage / scale) * (96 * 2)) / 25.4;

      const pageCanvas = document.createElement("canvas");
      const pageCtx = pageCanvas.getContext("2d");
      pageCanvas.width = imgProps.width;
      pageCanvas.height = sourceHeight;

      pageCtx.drawImage(
        canvas,
        0,
        sourceY,
        imgProps.width,
        sourceHeight,
        0,
        0,
        imgProps.width,
        sourceHeight
      );

      const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
      pdf.addImage(
        pageImgData,
        "PNG",
        margin,
        margin,
        scaledWidth,
        heightForThisPage
      );

      yOffset += heightForThisPage;
      pageCount++;

      if (pageCount > 50) {
        console.warn("Too many pages, stopping");
        break;
      }
    }

    // Restore original styles
    Object.assign(element.style, originalStyles);
    allChildren.forEach((child, index) => {
      if (childrenOriginalStyles[index]) {
        Object.assign(child.style, childrenOriginalStyles[index]);
      }
    });

    // Save the PDF
    pdf.save("invoice.pdf");
  };

  // Render individual invoice component
  const renderSingleInvoice = (invoice, index) => {
    const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
      const key = item.poLine || "Other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});

    const isCreated = invoicesCreated.has(index);

    const containerStyle = {
      maxWidth: "768px",
      margin: "auto",
      padding: "20px",
      border: "2px solid #d1d5db",
      fontFamily: "monospace",
      fontSize: "15px",
      color: "#1a202c",
      backgroundColor: "#fff",
    };
    const titleStyle = {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "18px",
      fontWeight: "600",
    };
    const infoStyle = {
      marginBottom: "20px",
      fontFamily: "monospace",
      fontSize: "15px",
      whiteSpace: "pre-line",
    };
    const boldTextStyle = {
      fontWeight: 700,
      fontSize: "12px",
      // Ensure consistent font size for bold text
    };
    const flexBetweenStyle = {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      fontFamily: "monospace",
      fontSize: "12px", // Reduced from 15px
      whiteSpace: "nowrap",
      paddingBottom: "20px",
    };

    const columnStyle = {
      width: "49%",
      whiteSpace: "pre-line",
      fontSize: "12px", // Added explicit font size
      lineHeight: "1.3", // Tighter line spacing
    };

    const addressBlockStyle = { marginBottom: "16px" };
    const tableStyle = {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      fontSize: "10px", // Reduced from 12px to match the reference
      fontFamily: "monospace",
    };
    const thStyle = {
      border: "1px solid #d1d5db",
      padding: "4px",
      textAlign: "left",
      backgroundColor: "#f3f4f6",
    };
    const thRightStyle = { ...thStyle, textAlign: "right" };
    const tdStyle = {
      border: "1px solid #d1d5db",
      padding: "2px",
      whiteSpace: "pre-line",
    };

    const tdRightStyle = { ...tdStyle, textAlign: "right" };
    const totalAmountStyle = {
      textAlign: "right",
      fontWeight: "600",
      fontSize: "16px",
      marginBottom: "24px",
    };
    const buttonStyle = {
      display: "block",
      margin: "20px auto 0",
      padding: "10px 20px",
      backgroundColor: "#2563eb",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
    };

    const buttonContainerStyle = {
      display: "flex",
      justifyContent: "center",
      gap: "10px", // space between buttons
      marginTop: "20px",
    };

    const confirm = {
      padding: "10px 20px",
      backgroundColor: "#2563eb",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
    };

    const cancel = {
      padding: "10px 20px",
      backgroundColor: "#eb370fff",
      color: "#fff",
      fontWeight: "500",
      borderRadius: "4px",
      cursor: "pointer",
      border: "none",
    };

    // const enhancedTitleStyle = {
    //   color: "#1e40af",
    //   fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    //   fontSize: "1.5rem",
    //   fontWeight: "700",
    //   letterSpacing: "0.05em",
    //   textAlign: "center",
    //   textShadow: "0 2px 4px rgba(30, 64, 175, 0.1)",
    // };

    const headerContainerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between", // Changed from flex-start
      marginBottom: "20px",
      position: "relative",
    };

    const logoStyle = {
      height: "60px",
      objectFit: "contain",
      flex: "0 0 auto", // Don't grow or shrink
    };

    const invoiceInfoStyle = {
      textAlign: "right",
      fontSize: "12px",
      color: "#000", // Changed from #666 to match the image
      fontFamily: "monospace",
      position: "absolute", // Position it absolutely
      top: "0",
      right: "0",
    };

    const companyTitleStyle = {
      color: "#0f20e0ff",
      fontFamily: '"Times New Roman", Times, serif', // Changed to Times New Roman with fallbacks
      fontSize: "14px",
      fontWeight: "700",
      letterSpacing: "0.02em",
      margin: "0",
      textAlign: "center",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
    };

    // Add an invisible spacer to balance the logo
    const spacerStyle = {
      width: "60px", // Same width as logo
      height: "60px",
    };

    const formatAddress = (addressString) => {
      if (!addressString) return "";

      // Split on comma or 2+ consecutive spaces using regex
      const parts = addressString.split(/[,]|\s{2,}/);

      // Clean up each part (remove extra whitespace) and filter out empty parts
      const formattedLines = parts
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

      // Join with newlines
      return formattedLines.join("\n");
    };

    return (
      <div key={`invoice-${index}`} style={containerStyle}>
        {/* <div style={statusBadgeStyle}>{isCreated ? "CREATED" : "PENDING"}</div> */}

        <div ref={(el) => (invoiceRefs.current[index] = el)}>
          {/* Invoice Header */}
          <div style={headerContainerStyle}>
            <img src={logoImg} alt="Company Logo" style={logoStyle} />
            <div style={invoiceInfoStyle}>
              <div>
                <strong>
                  Invoice #{index + 1} of {data.length}
                </strong>
              </div>
              <div>ID: {invoice.invoiceId || "N/A"}</div>
            </div>
            <h1 style={companyTitleStyle}>REVOLVE SOLUTIONS</h1>
            <div style={spacerStyle}></div>
          </div>

          {/* <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1> */}

          {/* Two-column information block */}
          <div style={flexBetweenStyle}>
            <div style={columnStyle}>
              <div>
                <span style={boldTextStyle}>Invoice Number: </span>
                {invoice.invoiceId || ""}
              </div>
              <div style={{ ...addressBlockStyle, marginTop: "16px" }}>
                <span style={boldTextStyle}>Bill To: {"\n"}</span>
                {invoice.billT ||
                  `Revolve Solutions
                
                Ashburn, VA 20147 `}
              </div>
              <div>
                <span style={boldTextStyle}>Buyer: </span>
                {invoice.buyer || " "}
              </div>
              <div style={{ marginTop: "16px" }}>
                <span style={boldTextStyle}>Purchase Order ID: </span>
                {invoice.po_Number || ""} Release Number{" "}
                {invoice.po_rlse_Number || ""}
              </div>
              <div style={{ marginTop: "16px" }}>
                <span style={boldTextStyle}> PO Start and End Date: </span>
                {invoice.po_Start_End_Date || " "}
              </div>
            </div>

            <div style={columnStyle}>
              <div>
                <span style={boldTextStyle}>Invoice Date: </span>
                {invoice.period || " "}
              </div>
              <div>
                <span style={boldTextStyle}>Billing Currency: </span>

                {invoice.currency || "USD"}
              </div>
              <div style={{ ...addressBlockStyle, marginTop: "16px" }}>
                <span style={boldTextStyle}>Remit To: {"\n"}</span>
                {formatAddress(invoice.billTo) || ``}
              </div>
              <div>
                <span style={boldTextStyle}>Terms: </span>
                {invoice.terms || "PAYNPD"}
              </div>
              <div>
                <span style={boldTextStyle}>Amount Due </span>$
                {invoice.totalAmount?.toFixed(2) || "0.00"}
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <table style={tableStyle}>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #d1d5db",
                    padding: "4px",
                    textAlign: "left",
                    backgroundColor: "#f3f4f6",
                    borderRight: "none",
                  }}
                >
                  PLC
                </th>
                <th style={thStyle}>Vendor Employee</th>
                <th style={thRightStyle}>Current Hrs/Qty</th>
                <th style={thRightStyle}>Rate</th>
                <th style={thRightStyle}>Additional Amount</th>
                <th style={thRightStyle}>Current Amount</th>
                <th style={thRightStyle}>Cumulative Hrs/Qty</th>
                <th style={thRightStyle}>Cumulative Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedByPoLine).map(([poLine, items]) => (
                <React.Fragment key={poLine}>
                  <tr>
                    <td
                      colSpan={8}
                      style={{
                        fontWeight: 700,
                        fontSize: "12px",
                        paddingBottom: "10px",
                      }}
                    >
                      PO LINE {poLine}
                    </td>{" "}
                  </tr>
                  {items.map((item, index) => (
                    <tr key={index}>
                      {/* <td style={tdStyle}>{item.plc || ""}</td>
                                <td style={tdStyle}>
                                  {[item.vendor, item.employee].filter(Boolean).join("\n")}
                                </td> */}

                      <td
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "4px",
                          fontFamily: "monospace",
                          fontSize: "12px",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          verticalAlign: "top",
                        }}
                        colSpan={2} // span across the two previous separate columns
                      >
                        <div>{item.plc}</div>
                        <div
                          style={{
                            paddingLeft: "20px",
                            marginTop: "2px",
                          }}
                        >
                          <div>{item.employee}</div>
                          <div>{item.vendor}</div>
                        </div>
                      </td>
                      <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
                      <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
                      <td style={tdRightStyle}>$0.00</td>
                      <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
                      <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
                      <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <div style={totalAmountStyle}>
            Total Amount Due: ${invoice.totalAmount?.toFixed(2) || "0.00"}
          </div>
        </div>

        {/* Individual Download Button */}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "15px",
          }}
        >
          {/* <button
            onClick={() => handleDownloadSinglePdf(invoice, index)}
            disabled={downloadingIndex === index || !isCreated}
            style={{
              padding: "8px 16px",
              backgroundColor:
                downloadingIndex === index
                  ? "#9ca3af"
                  : !isCreated
                  ? "#d1d5db"
                  : "#10b981",
              color: !isCreated ? "#6b7280" : "#fff",
              fontWeight: "500",
              borderRadius: "4px",
              cursor:
                downloadingIndex === index
                  ? "not-allowed"
                  : !isCreated
                  ? "not-allowed"
                  : "pointer",
              border: "none",
              fontSize: "14px",
            }}
          >
            {downloadingIndex === index
              ? "Downloading..."
              : !isCreated
              ? "Create Invoice First"
              : `Download Invoice #${index + 1}`}
          </button> */}
        </div>
      </div>
    );
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    position: "sticky",
    bottom: "0",
    backgroundColor: "white",
    padding: "20px 0",
    borderTop: "2px solid #e5e7eb",
    boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontWeight: "500",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontSize: "14px",
    minWidth: "140px",
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "25px",
            color: "#1f2937",
            backgroundColor: "#f3f4f6",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <div>
            Invoice Preview - {data.length} Invoice
            {data.length > 1 ? "s" : ""} Found
          </div>
          {/* <div
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              marginTop: "5px",
              color: "#6b7280",
            }}
          >
            Click "Confirm" to create invoices via API, then download each
            separately
          </div> */}
        </div>

        {/* Render each invoice */}
        {data.map((invoice, index) => renderSingleInvoice(invoice, index))}
      </div>

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <button
          onClick={handleConfirmInvoices}
          disabled={isLoading}
          style={{
            ...buttonStyle,
            backgroundColor: isLoading ? "#9ca3af" : "#3b82f6",
            color: "#fff",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading
            ? "Creating Invoices..."
            : `Confirm All ${data.length} Invoice${data.length > 1 ? "s" : ""}`}
        </button>

        <button
          onClick={() => setInvoiceModalVisible(false)}
          style={{
            ...buttonStyle,
            backgroundColor: "#ef4444",
            color: "#fff",
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default InvoiceViewer;

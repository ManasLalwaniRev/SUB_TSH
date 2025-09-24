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

import React, { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceViewer = ({ data, setInvoiceModalVisible, onInvoiceSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const invoiceRef = useRef();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No invoice data available</div>;
  }

  const invoice = data[0];

  // Group line items by PO Line for rendering with headers
  const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
    const key = item.poLine || "Other";
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {});

  // const handleDownloadPdf = async () => {
  //   if (!invoiceRef.current) return;
  //   const input = invoiceRef.current;
  //   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  //   const imgData = canvas.toDataURL("image/png");
  //   const pdf = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //   pdf.save("invoice.pdf");
  // };

  // const handleDownloadPdf = async () => {
  //   setIsLoading(true);
  //   if (!invoiceRef.current || !invoice) {
  //     console.warn("Invoice content or data is missing.");
  //     return;
  //   }
  //   const input = invoiceRef.current;
  //   const totalAmount = invoice.lineItems.reduce(
  //     (acc, line) => acc + line.amount,
  //     0
  //   );
  //   const invoicePayload = {
  //     invoiceNumber: invoice.invoiceId,
  //     invoiceDate: new Date(invoice.period).toISOString(),
  //     invoiceAmount: totalAmount,
  //     createdBy: "Test",
  //     updatedBy: "Test",
  //     billTo: invoice.billTo,
  //     remitTo: invoice.remitTo,
  //     po_Number: invoice.po_Number,
  //     currency: invoice.currency,
  //     invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
  //       poLineNumber: line.poLine,
  //       timesheetLineNo: line.line_No,
  //       mappedHours: line.hours,
  //       mappedAmount: line.amount,
  //       rate: line.rate,
  //       employee: line.employee,
  //       vendor: line.vendor,
  //       plc: line.plc,
  //       hours_Date: line.hours_Date,
  //       createdBy: "Test",
  //       updatedBy: "Test",
  //     })),
  //   };

  //   try {
  //     const response = await fetch(
  //       "https://timesheet-subk.onrender.com/api/Invoices",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(invoicePayload),
  //       }
  //     );

  //     if (!response.ok)
  //       throw new Error(`Failed to create invoice: ${response.status}`);

  //     // const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  //     // const imgData = canvas.toDataURL("image/png");
  //     // const pdf = new jsPDF({
  //     //   orientation: "portrait",
  //     //   unit: "mm",
  //     //   format: "a4",
  //     // });
  //     // const pdfWidth = pdf.internal.pageSize.getWidth();
  //     // const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //     // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  //     // pdf.save("invoice.pdf");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

  //     let heightLeft = pdfImgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
  //     heightLeft -= pdfHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - pdfImgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
  //       heightLeft -= pdfHeight;
  //     }
  //     toast.success("Invoice generated");
  //     pdf.save("invoice.pdf");
  //     // setInvoiceModalVisible(false);
  //     setTimeout(() => setInvoiceModalVisible(false), 1000);
  //     // setInvoiceModalVisible(false);

  //
  //
  //     // await fetchExportData();
  //   } catch (error) {
  //     console.error("Error creating invoice or generating PDF:", error);
  //     toast.error("Error generating invoice");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleDownloadPdf = async () => {
    setIsLoading(true);
    if (!invoiceRef.current || !invoice) {
      console.warn("Invoice content or data is missing.");
      setIsLoading(false);
      return;
    }

    const input = invoiceRef.current;
    const totalAmount = invoice.lineItems.reduce(
      (acc, line) => acc + line.amount,
      0
    );

    const invoicePayload = {
      invoiceNumber: invoice.invoiceId,
      invoiceDate: new Date(invoice.period).toISOString(),
      invoiceAmount: totalAmount,
      createdBy: "Test",
      updatedBy: "Test",
      billTo: invoice.billTo,
      remitTo: invoice.remitTo,
      po_Number: invoice.po_Number,
      currency: invoice.currency,
      invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
        poLineNumber: line.poLine,
        timesheetLineNo: line.line_No,
        mappedHours: line.hours,
        mappedAmount: line.amount,
        rate: line.rate,
        employee: line.employee,
        vendor: line.vendor,
        plc: line.plc,
        // hours_Date: line.hours_Date,
        hours_date_str: line.hours_Date_str,
        createdBy: "Test",
        updatedBy: "Test",
      })),
    };

    try {
      const response = await fetch(
        "https://timesheet-subk.onrender.com/api/Invoices",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invoicePayload),
        }
      );

      if (!response.ok)
        throw new Error(`Failed to create invoice: ${response.status}`);

      const pdf = new jsPDF("p", "mm", "a4");
      const canvas = await html2canvas(input, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfImgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - pdfImgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
        heightLeft -= pdfHeight;
      }

      toast.success("Invoice generated");
      pdf.save("invoice.pdf");

      // Close modal after a short delay
      setTimeout(() => setInvoiceModalVisible(false), 1000);

      // Call the callback to update parent component's data
      if (onInvoiceSuccess) {
        setTimeout(() => {
          onInvoiceSuccess(invoice);
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating invoice or generating PDF:", error);
      toast.error("Error generating invoice");
    } finally {
      setIsLoading(false);
    }
  };

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
  const boldTextStyle = { fontWeight: 700 };
  const flexBetweenStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    fontFamily: "monospace",
    fontSize: "15px",
    whiteSpace: "pre-line",
    paddingBottom: "20px",
  };
  const columnStyle = { width: "49%" };
  const addressBlockStyle = { marginBottom: "16px" };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    fontSize: "12px",
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

  return (
    <>
      <div ref={invoiceRef} style={containerStyle}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <img
          src={logoImg}
          alt="Company Logo"
          style={{ height: "60px", objectFit: "contain" }}
        />
        <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

        {/* Two-column information block */}
        <div style={flexBetweenStyle}>
          {/* Left Column */}
          <div style={columnStyle}>
            <div>
              <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
              {invoice.invoiceId || "130617"}
            </div>
            <div style={addressBlockStyle}>
              <span style={boldTextStyle}>Bill To: {"\n"}</span>
              {invoice.billTo || `Ashburn, VA 20147`}
            </div>
            <div>
              <span style={boldTextStyle}>Buyer: </span>
              {invoice.buyer || "Clore, Heather J"}
            </div>
            <div style={{ marginTop: "16px" }}>
              <span style={boldTextStyle}>Purchase Order ID: </span>
              {invoice.purchaseOrderId || "2181218010"} Release Number{" "}
              {invoice.releaseNumber || "3"} Change Order Number{" "}
              {invoice.changeOrderNumber || "0"}
            </div>
            <div>
              <span style={boldTextStyle}>PO Start and End Date: </span>
              {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
            </div>
          </div>

          {/* Right Column */}
          <div style={columnStyle}>
            <div>
              <span style={boldTextStyle}>Invoice Date: </span>
              {invoice.invoiceDate || "09/30/24"}
            </div>
            <div>
              <span style={boldTextStyle}>For the Period: </span>
              {invoice.period || "09/30/24 - 09/30/24"}
            </div>
            <div>
              <span style={boldTextStyle}>Billing Currency: </span>
              {invoice.currency || "USD"}
            </div>
            <div style={addressBlockStyle}>
              <span style={boldTextStyle}>Remit To: {"\n"}</span>
              {invoice.remitTo || `Ashburn, VA 20147`}
            </div>
            <div>
              <span style={boldTextStyle}>Terms: </span>
              {invoice.terms || "PAYNPD"}
            </div>
            <div>
              <span style={boldTextStyle}>Amount Due </span>
              {invoice.totalAmount.toFixed(2) || "4,307.21"}
            </div>
          </div>
        </div>

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
                      fontSize: "15px",
                      paddingBottom: "20px",
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
          Total Amount Due: ${invoice.totalAmount.toFixed(2)}
        </div>
      </div>
      <div style={buttonContainerStyle}>
        {/* {isLoading && <div>Loading, please wait...</div>} */}

        <button
          onClick={handleDownloadPdf}
          style={confirm}
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Confirm"}
        </button>

        <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default InvoiceViewer;

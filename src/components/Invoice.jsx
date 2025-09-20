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

import React, { useRef } from "react";
import logoImg from "../assets/image.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoiceViewer = ({ data }) => {
  const invoiceRef = useRef();

  // If no data provided or empty array, use fallback
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No invoice data available</div>;
  }

  // We expect data to be an array with one invoice object
  const invoice = data[0];

  const handleDownloadPdf = async () => {
    if (!invoiceRef.current) return;
    const input = invoiceRef.current;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const containerStyle = {
    maxWidth: "768px",
    margin: "auto",
    padding: "20px",
    border: "2px solid #d1d5db",
    fontFamily: "monospace",
    fontSize: "14px",
    color: "#1a202c",
    backgroundColor: "#fff",
  };
  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "600",
  };
  const infoStyle = { marginBottom: "20px" };
  const boldTextStyle = { fontWeight: "700" };
  const flexBetweenStyle = {
    display: "flex",
    justifyContent: "space-between",
    whiteSpace: "pre-line",
    marginBottom: "20px",
  };
  const addressTitleStyle = { fontWeight: "700", marginBottom: "5px" };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
    fontSize: "12px",
  };
  const thStyle = {
    border: "1px solid #d1d5db",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f3f4f6",
  };
  const thRightStyle = { ...thStyle, textAlign: "right" };
  const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
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

  return (
    <>
      <div ref={invoiceRef} style={containerStyle}>
        <img
          src={logoImg}
          alt="Company Logo"
          style={{ height: "60px", objectFit: "contain" }}
        />
        <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>
        <div style={infoStyle}>
          <div>
            <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
            {invoice.invoiceId || "N/A"}
          </div>
          <div>
            <span style={boldTextStyle}>Invoice Date: </span>
            {invoice.period || "09/30/24"}
          </div>
          <div>
            <span style={boldTextStyle}>Billing Currency: </span>
            {invoice.currency || "USD"}
          </div>
          <div>
            <span style={boldTextStyle}>Bill To: </span>
            {invoice.billTo ||
              "SSAI\n10210 GREENBELT RD SUITE 600\nLANHAM MD 20706"}
          </div>
          <div>
            <span style={boldTextStyle}>Remit To: </span>
            {invoice.remitTo ||
              "Vertex Aerospace, LLC\nPO Box 192\nGrasonville MD 21638"}
          </div>
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>PLC</th>
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
            {invoice.lineItems.map((item, index) => (
              <tr key={index}>
                <td style={tdStyle}>{item.plc || ""}</td>
                <td style={tdStyle}>{item.vendor || item.employee || ""}</td>
                <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
                <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
                <td style={tdRightStyle}>$0.00</td>
                <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
                <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
                <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={totalAmountStyle}>
          Total Amount Due: ${invoice.totalAmount.toFixed(2)}
        </div>
      </div>
      <button onClick={handleDownloadPdf} style={buttonStyle}>
        Download PDF
      </button>
    </>
  );
};

export default InvoiceViewer;

// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import logoImg from "../assets/image.png";

// const InvoiceViewer = ({ data }) => {
//   const invoice =
//     data && Array.isArray(data) && data.length > 0 ? data[0] : null;

//   const containerStyle = {
//     maxWidth: 768,
//     margin: "auto",
//     padding: 20,
//     border: "2px solid #d1d5db",
//     fontFamily: "monospace",
//     fontSize: 14,
//     color: "#1a202c",
//     backgroundColor: "#fff",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: 20,
//     fontWeight: 600,
//     fontSize: 18,
//   };
//   const flexStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     whiteSpace: "pre-line",
//   };
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     marginBottom: 20,
//     fontSize: 12,
//   };
//   const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: 8,
//     textAlign: "left",
//     backgroundColor: "#f3f6f9",
//   };
//   const tdStyle = { border: "1px solid #d1d5db", padding: 8 };
//   const tdRightStyle = { ...tdStyle, textAlign: "right" };

//   const invoiceRef = useRef();

//   if (!invoice) {
//     return <div>No Invoice data available</div>;
//   }

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
//       <div style={containerStyle} ref={invoiceRef}>
//         <img
//           src={logoImg}
//           alt="Company logo"
//           style={{ height: 60, objectFit: "contain" }}
//         />
//         <h1 style={titleStyle}>SUMARY SYSTEMS, LLC</h1>
//         <div style={flexStyle}>
//           <div>
//             <div>
//               <strong>Invoice Number:</strong> {invoice.invoiceId}
//             </div>
//             <div>
//               <strong>Invoice Date:</strong> {invoice.period}
//             </div>
//             <div>
//               <strong>Currency:</strong> {invoice.currency}
//             </div>
//           </div>
//           <div>
//             <div>
//               <strong>Bill To:</strong> {invoice.billTo || "N/A"}
//             </div>
//             <div>
//               <strong>Remit To:</strong> {invoice.remitTo || "N/A"}
//             </div>
//           </div>
//         </div>

//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>PLC</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Hours</th>
//               <th style={thStyle}>Rate</th>
//               <th style={thStyle}>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoice.lineItems.map((item, idx) => (
//               <tr key={idx}>
//                 <td style={tdStyle}>{item.plc}</td>
//                 <td style={tdStyle}>{item.employee || item.vendor}</td>
//                 <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
//                 <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div style={{ ...tdRightStyle, fontWeight: "bold", fontSize: 14 }}>
//           Total: ${invoice.totalAmount.toFixed(2)}
//         </div>
//       </div>
//       <button
//         onClick={handleDownloadPdf}
//         style={{ marginTop: 12, padding: "10px 20px" }}
//       >
//         Download PDF
//       </button>
//     </>
//   );
// };

// export default InvoiceViewer;

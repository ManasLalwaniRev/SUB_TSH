// // import React, { useRef, useState } from "react";
// // import { toast, ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import logoImg from "../assets/image.png";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";

// // const InvoiceViewer = ({ data, setInvoiceModalVisible }) => {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const invoiceRef = useRef();

// //   if (!data || !Array.isArray(data) || data.length === 0) {
// //     return <div>No invoice data available</div>;
// //   }

// //   const invoice = data[0];

// //   // Group line items by PO Line for rendering with headers
// //   const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
// //     const key = item.poLine || "Other";
// //     if (!groups[key]) groups[key] = [];
// //     groups[key].push(item);
// //     return groups;
// //   }, {});

// //   // const handleDownloadPdf = async () => {
// //   //   if (!invoiceRef.current) return;
// //   //   const input = invoiceRef.current;
// //   //   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
// //   //   const imgData = canvas.toDataURL("image/png");
// //   //   const pdf = new jsPDF({
// //   //     orientation: "portrait",
// //   //     unit: "mm",
// //   //     format: "a4",
// //   //   });
// //   //   const pdfWidth = pdf.internal.pageSize.getWidth();
// //   //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
// //   //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
// //   //   pdf.save("invoice.pdf");
// //   // };

// //   const handleDownloadPdf = async () => {
// //     setIsLoading(true);
// //     if (!invoiceRef.current || !invoice) {
// //       console.warn("Invoice content or data is missing.");
// //       return;
// //     }
// //     const input = invoiceRef.current;
// //     // const totalAmount = invoice.lineItems.reduce(
// //     //   (acc, line) => acc + line.amount,
// //     //   0
// //     // );
// //     // const invoicePayload = {
// //     //   invoiceNumber: invoice.invoiceId,
// //     //   invoiceDate: new Date(invoice.period).toISOString(),
// //     //   invoiceAmount: totalAmount,
// //     //   createdBy: "Test",
// //     //   updatedBy: "Test",
// //     //   invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
// //     //     // timesheetLineNo: line.poLine,
// //     //     timesheetLineNo: line.line_No,
// //     //     mappedHours: line.hours,
// //     //     mappedAmount: line.amount,
// //     //     createdBy: "Test",
// //     //     updatedBy: "Test",
// //     //   })),
// //     // };

// //     // try {
// //     //   const response = await fetch(
// //     //     "https://timesheet-subk.onrender.com/api/Invoices",
// //     //     {
// //     //       method: "POST",
// //     //       headers: { "Content-Type": "application/json" },
// //     //       body: JSON.stringify(invoicePayload),
// //     //     }
// //     //   );
// //     //   if (!response.ok)
// //     //     throw new Error(`Failed to create invoice: ${response.status}`);

// //     const pdf = new jsPDF("p", "mm", "a4");
// //     const padding = 10;
// //     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
// //     const imgData = canvas.toDataURL("image/png");

// //     const pdfWidth = pdf.internal.pageSize.getWidth();
// //     const pdfHeight = pdf.internal.pageSize.getHeight();

// //     const usableWidth = pdfWidth - 2 * padding;
// //     const usableHeight = pdfHeight - 2 * padding;

// //     const imgProps = pdf.getImageProperties(imgData);
// //     // const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
// //     const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

// //     let heightLeft = pdfImgHeight;
// //     // let position = 0;
// //     let position = padding;

// //     // pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
// //     // heightLeft -= pdfHeight;
// //     pdf.addImage(imgData, "PNG", padding, position, usableWidth, pdfImgHeight);
// //     heightLeft -= usableHeight;

// //     // while (heightLeft > 0) {
// //     //   position = heightLeft - pdfImgHeight;
// //     //   pdf.addPage();
// //     //   pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
// //     //   heightLeft -= pdfHeight;
// //     // }
// //     while (heightLeft > 0) {
// //       pdf.addPage();
// //       position = padding - heightLeft;
// //       pdf.addImage(
// //         imgData,
// //         "PNG",
// //         padding,
// //         position,
// //         usableWidth,
// //         pdfImgHeight
// //       );
// //       heightLeft -= usableHeight;
// //     }

// //     pdf.save("invoice.pdf");
// //     setIsLoading(false);
// //     setInvoiceModalVisible(false);
// //   };

// //   // catch (error) {
// //   //   console.error("Error creating invoice or generating PDF:", error);
// //   // }

// //   const containerStyle = {
// //     maxWidth: "768px",
// //     margin: "auto",
// //     padding: "20px",
// //     border: "2px solid #d1d5db",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     color: "#1a202c",
// //     backgroundColor: "#fff",
// //   };
// //   const titleStyle = {
// //     textAlign: "center",
// //     marginBottom: "20px",
// //     fontSize: "18px",
// //     fontWeight: "600",
// //   };
// //   const infoStyle = {
// //     marginBottom: "20px",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     whiteSpace: "pre-line",
// //   };
// //   const boldTextStyle = { fontWeight: 700 };
// //   const flexBetweenStyle = {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "flex-start",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     whiteSpace: "pre-line",
// //     paddingBottom: "20px",
// //   };
// //   const columnStyle = { width: "49%" };
// //   const addressBlockStyle = { marginBottom: "16px" };
// //   const tableStyle = {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     marginBottom: "20px",
// //     fontSize: "12px",
// //   };
// //   const thStyle = {
// //     border: "1px solid #d1d5db",
// //     padding: "4px",
// //     textAlign: "left",
// //     backgroundColor: "#f3f4f6",
// //   };
// //   const thRightStyle = { ...thStyle, textAlign: "right" };
// //   const tdStyle = {
// //     border: "1px solid #d1d5db",
// //     padding: "2px",
// //     whiteSpace: "pre-line",
// //   };

// //   const tdRightStyle = { ...tdStyle, textAlign: "right" };
// //   const totalAmountStyle = {
// //     textAlign: "right",
// //     fontWeight: "600",
// //     fontSize: "16px",
// //     marginBottom: "24px",
// //   };
// //   const buttonStyle = {
// //     display: "block",
// //     margin: "20px auto 0",
// //     padding: "10px 20px",
// //     backgroundColor: "#2563eb",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   const buttonContainerStyle = {
// //     display: "flex",
// //     justifyContent: "center",
// //     gap: "10px", // space between buttons
// //     marginTop: "20px",
// //   };

// //   const confirm = {
// //     padding: "10px 20px",
// //     backgroundColor: "#2563eb",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   const cancel = {
// //     padding: "10px 20px",
// //     backgroundColor: "#eb370fff",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   return (
// //     <>
// //       <div ref={invoiceRef} style={containerStyle}>
// //         <ToastContainer
// //           position="top-right"
// //           autoClose={3000}
// //           hideProgressBar={false}
// //           newestOnTop={false}
// //           closeOnClick
// //           rtl={false}
// //           pauseOnFocusLoss
// //           draggable
// //           pauseOnHover
// //         />
// //         <img
// //           src={logoImg}
// //           alt="Company Logo"
// //           style={{ height: "60px", objectFit: "contain" }}
// //         />
// //         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

// //         {/* Two-column information block */}
// //         <div style={flexBetweenStyle}>
// //           {/* Left Column */}
// //           <div style={columnStyle}>
// //             <div>
// //               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
// //               {invoice.invoiceId || "130617"}
// //             </div>
// //             <div style={addressBlockStyle}>
// //               <span style={boldTextStyle}>Bill To: {"\n"}</span>
// //               {invoice.billTo || `Ashburn, VA 20147`}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Buyer: </span>
// //               {invoice.buyer || "Clore, Heather J"}
// //             </div>
// //             <div style={{ marginTop: "16px" }}>
// //               <span style={boldTextStyle}>Purchase Order ID: </span>
// //               {invoice.purchaseOrderId || "2181218010"} Release Number{" "}
// //               {invoice.releaseNumber || "3"} Change Order Number{" "}
// //               {invoice.changeOrderNumber || "0"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>PO Start and End Date: </span>
// //               {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
// //             </div>
// //           </div>

// //           {/* Right Column */}
// //           <div style={columnStyle}>
// //             <div>
// //               <span style={boldTextStyle}>Invoice Date: </span>
// //               {invoice.invoiceDate || "09/30/24"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>For the Period: </span>
// //               {invoice.period || "09/30/24 - 09/30/24"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Billing Currency: </span>
// //               {invoice.currency || "USD"}
// //             </div>
// //             <div style={addressBlockStyle}>
// //               <span style={boldTextStyle}>Remit To: {"\n"}</span>
// //               {invoice.remitTo || `Ashburn, VA 20147`}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Terms: </span>
// //               {invoice.terms || "PAYNPD"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Amount Due </span>
// //               {invoice.totalAmount.toFixed(2) || "4,307.21"}
// //             </div>
// //           </div>
// //         </div>

// //         <table style={tableStyle}>
// //           <thead>
// //             <tr>
// //               <th
// //                 style={{
// //                   border: "1px solid #d1d5db",
// //                   padding: "4px",
// //                   textAlign: "left",
// //                   backgroundColor: "#f3f4f6",
// //                   borderRight: "none",
// //                 }}
// //               >
// //                 PLC
// //               </th>
// //               <th style={thStyle}>Vendor Employee</th>
// //               <th style={thRightStyle}>Current Hrs/Qty</th>
// //               <th style={thRightStyle}>Rate</th>
// //               <th style={thRightStyle}>Additional Amount</th>
// //               <th style={thRightStyle}>Current Amount</th>
// //               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
// //               <th style={thRightStyle}>Cumulative Amount</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {Object.entries(groupedByPoLine).map(([poLine, items]) => (
// //               <React.Fragment key={poLine}>
// //                 <tr>
// //                   <td
// //                     colSpan={8}
// //                     style={{
// //                       fontWeight: 700,
// //                       fontSize: "15px",
// //                       paddinngBottom: "20px",
// //                     }}
// //                   >
// //                     PO LINE {poLine}
// //                   </td>{" "}
// //                 </tr>
// //                 {items.map((item, index) => (
// //                   <tr key={index}>
// //                     {/* <td style={tdStyle}>{item.plc || ""}</td>
// //                       <td style={tdStyle}>
// //                         {[item.vendor, item.employee].filter(Boolean).join("\n")}
// //                       </td> */}

// //                     <td
// //                       style={{
// //                         border: "1px solid #d1d5db",
// //                         padding: "4px",
// //                         fontFamily: "monospace",
// //                         fontSize: "12px",
// //                         whiteSpace: "normal",
// //                         wordBreak: "break-word",
// //                         verticalAlign: "top",
// //                       }}
// //                       colSpan={2} // span across the two previous separate columns
// //                     >
// //                       <div>{item.plc}</div>
// //                       <div
// //                         style={{
// //                           paddingLeft: "20px",
// //                           marginTop: "2px",
// //                         }}
// //                       >
// //                         <div>{item.employee}</div>
// //                         <div>{item.vendor}</div>
// //                       </div>
// //                     </td>
// //                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>$0.00</td>
// //                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
// //                   </tr>
// //                 ))}
// //               </React.Fragment>
// //             ))}
// //           </tbody>
// //         </table>
// //         <div style={totalAmountStyle}>
// //           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
// //         </div>
// //       </div>
// //       <div style={buttonContainerStyle}>
// //         {/* {isLoading && <div>Loading, please wait...</div>} */}

// //         <button
// //           onClick={handleDownloadPdf}
// //           style={confirm}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? "Downloading..." : "Download Invoice"}
// //         </button>

// //         <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
// //           Close
// //         </button>
// //       </div>
// //     </>
// //   );
// // };

// // export default InvoiceViewer;

// // import React, { useRef } from "react";
// // import logoImg from "../assets/image.png";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";

// // const InvoiceViewer = ({ data, setInvoiceModalVisible }) => {
// //   const invoiceRef = useRef();

// //   if (!data || !Array.isArray(data) || data.length === 0) {
// //     return <div>No invoice data available</div>;
// //   }

// //   const invoice = data[0];

// //   // Group line items by PO Line for rendering with headers
// //   const groupedByPoLine = invoice.lineItems.reduce((groups, item) => {
// //     const key = item.poLine || "Other";
// //     if (!groups[key]) groups[key] = [];
// //     groups[key].push(item);
// //     return groups;
// //   }, {});

// //   // const handleDownloadPdf = async () => {
// //   //   if (!invoiceRef.current) return;
// //   //   const input = invoiceRef.current;
// //   //   const canvas = await html2canvas(input, { scale: 2, useCORS: true });
// //   //   const imgData = canvas.toDataURL("image/png");
// //   //   const pdf = new jsPDF({
// //   //     orientation: "portrait",
// //   //     unit: "mm",
// //   //     format: "a4",
// //   //   });
// //   //   const pdfWidth = pdf.internal.pageSize.getWidth();
// //   //   const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
// //   //   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
// //   //   pdf.save("invoice.pdf");
// //   // };

// //   const handleDownloadPdf = async () => {
// //     if (!invoiceRef.current || !invoice) {
// //       console.warn("Invoice content or data is missing.");
// //       return;
// //     }
// //     const input = invoiceRef.current;
// //     const totalAmount = invoice.lineItems.reduce(
// //       (acc, line) => acc + line.amount,
// //       0
// //     );
// //     const invoicePayload = {
// //       invoiceNumber: invoice.invoiceId,
// //       invoiceDate: new Date(invoice.period).toISOString(),
// //       invoiceAmount: totalAmount,
// //       createdBy: "Test",
// //       updatedBy: "Test",
// //       invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
// //         // timesheetLineNo: line.poLine,
// //         timesheetLineNo: line.line_No,
// //         mappedHours: line.hours,
// //         mappedAmount: line.amount,
// //         createdBy: "Test",
// //         updatedBy: "Test",
// //       })),
// //     };

// //     try {
// //       const response = await fetch(
// //         "https://timesheet-subk.onrender.com/api/Invoices",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(invoicePayload),
// //         }
// //       );
// //       if (!response.ok)
// //         throw new Error(`Failed to create invoice: ${response.status}`);

// //       const canvas = await html2canvas(input, { scale: 2, useCORS: true });
// //       const imgData = canvas.toDataURL("image/png");
// //       const pdf = new jsPDF({
// //         orientation: "portrait",
// //         unit: "mm",
// //         format: "a4",
// //       });
// //       const pdfWidth = pdf.internal.pageSize.getWidth();
// //       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
// //       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
// //       pdf.save("invoice.pdf");
// //     } catch (error) {
// //       console.error("Error creating invoice or generating PDF:", error);
// //     }
// //   };

// //   const containerStyle = {
// //     maxWidth: "768px",
// //     margin: "auto",
// //     padding: "20px",
// //     border: "2px solid #d1d5db",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     color: "#1a202c",
// //     backgroundColor: "#fff",
// //   };
// //   const titleStyle = {
// //     textAlign: "center",
// //     marginBottom: "20px",
// //     fontSize: "18px",
// //     fontWeight: "600",
// //   };
// //   const infoStyle = {
// //     marginBottom: "20px",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     whiteSpace: "pre-line",
// //   };
// //   const boldTextStyle = { fontWeight: 700 };
// //   const flexBetweenStyle = {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "flex-start",
// //     fontFamily: "monospace",
// //     fontSize: "15px",
// //     whiteSpace: "pre-line",
// //   };
// //   const columnStyle = { width: "49%" };
// //   const addressBlockStyle = { marginBottom: "16px" };
// //   const tableStyle = {
// //     width: "100%",
// //     borderCollapse: "collapse",
// //     marginBottom: "20px",
// //     fontSize: "12px",
// //   };
// //   const thStyle = {
// //     border: "1px solid #d1d5db",
// //     padding: "8px",
// //     textAlign: "left",
// //     backgroundColor: "#f3f4f6",
// //   };
// //   const thRightStyle = { ...thStyle, textAlign: "right" };
// //   const tdStyle = { border: "1px solid #d1d5db", padding: "8px" };
// //   const tdRightStyle = { ...tdStyle, textAlign: "right" };
// //   const totalAmountStyle = {
// //     textAlign: "right",
// //     fontWeight: "600",
// //     fontSize: "16px",
// //     marginBottom: "24px",
// //   };
// //   const buttonStyle = {
// //     display: "block",
// //     margin: "20px auto 0",
// //     padding: "10px 20px",
// //     backgroundColor: "#2563eb",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   const buttonContainerStyle = {
// //     display: "flex",
// //     justifyContent: "center",
// //     gap: "10px", // space between buttons
// //     marginTop: "20px",
// //   };

// //   const confirm = {
// //     padding: "10px 20px",
// //     backgroundColor: "#2563eb",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   const cancel = {
// //     padding: "10px 20px",
// //     backgroundColor: "#eb370fff",
// //     color: "#fff",
// //     fontWeight: "500",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     border: "none",
// //   };

// //   return (
// //     <>
// //       <div ref={invoiceRef} style={containerStyle}>
// //         <img
// //           src={logoImg}
// //           alt="Company Logo"
// //           style={{ height: "60px", objectFit: "contain" }}
// //         />
// //         <h1 style={titleStyle}>SUMARIA SYSTEMS, LLC</h1>

// //         {/* Two-column information block */}
// //         <div style={flexBetweenStyle}>
// //           {/* Left Column */}
// //           <div style={columnStyle}>
// //             <div>
// //               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
// //               {invoice.invoiceId || "130617"}
// //             </div>
// //             <div style={addressBlockStyle}>
// //               <span style={boldTextStyle}>Bill To: {"\n"}</span>
// //               {invoice.billTo ||
// //                 `SSAI
// // 10210 GREENBELT RD
// // SUITE 600
// // LANHAM
// // MD
// // 20706`}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Buyer: </span>
// //               {invoice.buyer || "Clore, Heather J"}
// //             </div>
// //             <div style={{ marginTop: "16px" }}>
// //               <span style={boldTextStyle}>Purchase Order ID: </span>
// //               {invoice.purchaseOrderId || "2181218010"} Release Number{" "}
// //               {invoice.releaseNumber || "3"} Change Order Number{" "}
// //               {invoice.changeOrderNumber || "0"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>PO Start and End Date: </span>
// //               {invoice.poStartEndDate || "12/10/18 to 12/08/24"}
// //             </div>
// //           </div>

// //           {/* Right Column */}
// //           <div style={columnStyle}>
// //             <div>
// //               <span style={boldTextStyle}>Invoice Date: </span>
// //               {invoice.invoiceDate || "09/30/24"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>For the Period: </span>
// //               {invoice.period || "09/30/24 - 09/30/24"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Billing Currency: </span>
// //               {invoice.currency || "USD"}
// //             </div>
// //             <div style={addressBlockStyle}>
// //               <span style={boldTextStyle}>Remit To: {"\n"}</span>
// //               {invoice.remitTo ||
// //                 `Vertex Aerospace, LLC
// // PO Box 192
// // Grasonville
// // MD
// // 21638`}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Terms: </span>
// //               {invoice.terms || "PAYNPD"}
// //             </div>
// //             <div>
// //               <span style={boldTextStyle}>Amount Due </span>
// //               {invoice.amountDue || "4,307.21"}
// //             </div>
// //           </div>
// //         </div>

// //         <table style={tableStyle}>
// //           <thead>
// //             <tr>
// //               <th style={thStyle}>PLC</th>
// //               <th style={thStyle}>Vendor Employee</th>
// //               <th style={thRightStyle}>Current Hrs/Qty</th>
// //               <th style={thRightStyle}>Rate</th>
// //               <th style={thRightStyle}>Additional Amount</th>
// //               <th style={thRightStyle}>Current Amount</th>
// //               <th style={thRightStyle}>Cumulative Hrs/Qty</th>
// //               <th style={thRightStyle}>Cumulative Amount</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {Object.entries(groupedByPoLine).map(([poLine, items]) => (
// //               <React.Fragment key={poLine}>
// //                 <tr>
// //                   <td colSpan={8} style={{ fontWeight: 700, fontSize: "15px" }}>
// //                     {poLine}
// //                   </td>
// //                 </tr>
// //                 {items.map((item, index) => (
// //                   <tr key={index}>
// //                     <td style={tdStyle}>{item.plc || ""}</td>
// //                     <td style={tdStyle}>
// //                       {/* {item.vendor || item.employee || ""} */}
// //                       {[item.vendor, item.employee].filter(Boolean).join(" \n")}
// //                     </td>
// //                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>${item.rate.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>$0.00</td>
// //                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>{item.hours.toFixed(2)}</td>
// //                     <td style={tdRightStyle}>${item.amount.toFixed(2)}</td>
// //                   </tr>
// //                 ))}
// //               </React.Fragment>
// //             ))}
// //           </tbody>
// //         </table>
// //         <div style={totalAmountStyle}>
// //           Total Amount Due: ${invoice.totalAmount.toFixed(2)}
// //         </div>
// //       </div>
// //       <div style={buttonContainerStyle}>
// //         {/* <button onClick={handleDownloadPdf} style={confirm}>
// //           Confirm
// //         </button> */}
// //         <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
// //           Close
// //         </button>
// //       </div>
// //     </>
// //   );
// // };

// // export default InvoiceViewer;

// import React, { useRef, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logoImg from "../assets/image.png";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const InvoiceViewer = ({ data, setInvoiceModalVisible }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const invoiceRef = useRef();

//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return <div>Loading...</div>;
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

//   const handleDownloadPdf = async () => {
//     setIsLoading(true);
//     if (!invoiceRef.current || !invoice) {
//       console.warn("Invoice content or data is missing.");
//       return;
//     }
//     const input = invoiceRef.current;
//     const totalAmount = invoice.lineItems.reduce(
//       (acc, line) => acc + line.amount,
//       0
//     );
//     // const invoicePayload = {
//     //   invoiceNumber: invoice.invoiceId,
//     //   invoiceDate: new Date(invoice.period).toISOString(),
//     //   invoiceAmount: totalAmount,
//     //   createdBy: "Test",
//     //   updatedBy: "Test",
//     //   invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
//     //     // timesheetLineNo: line.poLine,
//     //     timesheetLineNo: line.line_No,
//     //     mappedHours: line.hours,
//     //     mappedAmount: line.amount,
//     //     createdBy: "Test",
//     //     updatedBy: "Test",
//     //   })),
//     // };

//     // try {
//     //   const response = await fetch(
//     //     "https://timesheet-subk.onrender.com/api/Invoices",
//     //     {
//     //       method: "POST",
//     //       headers: { "Content-Type": "application/json" },
//     //       body: JSON.stringify(invoicePayload),
//     //     }
//     //   );
//     //   if (!response.ok)
//     //     throw new Error(`Failed to create invoice: ${response.status}`);

//     const pdf = new jsPDF("p", "mm", "a4");
//     const padding = 10;
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL("image/png");

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     const usableWidth = pdfWidth - 2 * padding;
//     const usableHeight = pdfHeight - 2 * padding;

//     const imgProps = pdf.getImageProperties(imgData);
//     // const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

//     let heightLeft = pdfImgHeight;
//     // let position = 0;
//     let position = padding;

//     // pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//     // heightLeft -= pdfHeight;
//     pdf.addImage(imgData, "PNG", padding, position, usableWidth, pdfImgHeight);
//     heightLeft -= usableHeight;

//     // while (heightLeft > 0) {
//     //   position = heightLeft - pdfImgHeight;
//     //   pdf.addPage();
//     //   pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
//     //   heightLeft -= pdfHeight;
//     // }
//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = padding - heightLeft;
//       pdf.addImage(
//         imgData,
//         "PNG",
//         padding,
//         position,
//         usableWidth,
//         pdfImgHeight
//       );
//       heightLeft -= usableHeight;
//     }

//     pdf.save("invoice.pdf");
//     setIsLoading(false);
//     setInvoiceModalVisible(false);
//   };

//   // catch (error) {
//   //   console.error("Error creating invoice or generating PDF:", error);
//   // }

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
//     // whiteSpace: "pre-line",
//     whiteSpace: "nowrap",
//     paddingBottom: "20px",
//   };
//   const columnStyle = { width: "49%", whiteSpace: "pre-line" };
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
//           <div style={columnStyle}>
//             <div>
//               <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
//               {invoice.invoiceId || ""}
//             </div>
//             <div style={addressBlockStyle}>
//               <span style={boldTextStyle}>Bill To: {"\n"}</span>
//               {invoice.billTo || ``}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Buyer: </span>
//               {invoice.buyer || " "}
//             </div>
//             <div style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
//               <span style={boldTextStyle}>Purchase Order ID: </span>
//               {invoice.po_Number || ""} Release Number{" "}
//               {invoice.po_rlse_Number || ""}
//               <span style={boldTextStyle}> PO Start and End Date: </span>
//               {invoice.po_Start_End_Date || " "}
//             </div>
//           </div>

//           <div style={{ ...columnStyle, textAlign: "right" }}>
//             <div>
//               <span style={boldTextStyle}>Invoice Date: </span>
//               {invoice.period || " "}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Billing Currency: </span>
//               {invoice.currency || "USD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Terms: </span>
//               {invoice.terms || "PAYNPD"}
//             </div>
//             <div>
//               <span style={boldTextStyle}>Amount Due </span>$
//               {invoice.totalAmount?.toFixed(2) || "0.00"}
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
//                       paddingBottom: "10px",
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
//           {isLoading ? "Downloading..." : "Download Invoice"}
//         </button>

//         <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
//           Close
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

const InvoiceViewer = ({ data, setInvoiceModalVisible }) => {
  const [isLoading, setIsLoading] = useState(false);
  const invoiceRef = useRef();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>Loading...</div>;
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

  const handleDownloadPdf = async () => {
    setIsLoading(true);
    if (!invoiceRef.current || !invoice) {
      console.warn("Invoice content or data is missing.");
      return;
    }
    const input = invoiceRef.current;
    const totalAmount = invoice.lineItems.reduce(
      (acc, line) => acc + line.amount,
      0
    );
    // const invoicePayload = {
    //   invoiceNumber: invoice.invoiceId,
    //   invoiceDate: new Date(invoice.period).toISOString(),
    //   invoiceAmount: totalAmount,
    //   createdBy: "Test",
    //   updatedBy: "Test",
    //   invoiceTimesheetLines: invoice.lineItems.map((line, idx) => ({
    //     // timesheetLineNo: line.poLine,
    //     timesheetLineNo: line.line_No,
    //     mappedHours: line.hours,
    //     mappedAmount: line.amount,
    //     createdBy: "Test",
    //     updatedBy: "Test",
    //   })),
    // };

    // try {
    //   const response = await fetch(
    //     "https://timesheet-subk.onrender.com/api/Invoices",
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(invoicePayload),
    //     }
    //   );
    //   if (!response.ok)
    //     throw new Error(`Failed to create invoice: ${response.status}`);

    const pdf = new jsPDF("p", "mm", "a4");
    const padding = 10;
    const canvas = await html2canvas(input, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const usableWidth = pdfWidth - 2 * padding;
    const usableHeight = pdfHeight - 2 * padding;

    const imgProps = pdf.getImageProperties(imgData);
    // const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const pdfImgHeight = (imgProps.height * usableWidth) / imgProps.width;

    let heightLeft = pdfImgHeight;
    // let position = 0;
    let position = padding;

    // pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
    // heightLeft -= pdfHeight;
    pdf.addImage(imgData, "PNG", padding, position, usableWidth, pdfImgHeight);
    heightLeft -= usableHeight;

    // while (heightLeft > 0) {
    //   position = heightLeft - pdfImgHeight;
    //   pdf.addPage();
    //   pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfImgHeight);
    //   heightLeft -= pdfHeight;
    // }
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

    pdf.save("invoice.pdf");
    setIsLoading(false);
    setInvoiceModalVisible(false);
  };

  // catch (error) {
  //   console.error("Error creating invoice or generating PDF:", error);
  // }

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
    whiteSpace: "nowrap",
    paddingBottom: "20px",
  };
  const columnStyle = { width: "49%", whiteSpace: "pre-line" };
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

  const enhancedTitleStyle = {
    color: "#1e40af",
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "0.05em",
    textAlign: "center",
    textShadow: "0 2px 4px rgba(30, 64, 175, 0.1)",
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

        <h1 style={enhancedTitleStyle} className="font-bold">
          REVOLVE, LLC
        </h1>
        {/* <h1 style={titleStyle} className="font-bold">REVOLVE</h1> */}

        {/* Two-column information block */}

        <div style={flexBetweenStyle}>
          <div style={columnStyle}>
            <div>
              <span style={boldTextStyle}>Subcontractor Invoice Number: </span>
              {invoice.invoiceId || ""}
            </div>
            <div style={addressBlockStyle}>
              <span style={boldTextStyle}>Bill To: {"\n"}</span>
              {invoice.billTo || ``}
            </div>
            <div>
              <span style={boldTextStyle}>Buyer: </span>
              {invoice.buyer || " "}
            </div>
            <div style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
              <span style={boldTextStyle}>Purchase Order ID: </span>
              {invoice.po_Number || ""} Release Number{" "}
              {invoice.po_rlse_Number || ""}
            </div>
            <div style={{ marginTop: "16px", whiteSpace: "nowrap" }}>
              <span style={boldTextStyle}> PO Start and End Date: </span>
              {invoice.po_Start_End_Date || " "}
            </div>
          </div>

          <div style={{ ...columnStyle, textAlign: "right" }}>
            <div>
              <span style={boldTextStyle}>Invoice Date: </span>
              {invoice.period || " "}
            </div>
            <div>
              <span style={boldTextStyle}>Billing Currency: </span>
              {invoice.currency || "USD"}
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
          {isLoading ? "Downloading..." : "Download Invoice"}
        </button>

        <button onClick={() => setInvoiceModalVisible(false)} style={cancel}>
          Close
        </button>
      </div>
    </>
  );
};

export default InvoiceViewer;

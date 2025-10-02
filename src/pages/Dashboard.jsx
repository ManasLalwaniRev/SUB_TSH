// // import { useLocation } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           <UserTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Portal
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           // Show PasswordManagement for Users, UserTable for Admins
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Portal
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/users" ? (
// //           // Show PasswordManagement for Users, UserTable for Admins
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //                   Timesheet Approval Workflow
// //                 </h1>
// //                 <p className="text-gray-500 text-sm">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";
// // import Approval from "../components/Approval";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/approval" ? (
// //           <Approval />
// //         ) : pathname === "/dashboard/users" ? (
// //           // Show PasswordManagement for Users, UserTable for Admins
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           // <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //           //   <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //           //     <div className="text-center">
// //           //       <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
// //           //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //           //         </svg>
// //           //       </div>
// //           //       <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
// //           //         Subcontractor Timesheet Workflow
// //           //       </h1>
// //           //       <p className="text-gray-500 text-sm">
// //           //         Choose an option from the General menu
// //           //       </p>
// //           //     </div>
// //           //   </div>
// //           // </div>
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //   <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //     <div className="text-center">
// //       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
// //         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //         </svg>
// //       </div>
// //       <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
// //         Subcontractor Timesheet
// //       </h1>
// //       <p className="text-gray-500 text-sm leading-relaxed">
// //         Choose an option from the General menu
// //       </p>
// //     </div>
// //   </div>
// // </div>

// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";
// // import Approval from "../components/Approval";
// // import WorkAssignment from "../components/WorkAssignment"; // Add this import

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/approval" ? (
// //           <Approval />
// //         ) : pathname === "/dashboard/users" ? (
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/work-assignment" ? ( // Add this route
// //           <WorkAssignment />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
// //                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
// //                   Subcontractor Timesheet
// //                 </h1>
// //                 <p className="text-gray-500 text-sm leading-relaxed">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";
// // import Approval from "../components/Approval";
// // import WorkAssignment from "../components/WorkAssignment";
// // import Revision from "../components/Revision";
// // import PrintInvoice from "../components/PrintInvoice";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/approval" ? (
// //           <Approval />
// //         ) : pathname === "/dashboard/users" ? (
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/work-assignment" ? (
// //           <WorkAssignment />
// //         ) : pathname === "/dashboard/revision" ? (
// //           <Revision />
// //         ) : pathname === "/dashboard/print-invoice" ? (
// //           <PrintInvoice />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
// //                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
// //                   Subcontractor Timesheet
// //                 </h1>
// //                 <p className="text-gray-500 text-sm leading-relaxed">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";
// // import Approval from "../components/Approval";
// // import WorkAssignment from "../components/WorkAssignment";
// // import Revision from "../components/Revision";
// // import PrintInvoice from "../components/PrintInvoice";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       {/* Remove the flex-1 and margin for Print Invoice to handle its own layout */}
// //       {pathname === "/dashboard/print-invoice" ? (
// //         <PrintInvoice />
// //       ) : (
// //         <div className="flex-1 flex flex-col h-screen min-h-0">
// //           {pathname === "/dashboard/timesheet" ? (
// //             <MainTable />
// //           ) : pathname === "/dashboard/approval" ? (
// //             <Approval />
// //           ) : pathname === "/dashboard/users" ? (
// //             isUser ? <PasswordManagement /> : <UserTable />
// //           ) : pathname === "/dashboard/export" ? (
// //             <ExportTable />
// //           ) : pathname === "/dashboard/work-assignment" ? (
// //             <WorkAssignment />
// //           ) : pathname === "/dashboard/revision" ? (
// //             <Revision />
// //           ) : pathname === "/dashboard/groups/manage-groups" ? (
// //             <GroupsTable />
// //           ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //             <WorkFlow />
// //           ) : (
// //             <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //               <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //                 <div className="text-center">
// //                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
// //                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                     </svg>
// //                   </div>
// //                   <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
// //                     Subcontractor Timesheet
// //                   </h1>
// //                   <p className="text-gray-500 text-sm leading-relaxed">
// //                     Choose an option from the General menu
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // DEPLOYED //

// // import { useLocation } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Sidebar from "../components/Sidebar";
// // import MainTable from "../components/MainTable";
// // import UserTable from "../components/UserTable";
// // import GroupsTable from "../components/GroupsTable";
// // import WorkFlow from "../components/WorkFlow";
// // import PasswordManagement from "../components/PasswordManagement";
// // import ExportTable from "../components/ExportTable";
// // import Approval from "../components/Approval";
// // import WorkAssignment from "../components/WorkAssignment";
// // import InvoiceExport from "../components/InvoiceExport";

// // export default function Dashboard() {
// //   const { pathname } = useLocation();
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const userInfo = localStorage.getItem('currentUser');
// //     if (userInfo) {
// //       try {
// //         const parsedUser = JSON.parse(userInfo);
// //         setCurrentUser(parsedUser);
// //       } catch (error) {
// //         console.error('Error parsing user info:', error);
// //       }
// //     }
// //   }, []);

// //   const isUser = currentUser?.role === "User";

// //   return (
// //     <div className="flex h-screen bg-white overflow-hidden">
// //       <Sidebar />
// //       <div className="flex-1 flex flex-col h-screen min-h-0">
// //         {pathname === "/dashboard/timesheet" ? (
// //           <MainTable />
// //         ) : pathname === "/dashboard/approval" ? (
// //           <Approval />
// //         ) : pathname === "/dashboard/invoice-export" ? (
// //           <InvoiceExport />
// //         ) : pathname === "/dashboard/users" ? (
// //           isUser ? <PasswordManagement /> : <UserTable />
// //         ) : pathname === "/dashboard/export" ? (
// //           <ExportTable />
// //         ) : pathname === "/dashboard/work-assignment" ? (
// //           <WorkAssignment />
// //         ) : pathname === "/dashboard/groups/manage-groups" ? (
// //           <GroupsTable />
// //         ) : pathname === "/dashboard/groups/manage-workflow" ? (
// //           <WorkFlow />
// //         ) : (
// //           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
// //             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
// //               <div className="text-center">
// //                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
// //                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// //                   </svg>
// //                 </div>
// //                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
// //                   Subcontractor Timesheet
// //                 </h1>
// //                 <p className="text-gray-500 text-sm leading-relaxed">
// //                   Choose an option from the General menu
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // DEPLOYED ///
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment";
// import InvoiceExport from "../components/InvoiceExport";
// import DashboardGraphs from "../components/DashboardGraphs";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     // <div className="flex h-screen bg-white overflow-hidden">
//     <div
//       className={`flex h-screen bg-white overflow-hidden ${
//         sidebarOpen ? "pl-44" : "pl-0"
//       }`}
//     >
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col h-screen min-h-0 ">
//         {pathname === "/dashboard" ? (
//           <DashboardGraphs />
//         ) : pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/invoice-export" ? (
//           <InvoiceExport />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? (
//             <PasswordManagement />
//           ) : (
//             <UserTable />
//           )
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/work-assignment" ? (
//           <WorkAssignment />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                   Subcontractor Timesheet
//                 </h1>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";

// export default function Dashboard() {
//   const { pathname } = useLocation();

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Portal
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           // Show PasswordManagement for Users, UserTable for Admins
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Portal
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/users" ? (
//           // Show PasswordManagement for Users, UserTable for Admins
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//                   Timesheet Approval Workflow
//                 </h1>
//                 <p className="text-gray-500 text-sm">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/users" ? (
//           // Show PasswordManagement for Users, UserTable for Admins
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           // <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//           //   <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-8 py-6 transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//           //     <div className="text-center">
//           //       <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-4 shadow-md">
//           //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//           //         </svg>
//           //       </div>
//           //       <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
//           //         Subcontractor Timesheet Workflow
//           //       </h1>
//           //       <p className="text-gray-500 text-sm">
//           //         Choose an option from the General menu
//           //       </p>
//           //     </div>
//           //   </div>
//           // </div>
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//   <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//     <div className="text-center">
//       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//         <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       </div>
//       <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//         Subcontractor Timesheet
//       </h1>
//       <p className="text-gray-500 text-sm leading-relaxed">
//         Choose an option from the General menu
//       </p>
//     </div>
//   </div>
// </div>

//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment"; // Add this import

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/work-assignment" ? ( // Add this route
//           <WorkAssignment />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                   Subcontractor Timesheet
//                 </h1>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment";
// import Revision from "../components/Revision";
// import PrintInvoice from "../components/PrintInvoice";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/work-assignment" ? (
//           <WorkAssignment />
//         ) : pathname === "/dashboard/revision" ? (
//           <Revision />
//         ) : pathname === "/dashboard/print-invoice" ? (
//           <PrintInvoice />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                   Subcontractor Timesheet
//                 </h1>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment";
// import Revision from "../components/Revision";
// import PrintInvoice from "../components/PrintInvoice";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       {/* Remove the flex-1 and margin for Print Invoice to handle its own layout */}
//       {pathname === "/dashboard/print-invoice" ? (
//         <PrintInvoice />
//       ) : (
//         <div className="flex-1 flex flex-col h-screen min-h-0">
//           {pathname === "/dashboard/timesheet" ? (
//             <MainTable />
//           ) : pathname === "/dashboard/approval" ? (
//             <Approval />
//           ) : pathname === "/dashboard/users" ? (
//             isUser ? <PasswordManagement /> : <UserTable />
//           ) : pathname === "/dashboard/export" ? (
//             <ExportTable />
//           ) : pathname === "/dashboard/work-assignment" ? (
//             <WorkAssignment />
//           ) : pathname === "/dashboard/revision" ? (
//             <Revision />
//           ) : pathname === "/dashboard/groups/manage-groups" ? (
//             <GroupsTable />
//           ) : pathname === "/dashboard/groups/manage-workflow" ? (
//             <WorkFlow />
//           ) : (
//             <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//               <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//                 <div className="text-center">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                     </svg>
//                   </div>
//                   <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                     Subcontractor Timesheet
//                   </h1>
//                   <p className="text-gray-500 text-sm leading-relaxed">
//                     Choose an option from the General menu
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// DEPLOYED //

// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment";
// import InvoiceExport from "../components/InvoiceExport";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('currentUser');
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user info:', error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 flex flex-col h-screen min-h-0">
//         {pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/invoice-export" ? (
//           <InvoiceExport />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? <PasswordManagement /> : <UserTable />
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/work-assignment" ? (
//           <WorkAssignment />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                   Subcontractor Timesheet
//                 </h1>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// DEPLOYED ///
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Sidebar from "../components/Sidebar";
// import MainTable from "../components/MainTable";
// import UserTable from "../components/UserTable";
// import GroupsTable from "../components/GroupsTable";
// import WorkFlow from "../components/WorkFlow";
// import PasswordManagement from "../components/PasswordManagement";
// import ExportTable from "../components/ExportTable";
// import Approval from "../components/Approval";
// import WorkAssignment from "../components/WorkAssignment";
// import InvoiceExport from "../components/InvoiceExport";
// import DashboardGraphs from "../components/DashboardGraphs";

// export default function Dashboard() {
//   const { pathname } = useLocation();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("currentUser");
//     if (userInfo) {
//       try {
//         const parsedUser = JSON.parse(userInfo);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//       }
//     }
//   }, []);

//   const isUser = currentUser?.role === "User";

//   return (
//     // <div className="flex h-screen bg-white overflow-hidden">
//     <div
//       // className={`flex h-screen bg-white overflow-hidden ${
//       //   sidebarOpen ? "pl-44" : "pl-0"
//       // }`}
//       className="flex h-screen bg-white overflow-hidden"
//     >
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//       <div className="flex-1 flex flex-col h-screen min-h-0 ">
//         {pathname === "/dashboard" ? (
//           <DashboardGraphs />
//         ) : pathname === "/dashboard/timesheet" ? (
//           <MainTable />
//         ) : pathname === "/dashboard/approval" ? (
//           <Approval />
//         ) : pathname === "/dashboard/invoice-export" ? (
//           <InvoiceExport />
//         ) : pathname === "/dashboard/users" ? (
//           isUser ? (
//             <PasswordManagement />
//           ) : (
//             <UserTable />
//           )
//         ) : pathname === "/dashboard/export" ? (
//           <ExportTable />
//         ) : pathname === "/dashboard/work-assignment" ? (
//           <WorkAssignment />
//         ) : pathname === "/dashboard/groups/manage-groups" ? (
//           <GroupsTable />
//         ) : pathname === "/dashboard/groups/manage-workflow" ? (
//           <WorkFlow />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
//               <div className="text-center">
//                 <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
//                   <svg
//                     className="w-8 h-8 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                     ></path>
//                   </svg>
//                 </div>
//                 <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
//                   Subcontractor Timesheet
//                 </h1>
//                 <p className="text-gray-500 text-sm leading-relaxed">
//                   Choose an option from the General menu
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MainTable from "../components/MainTable";
import UserTable from "../components/UserTable";
import GroupsTable from "../components/GroupsTable";
import WorkFlow from "../components/WorkFlow";
import PasswordManagement from "../components/PasswordManagement";
import ExportTable from "../components/ExportTable";
import Approval from "../components/Approval";
import WorkAssignment from "../components/WorkAssignment";
import InvoiceExport from "../components/InvoiceExport";
import DashboardGraphs from "../components/DashboardGraphs";

export default function Dashboard() {
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
    }
  }, []);

  const isUser = currentUser?.role === "User";

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area with dynamic left margin */}
      <div
        className={`flex-1 flex flex-col h-screen min-h-0 transition-all duration-300 ${
          sidebarOpen ? "ml-48" : "ml-20"
        }`}
      >
        {pathname === "/dashboard" ? (
          <DashboardGraphs />
        ) : pathname === "/dashboard/timesheet" ? (
          <MainTable />
        ) : pathname === "/dashboard/approval" ? (
          <Approval />
        ) : pathname === "/dashboard/invoice-export" ? (
          <InvoiceExport />
        ) : pathname === "/dashboard/users" ? (
          isUser ? (
            <PasswordManagement />
          ) : (
            <UserTable />
          )
        ) : pathname === "/dashboard/export" ? (
          <ExportTable />
        ) : pathname === "/dashboard/work-assignment" ? (
          <WorkAssignment />
        ) : pathname === "/dashboard/groups/manage-groups" ? (
          <GroupsTable />
        ) : pathname === "/dashboard/groups/manage-workflow" ? (
          <WorkFlow />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 px-6 py-12 w-96 max-w-md transform hover:shadow-xl transition-all duration-300 animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg mb-6 shadow-md">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 leading-tight">
                  Subcontractor Timesheet
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Choose an option from the General menu
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

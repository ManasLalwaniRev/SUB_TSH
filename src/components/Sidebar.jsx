// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet")
//   );
//   const [planningOpen, setPlanningOpen] = useState(
//     pathname.includes("/dashboard/timesheet")
//   );
//   const [configurationOpen, setConfigurationOpen] = useState(false);
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(pathname.includes("/dashboard/timesheet"));
//     setPlanningOpen(pathname.includes("/dashboard/timesheet"));
//     setConfigurationOpen(false); // Always closed initially
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-48 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg transform transition-transform duration-300 md:translate-x-0 md:static md:w-48 z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>

//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//             onClick={() => setPlanningOpen(!planningOpen)}
//           >
//             <span className="text-sm">Planning</span>
//             {planningOpen ? (
//               <ChevronDown className="w-3 h-3" />
//             ) : (
//               <ChevronRight className="w-3 h-3" />
//             )}
//           </div>

//           {planningOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/timesheet"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded transition ease-in-out duration-200 ${
//                   selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleLinkClick("/dashboard/timesheet");
//                 }}
//               >
//                 Timesheet
//               </Link>
//             </div>
//           )}

//           {/* <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md transition ease-in-out duration-200"
//             onClick={() => setConfigurationOpen(!configurationOpen)}
//           >
//             <span className="text-sm">Configuration</span>
//             {configurationOpen ? (
//               <ChevronDown className="w-3 h-3" />
//             ) : (
//               <ChevronRight className="w-3 h-3" />
//             )}
//           </div> */}

//           {configurationOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               {/* Empty as per your request */}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>
//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <Link
//             to="/dashboard/timesheet"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//           >Timesheet</Link>
//           <Link
//             to="/dashboard/users"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//           >Users</Link>
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//             onClick={() => setGroupsOpen(!groupsOpen)}
//           >
//             <span className="text-sm">Groups</span>
//             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
//           </div>
//           {groupsOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/groups/manage-groups"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//               >Manage Groups</Link>
//               <Link
//                 to="/dashboard/groups/manage-workflow"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//               >Manage Workflow</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-white border-r border-gray-200 shadow-lg z-40 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b border-gray-100">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
//             <Clock className="w-3 h-3 text-white" />
//           </div>
//           <div>
//             <h2 className="text-sm font-semibold text-gray-900">TimeTracker</h2>
//             <p className="text-xs text-gray-500">Dashboard</p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-all duration-200 group"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
//             <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium" 
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-200 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium" 
//                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>Users</span>
//             </Link>

//             {/* Groups Section */}
//             <div className="space-y-1">
//               <div
//                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-200 group ${
//                   pathname.includes("/dashboard/groups") ? "bg-gray-50" : "hover:bg-gray-50"
//                 }`}
//                 onClick={() => setGroupsOpen(!groupsOpen)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Layers className="w-3 h-3 text-gray-600 group-hover:text-blue-600" />
//                   <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">Groups</span>
//                 </div>
//                 <ChevronRight className={`w-3 h-3 text-gray-400 transform transition-transform duration-200 ${groupsOpen ? 'rotate-90' : ''}`} />
//               </div>

//               {/* Groups Submenu */}
//               {groupsOpen && (
//                 <div className="ml-5 space-y-1 animate-fade-in">
//                   <Link
//                     to="/dashboard/groups/manage-groups"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
//                       selectedPage === "/dashboard/groups/manage-groups" 
//                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium" 
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                   >
//                     Manage Groups
//                   </Link>
//                   <Link
//                     to="/dashboard/groups/manage-workflow"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-200 ${
//                       selectedPage === "/dashboard/groups/manage-workflow" 
//                         ? "bg-blue-50 text-blue-700 border-l-3 border-blue-600 font-medium" 
//                         : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                   >
//                     Manage Workflow
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Plus } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4 shadow-lg z-40">
//       <div
//         className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//         onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//       >
//         <span className="text-sm">General Menu</span>
//         <Plus className="w-4 h-4" />
//       </div>
//       {generalMenuOpen && (
//         <div className="ml-1 mt-2 space-y-1">
//           <Link
//             to="/dashboard/timesheet"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/timesheet" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//           >Timesheet</Link>
//           <Link
//             to="/dashboard/users"
//             className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//               selectedPage === "/dashboard/users" ? "bg-gray-800 underline" : ""
//             }`}
//             onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//           >Users</Link>
//           <div
//             className="flex justify-between items-center cursor-pointer hover:bg-gray-800 px-2 py-1 rounded-md"
//             onClick={() => setGroupsOpen(!groupsOpen)}
//           >
//             <span className="text-sm">Groups</span>
//             {groupsOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
//           </div>
//           {groupsOpen && (
//             <div className="ml-3 mt-1 pl-1 border-l border-gray-600 space-y-1">
//               <Link
//                 to="/dashboard/groups/manage-groups"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-groups" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//               >Manage Groups</Link>
//               <Link
//                 to="/dashboard/groups/manage-workflow"
//                 className={`block text-xs text-gray-200 hover:text-white hover:bg-gray-800 px-2 py-1 rounded ${
//                   selectedPage === "/dashboard/groups/manage-workflow" ? "bg-gray-800 underline" : ""
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//               >Manage Workflow</Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Header */}
//       {/* <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-indigo-700">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-md">
//             <Clock className="w-3 h-3 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-sm font-bold text-white tracking-wide">TimeTracker</h2>
//             <p className="text-xs text-blue-100 font-medium">Dashboard</p>
//           </div>
//         </div>
//       </div> */}

//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>Users</span>
//             </Link>

//             {/* Groups Section */}
//             <div className="space-y-1">
//               <div
//                 className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                   pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                 }`}
//                 onClick={() => setGroupsOpen(!groupsOpen)}
//               >
//                 <div className="flex items-center space-x-2">
//                   <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                   <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                 </div>
//                 <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//               </div>

//               {/* Groups Submenu */}
//               {groupsOpen && (
//                 <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                   <Link
//                     to="/dashboard/groups/manage-groups"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                       selectedPage === "/dashboard/groups/manage-groups" 
//                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                   >
//                     Manage Groups
//                   </Link>
//                   <Link
//                     to="/dashboard/groups/manage-workflow"
//                     className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                       selectedPage === "/dashboard/groups/manage-workflow" 
//                         ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                         : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                     }`}
//                     onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                   >
//                     Manage Workflow
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password Management" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers, Download } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups") ||
//     pathname.includes("/dashboard/export")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups") ||
//       pathname.includes("/dashboard/export")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Export - Only show for Admins */}
//             {isAdmin && (
//               <Link
//                 to="/dashboard/export"
//                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                   selectedPage === "/dashboard/export" 
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/export"); }}
//               >
//                 <Download className="w-3 h-3" />
//                 <span>Export</span>
//               </Link>
//             )}

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers, Download } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups") ||
//     pathname.includes("/dashboard/export")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups") ||
//       pathname.includes("/dashboard/export")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Export - Only show for Admins */}
//             {isAdmin && (
//               <Link
//                 to="/dashboard/export"
//                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                   selectedPage === "/dashboard/export" 
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/export"); }}
//               >
//                 <Download className="w-3 h-3" />
//                 <span>Export</span>
//               </Link>
//             )}

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// Deployed //

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown, ChevronRight, Menu, Clock, Users, Layers, Download, CheckSquare } from "lucide-react";

// const Sidebar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const [currentUser, setCurrentUser] = useState(null);

//   const [generalMenuOpen, setGeneralMenuOpen] = useState(
//     pathname.includes("/dashboard/timesheet") ||
//     pathname.includes("/dashboard/users") ||
//     pathname.includes("/dashboard/groups") ||
//     pathname.includes("/dashboard/export") ||
//     pathname.includes("/dashboard/approval")
//   );
//   const [groupsOpen, setGroupsOpen] = useState(
//     pathname.includes("/dashboard/groups")
//   );
//   const [selectedPage, setSelectedPage] = useState(pathname);

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

//   useEffect(() => {
//     setSelectedPage(pathname);
//     setGeneralMenuOpen(
//       pathname.includes("/dashboard/timesheet") ||
//       pathname.includes("/dashboard/users") ||
//       pathname.includes("/dashboard/groups") ||
//       pathname.includes("/dashboard/export") ||
//       pathname.includes("/dashboard/approval")
//     );
//     setGroupsOpen(pathname.includes("/dashboard/groups"));
//   }, [pathname]);

//   const handleLinkClick = (pagePath) => {
//     if (selectedPage === pagePath) {
//       setSelectedPage(null);
//       navigate("/dashboard");
//     } else {
//       setSelectedPage(pagePath);
//       navigate(pagePath);
//     }
//   };

//   const isUser = currentUser?.role === "User";
//   const isAdmin = currentUser?.role === "Admin";

//   return (
//     <div className="fixed inset-y-0 left-0 w-44 bg-gradient-to-b from-slate-800 via-slate-900 to-gray-900 text-white shadow-2xl z-40 flex flex-col border-r border-slate-700">
//       {/* Navigation */}
//       <div className="flex-1 p-3 space-y-1">
//         {/* General Menu Header */}
//         <div
//           className="flex justify-between items-center cursor-pointer hover:bg-slate-700 px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600"
//           onClick={() => setGeneralMenuOpen(!generalMenuOpen)}
//         >
//           <div className="flex items-center space-x-2">
//             <Menu className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//             <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">General</span>
//           </div>
//           <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${generalMenuOpen ? 'rotate-90' : ''}`} />
//         </div>

//         {/* General Menu Items */}
//         {generalMenuOpen && (
//           <div className="ml-1 space-y-1 animate-fade-in">
//             {/* Timesheet */}
//             <Link
//               to="/dashboard/timesheet"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/timesheet" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/timesheet"); }}
//             >
//               <Clock className="w-3 h-3" />
//               <span>Timesheet</span>
//             </Link>

//             {/* Approval - Only show for Admins */}
//             {isAdmin && (
//               <Link
//                 to="/dashboard/approval"
//                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                   selectedPage === "/dashboard/approval" 
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/approval"); }}
//               >
//                 <CheckSquare className="w-3 h-3" />
//                 <span>Approval</span>
//               </Link>
//             )}

//             {/* Export - Only show for Admins */}
//             {isAdmin && (
//               <Link
//                 to="/dashboard/export"
//                 className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                   selectedPage === "/dashboard/export" 
//                     ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                     : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                 }`}
//                 onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/export"); }}
//               >
//                 <Download className="w-3 h-3" />
//                 <span>Export</span>
//               </Link>
//             )}

//             {/* Users - Show different label based on role */}
//             <Link
//               to="/dashboard/users"
//               className={`flex items-center space-x-2 text-xs px-2 py-2 rounded-lg transition-all duration-300 group ${
//                 selectedPage === "/dashboard/users" 
//                   ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                   : "text-gray-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//               }`}
//               onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/users"); }}
//             >
//               <Users className="w-3 h-3" />
//               <span>{isUser ? "Password" : "Users"}</span>
//             </Link>

//             {/* Groups Section - Only show for Admins */}
//             {isAdmin && (
//               <div className="space-y-1">
//                 <div
//                   className={`flex justify-between items-center cursor-pointer px-2 py-2 rounded-lg transition-all duration-300 group border border-transparent hover:border-slate-600 ${
//                     pathname.includes("/dashboard/groups") ? "bg-slate-700" : "hover:bg-slate-700"
//                   }`}
//                   onClick={() => setGroupsOpen(!groupsOpen)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <Layers className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors" />
//                     <span className="text-xs font-semibold text-gray-200 group-hover:text-white transition-colors">Groups</span>
//                   </div>
//                   <ChevronRight className={`w-3 h-3 text-gray-400 group-hover:text-blue-400 transform transition-all duration-300 ${groupsOpen ? 'rotate-90' : ''}`} />
//                 </div>

//                 {/* Groups Submenu */}
//                 {groupsOpen && (
//                   <div className="ml-5 space-y-1 animate-fade-in border-l-2 border-slate-600 pl-2">
//                     <Link
//                       to="/dashboard/groups/manage-groups"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-groups" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-groups"); }}
//                     >
//                       Manage Groups
//                     </Link>
//                     <Link
//                       to="/dashboard/groups/manage-workflow"
//                       className={`block text-xs px-2 py-1.5 rounded-lg transition-all duration-300 ${
//                         selectedPage === "/dashboard/groups/manage-workflow" 
//                           ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md border border-blue-500 font-semibold" 
//                           : "text-gray-400 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-600"
//                       }`}
//                       onClick={e => { e.preventDefault(); handleLinkClick("/dashboard/groups/manage-workflow"); }}
//                     >
//                       Manage Workflow
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// DEPLOYED //

// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, Clock, Users, Download, CheckSquare, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";

// // Individual Sidebar Item Component for cleaner code
// const SidebarItem = ({ icon, text, to, selectedPage, handleLinkClick, isCollapsed }) => (
//     <Link
//         to={to}
//         onClick={(e) => { e.preventDefault(); handleLinkClick(to); }}
//         className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 group cursor-pointer ${
//             selectedPage === to
//                 ? "bg-green-600 text-white font-semibold shadow"
//                 : "text-green-800 hover:bg-green-100"
//         }`}
//     >
//         {icon}
//         <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
//             {text}
//         </span>
//     </Link>
// );

// export default function Sidebar() {
//     const { pathname } = useLocation();
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useState(null);
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     useEffect(() => {
//         const userInfo = localStorage.getItem('currentUser');
//         if (userInfo) {
//             try {
//                 setCurrentUser(JSON.parse(userInfo));
//             } catch (error) {
//                 console.error('Error parsing user info:', error);
//             }
//         }
//     }, []);
    
//     const handleLinkClick = (pagePath) => {
//         navigate(pagePath);
//     };

//     const isAdmin = currentUser?.role === "Admin";
//     const isUser = currentUser?.role === "User";

//     return (
//         <div className={`fixed inset-y-0 left-0 bg-green-50 text-gray-800 shadow-lg z-40 flex flex-col border-r border-green-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-48'}`}>
//             <div className="flex flex-col flex-1 p-3 overflow-y-auto">
//                 <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : 'justify-start pl-3'}`}>
//                     <Menu className="h-6 w-6 text-green-800"/>
//                     <span className={`ml-3 text-lg font-bold text-green-900 transition-all duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
//                         General
//                     </span>
//                 </div>
                
//                 <div className="flex-grow">
//                     <SidebarItem icon={<Clock className="h-5 w-5" />} text="Timesheet" to="/dashboard/timesheet" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                     {isAdmin && <SidebarItem icon={<CheckSquare className="h-5 w-5" />} text="Approval" to="/dashboard/approval" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />}
//                     {isAdmin && <SidebarItem icon={<Download className="h-5 w-5" />} text="Export" to="/dashboard/export" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />}
//                     <SidebarItem icon={<Users className="h-5 w-5" />} text={isUser ? "Password" : "Users"} to="/dashboard/users" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    
//                     {/* --- UPDATED: Groups are now top-level items --- */}
//                     {isAdmin && (
//                         <>
//                             <SidebarItem icon={<Users className="h-5 w-5" />} text="Manage Groups" to="/dashboard/groups/manage-groups" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                             <SidebarItem icon={<GitBranch className="h-5 w-5" />} text="Manage Workflow" to="/dashboard/groups/manage-workflow" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                         </>
//                     )}
//                 </div>

//                 <div className="pt-2 mt-2 border-t border-green-200">
//                     <button 
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                         className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
//                     >
//                         {isCollapsed ? <ChevronRight className="h-5 w-5 text-green-700 group-hover:text-green-900" /> : <ChevronLeft className="h-5 w-5 text-green-700 group-hover:text-green-900" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };


// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Menu, Clock, Users, Layers, Download, CheckSquare, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";

// const SidebarItem = ({ icon, text, to, selectedPage, handleLinkClick, isCollapsed }) => (
//     <Link
//         to={to}
//         onClick={(e) => { e.preventDefault(); handleLinkClick(to); }}
//         className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 group cursor-pointer ${
//             selectedPage === to
//                 ? "bg-green-600 text-white font-semibold shadow"
//                 : "text-green-800 hover:bg-green-100"
//         }`}
//     >
//         {icon}
//         <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
//             {text}
//         </span>
//     </Link>
// );

// export default function Sidebar() {
//     const { pathname } = useLocation();
//     const navigate = useNavigate();
//     const [currentUser, setCurrentUser] = useState(null);
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     useEffect(() => {
//         const userInfo = localStorage.getItem('currentUser');
//         if (userInfo) {
//             try {
//                 // Ensure role is lowercase for consistent checking
//                 const user = JSON.parse(userInfo);
//                 user.role = user.role?.toLowerCase();
//                 setCurrentUser(user);
//             } catch (error) {
//                 console.error('Error parsing user info:', error);
//             }
//         }
//     }, []);
    
//     const handleLinkClick = (pagePath) => {
//         navigate(pagePath);
//     };

//     // --- Role checking logic from your reference ---
//     const isUser = currentUser?.role === "user";
//     const isAdmin = currentUser?.role === "admin";
//     const isPM = currentUser?.role === "pm";

//     return (
//         <div className={`fixed inset-y-0 left-0 bg-green-50 text-gray-800 shadow-lg z-40 flex flex-col border-r border-green-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-48'}`}>
//             <div className="flex flex-col flex-1 p-3 overflow-y-auto">
//                 <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : 'justify-start pl-3'}`}>
//                     <Menu className="h-6 w-6 text-green-800"/>
//                     <span className={`ml-3 text-lg font-bold text-green-900 transition-all duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
//                         General
//                     </span>
//                 </div>
                
//                 <div className="flex-grow">
//                     {/* --- Role-based rendering for each item --- */}

//                     {/* Timesheet: Show for Admin and User only, NOT for PM */}
//                     {!isPM && (
//                         <SidebarItem icon={<Clock className="h-5 w-5" />} text="Timesheet" to="/dashboard/timesheet" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                     )}

//                     {/* Approval: Show for Admin and PM only */}
//                     {(isAdmin || isPM) && (
//                         <SidebarItem icon={<CheckSquare className="h-5 w-5" />} text="Approval" to="/dashboard/approval" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                     )}

//                     {/* Export: Show for Admin and PM only */}
//                     {(isAdmin || isPM) && (
//                         <SidebarItem icon={<Download className="h-5 w-5" />} text="Export" to="/dashboard/export" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                     )}

//                     {/* Users: Show for Admin and User only, NOT for PM */}
//                     {!isPM && (
//                          <SidebarItem icon={<Users className="h-5 w-5" />} text={isUser ? "Password" : "Users"} to="/dashboard/users" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                     )}
                    
//                     {/* Groups: Show for Admin only */}
//                     {isAdmin && (
//                         <>
//                             <SidebarItem icon={<Users className="h-5 w-5" />} text="Manage Groups" to="/dashboard/groups/manage-groups" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                             <SidebarItem icon={<GitBranch className="h-5 w-5" />} text="Manage Workflow" to="/dashboard/groups/manage-workflow" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
//                         </>
//                     )}
//                 </div>

//                 <div className="pt-2 mt-2 border-t border-green-200">
//                     <button 
//                         onClick={() => setIsCollapsed(!isCollapsed)}
//                         className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
//                     >
//                         {isCollapsed ? <ChevronRight className="h-5 w-5 text-green-700 group-hover:text-green-900" /> : <ChevronLeft className="h-5 w-5 text-green-700 group-hover:text-green-900" />}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Clock, Users, Layers, Download, CheckSquare, ChevronLeft, ChevronRight, GitBranch, Briefcase } from "lucide-react";

const SidebarItem = ({ icon, text, to, selectedPage, handleLinkClick, isCollapsed }) => (
    <Link
        to={to}
        onClick={(e) => { e.preventDefault(); handleLinkClick(to); }}
        className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 group cursor-pointer ${
            selectedPage === to
                ? "bg-green-600 text-white font-semibold shadow"
                : "text-green-800 hover:bg-green-100"
        }`}
    >
        {icon}
        <span className={`ml-4 transition-opacity duration-200 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
            {text}
        </span>
    </Link>
);

export default function Sidebar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('currentUser');
        if (userInfo) {
            try {
                const user = JSON.parse(userInfo);
                user.role = user.role?.toLowerCase();
                setCurrentUser(user);
            } catch (error) {
                console.error('Error parsing user info:', error);
            }
        }
    }, []);
    
    const handleLinkClick = (pagePath) => {
        navigate(pagePath);
    };

    const isUser = currentUser?.role === "user";
    const isAdmin = currentUser?.role === "admin";
    const isPM = currentUser?.role === "pm";

    return (
        <div className={`fixed inset-y-0 left-0 bg-green-50 text-gray-800 shadow-lg z-40 flex flex-col border-r border-green-200 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-48'}`}>
            <div className="flex flex-col flex-1 p-3 overflow-y-auto">
                <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : 'justify-start pl-3'}`}>
                    <Menu className="h-6 w-6 text-green-800"/>
                    <span className={`ml-3 text-lg font-bold text-green-900 transition-all duration-200 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                        General
                    </span>
                </div>
                
                <div className="flex-grow">
                    {/* Timesheet: Show for Admin and User only, NOT for PM */}
                    {(isAdmin || isUser || isPM) && (
                        <SidebarItem icon={<Clock className="h-5 w-5" />} text="Timesheet" to="/dashboard/timesheet" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Approval: Show for Admin and PM only */}
                    {(isAdmin || isPM) && (
                        <SidebarItem icon={<CheckSquare className="h-5 w-5" />} text="Enquiry / Approve " to="/dashboard/approval" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Export: Show for Admin and PM only */}
                    {(isAdmin ) && (
                        <SidebarItem icon={<Download className="h-5 w-5" />} text="Export" to="/dashboard/export" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Work Assignment: Show for Admin only */}
                    {isAdmin && (
                        <SidebarItem icon={<Briefcase className="h-5 w-5" />} text="Work Assignment" to="/dashboard/work-assignment" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Users: Show for Admin and User only, NOT for PM */}
                    {!isPM && (
                         <SidebarItem icon={<Users className="h-5 w-5" />} text={isUser ? "My Profile" : "Users"} to="/dashboard/users" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Groups: Show for Admin only */}
                    {isAdmin && (
                        <>
                            <SidebarItem icon={<Users className="h-5 w-5" />} text="Manage Groups" to="/dashboard/groups/manage-groups" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                            <SidebarItem icon={<GitBranch className="h-5 w-5" />} text="Manage Workflow" to="/dashboard/groups/manage-workflow" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                        </>
                    )}
                </div>
                
                <div className="pt-2 mt-2 border-t border-green-200">
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
                    >
                        {isCollapsed ? <ChevronRight className="h-5 w-5 text-green-700 group-hover:text-green-900" /> : <ChevronLeft className="h-5 w-5 text-green-700 group-hover:text-green-900" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

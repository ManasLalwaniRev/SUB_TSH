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
import POStatusTable from "../components/POStatus";
import Settings from "../components/Settings";

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
        ) : pathname === "/dashboard/postatus" ? (
          <POStatusTable />
        ) : pathname === "/dashboard/settings" ? (
          <Settings />
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

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Clock, Users, Download, CheckSquare, ChevronLeft, ChevronRight, Briefcase, Receipt, ClipboardCheck, LogOut } from "lucide-react";

// Individual Sidebar Item Component for cleaner code
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

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const isAdmin = currentUser?.role === "admin";
    const isUser = currentUser?.role === "user";
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
                    {/* Timesheet: Show for all roles */}
                    {(isAdmin || isUser || isPM) && (
                        <SidebarItem icon={<Clock className="h-5 w-5" />} text="Timesheet" to="/dashboard/timesheet" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Approval: Show for Admin and PM */}
                    {(isAdmin || isPM) && (
                        <SidebarItem 
                            icon={
                                <div className="flex items-center justify-center w-5 h-5 overflow-visible">
                                    <ClipboardCheck className="h-8 w-8 text-green-700" />
                                </div>
                            } 
                            text="Enquiry / Approve" 
                            to="/dashboard/approval" 
                            selectedPage={pathname} 
                            handleLinkClick={handleLinkClick} 
                            isCollapsed={isCollapsed} 
                        />
                    )}
                    
                    {/* Generate Invoice: Show for Admin only */}
                    {isAdmin && (
                        <SidebarItem icon={<Download className="h-5 w-5" />} text=" Generate Invoice " to="/dashboard/export" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}

                    {/* Invoice Export: Show for Admin only */}
                    {isAdmin  && (
                        <SidebarItem icon={<Receipt className="h-5 w-5" />} text="Invoice Export" to="/dashboard/invoice-export" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}
                    
                    {/* Work Order: Show for Admin only */}
                    {isAdmin && (
                        <SidebarItem icon={<Briefcase className="h-5 w-5" />} text="Work Order" to="/dashboard/work-assignment" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}

                    {/* Manage Groups: Show for Admin only */}
                    {isAdmin && (
                        <SidebarItem icon={<Users className="h-5 w-5" />} text="Manage Groups" to="/dashboard/groups/manage-groups" selectedPage={pathname} handleLinkClick={handleLinkClick} isCollapsed={isCollapsed} />
                    )}

                    {/* Users / User Profile: Show for all roles with different text */}
                    {(isAdmin || isPM || isUser) && (
                        <SidebarItem 
                            icon={<Users className="h-5 w-5" />} 
                            text={isUser ? "User Profile" : "Users"} 
                            to="/dashboard/users" 
                            selectedPage={pathname} 
                            handleLinkClick={handleLinkClick} 
                            isCollapsed={isCollapsed} 
                        />
                    )}
                </div>
                
                {/* --- BOTTOM SECTION --- */}
                <div className="pt-2 mt-auto border-t border-green-200">
                    {/* Logout Button */}
                    <div
                        onClick={handleLogout}
                        className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200 group cursor-pointer text-red-700 hover:bg-red-100`}
                    >
                        <LogOut className="h-5 w-5" />
                        <span className={`ml-4 font-semibold transition-opacity duration-200 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                            Logout
                        </span>
                    </div>

                    {/* Collapse Button */}
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 group"
                    >
                        {isCollapsed ? <ChevronRight className="h-5 w-5 text-green-700 group-hover:text-green-900" /> : <ChevronLeft className="h-5 w-s5 text-green-700 group-hover:text-green-900" />}
                    </button>
                </div>
            </div>
        </div>
    );
};
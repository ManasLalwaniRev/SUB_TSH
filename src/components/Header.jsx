import { LogOut } from "lucide-react";

export default function Header({ currentUser, onLogout }) {
  return (
    <header className="app-header-fixed bg-green-100 text-slate-900 shadow">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
        {/* Left: app title only */}
        <div className="flex items-center gap-2">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
            Timesheet Approval
          </h1>
        </div>

        {/* Right: user name + logout icon */}
        <div className="flex items-center gap-3">
          {currentUser && (
            <span className="hidden sm:inline-block text-sm font-medium text-slate-700">
              Welcome, {currentUser.name}
            </span>
          )}
          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white w-9 h-9 shadow transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default function Header({ currentUser, onLogout }) {
  return (
    <header className="bg-indigo-950 text-white px-6 py-3 shadow flex items-center">
      <h1 className="text-base font-bold tracking-tight">Timesheet Approval</h1>
      <div className="ml-4 flex items-center">
        <span className="text-lg font-semibold text-gray-200">
          {currentUser ? `Welcome, ${currentUser.name}` : ""}
        </span>
        <button onClick={onLogout} className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition ml-4">
          Logout
        </button>
      </div>
    </header>
  );
}

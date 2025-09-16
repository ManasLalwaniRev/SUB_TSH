export default function BottomTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex w-full justify-center gap-2 mt-3 mb-5">
      {["Timesheet Detail", "Current Status"].map((label, idx) => (
        <button
          key={label}
          onClick={() => setActiveTab(idx)}
          className={`text-[13px] font-medium px-6 py-2 rounded transition border
            ${activeTab === idx
              ? "bg-blue-700 text-white border-blue-800"
              : "bg-white text-blue-700 border-blue-200 hover:bg-blue-50"}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

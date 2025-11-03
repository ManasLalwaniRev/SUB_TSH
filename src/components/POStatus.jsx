import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  MessageSquare,
  Download,
  Receipt,
  Package,
  Users,
  ClockIcon,
} from "lucide-react";
import { backendUrl } from "./config";

const POStatusTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [approvedRows, setApprovedRows] = useState(new Set());

  // Filter states - Added PO Line Key filter
  const [filterPurchaseOrder, setFilterPurchaseOrder] = useState("");
  const [filterWACode, setFilterWACode] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      try {
        const parsedUser = JSON.parse(userInfo);
        setCurrentUser(parsedUser);
        if (parsedUser.role && parsedUser.role.toLowerCase() === "admin") {
          setIsAdmin(true);
        }
      } catch (e) {
        console.error("Failed to parse user info", e);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setUserLoaded(false);
    navigate("/");
  };

  const fetchPOStatus = async () => {
    const url = `${backendUrl}/api/SubkTimesheet/GetPOStatus`;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPOStatus();
  }, []);

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "0.00";
    return Number(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const filteredData = data.filter((item) => {
    const poMatch =
      !filterPurchaseOrder ||
      item.poNumber.toLowerCase().includes(filterPurchaseOrder.toLowerCase());
    const waMatch =
      !filterWACode ||
      item.workOrder.toLowerCase().includes(filterWACode.toLowerCase());
    return poMatch && waMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <p className="text-red-600 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f9fafd] flex flex-col pr-4 overflow-hidden">
      <div className="flex-1 flex flex-col pt-6 pb-6">
        <div className="flex justify-between items-center mb-6 px-4">
          {/* Left side: icon + heading */}
          <div className="flex items-center">
            <ClockIcon className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">PO Status</h1>
          </div>

          {/* Right side: Logout button */}
          <button
            onClick={handleLogout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm font-normal shadow transition"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-3 mb-4 px-4">
          {/* <input
            type="text"
            value={filterWACode}
            onChange={(e) => setFilterWACode(e.target.value)}
            placeholder="Filter WO Code"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPurchaseOrder}
            onChange={(e) => setFilterPurchaseOrder(e.target.value)}
            placeholder="Filter Purchase Order"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          /> */}

          <input
            type="text"
            value={filterPurchaseOrder}
            onChange={(e) => setFilterPurchaseOrder(e.target.value)}
            placeholder="Filter PO Number"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs"
          />
          <input
            type="text"
            value={filterWACode}
            onChange={(e) => setFilterWACode(e.target.value)}
            placeholder="Filter Work Order"
            className="border border-gray-300 rounded px-3 py-1.5 text-xs"
          />
        </div>

        <div className="border border-gray-300 rounded-2xl bg-white shadow-md p-2 w-full max-w-[calc(100vw-220px)] mx-auto">
          <div className="relative">
            <div className="overflow-x-auto max-h-[75vh] mt-1">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-blue-50">
                  <tr>
                    {/* <th className="border px-4 py-2 text-left">Resource ID</th> */}
                    <th className="border px-4 py-2 text-left">PO Number</th>
                    <th className="border px-4 py-2 text-left">Work Order</th>
                    <th className="border px-4 py-2 text-left">
                      Resource Description
                    </th>
                    <th className="border px-4 py-2 text-right">Total Hours</th>
                    <th className="border px-4 py-2 text-right">Total Cost</th>
                    <th className="border px-4 py-2 text-right">
                      Timesheet Hours
                    </th>
                    <th className="border px-4 py-2 text-right">
                      Timesheet Cost
                    </th>
                    <th className="border px-4 py-2 text-right">
                      Vouchered Hours
                    </th>
                    <th className="border px-4 py-2 text-right">
                      Vouchered Cost
                    </th>
                    <th className="border px-4 py-2 text-right">
                      Unvouchered Cost
                    </th>
                    <th className="border px-4 py-2 text-right whitespace-nowrap">
                      Utilization %
                    </th>
                    <th className="border px-4 py-2 text-right whitespace-nowrap">
                      Vouchered %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td className="border px-4 py-2 text-center" colSpan="11">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* <td className="border px-4 py-2">{item.resourceId}</td> */}
                        <td className="border px-4 py-2">{item.poNumber}</td>
                        <td className="border px-4 py-2">{item.workOrder}</td>
                        <td className="border px-4 py-2">
                          {item.resourceDesc}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {formatNumber(item.totHrs)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {formatCurrency(item.totalCost)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {item.timesheetHours.toFixed(2)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {formatCurrency(item.timesheetCost)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {item.voucheredHours}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {formatCurrency(item.voucheredCost)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {formatCurrency(item.unvoucheredCost)}
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {item.utilizationPercent.toFixed(2)}%
                        </td>
                        <td className="border px-4 py-2 text-right">
                          {item.voucheredPercent.toFixed(2)}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POStatusTable;

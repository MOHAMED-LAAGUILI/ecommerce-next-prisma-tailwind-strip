"use client";

import { Line } from "react-chartjs-2";
import { User, DollarSign, TrendingUp, Box } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import Table from "@/components/Table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardCard from "@/app/admin/_components/DashboardCard";
import { useDashboardData } from "@/hook/useDashboardData";
import { useLoading } from "../../context/loading-context";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { salesData, userData, productData } = useDashboardData();
  const { isLoading } = useLoading();

  // Local state to control loader visibility
  const [showLoader, setShowLoader] = useState(true);

  // Set a delay before hiding the loader
  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      // Show loader for at least 500ms to ensure it's visible for a moment
      setTimeout(() => setShowLoader(false), 1000);
    }
  }, [isLoading]);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Sales Data",
        data: [30, 40, 60, 70, 80, 90, 100],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const activityHeaders = ["#", "Activity", "Date", "Status"];

  const activityRows = [
    {
      "#": 1,
      Activity: "User Registered",
      Date: "2024-11-05",
      Status: <span className="text-green-500">Active</span>,
    },
    {
      "#": 2,
      Activity: "Purchase Made",
      Date: "2024-11-10",
      Status: <span className="text-yellow-500">Pending</span>,
    },
    {
      "#": 3,
      Activity: "Payment Failed",
      Date: "2024-11-12",
      Status: <span className="text-red-500">Failed</span>,
    },
  ];

  if (showLoader) {
    return <Loading />; // Show loading spinner with delay
  }

  return (
    <div className="min-h-screen px-4 lg:px-20 py-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* Dashboard Header */}
      <div className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">
        Admin Dashboard
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-6 mb-6">
        <DashboardCard
          title="Total Users"
          icon={<User className="text-blue-500 text-4xl mb-3" />}
          body={`${formatNumber(userData.usersCount)}`}
        />
        <DashboardCard
          title="Average value $ per user"
          icon={<User className="text-blue-500 text-4xl mb-3" />}
          body={`${formatCurrency(userData.averageValuePerUser)}`}
        />
        <DashboardCard
          title="Total Sales"
          icon={<DollarSign className="text-green-500 text-4xl mb-3" />}
          body={`${formatCurrency(salesData.amount)}`}
        />
        <DashboardCard
          title="Orders Number"
          icon={<Box className="text-red-500 text-4xl mb-3" />}
          body={`${formatNumber(salesData.numberOfSales)} Orders`}
        />
        <DashboardCard
          title="Revenue Growth"
          icon={<TrendingUp className="text-yellow-500 text-4xl mb-3" />}
          body="8.5%"
        />
        <DashboardCard
          title="Active product"
          icon={<Box className="text-red-500 text-4xl mb-3" />}
          body={`${formatNumber(productData.activeCount)} Orders`}
        />
        <DashboardCard
          title="Inactive product"
          icon={<Box className="text-red-500 text-4xl mb-3" />}
          body={`${formatNumber(productData.inactiveCount)} Orders`}
        />
      </div>

      {/* Charts and Tables Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="p-6 rounded-lg shadow-lg col-span-1 bg-white dark:bg-gray-700">
          <div className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4 text-center">
            Sales Overview
          </div>
          <Line data={chartData} options={{ responsive: true }} />
        </div>

        {/* Recent Activity Table */}
        <div className="p-6 rounded-lg shadow-lg col-span-1 bg-white dark:bg-gray-700">
          <Table
            title="Recent Activity"
            headers={activityHeaders}
            rows={activityRows}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

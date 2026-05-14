import React, { useState } from "react";
import {
  Users,
  BookOpen,
  DollarSign,
} from "lucide-react";
import { dummyDashboardData } from "../../assets/assets";

const Dashboard = () => {
  const [dashboardData] = useState(dummyDashboardData);

  const cards = [
    {
      title: "Total Enrolments",
      value: dashboardData.enrolledStudentsData.length,
      icon: <Users size={24} />,
    },
    {
      title: "Total Courses",
      value: dashboardData.totalCourses,
      icon: <BookOpen size={24} />,
    },
    {
      title: "Total Earnings",
      value: `$${dashboardData.totalEarnings}`,
      icon: <DollarSign size={24} />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back 👋 Here's an overview of your platform.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            Latest Enrolments
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Course Title</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.enrolledStudentsData.map(
                (data, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={data?.student?.imageUrl}
                          alt={data?.student?.name}
                          className="w-11 h-11 rounded-full object-cover border"
                        />

                        <p className="font-medium text-gray-800">
                          {data?.student?.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {data?.courseTitle}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
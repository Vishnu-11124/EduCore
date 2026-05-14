import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/educator",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "My Courses",
      path: "/educator/my-courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Add Course",
      path: "/educator/add-course",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "Students Enrolled",
      path: "/educator/student-entrolled",
      icon: <Users size={20} />,
    },
  ];

  return (
    isEducator && (
      <div className="h-screen w-64 bg-gray-800 text-white shadow-lg border-r border-gray-800">
        {/* Logo / Title */}
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-bold tracking-wide">
            Educator Panel
          </h1>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 p-4">
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/educator"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.icon}
              <p className="font-medium">{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
};

export default Sidebar;
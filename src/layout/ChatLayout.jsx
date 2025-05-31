"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ChatLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      {/* Animated Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <Sidebar toggleSidebar={() => setSidebarOpen(false)} />
      </div>

      <div className="flex flex-col flex-1">
        <Topbar
          toggleSidebar={() => setSidebarOpen(true)}
          isSidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
};

export default ChatLayout;

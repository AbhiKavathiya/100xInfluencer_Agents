"use client";
import { Icon } from "@iconify/react";

const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      {/* Show toggle only when sidebar is hidden */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="hover:text-indigo-400 transition"
        >
          <Icon icon="mdi:menu" className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-xl font-normal">Conversation</h1>
      <Icon icon="lucide:user-circle" className="w-6 h-6 text-white" />
    </header>
  );
};

export default Topbar;

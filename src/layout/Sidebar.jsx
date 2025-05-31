"use client";
import { Icon } from "@iconify/react";

const Sidebar = ({ toggleSidebar }) => {
  return (
    <aside className="h-full bg-[#171717] border-r border-zinc-800 flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="text-xl font-bold text-white">AI Chat</div>
        <button
          onClick={toggleSidebar}
          className="text-zinc-400 hover:text-white"
        >
          <Icon icon="mdi:close" className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Content */}
      <nav className="flex-1 p-4 space-y-2 w-full">
        <button className="flex items-center gap-2 text-white px-3 py-2 rounded-lg w-full hover:bg-white/20  transition">
          <Icon icon="lucide:message-square" className="w-5 h-5" />
          <span>New Chat</span>
        </button>
        <button className="flex items-center gap-2 text-white   w-full px-3 py-2 rounded-lg hover:bg-white/20  transition">
          <Icon icon="lucide:history" className="w-5 h-5" />
          <span>History</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

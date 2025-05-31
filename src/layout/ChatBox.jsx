import React from "react";

const ChatBox = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Your messages would go here */}
      <div className="mb-4">
        <div className="bg-zinc-700 p-3 rounded-xl max-w-md">
          Hi! How can I help you today?
        </div>
      </div>
      <div className="mb-4 text-right">
        <div className="bg-blue-600 p-3 rounded-xl inline-block max-w-md">
          What's the weather like?
        </div>
      </div>
      {/* Input bar (optional for now) */}
      <div className="mt-auto pt-4 border-t border-zinc-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default ChatBox;

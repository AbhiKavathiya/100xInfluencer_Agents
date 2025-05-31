"use client";
import React, { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const fakeResponses = [
  // "I'm here to help you!",
  // "That's an interesting question.",
  // "Let me think about that for a moment...",
  "<h1>hello</h1>",
  "<h2>How can I assist you today?</h2>",
];

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const Conversation = () => {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "<h1 classname='text-5xl' >Hello how can i assist you </h1>",
    },
    ,
  ]);
  const [input, setInput] = useState("");
  const [rows, setRows] = useState(1);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    const lineHeight = 24; // approx px height of one row
    const previousRows = e.target.rows;
    e.target.rows = 1; // reset rows to calculate scrollHeight properly
    const currentRows = Math.floor(e.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= 6) {
      e.target.rows = 6;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setRows(currentRows < 6 ? currentRows : 6);
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setRows(1);
    setLoading(true);

    setTimeout(() => {
      const randomReply =
        fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
      setMessages((prev) => [...prev, { from: "ai", text: randomReply }]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col w-full max-w-3xl h-full">
        {/* Message List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
          {messages.map((msg, i) => (
            <MessageBubble key={i} from={msg?.from} text={msg?.text} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="w-full p-4"
        >
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              rows={rows}
              placeholder="Send a message..."
              className="flex-grow resize-none rounded-xl bg-zinc-900 px-4 py-3 text-white text-sm border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-white text-indigo-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl text-sm font-medium"
              aria-label="Send message"
            >
              {loading ? (
                "..."
              ) : (
                <>
                  Send{" "}
                  <span className="ml-2">
                    <SendIcon />
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Conversation;

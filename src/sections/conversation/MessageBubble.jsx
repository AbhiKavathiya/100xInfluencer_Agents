import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const MessageBubble = ({ from, text }) => {
  const isUser = from === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`px-4 py-3 rounded-xl max-w-[85%] prose prose-invert ${
          isUser ? "bg-[#323232d9] text-white rounded-lg" : "text-white"
        }`}
      >
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MessageBubble;

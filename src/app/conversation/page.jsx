import ChatLayout from "@/layout/ChatLayout";
import Conversation from "@/sections/conversation/ConversationMessage";

export const metadata = {
  title: "Conversation",
  description: "",
};

const Page = () => {
  return (
    <ChatLayout>
      <Conversation />
    </ChatLayout>
  );
};

export default Page;

import { useState } from "react";
import Chats from "./components/blocks/Chats"
import Messages from "./components/blocks/Messages"
import Layout from "./components/layout"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable"
import { ChatsTeardrop } from "@phosphor-icons/react";
import EmptyBlock from "./components/blocks/EmptyBlock";
import { useChats } from "./api/chats/queries";

function App() {
  const [activeMessageId, setActiveMessageId ] = useState<string | null>(null);
  const { data: chats } = useChats();

  return (
    <Layout>
      <ResizablePanelGroup direction="horizontal" className="p-6 gap-3">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50} >
          <Chats onSelectChat={setActiveMessageId} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          {!activeMessageId ? (
            <EmptyBlock text="Select a chat to start messaging." icon={ChatsTeardrop} />
          ) : (
            <Messages chat_id={activeMessageId} participants={chats?.find((chat) => chat.chat_id === activeMessageId)?.participants || []} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}

export default App

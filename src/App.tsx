import Chats from "./components/blocks/Chats"
import Layout from "./components/layout"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./components/ui/resizable"

function App() {
  return (
    <Layout>
      <ResizablePanelGroup direction="horizontal" className="p-6 gap-3 border border-gray-700">
        <ResizablePanel defaultSize={30} minSize={20} maxSize={50} >
          <Chats />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <Chats />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Layout>
  )
}

export default App

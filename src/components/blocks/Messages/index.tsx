import { useChatMessages } from "@/api/chats/queries"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ChatSlash, Image, Microphone, MusicNotesSimple, PaperPlaneRight, UsersThree } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { MessageWidget } from "./MessageTypes"
import EmptyBlock from "../EmptyBlock"
import { useSendMessage } from "@/api/chats/mutations"
import { Button } from "@/components/ui/button"
import useWebSocket, {  } from "react-use-websocket";
import { IMessage } from "@/api/chats"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { audios } from "@/api/mock/audios"

type IMessagesProps = {
  chat_id: string
  participants: string[]
}
export default function Messages({chat_id, participants}: IMessagesProps) {
  const [message, setMessage] = useState("");
  const [messageImage, setMessageImage] = useState("");
  const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const { data: messages } = useChatMessages(chat_id);
  const [isTyping, setIsTyping] = useState<Boolean>(false);
  const {mutateAsync: sendMessage} = useSendMessage(chat_id);
  const { toast } = useToast()

  const { lastJsonMessage } = useWebSocket<any>(`/ws/${chat_id}`, {
    onOpen: () => console.log("WebSocket connection established"),
    onClose: () => console.log("WebSocket connection closed"),
    shouldReconnect: () => true,
    reconnectInterval: 3000
  });

  const handleUpdateChat = () => {
    if(lastJsonMessage) {
      const lastMessage = lastJsonMessage.data;
      
      if(lastJsonMessage && lastJsonMessage.event === "message_received") {
        setMessageHistory((prev) => prev.concat(lastMessage as IMessage));
      }
      
      if(lastJsonMessage && lastJsonMessage.event === "presence_updated") {
        if(lastMessage.status === "typing") {
          setIsTyping(true);
        } else {
          setIsTyping(false);
          toast({
            title: `The user: ${lastJsonMessage.data.user_id} ${lastMessage.status === "online" ? "is online" : "leaved the chat"}.`,
          })
        }
      }
    }
  }

  useEffect(() => {
    setMessageHistory(messages || []);
  }, [messages])

  useEffect(() => {
    handleUpdateChat();
  }, [lastJsonMessage])

  const cleanFields = (type: "text" | "image") => {
    const fields = {
      text: () => setMessage(""),
      image: () => setMessageImage("")
    }

    fields[type]();
  }

  const handleSubmitMessage = (e: React.FormEvent, type: "text" | "image") => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const inputValue = (form[0] as HTMLInputElement).value;

    if(inputValue === "") return;

    sendMessage({
      type,
      user_id: "You",
      content: inputValue
    }).then(() => {
      cleanFields(type);
    });

  }

  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <UsersThree size={24} weight="bold" className="min-w-6" />
          <p>
            {chat_id}
          </p>
        </CardTitle>
        <CardDescription>
          <p className="text-muted-foreground text-sm">
            Chat with: {participants.join(", ")}
          </p>
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="h-full overflow-scroll flex flex-col-reverse relative">
        {isTyping && (
          <p className="absolute bottom-0 left-0 w-full bg-muted p-2 text-sm text-muted-foreground">Bot user is typing...</p>
        )}
        {messageHistory?.length === 0 ? (
          <EmptyBlock text="No messages yet. Start a conversation." icon={ChatSlash} />
        ) : (
          <div className="py-4 gap-y-4 flex flex-col border border-transparent">
            {messageHistory?.map((message, idx) => (
              <MessageWidget
                key={idx}
                content={message.content}
                type={message.type}
                position={message.user_id === "You" ? "right" : "left"}
              />
            ))}
          </div>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="p-2 gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Image size={32} weight="bold" className="text-foreground"  />
            </Button> 
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Image url</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <form onSubmit={(e) => handleSubmitMessage(e, "image")} className="w-full flex gap-1" >
              <Input
                value={messageImage}
                onChange={(e) => setMessageImage(e.target.value)}
                placeholder="past or type the image url"
              />
              <Button type="submit">
                <PaperPlaneRight size={32} weight="bold" className="text-white"  />
              </Button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Microphone size={32} weight="bold" className="text-foreground"  />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-auto">
            <DropdownMenuLabel>Audio url</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div>
              {audios.map((audio, idx) => (
                <div onClick={() => {
                  sendMessage({
                    type: "audio",
                    user_id: "You",
                    content: audio.url
                  });
                }} key={idx} className="cursor-pointer flex p-2 items-center gap-2 rounded-md bg-muted text-primary mt-2">
                  <div className="bg-primary size-8 flex items-center justify-center rounded-md">
                    <MusicNotesSimple size={20} weight="bold" className="text-white"  />
                  </div>
                  <p className="text-md pr-4">
                    {audio.name}
                  </p>
                </div>
              ))}
              {audios.map((audio, idx) => (
                <div onClick={() => {
                  sendMessage({
                    type: "audio",
                    user_id: "You",
                    content: audio.url
                  });
                }} key={idx} className="cursor-pointer flex p-2 items-center gap-2 rounded-md bg-muted text-primary mt-2">
                  <div className="bg-primary size-8 flex items-center justify-center rounded-md">
                    <MusicNotesSimple size={20} weight="bold" className="text-white"  />
                  </div>
                  <p className="text-md pr-4">
                    {audio.name}
                  </p>
                </div>
              ))}
              {audios.map((audio, idx) => (
                <div onClick={() => {
                  sendMessage({
                    type: "audio",
                    user_id: "You",
                    content: audio.url
                  });
                }} key={idx} className="cursor-pointer flex p-2 items-center gap-2 rounded-md bg-muted text-primary mt-2">
                  <div className="bg-primary size-8 flex items-center justify-center rounded-md">
                    <MusicNotesSimple size={20} weight="bold" className="text-white"  />
                  </div>
                  <p className="text-md pr-4">
                    {audio.name}
                  </p>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <form onSubmit={(e) => handleSubmitMessage(e, "text")} className="w-full flex gap-1" >
          <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
          <Button type="submit">
            <PaperPlaneRight size={32} weight="bold" className="text-white"  />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
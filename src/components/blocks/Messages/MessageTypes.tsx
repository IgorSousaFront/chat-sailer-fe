import { cn } from "@/lib/utils"

type IMessage = {
  content: React.ReactNode | string
  position: "left" | "right"
  type?: "image" | "audio" | "text"
}

type IMessageAction = {
  children: React.ReactNode
  position: "left" | "right"
  type: "image" | "audio" | "text"
}

const MessageWrapper = ({children, position, type, className}: React.HTMLAttributes<HTMLDivElement> & IMessageAction) => {
  return (
    <div
      className={cn(
        "flex w-fit break-words flex-col gap-2 bg-muted shadow-xl rounded-[30px] mb-10 py-2 px-4 relative",
        position === "right" && "self-end bg-primary text-white",
        type === "text" && "max-w-[36%] px-4",
        type === "image" && "max-w-[45%]",
        className
      )}
    >
      {children}
      <span className={cn(
        "size-4 absolute top-full -translate-y-1/2 bg-muted rounded-full shadow-md",
        position === "right" ? "bg-primary left-full rounded-r-full" : "right-full rounded-l-full",
      )}/>
    </div>
  )
}

export function MessageWidget({content, position, type}: IMessage) {
  if(type === "text") {
    return (
      <MessageWrapper position={position} type={type} >
        {content}
      </MessageWrapper>
    )
  } 

  if(type === "image") {
    return (
      <MessageWrapper position={position} type={type}  className="rounded-lg p-2">
        <img src={content as string} className="rounded-md" />
      </MessageWrapper>
    )
  }

  if(type === "audio") {
    return (
      <MessageWrapper position={position} type={type}  className="rounded-full p-1">
        <audio src={content as string} controls />
      </MessageWrapper>
    )
  }
}
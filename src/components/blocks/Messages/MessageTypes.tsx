import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PushPin } from "@phosphor-icons/react"

type IMessage = {
  content: React.ReactNode | string
  position: "left" | "right"
  type?: "image" | "audio" | "text"
  id: string
  isFixed?: boolean
  onPinMessage: (id: string) => void
}

type IMessageAction = {
  children: React.ReactNode
  position: "left" | "right"
  type: "image" | "audio" | "text"
  isFixed?: boolean
  onPinMessage?: (id: string) => void
}

const MessageWrapper = ({
  children,
  position,
  type,
  isFixed,
  id,
  className,
  onPinMessage
}: React.HTMLAttributes<HTMLDivElement> & IMessageAction) => {
  return (
    <div
      className={cn(
        "flex w-fit break-words items-center gap-3 bg-muted shadow-xl rounded-[30px] mb-10 py-2 px-4 relative",
        position === "right" && "self-end bg-primary text-white",
        type === "text" && "max-w-[36%] px-4",
        type === "image" && "max-w-[45%]",
        isFixed && "border border-red-500",
        className
      )}
    >
      {onPinMessage && id && (
        <Button onClick={() => onPinMessage(id)} variant="ghost" className="p-2 h-auto rounded-full">
          <PushPin size={22} />
        </Button>
      )}
      {children}
      <span className={cn(
        "size-4 absolute top-full -translate-y-1/2 bg-muted rounded-full shadow-md",
        position === "right" ? "bg-primary left-full rounded-r-full" : "right-full rounded-l-full",
      )}/>
    </div>
  )
}

export function MessageWidget({content, position, type, id, isFixed, onPinMessage}: IMessage) {
  if(type === "text") {
    return (
      <MessageWrapper id={id} isFixed={isFixed} position={position} type={type} onPinMessage={id => onPinMessage(id)} >
        {content}
      </MessageWrapper>
    )
  } 

  if(type === "image") {
    return (
      <MessageWrapper id={id} isFixed={isFixed}  position={position} type={type} onPinMessage={id => onPinMessage(id)} className="rounded-lg p-2">
        <img src={content as string} className="rounded-md" />
      </MessageWrapper>
    )
  }

  if(type === "audio") {
    return (
      <MessageWrapper id={id} isFixed={isFixed}  position={position} type={type} onPinMessage={id => onPinMessage(id)} className="rounded-full p-1">
        <audio src={content as string} controls />
      </MessageWrapper>
    )
  }
}
import GroupCard from "../GroupCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Warning } from "@phosphor-icons/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IChat } from "@/api/chats";

type IGroupListProps = {
  chats: IChat[] | undefined
} & {
  error: any
  isLoading: boolean
}


export default function GroupList({chats, error, isLoading}: IGroupListProps) {

  if (error) {
    return(
      <Alert variant="destructive" className="gap-x-2 items-center">
        <Warning size={24} />
        <AlertTitle>Error:</AlertTitle>
        <AlertDescription>
          {error.message}
        </AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx}>
            <GroupCard
              chat_id=""
              participants={[""]}
              isLoading={isLoading}
            />
            <div className="mt-4 border-t" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-[500px]">
      <ScrollArea className="size-full">
        {chats && chats.map((group, idx) => {
          if(group.chat_id) {
            return (
              <div key={group.chat_id}>
                <GroupCard
                  chat_id={group.chat_id}
                  participants={group.participants}
                />
                {idx !== chats.length - 1 && (
                  <div className="my-4 border-t" />
                )}
              </div>
            )
          }
        })}
      </ScrollArea>
    </div>
  )
}
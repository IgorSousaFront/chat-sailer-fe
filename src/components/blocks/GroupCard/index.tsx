import { Skeleton } from "@/components/ui/skeleton"

interface IGroupCardProps {
  chat_id: string
  participants: string[]
  isLoading?: boolean
}

export default function GroupCard({chat_id, participants, isLoading}: IGroupCardProps) {
  return (
    <div className="flex items-center space-x-4">
      {isLoading ? (
        <div className="min-w-0 space-y-2 flex-1">
          <Skeleton className="h-4 w-[230px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
      ) : (
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-primary">
            Chat with: {participants.join(', ')}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {chat_id}
          </p>
        </div>
      )}
      {/* <div className="text-right flex flex-col items-end">
        <p className="text-sm text-gray-500">{group.lastMessageTime}</p>
        {group.noReadsQuantity > 0 && (
          <p className="mt-1 flex items-center text-xs font-medium leading-4 text-white">
            <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-0.5">
              {group.noReadsQuantity}
            </span>
          </p>
        )}
      </div> */}
    </div>
  )
}
import { cn } from "@/lib/utils"

type IUserStatusProps = {
  children: React.ReactNode,
  isOnline: boolean
}

export default function UserStatus({children, isOnline}: IUserStatusProps) {
  return (
    <span className="text-muted-foreground px-1 flex w-full items-center justify-between">
      {children}
      <span className={cn(
        "inline-block size-2 rounded-full",
        isOnline ? "bg-green-500" : "bg-gray-500"
      )}></span>
    </span>
  )
}
import { users } from "@/api/mock/users";
import UserCard from "../UserCard";
import { ScrollArea } from "@/components/ui/scroll-area"


export default function UsersList() {
  return (
    <div className="h-[500px]">
      <ScrollArea className="size-full">
        {users.map((user, idx) => (
          <div key={idx}>
            <UserCard
              name={user.name}
              image={user.picture}
            />
            {idx !== users.length - 1 && (
              <div className="my-4 border-t border-muted" />
            )}
          </div>
        ))}
      </ScrollArea>

    </div>
  )
}
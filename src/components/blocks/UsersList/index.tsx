import { users } from "@/api/mock/users";
import UserCard from "../UserCard";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";


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
              <Separator className="my-3"/>
            )}
          </div>
        ))}
      </ScrollArea>

    </div>
  )
}
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import UserCard from "../UserCard"
import { IUser } from "@/api/mock/users"

type ISearchUsersProps = {
  onSelectUser: (user: IUser) => void
  users: Array<IUser & {isChecked: boolean}>
}

export function SearchUsers({users, onSelectUser}: ISearchUsersProps) {
  const [open, setOpen] = useState<boolean>(false)
  // const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          Select users
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[375px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." className="h-9" />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {users.map((user, idx) => (
                <CommandItem
                  key={idx}
                  value={user.name}
                  onSelect={() => {
                    onSelectUser(user)
                    // setOpen(false)
                  }}
                >
                  <div className="flex w-full items-center justify-between cursor-pointer">
                    <UserCard
                      name={user.name}
                      image={user.picture}
                    />
                    <Check
                      className={cn(
                        "ml-auto",
                        user.isChecked
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

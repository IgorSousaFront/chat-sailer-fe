
import { Button } from "@/components/ui/button"
import { Plus, Robot, X } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { IUser, users } from "@/api/mock/users"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { useCreateChat } from "@/api/chats/mutations"
import { SearchUsers } from "../SearchUsers"

type IUserlist = IUser & {isChecked: boolean}

export default function AddGroupModal({onCreateChat}: {onCreateChat: (chat_id: string) => void}) {
  const [userList, setUserList] = useState<IUserlist[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const { toast } = useToast()

  const {mutateAsync: createChatMutation} = useCreateChat();

  useEffect(() => {
    const usersList = users.map(user => {
      return {
        ...user,
        isChecked: false
      }
    })

    setUserList(usersList)
  }, [])

  useEffect(() => {
    const selected = userList.filter(user => user.isChecked).map(user => user.name)
    setSelectedUsers(selected)
  }, [userList])

  const cleanSelectedUsers = () => {
    setSelectedUsers([]);
    setUserList(prev => {
      return prev.map(user => {
        return {
          ...user,
          isChecked: false
        }
      })
    })
  }

  const removeUserSelected = (user: string) => {
    setUserList(prev => {
      return prev.map(item => {
        if (item.name === user) {
          return {
            ...item,
            isChecked: false
          }
        }
        return item
      })
    })
  }

  const setUserSelected = (user: string) => {
    setUserList(prev => {
      return prev.map(item => {
        if (item.name === user) {
          return {
            ...item,
            isChecked: !item.isChecked
          }
        }
        return item
      })
    })
  }

  const handleNewGroup = async () => {
    try {
      await createChatMutation({participants: ["You", ...selectedUsers]}).then((data) => {
        onCreateChat(data.chat_id as string);
      });
      cleanSelectedUsers();
      toast({
        title: "Chat created",
        duration: 2000,
        description: "Now you can chat with your friends",
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Try again later",
      })
    }
  };

  const handleNewChatBot = async () => {
    try {
      await createChatMutation({participants: ["You"]}).then((data) => {
        onCreateChat(data.chat_id as string);
      })
      toast({
        title: "Chat created",
        duration: 2000,
        description: "Now you can chat with our bot",
      })
    } catch (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Try again later",
      })
    }
  };

  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" onClick={handleNewChatBot}>
              <Robot size={24} weight="bold" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Talk to a bot</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button size="icon">
                  <Plus size={24} weight="bold" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a group</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a group</DialogTitle>
            <DialogDescription>
              Choose the users you want to add to the group
            </DialogDescription>
          </DialogHeader>
          <div className="gap-4 py-4">
            <SearchUsers users={userList} onSelectUser={(user) => setUserSelected(user.name)} />
            
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {selectedUsers.map((participant, idx) => (
                <Badge key={idx} className="p-2 flex gap-x-2">
                  {participant}
                  <button onClick={() => removeUserSelected(participant)}>
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleNewGroup}>Create Group</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Plus, X } from "@phosphor-icons/react"
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
import { useEffect, useState } from "react"
import { useCreateChat } from "@/api/chats/mutations"
import { SearchUsers } from "../SearchUsers"

type IUserlist = IUser & {isChecked: boolean}

export default function AddGroupModal({onCreateChat}: {onCreateChat: () => void}) {
  const [userList, setUserList] = useState<IUserlist[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const { toast } = useToast()

  const {mutateAsync: createChatMutation, isSuccess} = useCreateChat();

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

  const handleSubmit = async () => {
    try {
      await createChatMutation({participants: selectedUsers});
      cleanSelectedUsers();
      toast({
        title: "Chat created",
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

  useEffect(() => {
    if (isSuccess) {
      onCreateChat();
    }
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="absolute bottom-4 right-4">
          <Plus size={24} weight="bold" />
        </Button>
      </DialogTrigger>
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
            <Button type="submit" onClick={handleSubmit}>Create Group</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
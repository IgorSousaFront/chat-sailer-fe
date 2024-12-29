
import { Button } from "@/components/ui/button"
import { Plus, X, Warning } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

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
import { UsersListCombobox } from "../SearchUser"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AddGroupModal({onCreateChat}: {onCreateChat: () => void}) {
  const [participants, setParticipants] = useState<string[]>(["Example"]);
  const { toast } = useToast()

  const {mutateAsync: createChatMutation, isSuccess} = useCreateChat();

  const handleSubmit = async () => {
    if (!participants.length) {
      <Alert variant="destructive" className="gap-x-2 items-center">
        <Warning size={24} />
        <AlertTitle>Error:</AlertTitle>
        <AlertDescription>
          Choose at least one user.
        </AlertDescription>
      </Alert>
      return;
    }

    try {
      await createChatMutation({participants});
      setParticipants([]);
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
          <UsersListCombobox onUpdateUsers={setParticipants} />
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {participants.map((participant, idx) => (
              <Badge key={idx} className="p-2 flex gap-x-2">
                {participant}
                <X size={12} />
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
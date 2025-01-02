import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersThree, Users, Chat, Cactus } from "@phosphor-icons/react"
import GroupList from "../GroupList"
import AddGroupModal from "../AddGroupModal"
import UsersList from "../UsersList"
import { useChats } from "@/api/chats/queries"
import { Separator } from "@/components/ui/separator"
import EmptyBlock from "../EmptyBlock"

export default function Chats({onSelectChat}: {onSelectChat: (id: string) => void}) {
  const { data: chats, isLoading, error, refetch } = useChats();

  const handleSelectChat = (id: string) => {
    onSelectChat(id);
    refetch();
  }

  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Chat size={24} weight="bold" /> Your chats
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="py-6 h-full">
        <Tabs defaultValue="groups" className="w-full h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="groups">
              <UsersThree size={20} weight="bold" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users size={16} weight="bold" />
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="groups" className="pt-4 h-full">
            {
              chats?.length === 0 ? (
                <EmptyBlock text="You don't have any group yet." icon={Cactus} />
              ) : (
                <GroupList chats={chats} error={error} isLoading={isLoading} onSelectChat={onSelectChat} />
              )
            }
            <AddGroupModal onCreateChat={handleSelectChat} />
          </TabsContent>
          <TabsContent value="users" className="pt-4 h-full">
            <UsersList />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UsersThree, Users, Chat, Cactus } from "@phosphor-icons/react"
import GroupList from "../GroupList"
import AddGroupModal from "../AddGroupModal"
import UsersList from "../UsersList"
import { useChats } from "@/api/chats/queries"

export default function Chats() {
  const { data: chats, isLoading, error, refetch } = useChats();

  return (
    <Card className="h-full flex flex-col relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Chat size={24} weight="bold" /> Your chats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="groups" className="w-full">
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
          <TabsContent value="groups" className="pt-4">
            {
              chats?.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-y-4 h-[400px]">
                  <Cactus size={60} className="text-muted-foreground" weight="light" />
                  <p className="text-sm text-muted-foreground">
                    You don&apos;t have any group yet.
                  </p>
                </div>
              ) : (
                <GroupList chats={chats} error={error} isLoading={isLoading} />
              )
            }
            <AddGroupModal onCreateChat={refetch} />
          </TabsContent>
          <TabsContent value="users" className="pt-4">
            <UsersList />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
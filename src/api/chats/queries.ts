import { useQuery } from '@tanstack/react-query';
import { ChatService, IChat } from '../chats';

const chatService = new ChatService();

export const useChats = () => {
  return useQuery<IChat[], Error>({
    queryKey: ['chats'],
    queryFn: () => chatService.findAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
};

import { useQuery } from '@tanstack/react-query';
import { ChatService, IChat, IMessage } from '../chats';

const chatService = new ChatService();

export const useChats = () => {
  return useQuery<IChat[], Error>({
    queryKey: ['chats'],
    queryFn: () => chatService.findAll().then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
};

export const useChatMessages = (id: string) => {
  return useQuery<IMessage[], Error>({
    queryKey: ['messages', id],
    queryFn: () => chatService.findById(id).then((res) => res.data),
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
};

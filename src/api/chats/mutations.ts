import { useMutation } from "@tanstack/react-query";
import { ChatService, IChat, IMessage } from "../chats";

const chatService = new ChatService();

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (newChat: IChat) => chatService.createChat(newChat).then((res) => res.data),
    onError: (error) => {
      console.error('Erro ao criar o chat:', error);
    },
  });
};

export const useSendMessage = (chat_id: string) => {
  return useMutation({
    mutationFn: (newMessage: IMessage) => chatService.sendMessage(chat_id, newMessage).then((res) => res.data),
    onError: (error) => {
      console.error('Erro ao criar o chat:', error);
    },
  });
};
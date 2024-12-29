import { useMutation } from "@tanstack/react-query";
import { ChatService, IChat } from "../chats";

const chatService = new ChatService();

export const useCreateChat = () => {
  return useMutation({
    mutationFn: (newChat: IChat) => chatService.createChat(newChat).then((res) => res.data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries('chats');
    // },
    onError: (error) => {
      console.error('Erro ao criar o chat:', error);
    },
  });
};

export const useSendMessage = () => {
  return useMutation({
    mutationFn: (newChat: IChat) => chatService.sendMessage(newChat).then((res) => res.data),
    // onSuccess: () => {
    //   queryClient.invalidateQueries('chats');
    // },
    onError: (error) => {
      console.error('Erro ao criar o chat:', error);
    },
  });
};
import api from './index';

export interface IChat {
  chat_id?: string;
  participants: string[];
}

export interface IMessage {
  id: string,
  user_id: string,
  type: "text" | "image" | "audio",
  content: string,
  timestamp?: string | Date
  isFixed?: boolean
}

export type IMessageCreate = Omit<IMessage, "id">

export class ChatService {
  async findAll() {
    return api.get<IChat[]>('/chats');
  }
  
  async findById(id: string) {
    return api.get<IMessage[]>(`/chats/${id}/messages`);
  }

  async createChat(data: IChat) {
    return api.post<IChat>('/chats', data);
  }

  async sendMessage(chat_id:string, data: IMessageCreate) {
    return api.post<IChat>(`/chats/${chat_id}/messages`, data);
  }
}
import api from './index';

export interface IChat {
  chat_id?: string;
  participants: string[];
}

export class ChatService {
  async findAll() {
    return api.get<IChat[]>('/chats');
  }
  
  async findById(id: string) {
    return api.get<IChat[]>(`/chats/${id}/messages`);
  }

  async createChat(data: IChat) {
    return api.post<IChat>('/chats', data);
  }

  async sendMessage(data: IChat) {
    return api.post<IChat>('/chats', data);
  }
}
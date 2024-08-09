import create from 'zustand';
import { usersType } from '../type';

interface ConversationState {
  selectedConversation: null | usersType;
  setSelectedConversation: (selectedConversation: null | usersType) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;

import { useEffect } from 'react';

import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';

// @ts-ignore
import notificationSound from '../../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  //@ts-ignore
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      // @ts-ignore
      sound.play();

      setMessages([...messages, newMessage]);
    });

    return () => socket?.off('newMessage');
  }, [socket, setMessages, messages]);
};
export default useListenMessages;

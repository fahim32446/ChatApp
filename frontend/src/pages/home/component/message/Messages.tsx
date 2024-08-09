import { useEffect, useRef } from 'react';
import useFetch from '../../../../common/hooks/useFetch';
import useListenMessages from '../../../../common/hooks/useGetListentMsg';
import MessageSkeleton from '../../../../common/skeleton/MessageSkeleton';
import { GetMessages } from '../../../../common/type';
import useConversation from '../../../../common/zustand/useConversation';
import Message from './Message';

const Messages = () => {
  const lastMessageRef: any = useRef();
  useListenMessages();
  const { messages, setMessages, selectedConversation } = useConversation();
  const id = selectedConversation?._id;

  const { loading, data } = useFetch<GetMessages[]>(`messages/${id}`, 'GET');
  const messagesFromApi = data?.data || [];

  useEffect(() => {
    setMessages(messagesFromApi);
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

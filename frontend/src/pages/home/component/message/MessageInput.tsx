import { useEffect, useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useFetch from '../../../../common/hooks/useFetch';
import useConversation from '../../../../common/zustand/useConversation';

const MessageInput = () => {
  const [inputMessage, setInputMessage] = useState('');

  const { messages, setMessages, selectedConversation } = useConversation();

  const id = selectedConversation?._id;

  const { loading, doPost, data } = useFetch(`messages/send/${id}`, 'POST');

  useEffect(() => {
    if (data) {
      setMessages([...messages, data.data]);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage) return;
    await doPost({ message: inputMessage });
    setInputMessage('');
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type='submit'
          className='absolute inset-y-0 end-0 flex items-center pe-3'
        >
          {loading ? (
            <div className='loading loading-spinner'></div>
          ) : (
            <BsSend />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

import useFetch from '../../../common/hooks/useFetch';
import { usersType } from '../../../common/type';
import { getRandomEmoji } from '../../../common/utils/emoji';
import Conversation from './Conversation';

type Props = {};

const Conversations = (props: Props) => {
  const { data, loading } = useFetch<usersType[]>('other-users');

  const other_user = data?.data;

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {other_user?.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === other_user.length - 1}
        />
      ))}

      {loading ? (
        <span className='loading loading-spinner mx-auto'></span>
      ) : null}
    </div>
  );
};

export default Conversations;

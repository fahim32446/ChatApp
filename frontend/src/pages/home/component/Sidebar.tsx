import Conversations from './Conversations';
import SearchInput from './SearchInput';

type Props = {};

const Sidebar = (props: Props) => {
  
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      {/* <LogoutButton /> */}
    </div>
  );
};

export default Sidebar;

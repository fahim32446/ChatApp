import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthContext } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:5000/', {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      newSocket.on('getOnlineUsers', (users) => {
        // console.log(users);
        setOnlineUsers(users);
      });

      //   newSocket.on('connect', () => {
      //     console.log('Connected to socket server');
      //   });

      //   newSocket.on('disconnect', () => {
      //     console.log('Disconnected from socket server');
      //   });

      return () => {
        newSocket.close();
        setSocket(null);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// Optional hook for using the context
export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      'useSocketContext must be used within a SocketContextProvider'
    );
  }
  return context;
};

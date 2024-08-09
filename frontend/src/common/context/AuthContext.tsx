import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { loginResponse } from '../type';

interface AuthContextType {
  authUser: loginResponse | null;
  setAuthUser: React.Dispatch<React.SetStateAction<loginResponse | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const get_user_info = localStorage.getItem('user_info');

  const [authUser, setAuthUser] = useState<loginResponse | null>(
    get_user_info ? JSON.parse(get_user_info) : null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthWrapper from './common/AuthWrapper';
import Home from './pages/home/Home';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import { useAuthContext } from './common/context/AuthContext';

const App = () => {
  const { authUser = null } = useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route element={<AuthWrapper />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route
          path='/login'
          element={authUser ? <Navigate to='/' /> : <SignIn />}
        />
        <Route
          path='/signup'
          element={authUser ? <Navigate to='/' /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

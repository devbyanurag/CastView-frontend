import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/authSlice';
import { apiInstance } from './utils/api';
import { tokenCastView } from './utils/variables';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import ProtectedRoute from './pages/ProtectedRoute';
import Loading from './pages/Loading/Loading';
import WaitServer from './pages/WaitServer/WaitServer';

const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const SignupVerify = lazy(() => import('./pages/SignupVerify/SignupVerify'));

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingServer, setLoadingServer] = useState(false);

  useEffect(() => {
    const verifyLogin = async () => {
      let token = localStorage.getItem(tokenCastView);
      if (token) {
        const timeout = setTimeout(() => {
          setLoadingServer(true);
        }, 10000); // 10 seconds

        try {
          const response = await apiInstance.get(`user/verifyLogin/${token}`);
          clearTimeout(timeout);

          if (response.status === 200) {
            dispatch(login(response.data.user));
          } else {
            localStorage.removeItem(tokenCastView);
          }
        } catch (error) {
          clearTimeout(timeout);
          toast.error('Login failed. Please try again.');
        }
      }
      setLoading(false);
    };

    verifyLogin();
  }, [dispatch]);

  if (loading) {
    return loadingServer ? <WaitServer /> : <Loading />;
  }

  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signupVerify/:token' element={<SignupVerify />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;

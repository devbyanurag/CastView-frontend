import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux'
import ProtectedRoute from './pages/ProtectedRoute'
import { apiInstance } from './utils/api'
import { toast } from 'react-toastify'
import { login } from './store/slices/authSlice'
import Loading from './pages/Loading/Loading'
import { tokenCastView } from './utils/variables'
import SignupVerify from './pages/SignupVerify/SignupVerify'


const App = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyLogin = async () => {
      let token = localStorage.getItem(tokenCastView);
      if (token) {
        try {
          const response = await apiInstance.get(`user/verifyLogin/${token}`);
          console.log('User logged in:', response.data);
          if (response.status == 200) {
            dispatch(login(response.data.user));
          }
          else {
            localStorage.removeItem(tokenCastView)
          }
        } catch (error) {
          toast.error('Login failed. Please try again.');
        }
      }
      setLoading(false)
    };

    verifyLogin();
  }, [])



  return (
    loading ? <Loading /> :

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signupVerify/:token' element={<SignupVerify />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

  )
}

export default App
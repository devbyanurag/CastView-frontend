import React, { useState, ChangeEvent, FormEvent } from 'react';
import logoImg from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiInstance } from '../../utils/api';
import { login } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { tokenCastView } from '../../utils/variables';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '1@gmail.com',
        password: '1'
    });
    const [errors, setErrors] = useState<Partial<LoginFormData>>({});
    const dispatch = useDispatch();
    const navigate=useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (): boolean => {
        const newErrors: Partial<LoginFormData> = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
            toast.error('Email is required');
        } else if (!/\S+@gmail\.com$/.test(formData.email)) {
            newErrors.email = 'Email must be a valid Gmail address';
            toast.error('Email must be a valid Gmail address');
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
            toast.error('Password is required');
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await apiInstance.post('/user/login', formData);
                toast.success('Login successful!');
                console.log('User logged in:', response.data);
                dispatch(login(response.data.user))
                localStorage.setItem(tokenCastView,response.data.token)
                navigate('/')
            } catch (error) {
                toast.error('Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="flex" style={{ height: 'calc(100vh - 4rem)', background: `linear-gradient(188deg, #BC69F4 0%, #FECA8E 100%)` }}>
            <div className="w-full max-w-xs md:max-w-sm m-auto bg-[#ffffff] rounded p-5 shadow-xl">
                <header>
                    <img className="w-20 mx-auto mb-1 border-4 rounded-md shadow-lg" src={logoImg} alt="Logo" />
                </header>
                <form onSubmit={handleSubmit}>
                    <p className='text-center text-xl mb-3 font-bold text-indigo-700'>Login</p>
                    <div>
                        <label className="block text-indigo-500" htmlFor="email">Email</label>
                        <input
                            className={`w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 ${errors.email && 'border-red-500'}`}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-indigo-500" htmlFor="password">Password</label>
                        <input
                            className={`w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 ${errors.password && 'border-red-500'}`}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded hover:cursor-pointer" type="submit">
                            Login
                        </button>
                    </div>
                </form>
                <footer>
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a>
                    <Link className="text-indigo-700 hover:text-pink-700 text-sm float-right" to="/signup">Create Account</Link>
                </footer>
            </div>
        </div>
    );
};

export default Login;

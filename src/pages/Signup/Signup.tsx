import React, { useState, ChangeEvent, FormEvent } from 'react';
import logoImg from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiInstance } from '../../utils/api';

interface FormData {
    name: string;
    phone: string;
    email: string;
    password: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: 'Anurag',
        phone: '9021312345',
        email: '1@gmail.com',
        password: '1'
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});

    const [userCreated, setUserCreated] = useState<boolean>(false)
    const [verifyLink, setVerifyLink] = useState('/')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!formData.name) {
            newErrors.name = 'Name is required'
            toast.error('Name is required')
        };
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required'
            toast.error('Phone number is required')
        };
        if (!formData.email) {
            newErrors.email = 'Email is required';
            toast.error('Email is required')
        } else if (!/\S+@gmail\.com$/.test(formData.email)) {
            newErrors.email = 'Email must be a valid Gmail address';
            toast.error('Email must be a valid Gmail address')

        }
        if (!formData.password) {
            newErrors.password = 'Password is required'
            toast.error('Password is required')
        };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await apiInstance.post('/user/create', formData);
                toast.success('Signup successful!');
                if (response.status == 200) {
                    setUserCreated(true)
                    setVerifyLink(response.data.token)
                }
                else {
                    toast.error('Signup failed. Please try again.');
                }
            } catch (error) {
                toast.error('Signup failed. Please try again.');
                console.error('Error creating user:', error);
            }

        }
    };

    return (
        <div className="flex" style={{ height: 'calc(100vh - 4rem)', background: `linear-gradient(188deg, #BC69F4 0%, #FECA8E 100%)` }}>
            {
                userCreated ?
                    <div className="w-full max-w-xs md:max-w-sm m-auto bg-[#ffffff] rounded p-5 shadow-xl">
                        <header>
                            <img className="w-20 mx-auto mb-5 border-4 rounded-md shadow-lg" src={logoImg} alt="Logo" />
                        </header>
                        <p className='my-2'>Signup successful! Please verify your email by clicking the link sent to your email address.</p>
                        <p className='my-2'>For now we provide you link in future we will add any mail/text servive.</p>
                        <Link to={verifyLink} className='text-blue-500'>Click Here</Link>



                    </div>
                    :
                    <div className="w-full max-w-xs md:max-w-sm m-auto bg-[#ffffff] rounded p-5 shadow-xl">
                        <header>
                            <img className="w-20 mx-auto mb-5 border-4 rounded-md shadow-lg" src={logoImg} alt="Logo" />
                        </header>
                        <form onSubmit={handleSubmit}>
                            <p className='text-center text-xl mb-3 font-bold text-indigo-700'>Signup</p>
                            <div>
                                <label className="block text-indigo-500" htmlFor="name">Name</label>
                                <input
                                    className={`w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 ${errors.name && 'border-red-500'}`}
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-indigo-500" htmlFor="phone">Phone Number</label>
                                <input
                                    className={`w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500  [&::-webkit-inner-spin-button]:appearance-none  ${errors.phone && 'border-red-500'}`}
                                    type="number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-indigo-500" htmlFor="email">Email</label>
                                <input
                                    className={`w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500  ${errors.email && 'border-red-500'}`}
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-indigo-500" htmlFor="password">Password</label>
                                <input
                                    className={`w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500  ${errors.password && 'border-red-500'}`}
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded hover:cursor-pointer" type="submit">
                                    Signup
                                </button>
                            </div>
                        </form>
                        <footer className='text-center'>
                            <Link className="text-indigo-700 hover:text-pink-700 text-sm" to="/login">Login</Link>
                        </footer>
                    </div>
            }
        </div>
    );
};

export default Signup;

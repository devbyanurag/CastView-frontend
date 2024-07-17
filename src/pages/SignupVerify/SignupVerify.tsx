import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { apiInstance } from '../../utils/api';
import { login } from '../../store/slices/authSlice';



const SignupVerify: React.FC = () => {
    let { token } = useParams();

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const verifySignup = async () => {
            if (token) {
                try {
                    const response = await apiInstance.get(`user/verifyLogin/${token}`);

                    if (response.status == 200) {
                        dispatch(login(response.data.user));

                        navigate('/')
                    }

                } catch (error) {

                }
            }
            setLoading(false)
        };

        verifySignup();
    }, [])



    return (
        <div className="flex" style={{ height: 'calc(100vh - 4rem)', background: `linear-gradient(188deg, #BC69F4 0%, #FECA8E 100%)` }}>
            <div className="w-full max-w-xs md:max-w-sm m-auto bg-[#ffffff] rounded p-5 shadow-xl">
                <header>
                    <img className="w-20 mx-auto mb-5 border-4 rounded-md shadow-lg" src={logoImg} alt="Logo" />
                </header>
                {loading ? <p className='my-2'>Please Wait We are Verifying your account</p> : <p className='my-2'>Account Verified Successfully</p>}

            </div>
        </div>
    );
};

export default SignupVerify;

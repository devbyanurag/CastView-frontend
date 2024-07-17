import { useEffect, useMemo, useRef, useState } from 'react';
import logoImg from '../../assets/logo.png';
import { LogoName, UserRoles } from '../../utils/variables';
import useResponsiveWidth from '../../utils/windowSize';
import { Card } from '../../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/authSlice';
import AddModal from '../../components/AddModal/AddModal';
import { apiInstance } from '../../utils/api';
import { toast } from 'react-toastify';
import { PostType } from '../../utils/types';
import SocialMedia from '../../components/SocialMedia/SocialMedia';



const Home = () => {
    const screenWidth = useResponsiveWidth().width < 768;
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [modalIsOpen, setIsOpen] = useState(false);
    const [pageNo, setPageNo] = useState<number>(1);
    const [posts, setPosts] = useState<PostType[]>([]);
    const loader = useRef<HTMLDivElement | null>(null);
    const [completedPost, setcompletedPost] = useState(false)


    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const leftCards = useMemo(() => {
        return posts.map((data, index) => {
            if (!screenWidth && index % 2 !== 0) return null;
            return <Card data={data} index={index} key={index} />;
        });
    }, [screenWidth, posts]);

    const rightCards = useMemo(() => {
        return posts.map((data, index) => {
            if (index % 2 === 0) return null;
            return <Card data={data} index={index} key={index} />;
        });
    }, [posts]);

    useEffect(() => {
        const getPosts = async (page: number) => {
            try {
                const response = await apiInstance.post(`post/getpost?page=${page}`);
                if (response.status == 200) {
                    setPosts(prevPosts => [...prevPosts, ...response.data]);
                    console.log(response.data.length)
                    if (response.data.length<10) {
                        setcompletedPost(true)
                    }
                }
            } catch (error) {
                toast.error('Failed to load posts. Please try again.');
            }
        };
        getPosts(pageNo);
    }, [pageNo]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setPageNo(prevPageNo => prevPageNo + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    return (
        <div className="container w-full mx-auto p-4 min-h-screen">
            <div className="flex flex-wrap md:justify-center md:flex-nowrap space-y-4 md:space-y-0 md:space-x-8 items-start my-4">
                {/* left container */}
                <div className="w-full md:w-1/3 lg:w-1/4 rounded-xl shadow-lg shadow-gray-200 border-2 bg-white">
                    <div className='w-full h-44'>
                        <div className='w-full flex items-center justify-center pt-5 bg-[#88eac3]'>
                            <img src={logoImg} alt="logo" className='border-2 rounded-full h-16' />
                        </div>
                        <p className='w-full flex justify-center pt-2 bg-[#88eac3] text-white text-2xl ' style={{ fontFamily: 'Playfair Display', fontWeight: 'bold' }}>{LogoName}</p>
                        <div className='w-full relative'>
                            <svg className='absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#88eac3" fillOpacity="1" d="M0,128L24,144C48,160,96,192,144,192C192,192,240,160,288,138.7C336,117,384,107,432,112C480,117,528,139,576,170.7C624,203,672,245,720,240C768,235,816,181,864,144C912,107,960,85,1008,106.7C1056,128,1104,192,1152,208C1200,224,1248,192,1296,170.7C1344,149,1392,139,1416,133.3L1440,128L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className='w-full flex justify-center mb-5 text-center flex-col mt-12 :mt-5'>
                        <p>Pan India Casting Agency <br /> Line Production, Casting, Events</p>
                        <SocialMedia />
                        {(user?.role == UserRoles.User || user?.role == UserRoles.Admin) && <button className='border w-3/4 self-center py-2 mb-2 shadow-md shadow-green-100' onClick={openModal}>Add New</button>}
                        <button className='border w-3/4 self-center py-2 mb-2 shadow-md shadow-green-100' onClick={() => dispatch(logout())}>Logout</button>
                        <AddModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
                    </div>
                </div>
                {/* right container */}
                <div className="w-full md:w-2/3 lg:w-2/3 flex md:space-x-4 items-start">
                    <div className='w-full lg:w-[calc(50%-0.5rem)]'>
                        {leftCards}
                    </div>
                    <div className='w-full lg:w-[calc(50%-0.5rem)] hidden md:block'>
                        {rightCards}
                    </div>
                </div>
            </div>
            <div ref={loader} className={`loader ${completedPost && 'hidden'}`}>
                Loading...
            </div>
        </div>
    );
};

export default Home;

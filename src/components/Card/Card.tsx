import { LogoName, colorCardScema } from "../../utils/variables";
import logoImg from '../../assets/logo.png';
import { PostType } from "../../utils/types";
import { getTimeAgo } from "../../utils/dateConvertor";



export const Card = ({ data, index }: {
    data: PostType;
    index: number;
}) => {
    const colors = colorCardScema[index % colorCardScema.length];

    return (
        <div className='shadow-blue-200 border-2 p-4 w-full mb-2 rounded-md' style={{ color: 'white', background: `linear-gradient(188deg, ${colors.firstColor} 0%, ${colors.secondColor} 100%)` }}>
            <div className='flex items-center justify-center'>
                <img src={logoImg} alt="logo" className='border-2 rounded-full h-10' />
                <div className='mx-4'>
                    <p className='font-medium'>{LogoName}</p>
                    <p className='text-xs'>{getTimeAgo(data.createdAt)}</p>
                </div>
            </div>
            <div>
                <p className="whitespace-pre-line my-4">
                    {data.heading}
                </p>
                <p className="whitespace-pre-line my-4">
                    {data.details}
                </p>
                {
                    (data.imglink && data.imglink !== "0") ?
                    <div className='w-full flex justify-center my-4'>
                        <img loading="lazy" src={data.imglink} alt="logo" className='max-w-full max-h-96' />
                    </div>:
                    <div className='w-full flex justify-center my-4'>
                    <img loading="lazy" src={logoImg} alt="logo" className='max-w-full max-h-96 opacity-80' />
                </div>
                }
            </div>
            <div className='md:flex w-full pt-2 border-t-2 md:space-x-5'>
                <div className={`w-full md:w-1/2 border border-transparent hover:border-white  flex justify-center py-4 shadow-lg hover:cursor-pointer`}>
                    <p>Interested</p>
                </div>
                <div className={`w-full md:w-1/2 border border-transparent hover:border-white  flex justify-center py-4 shadow-lg hover:cursor-pointer`}>
                    <p>Share</p>
                </div>
            </div>
        </div>
    );
};

import logoImg from '../../assets/logo.png'
import { LogoName } from '../../utils/variables'

const Header = () => {

    return (
        <div className='w-full bg-white p-2 h-16'>
            <div className='flex items-center hover:cursor-pointer'>
                <img src={logoImg} alt="" className='h-12 border' />
                <p className='mx-2 text-xl'  style={{fontFamily:'Playfair Display', fontWeight:'bold'}} >{LogoName}</p>
            </div>
        </div>
    )
}

export default Header
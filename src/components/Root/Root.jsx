
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';


const Root = () => {
   
    return (
        <div className='bg-[#F2F4FE]'>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from './Page';
import Navbar from './Navbar';
// import { IUserProfile } from '../interfaces/UserProfile';

const Layout = ({ children, title, user }: { children: any; title: string; user?:any }) => {
	return (
		<div 
		style={{ maxWidth: "100vw" }}
		>
			<Head>
				<link rel='preload' href='/fonts/poppins/Poppins-Regular.ttf' as='font' crossOrigin='' />
				<title>{title ?? 'LMS'}</title>
			</Head>
			<ToastContainer
				position='top-center'
				autoClose={5000}
				hideProgressBar={true}
				closeOnClick></ToastContainer>
			<div 
		style={{ maxWidth: "100vw" }}
			 className='container w-screen overflow-auto'>
                    <Navbar />
					<Page user={user as any}>{children}</Page>

			</div>
		</div>
	);
};

export default Layout;
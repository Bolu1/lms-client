// import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
// import { IUserProfile } from '../interfaces/UserProfile';
import avatarImg from '../../public/images/avatar.png';
import { useRouter } from 'next/router';

const Page = ({ children, user }: { children: any; user: any }) => {
	const router = useRouter();


	return (
		<div className="mt-24">
				<>{children}</>
		</div>
	);
};

export default Page;
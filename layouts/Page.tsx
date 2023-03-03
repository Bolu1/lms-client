// import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
// import { IUserProfile } from '../interfaces/UserProfile';
import avatarImg from '../../public/images/avatar.png';
import { useRouter } from 'next/router';

const Page = ({ children, user }: { children: any; user: any }) => {
	const router = useRouter();

	const exclude = ['/auth/login', '/' , '/auth/register'];
	const shouldHide = exclude.includes(router.pathname);



	return (
		<>
		{shouldHide?
		(
		<div
		className="">
				<>{children}</>
		</div>
		):
		(
			<div 
		style={{ marginTop: "6rem" }}
		className="mt-24">
				<>{children}</>
		</div>
		)
		}
		</>
	);
};

export default Page;
import styles from './ProfileDatas.module.scss'

import Link from 'next/link';
import { useRouter } from 'next/router'

import { useUserAuth } from "../../context/UserAuthContext";

interface IProfileDatas {
    photoUrl?: string;
    email: string;
    name: string;
    lastName: string;
    displayName: string;
    phoneNumber: string;
}

const ProfileDatas = (props: IProfileDatas) => {
    const { logOut } = useUserAuth();
    const router = useRouter();

    const { email, name, lastName, displayName, phoneNumber } = props;

    const handleLogout = async () => {
        try {
            await logOut();
            router.push('/login')
        } catch (error: any) {
            // console.log(error.message);
        }
    }

    return (
        <>
            <div className={styles.datas}>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Email</span>
                    <span>{email}</span>
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Name</span>
                    <span>{name}</span>
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Last name</span>
                    <span>{lastName}</span>
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Display name</span>
                    <span>{displayName}</span>
                </div>
                <div className={styles.lineData}>
                    <span className={styles.opacity}>Phone number</span>
                    <span>{phoneNumber}</span>
                </div>
            </div>
            <div className={styles.links}>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <Link href={'profile/dataChangerPage'}>Change data</Link>
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <Link href={'profile/passwordChangerPage'}>Change password</Link>
                </div>
                <div className={styles.lineData}>
                    <span onClick={handleLogout}>Log Out</span>
                </div>
            </div>
        </>
    )
}

export default ProfileDatas 
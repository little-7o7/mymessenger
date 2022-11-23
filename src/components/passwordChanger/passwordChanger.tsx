import styles from './passwordChanger.module.scss'
import { Button, Input } from '@chakra-ui/react';

import { useRouter } from 'next/router'
import { useState } from 'react';

import { auth } from '../../../firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const PasswordChanger = () => {
    const router = useRouter();
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError('');

        if (event.target[1].value === event.target[2].value && event.target[0].value.length !== 0 && event.target[1].value.length !== 0) {
            const credential = EmailAuthProvider.credential(
                auth.currentUser!.email!,
                event.target[0].value
            )

            reauthenticateWithCredential(auth.currentUser!, credential)
                .then(() => {
                    const newPassword = event.target[2].value;
                    updatePassword(auth.currentUser!, newPassword);
                })
                .then(() => {
                    // alert('password changed')
                    router.push('/profile')
                })
                .catch((error) => {
                    setError(error.message);
                });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.datas}>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Old password</span>
                    <Input type='password' height={'35px'} w={300} textAlign='end' />
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>New password</span>
                    <Input type='password' height={'35px'} w={300} textAlign='end' />
                </div>
                <div className={styles.lineData}>
                    <span className={styles.opacity}>Repeat new password</span>
                    <Input type='password' height={'35px'} w={300} textAlign='end' />
                </div>
                <div className={styles.error}>
                    <span style={error.length === 0 ? { opacity: '0' } : { opacity: '1' }}>{error}</span>
                </div>
                <div className={styles.links}>
                    <Button type='submit' w={'100%'}>Save</Button>
                </div>
            </div>
        </form>
    )
}

export default PasswordChanger 
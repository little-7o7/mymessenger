import styles from './dataChanger.module.scss'
import { Button, Input } from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router'

import { useAppDispatch } from '../../../app/hooks';
import { changeDisplayName, changeEmail, changeName, changeLastName, changePhoneNumber } from '../../../app/slices/userDatasSlice'

import { auth, db } from '../../../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail, updateProfile } from 'firebase/auth';

interface IDataChanger {
    uid: string
    email: string;
    name: string;
    lastName: string;
    displayName: string;
    phoneNumber: string;
}

const DataChanger = (props: IDataChanger) => {
    const router = useRouter();
    const { uid, email, name, lastName, displayName, phoneNumber, } = props;
    const [error, setError] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setError('');

        const credential = EmailAuthProvider.credential(
            auth.currentUser!.email!,
            event.target[5].value
        )

        reauthenticateWithCredential(auth.currentUser!, credential)
            .then(() => {
                updateEmail(auth.currentUser!, event.target[0].value)
                    .then(() => {
                        dispatch(changeEmail(event.target[0].value));
                        updateProfile(auth.currentUser!, {
                            displayName: event.target[3].value
                        }).then(() => {
                            dispatch(changeDisplayName(event.target[3].value))
                        }).then(() => {
                            updateDoc(doc(db, "users", uid), {
                                displayName: event.target[3].value,
                                email: event.target[0].value,
                                lastName: event.target[2].value,
                                name: event.target[1].value,
                                phoneNumber: event.target[4].value,
                            });
                            dispatch(changeName(event.target[1].value))
                            dispatch(changeLastName(event.target[2].value))
                            dispatch(changePhoneNumber(event.target[4].value))
                        }).catch((error) => {
                            // console.log(error)
                        });
                    }).catch((error) => setError(error.message));
            })
            .then(() => {
                router.push('/profile')
            }).catch((error) => setError(error.message));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.datas}>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Email</span>
                    <Input type='email' height={'35px'} w={300} textAlign='end' defaultValue={email} />
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Name</span>
                    <Input type='text' height={'35px'} w={300} textAlign='end' defaultValue={name} />
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Last name</span>
                    <Input type='text' height={'35px'} w={300} textAlign='end' defaultValue={lastName} />
                </div>
                <div className={`${styles.lineData} ${styles.borderedLineData}`}>
                    <span className={styles.opacity}>Display name</span>
                    <Input type='text' height={'35px'} w={300} textAlign='end' defaultValue={displayName} />
                </div>
                <div className={styles.lineData}>
                    <span className={styles.opacity}>Phone number</span>
                    <Input type='text' height={'35px'} w={300} textAlign='end' defaultValue={phoneNumber} />
                </div>
                <div className={styles.passwordForVer}>
                    <div className={styles.lineData}>
                        <span className={styles.opacity}>Password for verification</span>
                        <Input type='password' height={'35px'} w={300} textAlign='end' />
                    </div>
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

export default DataChanger 
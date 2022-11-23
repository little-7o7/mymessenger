import styles from './SinginForm.module.scss'
import LoginSinginInput from '../LoginSinginInput/LoginSinginInput';

import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { useUserAuth } from "../../../src/context/UserAuthContext";
import { auth, db } from '../../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from 'firebase/auth';

import { useAppDispatch } from '../../../app/hooks';
import { changeDisplayName, changeEmail} from '../../../app/slices/userDatasSlice'

const SinginForm = () => {
    const { signUp } = useUserAuth();
    const [errorStatus, setErrorStatus] = useState(false)
    const dispatch = useAppDispatch();
    let router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (event.target[2].value === event.target[3].value) {
            setErrorStatus(false)

            try {
                await signUp(event.target[1].value, event.target[2].value)
                    .then(() => {
                        dispatch(changeEmail(event.target[1].value));
                        updateProfile(auth.currentUser!, {
                            displayName: event.target[0].value
                        }).then(() => {
                            dispatch(changeDisplayName(event.target[0].value))
                        }).then(() => {
                            setDoc(doc(db, "users", auth.currentUser!.uid), {
                                displayName: event.target[0].value,
                                email: event.target[1].value,
                                name: '',
                                lastName: '',
                                phoneNumber: '',
                                photoUrl: '',
                                uid: auth.currentUser!.uid,
                            });
                            setDoc(doc(db, "userChats", auth.currentUser!.uid), {});
                            // alert('datas posted')
                        }).catch((error) => {
                            // console.log(error)
                        });
                    })
                await router.push('/')
            } catch (err) {
                // console.log(err);
                setErrorStatus(true)
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <LoginSinginInput type='text' labelText='Display name' />
                <LoginSinginInput type='text' labelText='Email' />
                <LoginSinginInput type='password' labelText='Password' />
                <LoginSinginInput type='password' labelText='Repeat Password' />
                <span className={styles.error} style={errorStatus ? { opacity: 1 } : { opacity: 0 }}>Check Email and Password</span>
                <button>Sign up</button>
            </form>
            <span className={styles.registerLink}>
                <Link href='/login'>Sing in</Link>
            </span>
        </div>
    )
}

export default SinginForm
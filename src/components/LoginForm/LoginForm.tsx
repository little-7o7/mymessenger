import styles from './LoginForm.module.scss'
import LoginSinginInput from '../LoginSinginInput/LoginSinginInput';

import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
    const [errorStatus, setErrorStatus] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/')
        } catch (err) {
            setErrorStatus(true);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <LoginSinginInput type='text' labelText='Email' />
                <LoginSinginInput type='password' labelText='Password' />
                <span className={styles.error} style={errorStatus ? { opacity: 1 } : { opacity: 0 }}>Check Email and Password</span>
                <button>Sign in</button>
            </form>
            <span className={styles.registerLink}>
                <Link href='/register'>Create account</Link>
            </span>
        </div>
    )
}

export default LoginForm
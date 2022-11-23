import styles from './LoginSinginInput.module.scss'

import { useState } from 'react';

interface ILoginSinginInput {
    type: string;
    labelText: string;
    defaultValue?: number | string
}

const LoginSinginInput = (props: ILoginSinginInput) => {
    const [passStatus, setPassStatus] = useState(props.type)
    if (props.type === 'password') {
        let eye;
        if (passStatus === 'password') {
            eye = '🙈'
        } else {
            eye = '🙉'
        }

        const handleClick = () => {
            if (passStatus === 'password') {
                setPassStatus('text')
            } else {
                setPassStatus('password')
            }
        }

        return (
            <div className={styles.inputGroup}>
                <label>{props.labelText}</label>
                <input defaultValue={props.defaultValue} type={passStatus} name={props.type} style={{ paddingRight: '40px' }} />
                <span className={styles.eye} onClick={handleClick}>{eye}</span>
            </div>
        )
    }

    return (
        <div className={styles.inputGroup}>
            <label>{props.labelText}</label>
            <input defaultValue={props.defaultValue} type={props.type} name={props.type} />
        </div>
    )
}

export default LoginSinginInput
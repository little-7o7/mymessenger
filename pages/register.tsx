import type { NextPage } from 'next'
import Head from 'next/head'

import LoginSinginLayout from '../src/layouts/LoginSinginLayout/LoginSinginLayout'
import SinginForm from '../src/components/SinginForm/SinginForm';

const Register: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Register</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>

            <LoginSinginLayout>
                <SinginForm />
            </LoginSinginLayout>
        </div>
    )
}

export default Register
import type { NextPage } from 'next'
import Head from 'next/head'

import LoginSinginLayout from '../src/layouts/LoginSinginLayout/LoginSinginLayout'
import LoginForm from '../src/components/LoginForm/LoginForm';

const Login: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>

            <LoginSinginLayout>
                <LoginForm />
            </LoginSinginLayout>
        </div>
    )
}

export default Login
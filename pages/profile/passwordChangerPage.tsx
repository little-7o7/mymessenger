import type { NextPage } from 'next'
import Head from 'next/head'

import { useAppSelector } from '../../app/hooks';

import PasswordChanger from '../../src/components/passwordChanger/passwordChanger'
import ProfileLayout from '../../src/layouts/ProfileLayout/ProfileLayout'

const DataChangerPage: NextPage = () => {
    const { displayName, photoUrl } = useAppSelector((state) => state.userDatas)

    return (
        <div>
            <Head>
                <title>Password Changer</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>
            <ProfileLayout
                displayName={displayName}
                photoUrl={photoUrl}
            >
                <PasswordChanger/>
            </ProfileLayout>
        </div>
    )
}

export default DataChangerPage
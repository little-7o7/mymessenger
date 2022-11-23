import type { NextPage } from 'next'
import Head from 'next/head'

import { useAppSelector } from '../../app/hooks';

import ProfileDatas from '../../src/components/ProfileDatas/ProfileDatas'
import ProfileLayout from '../../src/layouts/ProfileLayout/ProfileLayout'

const Profile: NextPage = () => {
    const { displayName, photoUrl, uid, email, name, lastName, phoneNumber } = useAppSelector((state) => state.userDatas)

    return (
        <div>
            <Head>
                <title>Profile</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>
            <ProfileLayout
                displayName={displayName}
                photoUrl={photoUrl}
            >
                <ProfileDatas
                    email={email}
                    name={name}
                    lastName={lastName}
                    displayName={displayName}
                    phoneNumber={phoneNumber}
                />
            </ProfileLayout>
        </div>
    )
}

export default Profile
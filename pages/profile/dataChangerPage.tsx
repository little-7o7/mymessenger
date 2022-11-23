import type { NextPage } from 'next'
import Head from 'next/head'

import { useAppSelector } from '../../app/hooks';

import DataChanger from '../../src/components/DataChanger/dataChanger'
import ProfileLayout from '../../src/layouts/ProfileLayout/ProfileLayout'

const DataChangerPage: NextPage = () => {
    const { displayName, photoUrl, uid, email, name, lastName, phoneNumber } = useAppSelector((state) => state.userDatas)

    return (
        <div>
            <Head>
                <title>Data Changer</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>
            <ProfileLayout
                displayName={displayName}
                photoUrl={photoUrl}
            >
                <DataChanger
                    uid={uid}
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

export default DataChangerPage
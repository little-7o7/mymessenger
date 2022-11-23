import ErrorPage from '../src/pages/ErrorPages/ErrorPages'

import type { NextPage } from 'next'
import Head from 'next/head'

const Page500: NextPage = () => {
    return (
        <div>
            <Head>
                <title>500</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>
            <ErrorPage error={500} title='Oops! Something went wrong.' />
        </div>
    )
}

export default Page500
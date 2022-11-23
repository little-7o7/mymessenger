import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react';

import { useUserAuth } from "../src/context/UserAuthContext";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectChat } from '../app/slices/selectedChatSlice';

import ChatsResizerLayout from '../src/layouts/ChatsResizerLayout/ChatsResizerLayout'
import Chats from '../src/components/Chats/Chats';
import Contacts from '../src/components/Contacts/Contacts';
import Chat from '../src/components/Chat/Chat';

const Index: NextPage = () => {
    const { user } = useUserAuth();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const navigationPanelStatus = useAppSelector((state) => state.navigationPanel.value);

    useEffect(() => {
        if (user === null) {
            router.push('/login')
        }
        document.addEventListener('keyup', function (event) {
            if (event.key === "Escape") {
                dispatch(selectChat(''))
            }
        });
    }, [user]);


    return (
        <div>
            <Head>
                <title>myMessenger</title>
                <meta name="description" content="Creater by little_7o7" />
            </Head>
            <ChatsResizerLayout chats={
                navigationPanelStatus === 'chats' ?
                    <Chats /> :
                    <Contacts />
            }>
                <Chat />
            </ChatsResizerLayout>
        </div>
    )
}

export default Index
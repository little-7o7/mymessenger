import '../src/styles/globals.scss'

import type { AppProps } from 'next/app'
import { useEffect } from 'react';

import { Provider } from 'react-redux'
import { store } from '../app/store'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { UserAuthContextProvider } from "../src/context/UserAuthContext";
import UserDatas from '../src/context/UserDatas'


function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', 'dark');
    }, [])

    return (
        <ChakraProvider>
            <ColorModeScript initialColorMode={'dark'} />
            <Provider store={store}>
                <UserAuthContextProvider>
                    <UserDatas>
                        <Component {...pageProps} />
                    </UserDatas>
                </UserAuthContextProvider>
            </Provider>
        </ChakraProvider>
    )
}

export default MyApp

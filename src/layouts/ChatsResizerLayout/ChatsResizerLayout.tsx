import styles from './ChatsResizerLayout.module.scss'
import { InputGroup, InputLeftElement, Input, IconButton } from '@chakra-ui/react';
import { CgSearch } from 'react-icons/cg';
import { BsPersonSquare, BsPersonCircle } from 'react-icons/bs';
import { TbMessages } from 'react-icons/tb';

import { useRef, useEffect } from 'react';
import Link from 'next/link';

import { contacts, chats } from '../../../app/slices/navigationPanelSlice'
import { useAppSelector, useAppDispatch } from '../../../app/hooks';

interface IChatsResizerLayout {
    children: any;
    chats: any;
}

const ChatsResizerLayout = (props: IChatsResizerLayout) => {
    const navigationPanelStatus = useAppSelector((state) => state.navigationPanel.value)
    const dispatch = useAppDispatch()

    const ref = useRef(null)
    const refResizer = useRef(null)

    useEffect(() => {
        const resizeanbleEle: any = ref.current;
        const style = window.getComputedStyle(resizeanbleEle);
        let width = parseInt(style.width, 10);
        let x = 0;
        let y = 0;

        const onMouseMoveUpRightSize = (event: any) => {
            const dx = event.clientX - x;
            x = event.clientX;
            width = width + dx;
            resizeanbleEle.style.width = `${width}px`;
        }

        const onMouseUpRightResize = (event: any) => {
            document.removeEventListener('mousemove', onMouseMoveUpRightSize);
        }

        const onMouseDownRightResize = (event: any) => {
            x = event.clientX;
            resizeanbleEle.style.left = style.left;
            resizeanbleEle.style.right = null;
            document.addEventListener('mousemove', onMouseMoveUpRightSize);
            document.addEventListener('mouseup', onMouseUpRightResize);
        }

        const resizerRight = refResizer.current;
        refResizer.current.addEventListener('mousedown', onMouseDownRightResize);

        return () => {
            resizerRight.removeEventListener('mousedown', onMouseDownRightResize);
        }
    }, [])

    const dispatchChat = () => {
        if (navigationPanelStatus !== 'chats') {
            dispatch(chats())
        }
    }

    const dispatchContacts = () => {
        if (navigationPanelStatus !== 'contacts') {
            dispatch(contacts())
        }
    }

    const onkeypressed = (e) => {
        const code = e.charCode || e.keyCode;
        if (code == 27) {
            e.target.value = '';
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div ref={ref} className={styles.resizeable}>
                    <div className={styles.searchPanel}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <CgSearch size={'20px'} color='' />
                            </InputLeftElement>
                            <Input type='tel' placeholder='Search' onKeyDown={onkeypressed} />
                        </InputGroup>
                    </div>
                    <div className={styles.scroll}>
                        <div className={styles.chats}>
                            {props.chats}
                        </div>
                    </div>
                    <div className={styles.navigationPanel}>
                        <IconButton
                            border={'none'}
                            variant='outline'
                            aria-label='contacts'
                            onClick={dispatchContacts}
                            icon={<BsPersonSquare size={'30px'} color={navigationPanelStatus === 'contacts' ? '#3369f3' : ''} />}
                        />
                        <IconButton
                            border={'none'}
                            variant='outline'
                            aria-label='chats'
                            onClick={dispatchChat}
                            icon={<TbMessages size={'30px'} color={navigationPanelStatus === 'chats' ? '#3369f3' : ''} />}
                        />
                        <Link href={'/profile'}>
                            <IconButton
                                border={'none'}
                                variant='outline'
                                aria-label='profile'
                                icon={<BsPersonCircle size={'30px'} />}
                            />
                        </Link>
                    </div>
                    <div ref={refResizer} className={styles.resizer}></div>
                </div>
            </div>
            <div className={styles.messenges}>
                {props.children}
            </div>
        </div >
    )
}

export default ChatsResizerLayout
import styles from './Chats.module.scss'
import { MdImageNotSupported } from 'react-icons/md'

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectChat, selectedUid, selectedDisplayName, selectedPhotoUrl, selectedMessages } from '../../../app/slices/selectedChatSlice';

import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

interface IChats {

}

const Chats = (props: IChats) => {
    const dispatch = useAppDispatch();
    const userChats = useAppSelector((state) => state.userChats.value);
    const selectedChat = useAppSelector((state) => state.selectedChat.value);

    const getTimeForChats = (timestamp: number) => {
        const date = new Date(timestamp)
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }

    const handleClick = async (chatId: string, uid: string, displayName: string, photoUrl: string) => {
        await onSnapshot(doc(db, "chats", chatId), (ref) => {
            dispatch(selectedMessages(ref.data()!.messages));
            dispatch(selectChat(chatId));
            dispatch(selectedUid(uid));
            dispatch(selectedDisplayName(displayName));
            dispatch(selectedPhotoUrl(photoUrl));
        });
    }

    return (
        <div className={styles.container}>
            {
                userChats !== undefined ?
                    Object.values(userChats)?.sort((a, b) => b.date - a.date).map((chat: any) => (
                        <div
                            key={chat.chatId}
                            className={styles.chat}
                            style={selectedChat === chat.chatId ? { backgroundColor: '#343a4f' } : {}}
                            onClick={() => handleClick(chat.chatId, chat.userInfo.uid, chat.userInfo.displayName, chat.userInfo.photoUrl)}
                        >
                            {chat.userInfo.photoUrl !== '' ? <img className={styles.img} src={chat.userInfo.photoUrl} /> : <div className={styles.div}><MdImageNotSupported size={25} /></div>}
                            <div className={styles.texts}>
                                <div className={styles.top}>
                                    <span>{chat.userInfo.displayName}</span>
                                    <span className={styles.span1}>{getTimeForChats(chat.date)}</span>
                                </div>
                                <span className={styles.span2}>{chat.lastMessage}</span>
                            </div>
                        </div>
                    ))
                    : <span className={styles.dontChats}>You don't have chats</span>
            }
        </div>
    )
}

export default Chats
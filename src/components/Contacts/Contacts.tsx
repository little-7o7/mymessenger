import styles from './Contacts.module.scss'
import { MdImageNotSupported } from 'react-icons/md'

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { selectChat } from '../../../app/slices/selectedChatSlice';
import { chats } from '../../../app/slices/navigationPanelSlice';

import { db } from "../../../firebase";
import { doc, setDoc, Timestamp, addDoc, updateDoc } from 'firebase/firestore';

interface IContacts { }

const Contacts = (props: IContacts) => {
    const dispatch = useAppDispatch();
    const contactsDatas = useAppSelector(state => state.contactsDatas.value);
    const { uid, displayName, photoUrl } = useAppSelector(state => state.userDatas);
    const userChats = useAppSelector(state => state.userChats.value);

    const handleClick = async (uidAdd: string, displayNameAdd: string, photoUrlAdd: string) => {
        // const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000)
        // console.log(date);

        const getUserChastOfFirebase = async () => {
            const time = Timestamp.now();
            const chatIDs = `${uid}_${uidAdd}`;

            await updateDoc(doc(db, "userChats", uid), {
                [uidAdd]: {
                    date: time.seconds * 1000 + time.nanoseconds / 1000000,
                    lastMessage: '',
                    userInfo: {
                        uid: uidAdd,
                        displayName: displayNameAdd,
                        photoUrl: photoUrlAdd,
                    },
                    chatId: chatIDs
                }
            });

            await updateDoc(doc(db, "userChats", uidAdd), {
                [uid]: {
                    date: time.seconds * 1000 + time.nanoseconds / 1000000,
                    lastMessage: '',
                    userInfo: {
                        uid: uid,
                        displayName: displayName,
                        photoUrl: photoUrl,
                    },
                    chatId: chatIDs
                }
            });

            await setDoc(doc(db, "chats", chatIDs), {
                messages: []
            });
        }

        if (userChats === undefined) {
            await getUserChastOfFirebase()
        } else {
            if (Reflect.has(userChats, uidAdd)) {
                await dispatch(chats())
                await dispatch(selectChat(userChats[uidAdd].chatId))
            } else {
                await getUserChastOfFirebase()
            }
        }
    }

    return (
        <div className={styles.container}>
            {contactsDatas.length <= 1 ? <span className={styles.found}>Users not found!</span> :
                contactsDatas.map(item => item.uid !== uid ?
                    (
                        <div key={item.uid} className={styles.contact} onClick={() => handleClick(item.uid, item.displayName, item.photoUrl)} >
                            {item.photoUrl !== '' ? <img className={styles.img} src={item.photoUrl} /> : <div className={styles.div}><MdImageNotSupported size={25} /></div>}
                            <span> {item.displayName}</span>
                        </div >
                    ) : '')
            }
        </div >
    )
}

export default Contacts
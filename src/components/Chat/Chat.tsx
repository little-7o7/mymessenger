import styles from './Chat.module.scss'
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDelete } from 'react-icons/md';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import { Button, Input } from '@chakra-ui/react'
import Message from '../Message/Message';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useRef, useEffect, useState } from 'react';

import { db, storage } from "../../../firebase";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { uuidv4 } from '@firebase/util';

interface IChat {

}

const Chat = (props: IChat) => {
    const { value, messages, uid, displayName, photoUrl } = useAppSelector((state) => state.selectedChat)
    const currentUserUid = useAppSelector((state) => state.userDatas.uid)

    const scrollRef = useRef(null);
    const [modalStatus, setModalStatus] = useState(false);
    const [fileModalStatus, setFileModalStatus] = useState(false);
    const [image, setImage] = useState(null)
    const [buttonStatus, setButtonStatus] = useState(true)

    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const handleDelete = (e: any) => {
        console.log('delete');
    }

    const onFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setButtonStatus(false)
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleFileSelect = async (event: any) => {
        event.preventDefault();
        const file = await event.target[0]?.files[0]
        const time = Timestamp.now();
        const date = time.seconds * 1000 + time.nanoseconds / 1000000;
        const uuid = uuidv4()

        if (!file) return;
        const storageRef = await ref(storage, `${value}_${uuid}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on("state_changed",
            (snapshot) => { },
            (error) => {
                // console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateDoc(doc(db, "chats", value), {
                        messages: arrayUnion({
                            id: uuid,
                            file: downloadURL,
                            senderId: currentUserUid,
                            date: date,
                        }),
                    });
                    updateDoc(doc(db, "userChats", uid), {
                        [currentUserUid + ".lastMessage"]: 'file',
                        [currentUserUid + ".date"]: time.seconds * 1000 + time.nanoseconds / 1000000,
                    });
                    updateDoc(doc(db, "userChats", currentUserUid), {
                        [uid + ".lastMessage"]: 'file',
                        [uid + ".date"]: time.seconds * 1000 + time.nanoseconds / 1000000,
                    });
                });
            }
        );
        await setFileModalStatus(false);
    }

    const handleSendMessage = async (event: any) => {
        event.preventDefault();
        if (event.target[0].value.length !== 0) {
            const time = Timestamp.now();
            const date = time.seconds * 1000 + time.nanoseconds / 1000000;

            await updateDoc(doc(db, "chats", value), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text: event.target[0].value,
                    senderId: currentUserUid,
                    date: date,
                }),
            }).then(async () => {
                await updateDoc(doc(db, "userChats", uid), {
                    [currentUserUid + ".lastMessage"]: event.target[0].value,
                    [currentUserUid + ".date"]: time.seconds * 1000 + time.nanoseconds / 1000000,
                });
                await updateDoc(doc(db, "userChats", currentUserUid), {
                    [uid + ".lastMessage"]: event.target[0].value,
                    [uid + ".date"]: time.seconds * 1000 + time.nanoseconds / 1000000,
                });
            })
            event.target[0].value = '';
        }
    }

    return (
        <div className={styles.container}>
            {value !== '' ?
                <>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <img src={photoUrl} alt="" />
                            <span>{displayName}</span>
                        </div>
                        <div className={styles.right}>
                            <GiHamburgerMenu size={25} onClick={() => setModalStatus(true)} />
                        </div>
                    </div>
                    <div className={styles.scrool}>
                        <div className={styles.main}>
                            {messages.length !== 0 ?
                                messages.map(message => (
                                    <Message key={message.id}
                                        id={message.id}
                                        senderId={message.senderId}
                                        date={message.date}
                                        text={message.text}
                                        file={message.file}
                                        currentUserUid={currentUserUid}
                                    />))
                                : 'Messages not'
                            }
                            <div ref={scrollRef}></div>
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.radiusButton} onClick={() => setFileModalStatus(true)}>
                            <AiOutlineFileAdd size={25} />
                        </div>
                        <form onSubmit={handleSendMessage}>
                            <div className={styles.textInput}>
                                <Input type='tel' placeholder='Type text' />
                            </div>
                            <button type='submit' className={styles.radiusButton}>
                                <IoSend size={20} />
                            </button>
                        </form>
                    </div>

                    {
                        modalStatus ?
                            <div className={styles.modal}>
                                <div className={styles.bg} onClick={() => setModalStatus(!modalStatus)}></div>
                                <div className={styles.center}>
                                    <div className={styles.button} onClick={handleDelete}>
                                        <MdDelete size={20} />
                                        <span>Delete</span>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        fileModalStatus ?
                            <div className={styles.fileModal}>
                                <div className={styles.bg} onClick={() => { setFileModalStatus(false); setImage(null); setButtonStatus(true) }}></div>
                                <div className={styles.center}>
                                    <span>Avatar Changer</span>
                                    <form onSubmit={handleFileSelect}>
                                        <Input type={'file'} accept="image/png, image/jpeg" onChange={onFileChange} className="filetype" />
                                        {image ?
                                            <div className={styles.imageDiv}>
                                                <img src={image} alt="preview image" />
                                            </div>
                                            : ''}
                                        <Button type='submit' disabled={buttonStatus}>Send</Button>
                                    </form>
                                </div>
                            </div>
                            : ''
                    }
                </>
                : 'Chat not selected'
            }
        </div>
    )
}

export default Chat
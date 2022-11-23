import styles from './ProfileLayout.module.scss'
import { Button, IconButton, Input } from '@chakra-ui/react'
import { BsArrowLeftShort } from 'react-icons/bs'
import { RiImageAddFill } from 'react-icons/ri';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';

import { storage, auth, db } from '../../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useAppDispatch } from '../../../app/hooks';
import { changePhotoUrl } from '../../../app/slices/userDatasSlice'
import { doc, updateDoc } from "firebase/firestore";

interface IProfileLayout {
    children: any;
    photoUrl: string;
    displayName: string;
}

const ProfileLayout = (props: IProfileLayout) => {
    const { displayName, photoUrl } = props;
    const [avatarModal, setAvatarModal] = useState(false);
    const [image, setImage] = useState(null)
    const [buttonStatus, setButtonStatus] = useState(true)
    const dispatch = useAppDispatch();
    const router = useRouter();


    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            setButtonStatus(false)
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setButtonStatus(true)
        const file = await e.target[0]?.files[0]

        if (!file) return;
        const storageRef = await ref(storage, `${displayName}${uuidv4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on("state_changed",
            (snapshot) => { },
            (error) => {
                // console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    updateProfile(auth.currentUser!, {
                        photoURL: downloadURL
                    }).then(() => {
                        dispatch(changePhotoUrl(downloadURL))
                        // console.log('uploaded');
                        setAvatarModal(false)
                        setImage(null)
                    }).then(() => {
                        updateDoc(doc(db, "users", auth.currentUser!.uid), {
                            photoUrl: downloadURL
                        });
                    }).catch((error) => {
                        // console.log(error);
                    });
                });
            }
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftLinkButton}>
                <Link href={router.pathname === '/profile' ? '/' : '/profile'}>
                    <IconButton aria-label='Go to Home' borderRadius={'100%'} backgroundColor={'#3369f3'} _hover={{ background: '#0048ff' }} icon={<BsArrowLeftShort size={'27px'} />} />
                </Link>
            </div>
            <div className={styles.main}>
                <div className={styles.mainContainer}>
                    <div className={styles.imageContainer}>
                        <div className={styles.imageDiv} style={{ backgroundImage: `url(${photoUrl})` }}>
                            {!photoUrl ? <RiImageAddFill size={70} /> : ''}
                            <button className={styles.displayModalForImage} onClick={() => setAvatarModal(!avatarModal)}>
                                <RiImageAddFill size={70} />
                            </button>
                        </div>
                        <span>{displayName}</span>
                    </div>
                    {props.children}
                </div>
            </div>
            <div className={styles.modalScreenForChangeAvatar} style={avatarModal ? { display: 'flex' } : { display: 'none' }}>
                <div className={styles.bg} onClick={() => setAvatarModal(!avatarModal)}></div>
                <div className={styles.center}>
                    <span>Avatar Changer</span>
                    <form onSubmit={handleSubmit}>
                        <Input type={'file'} accept="image/png, image/jpeg" onChange={onImageChange} className="filetype" />
                        {image ?
                            <div className={styles.imageDiv}>
                                <img src={image} alt="preview image" />
                            </div>
                            : ''}
                        <Button type='submit' disabled={buttonStatus}>Upload</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout
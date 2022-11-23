import { useEffect } from 'react';

import { auth, db } from "../../firebase";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { changeDisplayName, changePhotoUrl, changeUid, changeEmail, changeName, changeLastName, changePhoneNumber } from '../../app/slices/userDatasSlice'
import { getDatas } from '../../app/slices/contactsDatasSlice';
import { getChats } from '../../app/slices/userChatsSlice';

const UserDatas = (props: any) => {
    const dispatch = useAppDispatch();
    const { uid } = useAppSelector((state) => state.userDatas);
    const navigationPanel = useAppSelector((state) => state.navigationPanel.value);

    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
        // console.log("Auth", currentuser);
        if (auth.currentUser! !== null) {
            dispatch(changeUid(currentuser?.uid));
            dispatch(changeEmail(currentuser?.email));
            dispatch(changeDisplayName(currentuser?.displayName));
            dispatch(changePhotoUrl(currentuser?.photoURL));
            // console.log(uid);
        }
    });

    useEffect(() => {
        return () => {
            unsubscribe()
        }
    }, [auth.currentUser])

    const getData = async () => {
        if (uid === null) {
            return;
        }

        await onSnapshot(doc(db, "users", uid), (ref) => {
            dispatch(changeName(ref.data().name));
            dispatch(changeLastName(ref.data().lastName));
            dispatch(changePhoneNumber(ref.data().phoneNumber));
        })

        await onSnapshot(doc(db, "userChats", uid), (doc) => {
            dispatch(getChats(doc.data()))
        })

    }

    useEffect(() => {
        getData();
    }, [uid])


    useEffect(() => {
        (async function () {
            await onSnapshot(collection(db, "users"), (ref) => {
                const datas = ref.docs.map(doc => doc.data());
                dispatch(getDatas(datas))
            });
        }());
    }, [uid])

    return (
        <>
            {props.children}
        </>
    )
}

export default UserDatas
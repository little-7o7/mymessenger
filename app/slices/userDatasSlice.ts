import { createSlice } from '@reduxjs/toolkit'

interface userDatasState {
    displayName: string;
    photoUrl: string;
    uid: any;
    email: string;
    name: string;
    lastName: string;
    phoneNumber: string;
}

const initialState: userDatasState = {
    displayName: '',
    photoUrl: '',
    uid: null,
    email: '',
    name: '',
    lastName: '',
    phoneNumber: ''
}

export const userDatasSlice = createSlice({
    name: 'userDatas',
    initialState,
    reducers: {
        changeDisplayName: (state, action) => {
            state.displayName = action.payload
        },
        changePhotoUrl: (state, action) => {
            state.photoUrl = action.payload
        },
        changeUid: (state, action) => {
            state.uid = action.payload
        },
        changeEmail: (state, action) => {
            state.email = action.payload
        },
        changeName: (state, action) => {
            state.name = action.payload
        },
        changeLastName: (state, action) => {
            state.lastName = action.payload
        },
        changePhoneNumber: (state, action) => {
            state.phoneNumber = action.payload
        },
    },
})

export const { changeDisplayName, changePhotoUrl, changeUid, changeEmail, changeName, changeLastName, changePhoneNumber } = userDatasSlice.actions

export default userDatasSlice.reducer
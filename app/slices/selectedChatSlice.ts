import { createSlice } from '@reduxjs/toolkit'

interface selectedChatState {
    value: string;
    uid: string;
    displayName: string;
    photoUrl: string;
    messages: [];
}

const initialState: selectedChatState = {
    value: '',
    uid: '',
    displayName: '',
    photoUrl: '',
    messages: []
}

export const selectedChatSlice = createSlice({
    name: 'selectedChat',
    initialState,
    reducers: {
        selectChat: (state, action) => {
            state.value = action.payload
        },
        selectedUid: (state, action) => {
            state.uid = action.payload
        },
        selectedDisplayName: (state, action) => {
            state.displayName = action.payload
        },
        selectedPhotoUrl: (state, action) => {
            state.photoUrl = action.payload
        },
        selectedMessages: (state, action) => {
            state.messages = action.payload
        },
        selectedMessageDelete: (state, action) => {
            state.messages = state.messages.filter(item => item.id !== action.payload)
        },
        selectedMessageUpload: (state, action) => {
            state.messages = state.messages[state.messages.findIndex((obj => obj.id == action.payload.id))].text = action.payload.text
        },
    },
})

export const { selectChat, selectedUid, selectedDisplayName, selectedPhotoUrl, selectedMessages, selectedMessageDelete, selectedMessageUpload } = selectedChatSlice.actions

export default selectedChatSlice.reducer;
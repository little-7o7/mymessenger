import { createSlice } from '@reduxjs/toolkit'

interface navigationPanelState {
    value: string
}

const initialState: navigationPanelState = {
    value: 'chats',
}

export const navigationPanelSlice = createSlice({
    name: 'navigationPanel',
    initialState,
    reducers: {
        contacts: (state) => {
            state.value = 'contacts'
        },
        chats: (state) => {
            state.value = 'chats'
        },
    },
})

export const { contacts, chats } = navigationPanelSlice.actions

export default navigationPanelSlice.reducer
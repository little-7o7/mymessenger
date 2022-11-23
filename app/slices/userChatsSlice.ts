import { createSlice } from '@reduxjs/toolkit'

interface userChatsState {
    value: {}
}

const initialState: userChatsState = {
    value: {}
}

export const userChatsSlice = createSlice({
    name: 'userChats',
    initialState,
    reducers: {
        getChats: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { getChats } = userChatsSlice.actions

export default userChatsSlice.reducer;
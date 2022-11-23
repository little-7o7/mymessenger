import { createSlice } from '@reduxjs/toolkit'

interface contactsDatasState {
    value: {
        uid: string;
        displayName: string;
        photoUrl: string;
        email: string;
        name: string;
        lastName: string;
        phoneNumber: string;
    }[]
}

const initialState: contactsDatasState = {
    value: []
}

export const contactsDatasSlice = createSlice({
    name: 'contactsDatas',
    initialState,
    reducers: {
        getDatas: (state, action) => {
            state.value = action.payload
        }
    },
})

export const { getDatas } = contactsDatasSlice.actions

export default contactsDatasSlice.reducer;
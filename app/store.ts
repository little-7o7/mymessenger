import { configureStore } from "@reduxjs/toolkit";
import navigationPanelReducer from './slices/navigationPanelSlice';
import userDataReducer from './slices/userDatasSlice';
import contactsDatasReducer from './slices/contactsDatasSlice';
import userChatsReducer from "./slices/userChatsSlice";
import selectedChatReducer from "./slices/selectedChatSlice";


export const store = configureStore({
    reducer: {
        navigationPanel: navigationPanelReducer,
        userDatas: userDataReducer,
        contactsDatas: contactsDatasReducer,
        userChats: userChatsReducer,
        selectedChat: selectedChatReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
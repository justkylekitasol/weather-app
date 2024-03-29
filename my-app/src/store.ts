import { configureStore, createSlice } from "@reduxjs/toolkit";


const initialState = {value: {
    username: "",
    url: "",
    rerender: null,
    logoutFunc: null
    }}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const {login} = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
});
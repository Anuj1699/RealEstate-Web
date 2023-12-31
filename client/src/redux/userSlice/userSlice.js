import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart(state) {
            state.loading = true;
        },
        signInSuccess(state, action) {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart(state,action){
            state.loading = true;
        },
        updateUserSuccess(state,action){
            state.currentUser = action.payload
            state.loading = false;
            state.error = null;
        },
        updateUserFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart(state,action){
            state.loading = true;
        },
        deleteUserSuccess(state,action){
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        deleteUserFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        },
        logOutUserStart(state,action){
            state.loading = true;
        },
        logOutUserSuccess(state,action){
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
        logOutUserFailure(state,action){
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserFailure,deleteUserStart,deleteUserSuccess,logOutUserFailure,logOutUserStart,logOutUserSuccess} = userSlice.actions;
export default userSlice.reducer;
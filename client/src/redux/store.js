import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit"
import userReducer from "./userSlice/userSlice";
import storage from "redux-persist/lib/storage"
import {persistReducer, persistStore} from "redux-persist"

const rootReducer = combineReducers({user : userReducer})
const persistConfig = {
    key : "root",
    storage,
    version : 1
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware({
        serializableCheck : false,
    }))
});

export const persistor = persistStore(store);
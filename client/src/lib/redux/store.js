import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userSlice } from './user/userSlice'

const persistConfig = {
    key: "root",
    storage,
  };
  const rootReducer = combineReducers({ 
    user: userSlice.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer
  })
  
  export const persistor = persistStore(store);
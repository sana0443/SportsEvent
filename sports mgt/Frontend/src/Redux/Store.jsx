

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import bookingReducer from "./bookingSlice";
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig={
  key:'root',
  storage
}
const persistBookingReducer=persistReducer(persistConfig,bookingReducer)

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking:persistBookingReducer
    // Add other slices or reducers here
  },
});

export const persistor = persistStore(store)

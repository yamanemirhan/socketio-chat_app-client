import { configureStore } from "@reduxjs/toolkit";

// persist our store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import api from "../services/api.js";
import userSlice from "../features/userSlice.js";

// reducers
const reducer = combineReducers({
  user: userSlice,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [api.reducerPath],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// creating the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, api.middleware],
});

export default store;

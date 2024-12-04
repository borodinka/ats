import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";
import jobReducer from "@features/job/store/jobSlice";

import { rtkQueryErrorLogger } from "./middleware/errorMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["job"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

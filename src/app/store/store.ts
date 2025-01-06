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

import { applicantsApi } from "@features/applicant/store/applicantsApi";
import authReducer from "@features/auth/store/authSlice";
import { eventsApi } from "@features/calendar/store/eventsApi";
import jobWizardReducer from "@features/job/add-job/store/jobWizardSlice";
import { jobsApi } from "@features/job/store/jobsApi";

import { rtkQueryErrorLogger } from "./middleware/errorMiddleware";

const rootReducer = combineReducers({
  auth: authReducer,
  jobWizard: jobWizardReducer,
  [jobsApi.reducerPath]: jobsApi.reducer,
  [applicantsApi.reducerPath]: applicantsApi.reducer,
  [eventsApi.reducerPath]: eventsApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["jobWizard"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(jobsApi.middleware)
      .concat(applicantsApi.middleware)
      .concat(eventsApi.middleware)
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

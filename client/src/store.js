import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
//   import userReducer from "./Slices/userSlice";

//   import { configureStore } from "@reduxjs/toolkit";
// });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// setupListeners(store.dispatch);

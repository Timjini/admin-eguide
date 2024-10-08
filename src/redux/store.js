import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage
import userReducer from './userSlice'; // Import your reducer(s)
// import guideReducer from './guideSlice';


// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage mechanism (localStorage in this case)
};

// Create a persisted reducer using Redux Persist
const persistedUserReducer = persistReducer(persistConfig, userReducer);
// const persistedGuideReducer = persistReducer(persistConfig, guideReducer);


// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // guides: persistedGuideReducer,
  },
});

// Create the Redux Persist store
const persistor = persistStore(store);

export { store, persistor };

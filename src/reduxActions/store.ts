import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, Store } from 'redux';
import {
  Persistor,
  persistStore,
  persistReducer,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from './auth/reducer';
import ItemReducer from './item/reducer';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';

const rootReducer = combineReducers({
  auth: AuthReducer,
  item: ItemReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
  storageReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export function getStore(): Store<RootState> {
  return store;
}

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
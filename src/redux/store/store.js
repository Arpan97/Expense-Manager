import { createStore } from "redux";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import combineReducers from '../reducer/index'

const persistConfig = {
    key:'ExpenseManager',
    storage:AsyncStorage,
    stateReconciler: autoMergeLevel1,
    version:1,
    timeout:0
}

const pReducer = persistReducer(persistConfig,combineReducers)

export const store = createStore(
    pReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store);
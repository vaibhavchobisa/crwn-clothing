import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";
import { thunk } from "redux-thunk";
// commenting the above logger and writing our own, to demistify middlewares

import { rootReducer } from "./root-reducer";

const persistConfig = {
    key: 'root',
    // aliter of- storage: storage below
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// to remove middleware induced console.log(s) from the production environment:-
const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk,]
.filter(Boolean);
// Boolean function should be basically:
// function Boolean(item) {
//     if (item) return item;
// }


// Using chrome extension for monitoring state changes in Redux
const composeEnhancer = 
(process.env.NODE_ENV !== 'production' &&
window &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose; 

// const middleWares = [loggerMiddleware]

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares)); 

export const store = createStore(
    // rootReducer
    persistedReducer
    , undefined
    , composedEnhancers
    );

export const persistor = persistStore(store);
import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// commenting the above logger and writing our own, to demistify middlewares

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }
    // console.log('type: ', action.type);
    // console.log('payload: ', action.payload);
    // console.log('currentState: ', store.getState());

    next(action);

    // console.log('next state: ', store.getState());
}

// root-reducer

// const middleWares = [logger]
const middleWares = [loggerMiddleware]

const composedEnhancers = compose(applyMiddleware(...middleWares)); 

export const store = createStore(rootReducer, undefined
    ,composedEnhancers
    );
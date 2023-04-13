import { compose,createStore,applyMiddleware } from "redux";
import {persistStore,persistReducer } from "redux-persist";
import  storage  from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const persistConfig = {
    key:'root',
    blacklist:['user'],
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

const sagaMiddleware = createSagaMiddleware()
const middlewares = [process.env.NODE_ENV !== 'production' && logger,sagaMiddleware].filter(Boolean);
const composedEhancers = compose(applyMiddleware(...middlewares));


export const store = createStore(persistedReducer,undefined,composedEhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
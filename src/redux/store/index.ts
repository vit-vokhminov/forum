import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../saga';

import userReducer from './userReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    userReducer,
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

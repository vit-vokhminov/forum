import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from '../saga';

import userReducer from './userReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    userReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootWatcher);

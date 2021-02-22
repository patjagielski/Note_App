import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import dashboardReducer from '../redux/dashboard';
import filterReducer from '../redux/filters';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(combineReducers({
        dashboardReducer,
        filterReducer        
    }),
    composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}
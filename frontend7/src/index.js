import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
    notification: notificationReducer,
    users: userReducer
});
const store = createStore(reducers);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store}/>
    </Provider>,
    document.getElementById('root'));

}

render();
store.subscribe(render);

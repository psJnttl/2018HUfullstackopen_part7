import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import { Provider } from 'react-redux';
import userReducer from './reducers/userReducer';
import blogReducer from './reducers/blogReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    notification: notificationReducer,
    users: userReducer,
    blogs: blogReducer
});
const store = createStore(reducers, applyMiddleware(thunk));

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store}/>
    </Provider>,
    document.getElementById('root'));

}

render();
store.subscribe(render);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux';
import notificationReducer from './reducers/notificationReducer';

const store = createStore(notificationReducer);

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
}

render();
store.subscribe(render);

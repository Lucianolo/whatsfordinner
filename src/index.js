import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'

import { store, history } from './redux/store'

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'))



// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker()

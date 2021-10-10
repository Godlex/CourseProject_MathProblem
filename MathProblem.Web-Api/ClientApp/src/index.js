import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.js';
import './custom.css';
import "./translations/i18n"

const rootElement = document.getElementById('root');

ReactDOM.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>, rootElement);



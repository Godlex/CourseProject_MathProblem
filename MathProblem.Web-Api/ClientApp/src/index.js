import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.js';
import './custom.css';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

const rootElement = document.getElementById('root');

i18next.init({
    interpolation: {escapeValue: false},  // React already does escaping
});

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <App/>
        </I18nextProvider>
    </React.StrictMode>, rootElement);



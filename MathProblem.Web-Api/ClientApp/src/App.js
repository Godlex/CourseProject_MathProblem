import React, {useState} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import { useDarkMode } from './useDarkMode';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import Toggle from './components/Toggle';

export default function App() {

    const [theme, toggleTheme] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    
    return (
        <ThemeProvider theme={themeMode}>
                <Layout>
                    <GlobalStyles />
                    <Toggle theme={theme} toggleTheme={toggleTheme} />
                    <Route exact path='/' component={Home}/>
                    <Route path='/counter' component={Counter}/>
                    <AuthorizeRoute path='/fetch-data' component={FetchData}/>
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes}/>
                </Layout>
          
        </ThemeProvider>
        
    );
}
    
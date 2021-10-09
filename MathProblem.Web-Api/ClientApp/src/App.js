import React from 'react';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import {Link, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import {Layout} from "./components/Layout";
import {LoginMenu} from "./components/api-authorization/LoginMenu";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        type: "light",
    }
});
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        type: "dark",
    }
});

export class App extends React.Component {

    render() {


        const theme = createTheme({
            palette: {
                mode: "light",
                type: "light",
            }
        })

        return (
            <ThemeProvider theme={theme}>
                    <Router>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/counter">Counter</Link>
                                </li>
                                <li>
                                    <Link to="/fetch-data">FetchData</Link>
                                </li>
                            </ul>
                        </nav>

                        <LoginMenu>
                        </LoginMenu>

                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route  path='/counter' component={Counter}/>
                            <AuthorizeRoute  path='/fetch-data' component={FetchData}/>
                            <Route path={ApplicationPaths.ApiAuthorizationPrefix}
                                   component={ApiAuthorizationRoutes}/>
                        </Switch>
                    </Router>
            </ThemeProvider>
        );
    }
}




    
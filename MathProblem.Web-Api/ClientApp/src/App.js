import React from 'react';
import {Home} from './components/Home';
import {FetchData} from './components/FetchData';
import {Counter} from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {AppBar, Box, createTheme, IconButton, Tab, Tabs, ThemeProvider, Toolbar, useTheme} from "@mui/material";
import {LoginMenu} from "./components/api-authorization/LoginMenu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

function ToggleThemeButton() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return <Box
        sx={{
            alignItems: 'center',
            justifyContent: 'left',
            backcolor: 'background.default',
            color: 'secondary'
        }}
    >
        {theme.palette.mode} mode
        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
        </IconButton>
    </Box>;
}

export function App() {

    return (
        <ToggleColorMode>
            <Router>
                <AppBar position="fixed">
                    <Toolbar>
                        <ToggleThemeButton/>
                        <Tabs indicatorColor="secondary" textColor="main" sx={{width: '80%'}}>
                            <Tab label="Home" to="/" component={Link}/>
                            <Tab label="Counter" to="/counter" component={Link}/>
                            <Tab label="FetchData" to="/fetch-data" component={Link}/>
                        </Tabs>
                        <LoginMenu/>
                    </Toolbar>
                </AppBar>
                <Box style={{paddingTop: "65px"}} 
                     sx={{
                    width: '100%',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                     }}
                >
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/counter' component={Counter}/>
                        <AuthorizeRoute path='/fetch-data' component={FetchData}/>
                        <Route path={ApplicationPaths.ApiAuthorizationPrefix}
                               component={ApiAuthorizationRoutes}/>
                    </Switch>
                </Box>
            </Router>
        </ToggleColorMode>
    )
        ;
}

export default function ToggleColorMode({children}) {
    const [mode, setMode] = React.useState('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}




    
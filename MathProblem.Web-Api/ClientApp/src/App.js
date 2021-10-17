import React, {useEffect, useState} from 'react';
import {Home} from './Home';
import {AddMathProblem} from './AddMathProblem';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import {ApplicationPaths} from './components/api-authorization/ApiAuthorizationConstants';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {
    AppBar,
    Box,
    createTheme,
    IconButton,
    MenuItem,
    Select,
    Tab,
    Tabs,
    ThemeProvider,
    Toolbar,
    useTheme
} from "@mui/material";
import {LoginMenu} from "./components/api-authorization/LoginMenu";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import "./translations/i18n"
import i18n from "i18next";
import {Translation} from "./translations/translation";
import {ShowTask} from "./components/ShowTask";
import authService from "./components/api-authorization/AuthorizeService";


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
        {theme.palette.mode === 'dark' ? <Translation text={"dark_mode"}/> : <Translation text={"light_mode"}/>}
        <IconButton sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
        </IconButton>
    </Box>;
}

export function App() {

    const [language, setLanguage] = useState('ru');
    const [isAuthenticated,setIsAuthenticated]= useState(false);
    useEffect(()=>authService.isAuthenticated().then(x=>setIsAuthenticated(x)),[])

    const handleOnclick = (e) => {
        e.preventDefault();
        setLanguage(e.target.value);
        i18n.changeLanguage(e.target.value);
    }

    return (
        <ToggleColorMode>
            <Router>
                <AppBar position="fixed">
                    <Toolbar>
                        <ToggleThemeButton/>
                        <Tabs indicatorColor="secondary" textColor="main" sx={{width: '80%'}}>
                            <Tab label={<Translation text={"button_home"}/>} to="/" component={Link}/>
                            {isAuthenticated && <Tab label={<Translation text={"button_add_mathProblem"}/>} to="/add-mathproblem"
                                 component={Link}/>}
                        </Tabs>
                        <Select
                            variant="standard"
                            value={language}
                            onChange={handleOnclick}
                        >
                            <MenuItem value='ru'>Русский</MenuItem>
                            <MenuItem value='en'>English</MenuItem>
                        </Select>
                        <LoginMenu/>
                    </Toolbar>
                </AppBar>
                <Box style={{paddingTop: "65px"}}
                     sx={{
                         justifyContent: 'center',
                         bgcolor: 'background.default',
                         color: 'text.primary',
                         minHeight: '100vh',
                         width: '100%'
                     }}
                >
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/task/:id' component={ShowTask} children={<ShowTask/>}/>
                        <Route path='/add-mathproblem' component={AddMathProblem}/>
                        <Route path={ApplicationPaths.ApiAuthorizationPrefix}
                               component={ApiAuthorizationRoutes}/>
                    </Switch>
                </Box>
            </Router>
        </ToggleColorMode>
    );
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




    
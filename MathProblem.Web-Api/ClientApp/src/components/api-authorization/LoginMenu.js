import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import authService from './AuthorizeService';
import {ApplicationPaths} from './ApiAuthorizationConstants';
import {Button} from "@mui/material";
import {Translation} from "../../translations/translation";

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const {isAuthenticated, userName} = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = {pathname: `${ApplicationPaths.LogOut}`, state: {local: true}};
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <Button
                to={profilePath} component={Link}
                color="inherit"> <Translation text={"hello"}/> {userName}
            </Button>
            <Button
                to={logoutPath} component={Link}
                color="inherit"><Translation text={"logout"}/>
            </Button>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <Button
                to={registerPath} component={Link}
                color="inherit"><Translation text={"register"}/>
            </Button>
            <Button
                to={loginPath} component={Link}
                color="inherit"><Translation text={"login"}/>
            </Button>
        </Fragment>);
    }
}

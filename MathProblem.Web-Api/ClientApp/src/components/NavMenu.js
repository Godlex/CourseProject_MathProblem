import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {LoginMenu} from './api-authorization/LoginMenu';
import {Collapse, Container} from "@mui/material";

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Container>
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse"  navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                            <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                            <LoginMenu>
                            </LoginMenu>
                        </ul>
                    </Collapse>
                </Container>
            </header>
        );
    }
}

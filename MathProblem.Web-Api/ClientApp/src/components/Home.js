import React, {Component} from 'react';

import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from '../theme';
import {useDarkMode} from "../useDarkMode";
import {GlobalStyles} from "../global";
import Toggle from "./Toggle";

export class Home extends Component {
    render() {
        return <h1>Hello</h1>;
    }
}
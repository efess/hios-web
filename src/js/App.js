import React, { Component } from 'react';
import Router from './components/Router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class App extends Component {
    render() {
      return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router />
        </MuiThemeProvider>
      );
    }
  }
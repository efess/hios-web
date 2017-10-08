// import $ from 'jquery'
import React from 'react';
import ReactDOM from 'react-dom';
import AppNav from '../components/appNav';
import SmokerStatus from '../components/smoker/smokerStatus';
import SmokerHistory from '../components/smoker/smokerHistory';
import SmokerHistoryEntry from '../components/smoker/smokerHistoryEntry';
import UndercabinetLightControl from '../components/undercabinetLightControl';
import RoomStatus from '../components/environment/roomStatus';

var routes = {
    'smokes': {component: SmokerStatus, options: { }},
    'smokesHistory': {component: SmokerHistory, options: { }},
    'smokesHistoryEntry': {component: SmokerHistoryEntry, options: {nav: 'back' }},
    'undercabinet': {component: UndercabinetLightControl, options: { }},
    'environment': {component: RoomStatus, options: { }}
}

export default class Router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hash: window.location.hash}
    }

    componentDidMount () {
        window.addEventListener('hashchange', () => this.hashChange())
    }

    componentWillUnmount () {
        window.removeEventListener('hashchange', () => this.hashChange())
    }

    hashChange () {
        const hash = window.location.hash
        this.setState({hash})
    }

    currentRoute() {
        const loc = this.state.hash;
        const locTokens = loc.replace('#', '').split('/').filter(function(item){ return !!item; });
        const route = routes[locTokens.length && locTokens[0]] || routes.smokes

        return {
            component: route.component,
            options: route.options,
            args: locTokens.length > 1 && locTokens.slice(1)
        }
    }

    nav(route) {

        return React.createElement(AppNav, {navOption: route.options.nav})
    }

    content(route) {
        return route.args 
            ? React.createElement(route.component, {args: route.args})
            : React.createElement(route.component, null)
    }

    render() {
        var route = this.currentRoute()
        var Content = route.component

        return <div>
            <AppNav navOption={route.options.nav}/>
            <Content args={route.args}/>
        </div>
    }
}
// function routeHash() {

//     if(contentComponent) {
//         ReactDOM.render(
//             <MuiThemeProvider muiTheme={getMuiTheme()}>
//                 {contentComponent}
//             </MuiThemeProvider>
//             , 
//             document.getElementById('main')
//         );
//     }
//     ReactDOM.render(
//         <MuiThemeProvider muiTheme={getMuiTheme()}>
//             <AppNav navOption={navOption}/>
//         </MuiThemeProvider>
//         , 
//         document.getElementById('nav-bar')
//     );
// }
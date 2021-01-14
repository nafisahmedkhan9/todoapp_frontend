import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import "../../node_modules/font-awesome/scss/font-awesome.scss"
import "../Assests/customStyle.css"
import "../Assests/style.scss"
import Loader from "./Components/Loader"
import { authRoutes } from "../Routes";
import { withCookies } from 'react-cookie';
import AuthLayout from "./Layout"

class App extends Component {

    render() {
        const menu = authRoutes.map((route, index) => {
            return (route.component) ? (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => (
                        <route.component {...props} />
                    )} />
            ) : (null);
        });

        return (
            <Suspense fallback={<Loader />}>
                <Switch>
                    {menu}
                    <Route path="/" component={AuthLayout} />
                </Switch>
            </Suspense>
        );
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(withCookies(App))
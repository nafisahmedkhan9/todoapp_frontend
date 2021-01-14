import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from "../Components/Loader";
import { routes } from "../../Routes";
import * as actions from "../../Store/actions";
import { withCookies } from 'react-cookie';
import Navigation from "./Navigation"

class AuthLayout extends Component {

    componentDidMount() {
        const token = this.props.cookies.get(actions.CONS.COOKIE_TOKEN_NAME)
        if (!token) {
            this.props.history.push(actions.CONS.LOGIN_LINK)
        }
    }

    fullScreenExitHandler = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            this.props.onFullScreenExit();
        }
    };

    mobileOutClickHandler() {
        if (this.props.windowWidth < 992 && this.props.collapseMenu) {
            this.props.onComponentWillMount();
        }
    }

    render() {
        /* full screen exit call */
        document.addEventListener('fullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('webkitfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('mozfullscreenchange', this.fullScreenExitHandler);
        document.addEventListener('MSFullscreenChange', this.fullScreenExitHandler);

        const menu = routes.map((route, index) => {
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
            <>
                <Navigation />
                <div className="component">
                    <Suspense fallback={<Loader />}>
                        <Switch>
                            {menu}
                            <Redirect from="/" to={this.props.defaultPath} />
                        </Switch>
                    </Suspense>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(withCookies(AuthLayout));
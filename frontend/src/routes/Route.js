import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

import store from '../store';

export default function RouteWrapper({
    component: Component,
    isPrivate,
    ...rest
}) {
    const auth = store.getState().auth;
    const compName = Component.name

    const signed = store.getState().auth.signed;
    
    debugger
    console.log({compName, auth, signed});
    

    if(!signed && isPrivate) {
        return <Redirect to="/" />
    }

    if(signed && !isPrivate) {
        return <Redirect to="/dashboard" />
    }

    const Layout = signed ? DefaultLayout : AuthLayout;

    return (
        <Route {... rest} render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )} />
    )
}

RouteWrapper.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
};

RouteWrapper.defaultProps = {
    isPrivate: false
}
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Login from './Login';
import Registration from './Registration';

import './Auth.css';

class Auth extends Component {
    render() {
        const isAuthorized = this.props.authStore.token;
        const { currentUser } = this.props.userStore;
        return (
            isAuthorized || currentUser ?
                <Redirect to='/my' /> :
                <Switch>
                    <Route exact path="/auth" component={Login} />
                    <Route path="/auth/register" component={Registration} />
                </Switch>
        );
    };
};

export default inject('userStore', 'authStore')(observer(Auth));

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import MyPage from './MyPage';

class My extends Component {
    render() {
        const isAuthorized = this.props.authStore.token;
        const { currentUser } = this.props.userStore;
        return (
            isAuthorized || currentUser ?
                <Switch>
                    <Route exact path='/my' component={MyPage} />
                    <Route path='/my/page1' component={Page1} />
                    <Route path='/my/page2' component={Page2} />
                    <Route path='/my/page3' component={Page3} />
                </Switch>
                : <Redirect to='/auth' />
        );
    }
}

export default inject('userStore', 'authStore')(observer(My));
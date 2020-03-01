import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Container, Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';

import './Header.css';

class Header extends Component {
    state = {
        isOpen: false,
    };

    handleLogout = () =>
        this.props.authStore.logout()
            .then(() => window.location = '/');

    toggle = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const { currentUser } = this.props.userStore;
        const { toggle } = this;
        const { isOpen } = this.state;
        return (
            <Container>
                <Navbar light expand="md">
                    <Link to="/" className="nav-link">
                        <h2>Home</h2>
                    </Link>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav>
                            {!currentUser ?
                                <Fragment>
                                    <NavItem>
                                        <Link to="/auth" className="nav-link">
                                            Sign in
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/auth/register" className="nav-link">
                                            Sign up
                                        </Link>
                                    </NavItem>
                                </Fragment> :
                                <NavItem>
                                    <Button className='logout' onClick={this.handleLogout}>Logout</Button>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        );
    }
}

export default inject('userStore', 'authStore')(observer(Header));
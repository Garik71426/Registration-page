import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './MyPage.css';

class MyPage extends Component {
    render() {
        const { currentUser } = this.props.userStore;
        return (
            <Container >
                <Row className='block2'>
                    <Col lg='6'>
                        <div className='myPageDivOne'>
                            <h2 className='title'>Hello {currentUser && `${currentUser.firstName} ${currentUser.lastName}`}</h2>
                            <ul>
                                <li>
                                    <Link to='/my/page1'>Page 1</Link>
                                </li>
                                <li>
                                    <Link to='/my/page2'>Page 2</Link>
                                </li>
                                <li>
                                    <Link to='/my/page3'>Page 3</Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default inject('userStore', 'authStore')(observer(MyPage));
import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";
import { Container, Row, Col, Form, Input, Alert } from 'reactstrap';
import ReactLoading from 'react-loading';

import Field from '../../Common/Field';
import FieldData from '../FieldData';

class Login extends Component {
    componentDidMount() {
        this.props.authStore.reset();
    };
    handleChange = event => {
        this.props.authStore.changeInput(event, 'login');
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.authStore.login()
            .then(() => this.props.history.replace('/'));
    };
    render() {
        const { values, loginDone, inProgress, errors } = this.props.authStore;
        return (
            <Container>
                <Row className="block">
                    <Col lg="6">
                        <div className='login'>
                            <Form onSubmit={this.handleSubmit} className='authForm'>
                                {inProgress ?
                                    <ReactLoading className='loading' type='spokes' /> :
                                    <Fragment>
                                        {FieldData.map(item => {
                                            return item.name === 'email' || item.name === 'password' ?
                                                <Field
                                                    key={`${item.name} login`}
                                                    onChange={this.handleChange}
                                                    name={item.name}
                                                    value={values.login[item.name]}
                                                    type={item.type || 'text'}
                                                    error={item.error}
                                                    placeholder={item.placeholder}

                                                /> : <Fragment key={`${item.id} login`} />
                                        })}
                                        {errors && <Alert color="danger">{errors}</Alert>}
                                        <Input type='submit' value='Sign In' disabled={!loginDone} className={errors && 'is-invalid'} />
                                    </Fragment>
                                }
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default inject('authStore')(observer(Login));

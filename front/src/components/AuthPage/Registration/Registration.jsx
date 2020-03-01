import React, { Component, Fragment } from 'react';
import { inject, observer } from "mobx-react";
import { Container, Row, Col, Form, Input, Alert } from 'reactstrap';
import ReactLoading from 'react-loading';

import FieldData from '../FieldData';
import Field from '../../Common/Field';

class Registration extends Component {
    componentDidMount() {
        this.props.authStore.reset();
    };
    handleChange = event => {
        this.props.authStore.changeInput(event, 'register');
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.authStore.register()
            .then(() => this.props.history.replace('/'));
    }
    render() {
        const { values, registerDone, inProgress, errors } = this.props.authStore;
        return (
            <Container>
                <Row className="block">
                    <Col lg="6" md="12">
                        <div className='login'>
                            <Form onSubmit={this.handleSubmit} className='authForm'>
                                {inProgress ?
                                    <ReactLoading className='loading' type='spokes' /> :
                                    <Fragment>{FieldData.map(item => {
                                        return <Field
                                            key={`${item.name} register`}
                                            onChange={this.handleChange}
                                            name={item.name}
                                            value={values.register[item.name]}
                                            type={item.type || 'text'}
                                            error={item.error}
                                            placeholder={item.placeholder}
                                        />
                                    })}
                                        {errors && <Alert color="danger">{errors}</Alert>}
                                        <Input type='submit' disabled={!registerDone} value='Sign Up' />
                                    </Fragment>
                                }
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };
};

export default inject('authStore')(observer(Registration));

import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

class Page2 extends Component {
    render() {
        return (
            <Container >
                <Row className="block2">
                    <Col lg="6">
                        <div className="myPageDivOne">
                            <h2 className="title">Page 2</h2>
                        </div>

                    </Col>
                </Row>
            </Container>
        );
    };
};

export default Page2;

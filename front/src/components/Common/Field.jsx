import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, FormFeedback } from 'reactstrap';

class Field extends Component {
    render() {
        const { placeholder, onChange, name, value, type, error } = this.props;
        return (
            <FormGroup>
                <Input
                    type={type}
                    onChange={onChange}
                    name={name}
                    defaultValue={value}
                    placeholder={placeholder}
                />
                <FormFeedback>{error}</FormFeedback>
            </FormGroup>
        );
    };
};

Field.propTypes = {
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Field;

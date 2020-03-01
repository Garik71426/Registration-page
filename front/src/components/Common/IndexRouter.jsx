import React from 'react';
import { inject, observer } from "mobx-react";
import { Redirect } from 'react-router-dom';

const IndexRoute = (props) => {
	const isAuthorized = props.authStore.token;
	let redirectPath = '/auth';
	if (isAuthorized) {
		redirectPath = '/my';
	}
	return <Redirect to={redirectPath} />;
};

export default inject('authStore')(observer(IndexRoute));

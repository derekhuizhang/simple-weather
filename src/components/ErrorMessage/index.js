import React from 'react';

import { Alert } from 'reactstrap'
import { ErrorMessageWrapper } from './styles'

const ErrorMessage = () => {
	return (
		<ErrorMessageWrapper>
			<Alert color='danger'>
      	City or zip code not found: check your input and try again!
    	</Alert>
		</ErrorMessageWrapper>
	);
}

export default ErrorMessage

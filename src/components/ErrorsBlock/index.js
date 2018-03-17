import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

class ErrorsBlock extends PureComponent {

    handleErrorDismiss = (e, { index }) => this.props.dismissError(index);

    render() {

        const { errors } = this.props;

        return (
            <div>
                {errors.length > 0 &&
                    (errors.map((msg, index) => 
                        <div key={index}>
                            <Message
                                index={index}
                                success
                                visible={errors.length > 0}
                                onDismiss={this.handleErrorDismiss}>
                                {msg}
                            </Message>
                        </div>                            
                    ))
                }
            </div>
        );
    }
}

ErrorsBlock.propTypes = {
    errors: PropTypes.array.isRequired,
    dismissError: PropTypes.func.isRequired
};

ErrorsBlock.defaultProps = {
    errors: []
};

export default ErrorsBlock;

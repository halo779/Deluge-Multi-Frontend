import React from 'react';

class ApplicationView extends React.Component {

    render() {
        return (
            <div className='application_view'>
                {this.props.children}
            </div>
        );
    }
}

export default ApplicationView;
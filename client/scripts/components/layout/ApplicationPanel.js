import React from 'react';

class ApplicationPanel extends React.Component {

    render() {
        return (
            <div className='application_panel'>
                {this.props.children}
            </div>
        );
    }
}

export default ApplicationPanel;
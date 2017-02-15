import React from 'react';

class Sidebar extends React.Component {

    render() {
        return (
            <div className='application_sidebar'>
                {this.props.children}
            </div>
        );
    }
}

export default Sidebar;
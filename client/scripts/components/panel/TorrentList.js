import React from 'react';

class TorrentList extends React.Component {

    render() {
        return (
            <div className='application_torrent_list'>
                {this.props.children}
            </div>
        );
    }
}

export default TorrentList;
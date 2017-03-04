import React from 'react';
import ReactDOM from 'react-dom';

import ApplicationView from "./components/layout/ApplicationView";
import Sidebar from "./components/panel/Sidebar";
import ApplicationContent from "./components/layout/ApplicationContent";
import TorrentList from "./components/panel/TorrentList";


class WebMonApp extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
        <ApplicationView>
          <Sidebar />
          <ApplicationContent>
            <TorrentList/>
          </ApplicationContent>
        </ApplicationView>
    );
  }
}

ReactDOM.render(<WebMonApp />, document.getElementById('app'));
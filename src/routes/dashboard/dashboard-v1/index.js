/**
 * Dashboard V1
 */
import React, { Component } from "react";

// page title bar
import PageTitleBar from "../../../components/PageTitleBar/PageTitleBar";

// intl messages
import IntlMessages from "../../../util/IntlMessages";

// Main Component
export default class DashboardOne extends Component {
  render() {
    return (
      <div className="dashboard-v1">
        <PageTitleBar
          title={<IntlMessages id="sidebar.dashboard" />}
          match={this.props.match}
        />
      </div>
    );
  }
}

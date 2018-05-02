/**
 * App Routes
 */
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

// Components
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer/Footer";
import SearchForm from "../components/SearchForm/SearchForm";

// async component
import {
  AsyncDashboardComponent,
  AsyncDataTable
} from "../components/AsyncComponent/AsyncComponent";

class MainApp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { navCollapsed } = this.props.settings;
    return (
      <div className={classnames("app", { "collapsed-sidebar": navCollapsed })}>
        <div className="app-container">
          <div className="rct-page-wrapper">
            <Sidebar />
            <div className="rct-app-content">
              <Header />
              <div className="rct-page">
                <div className="rct-page-content">
                  <Route
                    path={`${this.props.match.url}/dashboard`}
                    component={AsyncDashboardComponent}
                  />
                  <Route
                    path={`${this.props.match.url}/tables`}
                    component={AsyncDataTable}
                  />
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <SearchForm />
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  return { settings };
};

export default withRouter(connect(mapStateToProps)(MainApp));

/**
 * App Header
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import IconButton from "material-ui/IconButton";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import screenfull from "screenfull";
import MenuIcon from "material-ui-icons/Menu";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { Link } from "react-router-dom";
// intl messages
import IntlMessages from "../../util/IntlMessages";

// actions
import { collapsedSidebarAction } from "../../actions";

class Header extends Component {
  state = {
    customizer: false,
    userDropdownMenu: false
  };

  // function to change the state of collapsed sidebar
  onToggleNavCollapsed = event => {
    const val = !this.props.collapsedSidebar;
    this.props.collapsedSidebarAction(val);
  };

  // toggle screen full
  toggleScreenFull() {
    screenfull.toggle();
  }

  /**
   * Toggle User Dropdown Menu
   */
  toggleUserDropdownMenu() {
    this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
  }

  render() {
    return (
      <AppBar position="fixed" className="rct-header">
        <Toolbar className="d-flex justify-content-between w-100">
          <ul className="list-inline mb-0 navbar-left">
            <li
              className="list-inline-item"
              onClick={e => this.onToggleNavCollapsed(e)}
            >
              <IconButton
                color="inherit"
                aria-label="Menu"
                className="humburger"
              >
                <MenuIcon />
              </IconButton>
            </li>
          </ul>

          <ul className="navbar-right list-inline">
            <li className="list-inline-item setting-icon">
              <div className="sidebar-user-block media">
                <Dropdown
                  isOpen={this.state.userDropdownMenu}
                  toggle={() => this.toggleUserDropdownMenu()}
                  className="rct-dropdown media-body pt-10"
                >
                  <DropdownToggle nav>
                    <div className="user-profile">
                      <img
                        src={require("../../assets/img/demoDoc.jpg")}
                        alt="user profile"
                        className="img-fluid rounded-circle"
                        width="60"
                        height="129"
                      />
                    </div>
                  </DropdownToggle>
                  <DropdownMenu>
                    <ul className="list-unstyled mb-0">
                      <li className="media p-15 border-bottom">
                        <img
                          src={require("../../assets/img/demoDoc.jpg")}
                          alt="user profile"
                          className="rounded-circle mr-15"
                          width="42"
                          height="42"
                        />
                        <div className="media-body">
                          <p className="mb-0 fs-14">Dr. George</p>
                          <span className="text-muted fs-14">
                            George@test.com
                          </span>
                        </div>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: "#",
                            state: { activeTab: 0 }
                          }}
                        >
                          <i className="ti ti-user" />
                          <IntlMessages id="widgets.profile" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: "#",
                            state: { activeTab: 2 }
                          }}
                        >
                          <i className="ti ti-comment-alt" />
                          <IntlMessages id="widgets.messages" />
                          <span className="badge badge-danger pull-right">
                            3
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="ti ti-pencil" />
                          Feedback
                          <span className="badge badge-info pull-right">1</span>
                        </Link>
                      </li>
                      <li className="border-top">
                        <a
                          href="javascript:void(0)"
                          onClick={() => this.logoutUser()}
                        >
                          <i className="ti ti-power-off" />
                          Logout
                        </a>
                      </li>
                    </ul>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </li>
            <li className="list-inline-item">
              <IconButton
                aria-label="settings"
                onClick={() => this.toggleScreenFull()}
              >
                <i className="ti-fullscreen" />
              </IconButton>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    );
  }
}

// map state to props
const mapStateToProps = ({ settings }) => ({
  collapsedSidebar: settings.navCollapsed,
  rtlLayout: settings.rtlLayout
});

export default connect(mapStateToProps, {
  collapsedSidebarAction
})(Header);

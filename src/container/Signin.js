/**
 * Signin Firebase
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input } from "reactstrap";
import { LinearProgress } from "material-ui/Progress";
import QueueAnim from "rc-queue-anim";

// app config
import AppConfig from "../constants/AppConfig";

// redux action
import { signinUser } from "../actions";

class Signin extends Component {
  state = {
    email: "demo@labtrac.com",
    password: "espl@123"
  };

  /**
   * On User Login
   */
  onUserLogin() {
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.signinUser(
        { email: this.state.email, password: this.state.password },
        this.props.history
      );
    }
  }

  /**
   * On User Sign Up
   */
  onUserSignUp() {
    this.props.history.push("/signup");
  }

  render() {
    const { email, password } = this.state;
    const { loading } = this.props;
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="rct-session-wrapper">
          {loading && <LinearProgress />}
          <AppBar position="static" className="session-header">
            <Toolbar>
              <div className="container">
                <div className="d-flex justify-content-between">
                  <div className="session-logo">
                    <Link to="/">
                      <img
                        src={AppConfig.appLogo}
                        alt="session-logo"
                        className="img-fluid"
                        width="110"
                        height="35"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <div className="session-inner-wrapper">
            <div className="container">
              <div className="row row-eq-height">
                <div className="col-sm-2 col-md-2 col-lg-2" />
                <div className="col-sm-7 col-md-7 col-lg-7">
                  <div className="session-body text-center">
                    <div className="session-head mb-30">
                      <h2>Welcome To {AppConfig.brandName}</h2>
                    </div>
                    <Form>
                      <FormGroup className="has-wrapper">
                        <Input
                          type="mail"
                          value={email}
                          name="user-mail"
                          id="user-mail"
                          className="has-input input-lg"
                          placeholder="Enter Email Address"
                          onChange={event =>
                            this.setState({ email: event.target.value })
                          }
                        />
                        <span className="has-icon">
                          <i className="ti-email" />
                        </span>
                      </FormGroup>
                      <FormGroup className="has-wrapper">
                        <Input
                          value={password}
                          type="Password"
                          name="user-pwd"
                          id="pwd"
                          className="has-input input-lg"
                          placeholder="Password"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                        />
                        <span className="has-icon">
                          <i className="ti-lock" />
                        </span>
                      </FormGroup>
                      <FormGroup className="mb-15">
                        <Button
                          className="btn-success text-white btn-lg circle-btn-sm"
                          variant="raised"
                          onClick={() => this.onUserLogin()}
                        >
                          Sign In
                        </Button>
                      </FormGroup>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}

// map state to props
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  signinUser
})(Signin);

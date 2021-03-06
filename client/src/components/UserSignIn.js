import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import ValidationErrors from "./ValidationErrors";

export default class UserSignIn extends Component {
  state = {
    user: {
      emailAddress: "",
      password: "",
    },
    validationErrors: [],
    redirectPath: "",
  };

  onChange = (e) => {
    //update state to reflect form
    const { user } = this.state;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  onCancel = () => {
    this.props.history.push("/");
  };

  submitForm = async (e) => {
    e.preventDefault();
    //attempt sign-in
    const response = await this.props.userSignIn(this.state.user);
    if (response === true) {
      // if a protected route was previously attempted, redirect to it now
      // otherwise redirect to '/courses'
      let from;
      try {
        from = this.props.location.state.from.pathname;
      } catch {
        from = "/";
      }
      this.props.history.push(from);
    } else {
      this.setState({ validationErrors: ["Email or password incorrect"] });
    }
  };

  render() {
    const { user } = this.state;
    if (this.props.user.authenticated) {
      return <Redirect to="/courses" />;
    } else {
      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <ValidationErrors errors={this.state.validationErrors} />
              <form onSubmit={this.submitForm}>
                <div>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    className=""
                    placeholder="Email Address"
                    value={user.emailAddress}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className=""
                    placeholder="Password"
                    value={user.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Sign In
                  </button>
                  <button
                    className="button button-secondary"
                    onClick={this.onCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>
              Don't have a user account? <Link to="/signup">Click here</Link> to
              sign up!
            </p>
          </div>
        </div>
      );
    }
  }
}

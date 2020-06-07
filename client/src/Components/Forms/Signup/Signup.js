import React, { Component } from "react";
import classes from "./Signup.css";
import Navbar from "../../Navigation/Navigation";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Signup extends Component {
  state = {
    signup: false,
  };

  submit = (event) => {
    event.preventDefault();
    var user = this.refs.username.value;
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    const item = {
      username: user,
      email: email,
      password: password,
    };
    var formData = [];
    for (var k in item) {
      var encodedKey = encodeURIComponent(k);
      var encodedValue = encodeURIComponent(item[k]);
      formData.push(encodedKey + "=" + encodedValue);
    }
    formData = formData.join("&");

    axios
      .post("http://localhost:4000/todos/register", formData)
      .then((res) => this.setState({ signup: true }));
    this.setState({ signup: true });

    this.refs.form.reset();
  };

  render() {
    if (this.state.signup) {
      return <Redirect to="/Login" />;
    }
    return (
      <div>
        <Navbar />
        <div className={classes.Signup}>
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <div className={classes.main}>
                <form ref="form" onSubmit={this.submit}>
                  <input
                    ref="username"
                    type="text"
                    placeholder="enter your Username"
                  />
                  <input
                    ref="email"
                    type="email"
                    placeholder="enter your email"
                  />
                  <input
                    ref="password"
                    type="password"
                    placeholder="enter password"
                  />
                  {/* <input type="password" placeholder="confirm your password"/> */}
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

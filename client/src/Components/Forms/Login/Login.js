import React, { Component } from "react";
import axios from "axios";
import classes from "./Login.css";
import Navbar from "../../Navigation/Navigation";

class Login extends Component {
  state = {
    loaded: false,
    login: false,
    users: null,
    error: false,
  };
  
  submit = (event) => {
    event.preventDefault();
    var user = this.refs.username.value;
    var password = this.refs.password.value;

    const item = {
      username: user,
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
      .post("http://localhost:4000/todos/login", formData)
      .then((res) => this.setState({ login: true }));

    this.refs.form.reset();
  };
  render() {
    // if(this.state.users){

    //     console.log(this.state.users);
    // }
    //     if(this.state.login)
    // {
    //     alert("login success")
    //     return  <Redirect to="/"/>
    // }
    return (
      <div>
        <Navbar />
        <div className={classes.Login}>
          <div className={classes.container}>
            <div className={classes.wrapper}>
              <div className={classes.main}>
                <form ref="form" onSubmit={this.submit}>
                  <input
                    ref="username"
                    type="text"
                    autoFocus
                    placeholder="enter your Username"
                  />
                  <input
                    ref="password"
                    type="password"
                    placeholder="enter password"
                  />
                  <button type="submit">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;

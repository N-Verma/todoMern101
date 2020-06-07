import React, { Component } from "react";
import classes from "./App.css";
import Navigation from "../Components/Navigation/Navigation";
import TodoForm from "../Components/TodoForm/TodoForm";
import { BrowserRouter, Route } from "react-router-dom";
import Signup from "../Components/Forms/Signup/Signup";
import Login from "../Components/Forms/Login/Login";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoArray: [],
    };

    this.delItem = this.delItem.bind(this);
    this.markDone = this.markDone.bind(this);
  }
  componentDidMount() {
    this.getTodos();
  }

  delItem(id) {
    axios
      .delete("http://localhost:4000/todos/delete/" + id)
      .then((response) => {
        console.log("Todo delete");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  markDone(item) {
    var id = item._id;
    this.delItem(id);
    var formData = [];
    for (var k in item) {
      var encodedKey = encodeURIComponent(k);
      var encodedValue = encodeURIComponent(item[k]);
      formData.push(encodedKey + "=" + encodedValue);
    }
    formData = formData.join("&");
    axios
      .post("http://localhost:4000/todos/add", formData)
      .then((res) => console.log(res.data));
  }

  componentDidUpdate() {
    this.getTodos();
  }

  getTodos() {
    // if(!this.state.todoArray){
    axios
      .get("http://localhost:4000/todos")
      .then((response) => {
        this.setState({ todoArray: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <Navigation />
          <Route
            path="/"
            exact
            render={() => {
              return (
                <TodoForm
                  getTodos={this.getTodos}
                  items={this.state.todoArray}
                  del={this.delItem}
                  mark={this.markDone}
                />
              );
            }}
          />
          <Route path="/Login" exact component={Login} />
          <Route path="/Signup" exact component={Signup} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

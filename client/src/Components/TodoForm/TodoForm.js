import React, { Component } from "react";
import classes from "./TodoForm.css";
import TodoList from "../TodoList/TodoList";
import axios from "axios";
var Gdate;
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [],
    };
    this.submit = this.submit.bind(this);
    this.search = this.search.bind(this);
    this.handleAll = this.handleAll.bind(this);
    this.handleProg = this.handleProg.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  componentDidMount() {
    this.refs.itemValue.focus();
  }

  handleDateChange(event) {
    Gdate = event.target.value;
  }
  submit(event) {
    event.preventDefault();
    var val = this.refs.itemValue.value;
    var date = Gdate;
    var tag;
    var radio = document.getElementsByName("tags");
    for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        tag = radio[i].value;
        break;
      }
    }
    const item = {
      value: val,
      due_date: date,
      category: tag,
      done: false,
    };
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
    this.refs.form.reset();
  }

  handleAll() {
    let newTodo = [];
    newTodo = this.props.items;
    this.setState({
      filterData: newTodo,
    });
  }
  handleDone() {
    let newTodo = [];
    newTodo = this.props.items.filter((item) => item.done === true);
    this.setState({
      filterData: newTodo,
    });
  }

  handleProg() {
    let newTodo = [];
    newTodo = this.props.items.filter((item) => item.done === false);
    this.setState({
      filterData: newTodo,
    });
  }

  search(event) {
    event.preventDefault();
    var word = this.refs.searchItem.value;

    let old = this.props.items.map((todoItem) => {
      return {
        value: todoItem.value,
        due_date: todoItem.due_date,
        category: todoItem.category.toLowerCase(),
        done: todoItem.done,
      };
    });

    if (word !== "") {
      let newTodo = [];
      newTodo = old.filter((item) => {
        return item.category.includes(word.toLowerCase());
      });
      this.setState({
        filterData: newTodo,
      });
    } else {
      this.setState({
        filterData: this.props.items,
      });
    }
  }
  componentDidUpdate() {
    this.props.getTodos();
  }

  render() {
    return (
      <div className={classes.Todoform}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <div className={classes.main}>
              <form ref="form" onSubmit={this.submit}>
                <input
                  type="text"
                  autoFocus
                  required
                  ref="itemValue"
                  placeholder="Add todo"
                />
                <input
                  type="date"
                  name="trip-start"
                  required
                  ref="due-date"
                  onChange={this.handleDateChange}
                  min="2001-01-01"
                  max="2050-12-31"
                />
                <div className={classes.Add}>
                  <button type="submit">Add</button>
                </div>
                <hr />
                <div className={classes.Radio}>
                  <input type="radio" ref="tag" name="tags" value="Personal" />
                  <span>Personal</span>
                  
                  <input type="radio" ref="tag" name="tags" value="Work" />
                  <span>Work</span>
                  <input type="radio" ref="tag" name="tags" value="Shopping" />
                  <span>Shopping</span>
                  <input type="radio" ref="tag" name="tags" value="Others" />
                  <span>Others</span>
                </div>
              </form>

              <div className={classes.Label}>
                <button id="all" onClick={this.handleAll}>
                  All
                </button>
                <button id="inProgress" onClick={this.handleProg}>
                  In Progress
                </button>
                <button id="completed" onClick={this.handleDone}>
                  Completed
                </button>
                <div className={classes.Search}>
                  <form ref="form2" onSubmit={this.search}>
                    <input
                      type="text"
                      ref="searchItem"
                      placeholder="Search By Category"
                    />
                    <button>Search</button>
                  </form>
                </div>
              </div>
            </div>
            <TodoList
              getTodos={this.props.getTodos}
              items={
                this.state.filterData.length < 1
                  ? this.props.items
                  : this.state.filterData
              }
              del={this.props.del}
              mark={this.props.mark}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoForm;

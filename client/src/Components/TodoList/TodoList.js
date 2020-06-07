import React, { Component } from "react";
import classes from "./TodoList.css";
import TodoItem from "../TodoItem/TodoItem";

class TodoList extends Component {
  render() {
    const items = this.props.items.map((item, index) => {
      return (
        <TodoItem
          key={index}
          index={index}
          item={item}
          getTodos={this.props.getTodos}
          del={this.props.del}
          mark={this.props.mark}
        />
      );
    });
    return <ul className={classes.list}>{items}</ul>;
  }
}
export default TodoList;

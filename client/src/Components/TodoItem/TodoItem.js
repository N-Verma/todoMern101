import React, { Component } from "react";
import classes from "./TodoItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.check = this.check.bind(this);
  }
  componentDidUpdate() {
    this.props.getTodos();
  }
  delete() {
    var i = this.props.item._id;
    this.props.del(i);
  }

  check() {
    var i = this.props.item._id;
    const updateItem = {
      _id: i,
      value: this.props.item.value,
      due_date: this.props.item.due_date,
      category: this.props.item.category,
      done: !this.props.item.done,
    };
    this.props.mark(updateItem);
  }

  render() {
    return (
      <div className={classes.itemList}>
        <li
          onClick={this.check}
          className={this.props.item.done ? classes.done : classes.not}
        >
          {this.props.item.value}{" "}
          <br/>
          <i>{this.props.item.due_date.substring(0, 10)}</i>{" "}
          <span className={classes.tag}><small>{this.props.item.category}</small></span>
        </li>
        <span onClick={this.delete} className={classes.delete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>
    );
  }
}

export default TodoItem;

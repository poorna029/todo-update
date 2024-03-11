import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "../TodoItem";
import "./index.css";

class TodoList extends Component {
  state = { todos: [], text: "", count: 0, isEdit: false, editId: null };

  onTodoAdd = (event) => {
    this.setState({ text: event.target.value });
  };

  onDeleteTodo = (id) => {
    const { todos } = this.state;
    const updatedData = todos.filter((tab) => tab.id !== id);
    this.setState({ todos: updatedData });
  };

  onUpdateTodo = (e) => {
    e.preventDefault();
    const { editId, text, todos } = this.state;
    const len = todos.filter((x) => x.id === editId)[0];
    // console.log(len);
    this.setState((pre) => ({
      todos: pre.todos.map((eachItem) => {
        if (eachItem.id === editId) {
          return {
            ...eachItem,
            count:
              eachItem.newtitle.length !== text.length
                ? eachItem.count + Number(1)
                : eachItem.count,
            title: text,
          };
        }
        return eachItem;
      }),
      isEdit: false,
      text: "",
      editId: null,
    }));
  };

  onEditTodo = (id) => {
    const { todos } = this.state;
    const val = todos.filter((e) => e.id === id)[0].title;
    this.setState((prevState) => ({
      todos: prevState.todos,
      text: val,
      isEdit: true,
      editId: id,
    }));
  };

  submitForm = (event) => {
    event.preventDefault();
    const { count, text } = this.state;
    let length = 0;
    const wordList = text.split(" ");
    let num = wordList[wordList.length - 1];

    // check is there any text only then add the obj
    if (text === "") {
      alert("Enter valid Todo");
    }
    if (text !== "") {
      const data = {
        id: uuidv4(),
        title: text,
        count: count,
        newtitle: text,
      };
      this.setState((prev) => {
        return { todos: [...prev.todos, data] };
      });
      this.setState({ text: "" });
    }
    if (typeof Number(num) === "number") {
      length = Number(num);
      if (length > 0) {
        let arr = [];
        for (let i = 1; i < length; i++) {
          const data = {
            id: uuidv4(),
            title: text,
            count: count,
            newtitle: text,
          };
          arr.push(data);
        }
        this.setState((prev) => {
          return { todos: [...prev.todos, ...arr] };
        });
        length = 0;
        this.setState({ text: "" });
      }
    }
  };

  render() {
    const { todos, text, isEdit } = this.state;
    return (
      <div className="bg-container">
        <div className="main-container">
          <h4 className="heading">Day Goals</h4>
          <form
            onSubmit={isEdit ? this.onUpdateTodo : this.submitForm}
            className="form"
          >
            <input
              placeholder="Add a task"
              type="text"
              value={text}
              className="input-field"
              onChange={this.onTodoAdd}
            />
            <button type="submit">
              {!isEdit ? "Add Todo" : "Update Todo"}
            </button>
          </form>
          <ul className="val2">
            {todos.map((each) => (
              <TodoItem
                key={each.id}
                details={each}
                onUpdateTodoCount={this.onEditTodo}
                onDeleteTodoCount={this.onDeleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;

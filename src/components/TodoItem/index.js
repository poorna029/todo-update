import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const TodoItem = (props) => {
  const { details, onDeleteTodoCount, onUpdateTodoCount } = props;
  const { id, title, count } = details;
  const onDeleteTodo = () => {
    onDeleteTodoCount(id);
  };
  const onUpdateTodo = () => {
    onUpdateTodoCount(id);
  };
  return (
    <li className="val">
      <p>
        {title} <span>(Updated {count} Times)</span>
      </p>
      <div className="val1">
        <FontAwesomeIcon
          icon={faEdit}
          onClick={onUpdateTodo}
          className="icon1"
        />
        <FontAwesomeIcon
          icon={faTimes}
          onClick={onDeleteTodo}
          className="icon"
        />
      </div>
    </li>
  );
};

export default TodoItem;

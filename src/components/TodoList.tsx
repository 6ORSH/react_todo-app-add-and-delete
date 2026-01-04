import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/enums';

type Props = {
  todos: Todo[];
  filter: TodosFilter;
  handleDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, filter, handleDelete }) => {
  const filteredTodos = todos.filter(todo => {
    if (filter === TodosFilter.Active) {
      return !todo.completed;
    }

    if (filter === TodosFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={classNames('todo', {
            completed: todo.completed,
          })}
        >
          <label className="todo__status-label">
            {' '}
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
            />{' '}
          </label>

          <span data-cy="TodoTitle" className="todo__title">
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo.id)}
          >
            x
          </button>

          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ))}
    </section>
  );
};

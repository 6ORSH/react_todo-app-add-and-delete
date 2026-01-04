import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { addTodo, deleteTodo, getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoErrors, TodosFilter } from './types/enums';

import { ErrorNotification } from './components/ErrorNotification';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { NewTodo } from './types/NewTodo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodosFilter>(TodosFilter.All);
  const [error, setError] = useState<TodoErrors | null>(null);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const displayError = (displayedError: TodoErrors) => {
    setError(displayedError);
    setIsErrorShown(true);
    setTimeout(() => setIsErrorShown(false), 3000);
  };

  useEffect(() => {
    getTodos()
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch(() => {
        displayError(TodoErrors.FetchError);
      });
  }, []);

  const handleFilterChange = (newFilter: TodosFilter) => {
    setFilter(newFilter);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addNewTodo = (title: string) => {
    if (!title) {
      displayError(TodoErrors.EmptyTitleError);

      return;
    }

    const todo: NewTodo = {
      userId: USER_ID,
      title: title,
      completed: false,
    };

    addTodo(todo)
      .then(addedTodo => {
        setTempTodo({ ...addedTodo, id: 0 });
        setTodos(prevTodos => [...prevTodos, addedTodo]);
      })
      .catch(() => {
        displayError(TodoErrors.AddError);
      });
  };

  const removeTodo = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      })
      .catch(() => {
        displayError(TodoErrors.DeleteError);
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          isToggleAllActive={todos.every(todo => todo.completed)}
          addNewTodo={addNewTodo}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={todos} filter={filter} handleDelete={removeTodo} />

            <Footer
              todos={todos}
              currentFilter={filter}
              handleFilterChange={handleFilterChange}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
        visible={isErrorShown}
        handleCloseError={() => setIsErrorShown(false)}
      />
    </div>
  );
};

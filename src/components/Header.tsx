import classNames from 'classnames';
import { useEffect, useRef } from 'react';

type Props = {
  isToggleAllActive: boolean;
  addNewTodo: (title: string) => void;
};

export const Header: React.FC<Props> = ({ isToggleAllActive, addNewTodo }) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (
      e.currentTarget.elements[0] as HTMLInputElement
    ).value.trim();

    input.current!.disabled = true;

    addNewTodo(title);
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', {
          active: isToggleAllActive,
        })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={input}
        />
      </form>
    </header>
  );
};

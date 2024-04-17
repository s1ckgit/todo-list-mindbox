import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { type todosType } from '@/app/page';
import Tabs from './Tabs';

describe('Компонент табов', () => {
  it('Проверяем, что во вкладке All рендерятся все TODO', () => {
    // Мокаем данные для todos
    const todos: todosType = new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]);
    const setTodosMock = jest.fn();

    // Рендерим компонент
    render(<Tabs todos={todos} setTodos={setTodosMock} />);

    // Проверяем, что все задачи отображаются
    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.getByText('todo2')).toBeInTheDocument();
  });

  it('Проверяем, что во вкладке Active рендерятся только активные TODO', () => {
    // Мокаем данные для todos
    const todos: todosType = new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]);
    const setTodosMock = jest.fn();

    // Рендерим компонент
    render(<Tabs todos={todos} setTodos={setTodosMock} />);

    // Нажимаем на вкладку "Active"
    fireEvent.mouseDown(screen.getByText('Active'));

    // Проверяем, что только активные задачи отображаются
    expect(screen.getByText('todo1')).toBeInTheDocument();
    expect(screen.queryByText('todo2')).not.toBeInTheDocument();

  });

  it('Проверяем, что во вкладке Completed рендерятся только завершённые TODO', () => {
    // Мокаем данные для todos
    const todos: todosType = new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]);
    const setTodosMock = jest.fn();

    // Рендерим компонент
    render(<Tabs todos={todos} setTodos={setTodosMock} />);

    // Нажимаем на вкладку "Completed"
    fireEvent.mouseDown(screen.getByText('Completed'));

    // Проверяем, что только завершенные задачи отображаются
    expect(screen.queryByText('todo1')).not.toBeInTheDocument();
    expect(screen.getByText('todo2')).toBeInTheDocument();
  });

  it('Должен отображать количество незавершенных тудушек', () => {
    // Мокаем данные для todos
    const todos: todosType = new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]);
    const setTodosMock = jest.fn();

    // Рендерим компонент
    render(<Tabs todos={todos} setTodos={setTodosMock} />);

    // Проверка: Проверяем, что отображается правильное количество незавершенных тудушек
    expect(screen.getByText('1 items left')).toBeInTheDocument();
  });

  it('Должен вызывать функцию для удаления всех завершенных тудушек', () => {
    // Мокаем данные для todos
    const todos: todosType = new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]);
    const setTodosMock = jest.fn();

    // Рендерим компонент
    render(<Tabs todos={todos} setTodos={setTodosMock} />);

    // Действие: Нажимаем на кнопку для удаления всех завершенных тудушек
    fireEvent.click(screen.getByText('Clear completed'));

    // Проверка: Проверяем, что функция setTodosMock была вызвана
    expect(setTodosMock).toHaveBeenCalled();

    // Проверяем, что функция setTodosMock была вызвана с правильными аргументами
    expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function)); // Проверяем, что передана функция
    const callback = setTodosMock.mock.calls[0][0];
    const updatedMap = callback(new Map([
      ['todo1', 'active'],
      ['todo2', 'completed'],
    ]));

    // Проверяем, что все завершенные тудушки удалены
    expect(updatedMap.get('todo2')).toBeUndefined();
  });
});

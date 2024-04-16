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
});

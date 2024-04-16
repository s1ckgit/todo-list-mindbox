import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';

describe('Компонент формы', () => {
  it('Добавляет новый TODO, если инпут не пустой', () => {
    const setTodosMock = jest.fn();
    const todos = new Map();
    const inputValue = 'New Todo';

    render(<Form setTodos={setTodosMock} todos={todos} />);

    // Вводим текст в поле ввода
    const input = screen.getByPlaceholderText('Что планируем?');
    fireEvent.change(input, { target: { value: inputValue } });

    // Отправляем форму
    const submitButton = screen.getByRole('button', { name: /TODO/i });
    fireEvent.click(submitButton);

    // Проверяем, что функция setTodos была вызвана с правильными аргументами
    expect(setTodosMock).toHaveBeenCalledWith(new Map().set(inputValue, 'active'));
  });

  it('Не добавляет новый TODO, если инпут пустой', () => {
    const setTodosMock = jest.fn();
    const todos = new Map();

    render(<Form setTodos={setTodosMock} todos={todos} />);

    // Отправляем форму с пустым полем ввода
    const submitButton = screen.getByRole('button', { name: /TODO/i });
    fireEvent.click(submitButton);

    // Проверяем, что функция setTodos не была вызвана
    expect(setTodosMock).not.toHaveBeenCalled();
  });
});

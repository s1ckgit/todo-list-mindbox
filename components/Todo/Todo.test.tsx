import { render, fireEvent } from '@testing-library/react';
import Todo from './Todo';
import { type ITodo } from '@/app/page';

describe('Компонент Todo', () => {
  it('Должен изменять статус todo при нажатии на кнопку', () => {
    // Подготовка
    const todo: ITodo = ['Тестовое дело', 'active'];
    const setTodosMock = jest.fn();
    const { getByRole } = render(<Todo todo={todo} setTodos={setTodosMock} />);

    // Действие: Нажимаем на кнопку
    fireEvent.click(getByRole('button'));

    // Проверка: Проверяем, что setTodosMock был вызван
    expect(setTodosMock).toHaveBeenCalled();

    // Проверяем, что setTodosMock был вызван с правильными аргументами
    expect(setTodosMock).toHaveBeenCalledWith(expect.any(Function)); // Проверяем, что передана функция

    // Проверяем, что функция корректно обновляет статус тудушки
    const callback = setTodosMock.mock.calls[0][0];
    const updatedMap = callback(new Map([[todo[0], todo[1]]]));

    // Проверяем, что статус тудушки изменился на противоположный
    expect(updatedMap.get(todo[0])).toEqual('completed');
  });
});

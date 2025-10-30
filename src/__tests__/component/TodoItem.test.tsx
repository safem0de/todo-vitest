import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types/todo';

describe('<TodoItem />', () => {
    const sampleTodo: Todo = { id: 1, text: 'กินข้าว', done: false };
    // TC01
    test('TC01: แสดงข้อความของ todo ถูกต้อง', () => {
        render(<TodoItem todo={sampleTodo} onToggle={vi.fn()} onRemove={vi.fn()} />);
        expect(screen.getByText('กินข้าว')).toBeInTheDocument();
    });
    // TC02
    test('TC02: คลิกปุ่ม toggle เรียก onToggle พร้อม id', async () => {
        const handleToggle = vi.fn();
        render(<TodoItem todo={sampleTodo} onToggle={handleToggle} onRemove={vi.fn()} />);

        const user = userEvent.setup();
        const toggleButton = screen.getByText('กินข้าว');

        await user.click(toggleButton);
        expect(handleToggle).toHaveBeenCalledWith(1);
    });
    // TC03
    test('TC03: คลิกปุ่มลบ เรียก onRemove พร้อม id', async () => {
        const handleRemove = vi.fn();
        render(<TodoItem todo={sampleTodo} onToggle={vi.fn()} onRemove={handleRemove} />);

        const user = userEvent.setup();
        const removeButton = screen.getByLabelText('remove-1');

        await user.click(removeButton);
        expect(handleRemove).toHaveBeenCalledWith(1);
    });
    // TC04
    test('TC04: เมื่อ todo.done เป็น true ข้อความมีเส้นขีดทับ', () => {
        const doneTodo: Todo = { id: 2, text: 'นอนหลับ', done: true };
        render(<TodoItem todo={doneTodo} onToggle={vi.fn()} onRemove={vi.fn()} />);

        const todoText = screen.getByText('นอนหลับ');
        expect(todoText).toHaveClass('line-through');
    });
});
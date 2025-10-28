import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import AddTodoForm from '@/components/AddTodoForm';

test('calls onAdd when form is submitted', () => {
    const handleAdd = vi.fn();
    render(<AddTodoForm onAdd={handleAdd} />);

    const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
    fireEvent.change(input, { target: { value: 'เรียน Vitest' } });
    fireEvent.submit(input);

    expect(handleAdd).toHaveBeenCalledWith('เรียน Vitest');
});

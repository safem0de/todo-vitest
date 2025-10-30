import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi, describe } from 'vitest';
import AddTodoForm from '@/components/AddTodoForm';
import userEvent from '@testing-library/user-event'

describe('<AddTodoForm />', () => {
    // TC01 : "เรียน Vitest" Click “เพิ่ม” onAdd('เรียน Vitest') called, input cleared
    test('calls onAdd when form is submitted with text (by button)', () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
        const button = screen.getByText('เพิ่ม');

        fireEvent.change(input, { target: { value: 'เรียน Vitest' } });
        fireEvent.click(button)

        expect(handleAdd).toHaveBeenCalledWith('เรียน Vitest');
        expect((input as HTMLInputElement).value).toBe('')
    });

    // TC02 : "" Click “เพิ่ม” onAdd not called
    test('does not call onAdd when input is empty', () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);

        fireEvent.submit(screen.getByText('เพิ่ม'))
        expect(handleAdd).not.toHaveBeenCalled()
    });

    // TC03 " " Click “เพิ่ม” onAdd not called
    test('does not call onAdd for spaces only', () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.submit(screen.getByText('เพิ่ม'))
        expect(handleAdd).not.toHaveBeenCalled()
    })

    // TC04 "เรียน React" Press Enter keyonAdd ('เรียน React') called
    test('calls onAdd when form is submitted with text (by Enter)', async () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
        // await userEvent.type(input, 'เรียน React{enter}')
        const user = userEvent.setup({ delay: null });
        await user.type(input, 'เรียน React{enter}');

        expect(handleAdd).toHaveBeenCalledWith('เรียน React');
        expect((input as HTMLInputElement).value).toBe('')
    });

    // TC05 "A".repeat(200) Submit onAdd called once
    test('calls onAdd when input is 200 characters long', () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);
        const longText = 'A'.repeat(200);

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
        const button = screen.getByText('เพิ่ม');
        fireEvent.change(input, { target: { value: longText } });
        fireEvent.click(button)

        expect(handleAdd).toHaveBeenCalledWith(longText);
        expect((input as HTMLInputElement).value).toBe('')
    });

    // TC06 "เรียน TDD" Input text, see UI update Input value == "เรียน TDD"
    test('updates input value as user types', () => {
        render(<AddTodoForm onAdd={() => { }} />);
        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');

        fireEvent.change(input, { target: { value: 'เรียน TDD' } });
        expect((input as HTMLInputElement).value).toBe('เรียน TDD')
    });

    // TC07 "เรียน Unit Test" Add twice onAdd called twice, each time cleared
    test('calls onAdd each time form is submitted multiple times', () => {
        const handleAdd = vi.fn();
        render(<AddTodoForm onAdd={handleAdd} />);

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
        const button = screen.getByText('เพิ่ม');

        // First add
        fireEvent.change(input, { target: { value: 'เรียน Unit Test' } });
        fireEvent.click(button)
        expect(handleAdd).toHaveBeenCalledWith('เรียน Unit Test');
        expect((input as HTMLInputElement).value).toBe('')
        
        // Second add
        fireEvent.change(input, { target: { value: 'เรียน Unit Test' } });
        fireEvent.click(button)
        expect(handleAdd).toHaveBeenCalledWith('เรียน Unit Test');
        expect((input as HTMLInputElement).value).toBe('')

        expect(handleAdd).toHaveBeenCalledTimes(2);
    });
});

import TodoList from "@/components/TodoList";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

describe('<TodoList />', () => {
    //TC01: แสดงข้อความ "ยังไม่มีงานใด ๆ" เมื่อไม่มี to-do
    test('TC01: แสดงข้อความเมื่อไม่มี todo', () => {
        render(<TodoList todos={[]} onToggle={vi.fn()} onRemove={vi.fn()} />);
        expect(screen.getByText('ยังไม่มีงานใด ๆ')).toBeInTheDocument();
    });
    // TC02: เมื่อ todos มี 2 รายการ มี element <li> จำนวน 2
    test('TC02: แสดงรายการ todo ตามจำนวนที่ได้รับ', () => {
        const sampleTodos = [
            { id: 1, text: 'งานที่ 1', done: false },
            { id: 2, text: 'งานที่ 2', done: true },
        ];
        render(<TodoList todos={sampleTodos} onToggle={vi.fn()} onRemove={vi.fn()} />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(2);
    });
    //TC03: เมื่อกดปุ่ม toggle ใน item แรก onToggle ถูกเรียกด้วย id ของ item แรก
    test('TC03: ตรวจสอบการส่ง props onToggle และ onRemove ไปยัง TodoItem', () => {
        const sampleTodos = [
            { id: 1, text: 'งานที่ 1', done: false },
        ];
        const handleToggle = vi.fn();
        render(<TodoList todos={sampleTodos} onToggle={handleToggle} onRemove={vi.fn()} />);

        const todoText = screen.getByText('งานที่ 1');
        expect(todoText).toBeInTheDocument();
        // จำลองการคลิกเพื่อทดสอบ onToggle
        todoText.click();
        expect(handleToggle).toHaveBeenCalledWith(1);
    });
    // TC04 เมื่อกดปุ่ม remove ใน item ที่สอง onRemove ถูกเรียกด้วย id ของ item ที่สอง
    test('TC04: ตรวจสอบการส่ง props onRemove ไปยัง TodoItem', () => {
        const sampleTodos = [
            { id: 1, text: 'งานที่ 1', done: false },
            { id: 2, text: 'งานที่ 2', done: true },
        ];
        const handleRemove = vi.fn();
        render(<TodoList todos={sampleTodos} onToggle={vi.fn()} onRemove={handleRemove} />);
        const removeButton = screen.getByLabelText('remove-2');
        expect(removeButton).toBeInTheDocument();
        // จำลองการคลิกเพื่อทดสอบ onRemove
        removeButton.click();
        expect(handleRemove).toHaveBeenCalledWith(2);
    });
});
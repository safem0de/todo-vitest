import TodoStatsPage from "@/app/todo-stats/page";
import { useTodoStore } from "@/store/todoStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe('<TodoStatsPage /> Integration', () => {
    // รีเซ็ต store ทุกครั้งก่อน test
    beforeEach(() => {
        useTodoStore.setState({ todos: [] })
    })

    test('TC01: แสดงจำนวนงานเริ่มต้นเป็น 0', () => {
        render(<TodoStatsPage />)
        expect(screen.getByText(/จำนวนงานทั้งหมด: 0/)).toBeInTheDocument()
    });

    test('TC02: เพิ่มงานใหม่แล้วจำนวนอัปเดต', async () => {
        const user = userEvent.setup()
        render(<TodoStatsPage />)

        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
        const addButton = screen.getByText('เพิ่ม')

        await user.type(input, 'งานใหม่สุดเจ๋ง')
        await user.click(addButton)

        expect(screen.getByText(/จำนวนงานทั้งหมด: 1/)).toBeInTheDocument()
        expect(screen.getByText('งานใหม่สุดเจ๋ง')).toBeInTheDocument()
    });

    test('TC03: กดที่งานแล้ว toggle เป๋นตัวหนงสือขีดฆ่า', async () => {
        const user = userEvent.setup()
        render(<TodoStatsPage />)
        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
        const addButton = screen.getByText('เพิ่ม')
        await user.type(input, 'งานใหม่สุดเจ๋ง')
        await user.click(addButton)
        const todoText = screen.getByText('งานใหม่สุดเจ๋ง')
        expect(todoText).not.toHaveClass('line-through')
        await user.click(todoText)
        expect(todoText).toHaveClass('line-through')
    });

    test('TC04: ลบงานแล้วจำนวนอัปเดต', async () => {
        vi.spyOn(Date, 'now').mockReturnValue(1)
        
        const user = userEvent.setup()
        render(<TodoStatsPage />)
        const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
        const addButton = screen.getByText('เพิ่ม')

        await user.type(input, 'งานใหม่สุดเจ๋ง')
        await user.click(addButton)

        expect(screen.getByText(/จำนวนงานทั้งหมด: 1/)).toBeInTheDocument()
        const removeButton = screen.getByLabelText('remove-1')
        await user.click(removeButton)
        expect(screen.getByText(/จำนวนงานทั้งหมด: 0/)).toBeInTheDocument()
    });
});
import { describe, test, expect, vi } from 'vitest'
import { addTodo, removeTodo, toggleDone } from '@/lib/calculations'
import type { Todo } from '@/types/todo'

// ปิดการใช้ Date.now จริง เพื่อให้ predictable (test ไม่สุ่ม)
vi.spyOn(Date, 'now').mockReturnValue(1234567890)

describe('calculations library', () => {
    test('addTodo should add new todo', () => {
        const todos: Todo[] = []
        const result = addTodo(todos, 'เขียนโค้ด')
        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({
            id: 1234567890,
            text: 'เขียนโค้ด',
            done: false,
        })
    })

    test('addTodo should ignore empty text', () => {
        const todos: Todo[] = [{ id: 1, text: 'งานเดิม', done: false }]
        const result = addTodo(todos, '   ')
        expect(result).toEqual(todos)
    })

    test('removeTodo should remove correct item by id', () => {
        const todos: Todo[] = [
            { id: 1, text: 'A', done: false },
            { id: 2, text: 'B', done: false },
        ]
        const result = removeTodo(todos, 1)
        expect(result).toEqual([{ id: 2, text: 'B', done: false }])
    })

    test('toggleDone should switch done state', () => {
        const todos: Todo[] = [
            { id: 1, text: 'Test', done: false },
            { id: 2, text: 'Other', done: true },
        ]
        const result = toggleDone(todos, 1)

        // ตัวที่ id=1 ควรกลับค่า done
        expect(result.find(t => t.id === 1)?.done).toBe(true)

        // ตัวอื่นไม่ควรเปลี่ยน
        expect(result.find(t => t.id === 2)?.done).toBe(true)
    })
})

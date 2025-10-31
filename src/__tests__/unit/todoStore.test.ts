import { describe, test, expect } from 'vitest'
import { useTodoStore } from '@/store/todoStore'

describe('useTodoStore', () => {
  test('toggle ไม่เปลี่ยน state เมื่อ id ไม่ตรง', () => {
    // Arrange
    useTodoStore.setState({
      todos: [{ id: 1, text: 'Test', done: false }]
    })
    // Act
    useTodoStore.getState().toggle(999) // id ไม่ตรง
    // Assert
    const todos = useTodoStore.getState().todos
    expect(todos[0].done).toBe(false) // state ไม่เปลี่ยน
  })
})

import { test, expect } from 'vitest';
import { addTodo, removeTodo } from '@/lib/calculations';

test('adds a todo correctly', () => {
    const result = addTodo(['A'], 'B');
    expect(result).toEqual(['A', 'B']);
});

test('ignores empty todo', () => {
    const result = addTodo(['A'], ' ');
    expect(result).toEqual(['A']);
});

test('removes a todo by index', () => {
    const result = removeTodo(['A', 'B', 'C'], 1);
    expect(result).toEqual(['A', 'C']);
});

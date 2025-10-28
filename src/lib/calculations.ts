export function addTodo(todos: string[], newTodo: string) {
    if (!newTodo.trim()) return todos;
    return [...todos, newTodo];
}

export function removeTodo(todos: string[], index: number) {
    return todos.filter((_, i) => i !== index);
}

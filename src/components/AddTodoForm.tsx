'use client';
import { useState } from 'react';

export default function AddTodoForm({ onAdd }: Readonly<{ onAdd: (text: string) => void }>) {
    const [text, setText] = useState('');
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (text.trim()) {
                    onAdd(text);
                    setText('');
                }
            }}
            className="flex gap-2 mt-4"
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="เพิ่มงานใหม่..."
                className="text-black border rounded px-2 py-1 flex-1"
            />
            <button className="bg-blue-500 text-white px-4 rounded" type="submit">
                เพิ่ม
            </button>
        </form>
    );
}

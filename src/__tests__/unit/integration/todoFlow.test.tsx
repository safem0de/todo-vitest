import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import Page from '@/app/page';

test('user can add and see todo in list', async () => {
    render(<Page />);
    const input = screen.getByPlaceholderText('เพิ่มงานใหม่...');
    fireEvent.change(input, { target: { value: 'เขียน test ให้ผ่าน' } });
    fireEvent.submit(input);

    expect(await screen.findByText('เขียน test ให้ผ่าน')).toBeInTheDocument();
});

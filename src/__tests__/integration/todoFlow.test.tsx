import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect } from 'vitest'
import HomePage from '@/app/page'

test('user can add and remove a todo', async () => {
  render(<HomePage />)

  const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
  const button = screen.getByText('เพิ่ม')

  fireEvent.change(input, { target: { value: 'เรียน Vitest' } })
  fireEvent.click(button)

  // ตรวจว่า "to-do" ปรากฏ
  expect(await screen.findByText('เรียน Vitest')).toBeInTheDocument()

  // ลบ
  const removeBtn = screen.getByLabelText(/remove-/)
  fireEvent.click(removeBtn)

  expect(screen.queryByText('เรียน Vitest')).not.toBeInTheDocument()
})

import { render, screen, fireEvent } from '@testing-library/react'
import { test, expect, describe, vi } from 'vitest'
import HomePage from '@/app/page'

describe('<HomePage /> Integration Test', () => {
  // TC01: Render HomePage ทั้งหน้า (รวม form + list)	หน้าแสดงส่วนประกอบครบ
  test('TC01: Render HomePage ทั้งหน้า', () => {
    const { container } = render(<HomePage />)
    expect(
      screen.getByRole('heading', { name: '✅ Todo Playground' })
    ).toBeInTheDocument()

    expect(screen.getByPlaceholderText('เพิ่มงานใหม่...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'เพิ่ม' })).toBeInTheDocument()
    expect(container.querySelector('form')).toBeTruthy()

    expect(screen.getByText('ยังไม่มีงานใด ๆ')).toBeInTheDocument()
  });
  // TC02: เมื่อพิมพ์ข้อความและกด “เพิ่ม”	To-do ใหม่ปรากฏใน list
  test('TC02: เพิ่ม todo ใหม่', () => {
    render(<HomePage />)
    const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
    const addButton = screen.getByRole('button', { name: 'เพิ่ม' })
    fireEvent.change(input, { target: { value: 'งานทดสอบ' } })
    fireEvent.click(addButton)
    expect(screen.getByText('งานทดสอบ')).toBeInTheDocument()
  });
  // TC03: เมื่อกดปุ่ม toggle สถานะของ to-do เปลี่ยนแปลง
  test('TC03: Toggle สถานะ todo', () => {
    render(<HomePage />)
    const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
    const addButton = screen.getByRole('button', { name: 'เพิ่ม' })
    fireEvent.change(input, { target: { value: 'งานทดสอบ' } })
    fireEvent.click(addButton)
    const todoText = screen.getByText('งานทดสอบ')
    expect(todoText).not.toHaveClass('line-through')
    fireEvent.click(todoText)
    expect(todoText).toHaveClass('line-through')
  });
  // TC04: เมื่อกดปุ่มลบ	to-do ถูกลบออกจาก list
  test('TC04: ลบ todo', () => {
    vi.spyOn(Date, 'now').mockReturnValue(1) //แบบนี้เวลาสร้าง to-do → id จะเป็น 1 ทุกครั้ง ทำให้ test ทำงานตรงตามที่เขียนไว้
    render(<HomePage />)
    const input = screen.getByPlaceholderText('เพิ่มงานใหม่...')
    const addButton = screen.getByRole('button', { name: 'เพิ่ม' })

    fireEvent.change(input, { target: { value: 'งานทดสอบ' } })
    fireEvent.click(addButton)
    
    const todoText = screen.getByText('งานทดสอบ')
    expect(todoText).toBeInTheDocument()
    
    const removeButton = screen.getByLabelText('remove-1')
    fireEvent.click(removeButton)
    expect(todoText).not.toBeInTheDocument()
  });
});

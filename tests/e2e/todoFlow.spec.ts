// tests/e2e/todoFlow.e2e.ts
import { test, expect } from '@playwright/test'

test.describe('Todo Playground - E2E Flow', () => {

    test('TC01: ผู้ใช้สามารถเพิ่มงานใหม่ได้', async ({ page }) => {
        await page.goto('http://localhost:3002')

        // ตรวจว่ามี heading
        await expect(page.getByRole('heading', { name: '✅ Todo Playground' })).toBeVisible()

        // พิมพ์และเพิ่มงาน
        await page.getByPlaceholder('เพิ่มงานใหม่...').fill('เขียน E2E Test')
        await page.getByRole('button', { name: 'เพิ่ม' }).click()

        // ตรวจว่ามี to-do แสดงบนหน้า
        await expect(page.getByText('เขียน E2E Test')).toBeVisible()
    })

    test('TC02: ผู้ใช้สามารถ mark งานเสร็จได้', async ({ page }) => {
        await page.goto('http://localhost:3002')
        await page.getByPlaceholder('เพิ่มงานใหม่...').fill('เรียน Playwright')
        await page.getByRole('button', { name: 'เพิ่ม' }).click()

        const todoButton = page.getByText('เรียน Playwright')
        await todoButton.click()

        // ตรวจว่ามีเส้นขีดทับ (done)
        const className = await todoButton.getAttribute('class')
        expect(className).toContain('line-through')
    })

    test('TC03: ผู้ใช้สามารถลบงานได้', async ({ page }) => {
        await page.goto('http://localhost:3002')
        await page.getByPlaceholder('เพิ่มงานใหม่...').fill('ลบฉันสิ')
        await page.getByRole('button', { name: 'เพิ่ม' }).click()

        await page.getByLabel('remove').click()
        await expect(page.getByText('ลบฉันสิ')).not.toBeVisible()
    })
})

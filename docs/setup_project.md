### Create Test Project
```bash
npx create-next-app@latest todo-vitest --typescript
cd todo-vitest
```
- project structure
```bash
todo-vitest/
│
├─ src/
│  ├─ app/
│  │  ├─ page.tsx            # หน้าแรกของเว็บ
│  │  └─ layout.tsx          # layout หลัก
│  │
│  ├─ components/
│  │  ├─ TodoItem.tsx
│  │  ├─ TodoList.tsx
│  │  └─ AddTodoForm.tsx
│  │
│  ├─ lib/
│  │  ├─ calculations.ts     # logic สำหรับ test unit
│  │  └─ api.ts              # mock api (ภายหลังใช้กับ integration)
│  │
│  └─ types/
│  │  └─ todo.ts
│  │
│  └─ __tests__/             # 🧪 เก็บ test file ทั้งหมด
│     ├─ unit/
│     │  └─ calculations.test.ts
│     ├─ component/
│     │  └─ AddTodoForm.test.tsx
│     └─ integration/
│        └─ todoFlow.test.tsx
├─ tests/
│    └─ e2e/
│        └─
├─ vitest.config.ts
├─ vitest.setup.ts
├─ tsconfig.json
└─ package.json
```
| ตัวเลือก                  | คำตอบแนะนำ      | เหตุผล                    |
| ----------------------- | ------------- | ------------------------ |
| Use TypeScript?         | ✅ Yes         | เราเน้น type-safe testing |
| Use ESLint?             | ✅ Yes         | เพื่อ lint test code ด้วย   |
| Use Tailwind CSS?       | ✅ Yes         | สวย เร็ว ง่ายต่อการ test    |
| Use `src/` directory?   | ✅ Yes         | โครงสร้างสะอาด            |
| Use App Router?         | ✅ Yes         | เป็นมาตรฐาน Next.js ล่าสุด  |
| Use React Compiler?     | ❌ No          | ยัง experimental          |
| Use Turbopack?          | ❌ No          | ยัง unstable สำหรับ Vitest  |
| Customize import alias? | ✅ Yes (`@/*`) | ใช้ได้ทั้งใน test และ app    |
---
### Setup Test Project
| Type             | โฟลเดอร์                     | ใช้เครื่องมือ                     |
| ---------------- | --------------------------- | ----------------------------- |
| Unit Test        | `src/__tests__/unit`        | Vitest                        |
| Component Test   | `src/__tests__/component`   | Vitest + RTL                  |
| Integration Test | `src/__tests__/integration` | Vitest + RTL                  |
| E2E Test         | `tests/e2e`                 | Playwright / Cypress (ภายหลัง) |
- library install
```bash
npm install vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @vitejs/plugin-react
```
- vite.config.ts
```bash
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './vitest.setup.ts'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"), // ✅ ให้ Vitest เข้าใจ "@/..."
        },
    },
});
```
- vitest.setup.ts
```bash
import '@testing-library/jest-dom';
```
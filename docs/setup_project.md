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
│
├─ vitest.config.ts
├─ vitest.setup.ts
├─ tsconfig.json
└─ package.json
```
- library install
```bash
npm install vitest @testing-library/react @testing-library/jest-dom jsdom
npm install -D @vitejs/plugin-react
```
- vite.config.ts
```bash
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts'
  }
});
```
- vitest.setup.ts
```bash
import '@testing-library/jest-dom';
```
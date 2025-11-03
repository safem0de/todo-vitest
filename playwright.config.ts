// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e', // 👈 รันเฉพาะ E2E เท่านั้น
    use: {
        headless: true,
        baseURL: 'http://localhost:3002',
        trace: 'on',          // ✅ บันทึก trace
        screenshot: 'on',     // ✅ เก็บภาพแต่ละขั้น
        video: 'on',          // ✅ เก็บวิดีโอด้วย
    },
});

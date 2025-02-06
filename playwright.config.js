// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Define o diretório de testes
  use: {
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  testMatch: ['**/*.spec.js'], // Certifique-se de que os testes estejam no padrão correto
});

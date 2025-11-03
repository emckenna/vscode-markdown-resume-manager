import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: 'test/**/*.test.js',
  version: 'stable',
  workspaceFolder: './test-workspace',
  mocha: {
    ui: 'tdd',  // Use TDD interface (suite/test) instead of BDD (describe/it)
    timeout: 20000,
    color: true
  }
});

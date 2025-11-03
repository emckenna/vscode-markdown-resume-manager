import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: 'test/**/*.test.js',
  version: 'stable',
  workspaceFolder: './test-workspace',
  mocha: {
    ui: 'bdd',
    timeout: 20000,
    color: true
  }
});

# Testing Guide

This extension uses VS Code's official testing framework with Mocha.

## Setup

### Install Dependencies

```bash
npm install
```

This installs:
- `@vscode/test-cli` - Test runner
- `@vscode/test-electron` - VS Code test environment
- `@types/mocha` - TypeScript types for Mocha
- `@types/vscode` - TypeScript types for VS Code API

## Running Tests

### Command Line

```bash
# Run all tests
npm test

# Run tests in watch mode (not configured yet)
npm run test:watch
```

### VS Code UI

1. Install the **Extension Test Runner** extension (recommended)
2. Open the Testing view (test tube icon in sidebar)
3. Click **Run All Tests** or **Debug All Tests**

## Test Structure

### Test Files

- **Location:** `test/extension.test.js`
- **Pattern:** `test/**/*.test.js`
- **Framework:** Mocha with BDD interface (describe/it)

### Test Workspace

- **Location:** `test-workspace/`
- **Purpose:** Mock workspace with required structure
- **Contents:**
  - `resumes/tailored/` - For test resume creation
  - `cover-letters/tailored/` - For test cover letter creation
  - `scripts/build.sh` - Mock build script

## Test Suites

### 1. Extension Activation
Tests that the extension loads and activates correctly:
- Extension is present
- Extension activates successfully

### 2. Commands
Tests that all commands are registered:
- `markdownResumeManager.newResume`
- `markdownResumeManager.newCoverLetter`
- `markdownResumeManager.buildDocument`
- `markdownResumeManager.buildDocumentPDF`
- `markdownResumeManager.openBuildFolder`

### 3. Configuration
Tests configuration defaults:
- Build script path
- Resume output name
- Cover letter output name

### 4. Workspace Detection
Tests workspace folder detection

### 5. File Operations
Tests file path generation and directory handling

### 6. String Sanitization
Tests company name cleaning (lowercase, dash-separated)

### 7. Build Script Detection
Tests build script existence checking

## Writing New Tests

### Example Test

```javascript
suite('My New Feature', () => {
  test('Should do something', async () => {
    // Arrange
    const expected = 'result';

    // Act
    const result = await myFunction();

    // Assert
    assert.strictEqual(result, expected, 'Should match expected result');
  });

  test('Should handle errors', async () => {
    // Test error cases
    await assert.rejects(
      async () => await functionThatShouldFail(),
      /Error message regex/
    );
  });
});
```

### Test Best Practices

1. **Use descriptive names** - Test names should describe what they test
2. **Arrange-Act-Assert** - Structure tests clearly
3. **One assertion per test** - Keep tests focused (when possible)
4. **Use async/await** - VS Code API is async
5. **Clean up after tests** - Remove test files created

## Integration Tests vs Unit Tests

### Current Tests (Integration)
- Run in actual VS Code instance
- Have access to full VS Code API
- Test extension in real environment
- Slower but more realistic

### Future Unit Tests (Optional)
Could add pure unit tests for:
- String sanitization functions
- File path construction
- Configuration parsing

## Debugging Tests

### In VS Code

1. Open `test/extension.test.js`
2. Set breakpoints
3. Run **Test: Debug All Tests** from Command Palette
4. Or click **Debug** in Testing view

### Console Output

Tests show output in:
- **Terminal** when running `npm test`
- **Test Results** view in VS Code
- **Debug Console** when debugging

## Test Configuration

### .vscode-test.mjs

```javascript
export default defineConfig({
  files: 'test/**/*.test.js',        // Test file pattern
  version: 'stable',                  // VS Code version to test against
  workspaceFolder: './test-workspace', // Workspace to open during tests
  mocha: {
    ui: 'bdd',                        // Use describe/it syntax
    timeout: 20000,                   // 20 second timeout
    color: true                       // Colored output
  }
});
```

## Continuous Integration

### GitHub Actions (Future)

Example workflow:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
```

## Coverage (Future Enhancement)

To add coverage:

1. Install `nyc`:
   ```bash
   npm install --save-dev nyc
   ```

2. Add script to package.json:
   ```json
   "scripts": {
     "test:coverage": "nyc npm test"
   }
   ```

3. Configure in `.nycrc.json`

## Manual Testing Checklist

While automated tests cover basic functionality, manual testing is still important:

### Manual Test Checklist

- [ ] **Create Resume**
  - [ ] Enter company name
  - [ ] Enter position
  - [ ] Choose clipboard paste (with content)
  - [ ] Verify file created in correct location
  - [ ] Verify file has correct name

- [ ] **Create Cover Letter**
  - [ ] Enter company name
  - [ ] Choose open in editor
  - [ ] Verify file created in correct location

- [ ] **Build Document**
  - [ ] Open a markdown resume
  - [ ] Press Ctrl+Shift+B
  - [ ] Verify DOCX created in build folder

- [ ] **Build DOCX + PDF**
  - [ ] Open a markdown resume
  - [ ] Press Ctrl+Shift+Alt+B
  - [ ] Verify both files created

- [ ] **Open Build Folder**
  - [ ] Run command
  - [ ] Verify folder opens in OS

- [ ] **Error Handling**
  - [ ] Try building without build script
  - [ ] Try creating file that exists
  - [ ] Verify error messages

- [ ] **Configuration**
  - [ ] Change build script path
  - [ ] Verify extension uses new path
  - [ ] Change output names
  - [ ] Verify correct names used

## Test Files to Maintain

- `test/extension.test.js` - Main test suite
- `.vscode-test.mjs` - Test configuration
- `test-workspace/` - Test workspace structure
- This file - Testing documentation

## Troubleshooting

### Tests Don't Run

- Ensure dependencies installed: `npm install`
- Check VS Code version compatibility
- Try cleaning: `rm -rf .vscode-test` then re-run

### Tests Fail

- Check if workspace structure exists in `test-workspace/`
- Verify mock build script is executable
- Check test workspace has correct folders

### Extension Not Found

- Ensure package.json has correct extension ID
- Verify extension name matches in tests
- Check activation events

## Future Test Improvements

- [ ] Add more comprehensive integration tests
- [ ] Test clipboard paste with actual content
- [ ] Test file overwrite protection
- [ ] Test build script execution (mock)
- [ ] Test error scenarios
- [ ] Add UI automation tests (if needed)
- [ ] Add performance tests
- [ ] Set up CI/CD pipeline
- [ ] Add code coverage reporting
- [ ] Test on Windows/macOS/Linux

## Resources

- [VS Code Extension Testing](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
- [Mocha Documentation](https://mochajs.org/)
- [VS Code Test CLI](https://github.com/microsoft/vscode-test-cli)
- [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)

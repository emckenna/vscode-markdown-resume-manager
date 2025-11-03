# Testing Framework Setup

**Date:** 2025-11-03
**Status:** ✅ Complete

## What Was Added

Implemented VS Code's official testing framework using Mocha for automated testing.

## Files Created

1. **`.vscode-test.mjs`** - Test configuration
   - Defines test file pattern
   - Sets VS Code version (stable)
   - Configures test workspace
   - Mocha options (timeout, UI, colors)

2. **`test/extension.test.js`** - Test suite
   - Extension activation tests
   - Command registration tests
   - Configuration tests
   - Workspace detection tests
   - File operation tests
   - String sanitization tests
   - Build script detection tests

3. **`test-workspace/`** - Mock workspace
   - Has required structure (resumes/, cover-letters/, scripts/)
   - Mock build.sh script
   - Mimics real user workspace

4. **`TESTING.md`** - Testing documentation
   - How to run tests
   - How to write tests
   - Test structure explanation
   - Debugging guide
   - Manual testing checklist

## Testing Framework

### Technology Stack
- **Framework:** Mocha (BDD style with describe/it)
- **Runner:** `@vscode/test-cli`
- **Environment:** `@vscode/test-electron` (runs in VS Code)
- **Assertions:** Node.js assert module

### Test Types
- **Integration Tests** - Run in actual VS Code instance
- **Access to VS Code API** - Full extension API available
- **Real Environment** - Tests actual extension behavior

## Running Tests

### Command Line
```bash
npm install  # First time only
npm test     # Run all tests
```

### VS Code UI
1. Install Extension Test Runner extension
2. Open Testing view
3. Click "Run All Tests"

## Test Coverage

### Current Test Suites

1. **Extension Activation** ✅
   - Extension is present
   - Extension activates

2. **Commands** ✅
   - All 5 commands registered
   - Commands are callable

3. **Configuration** ✅
   - Default values correct
   - Settings accessible

4. **Workspace Detection** ✅
   - Workspace folder detected

5. **File Operations** ✅
   - Path generation correct
   - Directory handling

6. **String Sanitization** ✅
   - Company name cleaning

7. **Build Script Detection** ✅
   - Path construction

### Not Yet Tested (Future)
- [ ] Actual command execution (requires mocking)
- [ ] Clipboard operations
- [ ] File creation and deletion
- [ ] Build script execution
- [ ] Error handling paths
- [ ] UI interactions

## Dependencies Added

In `package.json`:

```json
"devDependencies": {
  "@vscode/test-cli": "^0.0.4",
  "@vscode/test-electron": "^2.3.8",
  "@types/vscode": "^1.60.0",
  "@types/mocha": "^10.0.6",
  "@types/node": "^20.x"
}
```

## Configuration

### .vscode-test.mjs
```javascript
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
```

## Benefits

1. **Automated Testing** - No more manual checklist for basic functionality
2. **Regression Prevention** - Catch breaks when making changes
3. **Confidence** - Know that core features work
4. **Documentation** - Tests serve as usage examples
5. **CI/CD Ready** - Can integrate with GitHub Actions
6. **Professional** - Shows quality standards

## Integration with TODO.md

The automated tests cover many items from the manual TODO checklist:

**Automated:**
- ✅ Extension activation
- ✅ Command registration
- ✅ Configuration defaults
- ✅ Workspace detection

**Still Manual:**
- UI interactions (clipboard paste, file dialogs)
- Build script execution with real files
- Cross-platform testing
- Error scenarios with real failures

## Future Enhancements

### Short Term
- [ ] Add tests for error scenarios
- [ ] Mock clipboard operations
- [ ] Test file creation (with cleanup)
- [ ] Test build script execution (mocked)

### Medium Term
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add code coverage reporting
- [ ] Test on multiple VS Code versions
- [ ] Test on Windows/macOS/Linux

### Long Term
- [ ] UI automation tests
- [ ] Performance tests
- [ ] Load tests (many files)
- [ ] Integration with real Pandoc

## Usage in Development

### Before Making Changes
```bash
npm test  # Ensure baseline passes
```

### After Making Changes
```bash
npm test  # Verify no regressions
```

### Adding New Features
1. Write test first (TDD style)
2. Implement feature
3. Run test to verify
4. Commit both code and test

## Documentation Updates

- ✅ DEVELOPMENT.md - Added testing section
- ✅ TESTING.md - New comprehensive guide
- ✅ test-workspace/README.md - Explains test workspace
- ✅ .claude/testing-setup.md - This file

## Manual Testing Still Important

Automated tests don't replace manual testing:
- UI/UX validation
- User flow testing
- Visual inspection
- Real-world usage
- Edge cases not yet covered

See TESTING.md for manual testing checklist.

## Commands Reference

```bash
# Install dependencies
npm install

# Run tests
npm test

# Debug tests (in VS Code)
# Open test file, set breakpoints, use "Debug Test"

# View test results
# Check terminal output or Testing view in VS Code
```

## Test Maintenance

### When to Update Tests
- Adding new commands
- Changing configuration options
- Modifying file structure
- Changing default values
- Fixing bugs (add regression test)

### Test Files to Maintain
- `test/extension.test.js` - Main test suite
- `.vscode-test.mjs` - Test configuration
- `test-workspace/` - Keep structure valid
- `TESTING.md` - Keep documentation current

## Resources

- **VS Code Testing Docs:** https://code.visualstudio.com/api/working-with-extensions/testing-extension
- **Mocha Docs:** https://mochajs.org/
- **VS Code Test CLI:** https://github.com/microsoft/vscode-test-cli
- **Extension Test Runner:** https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner

## Summary

You now have a **proper testing framework** that:
- ✅ Automates core functionality tests
- ✅ Integrates with VS Code's testing infrastructure
- ✅ Provides confidence when making changes
- ✅ Documents expected behavior
- ✅ Is ready for CI/CD integration

The manual TODO checklist is still valuable for UI/UX testing, but the automated tests handle the basics! 🎉

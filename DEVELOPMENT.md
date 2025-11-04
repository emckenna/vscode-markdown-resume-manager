# Development Guide

Quick reference for developing and maintaining the Markdown Resume Manager VS Code extension.

## Project Structure

```
vscode-markdown-resume-manager/
├── extension.js          # Main extension code
├── package.json          # Extension manifest and configuration
├── logo.png              # Extension icon
├── test/                 # Automated tests
│   └── extension.test.js # Test suite
├── test-workspace/       # Mock workspace for tests
├── .vscode-test.mjs      # Test configuration
├── .env                  # Personal Access Token (git-ignored)
├── .vscodeignore         # Files excluded from package
├── .gitignore            # Git ignore rules
├── README.md             # User documentation
├── CHANGELOG.md          # Version history
├── DEVELOPMENT.md        # This file
└── LICENSE               # MIT License
```

## Quick Start

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/emckenna/vscode-markdown-resume-manager.git
cd vscode-markdown-resume-manager

# Install dependencies
npm install

# Run tests to verify setup
npm test
```

## Local Development

### Method 1: Development Mode (Recommended)

This is the fastest way to test changes during development.

1. **Open the extension project in VS Code:**
   ```bash
   code .
   ```

2. **Press F5** or go to **Run > Start Debugging**
   - This launches a new VS Code window (Extension Development Host)
   - The extension is automatically loaded in this window

3. **Test in a sample project:**
   - In the Extension Development Host window: File > Open Folder
   - Open your resume project (e.g., `/home/eric-mckenna/work/github/resume`)
   - Test the extension commands and keyboard shortcuts

4. **Making changes:**
   - Edit `extension.js` or `package.json` in the original window
   - In the Extension Development Host window, press `Ctrl+R` (or `Cmd+R`) to reload
   - Changes are immediately reflected

5. **View logs:**
   - Check the Debug Console in the original VS Code window
   - Or use Output panel > Extension Host in the Extension Development Host

### Method 2: Install Locally as VSIX

Use this when you want to test the extension as users would experience it.

```bash
# Package the extension (output goes to dist/ folder)
npm run package

# Install the .vsix file
code --install-extension dist/markdown-resume-manager-1.0.1.vsix

# Reload VS Code
# Test the extension in your actual workspace

# Uninstall when done
# Go to Extensions view > Markdown Resume Manager > Uninstall
```

## Testing

```bash
# Run automated test suite
npm test

# The tests will:
# - Launch a VS Code instance
# - Run all test suites
# - Report results
```

See the Testing Checklist section below for manual testing scenarios.

## Keyboard Shortcuts Reference

Current default keybindings (as of v1.0.1):

- `Ctrl+K Ctrl+Alt+N` - Create new resume
- `Ctrl+K Ctrl+Alt+C` - Create new cover letter
- `Ctrl+K Ctrl+Alt+B` - Build current document (DOCX)
- `Ctrl+K Ctrl+Alt+D` - Build current document (DOCX + PDF)

These are designed to avoid conflicts with VS Code built-in shortcuts.

## Publishing to VS Code Marketplace

### One-Time Setup

1. **Create a Personal Access Token (PAT):**
   - Visit https://dev.azure.com/
   - User Settings > Personal Access Tokens > New Token
   - Name: "VS Code Marketplace"
   - Scopes: Select **Marketplace > Manage**
   - Copy the token (you won't see it again!)

2. **Store the token in `.env` file:**
   ```bash
   # Create .env file in project root (already git-ignored)
   echo "VSCE_PAT=your-token-here" > .env
   ```

### Publishing a New Version

The project uses npm scripts that automatically read from `.env`:

```bash
# Test first
npm test

# Publish current version (update package.json manually first)
npm run publish

# Or auto-bump and publish
npm run publish:patch   # 1.0.1 -> 1.0.2
npm run publish:minor   # 1.0.1 -> 1.1.0
npm run publish:major   # 1.0.1 -> 2.0.0
```

**Important:** Always update `CHANGELOG.md` before publishing.

### Manual Publishing (Alternative)

If you prefer not to use `.env`:

```bash
# Package locally
npm run package

# Publish manually
vsce publish --pat YOUR_TOKEN_HERE
```

## What's Covered by Automated Tests

The test suite (`test/extension.test.js`) covers:

- ✅ Project initialization and folder structure creation
- ✅ Resume and cover letter creation (all methods)
- ✅ Clipboard paste functionality
- ✅ File overwrite protection
- ✅ Build to DOCX and PDF
- ✅ Configuration settings
- ✅ Error handling (Pandoc checks, missing files, etc.)

Run `npm test` before publishing to ensure all tests pass.

## Debugging Tips

### Extension Not Loading

- Check the Output panel: View > Output > Select "Extension Host"
- Look for activation errors

### Commands Not Appearing

- Check `package.json` contributes.commands section
- Ensure command IDs match between `package.json` and `extension.js`
- Reload window after changes

### Keyboard Shortcuts Not Working

- Check for conflicts: Preferences > Keyboard Shortcuts
- Check the `when` clause in keybindings
- Test without `when` clause first

### Build Fails

- Check pandoc is installed: `pandoc --version`
- Verify file paths are correct (no typos in company/position names)
- Check that you're editing a markdown file in `resumes/` or `cover-letters/` folder

## VS Code API Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Extension Guides](https://code.visualstudio.com/api/extension-guides/overview)
- [Extension Examples](https://github.com/microsoft/vscode-extension-samples)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Common Issues

### "Cannot find module 'vscode'"

- This is expected in the editor
- The module is provided by VS Code at runtime
- Extension will work when running in debug mode

### "Extension activation failed"

- Check the Extension Host output for errors
- Ensure all required commands are registered
- Verify package.json syntax

## Future Enhancements

- [ ] Add templates support (base resume + company-specific overlays)
- [ ] Add resume preview in VS Code
- [ ] Add ATS keyword checker
- [ ] Add spell check integration
- [ ] Add diff view for tailored vs base resume
- [ ] Add job application tracking
- [ ] Multi-language support

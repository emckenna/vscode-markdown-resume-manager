# Development Guide

## Project Structure

```
vscode-markdown-resume-manager/
├── extension.js          # Main extension code
├── package.json          # Extension manifest
├── README.md            # User documentation
├── CHANGELOG.md         # Version history
├── LICENSE              # MIT License
├── .vscodeignore        # Files to exclude from package
├── .gitignore           # Git ignore rules
└── DEVELOPMENT.md       # This file
```

## Testing the Extension

### Method 1: Run in Development Mode (Recommended)

1. **Open the extension folder in VS Code:**
   ```bash
   code /home/eric-mckenna/work/github/vscode-markdown-resume-manager
   ```

2. **Press F5** or go to **Run > Start Debugging**

3. This opens a new VS Code window with the extension loaded (Extension Development Host)

4. In the new window, open your resume project:
   ```bash
   # From the Extension Development Host window
   File > Open Folder > /home/eric-mckenna/work/github/resume
   ```

5. **Test commands:**
   - Press `Ctrl+Shift+P` and type "Resume Manager"
   - Try `Ctrl+Shift+Alt+N` to create a resume
   - Try `Ctrl+Shift+B` while editing a markdown file

6. **View logs:** Check the Debug Console in the original VS Code window

### Method 2: Install as VSIX

1. **Install vsce (VS Code Extension Manager):**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Package the extension:**
   ```bash
   cd /home/eric-mckenna/work/github/vscode-markdown-resume-manager
   vsce package
   ```

3. **Install the .vsix file:**
   ```bash
   code --install-extension markdown-resume-manager-1.0.0.vsix
   ```

4. **Reload VS Code** and test

5. **Uninstall when done testing:**
   - Extensions view > Markdown Resume Manager > Uninstall

## Making Changes

1. **Edit** `extension.js` or `package.json`

2. **Reload the Extension Development Host:**
   - In the Extension Development Host window
   - Press `Ctrl+R` (or `Cmd+R` on Mac)
   - Or use Command Palette: "Developer: Reload Window"

3. **Test** your changes

## Publishing to Marketplace

### Prerequisites

1. **Create a publisher account:**
   - Visit https://marketplace.visualstudio.com/manage
   - Sign in with Microsoft/GitHub account
   - Create a publisher (replace "emckenna" in package.json with your publisher name)

2. **Get a Personal Access Token (PAT):**
   - Visit https://dev.azure.com
   - User Settings > Personal Access Tokens > New Token
   - Scopes: Select "Marketplace (Manage)"
   - Copy the token (you won't see it again!)

### Publishing Steps

1. **Update version** in `package.json` and `CHANGELOG.md`

2. **Login to vsce:**
   ```bash
   vsce login <your-publisher-name>
   # Enter your PAT when prompted
   ```

3. **Publish:**
   ```bash
   vsce publish
   ```

4. **Or publish a specific version:**
   ```bash
   vsce publish minor  # Bumps 1.0.0 -> 1.1.0
   vsce publish major  # Bumps 1.0.0 -> 2.0.0
   vsce publish patch  # Bumps 1.0.0 -> 1.0.1
   ```

## Testing Checklist

- [ ] Create new resume works
- [ ] Create new cover letter works
- [ ] Clipboard paste works
- [ ] File overwrite protection works
- [ ] Build to DOCX works
- [ ] Build to DOCX + PDF works
- [ ] Open build folder works
- [ ] Keyboard shortcuts work
- [ ] Command palette commands work
- [ ] Configuration settings work
- [ ] Works on empty file creation
- [ ] Error handling works (missing build script, etc.)

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

### Build Script Fails

- Check that build.sh exists in the workspace
- Check file permissions: `chmod +x scripts/build.sh`
- Check pandoc is installed: `pandoc --version`

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

- [ ] Add templates support
- [ ] Add resume preview
- [ ] Add ATS keyword checker
- [ ] Add spell check integration
- [ ] Add diff view for tailored vs base resume
- [ ] Add submission tracking
- [ ] Windows batch script support for build
- [ ] Icon and branding
- [ ] Automated tests

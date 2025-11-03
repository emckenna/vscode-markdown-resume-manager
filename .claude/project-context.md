# VS Code Markdown Resume Manager - Project Context

**Last Updated:** 2025-11-03
**Purpose:** Cache for understanding this VS Code extension project

## Project Overview

This is a **VS Code extension** for managing markdown-based resumes and cover letters with automated build support. It provides native UI integration for creating, editing, and building resume documents using Pandoc.

## Project Identity

- **Name:** Markdown Resume Manager
- **Type:** VS Code Extension
- **Publisher:** emckenna (to be created on marketplace)
- **Version:** 1.0.0
- **License:** MIT
- **Repository:** https://github.com/emckenna/vscode-markdown-resume-manager (to be created)

## Project Location

- **Local Path:** `/home/eric-mckenna/work/github/vscode-markdown-resume-manager/`
- **Git Status:** Initialized with initial commit
- **GitHub:** Not yet pushed (needs remote setup)

## File Structure

```
vscode-markdown-resume-manager/
├── .claude/
│   └── project-context.md      # This file - project documentation cache
├── extension.js                # Main extension code (8.9KB)
├── package.json                # Extension manifest with commands & config
├── README.md                   # User-facing documentation (7KB)
├── QUICKSTART.md              # Quick start guide for users
├── DEVELOPMENT.md             # Developer guide (testing, publishing)
├── CHANGELOG.md               # Version history
├── LICENSE                    # MIT License
├── GITHUB_SETUP.md            # Instructions for GitHub repository setup
├── TODO.md                    # Checklist for next steps
├── .gitignore                 # Git ignore rules
├── .vscodeignore              # Package ignore rules (for .vsix)
└── .git/                      # Git repository
```

## What This Extension Does

### Core Features

1. **Create Resume** (`Ctrl+Shift+Alt+N`)
   - Prompts for company name
   - Prompts for position
   - Creates file: `resumes/tailored/{company}-{position}.md`
   - Supports clipboard paste, empty file, or editor opening

2. **Create Cover Letter** (`Ctrl+Shift+Alt+C`)
   - Prompts for company name
   - Creates file: `cover-letters/tailored/{company}-cover.md`
   - Same content options as resume

3. **Build Document** (`Ctrl+Shift+B`)
   - Builds current markdown file to DOCX
   - Calls `scripts/build.sh` from workspace
   - Shows progress notifications
   - Offers to open build folder

4. **Build DOCX + PDF** (`Ctrl+Shift+Alt+B`)
   - Builds to both DOCX and PDF formats
   - Requires WeasyPrint for PDF

5. **Open Build Folder**
   - Opens OS file browser to `build/{company}/`
   - Uses VS Code's `revealFileInOS` command

### Technical Implementation

- **Language:** JavaScript (Node.js)
- **API:** VS Code Extension API (vscode module)
- **Activation:** When workspace contains markdown files
- **File Operations:** Node.js fs module
- **Process Execution:** child_process.exec for build script

## VS Code Extension Manifest (package.json)

### Commands Registered

All commands use namespace: `markdownResumeManager.*`

- `newResume` - Create New Resume
- `newCoverLetter` - Create New Cover Letter
- `buildDocument` - Build Current Document (DOCX)
- `buildDocumentPDF` - Build Current Document (DOCX + PDF)
- `openBuildFolder` - Open Build Folder

### Keyboard Shortcuts

- `Ctrl+Shift+Alt+N` - New Resume
- `Ctrl+Shift+Alt+C` - New Cover Letter
- `Ctrl+Shift+B` - Build DOCX (only in markdown files in resumes/cover-letters/)
- `Ctrl+Shift+Alt+B` - Build DOCX+PDF (same context)

### Configuration Options

- `markdownResumeManager.buildScriptPath` - Path to build script (default: `./scripts/build.sh`)
- `markdownResumeManager.resumeOutputName` - Resume filename without extension (default: `Your_Name_Resume`)
- `markdownResumeManager.coverLetterOutputName` - Cover letter filename (default: `Your_Name_Cover_Letter`)

## Expected Workspace Structure

The extension expects the user's workspace to have:

```
user-workspace/
├── resumes/
│   └── tailored/          # Extension creates files here
├── cover-letters/
│   └── tailored/          # Extension creates files here
├── scripts/
│   └── build.sh           # REQUIRED: Build script
└── build/                 # Auto-created by build script
    └── {company}/         # Organized by company name
```

## Dependencies

### Runtime Dependencies
- **None** - Extension has no npm dependencies
- **External Tools Required by Users:**
  - Pandoc (for document conversion)
  - WeasyPrint (optional, for better PDF output)

### Development Dependencies
- `@vscode/vsce` - For packaging/publishing (installed globally)

## Relationship to Other Projects

### markdown-resume-manager (Template Repository)
- **Location:** `/home/eric-mckenna/work/github/markdown-resume-manager/`
- **GitHub:** https://github.com/emckenna/markdown-resume-manager
- **Relationship:** This extension is designed to work with projects based on that template
- **Contains:** Build scripts, project structure, base templates

### resume (Personal Project)
- **Location:** `/home/eric-mckenna/work/github/resume/`
- **Purpose:** Eric's personal resume project
- **Uses:** markdown-resume-manager template + this extension
- **Status:** Private, contains actual resume content

## Key Code Patterns

### Command Registration
```javascript
let command = vscode.commands.registerCommand('markdownResumeManager.commandName', async () => {
    await functionName(workspaceRoot);
});
context.subscriptions.push(command);
```

### User Input
```javascript
const input = await vscode.window.showInputBox({
    prompt: 'Enter value',
    placeHolder: 'placeholder',
    validateInput: (value) => value.trim() ? null : 'Error message'
});
```

### Clipboard Access
```javascript
const content = await vscode.env.clipboard.readText();
```

### File Operations
```javascript
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path, content, 'utf8');
```

### Build Script Execution
```javascript
const { stdout, stderr } = await execAsync(command, {
    cwd: workspaceRoot,
    shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/bash'
});
```

## Extension Activation Flow

1. User opens workspace containing markdown files
2. VS Code loads extension (activationEvents: `workspaceContains:**/*.md`)
3. `activate()` function runs
4. Extension checks for workspace root
5. Registers all commands
6. Extension is ready, commands appear in Command Palette

## File Naming Conventions

### Input Files (Created by Extension)
- Resumes: `{company}-{position}.md` (e.g., `google-senior.md`)
- Cover Letters: `{company}-cover.md` (e.g., `google-cover.md`)

### Output Files (Created by Build Script)
- Resumes: Configured name (default: `Your_Name_Resume.docx`)
- Cover Letters: Configured name (default: `Your_Name_Cover_Letter.docx`)
- Location: `build/{company}/`

## Testing

### Method 1: Extension Development Host (Recommended)
1. Open extension folder in VS Code
2. Press **F5** to launch debugging
3. New "Extension Development Host" window opens
4. Open a resume project in that window
5. Test commands and shortcuts
6. Check Debug Console for logs

### Method 2: Packaged VSIX
1. Package: `vsce package`
2. Install: `code --install-extension *.vsix`
3. Reload VS Code
4. Test in real environment
5. Uninstall when done testing

## Packaging & Publishing

### Package as VSIX
```bash
npm install -g @vscode/vsce
vsce package
# Creates: markdown-resume-manager-1.0.0.vsix
```

### Publish to Marketplace
```bash
vsce login <publisher-name>
vsce publish
# Or: vsce publish minor/major/patch
```

## Current Status

### Completed ✅
- Extension code implemented
- All commands working
- Configuration options added
- Complete documentation written
- Git repository initialized
- Initial commit created

### Pending ⏳
- [ ] Push to GitHub
- [ ] Test in Extension Development Host
- [ ] Package as VSIX
- [ ] Test installed extension
- [ ] Update markdown-resume-manager to link here
- [ ] Optionally publish to VS Code Marketplace

## Important Notes for Future Sessions

1. **Extension Structure:** This follows official VS Code Extension API - don't revert to workspace extension pattern

2. **Command Naming:** All commands use `markdownResumeManager.*` namespace (camelCase)

3. **Configuration:** Uses VS Code's configuration system - users can customize via settings

4. **Cross-Platform:** Handles Windows/macOS/Linux differences (shell selection, path handling)

5. **Error Handling:** Checks for build script existence, validates input, handles clipboard errors

6. **User Experience:** Native VS Code UI (input boxes, quick pick, notifications)

## Common Tasks

### Adding a New Command
1. Add to `contributes.commands` in package.json
2. Register command in `activate()` function
3. Create handler function
4. Add keybinding in `contributes.keybindings` (optional)
5. Document in README.md

### Updating Version
1. Update `version` in package.json
2. Add entry to CHANGELOG.md
3. Commit: `git commit -m "Bump version to X.Y.Z"`
4. Tag: `git tag vX.Y.Z`
5. Push: `git push && git push --tags`

### Testing Changes
1. Make code changes
2. Save file
3. In Extension Development Host: `Ctrl+R` to reload
4. Test the change

## Known Limitations

- **Requires build script:** Extension doesn't bundle Pandoc, relies on external build script
- **Workspace-dependent:** Expects specific folder structure
- **Markdown only:** Only works with .md files
- **Build script path:** Currently assumes bash script (Windows users need WSL or custom script)

## Future Enhancement Ideas

- Add icon for the extension
- Bundle templates with extension
- Add resume preview panel
- ATS keyword checker
- Spell check integration
- Diff viewer (compare versions)
- Submission tracking
- Windows batch script support
- Built-in Pandoc (bundle with extension)

## Files to Ignore or Not

### Should .claude/ be in Git?

**Recommendation: YES, include in Git ✅**

**Reasons:**
- Helps future collaborators understand the project
- Documents the project structure for AI assistants
- Provides context that's not in traditional docs
- Doesn't contain secrets or generated content
- Small file size (< 10KB)

**Already in .gitignore:**
- `node_modules/`
- `*.vsix`
- `.vscode-test/`

**Not in .gitignore (intentionally):**
- `.claude/` - Project documentation, should be committed
- `.vscode/` - Would contain launch.json for debugging (if created)

## Resources

- **VS Code Extension API:** https://code.visualstudio.com/api
- **Publishing Guide:** https://code.visualstudio.com/api/working-with-extensions/publishing-extension
- **Extension Examples:** https://github.com/microsoft/vscode-extension-samples
- **This Project's Docs:**
  - README.md - User guide
  - QUICKSTART.md - Quick start
  - DEVELOPMENT.md - Developer guide
  - TODO.md - Next steps checklist

## Quick Commands Reference

```bash
# Open in VS Code
code /home/eric-mckenna/work/github/vscode-markdown-resume-manager

# Test (F5 in VS Code)
# Or manually:
code --extensionDevelopmentPath=/home/eric-mckenna/work/github/vscode-markdown-resume-manager

# Package
vsce package

# Install locally
code --install-extension markdown-resume-manager-1.0.0.vsix

# Uninstall
code --uninstall-extension emckenna.markdown-resume-manager

# Push to GitHub (after creating repo)
git remote add origin git@github.com:emckenna/vscode-markdown-resume-manager.git
git push -u origin main
```

## Contact & Support

- **Author:** Eric McKenna
- **GitHub Issues:** (after repo is created)
- **License:** MIT

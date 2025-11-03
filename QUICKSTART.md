# Quick Start Guide

## Installation

### Option 1: Install from VSIX (Local Testing)

```bash
# Package the extension
cd /home/eric-mckenna/work/github/vscode-markdown-resume-manager
npm install -g @vscode/vsce
vsce package

# Install in VS Code
code --install-extension markdown-resume-manager-1.0.0.vsix
```

### Option 2: Run in Debug Mode

```bash
# Open extension in VS Code
code /home/eric-mckenna/work/github/vscode-markdown-resume-manager

# Press F5 to launch Extension Development Host
# Then open your resume project in the new window
```

## First Use

1. **Open your resume project** in VS Code
2. **Create a resume:**
   - Press `Ctrl+Shift+Alt+N`
   - Enter company name: `google`
   - Enter position: `senior-engineer`
   - Choose "Paste from clipboard" (if you have content)
   - Or choose "Open empty file in editor"
3. **Build it:**
   - Press `Ctrl+Shift+B` while editing the file
   - Your files are in `build/google/`

## Commands

Access via Command Palette (`Ctrl+Shift+P`):

- **Resume Manager: Create New Resume**
- **Resume Manager: Create New Cover Letter**
- **Resume Manager: Build Current Document (DOCX)**
- **Resume Manager: Build Current Document (DOCX + PDF)**
- **Resume Manager: Open Build Folder**

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New Resume | `Ctrl+Shift+Alt+N` |
| New Cover Letter | `Ctrl+Shift+Alt+C` |
| Build DOCX | `Ctrl+Shift+B` |
| Build DOCX+PDF | `Ctrl+Shift+Alt+B` |

## Project Structure Required

Your workspace should have:

```
your-project/
├── resumes/
│   └── tailored/       # Extension creates files here
├── cover-letters/
│   └── tailored/       # Extension creates files here
├── scripts/
│   └── build.sh        # REQUIRED: Build script
└── build/             # Auto-created by build script
    └── {company}/     # Build outputs organized by company
```

## Configuration

Set in VS Code settings (`.vscode/settings.json` or User Settings):

```json
{
  "markdownResumeManager.buildScriptPath": "./scripts/build.sh",
  "markdownResumeManager.resumeOutputName": "Your_Name_Resume",
  "markdownResumeManager.coverLetterOutputName": "Your_Name_Cover_Letter"
}
```

## Troubleshooting

**"Build script not found"**
- Ensure `scripts/build.sh` exists
- Check the `buildScriptPath` setting
- Make script executable: `chmod +x scripts/build.sh`

**Commands don't appear**
- Reload VS Code window
- Check Extension is enabled in Extensions view

**Keyboard shortcuts don't work**
- Must be editing a markdown file
- File must be in `resumes/` or `cover-letters/` folder
- Check for conflicts in Keyboard Shortcuts settings

## Get the Build Script

If you don't have `build.sh`:

```bash
# From markdown-resume-manager template
curl -o scripts/build.sh \
  https://raw.githubusercontent.com/emckenna/markdown-resume-manager/main/scripts/build.sh

chmod +x scripts/build.sh
```

Or create your own that accepts these arguments:
```bash
./scripts/build.sh -f docx path/to/file.md
./scripts/build.sh -f docx,pdf path/to/file.md
```

## Next Steps

- Read the [full README](README.md) for detailed documentation
- Check [DEVELOPMENT.md](DEVELOPMENT.md) for testing and development
- See [CHANGELOG.md](CHANGELOG.md) for version history

## Support

- Report issues: https://github.com/emckenna/vscode-markdown-resume-manager/issues
- Template repository: https://github.com/emckenna/markdown-resume-manager

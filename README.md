# Markdown Resume Manager

A VS Code extension for managing markdown-based resumes and cover letters with automated build support using Pandoc.

## Features

- ✨ **Create Resumes & Cover Letters** - Interactive prompts guide you through document creation
- 📋 **Clipboard Support** - Paste content directly from Claude/ChatGPT/Opus
- 🏗️ **One-Click Building** - Build to DOCX and PDF with keyboard shortcuts
- 📁 **Smart File Organization** - Automatically organizes files by company name
- 🚀 **Quick Access** - Open build folders directly from VS Code
- ⌨️ **Keyboard Shortcuts** - Efficient workflow with customizable keybindings

## Requirements

- [Pandoc](https://pandoc.org/installing.html) - Required for markdown-to-DOCX/PDF conversion
  - Windows: Download the installer from [pandoc.org/installing.html](https://pandoc.org/installing.html)
  - macOS: `brew install pandoc`
  - Linux: `sudo apt install pandoc` or equivalent
- Optional: [WeasyPrint](https://weasyprint.org/) - For better PDF generation (`pip install weasyprint`)

## Getting Started

### 1. Install the Extension

**From VS Code Marketplace:**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Markdown Resume Manager"
4. Click Install

**Or install manually:**
```bash
code --install-extension markdown-resume-manager-1.0.1.vsix
```

[Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=EricMcKenna.markdown-resume-manager)

### 2. Install Pandoc

Make sure Pandoc is installed on your system:
- Download from [pandoc.org/installing.html](https://pandoc.org/installing.html)
- Verify installation: `pandoc --version`

### 3. Initialize Your Project

1. Open a folder in VS Code (or create a new one)
2. Open Command Palette (Ctrl+Shift+P)
3. Run: **Resume Manager: Initialize Project Structure**

This creates:
```
your-resume-project/
├── resumes/
│   └── tailored/          # Company-specific resumes
├── cover-letters/
│   └── tailored/          # Company-specific cover letters
├── templates/             # Base templates
└── build/                 # Generated DOCX/PDF files (auto-created)
```

## Usage

### Creating a New Resume

**Method 1: Keyboard Shortcut**

- Press `Ctrl+K` then `Ctrl+Alt+N` (Windows/Linux) or `Cmd+K` then `Cmd+Alt+N` (Mac)

**Method 2: Command Palette**
- Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
- Type "Resume Manager: Create New Resume"

**Then:**
1. Enter company name (e.g., "google")
2. Enter position (e.g., "senior-engineer") - optional
3. Choose content source:
   - **Paste from clipboard** - If you have markdown content copied
   - **Open empty file in editor** - Start from scratch
   - **Create empty file** - Just create the file
4. Optionally build immediately

### Creating a Cover Letter

Same as above, but use:

- Keyboard: `Ctrl+K` then `Ctrl+Alt+C` (or `Cmd+K` then `Cmd+Alt+C`)
- Command: "Resume Manager: Create New Cover Letter"

### Building Documents

While editing a markdown resume or cover letter:

**Build to DOCX:**

- Press `Ctrl+K` then `Ctrl+Alt+B` (or `Cmd+K` then `Cmd+Alt+B`)
- Or use Command Palette: "Resume Manager: Build Current Document (DOCX)"

**Build to DOCX + PDF:**

- Press `Ctrl+K` then `Ctrl+Alt+D` (or `Cmd+K` then `Cmd+Alt+D`)
- Or use Command Palette: "Resume Manager: Build Current Document (DOCX + PDF)"

### Opening Build Folders

- Use Command Palette: "Resume Manager: Open Build Folder"
- Or click "Open Build Folder" after a successful build

## Commands

All commands are available via the Command Palette (`Ctrl+Shift+P`):

- `Resume Manager: Initialize Project Structure` - Set up the required folder structure
- `Resume Manager: Create New Resume` - Create a new tailored resume
- `Resume Manager: Create New Cover Letter` - Create a new cover letter
- `Resume Manager: Build Current Document (DOCX)` - Build to DOCX
- `Resume Manager: Build Current Document (DOCX + PDF)` - Build both formats
- `Resume Manager: Open Build Folder` - Open the build folder

## Keyboard Shortcuts

This extension uses **chord keybindings** (two-step shortcuts) to avoid conflicts with VS Code's built-in commands. To use a chord keybinding, press the first key combination, release it, then press the second key combination.

> **Note:** These keybindings are designed to not conflict with VS Code's built-in shortcuts out of the box. However, you're free to customize them in your VS Code settings (File > Preferences > Keyboard Shortcuts) to match your preferred workflow.

For example, to build a document:

1. Press and release `Ctrl+K` (you'll see "Ctrl+K was pressed. Waiting for second key..." in the status bar)
2. Then press `Ctrl+Alt+B`

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| New Resume | `Ctrl+K Ctrl+Alt+N` | `Cmd+K Cmd+Alt+N` |
| New Cover Letter | `Ctrl+K Ctrl+Alt+C` | `Cmd+K Cmd+Alt+C` |
| Build (DOCX) | `Ctrl+K Ctrl+Alt+B`* | `Cmd+K Cmd+Alt+B`* |
| Build (DOCX+PDF) | `Ctrl+K Ctrl+Alt+D` | `Cmd+K Cmd+Alt+D` |

*Only works when editing markdown files in `resumes/` or `cover-letters/` folders

## Configuration

Configure the extension in VS Code settings:

```json
{
  "markdownResumeManager.resumeOutputName": "Your_Name_Resume",
  "markdownResumeManager.coverLetterOutputName": "Your_Name_Cover_Letter",
  "markdownResumeManager.pandocPath": "pandoc"
}
```

### Settings

- `markdownResumeManager.resumeOutputName` - Output filename for resumes without extension (default: `Your_Name_Resume`)
- `markdownResumeManager.coverLetterOutputName` - Output filename for cover letters without extension (default: `Your_Name_Cover_Letter`)
- `markdownResumeManager.pandocPath` - Path to Pandoc executable (default: `pandoc`). On Windows, if Pandoc is not in your PATH, set this to the full path: `C:\\Program Files\\Pandoc\\pandoc.exe`

## Typical Workflow with AI Tools

1. **Ask Claude/ChatGPT/Opus to generate a tailored resume**
   - "Create a resume tailored for a Senior Software Engineer position at Google"

2. **Copy the markdown output to clipboard**

3. **In VS Code, press `Ctrl+K` then `Ctrl+Alt+N`**

4. **Enter company**: `google`

5. **Enter position**: `senior-engineer`

6. **Choose "Paste from clipboard"**

7. **File created at**: `resumes/tailored/google-senior-engineer.md`

8. **Make any edits needed**

9. **Press `Ctrl+K` then `Ctrl+Alt+B` to build**

10. **Click "Open Build Folder"**

11. **Your files are ready**: `build/google/Your_Name_Resume.docx`

## File Naming Conventions

**Input files:**
- Resumes: `{company}-{position}.md` (e.g., `google-senior.md`)
- Cover Letters: `{company}-cover.md` (e.g., `google-cover.md`)

**Output files:**
- All resumes: Configured name (default: `Your_Name_Resume.docx`)
- All cover letters: Configured name (default: `Your_Name_Cover_Letter.docx`)
- Organized in: `build/{company}/`

## Troubleshooting

### "Pandoc is not installed"

- Install Pandoc from [pandoc.org/installing.html](https://pandoc.org/installing.html)
- **Windows**: Download and run the .msi installer
- **macOS**: `brew install pandoc`
- **Linux**: `sudo apt install pandoc` (or your distro's package manager)
- Verify installation: `pandoc --version`
- Restart VS Code after installing Pandoc

**Windows users:** If Pandoc is installed but not recognized:

1. Open VS Code settings (Ctrl+,)
2. Search for "Markdown Resume Manager"
3. Set `Pandoc Path` to the full path: `C:\Program Files\Pandoc\pandoc.exe`

### "Build folder doesn't exist"

- You need to build the document first before opening the build folder
- The folder is created automatically during the first build

### PDF generation failed

- PDF generation requires additional dependencies
- Install WeasyPrint: `pip install weasyprint`
- Or use DOCX-only builds with `Ctrl+K` then `Ctrl+Alt+B`

### Keyboard shortcuts not working

- Make sure you're editing a markdown file in `resumes/` or `cover-letters/`
- Check for conflicting keybindings in VS Code settings

### Extension not activating

- Make sure you have a workspace folder open
- Extension activates when markdown files are present in the workspace

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Eric McKenna - [GitHub](https://github.com/emckenna)

## Publishing & Development

### For Developers

**Testing:**
```bash
npm test                    # Run extension tests
```

**Packaging:**
```bash
npm run package             # Create .vsix file in dist/ folder
```

**Publishing to VS Code Marketplace:**

1. Create a Personal Access Token:
   - Go to https://dev.azure.com/
   - User Settings → Personal Access Tokens
   - Create token with **Marketplace > Manage** scope

2. Store the token in `.env` file (already git-ignored):
   ```bash
   VSCE_PAT=your-token-here
   ```

3. Publish with npm scripts:
   ```bash
   npm run publish         # Publish current version
   npm run publish:patch   # Bump patch version (1.0.0 → 1.0.1) and publish
   npm run publish:minor   # Bump minor version (1.0.0 → 1.1.0) and publish
   npm run publish:major   # Bump major version (1.0.0 → 2.0.0) and publish
   ```

**Note:** The `.env` file is excluded from git and packaging via `.gitignore` and `.vscodeignore` for security.

## Changelog

### 1.0.0 (2025-11-03)

- ✨ Initial release
- 📝 Create resumes and cover letters with interactive prompts
- 🏗️ Build to DOCX and PDF using Pandoc (no shell scripts required!)
- 📋 Clipboard paste support for quick content insertion
- ⚙️ Configurable output names
- 🌍 Full cross-platform support (Windows, macOS, Linux)
- 🚀 One-command project initialization
- ⌨️ Keyboard shortcuts for all major operations
- ✅ Automated testing with 14 test suites
- 📦 Native build system - no external scripts needed

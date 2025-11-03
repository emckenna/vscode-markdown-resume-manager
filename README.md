# Markdown Resume Manager

A VS Code extension for managing markdown-based resumes and cover letters with automated build support using Pandoc.

## Features

- ✨ **Create Resumes & Cover Letters** - Interactive prompts guide you through document creation
- 📋 **Clipboard Support** - Paste content directly from Claude/ChatGPT/Opus
- 🏗️ **One-Click Building** - Build to DOCX and PDF with keyboard shortcuts
- 📁 **Smart File Organization** - Automatically organizes files by company name
- 🚀 **Quick Access** - Open build folders directly from VS Code
- ⌨️ **Keyboard Shortcuts** - Efficient workflow with customizable keybindings

![Demo](https://via.placeholder.com/800x450?text=Demo+GIF+Here)

## Requirements

- [Pandoc](https://pandoc.org/installing.html) - Required for markdown-to-DOCX/PDF conversion
- Optional: [WeasyPrint](https://weasyprint.org/) - For better PDF generation (`pip install weasyprint`)

## Getting Started

### 1. Install the Extension

Install from the VS Code Marketplace or manually:

```bash
# Clone or download this extension
git clone https://github.com/emckenna/markdown-resume-manager.git
cd vscode-markdown-resume-manager

# Install dependencies
npm install

# Package the extension
npm install -g @vscode/vsce
vsce package

# Install the .vsix file in VS Code
code --install-extension markdown-resume-manager-1.0.0.vsix
```

### 2. Set Up Your Project

Create a workspace with this structure:

```
your-resume-project/
├── resumes/
│   └── tailored/          # Company-specific resumes
├── cover-letters/
│   └── tailored/          # Company-specific cover letters
├── build/                 # Generated DOCX/PDF files (auto-created)
├── scripts/
│   └── build.sh           # Build script (required)
└── templates/             # Base templates
```

### 3. Add the Build Script

Download `build.sh` from the [markdown-resume-manager repository](https://github.com/emckenna/markdown-resume-manager) and place it in `scripts/build.sh`.

## Usage

### Creating a New Resume

**Method 1: Keyboard Shortcut**
- Press `Ctrl+Shift+Alt+N` (Windows/Linux) or `Cmd+Shift+Alt+N` (Mac)

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
- Keyboard: `Ctrl+Shift+Alt+C` (or `Cmd+Shift+Alt+C`)
- Command: "Resume Manager: Create New Cover Letter"

### Building Documents

While editing a markdown resume or cover letter:

**Build to DOCX:**
- Press `Ctrl+Shift+B` (or `Cmd+Shift+B`)
- Or use Command Palette: "Resume Manager: Build Current Document (DOCX)"

**Build to DOCX + PDF:**
- Press `Ctrl+Shift+Alt+B` (or `Cmd+Shift+Alt+B`)
- Or use Command Palette: "Resume Manager: Build Current Document (DOCX + PDF)"

### Opening Build Folders

- Use Command Palette: "Resume Manager: Open Build Folder"
- Or click "Open Build Folder" after a successful build

## Commands

All commands are available via the Command Palette (`Ctrl+Shift+P`):

- `Resume Manager: Create New Resume` - Create a new tailored resume
- `Resume Manager: Create New Cover Letter` - Create a new cover letter
- `Resume Manager: Build Current Document (DOCX)` - Build to DOCX
- `Resume Manager: Build Current Document (DOCX + PDF)` - Build both formats
- `Resume Manager: Open Build Folder` - Open the build folder

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| New Resume | `Ctrl+Shift+Alt+N` | `Cmd+Shift+Alt+N` |
| New Cover Letter | `Ctrl+Shift+Alt+C` | `Cmd+Shift+Alt+C` |
| Build (DOCX) | `Ctrl+Shift+B`* | `Cmd+Shift+B`* |
| Build (DOCX+PDF) | `Ctrl+Shift+Alt+B` | `Cmd+Shift+Alt+B` |

*Only works when editing markdown files in `resumes/` or `cover-letters/` folders

## Configuration

Configure the extension in VS Code settings:

```json
{
  "markdownResumeManager.buildScriptPath": "./scripts/build.sh",
  "markdownResumeManager.resumeOutputName": "Your_Name_Resume",
  "markdownResumeManager.coverLetterOutputName": "Your_Name_Cover_Letter"
}
```

### Settings

- `markdownResumeManager.buildScriptPath` - Path to build script (default: `./scripts/build.sh`)
- `markdownResumeManager.resumeOutputName` - Output filename for resumes without extension (default: `Your_Name_Resume`)
- `markdownResumeManager.coverLetterOutputName` - Output filename for cover letters without extension (default: `Your_Name_Cover_Letter`)

## Typical Workflow with AI Tools

1. **Ask Claude/ChatGPT/Opus to generate a tailored resume**
   - "Create a resume tailored for a Senior Software Engineer position at Google"

2. **Copy the markdown output to clipboard**

3. **In VS Code, press `Ctrl+Shift+Alt+N`**

4. **Enter company**: `google`

5. **Enter position**: `senior-engineer`

6. **Choose "Paste from clipboard"**

7. **File created at**: `resumes/tailored/google-senior-engineer.md`

8. **Make any edits needed**

9. **Press `Ctrl+Shift+B` to build**

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

### "Build script not found"
- Ensure `scripts/build.sh` exists in your workspace
- Check the `markdownResumeManager.buildScriptPath` setting
- Make sure the script is executable: `chmod +x scripts/build.sh`

### "Pandoc not found"
- Install Pandoc: https://pandoc.org/installing.html
- Verify installation: `pandoc --version`

### "Build folder doesn't exist"
- You need to build the document first before opening the build folder
- The folder is created automatically during the first build

### Keyboard shortcuts not working
- Make sure you're editing a markdown file in `resumes/` or `cover-letters/`
- Check for conflicting keybindings in VS Code settings

## Related Projects

- [markdown-resume-manager](https://github.com/emckenna/markdown-resume-manager) - Template repository with build scripts and project structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

Eric McKenna - [GitHub](https://github.com/emckenna)

## Changelog

### 1.0.0 (2025-11-03)
- Initial release
- Create resumes and cover letters with interactive prompts
- Build to DOCX and PDF
- Clipboard paste support
- Configurable output names
- Cross-platform support (Windows, macOS, Linux)

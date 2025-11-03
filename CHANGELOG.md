# Change Log

All notable changes to the "Markdown Resume Manager" extension will be documented in this file.

## [1.0.0] - 2025-11-03

### 🎉 Initial Release

**Core Features:**

- ✨ Interactive document creation with native VS Code prompts
- 📝 Create company-specific resumes with position targeting
- 💼 Create tailored cover letters
- 📋 Clipboard paste support using VS Code's native API
- 🏗️ Native cross-platform build system (no shell scripts required!)
- 🚀 One-command project initialization
- 📦 Build to DOCX and PDF formats using Pandoc
- 📁 Smart file organization by company name
- ⌨️ Keyboard shortcuts for all major operations
- ⚙️ Configurable output filenames

**Commands:**

- `Resume Manager: Initialize Project Structure` - Set up folder structure
- `Resume Manager: Create New Resume` - Create new tailored resume
- `Resume Manager: Create New Cover Letter` - Create new cover letter
- `Resume Manager: Build Current Document (DOCX)` - Build to DOCX only
- `Resume Manager: Build Current Document (DOCX + PDF)` - Build both formats
- `Resume Manager: Open Build Folder` - Open build output folder

**Keyboard Shortcuts:**

- `Ctrl+K Ctrl+R` - Create new resume
- `Ctrl+K Ctrl+C` - Create new cover letter
- `Ctrl+K Ctrl+B` - Build current document (DOCX)
- `Ctrl+K Ctrl+P` - Build current document (DOCX + PDF)

**Cross-Platform Support:**

- ✅ Windows (native Pandoc support, no WSL required)
- ✅ macOS
- ✅ Linux
- No shell scripts or bash dependencies

**Developer Features:**

- ✅ Automated testing with 14 test suites (Mocha + @vscode/test-cli)
- ✅ Test coverage for all major commands
- ✅ Project initialization tests
- ✅ Configuration validation tests
- ✅ Proper error handling and user notifications

**Configuration:**

- `markdownResumeManager.resumeOutputName` - Customize resume output filename
- `markdownResumeManager.coverLetterOutputName` - Customize cover letter output filename

### Technical Details

- Native JavaScript build system replaces bash scripts
- Direct Pandoc integration via Node.js child_process
- Automatic Pandoc availability checking
- Smart directory creation and management
- File overwrite protection
- Build progress notifications

# GitHub Repository Setup Guide

## Steps to Create GitHub Repository

### 1. Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `vscode-markdown-resume-manager`
3. **Description:** VS Code extension for managing markdown-based resumes and cover letters with automated build support
4. **Visibility:** Public (recommended for VS Code Marketplace)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### 2. Connect Local Repository to GitHub

```bash
cd /home/eric-mckenna/work/github/vscode-markdown-resume-manager

# Add remote
git remote add origin git@github.com:emckenna/vscode-markdown-resume-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Configure Repository Settings

On GitHub, go to your repository settings:

**About Section (Right side of repo page):**
- Click the gear icon
- Add description: "VS Code extension for managing markdown-based resumes and cover letters"
- Add website: (optional - can add marketplace link later)
- Add topics: `vscode-extension`, `markdown`, `resume`, `cover-letter`, `pandoc`, `job-search`

**Optional: Add Repository Topics**
```
vscode-extension
vscode
markdown
resume
cover-letter
pandoc
job-search
document-generation
career
```

### 4. Update Links in Files

Once the GitHub repo is created, verify these URLs in your files:

**package.json:**
```json
"repository": {
  "type": "git",
  "url": "https://github.com/emckenna/vscode-markdown-resume-manager.git"
},
"bugs": {
  "url": "https://github.com/emckenna/vscode-markdown-resume-manager/issues"
},
"homepage": "https://github.com/emckenna/vscode-markdown-resume-manager#readme"
```

**README.md:**
- Update any repository links
- Add GitHub badges (optional)

### 5. Add Badges (Optional)

Add these to the top of README.md:

```markdown
# Markdown Resume Manager

![VS Code Extension Version](https://img.shields.io/visual-studio-marketplace/v/emckenna.markdown-resume-manager?label=VS%20Code%20Extension)
![Downloads](https://img.shields.io/visual-studio-marketplace/d/emckenna.markdown-resume-manager)
![Rating](https://img.shields.io/visual-studio-marketplace/r/emckenna.markdown-resume-manager)
![GitHub](https://img.shields.io/github/license/emckenna/vscode-markdown-resume-manager)
![GitHub issues](https://img.shields.io/github/issues/emckenna/vscode-markdown-resume-manager)

A VS Code extension for managing markdown-based resumes and cover letters...
```

Note: Marketplace badges will only work after publishing to the marketplace.

### 6. Create GitHub Releases (For VSIX Distribution)

After packaging your extension:

```bash
# Package the extension
vsce package

# Create a release on GitHub
# Go to: https://github.com/emckenna/vscode-markdown-resume-manager/releases/new
# Tag: v1.0.0
# Title: v1.0.0 - Initial Release
# Upload: markdown-resume-manager-1.0.0.vsix
```

## Repository Structure

```
vscode-markdown-resume-manager/
├── .github/                    # Future: CI/CD workflows
├── extension.js                # Main extension code
├── package.json                # Extension manifest
├── README.md                   # User documentation
├── QUICKSTART.md              # Quick start guide
├── DEVELOPMENT.md             # Developer guide
├── CHANGELOG.md               # Version history
├── LICENSE                    # MIT License
├── GITHUB_SETUP.md            # This file
├── .gitignore                 # Git ignore
└── .vscodeignore              # Package ignore
```

## Relationship to Other Repositories

### markdown-resume-manager (Template Repository)
- **URL:** https://github.com/emckenna/markdown-resume-manager
- **Purpose:** Template for resume projects with build scripts
- **Relationship:** This extension is designed to work with projects based on that template
- **Update:** Add link to this extension in that repo's README

### Your Personal Resume Repository
- **Location:** `/home/eric-mckenna/work/github/resume`
- **Status:** Private (keep it private)
- **Uses:** markdown-resume-manager template + this extension

## Next Steps After GitHub Setup

1. **Link from markdown-resume-manager:**
   - Add a section in markdown-resume-manager README about this extension
   - Link to this repository
   - Explain installation

2. **Test the extension:**
   - Follow QUICKSTART.md
   - Test in Extension Development Host
   - Package and install as VSIX

3. **Publish to Marketplace (Optional):**
   - Follow DEVELOPMENT.md publishing guide
   - Update badges in README

4. **Announce:**
   - Share on social media
   - Post on relevant subreddits (r/vscode, r/resumes, r/careerguidance)
   - Share on LinkedIn

## Quick Commands Reference

```bash
# Clone the extension
git clone git@github.com:emckenna/vscode-markdown-resume-manager.git

# Install dependencies (if any are added later)
cd vscode-markdown-resume-manager
npm install

# Package extension
npm install -g @vscode/vsce
vsce package

# Install locally
code --install-extension markdown-resume-manager-1.0.0.vsix

# Debug in VS Code
# Open folder in VS Code and press F5
```

## Support and Contributions

**Issues:** https://github.com/emckenna/vscode-markdown-resume-manager/issues
**Pull Requests:** Welcome!
**Discussions:** Use GitHub Discussions for questions

## License

MIT License - See LICENSE file

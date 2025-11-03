# TODO Checklist

## Immediate Tasks

### GitHub Setup
- [ ] Create GitHub repository: https://github.com/new
  - Name: `vscode-markdown-resume-manager`
  - Public visibility
  - No README/gitignore (already have them)
- [ ] Add remote and push:
  ```bash
  cd /home/eric-mckenna/work/github/vscode-markdown-resume-manager
  git remote add origin git@github.com:emckenna/vscode-markdown-resume-manager.git
  git push -u origin main
  ```
- [ ] Configure repository settings (description, topics, about section)

### Testing
- [ ] Test in Extension Development Host (F5)
  - [ ] Open extension folder: `code /home/eric-mckenna/work/github/vscode-markdown-resume-manager`
  - [ ] Press F5
  - [ ] Open resume project in new window
  - [ ] Test: Create Resume (`Ctrl+Shift+Alt+N`)
  - [ ] Test: Create Cover Letter (`Ctrl+Shift+Alt+C`)
  - [ ] Test: Build Document (`Ctrl+Shift+B`)
  - [ ] Test: Build DOCX+PDF (`Ctrl+Shift+Alt+B`)
  - [ ] Test: Open Build Folder
  - [ ] Test: Clipboard paste works
  - [ ] Test: File overwrite protection
- [ ] Package and test as VSIX
  ```bash
  npm install -g @vscode/vsce
  vsce package
  code --install-extension markdown-resume-manager-1.0.0.vsix
  ```
- [ ] Test installed extension in your resume project
- [ ] Verify all keyboard shortcuts work
- [ ] Verify configuration options work

### Documentation Updates
- [ ] Add screenshot/GIF to README.md
- [ ] Review and finalize all documentation
- [ ] Add GitHub badges to README (after publishing)

## Update Other Repositories

### markdown-resume-manager Template
- [ ] Add section about VS Code extension
- [ ] Link to extension repository
- [ ] Update installation instructions
- [ ] Example:
  ```markdown
  ## VS Code Extension

  For the best experience, install the [Markdown Resume Manager extension](https://github.com/emckenna/vscode-markdown-resume-manager):

  - Interactive document creation
  - One-click building
  - Clipboard paste support
  - Works cross-platform

  [Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=emckenna.markdown-resume-manager)
  or download the [latest .vsix release](https://github.com/emckenna/vscode-markdown-resume-manager/releases).
  ```

### Your Personal Resume Project
- [ ] Remove workspace extension:
  ```bash
  rm -rf /home/eric-mckenna/work/github/resume/.vscode/extensions/
  ```
- [ ] Install the new extension (via .vsix or marketplace)
- [ ] Update EXTENSION.md to point to new repository
- [ ] Test that everything still works
- [ ] Update README.md with new installation instructions

## Optional: Publishing to Marketplace

### Prerequisites
- [ ] Create Microsoft/Azure DevOps account
- [ ] Create publisher on https://marketplace.visualstudio.com/manage
- [ ] Get Personal Access Token from Azure DevOps
- [ ] Update publisher name in package.json

### Publishing Steps
- [ ] Login: `vsce login your-publisher-name`
- [ ] Publish: `vsce publish`
- [ ] Verify extension appears on marketplace
- [ ] Update README badges
- [ ] Announce on social media

## Future Enhancements

### v1.1.0 Ideas
- [ ] Add icon for the extension
- [ ] Add screenshot/demo GIF
- [ ] Add template selector (base templates)
- [ ] Add resume preview panel
- [ ] Add configuration for multiple output formats

### v1.2.0 Ideas
- [ ] ATS keyword checker
- [ ] Spell check integration
- [ ] Diff view (compare tailored vs base)
- [ ] Submission tracking
- [ ] Export statistics

### v2.0.0 Ideas
- [ ] Windows batch script support
- [ ] Built-in pandoc (bundle with extension)
- [ ] Web preview with live reload
- [ ] AI-powered suggestions
- [ ] Template marketplace

## Release Process

### For Each Release
1. [ ] Update version in package.json
2. [ ] Update CHANGELOG.md
3. [ ] Commit changes: `git commit -m "Bump version to X.Y.Z"`
4. [ ] Tag release: `git tag vX.Y.Z`
5. [ ] Push: `git push && git push --tags`
6. [ ] Package: `vsce package`
7. [ ] Create GitHub release with .vsix file
8. [ ] Publish to marketplace: `vsce publish` (if applicable)

## Notes

- Keep the extension simple and focused
- Maintain backward compatibility
- Test on Windows, macOS, and Linux if possible
- Respond to issues promptly
- Consider user feedback for features

## Done
- [x] Create proper VS Code extension structure
- [x] Migrate code from workspace extension
- [x] Add configuration options
- [x] Write comprehensive documentation
- [x] Create QUICKSTART guide
- [x] Create DEVELOPMENT guide
- [x] Add LICENSE (MIT)
- [x] Initialize git repository
- [x] Create initial commit

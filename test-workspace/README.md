# Test Workspace

This is a mock workspace used for automated testing of the Markdown Resume Manager extension.

## Structure

```
test-workspace/
├── resumes/
│   └── tailored/          # Test resumes created here
├── cover-letters/
│   └── tailored/          # Test cover letters created here
├── scripts/
│   └── build.sh           # Mock build script
└── build/                 # Build outputs (git-ignored)
```

## Mock Build Script

The `scripts/build.sh` is a simple mock that:
- Prints "Mock build script executed"
- Echoes arguments received
- Always exits with 0 (success)

This allows testing without requiring actual Pandoc installation.

## Usage

This workspace is automatically used when running:

```bash
npm test
```

The test configuration (`.vscode-test.mjs`) points to this folder.

## Do Not Modify

This workspace structure should match the expected structure for the extension.
Any changes here may break tests.

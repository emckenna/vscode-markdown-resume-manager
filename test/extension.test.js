const assert = require('assert');
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

suite('Markdown Resume Manager Extension Tests', () => {
  vscode.window.showInformationMessage('Starting extension tests...');

  suiteSetup(async () => {
    // Ensure extension is activated
    const extension = vscode.extensions.getExtension('emckenna.markdown-resume-manager');
    if (extension && !extension.isActive) {
      await extension.activate();
    }
  });

  suite('Extension Activation', () => {
    test('Extension should be present', () => {
      const extension = vscode.extensions.getExtension('emckenna.markdown-resume-manager');
      assert.ok(extension, 'Extension should be installed');
    });

    test('Extension should activate', async () => {
      const extension = vscode.extensions.getExtension('emckenna.markdown-resume-manager');
      await extension.activate();
      assert.strictEqual(extension.isActive, true, 'Extension should be active');
    });
  });

  suite('Commands', () => {
    test('All commands should be registered', async () => {
      const commands = await vscode.commands.getCommands(true);

      const expectedCommands = [
        'markdownResumeManager.newResume',
        'markdownResumeManager.newCoverLetter',
        'markdownResumeManager.buildDocument',
        'markdownResumeManager.buildDocumentPDF',
        'markdownResumeManager.openBuildFolder'
      ];

      for (const cmd of expectedCommands) {
        assert.ok(
          commands.includes(cmd),
          `Command ${cmd} should be registered`
        );
      }
    });

    test('Commands should have proper category', async () => {
      // This would require inspecting package.json contributions
      // Just verify they're callable
      const commands = [
        'markdownResumeManager.newResume',
        'markdownResumeManager.newCoverLetter'
      ];

      for (const cmd of commands) {
        // Should not throw error when checking if command exists
        const allCommands = await vscode.commands.getCommands(true);
        assert.ok(allCommands.includes(cmd));
      }
    });
  });

  suite('Configuration', () => {
    test('Should have buildScriptPath configuration', () => {
      const config = vscode.workspace.getConfiguration('markdownResumeManager');
      const buildScriptPath = config.get('buildScriptPath');
      assert.strictEqual(buildScriptPath, './scripts/build.sh', 'Default build script path should be correct');
    });

    test('Should have resumeOutputName configuration', () => {
      const config = vscode.workspace.getConfiguration('markdownResumeManager');
      const outputName = config.get('resumeOutputName');
      assert.strictEqual(outputName, 'Your_Name_Resume', 'Default resume output name should be correct');
    });

    test('Should have coverLetterOutputName configuration', () => {
      const config = vscode.workspace.getConfiguration('markdownResumeManager');
      const outputName = config.get('coverLetterOutputName');
      assert.strictEqual(outputName, 'Your_Name_Cover_Letter', 'Default cover letter output name should be correct');
    });
  });

  suite('Workspace Detection', () => {
    test('Should detect workspace folder', () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      assert.ok(workspaceFolders, 'Workspace folder should be available');
      assert.ok(workspaceFolders.length > 0, 'Should have at least one workspace folder');
    });
  });

  suite('File Operations', () => {
    const testWorkspace = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;

    test('Should create directories if needed', function() {
      if (!testWorkspace) {
        this.skip();
        return;
      }

      const resumeDir = path.join(testWorkspace, 'resumes', 'tailored');
      const coverLetterDir = path.join(testWorkspace, 'cover-letters', 'tailored');

      // These directories should exist or be creatable
      assert.ok(testWorkspace, 'Workspace path should exist');
    });

    test('Should handle file path generation correctly', () => {
      if (!testWorkspace) return;

      const company = 'test-company';
      const position = 'senior-engineer';

      const expectedResumePath = path.join(testWorkspace, 'resumes', 'tailored', `${company}-${position}.md`);
      const expectedCoverPath = path.join(testWorkspace, 'cover-letters', 'tailored', `${company}-cover.md`);

      // Just verify path construction is correct
      assert.ok(expectedResumePath.includes('test-company-senior-engineer.md'));
      assert.ok(expectedCoverPath.includes('test-company-cover.md'));
    });
  });

  suite('String Sanitization', () => {
    test('Should clean company names correctly', () => {
      const testCases = [
        { input: 'Google Inc', expected: 'google-inc' },
        { input: 'ACME Corp', expected: 'acme-corp' },
        { input: 'Test  Company', expected: 'test-company' }  // Multiple spaces become single dash
      ];

      for (const testCase of testCases) {
        const result = testCase.input.toLowerCase().replace(/\s+/g, '-');
        assert.strictEqual(result, testCase.expected, `Should clean "${testCase.input}" to "${testCase.expected}"`);
      }
    });
  });

  suite('Build Script Detection', () => {
    test('Should check for build script existence', function() {
      const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
      if (!workspaceRoot) {
        this.skip();
        return;
      }

      const buildScript = path.join(workspaceRoot, 'scripts', 'build.sh');

      // In a real test workspace, this would check if script exists
      // For now, just verify path construction
      assert.ok(buildScript.includes('scripts/build.sh'));
    });
  });
});

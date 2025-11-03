const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Markdown Resume Manager extension is now active');

    // Get workspace root
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath;
    if (!workspaceRoot) {
        vscode.window.showWarningMessage('Markdown Resume Manager: No workspace folder open. Open a workspace to use this extension.');
        return;
    }

    // Command: New Resume
    let newResume = vscode.commands.registerCommand('markdownResumeManager.newResume', async () => {
        await createDocument('resume', workspaceRoot);
    });

    // Command: New Cover Letter
    let newCoverLetter = vscode.commands.registerCommand('markdownResumeManager.newCoverLetter', async () => {
        await createDocument('cover', workspaceRoot);
    });

    // Command: Build Document
    let buildDocument = vscode.commands.registerCommand('markdownResumeManager.buildDocument', async () => {
        await buildCurrentDocument(false, workspaceRoot);
    });

    // Command: Build Document (DOCX + PDF)
    let buildDocumentPDF = vscode.commands.registerCommand('markdownResumeManager.buildDocumentPDF', async () => {
        await buildCurrentDocument(true, workspaceRoot);
    });

    // Command: Open Build Folder
    let openBuildFolderCommand = vscode.commands.registerCommand('markdownResumeManager.openBuildFolder', async () => {
        await openBuildFolderForCurrentFile(workspaceRoot);
    });

    context.subscriptions.push(newResume, newCoverLetter, buildDocument, buildDocumentPDF, openBuildFolderCommand);
}

async function createDocument(type, workspaceRoot) {
    try {
        // Step 1: Get company name
        const company = await vscode.window.showInputBox({
            prompt: `Enter company name (e.g., 'google', 'stripe')`,
            placeHolder: 'company-name',
            validateInput: (value) => {
                return value.trim() ? null : 'Company name cannot be empty';
            }
        });

        if (!company) return; // User cancelled

        const companyClean = company.toLowerCase().replace(/\s+/g, '-');

        // Step 2: Get position (for resumes only)
        let positionClean = '';
        if (type === 'resume') {
            const position = await vscode.window.showInputBox({
                prompt: `Enter position (e.g., 'senior', 'sdm', 'staff')`,
                placeHolder: 'position (optional)',
            });

            if (position && position.trim()) {
                positionClean = position.toLowerCase().replace(/\s+/g, '-');
            }
        }

        // Step 3: Determine filename and path
        let filename, outputDir, outputPath;

        if (type === 'resume') {
            filename = positionClean ? `${companyClean}-${positionClean}.md` : `${companyClean}.md`;
            outputDir = path.join(workspaceRoot, 'resumes', 'tailored');
        } else {
            filename = `${companyClean}-cover.md`;
            outputDir = path.join(workspaceRoot, 'cover-letters', 'tailored');
        }

        outputPath = path.join(outputDir, filename);

        // Check if file exists
        if (fs.existsSync(outputPath)) {
            const overwrite = await vscode.window.showWarningMessage(
                `File already exists: ${filename}`,
                'Overwrite',
                'Cancel'
            );

            if (overwrite !== 'Overwrite') return;
        }

        // Step 4: Ask how to add content
        const contentChoice = await vscode.window.showQuickPick([
            { label: 'Paste from clipboard', value: 'clipboard', description: 'Paste content from your clipboard' },
            { label: 'Open empty file in editor', value: 'editor', description: 'Create empty file and open it' },
            { label: 'Create empty file', value: 'empty', description: 'Just create the file without opening' }
        ], {
            placeHolder: 'How would you like to add content?'
        });

        if (!contentChoice) return; // User cancelled

        // Create directory if needed
        fs.mkdirSync(outputDir, { recursive: true });

        // Handle content choice
        if (contentChoice.value === 'clipboard') {
            const content = await vscode.env.clipboard.readText();
            if (!content || !content.trim()) {
                vscode.window.showErrorMessage('Clipboard is empty');
                return;
            }

            fs.writeFileSync(outputPath, content, 'utf8');
            vscode.window.showInformationMessage(`Created: ${filename} (${content.split('\n').length} lines from clipboard)`);
        } else {
            // Create empty file
            fs.writeFileSync(outputPath, '', 'utf8');
            vscode.window.showInformationMessage(`Created: ${filename}`);
        }

        // Open the file in editor
        const document = await vscode.workspace.openTextDocument(outputPath);
        await vscode.window.showTextDocument(document);

        // Show next steps
        const buildIt = await vscode.window.showInformationMessage(
            'Document created! Would you like to build it now?',
            'Build DOCX',
            'Build DOCX + PDF',
            'Not now'
        );

        if (buildIt === 'Build DOCX') {
            await buildFile(outputPath, false, workspaceRoot);
        } else if (buildIt === 'Build DOCX + PDF') {
            await buildFile(outputPath, true, workspaceRoot);
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error.message}`);
    }
}

async function buildCurrentDocument(includePDF, workspaceRoot) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const filePath = editor.document.uri.fsPath;
    if (!filePath.endsWith('.md')) {
        vscode.window.showErrorMessage('Current file is not a markdown file');
        return;
    }

    await buildFile(filePath, includePDF, workspaceRoot);
}

async function buildFile(filePath, includePDF, workspaceRoot) {
    try {
        // Get build script path from configuration
        const config = vscode.workspace.getConfiguration('markdownResumeManager');
        const buildScriptPath = config.get('buildScriptPath', './scripts/build.sh');
        const buildScript = path.join(workspaceRoot, buildScriptPath);

        // Check if build script exists
        if (!fs.existsSync(buildScript)) {
            vscode.window.showErrorMessage(`Build script not found: ${buildScriptPath}. Please check your settings.`);
            return;
        }

        const format = includePDF ? 'docx,pdf' : 'docx';
        const command = `"${buildScript}" -f ${format} "${filePath}"`;

        vscode.window.showInformationMessage('Building document...');

        const { stdout, stderr } = await execAsync(command, {
            cwd: workspaceRoot,
            shell: process.platform === 'win32' ? 'cmd.exe' : '/bin/bash'
        });

        if (stderr && !stderr.includes('warning')) {
            vscode.window.showErrorMessage(`Build error: ${stderr}`);
            return;
        }

        vscode.window.showInformationMessage('Build complete!');

        // Extract company name and offer to open build folder
        const filename = path.basename(filePath, '.md');
        const company = filename.split('-')[0];

        const openFolder = await vscode.window.showInformationMessage(
            `Document built successfully for ${company}`,
            'Open Build Folder',
            'OK'
        );

        if (openFolder === 'Open Build Folder') {
            await openBuildFolder(company, workspaceRoot);
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Build failed: ${error.message}`);
    }
}

async function openBuildFolderForCurrentFile(workspaceRoot) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const filePath = editor.document.uri.fsPath;
    const filename = path.basename(filePath, '.md');
    const company = filename.split('-')[0];

    await openBuildFolder(company, workspaceRoot);
}

async function openBuildFolder(company, workspaceRoot) {
    const buildFolder = path.join(workspaceRoot, 'build', company);

    if (!fs.existsSync(buildFolder)) {
        vscode.window.showWarningMessage(`Build folder doesn't exist yet: build/${company}/`);
        return;
    }

    const folderUri = vscode.Uri.file(buildFolder);
    await vscode.commands.executeCommand('revealFileInOS', folderUri);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

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

    // Command: Initialize Project
    let initProject = vscode.commands.registerCommand('markdownResumeManager.initProject', async () => {
        await initializeProject(workspaceRoot);
    });

    context.subscriptions.push(newResume, newCoverLetter, buildDocument, buildDocumentPDF, openBuildFolderCommand, initProject);
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
        // Get configuration
        const config = vscode.workspace.getConfiguration('markdownResumeManager');
        const pandocPath = config.get('pandocPath', 'pandoc');

        // Check if pandoc is installed
        try {
            const pandocVersion = await execAsync(`"${pandocPath}" --version`);
            console.log('Pandoc path:', pandocPath);
            console.log('Pandoc version:', pandocVersion.stdout);
        } catch (error) {
            vscode.window.showErrorMessage(
                'Pandoc is not installed or not found at the configured path. ' +
                'Please install Pandoc from https://pandoc.org/installing.html or ' +
                'configure the path in settings (markdownResumeManager.pandocPath)'
            );
            return;
        }

        vscode.window.showInformationMessage('Building document...');

        const filename = path.basename(filePath, '.md');
        const company = filename.split('-')[0];

        // Determine output name based on file location
        let outputName;
        if (filePath.includes('cover-letter')) {
            outputName = config.get('coverLetterOutputName', 'Your_Name_Cover_Letter');
        } else {
            outputName = config.get('resumeOutputName', 'Your_Name_Resume');
        }

        // Create build directory
        const buildDir = path.join(workspaceRoot, 'build', company);
        console.log('Creating build directory:', buildDir);
        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir, { recursive: true });
        }

        // Build DOCX
        const docxOutput = path.join(buildDir, `${outputName}.docx`);
        const docxCommand = `"${pandocPath}" "${filePath}" -o "${docxOutput}"`;

        console.log('Running command:', docxCommand);
        console.log('Working directory:', workspaceRoot);

        const result = await execAsync(docxCommand, { cwd: workspaceRoot });
        console.log('DOCX build output:', result.stdout);
        if (result.stderr) {
            console.log('DOCX build stderr:', result.stderr);
        }

        // Build PDF if requested
        if (includePDF) {
            const pdfOutput = path.join(buildDir, `${outputName}.pdf`);
            const pdfCommand = `"${pandocPath}" "${filePath}" -o "${pdfOutput}"`;

            try {
                await execAsync(pdfCommand, { cwd: workspaceRoot });
            } catch (error) {
                vscode.window.showWarningMessage('PDF generation failed. Install WeasyPrint for better PDF support: pip install weasyprint');
            }
        }

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

async function initializeProject(workspaceRoot) {
    try {
        const directories = [
            'resumes/tailored',
            'cover-letters/tailored',
            'templates'
        ];

        let created = [];
        let skipped = [];

        for (const dir of directories) {
            const fullPath = path.join(workspaceRoot, dir);
            if (!fs.existsSync(fullPath)) {
                fs.mkdirSync(fullPath, { recursive: true });
                created.push(dir);
            } else {
                skipped.push(dir);
            }
        }

        // Build message
        let message = '✅ Project initialized!\n\n';

        if (created.length > 0) {
            message += `Created:\n${created.map(d => `  • ${d}`).join('\n')}\n\n`;
        }

        if (skipped.length > 0) {
            message += `Already existed:\n${skipped.map(d => `  • ${d}`).join('\n')}\n\n`;
        }

        // Check if pandoc is installed
        const config = vscode.workspace.getConfiguration('markdownResumeManager');
        const pandocPath = config.get('pandocPath', 'pandoc');

        try {
            await execAsync(`"${pandocPath}" --version`);
            message += `✓ Pandoc is installed (${pandocPath})\n`;
        } catch (error) {
            message += '\n⚠️  Pandoc not found!\n';
            message += 'Install from: https://pandoc.org/installing.html\n';
            message += 'Or configure the path in settings (markdownResumeManager.pandocPath)\n';
        }

        const action = await vscode.window.showInformationMessage(
            message,
            'OK',
            'Open Workspace Folder'
        );

        if (action === 'Open Workspace Folder') {
            const folderUri = vscode.Uri.file(workspaceRoot);
            await vscode.commands.executeCommand('revealFileInOS', folderUri);
        }

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to initialize project: ${error.message}`);
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};

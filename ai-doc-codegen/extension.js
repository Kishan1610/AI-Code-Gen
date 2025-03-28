const vscode = require('vscode');
const { DocumentMiningView } = require('./src/frontend/webview');

function activate(context) {
  console.log('Congratulations, your extension "ai-doc-codegen" is now active!');

  // Register the "Hello World" command
  const helloWorldCommand = vscode.commands.registerCommand('ai-doc-codegen.helloWorld', () => {
    vscode.window.showInformationMessage('Hello World from AICG!');
  });

  // Register the "Open Document Mining" command
  const openDocumentMiningCommand = vscode.commands.registerCommand('ai-doc-codegen.openDocumentMining', () => {
    const documentMiningView = new DocumentMiningView(context);
    documentMiningView.show();
  });

  // Add commands to the extension's subscriptions
  context.subscriptions.push(helloWorldCommand, openDocumentMiningCommand);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
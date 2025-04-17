const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log("✅ AI Code Generator is now active!");

  let panel = null;

  const command = vscode.commands.registerCommand("extension.openWebView", () => {
    console.log("🚀 WebView command triggered!");

    try {
      if (panel) {
        panel.reveal(vscode.ViewColumn.Beside);
        return;
      }

      panel = vscode.window.createWebviewPanel(
        "customView",
        "AI Code Generator",
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );

      const htmlPath = path.join(context.extensionPath, "media", "webview.html");
      const htmlContent = fs.readFileSync(htmlPath, "utf8");
      panel.webview.html = htmlContent;

      panel.webview.onDidReceiveMessage(
        (message) => {
          switch (message.command) {
            case "alert":
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );

      panel.onDidDispose(() => {
        panel = null;
      }, null, context.subscriptions);
    } catch (error) {
      vscode.window.showErrorMessage(`❌ Failed to create webview: ${error.message}`);
    }
  });

  context.subscriptions.push(command);
}

function deactivate() {
  console.log('🔻 Extension "ai-doc-codegen" is now deactivated.');
}

module.exports = {
  activate,
  deactivate,
};

import * as vscode from 'vscode';

export class DocumentMiningView {
  private static readonly viewType = 'documentMining';
  private panel: vscode.WebviewPanel | undefined;

  constructor(private context: vscode.ExtensionContext) {}

  public show() {
    // Create and show a new Webview panel
    this.panel = vscode.window.createWebviewPanel(
      DocumentMiningView.viewType,
      'Document Mining',
      vscode.ViewColumn.One,
      {
        enableScripts: true, // Enable JavaScript in the Webview
        retainContextWhenHidden: true, // Retain state when the panel is hidden
      }
    );

    // Set the HTML content for the Webview
    this.panel.webview.html = this.getWebviewContent();

    // Handle messages from the Webview
    this.panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'fetchDocuments':
            this.fetchDocuments();
            break;
          case 'showMessage':
            vscode.window.showInformationMessage(message.text);
            break;
        }
      },
      undefined,
      this.context.subscriptions
    );
  }

  private getWebviewContent(): string {
    // Get paths to CSS and JS files
    const styleUri = this.panel!.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'src', 'frontend', 'styles.css')
    );
    const scriptUri = this.panel!.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'src', 'frontend', 'webview.js')
    );

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document Mining</title>
          <link rel="stylesheet" href="${styleUri}">
      </head>
      <body>
          <h1>Document Mining Results</h1>
          <div id="results"></div>
          <button id="fetchButton">Fetch Documents</button>
          <script src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }

  private fetchDocuments() {
    if (this.panel) {
      // Simulate fetching documents (replace with actual API call)
      const documents = ['Document 1', 'Document 2', 'Document 3'];
      this.panel.webview.postMessage({
        command: 'updateResults',
        documents: documents,
      });
    }
  }
}
const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('✅ AI Code Generator is now active!');

    let panel = null;

    // Register the command
    const command = vscode.commands.registerCommand("extension.openWebView", () => {
        console.log("🚀 AI Code Generator WebView Command Triggered!"); // Debugging log

        if (panel) {
            panel.reveal(vscode.ViewColumn.Beside);
            return;
        }

        panel = vscode.window.createWebviewPanel(
            "customView",
            "AI Code Generator",
            vscode.ViewColumn.Beside,
            { enableScripts: true }
        );
        panel.webview.html = getWebviewContent();

        panel.onDidDispose(() => {
            panel = null;
        }, null, context.subscriptions);
    });

    context.subscriptions.push(command);
}

function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Code Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .fade-in { animation: fadeIn 0.5s ease-in-out; }
        </style>
    </head>
    <body class="bg-gray-900 text-white p-4">
        <h2 class="text-xl font-bold text-center">AI Code Generator 🚀</h2>
        <input type="text" id="searchBox" class="w-full p-2 bg-gray-800 border border-gray-700 rounded" placeholder="Enter your prompt...">
        <button id="generateBtn" class="mt-2 px-4 py-2 bg-green-500 rounded">Generate</button>
        <button id="clearBtn" class="mt-2 px-4 py-2 bg-red-500 rounded">Clear</button>
        <div id="resultArea" class="mt-4 p-2 bg-gray-800 rounded text-gray-300">Results will appear here...</div>
        <script>
            document.getElementById("generateBtn").addEventListener("click", () => {
                const input = document.getElementById("searchBox").value.trim();
                if (!input) return;
                document.getElementById("resultArea").innerHTML = '<span class="text-blue-400">⏳ Generating...</span>';
                setTimeout(() => {
                    document.getElementById("resultArea").innerHTML = '<span class="text-green-400">✅ Result:</span> ' + input;
                }, 1000);
            });

            document.getElementById("clearBtn").addEventListener("click", () => {
                document.getElementById("resultArea").innerText = "Results will appear here...";
                document.getElementById("searchBox").value = "";
            });
        </script>
    </body>
    </html>`;
}

function deactivate() {
    console.log('Extension "ai-doc-codegen" is now deactivated.');
}

module.exports = { activate, deactivate };

(function () {
  const vscode = acquireVsCodeApi();

  // When the "Enable Extension" button is clicked, show the main panel
  document.getElementById('enableExtensionButton').addEventListener('click', () => {
    document.getElementById('mainPanel').style.display = 'block';
  });

  // When the "Run" button is clicked, send the prompt to the extension for code generation
  document.getElementById('runButton').addEventListener('click', () => {
    const prompt = document.getElementById('promptInput').value;
    vscode.postMessage({ command: 'generateCode', prompt });
  });

  // Handle messages coming from the extension
  window.addEventListener('message', (event) => {
    const message = event.data;
    switch (message.command) {
      case 'updateOutput':
        updateOutput(message.code);
        break;
    }
  });

  // Update the output area with the generated code or document
  function updateOutput(code) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerText = code;
  }
})();

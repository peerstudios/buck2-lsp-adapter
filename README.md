# Buck2 LSP 🚀

An VSCode LSP Adapter to use Buck2's built-in LSP Server.

This extension is still work in progress and require a lot more changes to properly work, but it's a good basis. Don't worry, we're not judging you if you use it as is. We all have to start somewhere, right? 😊

contributions are welcomed. 🙏

## Introduction 📝

This project is a VSCode extension that provides a client-side implementation of the Buck2 Language Server Protocol (LSP). It enables features such as code completion, diagnostics, and find references to be available in the editor/IDE.

## Features 🎉

This extension provides the following features:

### Code Completion ✅

*Not fully implemented!*

Code completion is a feature that suggests possible code completions as you type. This feature is powered by Buck2's Language Server Protocol (LSP) server, which analyzes your code and provides suggestions based on the context.

### Diagnostics 🚨

*Not implemented at all!*

Diagnostics are a feature that highlights errors and warnings in your code. This feature is also powered by Buck2's LSP server, which analyzes your code and provides feedback on any issues it finds.

### Find References 🔍

Find References is a feature that allows you to find all references to a particular symbol in your code. This feature is also powered by Buck2's LSP server, which analyzes your code and provides a list of all references to the symbol you're interested in.

## Getting Started 🏁

To get started with this extension, you need to have Buck2 installed on your system. Once installed, you can install this extension via the VSCode marketplace.

### Building the Extension 🛠️

To build the extension from source, follow these steps:

1. Clone the repository: `git clone https://github.com/PeerStudios/buck2-lsp-adapter.git`
2. Navigate to the project directory: `cd buck2-lsp-adapter`
3. Install the dependencies: `pnpm install`
4. Build the extension: `pnpm package`

This will create a `.vsix` file in the project directory, which you can install in VSCode by running the `Extensions: Install from VSIX` command.

## Configuration ⚙️

Configuration options for this extension are available in the VS Code settings under the `buck2-lsp-adapter` section. Available options include:

- `buck2-lsp-adapter.buck2Path`: Path to the buck2 binary, should either be `buck2` or absolute.
- `buck2-lsp-adapter.lspArguments`: Arguments to pass to the buck2 lsp server.
- `buck2-lsp-adapter.enableGotoDefinition`: Enable goto definition.

## Contributing 🤝

Contributions to this project are welcome! Please see the CONTRIBUTING.md file for more information.

## License 📜

This project is licensed under the "MIT" License. See the LICENSE file for more information.

**TL;DR**: You can do whatever you want with this extension, including using it to take over the world, but I take no responsibility if your plans fail. However, you must credit me and send me a postcard from your secret lair! 🌍👨‍💻📬

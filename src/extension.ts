import * as vscode from "vscode";
import * as lsp from "vscode-languageclient/node";

import { StarlarkFileHandler } from "@/events/starlark_file";

const STARLARK_URI_SCHEME = "starlark";

export async function activate(context: vscode.ExtensionContext) {
  const configuration = vscode.workspace.getConfiguration();

  //
  // Options to control the language server
  //
  const buck2Path =
    configuration.get<string>("buck2-lsp-adapter.buck2Path") ?? "buck2";
  const lspArgs =
    configuration.get<string>("buck2-lsp-adapter.lspArguments") ?? "";

  let serverOptions: lsp.ServerOptions = {
    command: buck2Path,
    args: ["lsp", ...lspArgs.split(" ")],
  };

  //
  // Options to control the language client
  //
  let clientOptions: lsp.LanguageClientOptions = {
    // Register the server for Starlark documents
    documentSelector: [{ scheme: "file", language: "starlark" }],

    //
    // Options sent to the server on initialization.
    //
    initializationOptions: {
      /* eslint-disable @typescript-eslint/naming-convention */

      // https://github.com/facebook/buck2/blob/31590d5c2054c0eb3e19aaf1412218c9db4c0ac9/starlark-rust/starlark_lsp/src/server.rs#L279
      enable_goto_definition: configuration.get(
        "starlark.enableGotoDefinition",
        true
      ),

      /* eslint-enable @typescript-eslint/naming-convention */
    },
  };

  //
  // Spawn the language server and connect to it.
  //
  const lspClient = new lsp.LanguageClient(
    "Starlark",
    "Starlark language server",
    serverOptions,
    clientOptions
  );

  // Show a notification when the language server is ready.
  await lspClient.start();

  //
  // Subscriptions to handle events.
  //

  context.subscriptions.push(
    // Register the Starlark file handler for "starlark:" URIs.
    vscode.workspace.registerTextDocumentContentProvider(
      STARLARK_URI_SCHEME,
      new StarlarkFileHandler(lspClient)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("buck2-lsp-adapter.restart", async () => {
      // Show a progress indicator while restarting the language server.
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Restarting Buck2 LSP Adapter...",
        },
        async () => {
          // TODO: replace with lspClient.restart() once it no longer throws an error.
          // FIXME: fill out an issue on buck2's github repo.
          await lspClient.start();
          vscode.window.showInformationMessage("Buck2 LSP Adapter restarted.");
        }
      );
    })
  );
}

export async function deactivate() {}

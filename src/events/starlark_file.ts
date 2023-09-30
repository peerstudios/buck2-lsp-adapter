import * as vscode from "vscode";
import * as lsp from "vscode-languageclient/node";

const STARLARK_FILE_CONTENTS_METHOD = "starlark/fileContents";

const BUILTIN_HEADER = `"""
This is a buck2 built-in macro. Only documentations are available.
"""`;

const EXCEPT_BUILTIN_HEADER = `"""
An error occurred while fetching the contents of this file.
"""`;

class StarlarkFileContentsParams {
  constructor(public uri: String) {}
}

class StarlarkFileContentsResponse {
  constructor(public contents?: string | null) {}
}

/**
 * A handler for "starlark:" URIs.
 */
export class StarlarkFileHandler implements vscode.TextDocumentContentProvider {
  constructor(private lspClient: lsp.LanguageClient) {}

  async provideTextDocumentContent(
    uri: vscode.Uri,
    token: vscode.CancellationToken
  ): Promise<string> {
    const result =
      await this.lspClient.sendRequest<StarlarkFileContentsResponse>(
        STARLARK_FILE_CONTENTS_METHOD,
        new StarlarkFileContentsParams(uri.toString()),
        token
      );

    if (result.contents === null) {
      return `${EXCEPT_BUILTIN_HEADER}\n`;
    }

    return `${BUILTIN_HEADER}\n\n${result.contents}\n`;
  }
}

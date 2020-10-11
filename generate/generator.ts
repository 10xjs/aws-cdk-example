import * as tsj from 'ts-json-schema-generator';
import * as ts from 'typescript';
import * as path from 'path';
import {symbolAtNode} from 'ts-json-schema-generator/dist/src/Utils/symbolAtNode';

(tsj as any).SchemaGenerator.prototype.getFullName = function (
  node: ts.Node,
  typeChecker: ts.TypeChecker,
): string {
  const symbol: ts.Symbol = symbolAtNode(node);
  return typeChecker.getFullyQualifiedName(symbol);
};

(tsj as any).ExposeNodeParser.prototype.getDefinitionName = function (
  node: ts.Node,
  context: tsj.Context,
): string {
  const symbol: ts.Symbol = symbolAtNode(node);
  const fullName: string = this.typeChecker.getFullyQualifiedName(symbol);
  const argumentIds = context.getArguments().map((arg) => arg?.getName());

  return argumentIds.length
    ? `${fullName}<${argumentIds.join(',')}>`
    : fullName;
};

export function createGenerator(files: string) {
  return tsj.createGenerator({
    path: path.join(process.cwd(), files),
    extraTags: ['example', 'default'],
  });
}

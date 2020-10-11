import * as path from 'path';
import * as ts from 'typescript';

export function getSourceFile(node: ts.Node): ts.SourceFile {
  if (ts.isSourceFile(node)) {
    return node;
  }

  return getSourceFile(node.parent);
}

export function getSourceContext(nodes: ts.Node[]) {
  return nodes
    .map((node) => {
      return getSourceFile(node);
    })
    .filter((file, index, array) => {
      return array.indexOf(file) === index;
    })
    .map((file) => {
      return file.fileName;
    })
    .reduce((a, b) => {
      while (a !== b) {
        if (a.length > b.length) {
          a = path.dirname(a);
        } else {
          b = path.dirname(b);
        }
      }
      return a;
    });
}

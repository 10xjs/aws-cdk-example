import * as fs from 'fs';
import * as path from 'path';
import * as jsonSchema from 'json-schema';

import {contains, interpolateName, rewriteRefs} from './util/schema';

export function writeSchema(
  combinedSchema: jsonSchema.JSONSchema7,
  config: {
    rootDir: string;
    context: string;
    output: {
      filename: string;
      path: string;
    };
  },
) {
  const schemas = new Map(
    Object.entries(combinedSchema.definitions ?? {})
      .map(([name, definition]) => {
        return [name, definition, /^"(.*)"\.(.*)$/.exec(name)] as const;
      })
      .filter((entry): entry is [
        string,
        jsonSchema.JSONSchema7,
        RegExpExecArray,
      ] => {
        const [, definition, match] = entry;

        return match !== null && typeof definition !== 'undefined';
      })
      .map(([name, definition, [, srcFilename, symbolName]]) => {
        const filename = interpolateName(config.output.filename, {
          context: config.context,
          symbolName,
          srcFilename,
        });

        const outFilename = path.join(config.output.path, filename);

        return [name, {definition, srcFilename, outFilename, symbolName}];
      }),
  );

  schemas.forEach(({outFilename, definition}) => {
    if (typeof definition === 'boolean') {
      return;
    }

    rewriteRefs(definition, (ref) => {
      const match = /^#\/definitions\/(".*"\..*)$/.exec(
        decodeURIComponent(ref),
      );

      if (match === null) {
        return ref;
      }

      const targetName = match[1];

      const targetSchema = schemas.get(targetName);

      if (targetSchema === undefined) {
        return ref;
      }

      return path.relative(path.dirname(outFilename), targetSchema.outFilename);
    });

    const schema = {
      $schema: combinedSchema.$schema,
      ...definition,
    };

    if (!contains(config.rootDir, outFilename)) {
      return;
    }

    fs.mkdirSync(path.dirname(outFilename), {recursive: true});
    fs.writeFileSync(outFilename, JSON.stringify(schema, null, 2), 'utf-8');
  });
}

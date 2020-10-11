import * as path from 'path';

import {createGenerator} from './generator';
import {getSourceContext} from './util/ts';
import {writeSchema} from './writer';

const generator = createGenerator('src/model/**/*.ts?(x)');

const context = getSourceContext((generator as any).getRootNodes());

const combinedSchema = generator.createSchema();

writeSchema(combinedSchema, {
  rootDir: process.cwd(),
  context,
  output: {
    filename: 'generated/[dir]/[file]/[name].schema.json',
    path: path.resolve(process.cwd(), './models'),
  },
});

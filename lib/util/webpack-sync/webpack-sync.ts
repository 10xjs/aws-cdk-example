import { cli } from 'webpack';

// const factories = {
//   object() {
//     return { type: 'object', properties: {} };
//   },
//   array() {
//     return { type: 'array', entries: [] };
//   },
//   string() {
//     return { type: 'string' };
//   },
//   number() {
//     return { type: 'number' };
//   },
// };

// const schema: any = factories.object();

Object.values(cli.getArguments()).forEach((meta) => {
  meta.configs.forEach((config) => {
    // let current = schema;

    const finalPart = config.multiple
      ? { type: 'array', elements: { type: config.type } }
      : { type: config.type };

    const parts = config.path.split('.').map(() => {});

    const path = [...config.path.split('.')];
    console.log('path', path);
  });
});

export function webpackSync() {}

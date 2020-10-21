import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as child_process from 'child_process';
import * as path from 'path';

export class WebpackAssetCode extends lambda.AssetCode {
  constructor(args: string[]) {
    super(process.cwd(), {
      bundling: {
        image: cdk.BundlingDockerImage.fromRegistry('dummy'),
        local: {
          tryBundle(outputDir: string): boolean {
            console.log({ outputDir });

            child_process.execFileSync(
              process.execPath,
              [
                path.join(__dirname, 'compiler.js'),
                '--output-path',
                path.resolve(__dirname, 'dist'),
                ...args,
              ],
              { stdio: 'inherit', env: process.env }
            );

            return true;
          },
        },
      },
    });
  }
}

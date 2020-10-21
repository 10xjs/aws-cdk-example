import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as child_process from 'child_process';
import * as path from 'path';

export class WebpackAssetCode extends lambda.AssetCode {
  constructor(args: string[]) {
    super(process.cwd(), {
      assetHashType: cdk.AssetHashType.OUTPUT,
      bundling: {
        image: cdk.BundlingDockerImage.fromRegistry('dummy'),
        local: {
          ['_' as any]: Math.random().toString(32),
          tryBundle(outputDir: string): boolean {
            child_process.execFileSync(
              process.execPath,
              [
                path.join(__dirname, 'compiler.js'),
                '--output-path',
                outputDir,
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

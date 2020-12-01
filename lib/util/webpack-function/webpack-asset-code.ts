import * as crypto from 'crypto';
import * as path from 'path';
import * as child_process from 'child_process';

import * as fs from 'fs-extra';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3_assets from '@aws-cdk/aws-s3-assets';

export class WebpackAssetCode extends lambda.Code {
  readonly isInline = false;

  public asset?: s3_assets.Asset;

  constructor(
    public readonly entry: string,
    public readonly options: s3_assets.AssetOptions = {}
  ) {
    super();
  }

  bind(scope: cdk.Construct): lambda.CodeConfig {
    const outdir = cdk.Stage.of(scope)?.outdir;

    if (!outdir) {
      throw new Error(
        'unable to determine cloud assembly output directory. Assets must be defined indirectly within a "Stage" or an "App" scope'
      );
    }

    console.log('Compiling', this.entry);

    const entryHash = crypto
      .createHash('sha256')
      .update(this.entry)
      .digest('hex');

    const outputPath = path.join(outdir, `webpack-temp-${entryHash}`);

    const entryArgs = ['--entry', this.entry];
    const outputArgs = ['--output-path', outputPath];
    const statsArgs = ['--stats-hash'];

    const buffer = child_process.execFileSync(
      process.execPath,
      [
        path.join(__dirname, 'compiler.js'),
        ...entryArgs,
        ...outputArgs,
        ...statsArgs,
      ],
      { stdio: ['inherit', 'pipe', 'inherit'], env: process.env }
    );

    process.stdout.write(buffer);

    const stats = buffer.toString('utf-8');

    const match = /\(([^(]+)\)\n$/.exec(stats);

    if (match === null) {
      throw new Error('unable to parse webpack compilation hash');
    }

    const [, hash] = match;

    this.asset = new s3_assets.Asset(scope, 'WebpackCode', {
      path: process.cwd(),
      assetHash: hash,
      ['extraHash' as any]: hash,
      assetHashType: cdk.AssetHashType.CUSTOM,
      bundling: {
        image: cdk.BundlingDockerImage.fromRegistry('dummy'),
        local: {
          tryBundle(outputDir) {
            fs.removeSync(outputDir);
            fs.renameSync(outputPath, outputDir);
            return true;
          },
        },
      },
      ...this.options,
    });

    console.log(
      'Build result staged at',
      path.join(outdir, this.asset.assetPath),
      '\n'
    );

    return {
      s3Location: {
        bucketName: this.asset.s3BucketName,
        objectKey: this.asset.s3ObjectKey,
      },
    };
  }

  public bindToResource(
    resource: cdk.CfnResource,
    options: lambda.ResourceBindOptions = {}
  ) {
    if (!this.asset) {
      throw new Error('bindToResource() must be called after bind()');
    }

    const resourceProperty = options.resourceProperty || 'Code';

    // https://github.com/aws/aws-cdk/issues/1432
    this.asset.addResourceMetadata(resource, resourceProperty);
  }
}

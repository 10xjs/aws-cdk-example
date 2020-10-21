import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { WebpackAssetCode } from './webpack-asset-code';

export interface WebpackFunctionProps
  extends Omit<lambda.FunctionProps, 'code' | 'handler' | 'runtime'> {
  entry: string;
  context: string;
  handler?: string;
}

export class WebpackFunction extends lambda.Function {
  constructor(scope: cdk.Construct, props: WebpackFunctionProps) {
    const { handler = 'main.handler', context, entry, ...rest } = props;

    super(scope, entry, {
      code: new WebpackAssetCode({ context, entry }),
      handler,
      runtime: lambda.Runtime.NODEJS_12_X,
      ...rest,
    });
  }
}

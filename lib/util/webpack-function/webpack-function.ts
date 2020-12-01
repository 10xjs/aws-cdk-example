import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { WebpackAssetCode } from './webpack-asset-code';

export interface WebpackFunctionProps
  extends Omit<lambda.FunctionProps, 'code' | 'handler' | 'runtime'> {
  entry: string;
  handler?: string;
}

export class WebpackFunction extends lambda.Function {
  constructor(scope: cdk.Construct, id: string, props: WebpackFunctionProps) {
    const { entry, handler = 'main.handler', ...rest } = props;

    super(scope, id, {
      code: new WebpackAssetCode(entry),
      handler,
      runtime: lambda.Runtime.NODEJS_12_X,
      ...rest,
    });
  }
}

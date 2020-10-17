import * as cdk from '@aws-cdk/core';

import { RestApiStack } from '../restApiStack';

const app = new cdk.App();

new RestApiStack(app, 'RestApiStack');

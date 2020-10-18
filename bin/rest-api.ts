import * as cdk from '@aws-cdk/core';

import { RestApiStack } from '../lib/rest-api/stack';

const app = new cdk.App();

new RestApiStack(app, 'rest-api');

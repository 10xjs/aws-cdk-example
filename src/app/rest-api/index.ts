import * as cdk from '@aws-cdk/core';

import { RestApiStack } from '../../stack/rest-api';

const app = new cdk.App();

new RestApiStack(app, 'rest-api');

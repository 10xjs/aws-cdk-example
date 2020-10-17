import * as cdk from '@aws-cdk/core';

class ContactsCrud extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}

const app = new cdk.App();

new ContactsCrud(app, 'ContactsStack');

#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { EcrStack } from '../lib/ecr-stack';

const app = new cdk.App();

// Deploy ECR stack
const ecrStack = new EcrStack(app, 'EcrStack', {
  env: { region: 'ap-southeast-2' },
});
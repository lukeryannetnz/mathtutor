#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MathTutorEcrStack } from '../lib/mathtutor-ecr-stack';
import { MathTutorWebAppStack } from '../lib/mathtutor-web-app-stack';

const app = new cdk.App();

// Deploy ECR stack
const mathTutorEcrStack = new MathTutorEcrStack(app, 'MathTutorEcrStack', {
  env: { region: 'ap-southeast-2' },
});

// Deploy MathTutor Web App stack (depends on ECR stack)
const mathtutorWebAppStack = new MathTutorWebAppStack(app, 'MathTutorWebAppStack', {
  env: { region: 'ap-southeast-2' },
  ecrRepository: mathTutorEcrStack.repository,
});

// Add dependency to ensure ECR stack is deployed first
mathtutorWebAppStack.addDependency(mathtutorWebAppStack);
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class EcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, env: { region: 'ap-southeast-2' } });

    // ECR repository for the Math Tutor app
    const repo = new ecr.Repository(this, 'MathTutorRepo', {
      repositoryName: 'mathtutorrepo',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // for dev/test, change for prod
    });

    // Output the ECR repository URI for easy reference
    new cdk.CfnOutput(this, 'EcrRepositoryUri', {
      value: repo.repositoryUri,
      description: 'ECR Repository URI for the Math Tutor app',
      exportName: 'MathTutorRepoUri',
    });

    // Output the ECR repository name for reference
    new cdk.CfnOutput(this, 'EcrRepositoryName', {
      value: repo.repositoryName,
      description: 'ECR Repository Name for the Math Tutor app',
      exportName: 'MathTutorRepoName',
    });
  }
} 
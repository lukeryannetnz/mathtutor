import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';

export class EcrStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, { ...props, env: { region: 'ap-southeast-2' } });

    // ECR repository for the Math Tutor app
    const repo = new ecr.Repository(this, 'MathTutorRepo', {
      repositoryName: 'mathtutorrepo',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // for dev/test, change for prod
    });

    // Create OIDC identity provider for GitHub Actions
    const githubOidcProvider = new iam.OpenIdConnectProvider(this, 'GitHubOidcProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
      thumbprints: [
        '6938fd4d98bab03faadb97b34396831e3780aea1', // GitHub's OIDC thumbprint
      ],
    });

    // Create IAM role for GitHub Actions to push to ECR
    const githubActionsRole = new iam.Role(this, 'GitHubActionsECRRole', {
      roleName: 'GitHubActionsECRRole',
      assumedBy: new iam.FederatedPrincipal(
        githubOidcProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
          },
          StringLike: {
            'token.actions.githubusercontent.com:sub': 'repo:lukeryannetnz/mathtutor:*',
          },
        },
        'sts:AssumeRoleWithWebIdentity'
      ),
      description: 'Role for GitHub Actions to push Docker images to ECR',
    });

    // Add minimal ECR permissions to the role
    githubActionsRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ecr:GetAuthorizationToken',
        'ecr:BatchCheckLayerAvailability',
        'ecr:GetDownloadUrlForLayer',
        'ecr:BatchGetImage',
        'ecr:InitiateLayerUpload',
        'ecr:UploadLayerPart',
        'ecr:CompleteLayerUpload',
        'ecr:PutImage',
      ],
      resources: [repo.repositoryArn],
    }));

    // Add permission to get authorization token (required for docker login)
    githubActionsRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['ecr:GetAuthorizationToken'],
      resources: ['*'],
    }));

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

    // Output the IAM role ARN for GitHub Actions
    new cdk.CfnOutput(this, 'GitHubActionsRoleArn', {
      value: githubActionsRole.roleArn,
      description: 'IAM Role ARN for GitHub Actions to push to ECR',
      exportName: 'GitHubActionsECRRoleArn',
    });

    // Output the OIDC provider ARN
    new cdk.CfnOutput(this, 'GitHubOidcProviderArn', {
      value: githubOidcProvider.openIdConnectProviderArn,
      description: 'GitHub OIDC Provider ARN',
      exportName: 'GitHubOidcProviderArn',
    });
  }
} 
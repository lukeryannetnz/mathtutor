import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface MathTutorWebAppStackProps extends cdk.StackProps {
  ecrRepository: ecr.IRepository;
}

export class MathTutorWebAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MathTutorWebAppStackProps) {
    super(scope, id, props);

    // Lambda function for the Rails application
    const railsFunction = new lambda.DockerImageFunction(this, 'RailsFunction', {
      functionName: 'mathtutor-rails-app',
      code: lambda.DockerImageCode.fromEcr(props.ecrRepository, {
        tagOrDigest: 'latest',
      }),
      memorySize: 512, // Minimum memory for Rails app
      timeout: cdk.Duration.seconds(30),
      environment: {
        RAILS_ENV: 'production',
        RAILS_SERVE_STATIC_FILES: 'true', // Serve static files from Lambda
        DATABASE_URL: 'sqlite:///var/task/db/production.sqlite3', // Using SQLite for cost optimization
        RAILS_LOG_TO_STDOUT: 'true', // Ensure logs go to CloudWatch
        RAILS_SKIP_DATABASE_ENVIRONMENT_CHECK: 'true', // Skip DB environment check
        LAMBY_ENV: 'production', // Set Lamby environment
        LAMBY_RAILS_ENV: 'production', // Set Rails environment for Lamby
      },
      logGroup: new logs.LogGroup(this, 'RailsFunctionLogGroup', {
        retention: logs.RetentionDays.ONE_WEEK, // Reduce log retention for cost optimization
      }),
    });

    // API Gateway REST API
    const api = new apigateway.RestApi(this, 'MathTutorApi', {
      restApiName: 'MathTutor API',
      description: 'API Gateway for MathTutor Rails application',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
      deployOptions: {
        stageName: 'prod',
        loggingLevel: apigateway.MethodLoggingLevel.OFF, // Disable logging to avoid account settings requirement
        dataTraceEnabled: false, // Disable data tracing
        metricsEnabled: true, // Keep metrics enabled
      },
    });

    // Lambda integration
    const lambdaIntegration = new apigateway.LambdaIntegration(railsFunction, {
      proxy: true,
    });

    // Add proxy resource to handle all routes
    api.root.addProxy({
      defaultIntegration: lambdaIntegration,
      anyMethod: true,
    });

    // Outputs
    new cdk.CfnOutput(this, 'ApiGatewayUrl', {
      value: api.url,
      description: 'API Gateway URL',
      exportName: 'MathTutorApiGatewayUrl',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionName', {
      value: railsFunction.functionName,
      description: 'Lambda Function Name',
      exportName: 'MathTutorLambdaFunctionName',
    });
  }
} 
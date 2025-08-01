#!/bin/bash
set -e

echo "Deploying CDK stack..."
npx cdk deploy --require-approval never --verbose

echo "Deployment complete!" 
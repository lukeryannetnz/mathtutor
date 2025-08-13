# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Rails Application
- `rails server` - Start the development server on port 3000
- `rails db:create` - Create the database
- `rails db:migrate` - Run database migrations
- `rails test` - Run the full test suite
- `rails test test/models/addition_equation_test.rb` - Run specific test file
- `rails test test/controllers/addition_equations_controller_test.rb` - Run controller tests
- `rails test test/system/addition_equations_test.rb` - Run system tests
- `bin/rubocop -f github` - Check Ruby code style with RuboCop (GitHub format)
- `bundle exec rubocop` - Alternative RuboCop command
- `bundle exec brakeman` - Run security vulnerability scan

### AWS CDK Infrastructure (in cdk/ directory)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run test` - Run Jest unit tests
- `npx cdk deploy` - Deploy infrastructure to AWS
- `npx cdk diff` - Show differences between current and deployed state
- `npx cdk synth` - Generate CloudFormation template

### Deployment
- `docker build -t mathtutor .` - Build Docker image locally

## Architecture Overview

This is a Rails 8 application for teaching basic math to young children (ages 5-6), with dual deployment options: traditional web servers via Kamal and AWS Lambda via CDK.

### Core Components
- **AdditionEquation Model** (`app/models/addition_equation.rb`): Generates random addition problems with numbers 1-10
- **AdditionEquationsController** (`app/controllers/addition_equations_controller.rb`): Handles equation generation and Turbo Stream updates
- **Turbo Streams**: Provides real-time equation updates without page refreshes using `turbo_stream.replace`

### Technology Stack
- Rails 8.0.2 with Hotwire (Turbo + Stimulus)
- SQLite3 database with Solid Cache/Queue/Cable
- Tailwind CSS for styling
- Progressive Web App features
- AWS Lambda support via Lamby gem

### Deployment Infrastructure
- **Traditional Deployment**: Kamal with Docker containers
- **Serverless Deployment**: AWS Lambda with CDK TypeScript stacks
  - ECR repository for container images
  - Lambda function with container runtime
  - API Gateway integration

### File Structure
```
app/
├── controllers/addition_equations_controller.rb  # Main game logic
├── models/addition_equation.rb                  # Math equation generation
├── views/addition_equations/
│   ├── index.html.erb                          # Game interface
│   └── _equation.html.erb                      # Equation partial
└── javascript/controllers/                      # Stimulus controllers

cdk/                                            # AWS infrastructure
├── lib/mathtutor-*.ts                         # CDK stack definitions
└── bin/cdk.js                                 # CDK app entry point

lambda_handler.rb                               # Lambda function handler
```

### Testing Approach
- Model tests for equation generation logic
- Controller tests for HTTP responses and Turbo Stream rendering  
- System tests with Capybara for end-to-end functionality
- Use `rails test` for all testing - no custom test runners

### Code Quality Standards
- Follow Rails Omakase styling with RuboCop
- Security scanning with Brakeman
- Test-driven development practices
- Cursor rules emphasize comprehensive testing and Rails conventions
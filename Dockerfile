# Use the AWS Lambda Ruby 3.4 base image
FROM public.ecr.aws/lambda/ruby:3.4

# Install system dependencies and development tools
RUN dnf install -y sqlite sqlite-devel nodejs npm gcc gcc-c++ make libyaml-devel pkgconfig && \
    npm install -g yarn && \
    dnf clean all

# Set workdir
WORKDIR /var/task

# Copy Gemfiles and install gems
COPY Gemfile Gemfile.lock ./

# Configure bundler for Lambda deployment
RUN bundle config set --local deployment 'true' && \
    bundle config set --local without 'development test' && \
    bundle config set --local path 'vendor/bundle' && \
    bundle install --jobs 4 --retry 3

# Copy the rest of the app
COPY . .

# Ensure proper permissions
RUN chmod +x /var/task/app.rb

# Set the Lambda entrypoint for Rails with Lamby
CMD ["app.handler"]

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
RUN bundle config set without 'development test' && \
    bundle install

# Copy the rest of the app
COPY . .

# Set the Lambda entrypoint
CMD ["lambda_handler.lambda_handler"]
